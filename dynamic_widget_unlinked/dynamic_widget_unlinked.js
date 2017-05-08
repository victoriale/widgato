var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var temp = location.search;
var query = {}; //query string from sent parameters
var widthBreakpoint = 649; // in pixels
var wideWidget = false; // flag that changes certain functions to run differently (default = false)
var windowWidth;
var apiCallUrl; // this is global call that is used for api calls
var imageUrl = "images.synapsys.us"; // this is global call that is used for images
var dwApi = "dw.synapsys.us/list_api.php"; // dynamic widget api
var tdlApi = "touchdownloyal-api.synapsys.us/list/"; // used for nfl and ncaaf category
var fallBackApi; // used for nfl and ncaaf category
var href = window.top.location;
var currentIndex = 0; // current index of an array which (default = 0)
var maxIndex = 1; //declare max index of returned data (default = 1)
var widgetData; // api returns is sent here
var tries = 0; // flag for api to try atleast 10 times before failing completely
var maxTries = 5;
var listRand = 0; // used to increment index of random list in database
var subCategory; // with a vast amount groups and categories need we need the currently shown category for the rest of the code
// var categoryColors = { // Brand Color Palette
//     'football': '#2d3e50',
//     'default': '#009dfb',
// };

//Initial load Waits for the DOMContent to load
document.addEventListener("DOMContentLoaded", function(event) { // TAKE ANOTHER LOOK AT THIS AND ONLOAD function both can be optimized
    //if no query is snet then nothing is shown
    if (temp != null) {
        query = JSON.parse(decodeURIComponent(temp.substr(1)));
        listRand = query.rand ? query.rand : 1;
        //FIRST THING IS SETUP ENVIRONMENTS
        setupEnvironment(query);

        //Flag if wideScript exists then run certain scripts differently
        wideScript();

        //THEN START UPDATING THE LISTS
        updateList(0);
    } else {
        console.log('No query found on widget');
    }
});

function getEnv(env) {
    if (env.match(/localhost/g) != null || env.match(/dev/g) != null) {
        env = "dev";
    } else if (env.match(/qa/g) != null) {
        env = "qa";
    } else {
        env = "prod";
    }
    return env;
}

//DEPRECATED WILL BE REPLACED WITH getENV
function synapsysENV(env) {
    if (env.match(/localhost/g) != null || env.match(/dev/g) != null) {
        env = 'dev-';
    } else if (env.match(/qa/g) == 'qa') {
        env = 'qa-';
    } else {
        env = '';
    }
    return env;
}

//simple flag that checks if there is an identifier and it is javascript
// DOES NOT CHANGE ON RESIZE use onresize or event listener for that
// currently it is to run on first load
function wideScript(){
  var checkScriptID = $("dw_wide");
  windowWidth = window.innerWidth;
  if( (windowWidth > widthBreakpoint) && checkScriptID != null){
    wideWidget = true;
  }
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
    var environment = window.location.hostname.split('.')[0];
    var env;
    if (widgetQuery.env != null) {
        env = widgetQuery.env ? widgetQuery.env : 'prod';
    } else {
        env = getEnv(environment);
    }

    /*
     * NOTE synapsysENV DEPRECATED - WILL NEED TO BE REPLACED with getENV
     */

    //setup Image Environment api
    imageUrl = protocolToUse + synapsysENV(environment) + imageUrl; // this is global call that is used for images

    //if group doesnt exist and category is football
    if (widgetQuery.group == null && (widgetQuery.category == 'nfl' || widgetQuery.category == 'ncaaf' || widgetQuery.category == 'football' || widgetQuery.category == 'nflncaaf')) {
        subCategory = widgetQuery.category;
        apiCallUrl += env + "-" + tdlApi;
    } else {
        //if group does exist here then add group query parameter otherwise add categeory parameter for api
        if (widgetQuery.group != null && widgetQuery.group != "") {
            apiCallUrl += synapsysENV(environment) + dwApi + "?group=" + group;
        } else {
            subCategory = widgetQuery.category;
            apiCallUrl += synapsysENV(environment) + dwApi + "?cat=" + cat;
        }

        if (dom != null && dom != "") {
            apiCallUrl += "&partner=" + dom;
        }
    }

    //FALL BACK API SET HERE INCASE Dynamic widget api fails to make a call
    fallBackApi = protocolToUse + synapsysENV(environment) + dwApi + "?group=sports";
}

