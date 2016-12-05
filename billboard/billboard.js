billboard = (function () {
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var category, keyword, league;
    var verticalColor, verticalIcon, verticalName;
    var temp = location.search;
    var query = {};
    if (temp != null) {
        query = JSON.parse(decodeURIComponent(temp.substr(1)));
        keyword = query.keyword;
        category = query.category;
        league = query.league;
    }

    var verticalType = league == "" ? category : league;
    if (league != null && league != "") {
      league = "&subCategory=" + league;
    }

    //verticalType = verticalType != "" ? verticalType : keyword;
    //adjust api url for testing or live
    if (category.indexOf("keyword-") != -1) {
      category = category.replace("keyword-","");
      var APIUrl = protocolToUse + 'dev-tcxmedia-api.synapsys.us/articles?keyword[]=' + category + '&count=15&metaDataOnly=1';
    }
    else {
      var APIUrl = protocolToUse + 'dev-tcxmedia-api.synapsys.us/articles?category=' + category + league + '&count=15&metaDataOnly=1';
    }
    var randomArticles = [];
    var imageArr = [];

    function getContent(eventId) {
        var locApiUrl = APIUrl;
        $.ajax({
            url: locApiUrl,
            success: function (data) {
                AIData = data;
                processData();
                fitText();
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
            if (index == 0 || index == 1) {
                val.title = val.title;
                val.content = val.teaser;
                if (val.source == "snt_ai") {
                    if (val.scope) {
                        val.urlSegment = getOffsiteLink(val.scope, val.article_url);
                    } else {
                        val.urlSegment = getOffsiteLink(val.category, val.article_url);
                    }
                } else {
                    if (val.scope) {
                        val.urlSegment = getOffsiteLink(val.scope, val.article_url, val.article_id);
                    } else {
                        val.urlSegment = getOffsiteLink(val.category, val.article_url, val.article_id);
                    }
                }
                val.articleImage = protocolToUse + 'images.synapsys.us/' + val.image_url;
            } else {
                val.title = val.title;
                val.content = val.teaser;
                if (val.source == "snt_ai") {
                    if (val.scope) {
                        val.urlSegment = getOffsiteLink(val.scope, val.article_url);
                    } else {
                        val.urlSegment = getOffsiteLink(val.category, val.article_url);
                    }
                } else {
                    if (val.scope) {
                        val.urlSegment = getOffsiteLink(val.scope, val.article_url, val.article_id);
                    } else {
                        val.urlSegment = getOffsiteLink(val.category, val.article_url, val.article_id);
                    }
                }
                val.articleImage = protocolToUse + 'images.synapsys.us/' + val.image_url;
                subArticles.push(val);
            }
            mainArticles.push(val);
        });
        subArticles.sort(function () {
            return 0.5 - Math.random()
        });
        randomArticles = subArticles;
        var arr1 = {
            title: mainArticles[0].title,
            content: mainArticles[0].teaser + '<br>&nbsp; ',
            url: mainArticles[0].urlSegment,
            img: mainArticles[0].articleImage
        };
        var arr2 = {
            title: mainArticles[1].title,
            content: mainArticles[1].teaser + '<br>&nbsp; ',
            url: mainArticles[1].urlSegment,
            img: mainArticles[1].articleImage
        };
        $('.header-icon').css('background-image', 'url(' + verticalIcon + ')');
        $('.header-profile')[0].innerHTML = verticalName + " News";
        $('.header-profile-small')[0].innerHTML = verticalName + " News";
        $('#main-top-link').attr('href', arr1.url);
        $('.main-top-title')[0].innerHTML = arr1.title.replace(/[\\]/g,"");
        $('.main-top-title-xs')[0].innerHTML = arr1.title.replace(/[\\]/g,"");
        $('.main-top-description')[0].innerHTML = arr1.content.replace(/[\\]/g,"");
        $('.main-top-description')[1].innerHTML = arr1.content.replace(/[\\]/g,"");
        $('.top-image').css("background-image", 'url(' + arr1.img + ')');
        $('#main-bottom-link').attr('href', arr2.url);
        $('.main-bottom-title')[0].innerHTML = arr2.title.replace(/[\\]/g,"");
        $('.main-bottom-title-xs')[0].innerHTML = arr2.title.replace(/[\\]/g,"");
        $('.main-bottom-description')[0].innerHTML = arr2.content.replace(/[\\]/g,"");
        $('.main-bottom-description')[1].innerHTML = arr2.content.replace(/[\\]/g,"");
        $('.bottom-image').css("background-image", 'url(' + arr2.img + ')');
        //set vertical colors and name:
        $('.header, .search-button-small, .news-button-up, .news-button-down, .search-container').css('background', verticalColor);
        $('.search-container-arrow').css('border-bottom', '8px solid ' + verticalColor);
        $('.search-button, .search-button-small').css('color', verticalColor);
        $('.news-button-down, .news-button-up').hover(function (e) {
            $(this).css('background', e.type === "mouseenter" ? "#000" : verticalColor);
        });
        $('.main-top a, .main-bottom a, .news-container a').css('color', "#000");
        if (verticalName.toLowerCase() != 'weather') {
            $('.main-top a, .main-bottom a, .news-container a').hover(function (e) {
                $(this).css('color', e.type === "mouseenter" ? verticalColor : "#000");
            });
        } else {
            $('.main-top a, .main-bottom a, .news-container a').hover(function (e) {
                $(this).css('color', e.type === "mouseenter" ? '#444' : "#000");
            });
            $('.header-profile, .header-profile-small, .news-button-up, .news-button-down, .button').css('color', '#272727');
            $('.news-button-up').hover(function (e) {
                $(this).css('color', e.type === "mouseenter" ? '#fff' : "#272727");
                $('.up').css('color', e.type === "mouseenter" ? '#fff' : "#272727");
            });
            $('.news-button-down').hover(function (e) {
                $(this).css('color', e.type === "mouseenter" ? '#fff' : "#272727");
                $('.down').css('color', e.type === "mouseenter" ? '#fff' : "#272727");
            });

        }
        $('.search').attr('placeholder', 'Search for anything ' + verticalName.toLowerCase());
        displaySubArticles();
    } // --> displayPage

    function displaySubArticles() {
        for (var i = 0; i < randomArticles.length; i++) {
            var subContainer = document.createElement('div');
            var subImage = document.createElement('div');
            var subTitle = document.createElement('div');
            var subHr = document.createElement('div');
            var subImgContainer = document.createElement('div');
            subContainer.className = 'col-xs-12 news-container';
            subImgContainer.className = 'col-xs-3 embed-responsive embed-responsive-16by9-sub news-image';
            subImage.className = 'embed-responsive-item sub-image';
            subTitle.className = 'col-xs-7 news-title';
            subHr.className = 'col-xs-11 news-hr';
            $('.news-updates')[0].appendChild(subContainer);
            subContainer.appendChild(subImgContainer);
            subImgContainer.appendChild(subImage);
            subContainer.appendChild(subTitle);
            subTitle.innerHTML = randomArticles[i].title.replace(/[\\]/g,"");
            subImage.style.backgroundImage = "url('" + randomArticles[i].articleImage + "')";
            $(subContainer).wrapInner($('<a href="' + randomArticles[i].urlSegment + '" />'));
            subContainer.appendChild(subHr);
        }
        $('.news-container a').css('color', "#000");
        if (verticalName.toLowerCase() != 'weather') {
            $('.news-container a').hover(function (e) {
                $(this).css('color', e.type === "mouseenter" ? verticalColor : "#000");
            });
        } else {
            $('.news-container a').hover(function (e) {
                $(this).css('color', e.type === "mouseenter" ? '#444' : "#000");
            });
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
        var lineSmallTop = Math.floor((heightSmall / lineHeight) + 1);
        var topLarge = document.getElementsByClassName('description-top-large')[0],
            lineHeight = parseInt(window.getComputedStyle(topLarge).getPropertyValue("line-height"));
        var linesLargeTop = Math.floor((heightLarge / lineHeight) + 1);
        var bottomSmall = document.getElementsByClassName('description-bottom-small')[0],
            lineHeight = parseInt(window.getComputedStyle(bottomSmall).getPropertyValue("line-height"));
        var linesSmallBottom = Math.floor((heightSmall / lineHeight) + 1);
        var bottomLarge = document.getElementsByClassName('description-bottom-large')[0],
            lineHeight = parseInt(window.getComputedStyle(bottomLarge).getPropertyValue("line-height"));
        var linesLargeBottom = Math.floor((heightLarge / lineHeight) + 1);
        //set max-height for text container.
        if (lineSmallTop == 1 || linesLargeTop == 1) {
            $('.main-top-description').css('max-height', '1.3em');
            $('.main-bottom-description').css('max-height', '1.3em');
        } else if ((lineSmallTop == 2 || linesLargeTop == 2) || (window.innerWidth <= 768 && window.innerWidth >= 758)) {
            $('.main-top-description').css('max-height', '2.8em');
            $('.main-bottom-description').css('max-height', '2.8em');
        } else if (lineSmallTop == 3 || linesLargeTop == 3) {
            $('.main-top-description').css('max-height', '4.2em');
            $('.main-bottom-description').css('max-height', '4.2em');
        } else if (lineSmallTop == 4 || linesLargeTop == 4) {
            $('.main-top-description').css('max-height', '5.6em');
            $('.main-bottom-description').css('max-height', '5.6em');
        } else if (lineSmallTop == 5 || linesLargeTop == 5) {
            $('.main-top-description').css('max-height', '5.6em');
            $('.main-bottom-description').css('max-height', '5.6em');
        } else {
            $('.main-top-description').css('max-height', '1.3em');
            $('.main-bottom-description').css('max-height', '1.3em');
        }
        // line-clamp for chrome and safari
        topLarge.style['-webkit-line-clamp'] = linesLargeTop;
        topSmall.style['-webkit-line-clamp'] = lineSmallTop;
        bottomLarge.style['-webkit-line-clamp'] = linesLargeBottom;
        bottomSmall.style['-webkit-line-clamp'] = linesSmallBottom;
    } // --> fitText

    function getVerticalAttributes() {
        if (verticalType.indexOf('_') > -1 && verticalType != undefined) {
            var string = verticalType.replace('_', ' ');
            verticalName = capitalizeString(string);
        } else {
            verticalName = capitalizeString(verticalType);
        }

        switch (verticalType) {
            case "football":
            case "nfl":
            case "ncaaf":
            case "fbs":
                verticalColor = "#2d3e50";
                verticalIcon = "../css/public/icons/Touchdown-Loyal_Icon.svg";
                break;
            case "baseball":
            case "mlb":
                verticalColor = "#bc2027";
                verticalIcon = "../css/public/icons/Home-Run-Loyal_Icon%202.svg";
                break;
            case "basketball":
            case "nba":
            case "ncaam":
                verticalColor = "#f26f26";
                verticalIcon = "../css/public/icons/Hoops-Loyal_Icon%202.svg";
                break;
            case "business":
                verticalColor = "#3098ff";
                verticalIcon = "../css/public/icons/Invest-Kit_Icon.svg";
                break;
            case "real-estate":
            case "real_estate":
            case "real estate":
                verticalColor = "#44b224";
                verticalIcon = "../css/public/icons/Joyful-Home_Icon.svg";
                break;
            case "global":
            case "politics":
                verticalColor = "#005eba";
                verticalIcon = "../css/public/icons/Politics_Icon.svg";
                break;
            case "weather":
                verticalColor = "#ffd800";
                verticalIcon = "../css/public/icons/Weather_Icon.svg";
                break;
            case "tcx":
                verticalColor = "#00b9e3";
                verticalIcon = "../css/public/icons/TCX-Trending.svg";
                break;
            case "entertainment":
            case "tv":
            case "tvs":
            case "movies":
            case "music":
            case "celebrities":
                verticalColor = "#5c52bd";
                verticalIcon = "../css/public/icons/Entertainment_Icon.svg";
                break;
            case "food":
                verticalColor = "#00c5a0";
                verticalIcon = "../css/public/icons/Icon_Food.svg";
                break;
            case "travel":
                verticalColor = "#0a55a0";
                verticalIcon = "../css/public/icons/Icon_Travel.svg";
                break;
            case "health":
                verticalColor = "#d0122c";
                verticalIcon = "../css/public/icons/Icon_Health.svg";
                break;
            case "trending":
                verticalColor = "#36bac7";
                verticalIcon = "../css/public/icons/TCX-Trending.svg";
                break;
            case "sports":
                verticalColor = "#ce3b27";
                verticalIcon = "../css/public/icons/Icon_Sports.svg";
                break;
            case "lifestyle":
                verticalColor = "#65398e";
                verticalIcon = "../css/public/icons/Icon_Lifestyle.svg";
                break;
            case "breaking":
                verticalColor = "#911000";
                verticalIcon = "../css/public/icons/Icon_Breaking.svg";
                break;
            case "ipo":
                verticalColor = "#3098ff";
                verticalIcon = "../css/public/icons/Invest-Kit_Icon.svg";
                break;
            case "automotive":
                verticalColor = "#f91d38";
                verticalIcon = "../css/public/icons/Icon_Car.svg";
                break;
            case "demographics":
                verticalColor = "#65398e";
                verticalIcon = "../css/public/icons/Demographic_Icon.svg";
                break;
            case "disaster":
                verticalColor = "#902d8e";
                verticalIcon = "../css/public/icons/Disaster_Icon.svg";
                break;
            case "crime":
                verticalColor = "#f6af05";
                verticalIcon = "../css/public/icons/Crime_Icon.svg";
                break;
            case "independent":
                verticalColor = "#249004";
                verticalIcon = "../css/public/icons/Politics-Independent_Icon.svg";
                break;
            case "democratic":
                verticalColor = "#0e477f";
                verticalIcon = "../css/public/icons/Politics-Democrat_Icon.svg";
                break;
            case "republican":
                verticalColor = "#ff0101";
                verticalIcon = "../css/public/icons/Politics-Republican_Icon.svg";
                break;

            default:
                verticalColor = "#00b9e3";
                verticalIcon = "../css/public/icons/TCX-Trending.svg";
                verticalName = "Trending";
        }
    }

    function capitalizeString(string) {
        switch (string) {
            case "nfl":
                return "NFL";
            case "ncaaf":
                return "NCAAF";
            case "nba":
                return "NBA";
            case "ncaam":
                return "NCAAM";
            case "mlb":
                return "MLB";
        }
        return string.replace(/\w\S*/g, function (text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
    }

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

    function getHomeInfo() {
        //grabs the domain name of the site and sees if it is our partner page
        var partner = false;
        var isHome = false;
        var hide = false;
        var hostname = window.location.hostname;
        var partnerPage = /mytcxzone/.test(hostname) || /^newspaper\./.test(hostname); //todo: change to correct domain not localhost
        var urlSplit = window.location.pathname.split('/');
        var name = "";
        var partnerName = "";
        var isSubdomainPartner = /^newspaper\./.test(hostname);
        if (partnerPage) {
            partner = partnerPage;
            partnerName = urlSplit[1];
            name = urlSplit[2];
        }
        else {
            name = urlSplit[1];
        }
        //PLEASE REVISIT and change
        if (partnerPage && (name == '' || name == 'news')) {
            hide = true;
            isHome = true;
        } else if (!partnerPage && (name == '' || name == 'deep-dive')) {
            hide = false;
            isHome = true;
        } else {
            hide = false;
            isHome = false;
        }

        return {
            isPartner: partner,
            hide: hide,
            isHome: isHome,
            partnerName: partnerName,
            isSubdomainPartner: isSubdomainPartner
        };
    }

    function checkPartnerDomain(partnerCode) {
        var result = false;
        var specialDomains = [
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
        for (var i = 0; i < specialDomains.length; i++) {
            if (specialDomains[i] == partnerCode) {
                result = true;
                return result;
            }
        }
        return result;
    }

    function getOffsiteLink(scope, relativeUrl, id) {
        var link = "";
        var siteVars = getHomeInfo();
        var partnerCode;
        if (siteVars.isPartner) {
            partnerCode = siteVars.partnerName;
        }
        switch (scope) {
            //FOOTBALL URL
            case 'nfl':
            case 'ncaaf':
                if (partnerCode != null) {
                    if (checkPartnerDomain(partnerCode)) {
                        link = protocolToUse + "//football." + partnerCode + relativeUrl;
                    }
                    else {
                        link = protocolToUse + "//mytouchdownzone.com/" + partnerCode + relativeUrl;
                    }
                }
                else {
                    link = protocolToUse + "//touchdownloyal.com" + relativeUrl;
                }
                break;
            //BASKETBALL URL
            case 'nba':
            case 'ncaam':
                if (partnerCode != null) {
                    link = protocolToUse + "//myhoopszone.com/" + partnerCode + relativeUrl;
                }
                else {
                    link = protocolToUse + "//hoopsloyal.com" + relativeUrl;
                }
                break;
            //BASEBALL URL
            case 'mlb':
                if (partnerCode != null) {
                    if (checkPartnerDomain(partnerCode)) {
                        link = protocolToUse + "//baseball." + partnerCode + relativeUrl;
                    }
                    else {
                        link = protocolToUse + "//myhomerunzone.com/" + partnerCode + relativeUrl;
                    }
                }
                else {
                    link = protocolToUse + "//homerunloyal.com" + relativeUrl;
                }
                break;
            //FINANCE URL
            case 'business':
                if (partnerCode != null) {
                    link = protocolToUse + "//myinvestkit.com/" + partnerCode + relativeUrl;
                }
                else {

                    link = protocolToUse + "//www.investkit.com" + relativeUrl;
                }
                break;
            //REALESTATE URL
            case 'real-estate':
                if (partnerCode != null) {
                    link = protocolToUse + "//myhousekit.com/" + partnerCode + relativeUrl;
                }
                else {
                    link = protocolToUse + "//joyfulhome.com" + relativeUrl;
                }
                break;
            default:
                if (partnerCode != null) {
                    link = protocolToUse + "//dev.tcxmedia.com/deep-dive/" + partnerCode + relativeUrl;
                }
                else {
                    link = protocolToUse + "//dev.tcxmedia.com/deep-dive/" + scope + "/article/story/" + id;
                }
        }
        return link;
    }

    function processData() {
        // Check for data
        try {
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
            getVerticalAttributes();
            parseGames();
            // Display first data
            displayMainArticles();

            $('.billboard').css('display', 'block');
            postHeight();
        } catch (e) {
            console.log('Error loading Live Billboard ' + e);
        }
    } // --> processData
    // Parse the games into an array
    function parseGames() {
        // Array of games
        gameArr = [];
        // Function for the parser
        var parseGame = function (articles) {
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
//the window.onload is needed for Firefox to resize the text in conjunction with the fitText function
window.onload = function () {
    //get vertical distance dynamically between the top of the image and the main horizontal rule.
    var heightLarge = (Math.abs($('.description-top-large').offset().top - $('.main-hr').offset().top) - 20);
    var heightSmall = (Math.abs($('.description-top-small').offset().top - $('.main-hr').offset().top) - 20);
    //set max-height for text container.
    //Dynamically parse the number of lines by dividing the max-height of the container by the line height.
    var topSmall = document.getElementsByClassName('description-top-small')[0],
        lineHeight = parseInt(window.getComputedStyle(topSmall).getPropertyValue("line-height"));
    var lineSmallTop = Math.floor((heightSmall / lineHeight) + 1);
    var topLarge = document.getElementsByClassName('description-top-large')[0],
        lineHeight = parseInt(window.getComputedStyle(topLarge).getPropertyValue("line-height"));
    var linesLargeTop = Math.floor((heightLarge / lineHeight) + 1);
    var bottomSmall = document.getElementsByClassName('description-bottom-small')[0],
        lineHeight = parseInt(window.getComputedStyle(bottomSmall).getPropertyValue("line-height"));
    var linesSmallBottom = Math.floor((heightSmall / lineHeight) + 1);
    var bottomLarge = document.getElementsByClassName('description-bottom-large')[0],
        lineHeight = parseInt(window.getComputedStyle(bottomLarge).getPropertyValue("line-height"));
    var linesLargeBottom = Math.floor((heightLarge / lineHeight) + 1);
    //set max-height for text container.
    if (lineSmallTop == 1 || linesLargeTop == 1) {
        $('.main-top-description').css('max-height', '1.3em');
        $('.main-bottom-description').css('max-height', '1.3em');
    } else if ((lineSmallTop == 2 || linesLargeTop == 2) || (window.innerWidth <= 768 && window.innerWidth >= 758)) {
        $('.main-top-description').css('max-height', '2.8em');
        $('.main-bottom-description').css('max-height', '2.8em');
    } else if (lineSmallTop == 3 || linesLargeTop == 3) {
        $('.main-top-description').css('max-height', '4.2em');
        $('.main-bottom-description').css('max-height', '4.2em');
    } else if (lineSmallTop == 4 || linesLargeTop == 4) {
        $('.main-top-description').css('max-height', '5.6em');
        $('.main-bottom-description').css('max-height', '5.6em');
    } else if (lineSmallTop == 5 || linesLargeTop == 5) {
        $('.main-top-description').css('max-height', '5.6em');
        $('.main-bottom-description').css('max-height', '5.6em');
    } else {
        $('.main-top-description').css('max-height', '1.3em');
        $('.main-bottom-description').css('max-height', '1.3em');
    }
    // line-clamp for chrome and safari
    topLarge.style['-webkit-line-clamp'] = linesLargeTop;
    topSmall.style['-webkit-line-clamp'] = lineSmallTop;
    bottomLarge.style['-webkit-line-clamp'] = linesLargeBottom;
    bottomSmall.style['-webkit-line-clamp'] = linesSmallBottom;
};

window.onresize = function (event) {
    //get vertical distance dynamically between the top of the image and the main horizontal rule.
    var heightLarge = (Math.abs($('.description-top-large').offset().top - $('.main-hr').offset().top) - 20);
    var heightSmall = (Math.abs($('.description-top-small').offset().top - $('.main-hr').offset().top) - 20);
    //set max-height for text container.
    //Dynamically parse the number of lines by dividing the max-height of the container by the line height.
    var topSmall = document.getElementsByClassName('description-top-small')[0],
        lineHeight = parseInt(window.getComputedStyle(topSmall).getPropertyValue("line-height"));
    var lineSmallTop = Math.floor((heightSmall / lineHeight) + 1);
    var topLarge = document.getElementsByClassName('description-top-large')[0],
        lineHeight = parseInt(window.getComputedStyle(topLarge).getPropertyValue("line-height"));
    var linesLargeTop = Math.floor((heightLarge / lineHeight) + 1);
    var bottomSmall = document.getElementsByClassName('description-bottom-small')[0],
        lineHeight = parseInt(window.getComputedStyle(bottomSmall).getPropertyValue("line-height"));
    var linesSmallBottom = Math.floor((heightSmall / lineHeight) + 1);
    var bottomLarge = document.getElementsByClassName('description-bottom-large')[0],
        lineHeight = parseInt(window.getComputedStyle(bottomLarge).getPropertyValue("line-height"));
    var linesLargeBottom = Math.floor((heightLarge / lineHeight) + 1);
    //set max-height for text container.
    if (lineSmallTop == 1 || linesLargeTop == 1) {
        $('.main-top-description').css('max-height', '1.3em');
        $('.main-bottom-description').css('max-height', '1.3em');
    } else if ((lineSmallTop == 2 || linesLargeTop == 2) || (window.innerWidth <= 768 && window.innerWidth >= 758)) {
        $('.main-top-description').css('max-height', '2.8em');
        $('.main-bottom-description').css('max-height', '2.8em');
    } else if (lineSmallTop == 3 || linesLargeTop == 3) {
        $('.main-top-description').css('max-height', '4.2em');
        $('.main-bottom-description').css('max-height', '4.2em');
    } else if (lineSmallTop == 4 || linesLargeTop == 4) {
        $('.main-top-description').css('max-height', '5.6em');
        $('.main-bottom-description').css('max-height', '5.6em');
    } else if (lineSmallTop == 5 || linesLargeTop == 5) {
        $('.main-top-description').css('max-height', '5.6em');
        $('.main-bottom-description').css('max-height', '5.6em');
    } else {
        $('.main-top-description').css('max-height', '1.3em');
        $('.main-bottom-description').css('max-height', '1.3em');
    }
    // line-clamp for chrome and safari
    topLarge.style['-webkit-line-clamp'] = linesLargeTop;
    topSmall.style['-webkit-line-clamp'] = lineSmallTop;
    bottomLarge.style['-webkit-line-clamp'] = linesLargeBottom;
    bottomSmall.style['-webkit-line-clamp'] = linesSmallBottom;
    //add or remove box-shadow
    if (window.innerWidth >= 768) {
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
//function to send a message to the billboard module. This should bypass the iframe security.
function postHeight() {
    setTimeout(function () {
        var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
        if (typeof target != "undefined" && document.body.scrollHeight) {
            //Added "billboard" to postMessage so the component will know the messages origin.
            target.postMessage(document.getElementById("wrapper").scrollHeight + " billboard", "*");
        }
    }, 100);
}
window.addEventListener("resize", postHeight, false);
