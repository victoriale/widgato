tdl_billboard = (function () {
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    //switch url for live or testing environment
    var tdlDomain = "http://www.touchdownloyal.com/";
    var tdlPartnerDomain = "http://www.mytouchdownzone.com/";
    //end switch
    var referrer = document.referrer;
    if (referrer.match(/football/g)) {
        tdlPartnerDomain = protocolToUse + referrer.split('/')[2] + "/";
    }

    // if in iframe, get url from parent (referrer), else get it from this window location (works for localhost)
    var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

    function getBaseUrl(string) {
        var urlArray = string.split("/");
        var domain = urlArray[2];
        return protocolToUse + domain;
    }

    var domain, remnant, scope;
    var temp = location.search;
    var href;
    var query = {};
    var tdlspecialDomains = [
        "latimes.com",
        "orlandosentinel.com",
        "sun-sentinel.com",
        "baltimoresun.com",
        "mcall.com",
        "courant.com",
        "dailypress.com",
        "southflorida.com",
        "citypaper.com",
        "themash.com",
        "coastlinepilot.com",
        "sandiegouniontribune.com",
        "ramonasentinel.com",
        "capitalgazette.com",
        "chicagotribune.com"
    ];
    if (temp != null) {
        query = JSON.parse(decodeURIComponent(temp.substr(1)));
        domain = query.dom;
        remnant = query.remn;
        scope = query.scope;
        var mlbSpecialDomain = "";
        var currentDomain = window.location.hostname.toString();
        currentDomain = currentDomain.replace(/^[^.]*\.(?=\w+\.\w+$)/, "");
        for (i = 0; i <= tdlspecialDomains.length; i++) {
            if (currentDomain == tdlspecialDomains[i]) {
                mlbSpecialDomain = "http://baseball." + tdlspecialDomains[i] + "/";
            }
        }
        if (mlbSpecialDomain == "") {
            if (remnant == 'true') {
                href = tdlDomain;
                $("base").attr("href", tdlDomain);
            } else if (referrer.match(/baseball/g)) {
                $("base").attr("href", tdlPartnerDomain);
                href = tdlPartnerDomain;
            } else {
                $("base").attr("href", tdlPartnerDomain + domain + "/");
                href = tdlPartnerDomain + domain + "/";
            }
        }
        else {
            $("base").attr("href", mlbSpecialDomain);
            href = mlbSpecialDomain;
        }
    }

    var teamId = query.team;
    //adjust api url for testing or live
    var APIUrl = protocolToUse + 'prod-touchdownloyal-ai.synapsys.us/billboard/' + scope + '/' + teamId;
    var randomArticles = [];
    var teamData = [];
    var imageArr = [];
    var leftRgb;
    var rightRgb;

    function getContent(eventId) {
        var locApiUrl = APIUrl;
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
    function displayMainArticles() {
        var mainArticles = [];
        var subArticles = [];
        $.map(AIData['data'], function (val, index) {
            if (index != 'meta-data') {
                if (index == 'about-the-teams' || index == 'pregame-report') {
                    if (index == 'pregame-report') {
                        val.title = val.eventID;
                    } else {
                        val.title = val.displayHeadline;
                    }
                    val.content = val.metaHeadline;
                    val.urlSegment = index;
                    val.articleImage = protocolToUse + 'images.synapsys.us' + val.image;
                } else {
                    val.title = val.displayHeadline;
                    val.content = val.metaHeadline;
                    val.urlSegment = index;
                    val.articleImage = protocolToUse + 'images.synapsys.us' + val.image;
                    val.date = val['startDateTime'].dateTime;
                    subArticles.push(val);
                }
                mainArticles.push(val);
            } else {
                teamData.push(val);
            }
        });
        $.map(AIData['data']['meta-data'], function (val) {
            teamData.push(val);
        });
        subArticles.sort(function () {
            return 0.5 - Math.random()
        });
        randomArticles = subArticles;
        var arr1 = {
            title: mainArticles[0].displayHeadline,
            content: mainArticles[0].article + '<br>&nbsp; ',
            url: href + scope + '/articles/' + mainArticles[0].urlSegment + '/' + teamData[1].eventId,
            img: mainArticles[0].articleImage
        };
        var arr2 = {
            title: mainArticles[1].displayHeadline,
            content: mainArticles[1].article + '<br>&nbsp; ',
            url: href + scope + '/articles/' + mainArticles[1].urlSegment + '/' + teamData[1].eventId,
            img: mainArticles[1].articleImage
        };

        leftRgb = teamData[1].awayTeamColors.split(', ')[0];
        rightRgb = teamData[1].homeTeamColors.split(', ')[0];
        getGradient(leftRgb, rightRgb);
        var homeTeamLinkName = teamData[1].homeTeamLocation + '-' + teamData[1].homeTeamName;
        var awayTeamLinkName = teamData[1].awayTeamLocation + '-' + teamData[1].awayTeamName;
        var homeLastName = teamData[1].homeTeamName;
        var awayLastName = teamData[1].awayTeamName;
        $('.header-teams')[0].innerHTML = awayLastName + ' vs ' + homeLastName + ":";
        $('.header-date')[0].innerHTML = teamData[1].gameFlag + " Game - " + teamData[1]['startDateTime'].dateTime;
        $('#main-top-link').attr('href', arr1.url);
        $('.main-top-title')[0].innerHTML = arr1.title;
        $('.main-top-description')[0].innerHTML = arr1.content;
        $('.main-top-image').css('background-image', 'url(' + arr1.img + ')');
        $('#main-bottom-link').attr('href', arr2.url);
        $('.main-bottom-title')[0].innerHTML = arr2.title;
        $('.main-bottom-description')[0].innerHTML = arr2.content;
        $('.main-bottom-image').css('background-image', 'url(' + arr2.img + ')');
        if (remnant == 'true' || referrer.match(/baseball/g)) {
            $('#left-team-link').attr('href', href + scope + '/team/' + toKebabCase(awayTeamLinkName) + '/' + teamData[1].awayTeamId);
            $('#left-team-link-small').attr('href', href + scope + '/team/' + toKebabCase(awayTeamLinkName) + '/' + teamData[1].awayTeamId);
        } else {
            $('#left-team-link').attr('href', href + scope + '/t/' + toKebabCase(awayTeamLinkName) + '/' + teamData[1].awayTeamId);
            $('#left-team-link-small').attr('href', href + scope + '/t/' + toKebabCase(awayTeamLinkName) + '/' + teamData[1].awayTeamId);
        }
        $('.news-profile-image-left').css('background-image', 'url(' + protocolToUse + 'images.synapsys.us' + teamData[1].awayTeamLogo + ')');
        $('.news-profile-team1')[0].innerHTML = awayLastName;
        $('.news-profile-record1')[0].innerHTML = teamData[1].awayTeamWins + '-' + teamData[1].awayTeamLosses;
        $('.news-profile-team1')[1].innerHTML = awayLastName;
        $('.news-profile-record1')[1].innerHTML = teamData[1].awayTeamWins + '-' + teamData[1].awayTeamLosses;
        if (remnant == 'true') {
            $('#right-team-link').attr('href', href + scope + '/team/' + toKebabCase(homeTeamLinkName) + '/' + teamData[1].homeTeamId);
            $('#right-team-link-small').attr('href', href + scope + '/team/' + toKebabCase(homeTeamLinkName) + '/' + teamData[1].homeTeamId);
        } else {
            $('#right-team-link').attr('href', href + scope + '/t/' + toKebabCase(homeTeamLinkName) + '/' + teamData[1].homeTeamId);
            $('#right-team-link-small').attr('href', href + scope + '/t/' + toKebabCase(homeTeamLinkName) + '/' + teamData[1].homeTeamId);
        }
        $('.news-profile-image-right').css('background-image', 'url(' + protocolToUse + 'images.synapsys.us' + teamData[1].homeTeamLogo + ')');
        $('.news-profile-team2')[0].innerHTML = homeLastName;
        $('.news-profile-team2')[1].innerHTML = homeLastName;
        $('.news-profile-record2')[0].innerHTML = teamData[1].homeTeamWins + '-' + teamData[1].homeTeamLosses;
        $('.news-profile-record2')[1].innerHTML = teamData[1].homeTeamWins + '-' + teamData[1].homeTeamLosses;
        displaySubArticles();
        fitText();
    } // --> displayPage

    function toKebabCase(str) {
        str = str.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[\.,']/g, '');
        return str;
    }

    function getGradient(homeHex, awayHex) {
        if (homeHex != null && awayHex != null) {
            var homeRedValue = hexToR(homeHex);
            var homeGreenValue = hexToG(homeHex);
            var homeBlueValue = hexToB(homeHex);
            var leftGradientRgba = "rgba(" + homeRedValue + "," + homeGreenValue + "," + homeBlueValue + ", 1)";
            var awayRedValue = hexToR(awayHex);
            var awayGreenValue = hexToG(awayHex);
            var awayBlueValue = hexToB(awayHex);
            var rightGradientRgba = "rgba(" + awayRedValue + "," + awayGreenValue + "," + awayBlueValue + ", 1)";
            var gradient = fullGradient(leftGradientRgba, rightGradientRgba);
            $('.news-profile').css(gradient);
        } else {
            defaultGradient = 'default-gradient';
        }
    }

    //converts hex to RGB
    function hexToR(h) {
        return parseInt((cutHex(h)).substring(0, 2), 16)
    }

    function hexToG(h) {
        return parseInt((cutHex(h)).substring(2, 4), 16)
    }

    function hexToB(h) {
        return parseInt((cutHex(h)).substring(4, 6), 16)
    }

    function cutHex(h) {
        return (h.charAt(0) == "#") ? h.substring(1, 7) : h
    }

    function fullGradient(a, b) {
        var lgc = a;
        var rgc = b;
        return {
            '-ms-filter': "progid:DXImageTransform.Microsoft.gradient (0deg," + lgc + ',' + rgc + ")",
            'background': "linear-gradient(90deg," + lgc + ',' + rgc + ")"
        };
    }

    function displaySubArticles() {
        for (var i = 0; i < randomArticles.length; i++) {
            var subContainer = document.createElement('div');
            var subImage = document.createElement('img');
            var subTitle = document.createElement('div');
            var subDate = document.createElement('div');
            var subHr = document.createElement('div');
            var subContainerSmall = document.createElement('div');
            var subImageSmall = document.createElement('img');
            var subTitleSmall = document.createElement('div');
            var subDateSmall = document.createElement('div');
            var subHrSmall = document.createElement('div');
            var subShareContainerSmall = document.createElement('div');
            var subShareSmall = document.createElement('i');
            var subShareContainer = document.createElement('div');
            var subShare = document.createElement('i');
            subContainer.className = 'news-container';
            subImage.className = 'news-image overlay red';
            subTitle.className = 'news-title';
            subDate.className = 'news-time';
            subHr.className = 'news-hr';
            subContainerSmall.className = 'news-container';
            subImageSmall.className = 'news-image';
            subTitleSmall.className = 'news-title';
            subDateSmall.className = 'news-time';
            subHrSmall.className = 'news-hr';
            subShareContainer.className = 'news-share-container';
            subShareContainerSmall.className = 'news-share-container';
            subShare.className = 'fa fa-share news-share';
            subShareSmall.className = 'fa fa-share news-share';
            $('.news-updates')[0].appendChild(subContainer);
            subContainer.appendChild(subImage);
            subContainer.appendChild(subShareContainer);
            subShareContainer.appendChild(subShare);
            subContainer.appendChild(subTitle);
            subDate.innerHTML = randomArticles[i].date;
            subDateSmall.innerHTML = randomArticles[i].date;
            subContainer.appendChild(subDate);
            subTitle.innerHTML = randomArticles[i].title;
            $('.news-updates-small')[0].appendChild(subContainerSmall);
            subImageSmall.src = randomArticles[i].articleImage;
            subImage.src = randomArticles[i].articleImage;
            subContainerSmall.appendChild(subImageSmall);
            subContainerSmall.appendChild(subShareContainerSmall);
            subShareContainerSmall.appendChild(subShareSmall);
            subContainerSmall.appendChild(subTitleSmall);
            subContainerSmall.appendChild(subDateSmall);
            subContainerSmall.appendChild(subHrSmall);
            $(subContainer).wrapInner($('<a href="' + href + scope + '/articles/' + randomArticles[i].urlSegment + "/" + teamData[1].eventId + '" />'));
            $(subContainerSmall).wrapInner($('<a href="' + href + scope + '/articles/' + randomArticles[i].urlSegment + "/" + teamData[1].eventId + '" />'));
            subTitleSmall.innerHTML = randomArticles[i].title;
            subContainer.appendChild(subHr);
            //declare div for line count
            var line = $('.news-title')[i];

            if ($(line).lineCount() <= 1) {
                $(subHrSmall).css({
                    "padding-top": "26px"
                });
                $(subHr).css({
                    "padding-top": "26px"
                });
            }
        }
    }

    function fitText() {
        var textDiv1 = $('.main-top-description');
        if (textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
            var original = textDiv1[0].innerHTML.substring(0, 400),
                index = 0;
            while (index < 500 && textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
                index++;
                original = original.substring(0, original.lastIndexOf(" "));
                textDiv1[0].innerHTML = original + '...';
            }
        }
        var textDiv2 = $('.main-bottom-description');
        if (textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
            var original = textDiv2[0].innerHTML.substring(0, 400),
                index = 0;
            while (index < 500 && textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
                index++;
                original = original.substring(0, original.lastIndexOf(" "));
                textDiv2[0].innerHTML = original + '...';
            }
        }
    } // --> fitText
    function scrollDown() {
        randomArticles.push(randomArticles.shift());
        imageArr.push(imageArr.shift());
        $('.news-container').remove();
        displaySubArticles();
    } // --> scrollDown
    function scrollUp() {
        randomArticles.splice(0, 0, randomArticles[randomArticles.length - 1]);
        randomArticles.pop();
        imageArr.splice(0, 0, imageArr[imageArr.length - 1]);
        imageArr.pop();
        $('.news-container').remove();
        displaySubArticles();
    } // --> scrollUp
    function processData() {
        // Check for data
        if (typeof AIData != "object") {
            return displayError('Invalid YSEOP Response');
        }
        // Get all the pages
        for (var i = 0; i < AIData.length; i++) {
            if (pages.indexOf(AIData[i].id) > -1) {
                availPages.push(AIData[i].id);
            }
        }
        pageInd = 0;
        parseGames();
        // Display first data
        displayMainArticles();
    } // --> processData
    // Parse the games into an array
    function parseGames() {
        // Array of games
        gameArr = [];
        // Function for the parser
        var parseGame = function (articles) {
            // Team names
            $.map(articles, function (val, index) {
                var gameData = {};
                gameArr.push(gameData);
            });
            return gameArr;
        };
        // Create Jquery object
        var articles = AIData;
        // Save all the games
        gameArr = parseGame(articles);
        // Display the current game
        //showGame();
    } // --> parseGames
    function switchGame(gameNum) {
        gameID = gameArr[parseInt(gameNum)].eventId;
        toggleDropDown();
        getContent(gameID);
        showGame();
    } // --> switchGame
    getContent();
    return {
        getData: getData,
        scrollDown: scrollDown,
        scrollUp: scrollUp,
        switchGame: switchGame
    };
})();

//jQuery plugin that creates a hidden temporary div that will return the number of lines generated.
$.fn.lineCount = function () {
    var temp = $('<div style="line-height:12px;visibility:hidden;">hidden temporary div to give line height</div>').appendTo(document.body);
    var count = this.height() / temp.height();
    temp.remove();
    return count;
};

window.onresize = function (event) {
    var textDiv1 = $('.main-top-description');
    if (textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
        var original = textDiv1[0].innerHTML.substring(0, 400),
            index = 0;
        while (index < 500 && textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
            index++;
            original = original.substring(0, original.lastIndexOf(" "));
            textDiv1[0].innerHTML = original + '...';
        }
    }
    var textDiv2 = $('.main-bottom-description');
    if (textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
        var original = textDiv2[0].innerHTML.substring(0, 400),
            index = 0;
        while (index < 500 && textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
            index++;
            original = original.substring(0, original.lastIndexOf(" "));
            textDiv2[0].innerHTML = original + '...';
        }
    }
    var line = $('.news-title');
    var hr = $('.news-hr');

    for (var i = 0; i < line.length; i++) {
        if ($(line[i]).lineCount() <= 1) {
            $(hr[i]).css({
                "padding-top": "26px"
            });
        } else {
            $(hr[i]).css({
                "padding-top": "15px"
            });
        }
    }
};