/************************ UPDATE LIST ***********************
 * @function updateList
 * update List function and if the list is from dynamic widget category then it will change the list
 * by incrementing the initially random number
 *
 * @param function listNum - list number incremented that will be added to the listRand with listNum
 */
function updateList(listNum) {
    if (query.group == null && (query.category == 'nfl' || query.category == 'ncaaf' || query.category == 'football')) {
        getFootballList(query.category);
    } else {
        listRand = Number(listRand) + Number(listNum);
        var currentApi = apiCallUrl + "&rand=" + listRand;
        runAPI(currentApi);
    }
}

/********************** GET FOOTBALL JSON LIST ***************
 * @function getFootballList
 *gets a PRE generated list from a json file that is asynchronously being called; returns and Array of all lists
 *
 * @param function league - league can either be nfl, ncaaf
 */
function getFootballList(league) {
    if (league == "nfl") {
        var url = '../js/tdl_list_array.json';
    } else if (league == "ncaaf") {
        var url = '../js/tdl_list_array_ncaaf.json';
    } else if (league == "nflncaaf") {
        rand = Math.floor((Math.random() * 2) + 1);
        if (rand == 1) {
            var url = '../js/tdl_list_array_ncaaf.json';
            l.category = "ncaaf";
        } else {
            var url = '../js/tdl_list_array.json';
            l.category = "nfl";
        }
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            //On complete function
            jsonArray = JSON.parse(xmlHttp.responseText);
            getRandFootballList(jsonArray);
        }
    }
    xmlHttp.open("GET", url, true); // false for synchronous request
    xmlHttp.send(null);
}


/******************** GET RANDOM FOOTBALL LIST ****************
 * @function getRandFootballList
 * chooses a random index in the array and uses that list to displace
 *
 * @param function jsonArray - the init
 */
function getRandFootballList(jsonArray) {
    rand = Math.floor((Math.random() * (jsonArray.length - 1)) + 1);
    var date = new Date;
    var compareDate = new Date('09/15/' + date.getFullYear());
    var season;
    if (date.getMonth() == compareDate.getMonth() && date.getDate() >= compareDate.getDate()) {
        season = jsonArray[rand] + "&season=" + date.getFullYear();
    } else if (date.getMonth() > compareDate.getMonth()) {
        season = jsonArray[rand] + "&season=" + date.getFullYear();
    } else {
        season = jsonArray[rand] + "&season=" + (date.getFullYear() - 1);
    }
    apiCallUrl += season;
    runAPI(apiCallUrl)
}


/****************************** onLoad ***************************
 * @function onLoad
 * Once the DOM has loaded, Adds a function to the "onLoad" event OR runs the function if the page is
 * already loaded
 *
 * @param function func - The function to run when the page has loaded
 */
function onLoad(func) {
    if (document.readyState == "complete" || document.readyState == "interactive") {
        func();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', func);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState == "complete") {
                func();
            }
        });
    }
} /*************************** onLoad ***************************/


/***************************** runAPI ***************************
 * @function runAPI
 * function that makes an asynchronous request using http and setting a global variable equal to the response of the text.
 * fail safe of retrying 10 times before sending error message
 *
 * @param function apiUrl -
 */
