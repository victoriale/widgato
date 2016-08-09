ai_widget = (function () {
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var mlbDomain = "http://www.homerunloyal.com/";
    var mlbPartnerDomain = "http://www.myhomerunzone.com/";
    var referrer = document.referrer;
    if (referrer.match(/baseball/g)) {
        mlbPartnerDomain = protocolToUse + referrer.split('/')[2] + "/";
    }

    // Declare variables
    var event = '';
    var domain, remnant;
    var temp = location.search;
    var query = {};
    var target;
    var href;
    if (temp != null) {
        query = JSON.parse(decodeURIComponent(temp.substr(1)));
        domain = query.dom;
        remnant = query.remn;
        target = query.targ;

        if (remnant == 'true') {
            href = mlbDomain;
            $("base").attr("href", mlbDomain);
        } else if(referrer.match(/baseball/g)){
            $("base").attr("href", mlbPartnerDomain);
            href = mlbPartnerDomain;
        } else {
            $("base").attr("href", mlbPartnerDomain + domain + "/");
            href = mlbPartnerDomain + domain + "/";
        }
    }
    var protocolToUse = (location.protocol == "https:") ? "https" : "http";
    var APIUrl = protocolToUse + '://prod-homerunloyal-ai.synapsys.us/sidekick',
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
            //$('.aiw-num')[0].innerHTML = '';
            //$('.aiw-num-length')[0].innerHTML = '';
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
        $.map(AIData, function (val, index) {
            if (index != "meta-data" && index == pageID) {
                val.title = val.sidekickTitle;
                val.content = val.article;
                val.report = index;
                if (event == '') {
                    val.eventId = AIData['meta-data']['current'].eventId;
                } else {
                    val.eventId = event;
                }
                dataArr.push(val);
            }
        });
        var imageArr = [];
        $.map(AIData['meta-data']['images'], function (val, index) {
            val.images = val;
            imageArr.push(val);
        });
        imageArr = imageArr[0].concat(imageArr[1]);
        var imgIndex = Math.floor(Math.random() * ((imageArr.length)));
        imgIndex = (imgIndex > -1 ? imgIndex : 0);
        var arr = {
            title: dataArr[0].title,
            url: href + 'articles/' + dataArr[0].report + '/' + dataArr[0].eventId,
            content: dataArr[0].content + '<br>&nbsp; ',
            img: imageArr[imgIndex]
        };
        // Set the data
        $('.aiw-title')[0].innerHTML = arr.title;
        //$('.aiw-num')[0].innerHTML = (pageInd + 1);
        //$('.aiw-num-length')[0].innerHTML = '/' + availPages.length;
        $('#ai-link').attr('href', arr.url);
        $('#ai-link').attr('target', target);
        $('.aiw-txt')[0].innerHTML = arr.content;
        $('.aiw-img').css('background-image', 'url(' + arr.img + ')');
        fitText();
    } // --> displayPage
    function fitText() {
        var textDiv = $('.aiw-txt');
        if (textDiv[0].scrollHeight > textDiv[0].clientHeight) {
            var original = textDiv[0].innerHTML.substring(0, 400),
                index = 0;
            while (index < 500 && textDiv[0].scrollHeight > textDiv[0].clientHeight) {
                index++;
                original = original.substring(0, original.lastIndexOf(" "));
                textDiv[0].innerHTML = original + '...';
            }
        }
    } // --> fitText
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
    } // --> npextPage
    function prevPage() {
        // Exit if no pages
        if (pageInd == -1 || availPages.length == 0) {
            return false;
        }
        // Create new pageInd
        pageInd--;
        if (pageInd <= -1) {
            pageInd = availPages.length - 1;
        }
        // Create page
        displayPage();
    } // --> prevPage
    // **** PARSING FUNCTION ****
    function processData() {
        // Check for data
        if (typeof AIData != "object") {
            return displayError('Invalid YSEOP Response');
        }
        // Get all the pages
        var pages = [];
        for (var i = 0; i < Object.keys(AIData).length; i++) {
            if (pages.indexOf(Object.keys(AIData)[i] > -1) && Object.keys(AIData)[i] != "meta-data") {
                availPages.push(Object.keys(AIData)[i]);
            }
        }
        pageInd = 0;
        // Get game ID
        gameID = AIData['meta-data']['current'].eventId;
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
                gameData.fullHome = val.homeTeamName;
                gameData.fullAway = val.awayTeamName;
                // Event ID
                gameData.eventId = val.eventId;
                // Date
                gameData.eventDate = val.startDateTime;
                gameData.Time = gameData.eventDate.split(' ')[1];
                gameData.eventTime = ' - ' + gameData.Time;
                gameArr.push(gameData);
            });
            return gameArr;
        }
        var games = AIData['meta-data'].games;
        // Save all the games
        gameArr = parseGame(games);
        // Display the current game
        showGame();
    } // --> parseGames
    // Creates the dropdown
    function createDropdown() {
        var ddStr = '';
        for (var i = 0; i < gameArr.length; i++) {
            if (i > 0) {
                ddStr += '<div class="divider"></div>';
            } else {
                ddStr += '<div class="text-snippet">All times are in Eastern Time</div>';
            }
            ddStr += '<div class="dropdown-elem' + (gameArr[i].eventId == gameID ? ' active" " onclick="ai_widget.switchGame(' + i + ')"' : '" onclick="ai_widget.switchGame(' + i + ')"') + ' title="' + gameArr[i].fullAway + ' vs ' + gameArr[i].fullHome + '"><span class="left"><b>' + gameArr[i].away + '</b> vs <b>' + gameArr[i].home + '</b></span><span class="right">' + gameArr[i].eventDate + '</span></div>';
        }

        // Create
        $('.dropdown')[0].innerHTML = ddStr;
    } // --> createDropdown
    // Show the current game's teams in the header
    function showGame() {
        // Loop through the games to find the current one
        for (var i = 0; i < gameArr.length; i++) {
            if (gameArr[i].eventId == gameID) {
                $('.home.team')[0].innerHTML = gameArr[i].home;
                $('.away.team')[0].innerHTML = gameArr[i].away;
                $('.header-right.team')[0].innerHTML = gameArr[i].eventTime;
            }
        }
        // Create dropdown
        createDropdown();
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
        prevPage: prevPage,
        toggleDropDown: toggleDropDown,
        switchGame: switchGame
    };
})();
window.onresize = function (event) {
    var textDiv = $('.aiw-txt');
    if (textDiv[0].scrollHeight > textDiv[0].clientHeight) {
        var original = textDiv[0].innerHTML.substring(0, 400),
            index = 0;
        while (index < 500 && textDiv[0].scrollHeight > textDiv[0].clientHeight) {
            index++;
            original = original.substring(0, original.lastIndexOf(" "));
            textDiv[0].innerHTML = original + '...';
        }
    }
};