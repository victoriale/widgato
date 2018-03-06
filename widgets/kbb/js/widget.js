(function () {
    // Declare global windows variable to keep track of kbb and it's product
    if (!window.kbbproduct) {
        window.kbbproduct = {};
    }

    if (!window.kbbproduct['widget']) {
        window.kbbproduct['widget'] = [];
    }

    // set necessary variables
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var embedUrl = 'kbb/min/widget';
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
    var cssFile = require('../css/widget.css');
    var htmlFile = require('../html/widget.html');
    var fallbackImage = protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg";

    // include global class from GLOBALS DIRECTORY
    var createWidget = require('../../globals/es5/create_widget.js');

    // Create Dashboard Widget
    var createdWidget = new createWidget('widget', htmlFile, cssFile);
    createdWidget.fallbackImage = fallbackImage;
    var kbbproduct = createdWidget.getData();

    //Before inserting widget declare basic of widget number and declare classes
    var widgetEl = createdWidget.widgetEl;
    var widgetNum = document.getElementsByTagName("widget").length;
    widgetEl.id = widgetNum; // Always start at 0
    var widgetCarousel = widgetEl.getElementsByClassName('widget-main-nav');

    // update key values on trending widget
    Object.keys(widgetCarousel).forEach(function (value) {
        widgetCarousel[value].setAttribute('value', widgetNum);
    });

    // insert widget once basic info of widget has been declared
    createdWidget.insertStyle(document.head);
    createdWidget.insertWidget(currentScript.parentNode);


    widget = function () {
        var widgetCount = widgetEl.id;
        var trendingScript = currentScript;

        // when creating widget Set default values of current widget dashboard
        var widgetDefaults = {
            widgetNum: widgetCount,
            widget: widgetEl,
            widgetData: {},
            retryCount: 0,
            selectedTab: null,
            query: null,
            apiUrl: null
        };

        // push current widget into array of trending to keep each widget seperated
        window.kbbproduct['widget'].push(widgetDefaults);
        var widgetContents = window.kbbproduct['widget'][widgetCount];
        var pageApi = protocolToUse + "dev-web-harvester.synapsys.us/api/v1/related?url=" + encodeURIComponent(window.top.location.href) + "&count=10";
        var errorApi = protocolToUse + "dev-web-harvester.synapsys.us/api/v1/related?url=" + encodeURIComponent(protocolToUse + "www.kbb.com" + "&count=10");
        // set div element to '$' variable
        var $ = function (e) {
            return widgetContents['widget'].getElementsByClassName(e)[0]
        };

        widgetContents.apiUrl = pageApi;
        /**
         * @function reset
         * Resets index count to 0 when swapping lists
         */
        function reset() {
            widgetContents.currentIndex = 0; // resets index count to 0 when swapping lists
            httpGetData();
        }


        function httpGetData() {
            // set api category here by using FQDN (apiUrl) + current category selected;


            var storage = createdWidget.getData();
            if (!storage.transformData[widgetContents.apiUrl]) {
                var xHttp;
                if (window.XMLHttpRequest) {
                    xHttp = new XMLHttpRequest
                } else {
                    xHttp = new ActiveXObject('Microsoft.XMLHTTP')
                }
                xHttp.onreadystatechange = function () {
                    if (this.readyState == XMLHttpRequest.DONE) {
                        if (this.status == 200) {
                            transformData(widgetContents.apiUrl, JSON.parse(this.responseText));
                        } else {
                            // DEFAULT ERROR API FOR KBB
                            widgetContents.apiUrl = errorApi;
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
                            if (widgetContents.retryCount++ > 5) {
                                throw msg
                            }
                            setTimeout(reset, 500)
                        }
                    }
                };

                xHttp.open('GET', widgetContents.apiUrl, true);
                xHttp.send();
            } else {
                widgetContents.widgetData = storage.transformData[widgetContents.apiUrl];
                formatData();
            }

        } //function httpGetData ends

        function transformData(urlApi, raw) {
            var storage = createdWidget.getData();
            var rawData = raw.hits.hits;
            var transformedData = [];
            rawData.forEach(function (data) {
                var source = data._source;
                var teaser = source.raw_article_content.length > 155 ? source.raw_article_content.substr(0, 155) : source.raw_article_content;
                transformedData.push({
                    'title': source.title,
                    'teaser': teaser,
                    'image': source.primary_image.image_source_url,
                    'url': source.article_url
                });
            });
            storage.transformData[urlApi] = transformedData;
            createdWidget.saveData(storage);
            widgetContents.widgetData = transformedData;
            formatData();
        }


        /**
         * @function formatData
         * Format data accordingly to specs before displaying for top articles
         **/
        function formatData() {
            if (widgetContents.widgetData.length == 0) {
                return null;
            }
            var dataList = widgetContents.widgetData[widgetContents.currentIndex];
            if (widgetContents.widgetData.length <= 1) {
                $('next-list-link').classList.add("disabled-button");
            } else {
                $('next-list-link').classList.remove("disabled-button");
            }

            //limit to 2 lines using truncateText
            var title = dataList.title;
            $('widget-mainTitle').innerHTML = title;
            createdWidget.truncateText($('widget-mainTitle'), 2);

            // determine current title height to increase truncated text to keep text height
            var titleHeight = $('widget-main-title').offsetHeight;
            if (titleHeight < 1) {
                titleHeight = 44; //default to standard value if hidden
            }
            var titleLength = parseInt(getComputedStyle($('widget-main-title'), null).getPropertyValue("line-height"));
            var teaserHeight = Math.round(titleHeight / titleLength) % 2;
            var teaser = dataList.teaser;
            $('teaser').innerHTML = teaser; //limit to 3 or 4 lines depends on the number of lines in the title
            createdWidget.truncateText($('teaser'), (3 + teaserHeight));
            window.teaserHeight = teaserHeight;
            window.debounce = false;
            window.onresize = function () {
                if (window.debounce == false) {
                    createdWidget.truncateText($('teaser'), (3 + window.teaserHeight));
                    window.debounce = true;
                }
                clearTimeout(window.resizeDebounce);
                window.resizeDebounce = setTimeout(function () {
                    window.debounce == false;
                    createdWidget.truncateText($('teaser'), (3 + window.teaserHeight));
                }, 200);
            };

            var genLink = dataList.url; // generate current article url
            $('widget-mainUrl').href = genLink;
            $('widget-mainTitleUrl').href = genLink;
            $('widget-mainTextUrl').href = genLink;

            // TODO IE issue with image not loading
            var mainImg = createdWidget.setImage(dataList.image);
            $('widget-mainImg').setAttribute('src', mainImg);
            $('widget-mainImg').setAttribute('onerror', "this.src='" + createdWidget.fallbackImage + "'");
        }


        /**
         * @function carData
         * This function goes to the next or previous carousel item by adding dir to
         * the current index. This is usually called via the onClick event on the nav
         * buttons.
         *
         * @param int dir - This number is added to the index to create the index of
         * the item to be shown.
         */
        function carData(target, dir) {
            // update to new
            widgetContents = window.kbbproduct['widget'][target.getAttribute("value")];

            widgetContents.currentIndex += dir;

            // set dashboard content index to beginning or end of array index
            widgetContents.currentIndex = widgetContents.currentIndex >= widgetContents.widgetData.length ? 0 : widgetContents.currentIndex < 0 ? (widgetContents.widgetData.length - 1) : widgetContents.currentIndex;
            formatData();
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
            carousel: carData,
        }
    }();
}());