function runAPI(apiUrl) { //Make it to where it is easy to be reused by anyone
    //variable that stores the response of an http request
    if (window.XMLHttpRequest) {
        var xhttp = new XMLHttpRequest();
    } else {
        var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                // On success parse out the response
                widgetData = JSON.parse(this.responseText);
                var dataArray = widgetData.l_data != null ? widgetData.l_data : widgetData.data.listData;
                //set maximum index of returned dataLayer
                if(dataArray.length >= 25){
                  currentIndex = 24;
                  maxIndex = 25;
                }else{
                  currentIndex = dataArray.length;
                  maxIndex = dataArray.length;
                }
                onLoad(displayWidget); //send in the name of the function that needs to be ran once data has been confirmed
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
                    document.getElementsByClassName('e_container')[0].style.display = 'none';
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
        //sets the last updated date
        // var date = new Date();
        // var formatedDate = dateFormat(date.getDay(), date.getDate(), date.getMonth(), date.getFullYear());
        // $('profile-updated').innerHTML = formatedDate.weekday + ", " + formatedDate.month + " " + formatedDate.day + ", " + formatedDate.year;

        //Run dynamic color of widget
        /***************************FOOTBALL DATA APPLIANCE*******************************/
        if (query.group == null && (query.category == "football" || query.category == "nfl" || query.category == "ncaaf")) {
            var dataArray = widgetData.data.listData;
            setCategoryColors(subCategory);
            var curData = dataArray[currentIndex];

            //list title
            $("profile-title").innerHTML = widgetData.data.listInfo.listName;

            $("profile-rank").innerHTML = curData.rank;
            $("mainimg-rank").innerHTML = curData.rank;

            //current index of a player or team to display
            if (curData.rankType == "player") {
                var image = checkImage(imageUrl + curData.playerHeadshotUrl);
                if (image != null) {
                    $("mainimg").style.backgroundImage = "url('" + image + "')";
                }

                $("profile-name").innerHTML = curData.playerFirstName + " " + curData.playerLastName;

                $("profile-datapoint1").innerHTML = "Team: ";
                $("profile-datavalue1").innerHTML = curData.teamName;

                $("profile-datavalue2").innerHTML = Number(curData.stat).toFixed(2);
                $("profile-datapoint2").innerHTML = " " + curData.statDescription;

                $("name-title").setAttribute("title", curData.playerFirstName + " " + curData.playerLastName);
                $("data-title1").setAttribute("title",  "Team: " + curData.teamName);
                $("data-title2").setAttribute("title", Number(curData.stat).toFixed(2) + " " + curData.statDescription);
            } else {
                var image = checkImage(imageUrl + curData.teamLogo);
                if (image != null) {
                    $("mainimg").style.backgroundImage = "url('" + image + "')";
                }

                $("profile-name").innerHTML = curData.teamName;
                $("profile-datapoint1").innerHTML = "Division: ";
                $("profile-datavalue1").innerHTML = curData.divisionName;

                $("profile-datavalue2").innerHTML = Number(curData.stat).toFixed(2);
                $("profile-datapoint2").innerHTML = ": " + curData.statDescription;

                $("name-title").setAttribute("title", curData.teamName);
                $("data-title1").setAttribute("title", "Division: " + curData.divisionName);
                $("data-title2").setAttribute("title",  Number(curData.stat).toFixed(2) + ": " + curData.statDescription);
            }
            /***************************END OF FOOTBALL DATA*******************************/
        } else { /***************************DYNAMIC DATA APPLIANCE*******************************/
            var dataArray = widgetData.l_data;

            //checks if a category from group lists is being sent back then setting it as the subCategoryto be checked for proper color and fallback images
            if (query.group != null && widgetData.category != null) {
                subCategory = widgetData.category;
            } else if (query.group != null && widgetData.category == null) {
                subCategory = null;
            }

            setCategoryColors(subCategory);
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
            if (subCategory == 'finance') {
                $("mainimg").style.backgroundSize = "auto 100%";
            } else {
                $("mainimg").style.backgroundSize = "cover";
            }

            $("mainimg").style.backgroundImage
            //CELEBRITIES ONE OFF to set proper structure
            if(subCategory == 'celebrities'){//TODO make a more efficient way to set values than whats being done below inside each if else statement
              $("profile-rank").innerHTML = curData.li_rank;
              $("mainimg-rank").innerHTML = curData.li_rank;
              $("profile-name").innerHTML = curData.li_title;
              $("name-title").setAttribute("title", curData.li_title);
              if(curData.data_value_1 != null){
                $("profile-datavalue1").innerHTML = curData.data_value_1;
                $("profile-datapoint1").innerHTML = curData.data_point_1 != null ? curData.data_point_1 : '';
                $("data-title1").setAttribute("title", curData.data_value_1 == '' ? curData.data_point_1 : curData.data_value_1);
              }else{
                $("profile-datavalue1").innerHTML = curData.fallback_data_value_1 != null ? curData.fallback_data_value_1 : '';
                $("profile-datapoint1").innerHTML = curData.fallback_data_point_1 != null ? curData.fallback_data_point_1 : '';
                $("data-title1").setAttribute("title", curData.fallback_data_value_1);
              }

              $("profile-datapoint2").innerHTML = curData.data_point_2 != null ? curData.data_point_2 : '';
              $("profile-datavalue2").innerHTML = curData.data_value_2 != null ? " " + curData.data_value_2 : '';
              $("data-title2").setAttribute("title", curData.data_value_2);
            }else{
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
        }
        /***************************END OF DYNAMIC DATA*******************************/
    } catch (e) {
        console.log('Error in displaying widget Data');
        // console.log(e);
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
        case "director":
            category = 'entertainment';
            break;
        default:
            category = 'default';
            break;
    }

    var atomicClass = document.getElementsByClassName("widget_ad")[0];

    atomicClass.id = wideWidget ? category+'-wide' : category;
}

/************************ Update Index *************************
 * @function updateIndex
 * increment index and rerun display widget
 * cannot pass the maximum or minimum
 *
 * @param function difference - difference that will be added to current index
 */
function updateIndex(difference) {
    currentIndex -= difference;
    if (currentIndex < 0) {
        currentIndex = maxIndex - 1;
    } else if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else {}
    //call display widget
    displayWidget();
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
    var showCover;
    var fallbackImg;
    var imageWidth = wideWidget ? 690 : 300; //determine which quality widget to use based on if the wide widget is in view
    // $("mainimg").setAttribute('src', '');

    //Swtich statement to return fallback images for each vertical default = images.synapsys.us/01/fallback/stock/2017/03/finance_stock.jpg
    switch (subCategory) {
        case "football":
        case "nfl":
        case "ncaaf":
        case "nflncaaf":
            fallbackImg = "football_stock.jpg";
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
        case "politics":
            fallbackImg = "real_estate_stock.jpg";
            break;
        case "celebrities":
        case "actor":
        case "musician":
        case "director":
            fallbackImg = "actor.jpg";
            break;
        default:
            fallbackImg = "failback.jpg";
    }
    //prep return
    //use global flag for wideWidget (if wide widget is being used then all images are to be returned as fallback stock images)
    if (image != null
      && image.indexOf('no-image') == -1
      && image.indexOf('no_image') == -1
      && image.indexOf('no_player') == -1
      && image.indexOf('fallback') == -1
      && window.location.pathname.indexOf('_970') == -1
      && !wideWidget
    ) {
        imageReturn = image + "?width=" + (imageWidth * window.devicePixelRatio);
        showCover = false;
    } else {
        showCover = true;
        //make sure there is a fallback image
        if(subCategory == "celebrities"){
          imageReturn = imageUrl + "/01/fallback/stock/2017/04/" + fallbackImg;
        }else{
          imageReturn = imageUrl + "/01/fallback/stock/2017/03/" + fallbackImg;
        }
        //sets flag for image api to send back image with set size based on devicePixelRatio
        imageReturn += "?width=" + (imageWidth * window.devicePixelRatio);
    }

    //when mainimg was an <img> tag
    // $("mainimg").setAttribute('onerror', "this.src='"+imageUrl + "/01/fallback/stock/2017/03/" + fallbackImg + "?width=" + (300 * window.devicePixelRatio)+"'" ); //SETS ON ERROR IMAGE

    //USED to display background color of category if a fallback image is sent back
    var imageBackground = document.getElementsByClassName('e_image-cover');
    for (var j = 0; j < imageBackground.length; j++) {
        if (showCover) {
            $("e_image-shader").style.display = "none";
            imageBackground[j].style.display = 'block';
        } else {
            $("e_image-shader").style.display = "block";
            imageBackground[j].style.display = 'none';
        }
    }
    return imageReturn;
}
