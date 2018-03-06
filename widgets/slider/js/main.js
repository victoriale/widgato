(function () {
    //Global Variables
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var $;
    var iglooTries = 0;
    var totalTries = 10;

    var imageUrl = "images.synapsys.us"; // this is global call that is used for images
    var dwApi = "dw.synapsys.us/list_api.php"; // dynamic widget api
    var waldo = "waldo.synapsys.us/getlocation/2";
    var postUrl = "-pa.synapsys.us/";
    var apiCallUrl; // this is global call that is used for api calls
    var fallBackApi; // used for nfl and ncaaf category
    var tries = 0; // flag for api to try at least 10 times before failing completely
    var maxTries = 5;
    var rand_id = Math.floor(Math.random() * 1000);
    var listRand = Math.floor((Math.random() * 100) + 1); // used to increment index of random list in database
    //Creative Unit Data related variables
    var widgetData; // api returns is sent here
    var subCategory; // with a vast amount groups and categories need we need the currently shown category for the rest of the code
    var currentIndex = 0; // current index of an array which (default = 0)
    var maxIndex = 1; //declare max index of returned data (default = 1)
    var getLocation; // in case location data is needed
    var svgIcon = "<svg version='1.1' x='0px' y='0px' width='26' height='39' viewBox='0 0 26 39' opacity='1' " +
        "xml:space='preserve'><g  fill='#FFF' fill-rule='evenodd'><path d='M10.677 8c-1.773 0-3.226 1.47-3.226 3.263v11.23c-.499-1.091-1.395-2.272-2.52-2.562-1.53-.42-3.403.817-3.83 2.256-.218.801-.076 1.714.353 2.83 2.094 5.095 4.674 9.988 7.812 13.703.15.175.376.278.605.28h10.887a.804.804 0 0 0 .478-.166c1.161-.87 2.097-2.351 2.873-4.117a23.622 23.622 0 0 0 1.676-5.812c.306-1.998.304-3.87-.126-5.532-.414-1.603-1.532-2.938-3.2-3.136a5.235 5.235 0 0 0-1.16.115c-.206-.5-.496-.928-.857-1.186a2.85 2.85 0 0 0-1.713-.56c-.477.007-.912.183-1.298.458-.173-.267-.351-.546-.58-.713a2.904 2.904 0 0 0-1.739-.561c-.417 0-.822.118-1.21.28v-6.807C13.869 9.08 12.168 7.995 10.678 8zm0 1.632c.907 0 1.613.713 1.613 1.631v8.566c-.005.37.27.725.625.808a.83.83 0 0 0 .912-.451c.178-.375.85-.765 1.286-.765.195 0 .559.083.793.255.235.172.416.374.416.969 0 .363.27.707.62.792a.827.827 0 0 0 .905-.423c.327-.662.504-.77.907-.777.112-.002.503.073.756.255.254.181.441.39.441.969a.835.835 0 0 0 .485.755.818.818 0 0 0 .876-.156c.306-.153.606-.2.995-.192.961.125 1.46.733 1.802 1.95.345 1.23.358 2.985.076 4.832s-.838 3.787-1.55 5.404c-.668 1.517-1.484 2.703-2.205 3.315H10.26c-2.83-3.378-5.533-8.566-7.296-12.938-.367-.955-.4-1.505-.315-1.81.3-.79 1.136-1.235 1.853-1.122.857.326 1.07.905 1.436 1.568l1.6 3.25a.828.828 0 0 0 .906.422.84.84 0 0 0 .62-.792V11.263c0-.917.705-1.631 1.612-1.631z'/>" +
        "<path d='M4.442 0a.803.803 0 0 0-.58.243L.227 3.923c-.177.165-.22.37-.227.576.006.224.06.403.227.575l3.635 3.681c.296.33.844.318 1.148.013.305-.305.308-.861 0-1.163L2.751 5.317H18.25l-2.26 2.288c-.307.302-.304.858 0 1.163.305.305.854.302 1.15-.013l3.634-3.68c.167-.173.22-.352.227-.576-.008-.206-.05-.41-.227-.575L17.138.243c-.301-.324-.844-.318-1.148-.013-.305.305-.308.861 0 1.163l2.259 2.288H2.75l2.26-2.288c.307-.302.304-.858 0-1.163A.788.788 0 0 0 4.441 0z'/></g></svg> ";

    //Embed Related variables
    var embedURL = "slider/min";
    var currentScript = document.currentScript != null && document.currentScript.src.indexOf(embedURL) != -1 ? document.currentScript : (function () {
        //grab the current script dom element
        // resolution for IE since it does not have currentScript to find the currently running script on the page
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src.indexOf(embedURL) != -1) {
                return scripts[i];
            }
        }
    })();
    var hostname; //host name is obtained by the given url of the script source
    var firstWidgetRun = true; //makes sure the listeners run once
    var windowWidth;
    var query = {}; // QUERY grabbed from database info put into iframe


    //Iframe Related variables
    var friendlyIF;
    var IfClassName = 'sliderIframe';
    var iframeStyleObject = { // SET STYLE of IFRAME sent into createNewIframe();
        className: IfClassName,
        width: '300', //default
        height: '250',
        name: currentScript.src,
        style: {
            border: 'none',
            'overflow-x': 'auto',
            'overflow-y': 'hidden'
        }
    };
    var htmlFile = require('../html/index.html');
    var cssFile = require('../css/slider.css');


    //#0
    function getIgloo(windowFrame) {
        try {
            windowFrame = windowFrame ? windowFrame : window;
            if (iglooTries < totalTries) {
                iglooTries++;
                if (windowFrame.igloo) {
                    // log("#0 getIgloo");
                    igloo = windowFrame.igloo;
                    creativeUnitSetup();
                } else {
                    getIgloo(windowFrame.parent);
                }
            } else {
                console.warn('igloo not found after 10 tries');
                creativeUnitSetup();
            }
        } catch (e) {
            console.warn('igloo not found error =>', e);
            creativeUnitSetup();
        }
    }

    //#1
    function creativeUnitSetup() {
        // log("#1 creativeUnitSetup");

        //Initial load Waits for the DOMContent to load
        if (firstWidgetRun == true && (document.readyState == "complete" || document.readyState == "interactive")) { // if page is already loaded'
            firstWidgetRun = false;
            friendlyIF = createNewIframe(htmlFile, iframeStyleObject);
            setUpNewIframe(friendlyIF);
            checkEmbeds(friendlyIF);
            startTriviaAnalytics(friendlyIF);
            slider(friendlyIF);
        } else { // elseonce page has finished loading, so as not to slowdown the page load at all
            document.onreadystatechange = function () {
                if (firstWidgetRun == true && (document.readyState == "complete" || document.readyState == "interactive")) {
                    firstWidgetRun = false;
                    friendlyIF = createNewIframe(htmlFile, iframeStyleObject);
                    setUpNewIframe(friendlyIF);
                    checkEmbeds(friendlyIF);
                    startTriviaAnalytics(friendlyIF);
                    slider(friendlyIF);
                }
            }
        }
    }

    //#2
    function createNewIframe(htmlFile, object) {
        // log('#2 createNewIframe');
        // console.log('iframe insert html');
        // console.log('iframe styles', object);
        //create friendly iframe to place ourselves inside
        var iframe = document.createElement('iframe');
        for (var obj in object) {
            switch (obj) {
            case 'style':
                for (var style in object[obj]) {
                    iframe[obj][style] = object[obj][style];
                }
                break;
            default:
                iframe[obj] = object[obj];
                break;
            }
        }

        currentScript.parentNode.insertBefore(iframe, currentScript);

        //create inline html for friendlyIframe
        if (htmlFile) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(htmlFile);
            iframe.contentWindow.document.close();
        } else {
            console.warn('No Html Available for friendly iframe');
        }
        return iframe;
    }

    //#3
    function setUpNewIframe(iframe) {
        // log('#3 setUpNewIframe');
        // console.log(iframe);
        var friendlyIFdocument = iframe.contentWindow.document;
        if (friendlyIFdocument.readyState == "complete" || friendlyIFdocument.readyState == "interactive") { // if page is already loaded'
            getIframeQuery(iframe);
            setIframeStyle(iframe, query);
            //after you get the query you set the environment
            setupEnvironment(query);
        } else { // elseonce page has finished loading, so as not to slowdown the page load at all
            friendlyIFdocument.onreadystatechange = function () {
                if (friendlyIFdocument.readyState == "complete" || friendlyIFdocument.readyState == "interactive") {
                    getIframeQuery(iframe);
                    setIframeStyle(iframe, query);
                    //after you get the query you set the environment
                    setupEnvironment(query);
                }
            }
        }
    }

    //#4
    function getIframeQuery(iframe) {
        // log('#4 getIframeQuery');
        try {
            var srcQuery = iframe.name.split("js?")[1];
            //determine if a query string is after the index.html location || if query is after a javascript location
            if (srcQuery != "" && srcQuery != null) {
                try {
                    query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
                } catch (e) {
                    console.log(e);
                }
            } else {
                query = JSON.parse(decodeURIComponent(document.location.search.substr(1)));
            }
        } catch (e) {
            console.log('query error', e);
            query = {};
        }
        // console.log('query', query);
    }

    //#5
    function setIframeStyle(iframe, query) {
        // log('#5 setIframeStyle');
        // console.log('setIframeStyle =>', iframe);
        var friendlyIFdocument = iframe.contentWindow.document;

        //create inline style for friendlyIframe
        var style = friendlyIFdocument.createElement("style");
        if (query.wide != null && query.wide != '') {

            //to see if the parent node is an igloo div that was created by igloo
            if (iframe.parentNode.getAttribute('igloo_id')) {
                iframe.parentNode.style.width = "100%"; // CHANGE PARENT DIV which is igloo div to have 100% width
                iframe.parentNode.style.maxWidth = "992px"; // By Design max width will be 992px
            }

            //set iframe width to be 100% width to be responsive
            iframe.width = "100%";
            iframe.height = "250";

            //CREATE LISTENER FOR RESIZE
            window.addEventListener('resize', function () {
                //set iframe to width of parent node
                iframe.width = iframe.parentNode.clientWidth;
            }, true);

            style.appendChild(friendlyIFdocument.createTextNode(cssFile));
        } else {
            style.appendChild(friendlyIFdocument.createTextNode(cssFile));
        }

        //append the css file into iframe head
        friendlyIFdocument.head.appendChild(style);

        //create variable to be used similar to jquery for id's
        $ = function (e) { // create a simple version for grabbing id's of elements
            return friendlyIFdocument.getElementById(e)
        };

    }

    //#6
    function setupEnvironment(widgetQuery) { //runs once per embed
        // log('#6 setupEnvironment');
        query = widgetQuery;
        var cat = widgetQuery.category;
        var group = widgetQuery.group == '' ? widgetQuery.group = null : widgetQuery.group;
        var dom = widgetQuery.dom == '' ? widgetQuery.dom = null : widgetQuery.dom;
        var environment = getDomain(friendlyIF.name.split('.')[0]);
        var env;

        if (widgetQuery.env != null) {
            env = widgetQuery.env && widgetQuery != 'prod-' ? widgetQuery.env : 'prod-';
        } else {
            env = getEnv(environment);
        }

        //setup Image Environment api
        apiCallUrl = dwApi;
        //if group does exist here then add group query parameter otherwise add categeory parameter for api
        if (widgetQuery.group != null && widgetQuery.group != "") {
            apiCallUrl += "?group=" + group;
        } else {
            subCategory = widgetQuery.category;
            apiCallUrl += "?cat=" + cat;
        }
        if (widgetQuery.group == 'weather' || widgetQuery.category == 'weather') {
            waldo = protocolToUse + env + waldo;
            wheresWaldo();
            apiCallUrl += '&location=' + getLocation[0].state.toLowerCase() + '&loc_type=state';
        }
        if (dom != null && dom != "" && (widgetQuery.group != 'weather' && widgetQuery.category != 'weather')) {
            apiCallUrl += "&partner=" + dom;
        }
        //FALL BACK API SET HERE INCASE Dynamic widget api fails to make a call
        apiCallUrl = protocolToUse + env + apiCallUrl;
        postUrl = protocolToUse + env + postUrl;
        fallBackApi = protocolToUse + env + dwApi + "?group=sports";
        imageUrl = protocolToUse + env + imageUrl; // this is global call that is used for images
        // console.log(apiCallUrl);
        // console.log(postUrl);
        // console.log(fallBackApi);
        // console.log(imageUrl);
        // console.log('waldo', getLocation);
    }

    //#6-1
    function wheresWaldo() {
        // log('#6-1 Where's Waldo?');
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {

            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                //On complete function
                getLocation = JSON.parse(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", waldo, false); // false for synchronous request
        xmlHttp.send(null);
    }

    //#7
    function checkEmbeds(element) {
        // log('#7 checkEmbeds');
        var widgetContainers = window.document.getElementsByClassName(IfClassName);
        if (widgetContainers) {
            total_embeds = widgetContainers.length;
            element.id = !element.id && element.id != '' ? element.id : 'slider_id_' + total_embeds;
        } else {
            console.warn('No widget containers found');
        }
        // console.log('total_embeds', total_embeds);
        // console.log('element.id', element.id);
    }

    //#8
    slider = function (element) {
        // log('#8 slider');
        //inject HTML and CSS structure
        var html =
            "<div class='wrapper'><div class='pointer' id='pointer_" + total_embeds + "'><div class='icon swipe_right'>" + svgIcon +
            "</div></div><div class='slider' id='slider_" + total_embeds + "'></div>" +
            "<div class='slider_ad_zone fade_in_out'><div class='slider_background'><div class='ad_progress_fill'>" +
            "</div><div class='ad_progress_bar'></div></div></div></div>";

        // var apiCallUrl = protocolToUse + query.env.replace("prod-", "") + 'dw.synapsys.us/list_api.php';
        // console.log(element);
        var sliderWindow = element.contentWindow;
        var sliderDocument = element.contentWindow.document;
        // console.log(sliderDocument);
        var pointer; //When content is defined set the swipe indicator
        var slider; //When content is defined set this variable to Container for where sliding blocks are inputed into

        var sliderBlocks = sliderDocument.getElementsByClassName('slider_block'); // an array of all the blocks in our slider
        var scrollIncrements = 0; // how much to increase the scroll by in this interpolation loop?
        var rand; // list random ID
        // var firstAd; // the div for the actual igloo stack to live in, that gets moved around as you scroll
        var currentPub; // the current color scheme and fallback imageset to use
        var lazyLoaded = false; // are the images after the first one loaded in yet?
        var currentListId = ""; // an ID to send to yeti for the current list
        var widgetZone = element.parentElement.getElementsByClassName("widget_zone")[0];
        var widgetLoaded = false;
        var listCount = 0; //keeps count of number of items in a list and aggregates as more lists are loaded
        //Variables for slider functionality
        var startCord = {'x': -1}, //X Coordinate on touchstart or mousedown
            endCord = {'x': -1}, //X Coordinate on touchend or mouseup
            direction = '', //Swiped Direction
            minDistanceX = 10, //Min distance on X axis
            minTime = 100, //Max allowed time between swipe start and end
            startTime = 0, //Time on swiped start
            elapsedTime = 0, //Elapsed time between swiped start and end
            targetEl = sliderDocument.getElementsByClassName('slider'), //Target element
            scrollCounter = 0, //Incremental counter to keep track of list position
            initialLoad = true, //Determines initial load so that new event listeners are not added
            scrollRight = false, //Scroll direction
            scrollLeft = false, //Scroll direction
            initialTile = 220, //Initial tile width to scroll
            appendedTile = 246, //Tile width to scroll plus padding
            adCounter = 0, //Counter for displaying ad
            initialAdRun = false; //flag so that ad will not repeat once initialized
        widgetZone.style.display = 'none';

        element.classList.add("slider_" + query.category);

        function getPublisher(pub) {
            // console.log('getPublisher', pub);
            var pubs = {
                mlb: {
                    hex: "#bc2027",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/baseball_stock.jpg"
                },
                nfl: {
                    hex: "#004e87",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/07/football_stock_01_970x250.jpg"
                },
                ncaaf: {
                    hex: "#004e87",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/07/football_stock_01_970x250.jpg"
                },
                nba: {
                    hex: "#f26f26",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"
                },
                college_basketball: {
                    hex: "#f26f26",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"
                },
                finance: {
                    hex: "#3098ff",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/finance_stock.jpg"
                },
                weather: {
                    hex: "#43B149",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/weather_stock.jpg"
                },
                crime: {
                    hex: "#43B149",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
                },
                demographics: {
                    hex: "#43B149",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
                },
                politics: {
                    hex: "#43B149",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
                },
                disaster: {
                    hex: "#43B149",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
                },
                celebrities: {
                    hex: "#6459d3",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/04/actor.jpg"
                },
                music: {
                    hex: "#6459d3",
                    fallbackImage: "images.synapsys.us/01/fallback/stock/2017/04/musician.jpg"
                }
            };
            if (pub == null || pub == "" || !pubs[pub]) {
                return pubs["finance"];
            } else {
                return pubs[pub];
            }
        }

        /***************************** runAPI ***************************
         * @function runAPI
         * function that makes an asynchronous request using http and setting a global variable equal to the response of the text.
         * fail safe of retrying 10 times before sending error message
         *
         * @param function apiUrl -
         */
        //#9
        function loadData(apiUrl, loadMore, newCount) { //Make it to where it is easy to be reused by anyone
            if (typeof loadMore == 'undefined') {
                loadMore = false;
            }
            if (typeof newCount == 'undefined') {
                newCount = 0;
            }
            // log('#9 loadData');
            //variable that stores the response of an http request
            if (sliderWindow.XMLHttpRequest) {
                var xhttp = new XMLHttpRequest();
            } else {
                var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
            }
            xhttp.onreadystatechange = function () {
                // Check if the loading status of the current document is done
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        // On success parse out the response
                        widgetData = JSON.parse(this.responseText);
                        // console.log(widgetData);
                        var dataArray = widgetData.l_data != null ? widgetData.l_data : widgetData.data.listData;
                        //set maximum index of returned dataLayer
                        if (dataArray.length >= 25) {
                            currentIndex = 24;
                            maxIndex = 25;
                        } else {
                            currentIndex = dataArray.length - 1;
                            maxIndex = dataArray.length;
                        }
                        currentPub = getPublisher(widgetData.category);
                        //aggregates the number of items in a list
                        listCount = newCount + dataArray.length;
                        //Once Data from Api returns then populate slider
                        populateslider(widgetData, loadMore);
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
                            sliderDocument.getElementsByClassName('e_container')[0].style.display = 'none';
                            throw msg + " | hiding widget fallback failed container | => PLEASE CONTACT YOUR PROVIDER";
                        }
                        setTimeout(loadData(apiUrl), 500)
                    }
                }
            };
            xhttp.open("GET", apiUrl, true);
            xhttp.send();
        }

        /************************** runAPI END ************************/

        function displayAd() {
            var sliderContainer = sliderDocument.getElementsByClassName('slider_background')[0];
            var sliderAdZone = sliderDocument.getElementsByClassName('slider_ad_zone fade_in_out')[0];
            if (!widgetLoaded) {
                sliderContainer.appendChild(widgetZone);
                widgetLoaded = true;
            }
            widgetZone.style.display = 'block';
            widgetZone.style.opacity = 1;
            widgetZone.style.zIndex = 50;
            sliderAdZone.style.display = 'block';
            var adProgressCounter = 1,
                adIntervalSeconds = 10,
                adIntervalMilliSeconds = 1000;
            var adIntervalTimer = setInterval(function () {
                adProgressCounter++;
                var progressBar = sliderDocument.getElementsByClassName('ad_progress_bar')[0];
                progressBar.style.width = (adProgressCounter * 3.334) + '%';
                if (adProgressCounter >= 31) {
                    adProgressCounter = 1;
                    progressBar.style.width = 0;
                    clearInterval(adIntervalTimer);
                    sliderAdZone.style.display = 'none';
                }
            }, adIntervalMilliSeconds / adIntervalSeconds);
        }

        function setCursorIcon() {
            var iconUrl;
            var sliderDomain = getDomain(friendlyIF.name);
            // For local use only
            // iconUrl = protocolToUse + sliderDomain + "/slider/cursors/swipe-icon.svg";
            iconUrl = protocolToUse + getEnv(sliderDomain.split('.')[0]) + "w1." + sliderDomain + "/widgets/slider/cursors/swipe-icon.svg";
            sliderDocument.getElementsByClassName('wrapper')[0].style.cursor = "url('" + iconUrl + "'), move";
        }

        //#10
        function populateslider(data, loadMore) {
            // log('#10 populateslider');
            // console.log('populateslider', data);
            var items = data.l_data;
            var title;
            var backStyle;
            var outputHTML = "";
            var listWrapper = sliderDocument.createElement('div');
            listWrapper.className = 'list_wrapper';
            listWrapper.setAttribute('list-param', data.l_param);
            listWrapper.setAttribute('category', data.category);

            //grab a random number for title tile
            var randomNumber = Math.floor(Math.random() * (items.length - 1));
            var randomImage = items[randomNumber].li_img;

            // CREATE WRAPPER of slider inside of iframe && set global variables. This only needs to run on initial load
            if (!loadMore) {
                sliderDocument.body.innerHTML = html;
                slider = sliderDocument.getElementById('slider_' + total_embeds);
                pointer = sliderDocument.getElementById('pointer_' + total_embeds);
            }

            //TODO create IMAGE check function
            if (randomImage == null ||
                randomImage == "" ||
                randomImage.indexOf("no_") != -1 ||
                randomImage.indexOf("no-") != -1 ||
                randomImage.indexOf('fallback') != -1
            ) {
                randomImage = protocolToUse + currentPub.fallbackImage;
            }

            items = items.reverse();
            title = data.l_alt_title != null && data.l_alt_title != '' ? data.l_alt_title : data.l_title; // used due to the fact slider is not wide enought to have more than 50 characters for title

            var titleTile = {
                hex: currentPub.hex,
                image: randomImage,
                title: title,
                icon: svgIcon
            };
            outputHTML = createTitleTile(titleTile);

            for (var i = 0; i < items.length && i < items.length; i++) {
                if (items[i].li_value) {
                    items[i].li_value = items[i].li_value.replace(items[i].li_tag, "");
                }
                var style = "";
                var image_class = "";
                var image = items[i].li_img.replace("'", "");
                //image check

                if (items[i].player_wide_img != null && items[i].player_wide_img != "") {
                  image = imageUrl + items[i].player_wide_img;
                } else if ((items[i].player_wide_img == null || items[i].player_wide_img == "") && (items[i].team_wide_img != null && items[i].team_wide_img != "")) {
                  image = imageUrl + items[i].team_wide_img;
                } else {
                  image = items[i].li_img;
                }

                if (data.category == "weather" || image == null || image == "" || image.indexOf("no_") != -1 || image.indexOf("no-") != -1 || image.indexOf("fallback") != -1 || image === "//images.synapsys.us") {
                    style = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
                    image_class = "fallback";
                    if (data.category != "music") {
                        image = protocolToUse + currentPub.fallbackImage;
                    }
                }
                // background style
                if (data.category == "finance") {
                    backStyle = "style='background-image:url('" + image + "?width=200" + "')";
                } else {
                    backStyle = "style='background-color: "+currentPub.hex+";'";
                }

                if (items[i].data_point_2 == null) {
                    items[i].data_point_2 = "";
                }
                if (items[i].data_value_2 == null) {
                    items[i].data_value_2 = "";
                }

                // TODO REWORK BELOW to use category from data instead of embed since we don't have group as a valid category to use
                // if using new api on certain categories then use new format
                var sliderData = {};
                if (data.category == "celebrities" || data.category == "weather" || data.category == "music" || data.category == "nfl" || data.category == "ncaaf") {
                    if (items[i].data_point_2 == null) {
                        items[i].data_point_2 = "";
                    }
                    if (items[i].data_value_2 == null) {
                        items[i].data_value_2 = "";
                    }
                    sliderData = {
                        hex: currentPub.hex,
                        style: style,
                        img_class: image_class,
                        img_background: backStyle,
                        image: image,
                        value: items[i].data_value_2,
                        tag: items[i].data_point_2,
                        title: items[i].li_title,
                        sub_txt: items[i].li_sub_txt,
                        rank: items[i].li_rank
                    };
                } else {
                    sliderData = {
                        hex: currentPub.hex,
                        style: style,
                        img_class: image_class,
                        img_background: backStyle,
                        image: image,
                        value: items[i].li_value,
                        tag: items[i].li_tag,
                        title: items[i].li_title,
                        sub_txt: items[i].li_sub_txt,
                        rank: items[i].li_rank
                    };
                }
                if(sliderData.tag === ""){
                  outputHTML += createDataTile('type2', sliderData);
                }else{
                  outputHTML += createDataTile('type1', sliderData);
                }
            }

            //put slider blocks into listWrapper with data attr
            listWrapper.innerHTML += outputHTML;

            //once list wrapper is created and finished put it inside of slider Div for swipe feature
            slider.innerHTML += listWrapper.outerHTML;

            //check in-view attribute after list has populated
            checkListView();
            setCursorIcon();
            viewDwell.startTime();

            createSliderListeners(); // create listeners of content when content has been populated
        } //TODO END OF FUNCTION populateslider make this function into seperate functions that returns what is neccessary for it is modular

        //Adds new list when the user scrolls far enough
        function appendNewList(appendCount) {
            // log('NEXT LIST', payloadStyles);
            lazyLoaded = false;
            listRand++;
            var sliderApi = apiCallUrl + "&rand="+ listRand;
            loadData(sliderApi, true, appendCount);
        }

        //#10-1
        function createTitleTile(titleData) {
            // log('#10-1 createTitleTile', payloadStyles);
            var sliderBlock = sliderDocument.createElement('div');
            sliderBlock.className = 'slider_block';
            var titleOutput;
            try {
                tileOutput =
                    "<div class='title_overlay' >" +
                    "<div class='title_image_div overlay' style='background-color: " + titleData.hex + "'>" +
                    "<img class='title_image' src=" + titleData.image + "?width=200" + "/>" +
                    "</div>" +
                    "<div class='title'>" + titleData.title + "</div>" +
                    "<div class='instructions_container'>" +
                    "<div class='instructions_icon'>" + titleData.icon + "</div>" +
                    "<div class='instructions_text'>Swipe to progress through the list</div>" +
                    "</div>" +
                    "</div>";
            } catch (e) {
                titleOutput = "";
                console.error(e);
            }

            sliderBlock.innerHTML = tileOutput;

            return sliderBlock.outerHTML;
        }

        //#10-2
        function createDataTile(type, tileData) {
            // log('#10-2 createTileType', payloadStyles);
            var sliderBlock = sliderDocument.createElement('div');
            sliderBlock.className = 'slider_block';
            var tileOutput;
            try {
                switch (type) {
                case 'type1':
                    tileOutput =
                        "<div class='list_item'>" +
                        "<div class='profile_image_div " + tileData.img_class + "' " + tileData.img_background + ">" +
                        "<div class='num' style='border-color:" + tileData.hex + "'>" +
                        "<div class='num_text'>#<b>" + tileData.rank + "</b></div>" +
                        "</div>" +
                        "<img class='profile_image' onmousedown='if (event.preventDefault) event.preventDefault()' src=" + tileData.image + "?width=230" + " style='" + tileData.style + "'>" +
                        "</div>" +
                        "<div class='info'>" +
                        "<div class='info_container'>" +
                        "<div class='name'>" + tileData.title + "</div>" +
                        "<div class='value bold'>" + tileData.value + "</div>" +
                        "<div class='stat_type'>" + tileData.tag + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    break;
                case 'type2':
                    tileOutput =
                        "<div class='list_item'>" +
                        "<div class='profile_image_div " + tileData.img_class + "' " + tileData.img_background + ">" +
                        "<div class='num' style='border-color:" + tileData.hex + "'>" +
                        "<div class='num_text'>#<b>" + tileData.rank + "</b></div>" +
                        "</div>" +
                        "<img class='profile_image' onmousedown='if (event.preventDefault) event.preventDefault()' src=" + tileData.image + "?width=230" + " style='" + tileData.style + "'>" +
                        "</div>" +
                        "<div class='info'>" +
                        "<div class='info_container'>" +
                        "<div class='value'>" + tileData.title + "</div>" +
                        "<div class='stat_type'>" + tileData.value + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    break;
                default:
                    break;
                }
            } catch (e) {
                console.error(e);
            }

            sliderBlock.innerHTML = tileOutput;

            return sliderBlock.outerHTML;
        }

        //#11
        function createSliderListeners() {
            // log('#11 createSliderListeners');
            //initial event listeners declaration
            function scrollStart(e) {
                e = e ? e : friendlyIF.event; //check element and fallback to friendlyIF event
                e = ('changedTouches' in e) ? e.changedTouches[0] : e; //Check for changedTouches in element (touch events only); if exists use clientX else use mouse element
                startCord = {'x': e.pageX}; // Start Coordinates on x axis on mousedown or touchstart
                startTime = new Date().getTime(); //Set start time
            }

            function scrollMove(e) {
                e = e ? e : friendlyIF.event; //Check element and fallback to friendlyIF event
                e.preventDefault(); //Cancels any default action on element
            }

            function scrollEnd(e) {
                var sliderScroll = scrollIncrements;
                e = e ? e : friendlyIF.event; //check element and fallback to friendlyIF event
                e = ('changedTouches' in e) ? e.changedTouches[0] : e; //Check for changedTouches in element (touch events only); if exists use clientX else use mouse element
                endCord = {'x': e.pageX - startCord.x}; //End coordinates on mouseup or touchend
                elapsedTime = new Date().getTime() - startTime; //Get elapsed time
                if (elapsedTime >= minTime) { //Check if user interacted for more than 100ms
                    direction = (endCord.x < 0) ? 'left' : 'right'; //Set direction
                    if (Math.abs(endCord.x) >= minDistanceX) { //Ensure that the user scrolled at lease 10px left or right
                        switch (direction) {
                            case 'left':
                                scrollIncrements = scrollCounter === 0 ? sliderScroll + initialTile : sliderScroll + appendedTile; //advance
                                scrollLeft = true;
                                slider.style.right = scrollIncrements + 'px';
                                scrollCounter++;
                                adCounter++;
                                if (scrollCounter > 0) {
                                    pointerAnimation(false);
                                }
                                break;
                            case 'right':
                                if (scrollCounter !== 0) {
                                    scrollCounter--;
                                    adCounter--;
                                    scrollIncrements = scrollCounter === 0 ? sliderScroll + (-initialTile) : sliderScroll + (-appendedTile); //advance
                                    scrollRight = true;
                                    slider.style.right = scrollIncrements + 'px';
                                    if (scrollCounter === 0) {
                                        pointerAnimation(true)
                                    }
                                    break;
                                }
                        }
                    } else { //fallback to advance tile if the user scroll is less than 10px
                        scrollIncrements = scrollCounter === 0 ? sliderScroll + initialTile : sliderScroll + appendedTile; //advance
                        scrollLeft = true;
                        slider.style.right = scrollIncrements + 'px';
                        scrollCounter++;
                        adCounter++;
                        if (scrollCounter > 0) {
                            pointerAnimation(false);
                        }
                    }

                    if (query.event) { // if we are in igloo v3 or >
                            // send the list identifiers to yeti analytics
                            query.event.event = "widget-list";
                            query.event.l = currentListId;
                            sendPostMessageToIgloo({
                                action: 'snt_tracker',
                                snt_data: query.event
                            }, 10);
                    }
                    //display ad after every third increment of list in one direction
                    if (!initialLoad || adCounter === 4) {
                        if (adCounter === 4 && !initialAdRun) {
                            displayAd();
                            initialAdRun = true;
                        } else if (initialAdRun && (adCounter === 0 || adCounter === 8)) {
                            displayAd();
                            adCounter = 0;
                            initialAdRun = false;
                        } else if (adCounter === -4) { //Needed in the event the adCounter is set to 0 and the user scrolls left
                            displayAd();
                            adCounter = 0;
                            initialAdRun = false;
                        }
                    }

                    //append new list when scrollCounter is 5 less than list length
                    if (scrollCounter === (sliderBlocks.length - 5)) {
                        appendNewList(scrollCounter);
                    }
                }
            }

            function addListeners(el, userEv, fn) { //Function to set listeners
                var events = userEv.split(' '); //Split mouse/touch events
                for (var i = 0, length = events.length; i < length; i++) {
                    el.addEventListener(events[i], fn, false);
                }
            }

            //turns on/off pointer animation on 1st tile
            function pointerAnimation(animate) {
                if (!animate) {
                    pointer.style.opacity = '0';
                    slider.classList.add("stopAnim");
                } else {
                    slider.classList.remove("stopAnim");
                    pointer.style.opacity = '1';
                }
            }

            //check to see if there are 5 tiles remaining
            if (initialLoad) {
                addListeners(targetEl[0], 'mousedown touchstart', scrollStart);
                addListeners(targetEl[0], 'mousemove touchmove', scrollMove);
                addListeners(targetEl[0], 'mouseup touchend', scrollEnd);
                initialLoad = false;
            }

        }// END createSliderListeners

        //TODO make more modular
        function checkListView() {

              setTimeout(function(){
                var l_wrappers = sliderDocument.getElementsByClassName('list_wrapper');
                var padding = 30;
                var percent = 0.5;
                for (var i = 0; i < l_wrappers.length; i++) {
                  //iframe width on screen
                  var iWidth = element.offsetWidth;
                  //wrapper width on screen
                  var wLeft = l_wrappers[i].getBoundingClientRect().left;

                  //wrapper width on screen
                  var wWidth = l_wrappers[i].clientWidth;

                  var listPadding = ((l_wrappers.length - (i-1)) * iWidth);
                  var elementChecked = wWidth-padding+ wLeft;
                  if(percent){
                    if( (elementChecked / iWidth) > percent && (elementChecked - listPadding) < wWidth){
                      l_wrappers[i].setAttribute('in-view', true);
                    }else{
                      l_wrappers[i].setAttribute('in-view', false);
                    }
                  }else{
                    if (elementChecked < 0 || elementChecked > wWidth ) {
                      l_wrappers[i].setAttribute('in-view', false);
                    }else{
                      l_wrappers[i].setAttribute('in-view', true);
                    }
                  }
                }
              }, 700);// about 100ms after the animation ends on slider
        }


        //slider function STARTS HERE loadData()
        var sliderApi = apiCallUrl + "&rand="+ listRand;
        loadData(sliderApi);
    };

    /*
     ****************************************************************************************************************************************
     ***********************ANALYTICS VARIABLES *********************************************************************************************
     ****************************************************************************************************************************************
     */

    //global variables used for payload
    var storeSessionFn = {
        get: function () {
            if (sessionStorage.getItem('snt_analytics') === null) {
                storeSession = sessionStorage.setItem('snt_analytics', JSON.stringify({
                    before_time: null,
                    after_time: null,
                    session_id: null
                }));
            }
            storeSession = JSON.parse(sessionStorage.getItem('snt_analytics'));
            return storeSession;

        },
        set: function (jsonData) {
            sessionStorage.setItem('snt_analytics', JSON.stringify(jsonData));
        }
    }; //storeSessionFn
    var widgetEngaged = false;
    var contentAnalyzed;
    var timeToLive = 600000;
    var payloadFail = 0;
    var sessionId,
        partnerId,
        placementId,
        viewEngaged = false;

    var viewDwell, // view_dwell, Each time a quiz is 50%+ in view for any length of time. (collected every 100ms)
        embedTime, // engage_dwell, When CU is engaged*, each time a question is 50%+ in view for any length of time. (collected every 100ms)
        sessionTimer, // create Session Timer to know when the session has ended and create a new payload;
        payloadTimer, // create Payload Timer to know when to auto send payloads if variables are met;
        engageDwell, // time from the moment the widget is in view and engaged
        dwellLimitTimer,
        isActiveTimer = 0,
        windowActiveTimer; // time limiter for dwell so dwell timer can be stopped after a certain time limit

    var storeSession;
    var sessionBefore = 0;
    var sessionAfter = 0;

    var igloo,
        windowActive = true,
        userAgentObj,
        category,
        embed_view = 0, //Each time an embed is 50%+ in view for 1+ seconds. This is recorded only once per embed load.
        content_title = '',
        total_clicks = 0,
        list_view = 0,
        bounce = 0, //should only ever be 1, never more than due to submission on a payload level.  || always return 1 until questions is answered then return 0 which zero means it is no longer in z since it has been answered
        total_embeds; // Record total amount of embeds on a page no matter if in view or not

    var view = false;
    var oneSecMRC = 0; //MRC standard that content must be atleast 1 sec in view before be considered to be actually viewed
    var oneSecMRCcheck = false;


    function startTriviaAnalytics(element) {
        // log('TRIVIA ANALYTICS START', payloadStyles);
        contentAnalyzed = element;
        resetAnalytics();

        userAgentObj = iglooAnalytics(contentAnalyzed, 'useragent');

        // if igloo utilities then iglooAnalytics() function will return boolean true if igloo is 50% or more in view of use window
        view = iglooAnalytics(contentAnalyzed, 'view'); // check initial load if widget is available
        //TODO COMBINE TIMERS TO GET A MORE ACCURATE TIME INTERVAL REPORTING
        analyticsSession(); // get session ID first
        analyticsWindowFocus();
        analyticsDwellEngagement();
        analyticsViewScroll(contentAnalyzed);
    };

    /** igloo.utils.elementIsVisible(element, debug_div, igloo_debug, min_percent)
     * This function checks if a given element is 60% or more in the viewport
     * @param  {DOMElement}  element     The element to check for visibility
     * @param  {DOMElement}  debug_div   The debugging div to put the % visible in
     * @param  {Boolean}     igloo_debug The debugging state of igloo
     * @param  {Number}      min_percent The minimum percent for an element to be
     *                                   considered in view (default 0.6)
     * @return {Boolean}                 Whether the element is in view
     */
    /** https://github.com/passit/adstack/blob/adstack/prod/src/js/IglooModule.js#L37
     * igloo.browser
     * This object describes the current browser including name, version, mobile,
     * and bot
     * @type {Object}
     * @key  {String}  name    The name of the broswer (Chrome, IE, etc)
     * @key  {String}  version The version of the browser
     * @key  {Boolean} bot     Whether the browser is a bot or not
     * @key  {Boolean} mobile  Whether the browser is mobile or not
     */
    function iglooAnalytics(contentElement, type, percent) {
        if (typeof percent == 'undefined') {
            percent = 0.5; //default 50% visibility
        }
        if (igloo) {
            try {
                switch (type) {
                    case 'view':
                        return igloo.utils.elementIsVisible(contentElement, null, false, percent);
                        break;
                    case 'useragent':
                        return igloo.browser;
                        break;
                    default:
                        console.warn('igloo Utility not found');
                        break;
                }
            } catch (e) {
                console.warn('igloo not found', e);
            }
        }
    }

    //TODO MUST USE TIMESTAMPS ON CERTAIN TIMERS TO GET A MORE PROPER TIME ANALYTICS;
    /**timer(name, tick, stopAt, debug_element)
     * Function to create a timer with variable features to startTime, pauseTime, get, or even auto pauseTime
     * @type {Object}
     * @key  {String} name    give the timer a name to track
     * @key  {Number} tick    tick is how many times the interval Timer should update the time(ms)
     * @key  {Number} stopAt  if you want the time to auto pauseTime at a certain time(ms)
     * @key  {Object} debug_div  the element (div/span/etc..) you want to debug off of
     * @key  {Object} createFunction runs the function user creates every interval
     */
    function timer(name, tick, stopAt, debug_element, createFunction) {
        this.name = name;
        this.time = 0;
        this.stopAt = stopAt;
        this.timerOn = false;
        this.tick = tick;
        this.intervalTimer = function () {},
            this.startTime = function () {
                if (!this.timerOn) {
                    this.timerOn = true;
                    var cTimer = this;
                    this.intervalTimer = setInterval(function () {
                        cTimer.time += cTimer.tick;
                        if (cTimer.stopAt && cTimer.time >= cTimer.stopAt) {
                            cTimer.pauseTime();
                        }
                        if (debug_element && debug) {
                            debug_element.innerHTML = cTimer.time;
                        }
                        if (createFunction) {
                            createFunction(cTimer);
                        }
                    }, this.tick);
                }
            },
            this.pauseTime = function () {
                clearInterval(this.intervalTimer);
                this.timerOn = false;
            },
            this.resetTime = function () {
                this.time = 0;
            }
    };


    //create an iframe for post request that will be removed once the request has been sent
    function createPayloadFrame(jsonObject) {
        //create friendly iframe to place ourselves inside
        var payloadIframe = document.createElement('iframe');
        var payloadIframeWindow;
        var payloadId = "snt_payload_id_" + rand_id;
        payloadIframe.setAttribute("id", payloadId);
        payloadIframe.className = "report";
        payloadIframe.width = 1;
        payloadIframe.height = 1;
        payloadIframe.scrolling = 'no';
        payloadIframe.style.overflow = 'hidden';
        payloadIframe.src = 'about:blank';
        payloadIframe.style.border = 'none';

        contentAnalyzed.parentNode.insertBefore(payloadIframe, contentAnalyzed);


        payloadIframeWindow = payloadIframe.contentWindow;

        //create inline html for payloadIframe
        payloadIframeWindow.document.open();
        payloadIframeWindow.document.write('<scr' + 'ipt type="text/javascript">' + sendPayload(postUrl, jsonObject) + ' </scr' + 'ipt>');
        payloadIframeWindow.document.close();

        // once postMsg sent the remove the iframe
        var reporting = document.getElementById(payloadId);
        if (typeof reporting.remove === 'function') {
            reporting.remove();
        } else {
            reporting.outerHTML = '';
        }
    }

    function sendPayload(url, jsonObject) {
        // try { TODO re-enable when ready
        //     if (typeof jsonObject == 'object') {
        //         var postXML = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        //         postXML.open("POST", url, true);
        //         postXML.send(JSON.stringify(jsonObject))
        //         // setTimeout(function(){
        //         //   postXML.abort(); // aborts the xhttp and sets readyState to 0 as (UNSENT)
        //         // },200);
        //     }
        // } catch (e) {
        //     console.warn("Product Analytics Error in Post Request", e)
        // }
    }


    var jsonInfo = {
        "bo": "bounce - number == should only ever be 1, never more than due to submission on a payload level. 0||1 ", // bounce
        "cl": "clicks - number == amount since last payload CURRENT||RESETS", //total clicks
        "eb": "total embeds - number == amount since last payload CURRENT", //total embeds on the page
        "ed": "engage dwell - number == amount since last payload CURRENT||RESETS", //engaged dwell
        "ev": "embed views - number == should only ever be 1, never more than due to submission on a payload level CURRENT", // embed views
        "mo": "mobile - boolean 0||1", //mobile
        "pa": "partner id - number", //partner id
        "pl": "placement id - string", //placement id
        "si": "session id - string", // i need to generate this myself
        "vd": "view dwell - number == amount since last payload CURRENT||RESETS" //view dwell after engagements
    };

    function updatePayload(send) {
        if (igloo) {
            if (payloadFail <= 10) {
                try {
                    storeSession = storeSessionFn.get();
                    //TODO TEST VARIABLES
                    var listId = 12314214;
                    if (view && (storeSession['listId'] != listId)) {
                        storeSession['listId'] = listId;
                        storeSessionFn.set(storeSession);
                    }
                    if (oneSecMRCcheck) {
                        embed_view = 1; // if view is true then set it to 1 otherwise keep its current state;
                    }
                    jsonObject = {
                        "ct": content_title,
                        "bo": bounce, // bounce
                        "cl": total_clicks ? total_clicks : 0, //total clicks
                        "eb": total_embeds ? total_embeds : 0, //total embeds on the page
                        "ed": engageDwell ? engageDwell.time : 0, //engaged dwell
                        "ev": embed_view, // embed views
                        "li": storeSession['listId'],
                        "lv": viewDwell ? viewDwell.time : 0, // TODO talk to backend. this may be just an aggregation on their end of viewDwell based on listID
                        "mo": userAgentObj.mobile ? 1 : 0, //mobile
                        "pa": query.event.p, //partner id
                        "pl": query.event.z && query.event.z != '' ? query.event.z : '0', //placement id
                        "si": sessionId, // i need to generate this myself
                        "vd": viewDwell ? viewDwell.time : 0, //view dwell
                    };
                    isMobile = jsonObject['mo'];
                    if (send == 'send') {
                        createPayloadFrame(jsonObject);
                        jsonObject = {};
                        resetAnalytics();
                    } else {
                        // for (var obj in jsonObject) {
                        //     log(obj + ':' + jsonObject[obj] + ':\t\t' + jsonInfo[obj]);
                        // };
                    }
                } catch (e) {
                    payloadFail++;
                    console.log('%cerror updating payload                                                     ', 'background: linear-gradient(#7a0000, #000000); border: 1px solid #3E0E02; color: white');
                    console.warn(e);
                }
            }
        }
    }

    function analyticsWindowFocus() {
        var focused = true;

        var hidden = "hidden";

        // Standards:
        if (hidden in document)
            document.addEventListener("visibilitychange", onchange);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onchange);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onchange);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
        else if ("onfocusin" in document)
            document.onfocusin = document.onfocusout = onchange;
        // All others:
        else
            window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

        function onchange(evt) {
            var v = "visible",
                h = "hidden",
                evtMap = {
                    focus: v,
                    focusin: v,
                    pageshow: v,
                    blur: h,
                    focusout: h,
                    pagehide: h
                };

            evt = evt || window.event;

            storeSession = storeSessionFn.get();

            if (this[hidden]) {
                isActive = false;
                storeSession['before_time'] = Date.now();
                storeSession['after_time'] = Date.now();
                storeSession['session_id'] = storeSession.session_id ? storeSession.session_id : sessionId;

                sessionStorage.setItem('snt_analytics', JSON.stringify(storeSession));
            } else {
                isActive = true;
                storeSession['before_time'] = storeSession['before_time'] ? storeSession['before_time'] : Date.now();
                storeSession['after_time'] = Date.now();
                storeSession['session_id'] = storeSession.session_id ? storeSession.session_id : sessionId;
                sessionStorage.setItem('snt_analytics', JSON.stringify(storeSession));
            }
            if ((storeSession['after_time'] - storeSession['before_time']) >= timeToLive) {
                iglooTries = 0;
                getIgloo(); // RESET ENTIRE TEST
            }
        }

        // set the initial state (but only if browser supports the Page Visibility API)
        if (document[hidden] !== undefined)
            onchange({
                type: document[hidden] ? "blur" : "focus"
            });
    }

    //setup the event listeners if user becomes active trigger start timer
    function set_idle_listeners() {
        window.top.document.addEventListener("mousemove", start_timer, false);
        window.top.document.addEventListener("mousedown", start_timer, false);
        window.top.document.addEventListener("keypress", start_timer, false);
        window.top.document.addEventListener("DOMMouseScroll", start_timer, false);
        window.top.document.addEventListener("mousewheel", start_timer, false);
        window.top.document.addEventListener("touchstart", start_timer, false);
        window.top.document.addEventListener("touchmove", start_timer, false);
        window.top.document.addEventListener("MSPointerMove", start_timer, false);

        var debugSession = window.top.document.getElementById('sessionTest');
        if (!widgetEngaged || !view) {
            if (sessionTimer) {
                if (!sessionTimer.timerOn) {
                    sessionTimer.startTime();
                }
            } else {
                sessionTimer = new timer('session', 100, timeToLive, debugSession, function (event) {
                    if (event.time >= event.stopAt) {
                        event.pauseTime();
                        event.resetTime();
                        sessionStorage.removeItem('snt_analytics');
                        iglooTries = 0;
                        getIgloo(); // RESET ENTIRE TEST
                    }
                }); //timeToLive in (ms) is 10 minutes
                sessionTimer.startTime();
            }
        } else {
            sessionTimer.pauseTime();
            sessionTimer.resetTime();
        }
    }

    //if user becomes active, remove event listeners so we dont polute the event space
    function start_timer() {
        window.top.document.removeEventListener("mousemove", start_timer, false);
        window.top.document.removeEventListener("mousedown", start_timer, false);
        window.top.document.removeEventListener("keypress", start_timer, false);
        window.top.document.removeEventListener("DOMMouseScroll", start_timer, false);
        window.top.document.removeEventListener("mousewheel", start_timer, false);
        window.top.document.removeEventListener("touchstart", start_timer, false);
        window.top.document.removeEventListener("touchmove", start_timer, false);
        window.top.document.removeEventListener("MSPointerMove", start_timer, false);

        isActive = true;
        sessionTimer.pauseTime();
        sessionTimer.resetTime();

        dwellLimitTimer.resetTime();
        dwellLimitTimer.startTime();

        if (!widgetEngaged) {
            set_idle_listeners();
        }
    }

    function analyticsSession() {
        var sessionTest,
            s_id;
        var sstorage = storeSessionFn.get();
        sessionId = sstorage && sstorage.session_id ? sstorage.session_id : randomString(16); //Generate a session ID
        sstorage.session_id = sessionId;
        storeSessionFn.set(sstorage);

        set_idle_listeners();
    }


    function analyticsViewScroll(element) {
        try {
            var viewTest,
                createTimer;

            var payloadTimer = 3000, // (ms) Initial payload timer 0.5 seconds
                payloadLimit = 5000,
                payloadTempTimer = 0; // (ms) Initial payload limit 10 seconds

            // if (!window.document.getElementById('viewTest')) {
            //     viewTest = window.document.createElement('div');
            //     viewTest.id = 'viewTest';
            //     viewTest.style = "position:fixed;top:0;right:0;background:black;color:white;font-size:20px;z-index:100";
            //     window.document.body.insertBefore(viewTest, window.document.body.firstElementChild);
            // }

            var debugView = window.document.getElementById('viewTest');

            var debugTimer = window.document.getElementById('viewDwell');

            viewDwell = viewDwell ? viewDwell : new timer('view', 500, null, debugTimer, function (event) {
                if (viewEngaged) {
                    question_view = 1;
                    bounce = 1; // trivia engaged the question is now always able to be a bounced question until user clicks next question then metrics will change;
                }

                if (view) {
                    oneSecMRC += event.tick;
                    if (oneSecMRC >= 1000) { // if oneSecMRC variable every reaches 1 second or more it will set the check to true
                        oneSecMRCcheck = true;
                    }
                } else { // should go straight into dwellLimitTimer if CU no longer in view but if it reaches this then it should reset oneSecMRC variable
                    oneSecMRC = 0;
                }
                if (!widgetEngaged && !dwellLimitTimer.timerOn) {
                    isActive = false;
                }
                if (!widgetEngaged) {
                    set_idle_listeners(); // create Session Timer to listen for any event and determine if the use is idle
                    engageDwell.pauseTime();
                    if (isActive) {
                        sessionTimer.resetTime();
                        sessionTimer.pauseTime();
                        var payT = (isActiveTimer % payloadTimer);
                        if (payT == 0) {
                            if (!view) { // makes sure if widget is not in view to send 0 in for viewdwell.
                                event.time = 0;
                            }
                            if ((payloadTempTimer % payloadTimer) == 0 && payloadTempTimer != 0) {
                                updatePayload('send');
                            }
                            if (payloadTempTimer == 3000 && payloadTimer == 3000) {
                                payloadTimer = 10000;
                                payloadTempTimer = 0;
                                isActiveTimer = 0;
                            }
                        } // payT
                        payloadTempTimer += event.tick;
                        isActiveTimer += event.tick;
                    }
                } // widgetEngaged
            });


            window.top.addEventListener("scroll", function () { // create listener on scroll to detect if widget in view
                if (!viewDwell) {
                    viewDwell = new timer('view', 100, null, debugTimer);
                }
                view = iglooAnalytics(element, 'view');

                if (debugView) {
                    debugView.innerHTML = 'view: ' + view;
                }

                if (view && widgetEngaged) { //if in view and engaged set and flag that will always run the viewDwell whenever in view
                    viewEngaged = true;
                } else {
                    viewEngaged = !view && !viewEngaged ? false : viewEngaged;
                }
                if (view) { // if trivia is in view & timer isnt on & trivia is engaged => start timer
                    viewDwell.startTime();
                } else {
                    engageDwell.pauseTime();
                    viewDwell.pauseTime();
                    set_idle_listeners(); // create Session Timer to listen for any event and determin if the use is idle
                }
            });

            // to be able to initially run the scroll event listener;
            window.top.scrollTo(window.top.scrollX, window.top.scrollY - 1);
            window.top.scrollTo(window.top.scrollX, window.top.scrollY + 1);
        } catch (e) {
            console.warn('ViewScroll Error', e);
        }
    }


    function analyticsDwellEngagement() {
        try {
            var dwellTest,
                createTimer,
                dwellLimit;

            widgetEngaged = false; // by running this make sure to set all values to its default

            // if (!window.document.getElementById('dwellTest')) {
            //     dwellTest = window.document.createElement('div');
            //     dwellTest.id = 'dwellTest';
            //     dwellTest.style = "position:fixed;top:0;left:0;background:black;color:white;font-size:20px;z-index:100";
            //     window.document.body.insertBefore(dwellTest, window.document.body.firstElementChild);
            // }
            var debugDwell = window.document.getElementById('dwellTest');

            var dwellTime = window.document.getElementById('engageDwell');

            var debugLimit = window.document.getElementById('dwellLimit');

            engageDwell = new timer('dwell', 100, null, dwellTime);
            dwellLimitTimer = new timer('dwellLimit', 1000, 10000, debugLimit, function (event) {
                if ((event.time >= event.stopAt) && engageDwell) {
                    isActive = false;

                    if (engageDwell.timerOn) {
                        engageDwell.time = (engageDwell.time - event.stopAt) < 0 ? 0 : engageDwell.time - event.stopAt;
                    }
                    engageDwell.pauseTime();
                    sessionTimer.resetTime();
                    if (!widgetEngaged) { // if the widget engage is false then make sure to reset the viewDwell timer since javascript could cause delay in sending payload
                        viewDwell.resetTime();
                    }

                    updatePayload('send');
                    if (!view) {
                        oneSecMRC = 0;
                        viewDwell.pauseTime();
                    }
                    widgetEngaged = false;

                }
                if (!view) { // viewDwell Timer stops and dwellLimitTimer starts when CU no longer in view so to make sure we reset the variable here
                    oneSecMRC = 0;
                }
            }); //create new timer with limit of 10 seconds

            // debugDwell.innerHTML = 'dwell: ' + widgetEngaged; //initial debug
            contentAnalyzed.onmouseover = function () { // create listener if widget becomes engaged
                question_view = 1; // set current question view to 1;
                bounce = 1; // trivia engaged the question is now always able to be a bounced question until user clicks next question then metrics will change;
                dwellLimitTimer.resetTime();
                if (!widgetEngaged) {
                    widgetEngaged = true;
                    viewEngaged = true;

                    engageDwell.startTime();
                    dwellLimitTimer.startTime();

                    if (!viewDwell.timerOn) {
                        viewDwell.startTime();
                    }

                    updatePayload('send');

                } else {
                    dwellLimitTimer.resetTime();
                }
            }

        } catch (e) {
            console.warn('DwellEngagement Error', e);
        }
    }


    function resetAnalytics() {
        if (viewDwell) {
            viewDwell.pauseTime();
            viewDwell.resetTime();
            viewDwell.startTime();
        }
        if (engageDwell) {
            engageDwell.resetTime();
        }
        total_clicks = 0;
        bounce = 0;
        skipped = 0;
    }

    /*
     ****************************************************************************************************************************************
     ****************ANALYTICS VARIABLES END*************************************************************************************************
     ****************************************************************************************************************************************
     */


    /*
     ****************************************************************************************************************************************
     ****************GLOBAL FUNCTIONS *******************************************************************************************************
     ****************************************************************************************************************************************
     */


    /**
     * RANDOM STRING GENERATOR
     *
     * Info:      http://stackoverflow.com/a/27872144/383904
     * Use:       randomString(length [,"A"] [,"N"] );
     * Default:   return a random alpha-numeric string
     * Arguments: If you use the optional "A", "N" flags:
     *            "A" (Alpha flag)   return random a-Z string
     *            "N" (Numeric flag) return random 0-9 string
     */
    function randomString(len, an) {
        an = an && an.toLowerCase();
        var str = "",
            i = 0,
            min = an == "a" ? 10 : 0,
            max = an == "n" ? 10 : 62;
        for (; i++ < len;) {
            var r = Math.random() * (max - min) + min << 0;
            str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
        }
        return str;
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
        if (env.match(/^homestead/) != null || env.match(/^localhost/) != null || env.match(/^dev/) != null) {
            env = "dev-";
        } else if (env.match(/^qa/) != null) {
            env = "qa-";
        } else {
            env = "prod-";
        }
        return env;
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

    //STYLES used in console
    var analyticsStyles = [
        'background: linear-gradient(#2a9a13, #000000)', 'border: 1px solid #3E0E02', 'color: white', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
    ].join(';');
    var payloadStyles = [
        'background: linear-gradient(#4e028a, #000000)', 'border: 1px solid #3E0E02', 'color: white', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
    ].join(';');
    var defaultStyle = [
        'background: linear-gradient(#000000, #6e6e6e)', 'border: 1px solid #3E0E02', 'color: #1fc134', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
    ].join(';');

    //style log to use for coloring develop tool console
    function log(msg, style) {
        // if (debug) {
        if (!style) {
            style = defaultStyle;
        }
        console.log('%c' + msg + '', style);
        // }
    };
    /*
     ****************************************************************************************************************************************
     ****************GLOBAL FUNCTIONS END*************************************************************************************************
     ****************************************************************************************************************************************
     */


    //#0 START WIDGET
    getIgloo();

})();
