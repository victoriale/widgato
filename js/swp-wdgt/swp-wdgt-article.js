var query = {};
swp_wdgt = function () {
    A = function (id) {
        var d = document;
        if (id[0] == '#') {
            return d.getElementById(id.slice(1, id.length));
        } else if (id[0] == '.') {
            return d.getElementsByClassName(id.slice(1, id.length))[0];
        } else if (id[0] != '#' && id[0] != '.') {
            return d.getElementById(id.slice(1, id.length));
        }
    };
    var temp = location.search;
    if(temp !== null && temp !== ""){
      query = JSON.parse(decodeURIComponent(temp.substr(1)));
    }

    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";

    RenderArticleSide(protocolToUse);

}();

function RenderArticleSide(protocolToUse) {
    var gameID;
    var changedGameId;
    var gameData;
    var APIUrl;
    var keyword;
    var hasChanged = false;
    var dropdownCount = 0;
    var catOptions = ['mlb', 'nfl', 'ncaa', 'nba','ncaam'];
    function getRandomArbitrary(min, max) {
       return Math.floor(Math.random() * (max - min) + min);
    }
    //latest possible end date for: nfl 2/8, nba 6/21, mlb 11/7
    var seasonalScopes = [{scope: "mlb", start: 4, end:10},{scope: "nfl", start: 9, end:1},/*{scope: "ncaa", start: 9, end:2},*/{scope: "nba", start: 10, end:5},{scope: "ncaam", start: 10, end:5}];
    var date = new Date();
    var month = date.getMonth() + 1;
    var scopeIsSet = false;
    var scope = "nfl"; //fallback to nfl if something goes wrong
    while (scopeIsSet == false) {
      var rand = getRandomArbitrary(0, seasonalScopes.length);
      if (seasonalScopes[rand].start > seasonalScopes[rand].end) { //if season overlaps into the next year
        if (seasonalScopes[rand].start >= month && seasonalScopes[rand].end >= month) {
          scope = seasonalScopes[rand].scope;
          scopeIsSet = true;
        }
      }
      else { //if season is contained in one year contiguously
        if (seasonalScopes[rand].start <= month && seasonalScopes[rand].end >= month) {
          scope = seasonalScopes[rand].scope;
          scopeIsSet = true;
        }
      }
    }
    var isMlb = false;

    // catOptions.sort(function () {
    //     return 0.5 - Math.random()
    // });
    catOptions[0]=scope;

    if (catOptions[0] == 'mlb') {
        APIUrl = protocolToUse + 'prod-homerunloyal-ai.synapsys.us/sidekick?scope=mlb';
        keyword = "MLB";
        isMlb = true;
    } else if (catOptions[0] == 'nfl') {
        APIUrl = protocolToUse + 'prod-touchdownloyal-ai.synapsys.us/sidekick?scope=nfl';
        keyword = "NFL";
        isMlb = false;
    } else if (catOptions[0] == 'ncaa') {
        APIUrl = protocolToUse + 'prod-touchdownloyal-ai.synapsys.us/sidekick?scope=ncaa';
        keyword = "NCAAF";
        isMlb = false;
    } else if (catOptions[0] == 'nba') {
        APIUrl = protocolToUse + 'prod-sports-ai.synapsys.us/sidekick?scope=nba';
        keyword = "NBA";
        isMlb = false;
    }
    else if (catOptions[0] == 'ncaam') {
        APIUrl = protocolToUse + 'prod-sports-ai.synapsys.us/sidekick?scope=ncaam';
        keyword = "NCAAM";
        isMlb = false;
    } else {
        APIUrl = protocolToUse + 'prod-touchdownloyal-ai.synapsys.us/sidekick';
        keyword = "MLB";
        isMlb = false;
    }
    var articleIndex = 0;

    var data;

    function getContent(event_id) {
        // Clear old data
        if (gameID != -1) {
            $('.section-text')[0].innerHTML = "Loading...";
            $('.content-text')[0].innerHTML = '';
            $('.dateline')[0].innerHTML = '';
        }
        var locApiUrl = APIUrl;
        if (typeof event_id != "undefined") {
            locApiUrl += "&event=" + event_id;
            event = event_id;
        }
        $.ajax({
            url: locApiUrl,
            success: function () {
                httpGetData(locApiUrl);
            },
            error: function (jqXHR, status, error) {
                console.log(jqXHR, status, error);
                displayError('Error Loading Sports API: ' + status);
            },
            dataType: 'json'
        });
    } // --> getContent

    function httpGetData(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                //On complete function
                data = JSON.parse(xmlHttp.responseText);
                linkData(data, articleIndex);
            }
        };
        xmlHttp.open("GET", url, true); // false for synchronous request
        xmlHttp.send(null);
    }

    httpGetData(APIUrl);

    /* Handling of Article Index */
    updateArticle = function () {
        if (articleIndex < articleTypes.length - 1 || articleIndex == 0) {
            articleIndex++;
        } else if (articleIndex >= articleTypes.length - 1) {
            articleIndex = 0;
        }
        linkData(data, articleIndex);
    };
    /* functions to be used as objects to get various data points */
    function eventData(metaData) {
        metaData = metaData.current;
        for (var obj in metaData) {
            var string = obj.toString();
            this[obj] = metaData[obj]
        }
    }

    function eventImage(metaData, teamId) {
        var images = metaData.images;
        this.imgs = [];
        for (var a = 0; a < images[teamId].length; a++) {
            this.imgs[a] = images[teamId][a];
        }
    }

    //this function will return all images, home and away, in an array. (not oo)
    function getAllImages(metaData) {
        var imgRet = [];
        var images = metaData.images;
        for (var obj in images) {
            for (var i = 0; i < images[obj].length; i++) {
                imgRet.push(images[obj][i]);
            }
        }
        return imgRet;
    }

    function mapArticles(data) {
        var dataTypes;
        dataTypes = data['data'];
        for (var obj in dataTypes) {
            if (obj == "meta-data" || obj == "timestamp")continue;
            this[obj] = data['data'][obj];
        }
    }

    var articleTypes = [];

    function listOutTypes(data) {
        articleTypes = [];
        var dataTypes;
            dataTypes = data['data'];
        for (var obj in dataTypes) {
            if (obj == "meta-data" || obj == "timestamp")continue;
            articleTypes.push(obj);
        }
    }

    function linkData(data, articleIndex) {
        listOutTypes(data);
        var doRandArt = true;//or false; or true.....
        if (doRandArt) {
            articleIndex = getRandomInt(0, articleTypes.length);
        } else {
            articleIndex = articleIndex;
        }
        var mData = data['data']['meta-data'];
        var article = new mapArticles(data)[articleTypes[articleIndex]];
        var game = new eventData(mData);
        //images being selected based on the articleIndex value
        var image = protocolToUse + 'images.synapsys.us' + article.image_url;
        gameData = mData;
        //change this to img tags instead of bg image
        A('.section-image').style.backgroundImage = 'url("' + image + "?width=" + (300 * window.devicePixelRatio) + '")';
        A('.dateline').innerHTML = keyword + ' ' + convertDate(game['start_date_time'].date + ' ' + game['start_date_time'].time + ' EDT');
        A('.section-text').innerHTML = article.title;

        if(catOptions[0] == "ncaa") {
          var cat = "ncaaf";
        }
        else {
          var cat = catOptions[0];
        }

        if (isMlb) {
          //article url structure: /articles/:article_type/:event_id
          //check if the id has been changed via the drop down selection; otherwise use the initial id.
          var checkId = game.event_id;

          if (data.data && data.data['player-fantasy'] && data.data['player-fantasy'].article_id == article.article_id) {
            var id = article.article_id;  //if fantasy article use article id
          }
          else {
            var id = !changedGameId ? checkId: changedGameId;  //if regular article use event id
          }
            var articleUrl = 'http://www.homerunloyal.com/articles/' + articleTypes[articleIndex] + '/' + id;
        } else {
          //article url structure: /articles/:article_type/:event_id
          //check if the id has been changed via the drop down selection; otherwise use the initial id.
          var checkId = !game.event_id  ? game.event_id : game.event_id ;

          if (data.data && data.data['player-fantasy'] && data.data['player-fantasy'].article_id == article.article_id) {
            var id = article.article_id;  //if fantasy article use article id
          }
          else {
            var id = !changedGameId ? checkId: changedGameId;  //if regular article use event id
          }
          if (catOptions[0] == "nba" || catOptions[0] == "ncaam") {
            var articleUrl = 'http://www.hoopsloyal.com/' + cat.replace("ncaam","ncaa") + '/articles/' + articleTypes[articleIndex] + '/' + id;
          }
          else {
            var articleUrl = 'http://www.touchdownloyal.com/' + cat + '/articles/' + articleTypes[articleIndex] + '/' + id;

          }
        }
        var articleText = article.teaser.substr(0, 150);
            A('.bar-date').innerHTML = convertDate(game['start_date_time'].date + ' ' + game['start_date_time'].time + ' EDT');
        var author = isMlb ? 'www.homerunloyal.com' : 'www.touchdownloyal.com';
        var authorLink = author;
        if (query.showLink != "false") {
          A('.content-text').innerHTML = articleText + '...<a target="_blank" href="' + articleUrl + '"></a>';
          A('.bar-author').innerHTML = '<a target="_blank" id="authorlink" href="' + "http://" + authorLink + '">' + author + '</a>';
          A('#readbutton').setAttribute('href', articleUrl);
          A('#content-anchor').setAttribute('href', articleUrl);
        }
        else {
          A('#readbutton').style.display = "none";
          document.getElementsByClassName("buttons-nextlist")[0].style.marginLeft = "0px";
          A('.content-text').innerHTML = articleText + '...<a target="_blank" href="' + articleUrl + '"></a>';
          A('.bar-author').innerHTML = '<a target="_blank" id="authorlink">' + author + '</a>';
        }
        A('.buttons-nextlist').onmouseover = function () {
            A('#arrow').style.fill = 'white';
        };
        A('.buttons-nextlist').onmouseout = function () {
            A('#arrow').style.fill = '#b31d24';
        };
        gameID = gameData['current'].event_id;
        if (isMlb) {
            $('.ball').css('background-image', 'url(../css/public/icons/Home-Run-Loyal_Icon%202.svg)');
            $('.swp-top').css('background-color', '#b31d24');
            $('.buttons-readstory').css({'background-color': '#b31d24', 'border': '1px solid #b31d24'});
            $('.buttons-readstory').hover(function () {
                $(this).css({'background-color': '#000', 'border': '1px solid #000'});
            }, function () {
                $(this).css({'background-color': '#b31d24', 'border': '1px solid #b31d24'});
            });
            $('.buttons-nextlist').hover(function () {
                $(this).css({'background-color': '#000', 'border': '1px solid #000'});
            }, function () {
                $(this).css({'background-color': 'transparent', 'border': '1px solid #fff'});
            });
        } else if (catOptions[0]=="nba" || catOptions[0]=="ncaam") {
            $('.ball').css('background-image', 'url(../css/public/icons/Hoops-Loyal_Icon_w.svg)');
            $('.swp-top').css('background-color', 'rgb(247,112,29)');
            $('.buttons-readstory').css({'background-color': 'rgba(247,112,29, 0.9)', 'border': '1px solid rgba(247,112,29, 0.9)'});
            $('.buttons-readstory').hover(function () {
                $(this).css({'background-color': '#000', 'border': '1px solid #000'});
            }, function () {
                $(this).css({'background-color': 'rgba(247,112,29, 0.9)', 'border': '1px solid rgba(247,112,29, 0.9)'});
            });
            $('.buttons-nextlist').hover(function () {
                $(this).css({'background-color': '#000', 'border': '1px solid #000'});
            }, function () {
                $(this).css({'background-color': 'transparent', 'border': '1px solid #fff'});
            });
        }else {
            $('.ball').css('background-image', 'url(../css/public/icons/Touchdown-Loyal_Icon.svg)');
            $('.swp-top').css('background-color', 'rgb(45, 62, 80)');
            $('.buttons-readstory').css({'background-color': 'rgba(45, 62, 80, 0.9)', 'border': '1px solid rgba(45, 62, 80, 0.9)'});
            $('.buttons-readstory').hover(function () {
                $(this).css({'background-color': '#000', 'border': '1px solid #000'});
            }, function () {
                $(this).css({'background-color': 'rgba(45, 62, 80, 0.9)', 'border': '1px solid rgba(45, 62, 80, 0.9)'});
            });
            $('.buttons-nextlist').hover(function () {
                $(this).css({'background-color': '#000', 'border': '1px solid #000'});
            }, function () {
                $(this).css({'background-color': 'transparent', 'border': '1px solid #fff'});
            });
        }
        parseGames();
    }//end linkData()


    // Parse the games into an array
    function parseGames() {
        // Array of games
        gameArr = [];
        // Function for the parser
        var parseGame = function (games) {
            // Team names
            $.map(games, function (val) {
                var gameData = {};
                    gameData.fullHome = val.home_team_location + ' ' + val.home_team_name;
                    gameData.fullAway = val.away_team_location + ' ' + val.away_team_name;
                    gameData.home = val.home_team_name;
                    gameData.away = val.away_team_name;
                // Event ID
                gameData.event_id = val.event_id;
                // Date
                  var time = val['start_date_time'].time + ' ET';
                  var data_date = val['start_date_time'].date;
                  // avoid moment js deprecation warning
                  var date = moment(data_date,'MM/DD/YYYY',true).isValid() != true ? moment(data_date).format("MMM. DD") : moment(data_date,'MM/DD/YYYY',true).format("MMM. DD ");
                gameData.eventDate = date + time.toUpperCase();
                gameData.eventTime = time;
                gameArr.push(gameData);
            });
            return gameArr;
        };
        var games = gameData.games;
        // Save all the games
        gameArr = parseGame(games);
        // Display the current game
        showGame();
    } // --> parseGames

    function createDropdown(gameLength) {
        var ddStr = '';
        for (var i = 0; i < gameLength; i++) {
            if (i > 0) {
                ddStr += '<div class="divider"></div>';
            }
            if (!hasChanged) {
                ddStr += '<div class="dropdown-elem' + (gameArr[i].event_id == gameID ? ' active" " onclick="switchGame(' + i + ')"' : '" onclick="switchGame(' + i + ')"') + ' title="' + gameArr[i].fullAway + ' vs ' + gameArr[i].fullHome + '"><span class="left"><b>' + gameArr[i].away + '</b> vs <b>' + gameArr[i].home + '</b></span><span class="right">' + gameArr[i].eventDate + '</span></div>';
            } else {
                ddStr += '<div class="dropdown-elem' + (gameArr[i].event_id == changedGameId ? ' active" " onclick="switchGame(' + i + ')"' : '" onclick="switchGame(' + i + ')"') + ' title="' + gameArr[i].fullAway + ' vs ' + gameArr[i].fullHome + '"><span class="left"><b>' + gameArr[i].away + '</b> vs <b>' + gameArr[i].home + '</b></span><span class="right">' + gameArr[i].eventDate + '</span></div>';
            }
        }
        // Create
        $('.container')[0].innerHTML = ddStr;
        var backgroundColor;
        if (isMlb) {
          backgroundColor = '#b31d24';
        }
        else if (catOptions[0] == "nba" || catOptions[0] == "ncaam") {
          backgroundColor = 'rgba(247,112,29, 0.9)';
        }
        else {
          backgroundColor = 'rgba(45, 62, 80, 0.9)';
        }
        $('.dropdown-elem.active').css('background-color', backgroundColor);
        $('.dropdown-elem').hover(function () {
            $(this).css("background-color", backgroundColor);
            $(this).css("color", "#fff");
        }, function () {
            $(this).css("background-color", "transparent");
            $(this).css("color", "#000");
        });
        //prevents hover function from removing css of active element
        $('.dropdown-elem.active').mouseout(function() {
            $('.dropdown-elem.active').css('background-color', backgroundColor);
            $('.dropdown-elem.active').css('color', '#fff');
        });
    } // --> createDropdown


    // Show the current game's teams in the header
    function showGame() {
        // Loop through the games to find the current one
        var gameLength = gameArr.length;
        if (dropdownCount == 0) {
            for (var i = 0; i < gameLength; i++) {
                if (gameArr[i].event_id == gameID || gameArr[i].event_id == changedGameId) {
                    $('.home.team')[0].innerHTML = gameArr[i].home;
                    $('.away.team')[0].innerHTML = gameArr[i].away;
                    $('.header-right.team')[0].innerHTML = gameArr[i].eventTime;
                }
            }
        }
        dropdownCount = 0;
        // Create dropdown
        createDropdown(gameLength);
    } // --> showGame
    // Switches the game

    switchGame = (function (gameNum) {
        hasChanged = true;
        changedGameId = gameArr[parseInt(gameNum)].event_id;
        toggleDropDown();
        getContent(changedGameId);
        showGame();
        dropdownCount++;
    }); // --> switchGame

    // Toggle the dropdown
    toggleDropDown = (function () {
        var swpdropdown = $('.swp-dropdown');
        if (swpdropdown.hasClass('active')) {
            swpdropdown.removeClass('active');
            swpdropdown.find('.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
        } else {
            swpdropdown.addClass('active');
            swpdropdown.find('.fa').addClass('fa-caret-up').removeClass('fa-caret-down');
        }
    })// --> toggleDropDown
    return {
        toggleDropDown: toggleDropDown,
        switchGame: switchGame
    };
}

