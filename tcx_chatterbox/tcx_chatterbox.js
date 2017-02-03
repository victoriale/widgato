chatterbox = (function () {
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";

    // Declare variables
    var event = '';
    var target, href, selectedTab;
    var temp = location.search;
    var query = {};
    var dataArray = [];
    var imageArray = [];
    var dataLength = 0;
    var isScrolling = false;
    var isCreated = false;
    var subSelected = false;
    var pageNo = 0;
    if (temp != null) {
        query = JSON.parse(decodeURIComponent(temp.substr(1)));
        target = query.targ;
    }
    if (query.category != null && query.category != '') {
      if (query.category == "real%20estate" || query.category == "real-estate" || query.category == "real estate") {
        query.category = "realestate";
      }
        selectedTab = query.category;
    }
    //adjust api url for testing or live
    var APIUrl = protocolToUse + 'dev-article-library.synapsys.us/chatterbox?source[]=snt_ai&source[]=tca-curated&random=1',
        tcxData = {},
        tcxId = -1,
        pageInd = -1,
        availPages = [];

    function getContent(eventId) {
        // Clear old data
        if (tcxId != -1) {
            availPages = [];
            pageInd = -1;
            $('.cb-title')[0].innerHTML = "Loading...";
            $('.cb-txt')[0].innerHTML = '';
        }
        var locApiUrl = APIUrl;
        // if (typeof eventId != "undefined") {
        //     locApiUrl += "/" + eventId;
        //     event = eventId;
        // }
        $.ajax({
            url: locApiUrl,
            success: function (data) {
                tcxData = data;
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
        $('.cb-txt')[0].innerHTML = errorMsg;
    } // --> displayError

    function getData() {
        return tcxData;
    } // --> getData

    function displayPage() {
        //setup tabs
        setTabs();
        if (!subSelected) {
            createdropDown();
        }
        // Check for data
        if (pageInd == -1 || typeof availPages[pageInd] == "undefined") {
            return console.log('Invalid page or game ID', pageInd, tcxId);
        }
        // Get the data
        var pageID = availPages[pageInd];
        var dataArr = [];
        $.map(dataArray, function (val) {
            if (val[0] == pageID) {
                val.title = val[1][0].title;
                val.report = val[1][0].teaser;
                val.eventId = val[1][0].id;
                val.articleImage = val[1][0].image_url;
                var keyword = val[0].replace(/-/g, " ");
                val.keyword = keyword.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
                val.keywordUrl = "tcxmedia.com/news-feed/" + val.keyword;
                val.index = val[0];
                val.url = val[1][0].article_url;
                dataArr.push(val);
            }
        });
        // configure the data
        //var id = dataArr[0][0] != "player-fantasy" ? dataArr[0].eventId : dataArr[0][1].articleId;
        var id = dataArr[0]['1'][pageNo].eventId;
        var arr = {
            //to be replaced once data is coming in.
            //keyword: dataArr[0].keyword,
            keyword: selectedTab.toUpperCase(),
            keywordUrl: protocolToUse + "tcxmedia.com/news-feed/" + selectedTab,
            date: moment(dataArr[0]['1'][pageNo].publication_date*1000).format("dddd, MMM. DD, YYYY").toUpperCase(),
            title: dataArr[0]['1'][pageNo].title,
            url: getOffsiteLink(selectedTab.toLowerCase(), dataArr[0]['1'][pageNo].article_url, dataArr[0]['1'][pageNo].id),
            content: dataArr[0]['1'][pageNo].teaser + '<br>&nbsp; ',
            img: protocolToUse + 'dev-images.synapsys.us' + dataArr[0]['1'][pageNo].image_url
        };
        // Set the data
        $('.cb-title')[0].innerHTML = arr.title;
        $('.cb-keyword')[0].innerHTML = arr.keyword;
        $('.cb-keyword-url').attr('href', arr.keywordUrl);
        // $('.cb-keyword-url').attr('href', null);
        $('.cb-date')[0].innerHTML = arr.date;
        $('#ai-link').attr('href', arr.url);
        $('#ai-link').attr('target', target);
        $('.cb-txt')[0].innerHTML = arr.content;
        $('.cb-img').css('background-image', 'url(' + arr.img + ')');
        $('.tcx').css('background-image', 'url(../css/public/icons/TCX_Logo_Outlined.svg)');
    } // --> displayPage

    //Populates 3 images above main chatterbox
    function setTriImage() {
      // clear out any prev 3 up content
      $('.image-row')[0].innerHTML = "";
      $('.title-row')[0].innerHTML = "";
       for (var i = 0; i < imageArray[0][1].length && i < 3; i++) {
           var imageContainerLarge = document.createElement('div');
           var imageContainerSmall = document.createElement('div');
           var imageLarge = document.createElement('div');
           var imageSmall = document.createElement('div');
           var titleContainerLarge = document.createElement('div');
           var titleContainerSmall = document.createElement('div');
           var titleLarge = document.createElement('div');
           var titleSmall = document.createElement('div');
           titleContainerLarge.className = 'col-sm-4 hidden-xs-down tri-title-container';
           titleContainerSmall.className = 'col-sm-12 hidden-sm-up tri-title-container-stack';
           imageContainerLarge.className = 'col-xs-12 col-sm-4 hidden-xs-down embed-responsive embed-responsive-16by9-sub tri-image-container';
           imageContainerSmall.className = 'col-xs-12 col-md-4 hidden-sm-up embed-responsive embed-responsive-16by9-triple-stack tri-image-container';
           if (i == 0) {
               imageLarge.className = 'embed-responsive-item tri-image left';
               titleLarge.className = 'col-sm-11 tri-title left';
           } else if (i == 2) {
               imageLarge.className = 'embed-responsive-item tri-image right';
               titleLarge.className = 'col-sm-11 tri-title right';
           } else {
               imageLarge.className = 'embed-responsive-item tri-image center';
               titleLarge.className = 'col-sm-11 tri-title center';
           }
           imageSmall.className = 'embed-responsive-item tri-image';
           titleSmall.className = 'col-sm-11 tri-title';
           $('.image-row')[0].appendChild(imageContainerLarge);
           $('.triple-stack')[0].appendChild(imageContainerSmall);
           imageContainerLarge.appendChild(imageLarge);
           imageContainerSmall.appendChild(imageSmall);
           $('.title-row')[0].appendChild(titleContainerLarge);
           $('.triple-stack')[0].appendChild(titleContainerSmall);
           titleContainerLarge.appendChild(titleLarge);
           titleContainerSmall.appendChild(titleSmall);
           imageLarge.style.backgroundImage = "url('" + protocolToUse + 'dev-images.synapsys.us' + imageArray[0][1][i].image_url + "')";
           imageSmall.style.backgroundImage = "url('" + protocolToUse + 'dev-images.synapsys.us' + imageArray[0][1][i].image_url + "')";
           titleLarge.innerHTML = imageArray[0][1][i].title;
           titleSmall.innerHTML = imageArray[0][1][i].title;
           $(imageContainerLarge).wrapInner($('<a href="' + href + '/articles/' + imageArray[0][0] + "/" + imageArray[0][1][i].id + '" />'));
           $(titleContainerLarge).wrapInner($('<a href="' + href + '/articles/' + imageArray[0][0] + "/" + imageArray[0][1][i].id + '" />'));
           $(imageContainerSmall).wrapInner($('<a href="' + href + '/articles/' + imageArray[0][0] + "/" + imageArray[0][1][i].id + '" />'));
           $(titleContainerSmall).wrapInner($('<a href="' + href + '/articles/' + imageArray[0][0] + "/" + imageArray[0][1][i].id + '" />'));
       }
       postHeight();
    }

    //Tab setup

    function getTabNames() {
        var obj = tcxData['data'].categories;
        var tabArray = [];
        Object.keys(obj).map(function (val) {
            if (obj[val].length > 0) {
                tabArray.push([val, obj[val]]);
            } else {
                tabArray.push(val);
            }
        });
        return tabArray;
    }

    function setTabs() {
        var tabNames = getTabNames();
        var tabContainer = $('.tab-container');
        if (selectedTab == undefined) {
            if (typeof tabNames[0] == 'object') {
                selectedTab = tabNames[0][0];
            } else {
                selectedTab = tabNames[0];
            }
        } else {
            tabNames.unshift(selectedTab);
        }
        for (var i = 0; i < tabNames.length; i++) {
            var category;
            if (typeof tabNames[i] == 'object') {
                category = tabNames[i][0];
            } else {
                category = tabNames[i];
            }
            var tabContent = document.createElement('div');
            if (selectedTab == undefined && i == 0) {
                tabContent.className = 'tab-content active';
                tabContent.innerHTML = category + "<span class='tab-news'>&nbsp;</span>";
            } else if (selectedTab != undefined && i == 0) {
                tabContent.className = 'tab-content active';
                tabContent.innerHTML = category + "<span class='tab-news'>&nbsp;</span>";
            } else if (category != selectedTab) {
                tabContent.className = 'tab-content';
                tabContent.innerHTML = category;
                tabContent.addEventListener('click', tabSelect, false);
            }
            tabContainer[0].appendChild(tabContent);
        }
        $('.cb-header')[0].appendChild(tabContainer[0]);
    }

    //onclick event to change tabs
    function tabSelect(event) {
        subSelected = false;
        var cbdropDownDisplay = $('.cb-dropDown');
        var topic = $('.more-topic');
        if (cbdropDownDisplay.hasClass('active')) {
            cbdropDownDisplay.removeClass('active');
            topic.removeClass('active');
        }
        var target = event.target || event.srcElement;
        selectedTab = target.textContent.toLowerCase();
        isCreated = false;
        if (event.target.className.indexOf("open") == -1) {
            createdropDown();
        } else {
            subSelected = true;
            var parent = document.getElementsByClassName("dropDown-item");
            for (var i = 0; i < parent.length; i++) {
                parent[i].classList.remove('active');
            }
            event.target.classList.add('active');
        }
        $('.tab-content').remove();
        setTabs();
        processData();
    }

    function subSelect(event) {
        subSelected = false;
        var target = event.target || event.srcElement;
        if (target.id.indexOf("-svg") == -1) {
            selectedTab = target.textContent.toLowerCase();
            isCreated = false;
            toggleDropdown();
            $('.tab-content').remove();
            processData();
        }
    }

    function createdropDown() {
        var tabNames = getTabNames();
        if (selectedTab == undefined) {
            if (typeof tabNames[0] == 'object') {
                selectedTab = tabNames[0][0];
            } else {
                selectedTab = tabNames[0];
            }
        }
        var ddStr = '';
        var idName = [];
        if (!$('.cb-dropDown')[0]) {
            var dropDown = document.createElement('div');
            dropDown.className = 'col-xs-12 cb-dropDown';
            $('.cb-header')[0].appendChild(dropDown);
        }
        for (var i = 0; i < tabNames.length; i++) {
            if (selectedTab.toLowerCase() == tabNames[i]) {
                ddStr += '<div class="dropDown-item active">' + capitalizeString(tabNames[i]) + '</div>';
            } else if (typeof tabNames[i] != 'object') {
                ddStr += '<div class="dropDown-item">' + capitalizeString(tabNames[i]) + '</div>';
            } else {
                var id = typeof tabNames[i] == 'object' ? capitalizeString(tabNames[i][0]) : capitalizeString(tabNames[i]);
                var svgId = typeof tabNames[i] == 'object' ? capitalizeString(tabNames[i][0]) + "-svg" : capitalizeString(tabNames[i]) + "-svg";
                if (selectedTab.toLowerCase() == id.toLowerCase()) {
                    ddStr += "<div class='dropDown-item active " + id + "' id='" + id +
                        "'>" + capitalizeString(tabNames[i][0]) +
                        '<div class="dropDown-icon" id="' + svgId + '" style="background: url(../css/public/icons/Open_Icon_Hover.svg) center no-repeat;"></div></div>';
                } else {
                    ddStr += "<div class='dropDown-item " + id + "' id='" + id +
                        "'>" + capitalizeString(tabNames[i][0]) +
                        '<div class="dropDown-icon" id="' + svgId + '" style="background: url(../css/public/icons/Open_Icon.svg) center no-repeat;"></div></div>';
                }
                idName.push('#' + id);
                tabNames[i][1].map(function (obj) {
                    ddStr += '<div class="dropDown-item sub ' + id + '">' + capitalizeString(obj) + '</div>';
                });
            }
        }
        $('.cb-dropDown')[0].innerHTML = ddStr;
        $('.cb-dropDown').attr('scrollContainer', 'true');
        var item = document.getElementsByClassName('dropDown-item');
        var count = 0;
        var hasId = false;
        for (var j = 0; j < dataLength; j++) {
            var element = $(".dropDown-item")[j];
            if (element.id) {
                hasId = true
            }
            count++;
            if (!hasId) {
                item[j].addEventListener('click', tabSelect, false);
            }
            hasId = false;
        }
        for (var x = 0; x < idName.length; x++) {
            $(idName[x])[0].addEventListener('click', subSelect, false);
        }
        $('.dropDown-icon').click(function (e) {
            e.preventDefault();
            openSubMenu(e)
        });
    }

    function openSubMenu(event) {
        var index = event.target.id.split('-')[0];
        var parents = document.getElementsByClassName("dropDown-item sub " + index);
        if ((event.target.style.background.indexOf("Open_Icon.svg") != -1) || (event.target.style.background.indexOf("Open_Icon_Hover.svg") != -1)) {
            event.target.parentNode.classList.add('openParent');
            event.target.style.background = "url(../css/public/icons/Close_Icon.svg) center no-repeat";
            for (var i = 0; i < parents.length; i++) {
                parents[i].classList.add('open');
                var close = parents[i].getElementsByClassName("dropDown-icon");
                for (var u = 0; u < close.length; u++) {
                    close[u].style.background = "url(../css/public/icons/Open_Icon.svg) center no-repeat";
                }
            }
        } else {
            event.target.parentNode.classList.remove('openParent');
            event.target.style.background = "url(../css/public/icons/Open_Icon.svg) center no-repeat";
            for (var j = 0; j < parents.length; j++) {
                parents[j].classList.remove('open');
            }
        }
    }

    // Toggle the dropDown
    function toggleDropdown() {
        if (!isScrolling) {
            var cbdropDownDisplay = $('.cb-dropDown');
            var topic = $('.more-topic');
            if (cbdropDownDisplay.hasClass('active')) {
                cbdropDownDisplay.removeClass('active');
                topic.removeClass('active');
            } else {
                cbdropDownDisplay.addClass('active');
                topic.addClass('active');
                if (!isCreated) {
                    scrollBar.initAll();
                    isCreated = true;
                }
                var arrowDiv = document.createElement('div');
                arrowDiv.className = 'arrow-up';
                $('.cb-dropDown')[0].appendChild(arrowDiv);
            }
        }
    } // --> toggleDropdown

    function nextPage() {
        // Exit if no pages

        pageNo++;
        if (pageNo >= 10) {
            pageNo = 0;
        }
        // Create page
        displayPage();
        $('.tab-content').remove();
        setTabs();
    } // --> npextPage

    function prevPage() {
        // Exit if no pages

        // Create new pageInd
        pageNo--;
        if (pageNo <= -1) {
            pageNo = 0;
        }
        // Create page
        displayPage();
        $('.tab-content').remove();
        setTabs();
    } // --> prevPage

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
            case "tv":
                return "TV";
        }
        return string.replace(/\w\S*/g, function (text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
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
        if (query.remn == false || query.remn == "false") {
            partnerCode = query.dom;
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
            case 'realestate':
                if (partnerCode != null) {
                    link = protocolToUse + "//dev.tcxmedia.com/" + partnerCode + "/news/" + scope + "/article/story/" + id;
                }
                else {
                    link = protocolToUse + "//dev.tcxmedia.com/news-feed/" + scope + "/article/story/" + id;
                }
                break;
            default:
                if (partnerCode != null) {
                    link = protocolToUse + "//dev.tcxmedia.com/" + partnerCode + "/news/" + scope + "/article/story/" + id;
                }
                else {
                    link = protocolToUse + "//dev.tcxmedia.com/news-feed/" + scope + "/article/story/" + id;
                }
        }
        return link;
    }

// **** PARSING FUNCTION ****
    function processData() {
      tcxData.data.realestate = tcxData.data["real estate"];
      delete tcxData.data["real estate"];
        // Check for data
        try {
            if (typeof tcxData != "object") {
                return displayError('Invalid YSEOP Response');
            }
            //Function takes array, removes 3 random elements from array, and cuts the 3 random elements from the main array
            Array.prototype.getRandomArt = function (number, cutIndex) {
               var index = cutIndex ? this : this.slice(0);
               index.sort(function () {
                   return .5 - Math.random();
               });
               return index.splice(0, number);
            };
            //Converts object into array
            dataArray = Object.keys(tcxData['data']).map(function (val, index) {
                if (selectedTab == undefined && index == 0) {
                    return [val, tcxData['data'][val]];
                } else if (val == selectedTab) {
                    return [val, tcxData['data'][val]];
                } else {
                    return
                }
            });
            dataLength = dataArray.length - 1;
            //Filters undefined elements from array
            dataArray = dataArray.filter(function (val) {
                return val != undefined;
            });
            //Get 3 random elements from parent array
            imageArray = dataArray.getRandomArt(3, 0);
            // Get all the pages
            var pages = [];
            for (var i = 0; i < dataArray.length; i++) {
                if (pages.indexOf(dataArray[i][0] > -1)) {
                    if (selectedTab == undefined) {
                        availPages.push(dataArray[i][0]);
                    } else {
                        availPages = [];
                        availPages.push([selectedTab]);
                    }
                }
            }
            pageInd = 0;
            // Get tcx Id
            //tcxId = tcxData['data']['meta-data']['current'].eventID;
            displayPage();
            setTriImage();
            if (dataArray.length == 1) {
                // $('.cb-btn').css('display', 'none');
                $('.cb-btn').css('display', 'block');
            } else {
                $('.cb-btn').css('display', 'block');
            }
            $('.chatterBox').css('display', 'block');
        } catch (e) {
            console.log('Error loading ChatterBox ' + e);
        }
    } // --> processData
    getContent();

    window.onresize = function (event) {
        var cbdropDownDisplay = $('.cb-dropDown');
        var topic = $('.more-topic');
        if (cbdropDownDisplay.hasClass('active')) {
            cbdropDownDisplay.removeClass('active');
            topic.removeClass('active');
        }
    };

    (function (win, doc) {
        //Letting browser know that it will need to perform animation
        var animationFrame = win.requestAnimationFrame || function (e) {
                return setTimeout(e, 0);
            };
        //define each new node
        function initElement(element) {
            Object.defineProperty(element, 'item-scrollBar', new scrollBar(element));
        }

        //Adding event listeners for mouse events
        function mouseDrag(element, context) {
            var lastIndexY;
            element.addEventListener('mousedown', function (e) {
                isScrolling = true;
                //get position of mouse pointer
                lastIndexY = e.pageY;
                element.classList.add('selected');
                doc.body.classList.add('selected');
                doc.addEventListener('mousemove', drag);
                doc.addEventListener('mouseup', stopDrag);
                return false;
            });
            //calculates scroll ratio
            function drag(e) {
                var drag = e.pageY - lastIndexY;
                lastIndexY = e.pageY;
                animationFrame(function () {
                    context.element.scrollTop += drag / context.scrollRatio;
                });
            }

            //removes all listeners and appropriate classes
            function stopDrag() {
                element.classList.remove('selected');
                doc.body.classList.remove('selected');
                doc.removeEventListener('mousemove', drag);
                doc.removeEventListener('mouseup', stopDrag);
                setTimeout(function () {
                    isScrolling = false;
                }, 10);
            }
        }

        //constructor for scroll bar
        function scroll(element) {
            this.target = element;
            this.bar = '<div class="scroll">';
            this.wrapper = doc.createElement('div');
            this.wrapper.setAttribute('class', 'scroll-wrapper');
            this.element = doc.createElement('div');
            this.element.setAttribute('class', 'scroll-content');
            this.trackBar = doc.createElement('div');
            this.trackBar.setAttribute('class', 'scroll-track');
            this.element.appendChild(this.trackBar);
            this.wrapper.appendChild(this.element);
            while (this.target.firstChild) {
                this.element.appendChild(this.target.firstChild);
            }
            this.target.appendChild(this.wrapper);
            this.target.insertAdjacentHTML('beforeEnd', this.bar);
            this.bar = this.target.lastChild;
            mouseDrag(this.bar, this);
            this.moveBar();
            this.element.addEventListener('scroll', this.moveBar.bind(this));
            this.element.addEventListener('mouseenter', this.moveBar.bind(this));
            this.target.classList.add('scrollContainer');
            var css = window.getComputedStyle(element);
            if (css['height'] === '0px' && css['max-height'] !== '0px') {
                element.style.height = css['max-height'] - 50;
            }
        }

        scroll.prototype = {
            moveBar: function () {
                var totalHeight = this.element.scrollHeight,
                    parentHeight = this.element.clientHeight,
                    _this = this;
                if (parentHeight != 0 && totalHeight != 0) {
                    this.scrollRatio = parentHeight / totalHeight;
                }
                animationFrame(function () {
                    var scrollOffset = 6;
                    var scrollPercentage = _this.element.scrollTop / totalHeight;
                    var topPosition = scrollPercentage * totalHeight;
                    topPosition += scrollOffset;
                    // hides scroll if not needed
                    //setup for scroll bar positioning and height
                    if (_this.scrollRatio != 1) {
                        _this.bar.style.cssText = 'height:' + (_this.scrollRatio) * 85 + '%; top:' +
                            ((_this.element.scrollTop + 15) / totalHeight ) * 100 + '%;right:-' +
                            (_this.target.clientWidth - _this.bar.clientWidth - 7) + 'px;';
                        _this.trackBar.style.cssText = 'height:' + (parentHeight - 15) + 'px;' +
                            'top:' + (topPosition) + 'px;';
                    }
                });
            }
        };
        //initialize scroll bar
        function initAll() {
            var nodes = doc.querySelectorAll('*[scrollContainer]');
            for (var i = 0; i < nodes.length; i++) {
                initElement(nodes[i]);
            }
        }

        doc.addEventListener('DOMContentLoaded', initAll);
        scroll.initElement = initElement;
        scroll.initAll = initAll;
        win.scrollBar = scroll;
    })(window, document);

    return {
        getData: getData,
        nextPage: nextPage,
        prevPage: prevPage,
        tabSelect: tabSelect,
        toggleDropdown: toggleDropdown
    };
})
();
//function to send a message to the chatterbox module. This should bypass the iframe security.
function postHeight() {
    setTimeout(function () {
        var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
        if (typeof target != "undefined") {
            target.postMessage(document.getElementById("wrapper").scrollHeight, "*");
        }
    }, 100);
}
window.addEventListener("resize", postHeight, false);
window.addEventListener("load", postHeight, false);
