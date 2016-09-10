ai_widget = (function () {
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    //switch url for live or testing environment
    var tdlDomain = "http://dev.touchdownloyal.com/";
    var tdlPartnerDomain = "http://dev.mytouchdownzone.com/";
    //end switch
    var referrer = document.referrer;
    if (referrer.match(/football/g)) {
        tdlPartnerDomain = protocolToUse + referrer.split('/')[2] + "/";
    }

    // Declare variables
    var event = '';
    var domain, remnant, league;
    var temp = location.search;
    var query = {};
    var target;
    var href;

    if (temp != null) {
        query = JSON.parse(decodeURIComponent(temp.substr(1)));
        domain = query.dom;
        remnant = query.remn;
        league = query.league;
        target = query.targ;

        if (remnant == 'true') {
            href = tdlDomain;
            $("base").attr("href", tdlDomain);
        } else if (referrer.match(/football/g)) {
            $("base").attr("href", tdlPartnerDomain);
            href = tdlPartnerDomain;
        } else {
            $("base").attr("href", tdlPartnerDomain + domain + "/");
            href = tdlPartnerDomain + domain + "/";
        }

    }
    //adjust api url for testing or live
    var APIUrl = protocolToUse + 'prod-touchdownloyal-ai.synapsys.us/sidekick/' + league,
        AIData = {},
        gameID = -1,
        pageInd = -1,
        availPages = [],
        gameArr = [];

    function getContent(eventId) {
        // Clear old data
        if (gameID != -1) {
            availPages = [];
            pageInd = -1;
            $('.aiw-title')[0].innerHTML = "Loading...";
            $('.aiw-txt')[0].innerHTML = '';
        }
        var locApiUrl = APIUrl;
        if (typeof eventId != "undefined") {
            locApiUrl += "/" + eventId;
            event = eventId;
        }
        $.ajax({
            url: locApiUrl,
            success: function (data) {
                AIData = data;
                processData();
            },
            error: function (jqXHR, status, error) {
                console.log(jqXHR, status, error);
                displayError('Error Loading Sports API: ' + status);
            },
            dataType: 'json'
        });
    } // --> getContent
    function displayError(errorMsg) {
        $('.aiw-txt')[0].innerHTML = errorMsg;
    } // --> displayError
    function getData() {
        return AIData;
    } // --> getData
    function displayPage() {
        // Check for data
        if (pageInd == -1 || gameID == -1 || typeof availPages[pageInd] == "undefined") {
            return console.log('Invalid page or game ID', pageInd, gameID);
        }
        // Get the data
        var pageID = availPages[pageInd];
        var dataArr = [];
        $.map(AIData['data'], function (val, index) {
            if ((index != "meta-data" && index != "timestamp") && index == pageID) {
                val.title = val.displayHeadline;
                val.report = val.article;
                val.eventId = AIData['data']['meta-data']['current'].eventID;
                val.articleImage = val.image;
                var keyword = index.replace(/-/g, " ");
                val.keyword = keyword.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
                val.index = index;
                dataArr.push(val);
            }
        });
        var arr = {
            keyword: dataArr[0].keyword,
            date: dataArr[0].dateline.replace(/ /g,"/").replace(/,/g,"/").replace("//","/"),
            title: dataArr[0].displayHeadline,
            url: href + league + '/articles/' + dataArr[0].index + '/' + dataArr[0].eventId,
            content: dataArr[0].report + '<br>&nbsp; ',
            img: protocolToUse + 'images.synapsys.us' + dataArr[0].articleImage,
            icon: '../css/public/icons/Touchdown-Loyal_Icon.svg'
        };
        // Set the data
        $('.aiw-title')[0].innerHTML = arr.title;
        $('.aiw-keyword')[0].innerHTML = arr.keyword;
        $('.aiw-date')[0].innerHTML = arr.date;
        $('#ai-link').attr('href', arr.url);
        $('#ai-link').attr('target', target);
        $('.aiw-txt')[0].innerHTML = arr.content;
        $('.aiw-img').css('background-image', 'url(' + arr.img + ')');
        $('.ball').css('background-image', 'url(' + arr.icon + ')');
    } // --> displayPage
    function nextPage() {
        // Exit if no pages
        if (pageInd == -1 || availPages.length == 0) {
            return false;
        }
        // Create new pageInd
        pageInd++;
        if (pageInd >= availPages.length) {
            pageInd = 0;
        }
        // Create page
        displayPage();
    } // --> nextPage
    // **** PARSING FUNCTION ****
    function processData() {
        // Check for data
        if (typeof AIData != "object") {
            return displayError('Invalid YSEOP Response');
        }
        // Get all the pages
        var pages = [];
        for (var i = 0; i < Object.keys(AIData['data']).length; i++) {
            if (pages.indexOf(Object.keys(AIData['data'])[i] > -1) && (Object.keys(AIData['data'])[i] != "meta-data" && Object.keys(AIData['data'])[i] != "timestamp")) {
                availPages.push(Object.keys(AIData['data'])[i]);
            }
        }
        pageInd = 0;
        // Get game ID
        gameID = AIData['data']['meta-data']['current'].eventID;
        if (gameArr.length == 0) {
            parseGames();
        }
        // Display first data
        displayPage();
    } // --> processData
    // Parse the games into an array
    function parseGames() {
        // Array of games
        gameArr = [];
        // Function for the parser
        var parseGame = function (games) {
            // Team names
            $.map(games, function (val, index) {
                var gameData = {};
                gameData.home = val.homeAbbreviation;
                gameData.away = val.awayAbbreviation;
                gameData.fullHome = val.homeTeamLocation + ' ' + val.homeTeamName;
                gameData.fullAway = val.awayTeamLocation + ' ' + val.awayTeamName;
                // Event ID
                gameData.eventId = val.eventID;
                // Date
                gameData.eventDate = val['startDateTime'].dateTime.toUpperCase() + ' EDT';
                gameData.eventTime = ' - ' + val['startDateTime'].time + ' EDT';
                gameArr.push(gameData);
            });
            return gameArr;
        };
        var games = AIData['data']['meta-data'].games;
        // Save all the games
        gameArr = parseGame(games);
        // Display the current game
        showGame();
    } // --> parseGames
    // Creates the dropdown
    function createDropdown(gameLength) {
        var ddStr = '';
        for (var i = 0; i < gameLength; i++) {
            if (i > 0) {
                ddStr += '<div class="divider"></div>';
            }
            ddStr += '<div class="dropdown-elem' + (gameArr[i].eventId == gameID ? ' active" " onclick="ai_widget.switchGame(' + i + ')"' : '" onclick="ai_widget.switchGame(' + i + ')"') + ' title="' + gameArr[i].fullAway + ' vs ' + gameArr[i].fullHome + '"><span class="left"><b>' + gameArr[i].away + '</b> vs <b>' + gameArr[i].home + '</b></span><span class="right">' + gameArr[i].eventDate + '</span></div>';
        }

        // Create
        $('.container')[0].innerHTML = ddStr;
    } // --> createDropdown
    // Show the current game's teams in the header
    function showGame() {
        // Loop through the games to find the current one
        var gameLength = gameArr.length;
        for (var i = 0; i < gameLength; i++) {
            if (gameArr[i].eventId == gameID) {
                $('.home.team')[0].innerHTML = gameArr[i].home;
                $('.away.team')[0].innerHTML = gameArr[i].away;
                $('.header-right.team')[0].innerHTML = gameArr[i].eventTime;
            }
        }
        // Create dropdown
        createDropdown(gameLength);
    } // --> showGame
    // Switches the game
    function switchGame(gameNum) {
        gameID = gameArr[parseInt(gameNum)].eventId;
        toggleDropDown();
        getContent(gameID);
        showGame();
    } // --> switchGame
    // Toggle the dropdown
    function toggleDropDown() {
        var aiwdropdown = $('.aiw-dropdown');
        if (aiwdropdown.hasClass('active')) {
            aiwdropdown.removeClass('active');
            aiwdropdown.find('.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
        } else {
            aiwdropdown.addClass('active');
            aiwdropdown.find('.fa').addClass('fa-caret-up').removeClass('fa-caret-down');
        }
    } // --> toggleDropDown
    getContent();
    return {
        getData: getData,
        nextPage: nextPage,
        toggleDropDown: toggleDropDown,
        switchGame: switchGame
    };
})();
