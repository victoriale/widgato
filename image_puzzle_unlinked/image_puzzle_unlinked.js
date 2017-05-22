var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var temp = location.search;
var query = {}; //query string from sent parameters
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

//Initial load Waits for the DOMContent to load
document.addEventListener("DOMContentLoaded", function (event) { // TAKE ANOTHER LOOK AT THIS AND ONLOAD function both can be optimized
    //if no query is snet then nothing is shown
    if (temp != null && temp.length > 0) {
        query = JSON.parse(decodeURIComponent(temp.substr(1)));
        listRand = query.rand ? query.rand : 0;
        //FIRST THING IS SETUP ENVIRONMENTS
        setupEnvironment(query);

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

/***************************** SETUP ENVIRONMENTS ******************************
 * @function setupEnvironment
 * setup Environment function
 *
 * @param function widgetQuery - the query string sent back as and Object from the location.search substrings
 * to be parsed through and set for global use
 */
function setupEnvironment(widgetQuery) {
    apiCallUrl = protocolToUse;
    var cat = widgetQuery.category;
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
    subCategory = widgetQuery.category;
    //if group doesnt exist and category is football
    if (widgetQuery.category == 'nfl' || widgetQuery.category == 'ncaaf' || widgetQuery.category == 'football' || widgetQuery.category == 'nflncaaf') {
        apiCallUrl += env + "-" + tdlApi;
    } else {
        //if category is not football related then add the appropriate api url.
        apiCallUrl += synapsysENV(environment) + dwApi + "?cat=" + cat;
    }
    //FALL BACK API SET HERE INCASE Dynamic widget api fails to make a call
    fallBackApi = protocolToUse + synapsysENV(environment) + dwApi + "?cat=mlb";
}

/************************ UPDATE LIST ***********************
 * @function updateList
 * update List function and if the list is from dynamic widget category then it will change the list
 * by incrementing the initially random number
 *
 * @param function listNum - list number incremented that will be added to the listRand with listNum
 */
function updateList(listNum) {
    currentIndex = 0;
    if (query.category == 'nfl' || query.category == 'ncaaf' || query.category == 'football') {
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
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            //On complete function
            jsonArray = JSON.parse(xmlHttp.responseText);
            getRandFootballList(jsonArray);
        }
    };
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
    var compareDate = new Date('09/15/' + date.getFullYear());//TODO get an API from BE to determine when a new season starts
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
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == "complete") {
                func();
            }
        });
    }
}
/*************************** onLoad ***************************/


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
    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                // On success parse out the response
                widgetData = JSON.parse(this.responseText);
                onLoad(displayWidget); //send in the name of the function that needs to be ran once data has been confirmed
            } else {
                // Error handling
                // Get the message
                var msg = this.statusText;
                if (this.status == 500) {
                    try {
                        msg = JSON.parse(this.responseText).message
                    } catch (e) {
                        console.log('No JSON message', e)
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
};/************************** runAPI END ************************/


/****************************Display Widget Data *****************
 * @function displayWidget
 * When data is available set the data return to the unique identifiers on the DOM
 * using innerHTML
 *
 * @param function
 */
function displayWidget() {
    try {
        //Run dynamic color of widget
        /***************************FOOTBALL DATA APPLIANCE*******************************/
        var image;
        if (query.category == "football" || query.category == "nfl" || query.category == "ncaaf") {
            var dataArray = widgetData.data.listData;
            setCategoryColors(subCategory);
            //set maximum index of returned dataLayer
            maxIndex = dataArray.length;
            var curData = dataArray[currentIndex];
            $("profile-rank").innerHTML = curData.rank;
            //current index of a player or team to display
            if (curData.rankType == "player") {
                if (curData.playerHeadshotUrl != null && curData.playerHeadshotUrl != "") {
                    image = checkImage(imageUrl + curData.playerHeadshotUrl);
                } else {
                    image = null;
                }
                if (image != null) {
                    createPuzzle(image, false);
                    $("profile-name").innerHTML = curData.playerFirstName + " " + curData.playerLastName;
                    $("profile-datapoint1").innerHTML = "Team: ";
                    $("profile-datavalue1").innerHTML = curData.teamName;
                    $("profile-datavalue2").innerHTML = Number(curData.stat).toFixed(2);
                    $("profile-datapoint2").innerHTML = " " + curData.statDescription;
                } else {
                    updateIndex(1);
                }
            } else {
                if (curData.teamLogo != null && curData.teamLogo != "") {
                    image = checkImage(imageUrl + curData.teamLogo);
                } else {
                    image = null;
                }
                if (image != null) {
                    createPuzzle(image, false);
                    $("profile-name").innerHTML = curData.teamName;
                    $("profile-datapoint1").innerHTML = "Division: ";
                    $("profile-datavalue1").innerHTML = curData.divisionName;
                    $("profile-datavalue2").innerHTML = Number(curData.stat).toFixed(2);
                    $("profile-datapoint2").innerHTML = ": " + curData.statDescription;
                } else {
                    updateIndex(1);
                }
            }
            /***************************END OF FOOTBALL DATA*******************************/
        } else {
            /***************************DYNAMIC DATA APPLIANCE*******************************/
            var dataArray = widgetData.l_data;
            setCategoryColors(subCategory);
            //set maximum index of returned dataLayer
            maxIndex = dataArray.length;
            //current index of list
            var curData = dataArray[currentIndex];
            //checks if a proper live image is being sent from team_wide_img or player_wide_img otherwise default to li_img datapoint
            if (curData.player_wide_img != null && curData.player_wide_img != "") {
                image = checkImage(imageUrl + curData.player_wide_img);
            } else if ((curData.player_wide_img == null || curData.player_wide_img == "") && (curData.team_wide_img != null && curData.team_wide_img != "")) {
                image = checkImage(imageUrl + curData.team_wide_img);
            } else if ((curData.player_wide_img == null || curData.player_wide_img == "") && (curData.team_wide_img == null || curData.team_wide_img == "") && (curData.li_img != null && curData.li_img != "")) {
                image = checkImage(curData.li_img);
            } else {
                image = null;
            }
            if (image != null) {
                createPuzzle(image, false);
                $("profile-rank").innerHTML = curData.li_rank;
                $("profile-name").innerHTML = curData.li_title;
                $("profile-datavalue1").innerHTML = curData.li_sub_txt;
                $("profile-datapoint2").innerHTML = curData.li_tag;
                $("profile-datavalue2").innerHTML = " " + curData.li_value;
            } else {
                updateIndex(1);
            }
        }
        $('dw').style.display = 'block';
        /***************************END OF DYNAMIC DATA*******************************/
    } catch (e) {
        console.log('Error in displaying widget Data', e);
    }
}
/**************************Display Widget Data END******************/


/********************** SETUP CATEGORY COLORS **********************
 * @function setCategoryColors
 * dynamically set the colors of the css Rules for each of the partners
 *
 * @param function category - sets the base category for colors that are stored in the global ./css/atomic_colors/atomic.css
 */
function setCategoryColors(category) {
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
        default:
            category = 'default';
            break;
    }
    document.getElementsByClassName("e_container")[0].id = category;
}

/************************ Update Index *************************
 * @function updateIndex
 * increment index and rerun display widget
 * cannot pass the maximum or minimum
 *
 * @param function difference - difference that will be added to current index
 */
function updateIndex(difference) {
    currentIndex += difference;
    if (currentIndex < 0) {
        currentIndex = maxIndex - 1;
    } else if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else {
    }
    //call display widget
    displayWidget();
}

/***************************** CHECK IMAGE ****************************
 * @function checkImage
 * checks if the image is a placement and replace and change the look of the widget
 *
 * @param function image - tosses in image to be check to be replaced with proper stock photo for the specific category
 */
function checkImage(image) {
    //prep return
    if (image != null && image.indexOf('no-image') == -1 && image.indexOf('no_image') == -1 && image.indexOf('no_player') == -1 && image.indexOf('fallback') == -1 && window.location.pathname.indexOf('_970') == -1) {
        return image;
    } else {
        return null;
    }
}

function createPuzzle(mainImage, isSolved) {
    //set global variables
    var _empty, _puzzle, _square;
    _puzzle = (function () {
        function _puzzle(mainImage, isSolved) {
            //set variables
            if (!isSolved) {
                var i, index, tile, xPos, yPos;
                //if the image is a live image then the width needs to be 500 so that the aspect ratio will fit the puzzle completely
                this.puzzleImage = !this.isLive(mainImage) ? mainImage + '?width=' + (300 * window.devicePixelRatio) : mainImage + '?width=' + (500 * window.devicePixelRatio);
                this.initialTiles = [];
                this.tiles = [];
                //bind the function and array arguments to the called method
                this.emptyTile.bind(this.emptyTile, this);
                this.randomize.bind(this.randomize, this);
                this.render.bind(this.render, this);
                this.swapTile.bind(this.swapTile, this);
                this.solved.bind(this.solved, this);
                //assign each tile with dimensions, position, and image
                for (i = index = 0; index <= 7; i = ++index) {
                    //if the image is live then add 100 so that it the tiles will be from the center of the image
                    xPos = !this.isLive(mainImage) ? Math.floor(i % 3) * 100 : (Math.floor(i % 3) * 100) + 100;
                    yPos = Math.floor(i / 3) * 104;
                    tile = new _square(i, 100, 104, xPos, yPos, this.puzzleImage, this.isLive(this.puzzleImage));
                    this.tiles.push(tile);
                }
                //set the 8th position to be empty
                this.tiles.push(new _empty(8));
                //save the initial tile setup.
                this.initialTiles = this.tiles.slice(0);
                this.randomize();
            } else {
                this.solveMe(mainImage);
            }
        }

        _puzzle.prototype.emptyTile = function () {
            var index, _length, position, tile, val;
            val = this.tiles;
            //loop through tile array and find the empty tile's position
            for (position = index = 0, _length = val.length; index < _length; position = ++index) {
                tile = val[position];
                if (tile["class"] === 'empty') {
                    return position;
                }
            }
        };
        _puzzle.prototype.randomize = function () {
            var emptyPos, i, index, random, randomNum;
            emptyPos = 8;
            random = [];
            //iterate through to create an array of random numbers and assign them to the tiles
            for (i = index = 0; index <= 10; i = ++index) {
                randomNum = Math.floor(Math.random() * 9);
                this.swapTile(randomNum, emptyPos);
                random.push(emptyPos = randomNum);
            }
            return random;
        };
        _puzzle.prototype.render = function () {
            var empty, index, _length, tile, val,
                _this = this;
            empty = this.emptyTile();
            $('puzzle').innerHTML = '';
            if (!this.solved()) {
                //render tiles
                var background = document.createElement('div');
                background.setAttribute('id', 'puzzle-background');
                if (!this.isLive(this.puzzleImage)) {
                    background.setAttribute('style', 'background-image: url(' + this.puzzleImage + ')');
                } else {
                    background.setAttribute('style', 'background-image: url(' + this.puzzleImage + '); background-size: inherit; background-position: top center');
                }
                var image = document.createElement('div');
                image.setAttribute('id', 'img-background');
                background.appendChild(image);
                var onClick = $('solve-me');
                onClick.setAttribute('onclick', "createPuzzle('" + this.puzzleImage + "', true);");
                $('button_atomic').onmouseover = function() {$('button_atomic').setAttribute('style', 'border:none !important')};
                $('button_atomic').onmouseout = function() {$('button_atomic').setAttribute('style', 'border:1px solid')};
                $('solve').style.display = 'block';
                $('puzzle').appendChild(background);
                $('dw-container').style.display = 'none';
                val = this.tiles;
                for (index = 0, _length = val.length; index < _length; index++) {
                    tile = val[index];
                    tile.show(empty);
                }
                var tileClass = [document.getElementsByClassName('tile')];
                //check for the location of the empty tile and add the hover state to the appropriate tile
                if (empty === 0 || empty === 2) {
                    this.addAnimation($('1'));
                } else if (empty === 4 || empty === 6 || empty === 8) {
                    this.addAnimation($('7'));
                } else if (empty === 1 || empty === 3 || empty === 5 || empty === 7) {
                    this.addAnimation($('4'));
                }
                //add click event to tiles that are available to be swapped
                tileClass.forEach(function (element) {
                    for (var i = 0; i < element.length; i++) {
                        element[i].addEventListener('click', function (event) {
                            var toSwitch;
                            toSwitch = parseInt(event.target.id);
                            _this.swapTile(toSwitch, _this.emptyTile());
                        });
                    }
                });
            }
        };
        _puzzle.prototype.addAnimation = function (puzzle) {
            var hoverClick = document.createElement('div');
            hoverClick.setAttribute('class', 'animated pulse');
            puzzle.appendChild(hoverClick);
        };
        _puzzle.prototype.solveMe = function (solvedImage) {
            var solvedBackground = document.createElement('div');
            solvedBackground.setAttribute('id', 'puzzle-div');
            if (!this.isLive(solvedImage)) {
                solvedBackground.setAttribute('style', 'background-image: url(' + solvedImage + ')');
            } else {
                solvedBackground.setAttribute('style', 'background-image: url(' + solvedImage + '); background-size: inherit; background-position: top center');
            }
            $('solve').style.display = 'none';
            $('puzzle').appendChild(solvedBackground);
            $('dw-container').style.display = 'block';
            return $('puzzle-div').style.display = 'block';
        };
        _puzzle.prototype.swapTile = function (xPos, yPos) {
            var x, y;
            x = this.tiles[xPos];
            y = this.tiles[yPos];
            this.tiles[yPos] = x;
            this.tiles[xPos] = y;
            this.tiles[yPos].position = yPos;
            return this.render();
        };
        _puzzle.prototype.solved = function () {
            var i, index;
            //check if puzzle is solved by comparing the current tiles array with the initialTiles array
            for (i = index = 0; index <= 8; i = ++index) {
                if (this.tiles[i] !== this.initialTiles[i]) {
                    return false
                }
            }
            return true;
        };
        //check whether or not the url is for a live image
        _puzzle.prototype.isLive = function (url) {
            return url.indexOf("live") !== -1;
        };
        return _puzzle;
    })();
    _square = (function () {
        function _square(position, width, height, xPos, yPos, tileImage, isLive) {
            this.height = height;
            this.puzzleImage = tileImage;
            this.position = position;
            this.width = width;
            this.x = xPos;
            this.y = yPos;
            this.isLive = isLive;
            this["class"] = 'square';
        }

        _square.prototype.show = function (emptyTile) {
            var puzzle = document.createElement('div');

            function setAttributes(el, attr) {
                for (var key in attr) {
                    el.setAttribute(key, attr[key]);
                }
            }

            if (this.isNext(emptyTile)) {
                setAttributes(puzzle, {"id": this.position, "class": "innerTile image tile"});
            } else {
                setAttributes(puzzle, {"id": this.position, "class": "innerTile image"});
            }
            if (this.isLive) {
                puzzle.setAttribute('style', 'background-size: inherit');
            }
            $('puzzle').appendChild(puzzle);
            $(this.position).style.backgroundPosition = '-' + this.x + 'px -' + this.y + 'px';
            return $(this.position).style.backgroundImage = "url('" + this.puzzleImage + "')";
        };
        _square.prototype.isNext = function (emptyPosition) {
            return emptyPosition - 1 === this.position && (emptyPosition % 3) > 0 || emptyPosition + 1 === this.position &&
                (emptyPosition % 3) < 2 || emptyPosition + 3 === this.position && (emptyPosition / 3) < 2 ||
                emptyPosition - 3 === this.position && (emptyPosition / 3) > 0
        };
        return _square;
    })();
    _empty = (function () {
        function _empty(position) {
            this.position = position;
            this["class"] = 'empty';
        }

        _empty.prototype.show = function () {
            var emptyTile = document.createElement('div');
            emptyTile.setAttribute('class', 'innerTile empty');
            emptyTile.setAttribute('id', 'emptyTile');
            return $('puzzle').appendChild(emptyTile);
        };
        $('solve').style.display = 'block';
        $('dw-container').style.display = 'none';
        return _empty;
    })();
    var puzzle;
    puzzle = new _puzzle(mainImage, isSolved);
}