/* -- Helper Functions -- */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* -- Manipulation Functions  -- */
function convertDate(d) {
    var date = d.split(' ');

    var day = date[0];
    var time = date[1];
    var tz = date[2];

    var month = MonthsFullName(day.split('/')[0]);
    var year = day.split('/')[2];
    var weekDay = day.split('/')[1];

    day = new Date(day);
    day = WeekDayNumToName(day.getDay());

    var today = new Date();
    var todayMonth = MonthsFullNameZed(today.getMonth());
    var todayYear = String(today.getFullYear()).slice(2);
    var todayDay = String(today.getDate());

    if (todayMonth == month && todayDay == weekDay && todayYear == year) {
        // then it is today
        var string = 'Today' + ' ' + time + ' ' + tz;
    } else if (todayMonth == month && todayYear == year && Number(todayDay) - 1 == Number(weekDay)) {
        // then it is yesterday (unless edge case where it is the end of the month)
        var string = 'Yesterday' + ' ' + time + ' ' + tz;
    } else {
        // otherwise just use day of the week
        var string = day + ' ' + time + ' ' + tz;
    }
    return string;
}

function WeekDayNumToName(n) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[n];
}

function MonthsFullNameZed(number) {
    var month = {
        "0": "January",
        "1": "February",
        "2": "March",
        "3": "April",
        "4": "May",
        "5": "June",
        "6": "July",
        "7": "August",
        "8": "September",
        "9": "October",
        "10": "November",
        "11": "December",
    }
    return month[number];
}

function MonthsFullName(number) {
    var month = {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    }

    return month[number];
}
