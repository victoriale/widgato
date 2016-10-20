chatterbox = (function () {
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    //switch url for live or testing environment
    var tdlDomain = "http://www.touchdownloyal.com/";
    var tdlPartnerDomain = "http://www.mytouchdownzone.com/";
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
    var selectedTab;
    var dataArray = [];
    var imageArray = [];
    var isScrolling = false;
    var isCreated = false;

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
        if (typeof eventId != "undefined") {
            locApiUrl += "/" + eventId;
            event = eventId;
        }
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
        createdropDown();
        // Check for data
        if (pageInd == -1 || tcxId == -1 || typeof availPages[pageInd] == "undefined") {
            return console.log('Invalid page or game ID', pageInd, tcxId);
        }
        // Get the data
        var pageID = availPages[pageInd];
        var dataArr = [];
        $.map(dataArray, function (val) {
            if (val[0] == pageID) {
                val.title = val[1].displayHeadline;
                val.report = val[1].article;
                val.eventId = tcxData['data']['meta-data']['current'].eventID;
                val.articleImage = val[1].image;
                var keyword = val[0].replace(/-/g, " ");
                val.keyword = keyword.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
                val.index = val[0];
                dataArr.push(val);
            }
        });
        // configure the data
        var id = dataArr[0][0] != "player-fantasy" ? dataArr[0].eventId : dataArr[0][1].articleId;
        var arr = {
            //to be replaced once data is coming in.
            //keyword: dataArr[0].keyword,
            keyword: 'football',
            date: moment(dataArr[0][1].dateline).format("dddd, MMM. DD, YYYY"),
            title: dataArr[0][1].displayHeadline,
            url: href + league + '/articles/' + dataArr[0][0] + '/' + id,
            content: dataArr[0].report + '<br>&nbsp; ',
            img: protocolToUse + 'images.synapsys.us' + dataArr[0].articleImage,
            icon: '../css/public/Icon_Football.png'
        };
        // Set the data
        $('.cb-title')[0].innerHTML = arr.title;
        $('.cb-keyword')[0].innerHTML = arr.keyword;
        $('.cb-date')[0].innerHTML = arr.date;
        $('#ai-link').attr('href', arr.url);
        $('#ai-link').attr('target', target);
        $('.cb-txt')[0].innerHTML = arr.content;
        $('.cb-img').css('background-image', 'url(' + arr.img + ')');
        $('.tcx').css('background-image', 'url(../css/public/icons/TCX_Logo_Outlined.svg)');
    } // --> displayPage

    //Populates 3 images above main chatterbox
    function setTriImage() {
        for (var i = 0; i < imageArray.length; i++) {
            var imageContainerLarge = document.createElement('div');
            var imageContainerSmall = document.createElement('div');
            var imageLarge = document.createElement('img');
            var imageSmall = document.createElement('img');
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
            imageLarge.src = protocolToUse + 'images.synapsys.us' + imageArray[i][1].image;
            imageSmall.src = protocolToUse + 'images.synapsys.us' + imageArray[i][1].image;
            titleLarge.innerHTML = imageArray[i][1].displayHeadline;
            titleSmall.innerHTML = imageArray[i][1].displayHeadline;
            $(imageContainerLarge).wrapInner($('<a href="' + href + league + '/articles/' + imageArray[i][0] + "/" + imageArray[i][1].articleId + '" />'));
            $(titleContainerLarge).wrapInner($('<a href="' + href + league + '/articles/' + imageArray[i][0] + "/" + imageArray[i][1].articleId + '" />'));
            $(imageContainerSmall).wrapInner($('<a href="' + href + league + '/articles/' + imageArray[i][0] + "/" + imageArray[i][1].articleId + '" />'));
            $(titleContainerSmall).wrapInner($('<a href="' + href + league + '/articles/' + imageArray[i][0] + "/" + imageArray[i][1].articleId + '" />'));
        }
    }

    //Tab setup
    function setTabs() {
        var tabNames = [
            "Trending",
            "Breaking",
            {
                Sports: [
                    "NFL",
                    "NCAAF",
                    "NBA",
                    "NCAAM",
                    "MLB"
                ]
            },
            "Business",
            "Politics",
            {
                Entertainment: [
                    "TVs",
                    "Movies",
                    "Music",
                    "Celebrities"
                ]
            },
            "Food",
            "Health",
            "Lifestyle",
            "Real Estate",
            "Travel",
            "Weather",
            "Automotive"
        ];
        var tabContainer = $('.tab-container');
        if (selectedTab == undefined) {
            selectedTab = tabNames[0];
        } else {
            tabNames.unshift(selectedTab);
        }
        for (var i = 0; i < tabNames.length; i++) {
            var category;
            if (typeof tabNames[i] == 'object') {
                category = Object.getOwnPropertyNames(tabNames[i]);
            } else {
                category = tabNames[i];
            }
            var tabContent = document.createElement('div');
            if (selectedTab == undefined && i == 0) {
                tabContent.className = 'tab-content active';
                tabContent.innerHTML = category + "<span class='tab-news'>&nbsp;News</span>";
            } else if (selectedTab != undefined && i == 0) {
                tabContent.className = 'tab-content active';
                tabContent.innerHTML = category + "<span class='tab-news'>&nbsp;News</span>";
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
        var moreTab = $('.tab-more');
        var cbdropDownDisplay = $('.cb-dropDown');
        var topic = $('.more-topic');
        if (cbdropDownDisplay.hasClass('active')) {
            cbdropDownDisplay.removeClass('active');
            topic.removeClass('active');
        }
        var target = event.target || event.srcElement;
        selectedTab = target.innerHTML;
        isCreated = false;
        if (event.target.className.indexOf("open") == -1) {
            createdropDown();
        } else {
            var parent = document.getElementsByClassName("dropDown-item");
            for (var i = 0; i < parent.length; i++) {
                parent[i].classList.remove('active');
            }
            event.target.classList.add('active');
        }
        $('.tab-content').remove();
        setTabs();
    }

    function subSelect(event) {
        var target = event.target || event.srcElement;
        if (target.id.indexOf("-svg") == -1) {
            selectedTab = target.outerText;
            isCreated = false;
            toggleDropdown();
            createdropDown();
            $('.tab-content').remove();
            setTabs();
        }
    }

    function createdropDown() {
        var tabNames = [
            "Trending",
            "Breaking",
            {
                Sports: [
                    "NFL",
                    "NCAAF",
                    "NBA",
                    "NCAAM",
                    "MLB"
                ]
            },
            "Business",
            "Politics",
            {
                Entertainment: [
                    "TVs",
                    "Movies",
                    "Music",
                    "Celebrities"
                ]
            },
            "Food",
            "Health",
            "Lifestyle",
            "Real Estate",
            "Travel",
            "Weather",
            "Automotive"
        ];
        if (selectedTab == undefined) {
            selectedTab = tabNames[0];
        }
        var ddStr = '';
        var idName = [];
        if (!$('.cb-dropDown')[0]) {
            var dropDown = document.createElement('div');
            dropDown.className = 'col-xs-12 cb-dropDown';
            $('.cb-header')[0].appendChild(dropDown);
        }
        for (var i = 0; i < tabNames.length; i++) {
            if (selectedTab == tabNames[i]) {
                ddStr += '<div class="dropDown-item active">' + tabNames[i] + '</div>';
            } else if (typeof tabNames[i] != 'object') {
                ddStr += '<div class="dropDown-item">' + tabNames[i] + '</div>';
            } else {
                var id = Object.getOwnPropertyNames(tabNames[i]);
                var svgId = Object.getOwnPropertyNames(tabNames[i]) + "-svg";
                if (selectedTab == id) {
                    ddStr += "<div class='dropDown-item active " + id + "' id='" + id +
                        "'>" + Object.getOwnPropertyNames(tabNames[i]) +
                        '<img class="dropDown-icon" id="' + svgId + '" src="../css/public/icons/Open_Icon_Hover.svg" /></div>';
                } else {
                    ddStr += "<div class='dropDown-item " + id + "' id='" + id +
                        "'>" + Object.getOwnPropertyNames(tabNames[i]) +
                        '<img class="dropDown-icon" id="' + svgId + '" src="../css/public/icons/Open_Icon.svg" /></div>';
                }
                idName.push('#' + id);
                Object.keys(tabNames[i]).map(function (obj) {
                    var index = obj;
                    if (obj = tabNames[i]) {
                        obj[index].map(function (val) {
                            ddStr += '<div class="dropDown-item sub ' + id + '">' + val + '</div>';
                        });
                    }
                });
            }
        }
        $('.cb-dropDown')[0].innerHTML = ddStr;
        $('.cb-dropDown').attr('scrollContainer', 'true');
        var item = document.getElementsByClassName('dropDown-item');
        var count = 0;
        var hasId = false;
        for (var j = 0; j < tabNames.length; j++) {
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
        if ((event.target.src.indexOf("Open_Icon.svg") != -1) || (event.target.src.indexOf("Open_Icon_Hover.svg") != -1)) {
            event.target.parentNode.classList.add('openParent');
            event.target['src'] = "../css/public/icons/Close_Icon.svg";
            for (var i = 0; i < parents.length; i++) {
                parents[i].classList.add('open');
                var close = parents[i].getElementsByClassName("dropDown-icon");
                for (var u = 0; u < close.length; u++) {
                    close[u]['src'] = "../css/public/icons/Open_Icon.svg";
                }
            }
        } else {
            event.target.parentNode.classList.remove('openParent');
            event.target['src'] = "../css/public/icons/Open_Icon.svg";
            for (var j = 0; j < parents.length; j++) {
                parents[j].classList.remove('open');
            }
        }
    }

    // Toggle the dropDown
    function toggleDropdown() {
        if (!isScrolling) {
            var moreTab = $('.tab-more');
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
        $('.tab-content').remove();
        setTabs();
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
        $('.tab-content').remove();
        setTabs();
    } // --> prevPage

// **** PARSING FUNCTION ****
    function processData() {
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
            dataArray = Object.keys(tcxData['data']).map(function (val) {
                if (val != 'meta-data' && val != 'timestamp') {
                    return [val, tcxData['data'][val]];
                }
            });
            //Filters undefined elements from array
            dataArray = dataArray.filter(function (val) {
                return val != undefined;
            });
            //Get 3 random elements from parent array
            imageArray = dataArray.getRandomArt(3, true);
            // Get all the pages
            var pages = [];
            for (var i = 0; i < dataArray.length; i++) {
                if (pages.indexOf(dataArray[i][0] > -1)) {
                    availPages.push(dataArray[i][0]);
                }
            }
            pageInd = 0;
            // Get tcx Id
            tcxId = tcxData['data']['meta-data']['current'].eventID;
            displayPage();
            setTriImage();
            $('.chatterBox').css('display', 'block');
        } catch (e) {
            console.log('Error loading ChatterBox ' + e);
        }
    } // --> processData
    getContent();

    window.onresize = function (event) {
        var moreTab = $('.tab-more');
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
            this.element.addEventListener('mouseleave', this.moveBar.bind(this));
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
                this.scrollRatio = parentHeight / totalHeight;
                animationFrame(function () {
                    var scrollOffset = 6;
                    var scrollPercentage = _this.element.scrollTop / totalHeight;
                    var topPosition = scrollPercentage * totalHeight;
                    topPosition += scrollOffset;
                    // hides scroll if not needed
                    //setup for scroll bar positioning and height
                    _this.bar.style.cssText = 'height:' + (_this.scrollRatio) * 85 + '%; top:' +
                        ((_this.element.scrollTop + 15) / totalHeight ) * 100 + '%;right:-' +
                        (_this.target.clientWidth - _this.bar.clientWidth - 7) + 'px;';
                    _this.trackBar.style.cssText = 'height:' + (parentHeight - 15) + 'px;' +
                        'top:' + (topPosition) + 'px;';
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
        if (typeof target != "undefined" && document.body.scrollHeight) {
            target.postMessage(document.getElementById("wrapper").scrollHeight, "*");
        }
    }, 100);
}
window.addEventListener("resize", postHeight, false);
window.addEventListener("load", postHeight, false);
