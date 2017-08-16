//it is required to use GULP process to fill in the @@imports and get inline coding with friendlyIframe to work properly;
//gulpfile.js can be found in root directory
//single quotes and @@import are important for gulp task to work for these files

dwlinked = function() {
    /*****************************************************Declarations*****************************************/
    var htmlFile = '@@import /min/index.min.html';
    var cssFile = '@@import /min/dynamic_widget_unlinked.min.css';
    var cssWideFile = '@@import /min/dynamic_widget_unlinked_wide.min.css';

    var embedURL = "dynamic_widget_unlinked";
    var currentScript = document.currentScript != null && document.currentScript.src.indexOf(embedURL) != -1 ? document.currentScript : (function() { // resolution for IE since it does not have currentScript to find the currently running script on the page
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src.indexOf(embedURL) != -1) {
                return scripts[i];
            }
        }
    })();

    var friendlyIframeWindow;
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var widthBreakpoint = 649; // in pixels
    var wideWidget = false; // flag that changes certain functions to run differently (default = false)
    var windowWidth;
    var apiCallUrl; // this is global call that is used for api calls
    var imageUrl = "images.synapsys.us"; // this is global call that is used for images
    var dwApi = "dw.synapsys.us/list_api.php"; // dynamic widget api
    var tdlApi = "touchdownloyal-api.synapsys.us/list/"; // used for nfl and ncaaf category
    var waldo = "//waldo.synapsys.us/getlocation/2";
    var fallBackApi; // used for nfl and ncaaf category
    var currentIndex = 0; // current index of an array which (default = 0)
    var maxIndex = 1; //declare max index of returned data (default = 1)
    var widgetData; // api returns is sent here
    var tries = 0; // flag for api to try atleast 10 times before failing completely
    var maxTries = 5;
    var listRand = Math.floor((Math.random() * 100) + 1); // used to increment index of random list in database
    var subCategory; // with a vast amount groups and categories need we need the currently shown category for the rest of the code
    var friendlyIframe;
    var getlocation;
    var query = {};
    var showCover;
    var $;
    var hostname;//host name is obtained by the given url of the script source

    function createFriendlyIframe() {
        //create friendly iframe to place ourselves inside
        friendlyIframe = document.createElement('iframe');

        // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
        friendlyIframe.className = "dwunlinkIframe"
        friendlyIframe.width = '300';
        friendlyIframe.height = 600 - 250; //250 is the add height
        friendlyIframe.scrolling = 'no';
        friendlyIframe.style.overflow = 'hidden';
        friendlyIframe.name = currentScript.src;
        friendlyIframe.style.border = 'none';

        currentScript.parentNode.insertBefore(friendlyIframe, currentScript);

        //after getting querystring from js or iframe search query set currentScript to black
        friendlyIframeWindow = friendlyIframe.contentWindow;

        //create inline html for friendlyIframe
        friendlyIframeWindow.document.open();
        friendlyIframeWindow.document.write(htmlFile);
        friendlyIframeWindow.document.close();

        //listen to when the iframe window content has returned and send in the srcQuery if there is one before it gets
        if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") { // if page is already loaded'
            setupIframe();
        } else { // elseonce page has finished loading, so as not to slowdown the page load at all
            friendlyIframeWindow.document.onreadystatechange = function() {
                if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") {
                    setupIframe();
                }
            }
        }
    }

    function setupIframe(){
      try{
        var srcQuery =  friendlyIframe.name.split("js?")[1];
        //determine if a query string is after the index.html location || if query is after a javascript location
        if (srcQuery != "" && srcQuery != null) {
          try {
            query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
          } catch (e) {
            console.log(e);
          }
        }else{
          query = JSON.parse(decodeURIComponent(document.location.search.substr(1)));
        }
      }catch(e){
          query = {};
      };

        //create inline style for friendlyIframe
        var style = friendlyIframeWindow.document.createElement("style");
        if (query.wide != null && query.wide != '') {
            friendlyIframe.width = friendlyIframe.parentNode.clientWidth - 300; //300 being the width
            // friendlyIframe.style.maxWidth = '992px';
            friendlyIframe.height = '250';

            //CREATE LISTENER FOR RESIZE
            window.addEventListener('resize', function() {
                //set iframe to width of parent node
                friendlyIframe.width = friendlyIframe.parentNode.clientWidth;
            }, true);

            style.appendChild(friendlyIframeWindow.document.createTextNode(cssWideFile));
            wideWidget = true; //set wide flag
        } else {
            style.appendChild(friendlyIframeWindow.document.createTextNode(cssFile));
        }

        //append the css file into iframe head
        friendlyIframeWindow.document.head.appendChild(style);

        //create variable to be used similar to jquery for id's
        $ = function(e) { // create a simple version for grabbing id's of elements
            return friendlyIframeWindow.document.getElementById(e)
        };

        /*****************************************************Start Function calls*****************************************/

        //after you get the query you set the enironment
        setupEnvironment(query);

        //THEN START UPDATING THE LISTS
        updateList(0);

        try {
            var baseEvent = query.event;
            baseEvent.event = "widget-interaction";
            var postObject = {
                snt_data: baseEvent,
                action: 'snt_tracker'
            };
            //create event listeners
            $("button_left").addEventListener("click", function() {
                updateIndex(-1);
                sendPostMessageToIgloo(postObject, 5);
            });
            $("button_right").addEventListener("click", function() {
                updateIndex(1);
                sendPostMessageToIgloo(postObject, 5);
            });
            $("button_atomic").addEventListener("click", function() {
                updateList(1);
                sendPostMessageToIgloo(postObject, 5);
            });
        } catch (e) {
            console.log("Dynamic Widget: Not currently hosted inside igloo... disabling analytics");
            // just enable button click events
            $("button_left").addEventListener("click", function() {
                updateIndex(-1);
            });
            $("button_right").addEventListener("click", function() {
                updateIndex(1);
            });
            $("button_atomic").addEventListener("click", function() {
                updateList(1);
            });
        }
    }

    function getDomain(url) {
        var hostName = getHostName(url);
        var domain = hostName;
        if (hostName != null) {
            var parts = hostName.split('.').reverse();
            if (parts != null && parts.length > 1) {
                domain = parts[1] + '.' + parts[0];
                if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
                    domain = parts[2] + '.' + domain;
                }
            }
        }
        return domain;
    }

    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    }

    function getEnv(env) {
        if (env.match(/^homestead/) != null || env.match(/^localhost/) != null || env.match(/^dev-/) != null) {
            env = "dev-";
        } else if (env.match(/^qa-/) != null) {
            env = "qa-";
        } else {
            env = "";
        }
        return env;
    }

    /***************************** SETUP ENVIRONMENTS ******************************
     * @function setupEnvironment
     * setup Environment function
     *
     * @param function widgetQuery - the query string sent back as and Object from the location.search substrings
     * to be parsed through and set for global use
     */
    function setupEnvironment(widgetQuery) {
        apiCallUrl = protocolToUse;
        var dom = widgetQuery.dom;
        var cat = widgetQuery.category;
        var group = widgetQuery.group == '' ? widgetQuery.group = null : widgetQuery.group;
        var environment = getHostName(friendlyIframe.name);
        var env;
        if (widgetQuery.env != null) {
            env = widgetQuery.env && widgetQuery != 'prod' ? widgetQuery.env : '';
        } else {
            env = getEnv(environment);
        }

        //setup Image Environment api
        imageUrl = protocolToUse + env + imageUrl; // this is global call that is used for images

        //if group does exist here then add group query parameter otherwise add categeory parameter for api
        if (widgetQuery.group != null && widgetQuery.group != "") {
          apiCallUrl += env + dwApi + "?group=" + group;
        } else {
          subCategory = widgetQuery.category;
          apiCallUrl += env + dwApi + "?cat=" + cat;
        }
        if(widgetQuery.group == 'weather' || widgetQuery.category == 'weather'){
          wheresWaldo();
          showCover = true;
          apiCallUrl += '&location='+getlocation[0].state.toLowerCase()+'&loc_type=state';
        }
        if (dom != null && dom != "" && (widgetQuery.group != 'weather' && widgetQuery.category != 'weather')) {
          apiCallUrl += "&partner=" + dom;
        }
        //FALL BACK API SET HERE INCASE Dynamic widget api fails to make a call
        fallBackApi = protocolToUse + env + dwApi + "?group=sports";
    }

    /************************ UPDATE LIST ***********************
     * @function updateList
     * update List function and if the list is from dynamic widget category then it will change the list
     * by incrementing the initially random number
     *
     * @param function listNum - list number incremented that will be added to the listRand with listNum
     */
    function updateList(listNum) {
        widgetData = null;
        listRand = Number(listRand) + Number(listNum);
        var currentApi = apiCallUrl + "&rand=" + listRand;
        runAPI(currentApi);
    }

    /************************ Update Index *************************
     * @function updateIndex
     * increment index and rerun display widget
     * cannot pass the maximum or minimum
     *
     * @param function difference - difference that will be added to current index
     */
    function updateIndex(difference) {
        if (widgetData) {
            currentIndex -= difference;
            if (currentIndex < 0) {
                currentIndex = maxIndex - 1;
            } else if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {}
            //call display widget
            displayWidget();
        }
    }

    /***************************** runAPI ***************************
     * @function runAPI
     * function that makes an asynchronous request using http and setting a global variable equal to the response of the text.
     * fail safe of retrying 10 times before sending error message
     *
     * @param function apiUrl -
     */
    function runAPI(apiUrl) { //Make it to where it is easy to be reused by anyone
        //variable that stores the response of an http request
        if (friendlyIframeWindow.XMLHttpRequest) {
            var xhttp = new XMLHttpRequest();
        } else {
            var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }
        xhttp.onreadystatechange = function() {
            // Check if the loading status of the current document is done
            if (this.readyState == 4) {
                if (this.status == 200) {
                    // On success parse out the response
                    widgetData = JSON.parse(this.responseText);
                    var dataArray = widgetData.l_data != null ? widgetData.l_data : widgetData.data.listData;
                    //set maximum index of returned dataLayer
                    if (dataArray.length >= 25) {
                        currentIndex = 24;
                        maxIndex = 25;
                    } else {
                        currentIndex = dataArray.length - 1;
                        maxIndex = dataArray.length;
                    }
                    displayWidget(); //send in the name of the function that needs to be ran once data has been confirmed
                } else {
                    // Error handling
                    // Get the message
                    var msg = this.statusText;
                    if (this.status == 500) {
                        try {
                            msg = JSON.parse(this.responseText).message
                        } catch (e) {
                            console.log('No JSON message')
                        }
                    }
                    msg = 'HTTP Error (' + this.status + '): ' + msg;
                    if (tries > (maxTries - 2)) {
                        console.warn(msg + " | hiding widget container | => SWAPPING TO FALLBACK");
                        apiUrl = fallBackApi + "&rand=1";
                        apiCallUrl = fallBackApi;
                    }
                    if (tries++ > maxTries) { // IF WIDGET FAILS THEN HIDE THE ENTIRE CONTAINER
                        friendlyIframeWindow.document.getElementsByClassName('e_container')[0].style.display = 'none';
                        throw msg + " | hiding widget fallback failed container | => PLEASE CONTACT YOUR PROVIDER";
                    }
                    setTimeout(runAPI(apiUrl), 500)
                }
            }
        };
        xhttp.open("GET", apiUrl, true);
        xhttp.send();
    }; /************************** runAPI END ************************/


    /****************************Display Widget Data *****************
     * @function displayWidget
     * When data is available set the data return to the unique identifiers on the DOM
     * using innerHTML
     *
     * @param function
     */
    function displayWidget() {
        try {
            /***************************DYNAMIC DATA APPLIANCE*******************************/
            var dataArray = widgetData.l_data;

            //checks if a category from group lists is being sent back then setting it as the subCategoryto be checked for proper color and fallback images
            if (query.group != null && widgetData.category != null) {
              subCategory = widgetData.category;
            } else if (query.group != null && widgetData.category == null) {
              subCategory = null;
            }

            setCategoryColors(subCategory);
            //set maximum index of returned dataLayer
            // maxIndex = dataArray.length;

            //current index of list
            var curData = dataArray[currentIndex];

            //list title
            $("profile-title").innerHTML = widgetData.l_title;

            //checks if a proper live image is being sent from team_wide_img or player_wide_img otherwise default to li_img datapoint
            var image;
            if (curData.player_wide_img != null && curData.player_wide_img != "") {
              image = checkImage(imageUrl + curData.player_wide_img);
            } else if ((curData.player_wide_img == null || curData.player_wide_img == "") && (curData.team_wide_img != null && curData.team_wide_img != "")) {
              image = checkImage(imageUrl + curData.team_wide_img);
            } else {
              image = checkImage(curData.li_img);
            }

            if (image != null) {
              $("mainimg").style.backgroundImage = "url('" + image + "')";
            }

            //FINANCE ONE OFF where if finance we want to use only 100% of the height;
            if (subCategory == 'finance' && !wideWidget) {
              $("mainimg").style.backgroundSize = "auto 100%";
            } else {
              $("mainimg").style.backgroundSize = "cover";
            }

            $("mainimg").style.backgroundImage
            //CELEBRITIES ONE OFF to set proper structure
            if (subCategory == 'celebrities' || subCategory == 'weather' || subCategory == 'music' || subCategory == 'nfl' || subCategory == 'ncaaf') { //TODO make a more efficient way to set values than whats being done below inside each if else statement
              $("profile-rank").innerHTML = curData.li_rank;
              $("mainimg-rank").innerHTML = curData.li_rank;
              $("profile-name").innerHTML = curData.li_title;
              $("name-title").setAttribute("title", curData.li_title);
              if (curData.data_value_1 != null) {
                $("profile-datavalue1").innerHTML = curData.data_value_1;
                $("profile-datapoint1").innerHTML = curData.data_point_1 != null ? curData.data_point_1 : '';
                $("data-title1").setAttribute("title", curData.data_value_1 == '' ? curData.data_point_1 : curData.data_value_1);
              } else {
                $("profile-datavalue1").innerHTML = curData.fallback_data_value_1 != null ? curData.fallback_data_value_1 : '';
                $("profile-datapoint1").innerHTML = curData.fallback_data_point_1 != null ? curData.fallback_data_point_1 : '';
                $("data-title1").setAttribute("title", curData.fallback_data_value_1);
              }

              $("profile-datapoint2").innerHTML = curData.data_point_2 != null ? curData.data_point_2 : '';
              $("profile-datavalue2").innerHTML = curData.data_value_2 != null ? " " + curData.data_value_2 : '';
              $("data-title2").setAttribute("title", curData.data_value_2);
            } else {
              $("profile-rank").innerHTML = curData.li_rank;
              $("mainimg-rank").innerHTML = curData.li_rank;
              $("profile-name").innerHTML = curData.li_title;
              // $("profile-datapoint1").innerHTML = curData.li_value;
              $("profile-datavalue1").innerHTML = curData.li_sub_txt;
              $("profile-datapoint2").innerHTML = curData.li_tag;
              $("profile-datavalue2").innerHTML = " " + curData.li_value;

              $("name-title").setAttribute("title", curData.li_title);
              $("data-title1").setAttribute("title", curData.li_sub_txt);
              $("data-title2").setAttribute("title", curData.li_value + " " + curData.li_tag);
            }
            /***************************END OF DYNAMIC DATA*******************************/
        } catch (e) {
            console.log('Error in displaying widget Data');
            // console.log(e);
        }
        if(wideWidget){
            fireResize();
        }
    }
    /**************************Display Widget Data END******************/


    /********************** SETUP CATEGORY COLORS **********************
     * @function setCategoryColors
     * dynamically set the colors of the css Rules for each of the partners
     *
     * @param function category - sets the base category for colors that are stored in the global ./css/inheritor/inheritor.css
     */
    function setCategoryColors(category) {
        var color;
        switch (category) {
            case 'football':
            case 'nfl':
            case 'ncaaf':
            case 'nflncaaf':
                category = 'football';
                break;
            case 'basketball':
            case 'nba':
            case 'ncaam':
            case 'college_basketball':
                category = 'basketball';
                break;
            case 'baseball':
            case 'mlb':
                category = 'baseball';
                break;
            case "realestate":
            case "disaster":
            case "demographics":
            case "crime":
            case "weather":
            case "politics":
                category = 'realestate';
                break;
            case "finance":
            case "money":
                category = 'finance';
                break;
            case "entertainment":
            case "celebrities":
            case "actor":
            case "musician":
            case "music":
            case "director":
                category = 'entertainment';
                break;
            default:
                category = 'default';
                break;
        }
        var atomicClass = friendlyIframeWindow.document.getElementsByClassName("widget_ad")[0];
        atomicClass.id = wideWidget ? category + '-wide' : category;

    }

    /************************ Date Formatter ************************
     * @function dateFormat
     * date format that is used to return the date format in a readable state
     *
     * @param function (Number) everything comes in as the number
     *       weekdayNum - display the week day names
     *       dayNum - display the day number
     *       monthNum - takes month number and display the name
     *       yearNum - displays year
     */
    function dateFormat(weekdayNum, dayNum, monthNum, yearNum) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var formatedDate = {
            weekday: dayNames[weekdayNum],
            day: dayNum,
            month: monthNames[monthNum],
            year: yearNum,
        };
        return formatedDate;
    }

    /***************************** CHECK IMAGE ****************************
     * @function checkImage
     * checks if the image is a placement and replace and change the look of the widget
     *
     * @param function image - tosses in image to be check to be replaced with proper stock photo for the specific category
     */
    function checkImage(image) {
        var imageReturn;
        var fallbackImg;
        var imageWidth = wideWidget ? 690 : 300; //determine which quality widget to use based on if the wide widget is in view
        switch (subCategory) {
            case "football":
            case "nfl":
            case "ncaaf":
                fallbackImg = "football_stock_01_970x250.jpg";
                break;
            case 'basketball':
            case "nba":
            case 'ncaam':
            case "college_basketball":
                fallbackImg = "basketball_stock.jpg";
                break;
            case "finance":
                fallbackImg = "finance_stock.jpg";
                break;
            case "mlb":
                fallbackImg = "baseball_stock.jpg";
                break;
            case "realestate":
            case "disaster":
            case "demographics":
            case "crime":
            case "weather":
                fallbackImg = "weather_stock.jpg";
                break;
            case "politics":
                fallbackImg = "real_estate_stock.jpg";
                break;
            case "celebrities":
            case "actor":
                fallbackImg = "actor.jpg";
                break;
            case "musician":
            case "music":
                fallbackImg = "musician.jpg";
                break;
            case "director":
                fallbackImg = "director.jpg";
                break;
            default:
                fallbackImg = "failback.jpg";
        }
        //prep return
        //use global flag for wideWidget (if wide widget is being used then all images are to be returned as fallback stock images)
        if (image != null &&
            image.indexOf('no-image') == -1 &&
            image.indexOf('no_image') == -1 &&
            image.indexOf('no_player') == -1 &&
            image.indexOf('fallback') == -1 &&
            !wideWidget
        ) {
            imageReturn = image + "?width=" + (imageWidth * window.devicePixelRatio);
            showCover = false;
        } else {
            //actual fallback images are being returned by the music api
            if (subCategory == "music" && image.indexOf('fallback') > 0 && image != null) {
                imageReturn = image + "?width=" + (imageWidth * window.devicePixelRatio);
                showCover = false;
            } else {
                showCover = true;
                //make sure there is a fallback image
                if (subCategory == "football" || subCategory == "nfl" || subCategory == "ncaaf"){
                    imageReturn = imageUrl + "/01/fallback/stock/2017/07/" + fallbackImg;
                }else if (subCategory == "celebrities" || subCategory == "music") {
                    imageReturn = imageUrl + "/01/fallback/stock/2017/04/" + fallbackImg;
                }else {
                    imageReturn = imageUrl + "/01/fallback/stock/2017/03/" + fallbackImg;
                }
                //sets flag for image api to send back image with set size based on devicePixelRatio
                imageReturn += "?width=" + (imageWidth * window.devicePixelRatio);
            }
        }
        //for weather they want to force shader
        if(query.group == 'weather' || query.category == 'weather'){
            showCover = true;
        }
        //when mainimg was an <img> tag
        //USED to display background color of category if a fallback image is sent back
        var imageBackground = friendlyIframeWindow.document.getElementsByClassName('e_image-cover');
        for (var j = 0; j < imageBackground.length; j++) {
            if (showCover) {
                if(friendlyIframeWindow.document.getElementsByClassName('grayscale').length < 1){
                    $("mainimg").className += " grayscale";
                }
                $("e_image-shader").style.display = "none";
                imageBackground[j].style.display = 'block';
            } else {
                $("mainimg").className = "";
                $("e_image-shader").style.display = "block";
                imageBackground[j].style.display = 'none';
            }
        }
        return imageReturn;
    }

    /**
     * Send a post message to every window up to the top window
     * @param  {Object}  postObject The object to send as a postMessage
     * @param  {Integer} maxLoops   The maximum number of layers to traverse up
     */
    function sendPostMessageToIgloo(postObject, maxLoops) {
        // Initialize variables
        var postWindows = [window];
        var currentWindow = window;
        var currentLoop = 0;
        maxLoops = typeof maxLoops === 'undefined' ? 10 : maxLoops;
        // Build all of the windows to send the message to
        try {
            // Loop through all of the windows
            while (currentLoop++ < maxLoops && currentWindow !== window.top) {
                // Move up a layer
                currentWindow = currentWindow.parent;
                // Add to the postMessage array
                postWindows.push(currentWindow);
            }
        } catch (e) {}

        // Send the post messages
        for (var i = 0; i < postWindows.length; i++) {
            postWindows[i].postMessage(postObject, '*');
        }
    }


    /**
     * Manually fires off the window resize event
     */
    function fireResize(){
        if (document.createEvent) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
        }
        else { // IE
            element=document.documentElement;
            var event=document.createEventObject();
            element.fireEvent("onresize",event);
        }
    };

    function wheresWaldo(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {

            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                //On complete function
                getlocation =  JSON.parse(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", waldo, false); // false for synchronous request
        xmlHttp.send(null);
    }

    /*****************************************************After Declarations RUN first main function*****************************************/
    //create friendly iframe
    createFriendlyIframe();
}//end of dwlinked

var firstRun = true;//makes sure the listeners run once

function widgetSetup(){
    //Initial load Waits for the DOMContent to load
    if (firstRun == true && (document.readyState == "complete" || document.readyState == "interactive")) { // if page is already loaded'
        firstRun = false;
        dwlinked();
    } else { // elseonce page has finished loading, so as not to slowdown the page load at all
        document.onreadystatechange = function() {
            if (firstRun == true && (document.readyState == "complete" || document.readyState == "interactive")) {
                firstRun = false;
                dwlinked();
            }
        }
    }
}


//run the moment javascript file has been embeded
widgetSetup()//start waldo call since its required and has no dependencies
