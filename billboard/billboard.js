billboard = (function () {
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
        $('.header-icon').css('background-image', 'url(' + '../css/public/Icon_Football.png' + ')');
        $('.header-profile')[0].innerHTML = "{Profile Name} News";
        $('.header-profile-small')[0].innerHTML = "{Profile Name} News";
        $('#main-top-link').attr('href', arr1.url);
        $('.main-top-title')[0].innerHTML = arr1.title;
        $('.main-top-title-xs')[0].innerHTML = arr1.title;
        $('.main-top-description')[0].innerHTML = arr1.content;
        $('.main-top-description')[1].innerHTML = arr1.content;
        $('.top-image').attr("src", arr1.img);
        $('#main-bottom-link').attr('href', arr2.url);
        $('.main-bottom-title')[0].innerHTML = arr2.title;
        $('.main-bottom-title-xs')[0].innerHTML = arr2.title;
        $('.main-bottom-description')[0].innerHTML = arr2.content;
        $('.main-bottom-description')[1].innerHTML = arr2.content;
        $('.bottom-image').attr("src", arr2.img);
        displaySubArticles();
        fitText();
    } // --> displayPage

    function toKebabCase(str) {
        str = str.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[\.,']/g, '');
        return str;
    }

    function displaySubArticles() {
        for (var i = 0; i < randomArticles.length; i++) {
            var subContainer = document.createElement('div');
            var subImage = document.createElement('img');
            var subTitle = document.createElement('div');
            var subHr = document.createElement('div');
            var subImgContainer = document.createElement('div');
            subContainer.className = 'col-xs-12 news-container';
            subImgContainer.className = 'col-xs-3 embed-responsive embed-responsive-16by9-sub news-image';
            subImage.className = 'embed-responsive-item';
            subTitle.className = 'col-xs-7 news-title';
            subHr.className = 'col-xs-11 news-hr';
            $('.news-updates')[0].appendChild(subContainer);
            subContainer.appendChild(subImgContainer);
            subImgContainer.appendChild(subImage);
            subContainer.appendChild(subTitle);
            subTitle.innerHTML = randomArticles[i].title;
            subImage.src = randomArticles[i].articleImage;
            $(subContainer).wrapInner($('<a href="' + href + scope + '/articles/' + randomArticles[i].urlSegment + "/" + teamData[1].eventId + '" />'));
            subContainer.appendChild(subHr);
        }
    }

    function fitText() {
        //get vertical distance dynamically between the top of the image and the main horizontal rule.
        var heightLarge = (Math.abs($('.description-top-large').offset().top - $('.main-hr').offset().top) - 20);
        var heightSmall = (Math.abs($('.description-top-small').offset().top - $('.main-hr').offset().top) - 20);
        //set max-height for text container.
        //Dynamically parse the number of lines by dividing the max-height of the container by the line height.
        var topSmall = document.getElementsByClassName('description-top-small')[0],
            lineHeight = parseInt(window.getComputedStyle(topSmall).getPropertyValue("line-height"));
        var lineSmallTop = Math.floor(heightSmall / lineHeight);
        var topLarge = document.getElementsByClassName('description-top-large')[0],
            lineHeight = parseInt(window.getComputedStyle(topLarge).getPropertyValue("line-height"));
        var linesLargeTop = Math.floor(heightLarge / lineHeight);
        var bottomSmall = document.getElementsByClassName('description-bottom-small')[0],
            lineHeight = parseInt(window.getComputedStyle(bottomSmall).getPropertyValue("line-height"));
        var lineSmallBottom = Math.floor(heightSmall / lineHeight);
        var bottomLarge = document.getElementsByClassName('description-bottom-large')[0],
            lineHeight = parseInt(window.getComputedStyle(bottomLarge).getPropertyValue("line-height"));
        var linesLargeBottom = Math.floor(heightLarge / lineHeight);
        //set max-height for text container.
        if (lineSmallTop == 1 || linesLargeTop == 1) {
            $('.main-top-description').css('max-height', '1.3em');
            $('.main-bottom-description').css('max-height', '1.3em');
        } else if ((lineSmallTop == 2 || linesLargeTop == 2) || (window.innerWidth <= 768 && window.innerWidth >= 758)) {
            $('.main-top-description').css('max-height', '2.4em');
            $('.main-bottom-description').css('max-height', '2.4em');
        } else if (lineSmallTop == 3 || linesLargeTop == 3) {
            $('.main-top-description').css('max-height', '3.5em');
            $('.main-bottom-description').css('max-height', '3.5em');
        } else if (lineSmallTop == 4 || linesLargeTop == 4) {
            $('.main-top-description').css('max-height', '4.7em');
            $('.main-bottom-description').css('max-height', '4.7em');
        } else if (lineSmallTop == 5 || linesLargeTop == 5) {
            $('.main-top-description').css('max-height', '5.9em');
            $('.main-bottom-description').css('max-height', '5.9em');
        } else if (lineSmallTop == 6 || linesLargeTop == 6) {
            $('.main-top-description').css('max-height', '7em');
            $('.main-bottom-description').css('max-height', '7em');
        }
        // line-clamp for chrome and safari
        topLarge.style['-webkit-line-clamp'] = linesLargeTop;
        topSmall.style['-webkit-line-clamp'] = lineSmallTop;
        bottomLarge.style['-webkit-line-clamp'] = linesLargeBottom;
        bottomSmall.style['-webkit-line-clamp'] = lineSmallBottom;
        //add or remove box-shadow
        if (window.innerWidth >= 768) {
            $('.billboard').css('box-shadow', '0 0 10px 0 rgba(0, 0, 0, 0.2)');
            $('.news').css('box-shadow', '-5px 0 30px 0 rgba(167, 167, 167, 0.5)');
        } else {
            $('.billboard').css('box-shadow', 'none');
            $('.news').css('box-shadow', 'none');
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

    function toggleSearch() {
        var search = $('.search-container');
        var header = $('.search-button-small');
        if (search.hasClass('active')) {
            search.removeClass('active');
            header.find('.fa').removeClass('fa-close').addClass('fa-search');
        } else {
            search.addClass('active');
            header.find('.fa').removeClass('fa-search').addClass('fa-close');
        }
    }

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
        switchGame: switchGame,
        toggleSearch: toggleSearch
    };
})();

window.onresize = function (event) {
    //get vertical distance dynamically between the top of the image and the main horizontal rule.
    var heightLarge = (Math.abs($('.description-top-large').offset().top - $('.main-hr').offset().top) - 20);
    var heightSmall = (Math.abs($('.description-top-small').offset().top - $('.main-hr').offset().top) - 20);
    //set max-height for text container.
    //Dynamically parse the number of lines by dividing the max-height of the container by the line height.
    var topSmall = document.getElementsByClassName('description-top-small')[0],
        lineHeight = parseInt(window.getComputedStyle(topSmall).getPropertyValue("line-height"));
    var lineSmallTop = Math.floor(heightSmall / lineHeight);
    var topLarge = document.getElementsByClassName('description-top-large')[0],
        lineHeight = parseInt(window.getComputedStyle(topLarge).getPropertyValue("line-height"));
    var linesLargeTop = Math.floor(heightLarge / lineHeight);
    var bottomSmall = document.getElementsByClassName('description-bottom-small')[0],
        lineHeight = parseInt(window.getComputedStyle(bottomSmall).getPropertyValue("line-height"));
    var lineSmallBottom = Math.floor(heightSmall / lineHeight);
    var bottomLarge = document.getElementsByClassName('description-bottom-large')[0],
        lineHeight = parseInt(window.getComputedStyle(bottomLarge).getPropertyValue("line-height"));
    var linesLargeBottom = Math.floor(heightLarge / lineHeight);
    //set max-height for text container.
    if (lineSmallTop == 1 || linesLargeTop == 1) {
        $('.main-top-description').css('max-height', '1.3em');
        $('.main-bottom-description').css('max-height', '1.3em');
    } else if ((lineSmallTop == 2 || linesLargeTop == 2) || (window.innerWidth <= 768 && window.innerWidth >= 758)) {
        $('.main-top-description').css('max-height', '2.4em');
        $('.main-bottom-description').css('max-height', '2.4em');
    } else if (lineSmallTop == 3 || linesLargeTop == 3) {
        $('.main-top-description').css('max-height', '3.5em');
        $('.main-bottom-description').css('max-height', '3.5em');
    } else if (lineSmallTop == 4 || linesLargeTop == 4) {
        $('.main-top-description').css('max-height', '4.7em');
        $('.main-bottom-description').css('max-height', '4.7em');
    } else if (lineSmallTop == 5 || linesLargeTop == 5) {
        $('.main-top-description').css('max-height', '5.9em');
        $('.main-bottom-description').css('max-height', '5.9em');
    } else if (lineSmallTop == 6 || linesLargeTop == 6) {
        $('.main-top-description').css('max-height', '7em');
        $('.main-bottom-description').css('max-height', '7em');
    }
    // line-clamp for chrome and safari
    topLarge.style['-webkit-line-clamp'] = linesLargeTop;
    topSmall.style['-webkit-line-clamp'] = lineSmallTop;
    bottomLarge.style['-webkit-line-clamp'] = linesLargeBottom;
    bottomSmall.style['-webkit-line-clamp'] = lineSmallBottom;
    //add or remove box-shadow
    if (window.innerWidth >= 768) {
        $('.billboard').css('box-shadow', '0 0 10px 0 rgba(0, 0, 0, 0.2)');
        $('.news').css('box-shadow', '-5px 0 30px 0 rgba(167, 167, 167, 0.5)');
        var search = $('.search-container');
        var header = $('.search-button-small');
        if (search.hasClass('active')) {
            search.removeClass('active');
            header.find('.fa').removeClass('fa-close').addClass('fa-search');
        }
    } else {
        $('.billboard').css('box-shadow', 'none');
        $('.news').css('box-shadow', 'none');
    }
};