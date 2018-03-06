(function () {
    // Declare global windows variable to keep track of kbb and it's product
    if (!window.kbbproduct) {
        window.kbbproduct = {};
    }

    if (!window.kbbproduct['dashboard']) {
        window.kbbproduct['dashboard'] = [];
    }

    // set necessary variables
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var embedUrl = 'dashboard';
    var currentScript = document.currentScript || (function () {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].getAttribute('used') != 'true' && scripts[i].src.indexOf(embedUrl) != -1 && scripts[i].src.indexOf('map') == -1) {
                scripts[i].setAttribute('used', 'true');
                return scripts[i];
            }
        }
    })();

    // declare required files to be compiled into javascript
    var cssFile = require('../css/dashboard.css');
    var htmlFile = require('../html/dashboard.html');
    var playBtn = require('../../globals/svg/play_button.svg');

    var fallbackImage = protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg";

    // include global class from GLOBALS DIRECTORY
    var createWidget = require('../../globals/es5/create_widget.js');

    // Create Dashboard Widget
    var createdDashboard = new createWidget('dashboard', htmlFile, cssFile);
    createdDashboard.fallbackImage = fallbackImage;
    var kbbproduct = createdDashboard.getData();

    //Before inserting widget declare basic of widget number and declare classes
    var dashEl = createdDashboard.widgetEl;
    var dashboardNum = document.getElementsByTagName("dashboard").length;
    dashEl.id = dashboardNum; // Always start at 0
    var dashboardCarousel = dashEl.getElementsByClassName('dw-dash-nav');

    // update key values on dashboard
    Object.keys(dashboardCarousel).forEach(function (value) {
        dashboardCarousel[value].setAttribute('value', dashboardNum);
    });

    // insert widget once basic info of widget has been declared
    createdDashboard.insertStyle(document.head);
    createdDashboard.insertWidget(currentScript.parentNode);


    /**
     * @function dashboard
     * Set up dynamic widget data here
     */
    dashboard = function () {
        var widgetCount = dashEl.id;
        var dashboardScript = currentScript;

        // when creating widget Set default values of current widget dashboard
        var widgetDefaults = {
            widgetNum: widgetCount,
            widget: dashEl,
            widgetData: {},
            retryCount: 0,
            selectedTab: null,
            query: null,
            currentCategory: null,
            apiUrl: null
        };
        // push current widget into array of dashboards to keep each widget seperated
        window.kbbproduct['dashboard'].push(widgetDefaults);
        var dashboardContents = window.kbbproduct['dashboard'][widgetCount];
        dashboardContents.apiUrl = protocolToUse + "dev-article-search.synapsys.us/api/search";


        // set div element to '$' variable
        var $ = function (e) {
            return dashboardContents['widget'].getElementsByClassName(e)[0]
        };

        /**
         * List tab options
         */
        //TODO hard coded
        var tabObj = {
            "trending": {
                display: "Latest News",
                category: "latest"
            },
            "reviews": {
                display: "Expert Reviews",
                category: "review"
            },
            "videos": {
                display: "Videos",
                category: "video"
            },
            "toplists": {
                display: "Top Lists",
                category: "top-10"
            }
        }


        var count = 10;
        var subCategory = "";
        try {
            var srcQuery = dashboardScript.src.split('js?')[1];
            dashboardContents.query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
            dashboardContents.currentCategory = dashboardContents.query.category;
        } catch (e) {
            // TODO: Default values go here in case of errors
            dashboardContents.currentCategory = "latest";
            dashboardContents.query = {};
        }


        /**
         * @function reset
         * Resets index count to 0 when swapping lists
         */
        function reset() {
            dashboardContents.currentIndex = 0;
            getTabNames();
            httpGetData();
        }


        /**
         * @function getTabNames
         * Set up tab options menu
         */
        function getTabNames() {
            var tabArray = [];
            for (var cat in tabObj) {
                tabArray.push(tabObj[cat].category);
            }
            //generate the tabs
            setTabs(); //TODO comments
            sendTabNames(tabArray);
        }


        /**
         * @function sendTabNames
         * Send dashboard tab name to top level
         *
         * @param array tabs - array of categories that are to be sent as a string seperated by comma
         */
        function sendTabNames(tabs) {
            //convert tab array to string
            var arrString = tabs.join(",");
            top.postMessage("dashboard_category:" + arrString, "*");
        }


        /**
         * @function setTabs
         * Format the tabs' options
         **/
        function setTabs() {
            var tabObjects = Object.keys(tabObj);
            var navSection = $("dashboard-navBarId");
            var navSectionWidth = navSection.offsetWidth;
            var totalTabWidth = 0;

            for (var i = 0; i < tabObjects.length; i++) {
                var cat = tabObjects[i];
                //declare class name and if its the last one add additional class
                var navClassName = i == (tabObjects.length - 1) ? "dashboard-navBar-url dashboard-navBar-last" : "dashboard-navBar-url";

                //get display name and category value for each tab option
                var tabDisplay = tabObj[cat].display;
                var category = tabObj[cat].category;
                var navBarUrl = document.createElement('a');

                navBarUrl.className = navClassName;
                navBarUrl.setAttribute("data-attr", category);
                navBarUrl.setAttribute("value", widgetCount);
                navBarUrl.innerHTML = tabDisplay;

                // default to first tab onload
                if (dashboardContents.currentCategory == category) {
                    dashboardContents.selectedTab = tabObj[cat].displayName;
                    navBarUrl.className += " selected";
                    dashboardContents.currentCategory = tabObj[cat].category;
                }

                //create event listener on clik to run tabSelect function
                navBarUrl.addEventListener('click', tabSelect, false);
                navSection.appendChild(navBarUrl);

                //get width of each tab as they get appended
                var tabWidth = navBarUrl.offsetWidth;
                totalTabWidth += tabWidth;
            } // end for loop

            //generate empty tab for border
            if (navSectionWidth > totalTabWidth) {
                var emptyBarUrl = document.createElement('a');
                emptyBarUrl.className = "dashboard-navBar-empty";
                navSection.appendChild(emptyBarUrl);
            }
        }


        /**
         * @function httpGetData
         * Get data from API
         */
        function httpGetData() {
            // set api category here by using FQDN (apiUrl) + current category selected;
            var apiUrl = encodeURI(dashboardContents.apiUrl + "?article_type=" + dashboardContents.currentCategory + "&publisher=kbb.com&category=automotive&count=10");
            var storage = createdDashboard.getData();
            if (!storage.transformData[apiUrl]) {
                var xHttp;
                if (window.XMLHttpRequest) {
                    xHttp = new XMLHttpRequest
                } else {
                    xHttp = new ActiveXObject('Microsoft.XMLHTTP')
                }
                xHttp.onreadystatechange = function () {
                    if (this.readyState == XMLHttpRequest.DONE) {
                        if (this.status == 200) {
                            transformData(apiUrl, JSON.parse(this.responseText));
                        } else {
                            // Error handling - Get the message
                            var msg = this.statusText;
                            if (this.status == 500) {
                                try {
                                    msg = JSON.parse(this.responseText).message
                                } catch (t) {
                                    console.log('No JSON message')
                                }
                            }
                            msg = 'HTTP Error (' + this.status + '): ' + msg;
                            if (dashboardContents.retryCount++ > 5) {
                                throw msg
                            }
                            setTimeout(reset, 500)
                        }
                    }
                };
                xHttp.open('GET', encodeURI(apiUrl), true);
                xHttp.send();
            } else {
                dashboardContents.widgetData = storage.transformData[apiUrl];
                formatCarData();
                artData()
            }

        } //function httpGetData ends


        /**
         * @function transformData
         * transformed given data to simple necessary text elements
         * stored in sessionStorage cache
         *
         * @param string urlApi - api that was used to get dataArr
         * @param object raw - predefined data the was return from urlApi
         **/
        function transformData(urlApi, raw) {
            var storage = createdDashboard.getData();
            var rawData = raw.hits.hits;
            var transformedData = [];
            rawData.forEach(function (data) {
                var source = data._source;
                transformedData.push({
                    'title': source.title,
                    'teaser': source.raw_article_content,
                    'image': source.primary_image.image_source_url,
                    'url': source.article_url
                });
            });
            storage.transformData[urlApi] = transformedData;
            createdDashboard.saveData(storage);
            dashboardContents.widgetData = transformedData;
            formatCarData();
            artData()
        }


        /**
         * @function formatCarData
         * Format data accordingly to specs before displaying for top articles
         **/
        function formatCarData() {
            if (dashboardContents.widgetData.length == 0) {
                return null;
            }
            var dataList = dashboardContents.widgetData[dashboardContents.currentIndex];
            if (dashboardContents.widgetData.length <= 1) {
                $('next-list-link').classList.add("disabled-button");
            } else {
                $('next-list-link').classList.remove("disabled-button");
            }
            $('playBtn').innerHTML = playBtn;

            $('dw-dash-title').innerHTML = dataList.title;
            createdDashboard.truncateText($('dw-dash-title'), 2);
            var readMore = "<a href='" + dataList.url + "'target=_blank>Read More</a>";

            // determine current title height to increase truncated text to keep text height
            var titleHeight = $('dw-dash-title').offsetHeight;
            var titleLength = parseInt(getComputedStyle($('dw-dash-title'), null).getPropertyValue("line-height"));
            var teaserHeight = Math.round(titleHeight / titleLength) % 2;

            $('teaser').innerHTML = dataList.teaser;
            $('dw-dashUrl').href = dataList.url;
            $('dw-dashTitleUrl').href = dataList.url;

            createdDashboard.truncateText($('teaser'), (4 + teaserHeight), readMore);

            var mainImg = createdDashboard.setImage(dataList.image);

            $('dw-dashImg').setAttribute('src', mainImg);
            $('dw-dashImg').setAttribute('onerror', "this.src='" + createdDashboard.fallbackImage + "'");
        }


        /**
         * @function artData
         * Format data accordingly to specs before displaying for bottom articles
         * Append child element to thumbArt to display the 3 articles in the bottom of dashboard
         **/
        function artData() {
            if (dashboardContents.widgetData.length > 1) {
                shuffleArray(dashboardContents.widgetData);
                var dataArr = dashboardContents.widgetData.length > 3 ? dashboardContents.widgetData.splice(0, 3) : dashboardContents.widgetData;
                // get element id thumbnail and empties out the contents of the parent identifier
                var parent = $("thumbnail");
                parent.innerHTML = "";


                // this is the 3 bottom articles/video thumbnails
                dataArr.forEach(function (val, index) {
                    //set className for new element
                    var thumbItem = document.createElement('div');
                    thumbItem.className = "thumbnails-item";
                    //get image, if no image, then display no-image image
                    var thumbImage = createdDashboard.setImage(val.image);
                    var errorImage = createdDashboard.fallbackImage;
                    thumbItem.innerHTML = '<a href="' + val.url + '" target="_blank"><div class="dashboard-sixteen-nine"><img class="dw-dash-thumb-item" /><div class="play-button small" id=playBtnSm>' + playBtn + '</div></div></a><a href="' + val.url + '" target="_blank"><div class="thumbnails-title">' + val.title + '</div></a>';

                    var itemImage = thumbItem.getElementsByClassName('dw-dash-thumb-item')[0];
                    itemImage.setAttribute('src', thumbImage);
                    itemImage.setAttribute('onerror', "this.src='" + errorImage + "'");

                    // append thumbnail items to thumbnails class
                    parent.appendChild(thumbItem);

                    // add title from item that is now in the dom and truncate text
                    var thumbnailTitle = thumbItem.getElementsByClassName("thumbnails-title")[0];
                    createdDashboard.truncateText(thumbnailTitle, 2);
                });
            }
        }


        /**
         * @function tabSelect
         * Listen to select event and activate tab
         * @param object event - the current target dom element from the onclick event function that was clicked
         **/
        function tabSelect(event) {
            var target = event.target || event.srcElement;

            // make sure select correct dashboard
            dashboardContents = window.kbbproduct['dashboard'][target.getAttribute("value")];

            // set tablinks
            var tablinks = dashboardContents.widget.getElementsByClassName("dashboard-navBar-url");
            for (var i = 0; i < tablinks.length; i++) {
                //remove all selected className found in elements
                tablinks[i].className = tablinks[i].className.replace(" selected", "");
            }
            target.className += " selected";
            dashboardContents.currentCategory = target.getAttribute("data-attr"); //set currentCategory to attr value of selected target
            httpGetData();
        }

        /**
         * @function carData
         * This function goes to the next or previous carousel item by adding dir to
         * the current index. This is usually called via the onClick event on the nav
         * buttons.
         *
         * @param object target - the current dom element from the onclick event function that was clicked
         * @param int dir - This number is added to the index to create the index of
         * the item to be shown.
         */
        function carData(target, dir) {
            // update to new
            dashboardContents = window.kbbproduct['dashboard'][target.getAttribute("value")];

            dashboardContents.currentIndex += dir;

            // set dashboard content index to beginning or end of array index
            dashboardContents.currentIndex = dashboardContents.currentIndex >= dashboardContents.widgetData.length ? 0 : dashboardContents.currentIndex < 0 ? (dashboardContents.widgetData.length - 1) : dashboardContents.currentIndex;
            formatCarData();
        }

        function shuffleArray(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
        }

        // NOTE: START HERE
        reset();
        return {
            carousel: carData
        }
    }();
}());
