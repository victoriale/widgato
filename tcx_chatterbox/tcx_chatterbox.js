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
    var isTabCovered = false;

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
        var containerWidth = $('.cb').width() - 60;
        if (containerWidth <= 440) {
            isTabCovered = true;
        } else {
            isTabCovered = false;
        }
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
            date: moment(dataArr[0][1].dateline).format("MMM DD, YYYY"),
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
            "Entertainment",
            "Sports",
            "Politics",
            "Automotive"
        ];
        var tabContainer = document.createElement('div');
        tabContainer.className = 'tab-container';
        if (selectedTab == undefined) {
            selectedTab = tabNames[0];
        }
        if (!isTabCovered) {
            for (var i = 0; i < tabNames.length; i++) {
                var tabContent = document.createElement('div');
                if (selectedTab == undefined && i == 0) {
                    tabContent.className = 'tab-content active';
                    tabContent.addEventListener('click', tabSelect, false);
                } else if (tabNames[i] == selectedTab) {
                    tabContent.className = 'tab-content active';
                    tabContent.addEventListener('click', tabSelect, false);
                } else {
                    tabContent.className = 'tab-content';
                    tabContent.addEventListener('click', tabSelect, false);
                }
                tabContainer.appendChild(tabContent);
                tabContent.innerHTML = tabNames[i];
            }
            $('.cb-header')[0].appendChild(tabContainer);
        } else {
            for (var j = 0; j < tabNames.length; j++) {
                if (tabNames[j] == selectedTab) {
                    var tabContent = document.createElement('div');
                    tabContent.className = 'tab-content tab-content-drop active';
                    tabContainer.appendChild(tabContent);
                    tabContent.innerHTML = tabNames[j] + ' News' + '<i class="fa fa-caret-up"></i>';
                    $('.cb-header')[0].appendChild(tabContainer);
                    $('.tab-content').css('width', '170px');
                }
            }
        }
    }

    //onclick event to change tabs
    function tabSelect(event) {
        var target = event.target || event.srcElement;
        selectedTab = target.innerHTML;
        createdropDown();
        $('.tab-content').remove();
        setTabs();
    }

    function createdropDown() {
        var tabNames = [
            "Trending",
            "Entertainment",
            "Sports",
            "Politics",
            "Automotive"
        ];
        if (selectedTab == undefined) {
            selectedTab = tabNames[0];
        }
        var ddStr = '';
        var count = 0;
        var arrowDiv = document.createElement('div');
        arrowDiv.className = 'arrow-up';
        for (var i = 0; i < tabNames.length; i++) {
            if (i > 0 && i < tabNames.length) {
                ddStr += '<div class="divider"></div>';
            }
            if (count == 0) {
                ddStr += '<div class="dropDown-item">' + selectedTab + '</div>';
                count++;
            }
            if (tabNames[i] != selectedTab) {
                ddStr += '<div class="dropDown-item">' + tabNames[i] + '</div>';
                $('.cb-dropDown')[0].addEventListener('click', tabSelect, false);
            }
        }
        $('.cb-dropDown')[0].innerHTML = ddStr;
        $('.cb-dropDown').attr('container', 'true');
        scrollBar.initAll();
        $('.cb-dropDown')[0].appendChild(arrowDiv);
    }

    // Toggle the dropDown
    function toggleDropdown() {
        if (isTabCovered) {
            var cbdropDown = $('.tab-container');
            var cbdropDownDisplay = $('.cb-dropDown');
            if (cbdropDownDisplay.hasClass('active')) {
                cbdropDownDisplay.removeClass('active');
                cbdropDown.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-up');
            } else {
                cbdropDownDisplay.addClass('active');
                cbdropDown.find('.fa').addClass('fa-caret-down').removeClass('fa-caret-up');
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
        } catch (e) {
            console.log('Error loading ChatterBox ' + e);
        }
    } // --> processData
    getContent();

    window.onresize = function (event) {
        $('.tab-container').remove();
        var containerWidth = $('.cb').width() - 60;
        if (containerWidth <= 440) {
            isTabCovered = true
        } else {
            isTabCovered = false;
            $('.cb-dropDown').removeClass('active');
        }
        setTabs();
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
            this.target.classList.add('container');
            var css = window.getComputedStyle(element);
            if (css['height'] === '0px' && css['max-height'] !== '0px') {
                element.style.height = css['max-height'];
            }
        }

        scroll.prototype = {
            moveBar: function () {
                var totalHeight = this.element.scrollHeight,
                    parentHeight = this.element.clientHeight,
                    _this = this;
                this.scrollRatio = parentHeight / totalHeight;
                animationFrame(function () {
                    // hides scroll if not needed
                    if (_this.scrollRatio === 1) {
                        _this.bar.classList.add('hidden')
                    } else {
                        //setup for scroll bar positioning and height
                        _this.bar.classList.remove('hidden');
                        _this.bar.style.cssText = 'height:' + (_this.scrollRatio) * 100 + '%; top:' +
                            (_this.element.scrollTop / totalHeight ) * 100 + '%;right:-' +
                            (_this.target.clientWidth - _this.bar.clientWidth - 7) + 'px;';
                    }
                });
            }
        };
        //initialize scroll bar
        function initAll() {
            var nodes = doc.querySelectorAll('*[container]');
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
