(function () {
    // Declare global windows variable to keep track of kbb and it's product
    if (!window.kbbproduct) {
        window.kbbproduct = {};
    }

    if (!window.kbbproduct['trending']) {
        window.kbbproduct['trending'] = [];
    }

    // set necessary variables
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var embedUrl = 'trending';
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
    var cssFile = require('../css/trending.css');
    var htmlFile = require('../html/trending.html');
    var fallbackImage = protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg";

    // include global class from GLOBALS DIRECTORY
    var createWidget = require('../../globals/es5/create_widget.js');

    // Create Dashboard Widget
    var createdTrending = new createWidget('trending', htmlFile, cssFile);
    createdTrending.fallbackImage = fallbackImage;
    var kbbproduct = createdTrending.getData();

    //Before inserting widget declare basic of widget number and declare classes
    var trendEl = createdTrending.widgetEl;
    var trendNum = document.getElementsByTagName("trending").length;
    trendEl.id = trendNum; // Always start at 0

    // insert widget once basic info of widget has been declared
    createdTrending.insertStyle(document.head);
    createdTrending.insertWidget(currentScript.parentNode);

    trending = function () {
        var widgetCount = trendEl.id;
        var trendingScript = currentScript;

        // when creating widget Set default values of current widget dashboard
        var widgetDefaults = {
            widgetNum: widgetCount,
            widget: trendEl,
            widgetData: {},
            retryCount: 0,
            selectedTab: null,
            query: null,
            currentCategory: null,
            apiUrl: null
        };

        // push current widget into array of trending to keep each widget seperated
        window.kbbproduct['trending'].push(widgetDefaults);
        var trendingContents = window.kbbproduct['trending'][widgetCount];
        trendingContents.apiUrl = protocolToUse + "dev-article-search.synapsys.us/api/search";


        // set div element to '$' variable
        var $ = function (e) {
            return trendingContents['widget'].getElementsByClassName(e)[0]
        };


        try {
            var srcQuery = trendingScript.src.split('js?')[1];
            trendingContents.query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
            trendingContents.currentCategory = trendingContents.query.category;
        } catch (e) {
            // TODO: Default values go here in case of errors
            trendingContents.currentCategory = "latest";
            trendingContents.query = {};
        }

        //Resets index count to 0 when swapping lists
        function reset() {
            trendingContents.currentIndex = 0;
            httpGetData();
        }

        function httpGetData() {
            // set api category here by using FQDN (apiUrl) + current category selected;
            var apiUrl = trendingContents.apiUrl + "?article_type=" + trendingContents.currentCategory + "&publisher=kbb.com&category=automotive&count=10";

            var storage = createdTrending.getData();
            if (!storage.transformData[trendingContents.apiUrl]) {
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
                            if (trendingContents.retryCount++ > 5) {
                                throw msg
                            }
                            setTimeout(reset, 500)
                        }
                    }
                };

                xHttp.open('GET', encodeURI(apiUrl), true);
                xHttp.send();
            } else {
                trendingContents.widgetData = storage.transformData[apiUrl];
                formatCarData();
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
            var storage = createdTrending.getData();
            var rawData = raw.hits.hits;
            var transformedData = [];
            rawData.forEach(function (data) {
                var source = data._source;
                var teaser = source.raw_article_content.length > 500 ? source.raw_article_content.substr(0, 500) : source.raw_article_content;
                transformedData.push({
                    'title': source.title,
                    'teaser': teaser,
                    'image': source.primary_image.image_source_url,
                    'url': source.article_url,
                    'published_date': source.publication_date
                });
            });
            storage.transformData[urlApi] = transformedData;
            createdTrending.saveData(storage);
            trendingContents.widgetData = transformedData;
            formatCarData();
        }

        /**
         * @function formatCarData
         * Format data accordingly to specs before displaying for top articles
         **/
        function formatCarData() {
            if (trendingContents.widgetData.length > 1) {
                var dataArr = trendingContents.widgetData.length > 5 ? trendingContents.widgetData.splice(0, 5) : trendingContents.widgetData;

                dataArr.forEach(function (val, index) {
                    var artDetails = document.createElement('div');
                    artDetails.className = 'dw-trend-arList';

                    var parent = $('artMain');
                    var postedDate = val['published_date'] ? "Posted On " + toTitleCase(formattedDate(val['published_date'] * 1000)) : "";
                    var artUrl = val.url;
                    artDetails.innerHTML = '<div class="dw-trend-row"><div class="trending-sixteen-nine"><img class="dw-trend-img" /></div><div class="dw-trend-ar"><a class="dw-trend-ar-title" href="' + val.url + '">' + val.title + '</a><div class="dw-trend-ar-posted">' + postedDate + '</div><div class="dw-trend-ar-teaser">' + val.teaser + '</div></div></div><div class="dw-trend-btn"><a class="dw-trend-ar-btn" href="' + val.url + '">Read the Story</a></div>';
                    parent.appendChild(artDetails);

                    // determine current title height to increase truncated text to keep text height
                    var title = artDetails.getElementsByClassName('dw-trend-ar-title')[0];
                    createdTrending.truncateText(title, 2);

                    // once truncated to atleast 2 lines determine to increase or decrease teaser text
                    var titleHeight = artDetails.getElementsByClassName('dw-trend-ar-title')[0].offsetHeight;
                    var titleLength = parseInt(getComputedStyle(artDetails.getElementsByClassName('dw-trend-ar-title')[0], null).getPropertyValue("line-height"));

                    var teaserHeight = Math.round(titleHeight / titleLength) % 2;

                    // add title from item that is now in the dom and truncate text
                    var teaserText = artDetails.getElementsByClassName("dw-trend-ar-teaser")[0];

                    createdTrending.truncateText(teaserText, 4 + teaserHeight);

                    var artImg = createdTrending.setImage(val.image);

                    artDetails.getElementsByClassName('dw-trend-img')[0].setAttribute('src', artImg);
                    artDetails.getElementsByClassName('dw-trend-img')[0].setAttribute('onerror', "this.src='" + createdTrending.fallbackImage + "'");
                });
            }

        } // END OF FUNC


        reset();
        return {
            reset: reset
        }

        /**
         * @function formattedDate
         * Format from epoch date to human readable format, example: Tuesday, Mar. 21, 2017
         */
        function formattedDate(eDate) {
            var date = eDate ? new Date(eDate) : new Date();
            var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            var month = date.getMonth();
            var day = date.getDate();
            var dayofWeek = date.getDay();
            var year = date.getFullYear();

            var formattedDate = days[dayofWeek] + ", " + monthNames[month] + ". " + day + ", " + year;
            return formattedDate;
        }


        /**
         * @function toTitleCase
         * Transform string to title case
         */
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }();
}())
