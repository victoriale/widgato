slider = function () {
    var htmlFile = '<!doctype html><html lang=\'en\'><head><title>Slider</title><meta charset=\'utf-8\'><base target=\'_blank\'><meta name=\'viewport\' content=\'width=device-width,initial-scale=1\'></head><body><script type=\'text/javascript\' src=\'main.import.js\'></script></body></html>';
    var cssFile = '@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(http://fonts.gstatic.com/s/lato/v13/8qcEw_nrk_5HEcCpYdJu8BTbgVql8nDJpwnrE27mub0.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(http://fonts.gstatic.com/s/lato/v13/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(http://fonts.gstatic.com/s/lato/v13/rZPI2gHXi8zxUjnybc2ZQFKPGs1ZzpMvnHX-7fPOuAc.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(http://fonts.gstatic.com/s/lato/v13/MgNNr5y1C_tIEuLEmicLmwLUuEpTyoUstqEm5AMlJo4.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}body{border:none;margin:0;padding:0;-webkit-overflow-scrolling:touch;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none}img{-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;user-drag:none}.icon{background-position:50%;background-repeat:no-repeat;height:39px;width:26px}.wrapper{position:absolute;overflow:hidden;width:300px;height:250px;background-color:#f7f7f7;border:1px solid #e1e1e1;box-sizing:border-box}.edge_shader{position:absolute;right:-5px;top:0;width:3px;height:100%;box-shadow:-5px 0 10px rgba(0,0,0,.8);z-index:999;transition:opacity .2s ease-in-out}.title_overlay{position:relative;display:inline-block;width:230px;height:230px;border-radius:3px;margin-right:16px}.title_image_div{width:230px;height:230px;display:block;overflow:hidden;position:absolute;border-radius:2px;background-size:1000% 1000%;image-rendering:optimizeSpeed;image-rendering:-moz-crisp-edges;image-rendering:-o-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:optimize-contrast;-ms-interpolation-mode:nearest-neighbor}.title_image_div.overlay::before{content:"";height:100%;width:100%;top:0;left:0;position:absolute;opacity:.9}.title_image{width:230px;height:230px;background-size:contain}.title{position:absolute;top:0;right:0;left:0;width:200px;height:96px;white-space:normal;padding:15px 15px;font-family:lato,helvetica;font-weight:900;color:#fff;font-size:20px;transition:opacity .2s ease-in-out;z-index:9}.instructions_container{position:absolute;font-family:lato,helvetica;font-size:14px;font-weight:700;font-style:italic;line-height:1.14;text-align:left;color:#fff;left:30px;bottom:0}.instructions_icon{position:relative;width:25px;height:31px}.instructions_text{width:150px;opacity:.7;position:relative;left:34px;top:-26px;white-space:normal;text-transform:uppercase}.pointer{pointer-events:none;position:absolute;box-sizing:border-box;width:56px;right:0;top:50%;transform:translateY(-50%);padding:10.5px 5px 10.5px 10px;font-family:lato,helvetica;font-size:20px;color:#fff;fill:#fff;border-top-left-radius:15px;border-bottom-left-radius:15px;overflow:hidden;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background-color:rgba(0,0,0,.8);box-shadow:0 2px 2px 0 rgba(0,0,0,.26),0 0 0 1px rgba(0,0,0,.09);opacity:1;transition:opacity .2s ease-in-out;z-index:100}.pointer .icon{animation:swipe .75s infinite}@keyframes swipe{0%{-webkit-transform:translateX(12px);-moz-transform:translateX(12px);-ms-transform:translateX(12px);-o-transform:translateX(12px);transform:translateX(12px);opacity:1}50%{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform:translateX(12px);-moz-transform:translateX(12px);-ms-transform:translateX(12px);-o-transform:translateX(12px);transform:translateX(12px);opacity:1}}.slider{position:absolute;width:300px;height:250px;overflow-x:hidden;overflow-y:hidden;white-space:nowrap;background-color:#f7f7f7;cursor:move;-ms-overflow-style:none}.slider.stopAnim{transform:translateX(36px);-webkit-animation:.5s;animation:.5s}.slider_block{position:relative;display:inline-block;height:230px;width:230px;margin-right:16px;left:10px;top:10px}.slider_block:last-of-type{margin:0;padding:0}.list_item{overflow:hidden;position:relative;display:inline-block;height:230px;width:230px;background-color:#fff;border-radius:3px}.ad_spacer{width:296px;height:100%}.slider_block:nth-of-type(3n+5){margin-left:2px}.ad_item{position:absolute;height:100%;top:0;z-index:99}.profile_image_div{width:228px;height:150px;display:block;overflow:hidden;position:absolute;border-radius:2px;background-size:1000% 1000%;image-rendering:optimizeSpeed;image-rendering:-moz-crisp-edges;image-rendering:-o-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:optimize-contrast;-ms-interpolation-mode:nearest-neighbor}.profile_image_div.fallback::before{content:"";height:100%;width:100%;top:0;left:0;position:absolute;z-index:99;opacity:.6}.profile_image{position:absolute;width:100%;top:50%;transform:translateY(-50%)}.num{font-family:lato,helvetica;position:absolute;right:-5px;top:-20px;width:0;height:0;border-top:30px solid transparent;border-bottom:30px solid transparent;border-left:30px solid #000;transform:rotate(-45deg);z-index:100}.num_text{font-size:10px;color:#fff;width:20px;top:-9px;right:8px;text-align:center;font-weight:300;position:absolute;transform:rotate(45deg)}.num_text b{position:relative;top:2px;font-size:12px;font-weight:900}.info{width:228px;position:absolute;top:160px;font-family:lato,helvetica;text-align:center}.name{font-size:14px;max-width:95%;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;white-space:normal;overflow:hidden;text-overflow:ellipsis;padding:0 5px}.location,.symbl{font-size:12px;color:#bebebe;max-width:95%;padding:0 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.location{margin-bottom:5px;max-width:95%;padding:0 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.value{font-size:20px;color:#272727;font-weight:900;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;white-space:normal;overflow:hidden;text-overflow:ellipsis;padding:0 5px}.stat_type{font-size:12px;color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 5px}.next_list{font-family:lato,helvetica;font-size:12px;position:relative;top:-96px;width:56px;margin:0 5px 0 0;padding:80px 10px 88px 10px;text-align:center;color:#fff}.next_arrow{font-size:30px;margin-bottom:5px}';
    //grab the current script dom element
    var embedURL = "main.import.js";
    var currentScript = document.currentScript != null && document.currentScript.src.indexOf(embedURL) != -1 ? document.currentScript : (function () { // resolution for IE since it does not have currentScript to find the currently running script on the page
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src.indexOf(embedURL) != -1) {
                return scripts[i];
            }
        }
    })();

    var friendlyIframeWindow;
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var widthBreakpoint = 649; // in pixels
    var wideWidget = false; // flag that changes certain functions to run differently (default = false)
    var windowWidth;
    var apiCallUrl; // this is global call that is used for api calls
    var imageUrl = "images.synapsys.us"; // this is global call that is used for images
    var dwApi = "dw.synapsys.us/list_api.php"; // dynamic widget api
    var tdlApi = "touchdownloyal-api.synapsys.us/list/"; // used for nfl and ncaaf category
    var fallBackApi; // used for nfl and ncaaf category
    var currentIndex = 0; // current index of an array which (default = 0)
    var maxIndex = 1; //declare max index of returned data (default = 1)
    var widgetData; // api returns is sent here
    var tries = 0; // flag for api to try atleast 10 times before failing completely
    var maxTries = 5;
    var listRand = Math.floor((Math.random() * 100) + 1); // used to increment index of random list in database
    var subCategory; // with a vast amount groups and categories need we need the currently shown category for the rest of the code
    var friendlyIframe;
    var getlocation;
    var query = {};
    var showCover;
    var $;
    var hostname;//host name is obtained by the given url of the script source
    var countSelf = document.getElementsByClassName("sliderIframe");
    var svgIcon = "<svg version='1.1' x='0px' y='0px' width='26' height='39' viewBox='0 0 26 39' opacity='1' " +
    "xml:space='preserve'><g  fill='#FFF' fill-rule='evenodd'><path d='M10.677 8c-1.773 0-3.226 1.47-3.226 3.263v11.23c-.499-1.091-1.395-2.272-2.52-2.562-1.53-.42-3.403.817-3.83 2.256-.218.801-.076 1.714.353 2.83 2.094 5.095 4.674 9.988 7.812 13.703.15.175.376.278.605.28h10.887a.804.804 0 0 0 .478-.166c1.161-.87 2.097-2.351 2.873-4.117a23.622 23.622 0 0 0 1.676-5.812c.306-1.998.304-3.87-.126-5.532-.414-1.603-1.532-2.938-3.2-3.136a5.235 5.235 0 0 0-1.16.115c-.206-.5-.496-.928-.857-1.186a2.85 2.85 0 0 0-1.713-.56c-.477.007-.912.183-1.298.458-.173-.267-.351-.546-.58-.713a2.904 2.904 0 0 0-1.739-.561c-.417 0-.822.118-1.21.28v-6.807C13.869 9.08 12.168 7.995 10.678 8zm0 1.632c.907 0 1.613.713 1.613 1.631v8.566c-.005.37.27.725.625.808a.83.83 0 0 0 .912-.451c.178-.375.85-.765 1.286-.765.195 0 .559.083.793.255.235.172.416.374.416.969 0 .363.27.707.62.792a.827.827 0 0 0 .905-.423c.327-.662.504-.77.907-.777.112-.002.503.073.756.255.254.181.441.39.441.969a.835.835 0 0 0 .485.755.818.818 0 0 0 .876-.156c.306-.153.606-.2.995-.192.961.125 1.46.733 1.802 1.95.345 1.23.358 2.985.076 4.832s-.838 3.787-1.55 5.404c-.668 1.517-1.484 2.703-2.205 3.315H10.26c-2.83-3.378-5.533-8.566-7.296-12.938-.367-.955-.4-1.505-.315-1.81.3-.79 1.136-1.235 1.853-1.122.857.326 1.07.905 1.436 1.568l1.6 3.25a.828.828 0 0 0 .906.422.84.84 0 0 0 .62-.792V11.263c0-.917.705-1.631 1.612-1.631z'/>" +
    "<path d='M4.442 0a.803.803 0 0 0-.58.243L.227 3.923c-.177.165-.22.37-.227.576.006.224.06.403.227.575l3.635 3.681c.296.33.844.318 1.148.013.305-.305.308-.861 0-1.163L2.751 5.317H18.25l-2.26 2.288c-.307.302-.304.858 0 1.163.305.305.854.302 1.15-.013l3.634-3.68c.167-.173.22-.352.227-.576-.008-.206-.05-.41-.227-.575L17.138.243c-.301-.324-.844-.318-1.148-.013-.305.305-.308.861 0 1.163l2.259 2.288H2.75l2.26-2.288c.307-.302.304-.858 0-1.163A.788.788 0 0 0 4.441 0z'/></g></svg> ";
    countSelf = countSelf.length;

    function createFriendlyIframe() {
        //create friendly iframe to place ourselves inside
        friendlyIframe = document.createElement('iframe');

        // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
        friendlyIframe.className = "dwunlinkIframe"
        friendlyIframe.width = '300';
        friendlyIframe.height = 600 - 250; //250 is the add height
        friendlyIframe.scrolling = 'no';
        friendlyIframe.style.overflow = 'hidden';
        friendlyIframe.name = currentScript.src;
        friendlyIframe.style.border = 'none';

        currentScript.parentNode.insertBefore(friendlyIframe, currentScript);

        //after getting querystring from js or iframe search query set currentScript to black
        friendlyIframeWindow = friendlyIframe.contentWindow;

        //create inline html for friendlyIframe
        friendlyIframeWindow.document.open();
        friendlyIframeWindow.document.write(htmlFile);
        friendlyIframeWindow.document.close();

        //listen to when the iframe window content has returned and send in the srcQuery if there is one before it gets
        if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") { // if page is already loaded'
            setupIframe();
        } else { // elseonce page has finished loading, so as not to slowdown the page load at all
            friendlyIframeWindow.document.onreadystatechange = function() {
                if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") {
                    setupIframe();
                }
            }
        }
    }

    function setupIframe(){
        try{
            var srcQuery =  friendlyIframe.name.split("js?")[1];
            //determine if a query string is after the index.html location || if query is after a javascript location
            if (srcQuery != "" && srcQuery != null) {
                try {
                    query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
                } catch (e) {
                    console.log(e);
                }
            }else{
                query = JSON.parse(decodeURIComponent(document.location.search.substr(1)));
            }
        }catch(e){
            query = {};
        };

        //create inline style for friendlyIframe
        var style = friendlyIframeWindow.document.createElement("style");
        if (query.wide != null && query.wide != '') {
            friendlyIframe.width = friendlyIframe.parentNode.clientWidth - 300; //300 being the width
            // friendlyIframe.style.maxWidth = '992px';
            friendlyIframe.height = '250';

            //CREATE LISTENER FOR RESIZE
            window.addEventListener('resize', function() {
                //set iframe to width of parent node
                friendlyIframe.width = friendlyIframe.parentNode.clientWidth;
            }, true);

            style.appendChild(friendlyIframeWindow.document.createTextNode(cssWideFile));
            wideWidget = true; //set wide flag
        } else {
            style.appendChild(friendlyIframeWindow.document.createTextNode(cssFile));
        }

        //append the css file into iframe head
        friendlyIframeWindow.document.head.appendChild(style);

        //create variable to be used similar to jquery for id's
        $ = function(e) { // create a simple version for grabbing id's of elements
            return friendlyIframeWindow.document.getElementById(e)
        };

        /*****************************************************Start Function calls*****************************************/

        //after you get the query you set the environment
        //setupEnvironment(query);

        //THEN START UPDATING THE LISTS
        //updateList(0);

        // try {
        //     var baseEvent = query.event;
        //     baseEvent.event = "widget-interaction";
        //     var postObject = {
        //         snt_data: baseEvent,
        //         action: 'snt_tracker'
        //     };
        //     //create event listeners
        //     $("button_left").addEventListener("click", function() {
        //         updateIndex(-1);
        //         sendPostMessageToIgloo(postObject, 5);
        //     });
        //     $("button_right").addEventListener("click", function() {
        //         updateIndex(1);
        //         sendPostMessageToIgloo(postObject, 5);
        //     });
        //     $("button_atomic").addEventListener("click", function() {
        //         updateList(1);
        //         sendPostMessageToIgloo(postObject, 5);
        //     });
        // } catch (e) {
        //     console.log("Dynamic Widget: Not currently hosted inside igloo... disabling analytics");
        //     // just enable button click events
        //     $("button_left").addEventListener("click", function() {
        //         updateIndex(-1);
        //     });
        //     $("button_right").addEventListener("click", function() {
        //         updateIndex(1);
        //     });
        //     $("button_atomic").addEventListener("click", function() {
        //         updateList(1);
        //     });
        // }
    }


    if (window.frameElement) {
        // in frame
        var friendlyIframe = document.createElement('div');
        friendlyIframe.id = "friendlyIframe_" + countSelf;
        friendlyIframe.className = "sliderIframe";
        friendlyIframe.width = '300';
        friendlyIframe.height = '250';
        friendlyIframe.style.border = 'none';
        currentScript.parentNode.insertBefore(friendlyIframe, currentScript);
        var iframeContent = friendlyIframe;
        var doc = document;
    }
    else {
        // not in frame
        var friendlyIframe = document.createElement('iframe');
        //create friendly iframe to place ourselves inside
        friendlyIframe.id = "friendlyIframe_" + countSelf;
        friendlyIframe.className = "sliderIframe";
        friendlyIframe.width = '300';
        friendlyIframe.height = '250';
        friendlyIframe.src = 'about:blank';
        friendlyIframe.style.border = 'none';
        currentScript.parentNode.insertBefore(friendlyIframe, currentScript);
        var iframeContent = friendlyIframe.contentWindow;
        var doc = iframeContent.document;
    }

    //inject HTML and CSS structure
    var html = "<div class='wrapper'><div class='title' id='title_" + countSelf + "'></div>" +
        "<div class='pointer' id='pointer_" + countSelf + "'><div class='icon swipe_right'>" +
        svgIcon + "</div></div><div class='slider' id='slider_" + countSelf + "'></div></div>";
    if (window.frameElement) {
        // in frame
        iframeContent.innerHTML = html;
    }
    else {
        // not in frame
        doc.write(html);
    }
    var style = doc.createElement("style");
    style.appendChild(doc.createTextNode(cssFile));
    doc.head.appendChild(style);
    //begin slider logic
    //initial variable declaration
    var input = {dom: "chicagotribune.com", category: "nba", rand: "1", env: "prod-"};
    if (decodeURIComponent(location.search.substr(1)) != null && decodeURIComponent(location.search.substr(1)) != "") {
        try {
            input = JSON.parse(decodeURIComponent(location.search.substr(1)));
        }
        catch (e) {
            console.log("Page level query string JSON invalid. Falling back to embed query string");
            var queryString = currentScript.src.split(embedURL + "?")[1];
            if (queryString != "" && queryString != null) {
                try {
                    input = JSON.parse(decodeURI(queryString));
                }
                catch (e) {
                    console.log("Embed level query string JSON invalid");
                    console.log(e);
                }
            }
        }
    }
    else {
        var queryString = currentScript.src.split(embedURL + "?")[1];
        if (queryString != "" && queryString != null) {
            try {
                input = JSON.parse(decodeURI(queryString));
            }
            catch (e) {
                console.log("Embed level query string JSON invalid");
                console.log(e);
            }
        }
    }
    if (input.env != "prod-" && input.env != "dev-") {
        input.env = "prod-";
    }
    var categories = ['finance', 'nba', 'college_basketball', 'weather', 'crime', 'demographics', 'politics', 'disaster', 'mlb', 'nfl', 'ncaaf', 'nflncaaf', 'celebrities', 'music']; // an array of all the possible categories this widget accepts and is limited to. if you specify one not in here, it will fallback to finance
    var apiUrl = protocolToUse + input.env.replace("prod-", "") + 'dw.synapsys.us/list_api.php';
    var title;
    var pointer = doc.getElementById('pointer_' + countSelf); // the swipe indicator
    var slider = doc.getElementById('slider_' + countSelf); // the container for all the blocks that the user can scroll in
    var sliderBlocks = slider.getElementsByClassName('slider_block'); // an array of all the blocks in our slider
    var currentBlock = 0; // what block are we snapped to right now?
    var isScrolling = false; // are we scrolling at all? (both autoscroll and user scroll)
    var scrollingTimout; // the user scroll setTimout reference name
    var scrollTo = 0; // the destination pixel value to interpolate our autoscroll to
    var scrollIncrements = 0; // how much to increase the scroll by in this interpolation loop?
    var rand; // list random ID
    var setSmoothScrollInterval; // the autoscroll setInterval reference name
    var n = 0;
    var userScrolling = true; // is the user currently scrolling an not the JS autoscrolling?
    var userScroll = true;
    var firstAd; // the div for the actual igloo stack to live in, that gets moved around as you scroll
    var currentPub; // the current color scheme and fallback imageset to use
    var lazyLoaded = false; // are the images after the first one loaded in yet?
    var pastBeginning = false; // are we on the first pixel of the first item or not
    var currentListId = ""; // an ID to send to yeti for the current list

    if (typeof input.group == 'undefined' && (typeof input.category == 'undefined' || categories.indexOf(input.category) == -1)) {
        input.category = 'finance'; //default category fallback
    }
    friendlyIframe.classList.add("slider_" + input.category);
    function getPublisher(pub) {
        var pubs = {
            mlb: {
                hex: "#bc2027",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/baseball_stock.jpg"
            },
            nfl: {
                hex: "#004e87",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/07/football_stock_01_970x250.jpg"
            },
            ncaaf: {
                hex: "#004e87",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/07/football_stock_01_970x250.jpg"
            },
            nba: {
                hex: "#f26f26",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"
            },
            college_basketball: {
                hex: "#f26f26",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"
            },
            finance: {
                hex: "#3098ff",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/finance_stock.jpg"
            },
            weather: {
                hex: "#43B149",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/weather_stock.jpg"
            },
            crime: {
                hex: "#43B149",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
            },
            demographics: {
                hex: "#43B149",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
            },
            politics: {
                hex: "#43B149",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
            },
            disaster: {
                hex: "#43B149",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
            },
            celebrities: {
                hex: "#6459d3",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/04/actor.jpg"
            },
            music: {
                hex: "#6459d3",
                fallbackImage: "images.synapsys.us/01/fallback/stock/2017/04/musician.jpg"
            }
        };
        if (pub == null || pub == "" || !pubs[pub]) {
            return pubs["finance"];
        }
        else {
            return pubs[pub];
        }
    }

    function loadData() {
        //rand is a random value (1-50) that coresponds to a specific list for a given category (does not apply to football)
        var e = rand;
        while (e == rand) {
            e = Math.floor(Math.random() * 50);
            if (e == 0) {
                e = 1;
            }
        }
        rand = e;
        var i;
        if (window.XMLHttpRequest) {
            i = new XMLHttpRequest
        } else {
            i = new ActiveXObject('Microsoft.XMLHTTP')
        }
        i.onreadystatechange = function () {
            if (i.readyState == XMLHttpRequest.DONE) {
                if (i.status == 200) {
                    //fire this, when either the TDL api or the standard API comes back
                    var r = JSON.parse(i.responseText);
                    populateslider(r);
                } else {
                    var e = i.statusText;
                    if (i.status == 500) {
                        try {
                            e = JSON.parse(i.responseText).message;
                        } catch (t) {
                            console.log('No JSON message')
                        }
                    }
                    e = 'HTTP Error (' + i.status + '): ' + e;
                    if (n++ > 10) {
                        throw e
                    }
                }
            }
        };
        rand = e;
        // checks if a single category is request instead of group
        if (input.category != null && input.category != "") { //category param
            currentPub = getPublisher(input.category);
            if (input.category == 'weather' || input.group == 'weather') {
                var inputType = input.group != null && input.group != '' ? 'group' : 'cat';
                var inputCategory = input.group != null && input.group != '' ? input.group : input.category;
                i.open('GET', apiUrl + '?' + inputType + '=' + inputCategory + '&rand=' + e + '');
                i.send()
            } else { //normal, non TDL api query
                i.open('GET', apiUrl + '?partner=' + (typeof input.dom != 'undefined' ? input.dom : '') + '&cat=' + input.category + '&rand=' + e, true);
                i.send()
            }
        }
        else { //group param
            if (input.category == 'weather' || input.group == 'weather') {
                var inputType = input.group != null && input.group != '' ? 'group' : 'cat';
                var inputCategory = input.group != null && input.group != '' ? input.group : input.category;
                i.open('GET', apiUrl + '?' + inputType + '=' + inputCategory + '&rand=' + e + '');
                i.send()
            } else {
                i.open('GET', apiUrl + '?partner=' + (typeof input.dom != 'undefined' ? input.dom : '') + '&group=' + input.group + '&rand=' + e, true);
                i.send()
            }
        }
    }

    loadData();

    function populateslider(data) {
        if ((input.category == null || input.category == "") && input.group != null && input.group != "") {
            currentPub = getPublisher(data.category);
        }
        // if using new api on certain categories then use new format
        if (input.group == "entertainment" || data.category == "celebrities" || input.group == "weather" || data.category == "weather" || data.category == "music" || data.category == "nfl" || data.category == "ncaaf" || data.category == "football") {
            var items = [];
            for (var i = 0; i < data.l_data.length; i++) {
                if (data.l_data[i].data_point_2 == null) {
                    data.l_data[i].data_point_2 = "";
                }
                if (data.l_data[i].data_value_2 == null) {
                    data.l_data[i].data_value_2 = "";
                }
                items.push(
                    {
                        li_img: data.l_data[i].li_img,
                        li_value: data.l_data[i].data_value_2,
                        li_tag: data.l_data[i].data_point_2,
                        li_title: data.l_data[i].li_title,
                        li_sub_txt: data.l_data[i].li_sub_txt,
                        li_rank: data.l_data[i].li_rank
                    }
                );
            }
        }
        else { //non TDL data
            var items = data.l_data;
        }
        var randomNumber = Math.floor(Math.random() * (items.length - 0 + 1)) + 0;
        var randomImage = items[randomNumber].li_img;
        if (randomImage == null ||
            randomImage == "" ||
            randomImage.indexOf("no_") != -1 ||
            randomImage.indexOf("no-") != -1 ||
            randomImage.indexOf("actor.jpg") != -1 ||
            randomImage.indexOf('fallback') != -1
        ) {
            var randomImageStyle = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
            if (data.category != "music") {
                randomImage = protocolToUse + currentPub.fallbackImage;
            }
        }
        items = items.slice(0, 25);
        items = items.reverse();
        //1st item before the ad
        if (items[0].li_value) {
            items[0].li_value = items[0].li_value.replace(items[0].li_tag, "");
        }
        var image = items[0].li_img.replace("'", "");
        if (image == null ||
            image == "" ||
            image.indexOf("no_") != -1 ||
            image.indexOf("no-") != -1 ||
            image.indexOf("actor.jpg") != -1 ||
            image.indexOf('fallback') != -1
        ) {
            var style = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
            var image_class = "fallback";
            if (data.category != "music") {
                image = protocolToUse + currentPub.fallbackImage;
            }
        }
        else {
            var style = "";
            var image_class = "";
            if (input.group == "weather" || data.category == "weather") {
                var image_class = "fallback";
                style = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
            }
        }
        if (input.group == "entertainment" || data.category == "celebrities" || data.category == "music") {
            style = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
        } else {
        }
        if (input.category == "finance" || input.group == "money") {
            backStyle = "style='background-image:url('" + image + "?width=200" + "')";
        }
        else {
            backStyle = "style='background-color: black;'";
        }
        title = data.l_alt_title != null && data.l_alt_title != '' ? data.l_alt_title : data.l_title;// used due to the fact slider is not wide enought to have more than 50 characters for title

        slider.innerHTML = "<style>.profile_image_div.fallback::before{background-color: " + currentPub.hex + ";}" +
            ".title_image_div.overlay::before{background-color: " + currentPub.hex + ";}" +
            "</style><div class='slider_block'><div class='title_overlay' style='background-color: " + currentPub.hex + "'>" +
            "<div class='title_image_div overlay'><img class='title_image' src=" + randomImage + "?width=200" + "/></div>" +
            "<div class='title'>" + title + "</div><div class='instructions_container'><div class='instructions_icon'>" + svgIcon + "</div>" +
            "<div class='instructions_text'>Swipe to progress through the list</div></div></div>" +
            "<div class='list_item'><div class='profile_image_div " + image_class + "' " + backStyle + ">" +
            "<div class='num' style='border-color:" + currentPub.hex + "'><div class='num_text'>#<b>" + items[0].li_rank + "</b></div></div>" +
            "<img class='profile_image' src=" + image + "?width=200" + " style='" + style + "'></div><div class='info'>" +
            "<div class='name'>" + items[0].li_title.replace('Corporation', 'Corp') + "</div><div class='value'>" + items[0].li_value + "" +
            "</div><div class='stat_type'>" + items[0].li_tag + "</div></div></div></div></div>";

        if (location.host.indexOf("synapsys.us") == -1 && location.host.indexOf("localhost") == -1 && location.host.indexOf("127.0.0.1") == -1) { //dont run igloo if not on real site
            if (friendlyIframe.parentElement.getElementsByClassName("widget_zone")[0]) { // if igloo v3 (igloo stack will load slider as a sibling dom element)
                console.log("slider detected igloo v3");
                setTimeout(function () {
                    firstAd = doc.getElementById('first_ad_' + countSelf);
                    //grab the sibling igloo element and inject it inside slider where we can control it
                    firstAd.appendChild(friendlyIframe.parentElement.getElementsByClassName("widget_zone")[0]);
                    firstAd.getElementsByClassName("widget_zone")[0].style.opacity = 1;
                }, 400);
            }
            else { // if igloo v2 (placement.js calls slider, which calls placement.js, which calls igloo)
                setTimeout(function () { //wait for dom to render before executing igloo script
                    //inject igloo into first_ad div
                    console.log("slider detected igloo v2");
                    firstAd = doc.getElementById('first_ad_' + countSelf);
                    var s = doc.createElement("script");
                    s.type = "text/javascript";
                    // if (input.group != null && input.group != "" && input.p != null && input.p != "") {
                    //   s.src = "//content.synapsys.us/embeds/placement.js?p=" + input.p + "&type=slider_" + input.group + "&style=inline&league=no_slider";
                    // }
                    // else {
                    s.src = "//content.synapsys.us/embeds/inline_300x250/partner.js";
                    // }
                    firstAd.appendChild(s);
                }, 400);
            }
        }
        else {
            setTimeout(function () {
                firstAd = doc.getElementById('first_ad_' + countSelf);
            }, 400);
        }

        var outputHTML = "";
        var maxOutput = 25;
        var backStyle;
        //every other item (except the first)
        for (var i = 1; i < items.length && i < maxOutput; i++) {
            if (items[i].li_value) {
                items[i].li_value = items[i].li_value.replace(items[i].li_tag, "");
            }
            image = items[i].li_img.replace("'", "");
            if (image == null || image == "" || image.indexOf("no_") != -1 || image.indexOf("no-") != -1 || image.indexOf("fallback") != -1) {
                var style = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
                var image_class = "fallback";
                if (data.category != "music") {
                    image = protocolToUse + currentPub.fallbackImage;
                }
            }
            else {
                var style = "";
                var image_class = "";
                if (input.group == "weather" || data.category == "weather") {
                    var image_class = "fallback";
                    style = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
                }
            }
            if (input.group == "entertainment" || data.category == "celebrities" || data.category == "music") {
                style = "width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
            }
            if (Math.abs(i % 2) == 1) { //every odd number
                outputHTML += "<div class='slider_block'>";
            }
            if (input.category == "finance" || input.group == "money") {
                backStyle = "style='background-image:url('" + image + "?width=200)";
            }
            else {
                backStyle = "style='background-color: black;'";
            }
            //"</div></div><div class='slider' id='slider_" + countSelf + "'></div></div>";
            //"</style><div class='slider_block'><div class='list_item'><div class='profile_image_div " + image_class + "' " + backStyle + ">" +
            outputHTML += "<div class='list_item'><div class='profile_image_div " + image_class + "' " + backStyle + ">" +
                "<div class='num' style='border-color:" + currentPub.hex + "'><div class='num_text'>#<b>" + items[i].li_rank + "</b></div></div>" +
                "<img class='profile_image' src=" + image + "?width=200" + " style='" + style + "'></div><div class='info'><div class='name'>" +
                items[i].li_title + "</div><div class='value'>" + items[i].li_value + "</div><div class='stat_type'>" +
                items[i].li_tag + "</div></div></div>";
            if (i % 2 == 0) { //end block div every even number
                outputHTML += "</div>";
            }
            if (i && (i % 4 === 0)) { //show ad every 4 items, the initial single igloo frame snaps into the ad_spacer on scroll
                outputHTML += "<div class='slider_block'><div class='ad_spacer'></div><div class='ad_item'></div></div>";
            }
            if (i == items.length - 1 || i == maxOutput - 1) { //fire when done iterating over all items
                outputHTML += "</div><div class='slider_block'><div class='next_list' style='background-color:" + currentPub.hex + ";'" +
                    "id='next_list'><div class='next_arrow'><svg width='17' height='30' viewBox='0 0 17 30'>" +
                    "<path fill='#FFF' fill-rule='nonzero' d='M16.89 14.463l-14.967 14.9s-.801.555-1.577-.218c-.778-.772 0-1.449 0-1.449L13.663 14.44.976 1.81s-.66-.791.05-1.496c.707-.706 1.696 0 1.696 0l14.168 14.15z'/> " +
                    "</svg></div>Next List</div></div>";
                slider.innerHTML += outputHTML; //write out the accumulated item's html

                clearInterval(loadedWait); // make sure we only have one instance of this timer running at a time
                var loadedWait = setInterval(function () {
                    if (doc.getElementById("next_list")) { // if all the dom elements for slider are existant
                        clearInterval(loadedWait); // stop ticking the timer - we have finished loading
                        if (input.event) { // if we are in igloo v3 or >
                            // send the list identifiers to yeti analytics
                            input.event.event = "widget-list";
                            currentListId = data.l_param + "," + data.l_sort + "," + data.l_input;
                            input.event.l = currentListId;
                            sendPostMessageToIgloo({action: 'snt_tracker', snt_data: input.event}, 10);
                        }
                        doc.getElementById("next_list").addEventListener("touchend", nextList);
                        doc.getElementById("next_list").addEventListener("click", nextList);
                        friendlyIframe.classList.add("widget_loaded"); //set loaded flag on bounding iframe
                    }
                    //else, if not loaded, keep ticking the timer
                }, 300);

            }
        }
    }

    function nextList(e) {
        // when next list is clicked, clear the slider and any scroll vars, then reload new data
        lazyLoaded = false;
        //take igloo out before we wipe the slider
        if (firstAd.getElementsByClassName("widget_zone")[0]) {
            firstAd.getElementsByClassName("widget_zone")[0].style.opacity = 0;
            friendlyIframe.parentElement.appendChild(firstAd.getElementsByClassName("widget_zone")[0]);
        }
        //wipe slider and reset everything
        slider.innerHTML = "";
        firstAd.style.left = "0px";
        slider.scrollLeft = 0;
        loadData();
    }

    //initial event listeners declaration

    // browser fallback for the passive event listener handler - a way to use non draw blocking event listeners
    var passiveSupported = false;
    try {
        var options = Object.defineProperty({}, "passive", {
            get: function () {
                passiveSupported = true;
            }
        });
        window.addEventListener("test", null, options);
    } catch (err) {
    }

    slider.addEventListener("scroll", onSwipe);
    function onSwipe() {
        if (userScrolling) { // only execute this code if the user is dragging the slider, not if we are autoscrolling
            if (isScrolling != true && input.event) { //limit event sending to 1 per user interaction, not every scroll tick
                // console.log("fired interaction event to igloo");
                input.event.event = "widget-interaction";
                input.event.l = currentListId;
                sendPostMessageToIgloo({action: 'snt_tracker', snt_data: input.event}, 10);
            }
            if (lazyLoaded == false) { //if this is the first user interaction with widget, load the rest of the images
                lazyLoaded = true;
                clearInterval(lazyLoader);
                var lazyLoader = setInterval(function () { // wait for dom loaded before grabbing array of images
                    if (slider.getElementsByClassName("profile_image")[0]) {
                        clearInterval(lazyLoader);
                        var notLoadedImages = slider.getElementsByClassName("profile_image");
                        for (var index = 1; index < notLoadedImages.length; index++) {
                            notLoadedImages[index].src = notLoadedImages[index].alt;
                        }
                    }
                }, 500);
            }
            isScrolling = true; //will return true or false based on whether the user is currently scrolling or not

            // set visibility of title and list title, based on scroll position
            if (this.scrollLeft > 20) { // scrolled past the first block
                if (pastBeginning == false) {
                    pointer.style.opacity = '0';
                    slider.classList.add("stopAnim");
                    pastBeginning = true;
                }
            }
            else { // currently on the first block
                slider.classList.remove("stopAnim");
                //title.style.opacity = '1';
                pointer.style.opacity = '1';
                pastBeginning = false;
            }
            var rect = firstAd.getBoundingClientRect();
            if (rect.left < -600 || rect.left > 600) { //logic to jump ad to next space when you scroll past it
                var left = slider.getElementsByClassName("ad_spacer")[Math.floor((this.scrollLeft + 450) / 900)].parentElement.offsetLeft + 150;
                firstAd.style.left = (left - firstAd.offsetWidth) + "px";
            }
            clearTimeout(scrollingTimout);
            scrollingTimout = setTimeout(function () { // wait till scroll is finished and set isScrolling flag as false
                if (userScroll == true) { // since the user has ended a series of scroll events, we can now start our autoscroll snap logic
                    setScroll();
                }
                slider.removeEventListener("mousemove", onMouseMove);
                isScrolling = false; //set false now since it has been 300ms since the last scroll event
            }, 300);
        }
    }

    slider.addEventListener("touchend", onFingerUp, passiveSupported ? {passive: true} : false);
    function onFingerUp(e) { //logic to determine if the user is currently actively scrolling
        if (isScrolling == false) {
            // setScroll();
        }
        else {
            var setScrollInterval = setInterval(function () {
                if (isScrolling == false) {
                    // setScroll();
                    clearTimeout(setScrollInterval);
                }
            }, 250);
        }
    }

    slider.addEventListener("touchstart", onFingerDown, passiveSupported ? {passive: true} : false);
    function onFingerDown(e) { //if another swipe interups our snap animation, stop the snap and allow the swipe
        userScrolling = true;
        userScroll = false;
        setTimeout(function () {
            userScroll = true;
        }, 500);
        clearInterval(setSmoothScrollInterval);
    }

    // logic to allow mouse drag scrolling on desktop browsers
    var initialMouseX;
    slider.addEventListener("mousedown", onMouseDown, passiveSupported ? {passive: true} : false);
    function onMouseDown(e) {
        initialMouseX = e.clientX;
        slider.addEventListener("mousemove", onMouseMove, passiveSupported ? {passive: true} : false);
    }

    function onMouseMove(e) {
        slider.scrollLeft = slider.scrollLeft + (initialMouseX - e.clientX);
        initialMouseX = e.clientX;
    }

    slider.addEventListener("mouseup", onMouseUp, passiveSupported ? {passive: true} : false);
    function onMouseUp(e) {
        slider.removeEventListener("mousemove", onMouseMove);
    }

    /**
     * Send a post message to every window up to the top window
     * @param  {Object}  postObject The object to send as a postMessage
     * @param  {Integer} maxLoops   The maximum number of layers to traverse up
     */
    function sendPostMessageToIgloo(postObject, maxLoops) {
        // Initialize variables
        var postWindows = [window];
        var currentWindow = window;
        var currentLoop = 0;
        maxLoops = typeof maxLoops === 'undefined' ? 10 : maxLoops;

        // Build all of the windows to send the message to
        try {
            // Loop through all of the windows
            while (currentLoop++ < maxLoops && currentWindow !== window.top) {
                // Move up a layer
                currentWindow = currentWindow.parent;

                // Add to the postMessage array
                postWindows.push(currentWindow);

            }
        } catch (e) {
        }
        // Send the post messages
        for (var i = 0; i < postWindows.length; i++) {
            postWindows[i].postMessage(postObject, '*');
        }
    }

    //logic to snap scrolled block into view, when user scroll has ended
    function setScroll() {
        var counter = 0;
        var sliderScroll = slider.scrollLeft;
        for (var i = 0; i < sliderBlocks.length; i++) {
            var currentBlock = sliderBlocks[i];
            if ((sliderScroll + 150) >= currentBlock.offsetLeft && (sliderScroll + 150) <= (currentBlock.offsetLeft + currentBlock.offsetWidth) && sliderScroll > 20) {
                //if user has swiped past the halfway mark on the next block, advance blocks to the one user has scrolled to. Otherwise, reset blocks back to starting point of swipe
                scrollTo = currentBlock.offsetLeft;
                if (sliderScroll < scrollTo) {
                    scrollIncrements = 10; //advance
                }
                else {
                    scrollIncrements = -10; //retreat
                }
                clearInterval(setSmoothScrollInterval);
                // var currentTime;
                // var prevTime = 0;

                // setSmoothScrollInterval = setInterval(autoScroll, 30);
                window.requestAnimationFrame(autoScroll);
                function autoScroll() {
                    // var date = new Date();
                    // currentTime = date.getTime();
                    // if (prevTime != 0) {
                    //   console.log("time between intervals: "+(currentTime - prevTime));
                    // }
                    // if (currentTime - prevTime > 50 && prevTime != 0) {
                    //   debugger;
                    // }
                    sliderScroll = slider.scrollLeft;
                    userScrolling = false;
                    var marginOfError = Math.abs(scrollIncrements) - 1;
                    if (sliderScroll < (scrollTo - marginOfError) || sliderScroll > (scrollTo + marginOfError)) { //if we still have autoscrolling to do...
                        //if within margin of error of target, end scroll
                        if (i == (sliderBlocks.length - 2) || counter > 30) { // stop our runnaway animation loop if we are over 30 frames so far, or we are at the last list item
                            userScrolling = true;
                            userScroll = false;
                            setTimeout(function () {
                                userScroll = true;
                            }, 500);
                            clearInterval(setSmoothScrollInterval); //we have reached the end of the list. stop the loop
                        }
                        else {
                            if (scrollIncrements > 0 && sliderScroll > scrollTo) { // we have overshot
                                scrollIncrements = -1;
                            }
                            else if (scrollIncrements < 0 && sliderScroll < scrollTo) { // we have overshot other side
                                scrollIncrements = 1;
                            }
                            counter++;
                            slider.scrollLeft = sliderScroll + scrollIncrements; //apply the interpolation step
                            if (userScrolling != true) {
                                window.requestAnimationFrame(autoScroll);
                            }
                        }
                    }
                    else if (sliderScroll < scrollTo || sliderScroll > scrollTo) {// if in the last frame of interpolation
                        if (i == (sliderBlocks.length - 2) || counter > 30) { // stop our runnaway animation loop if we are over 30 frames so far, or we are at the last list item
                            userScrolling = true;
                            userScroll = false;
                            setTimeout(function () {
                                userScroll = true;
                            }, 500);
                            clearInterval(setSmoothScrollInterval); //we have reached the end of the list. stop the loop
                        }
                        else {
                            if (scrollIncrements > 0 && sliderScroll > scrollTo) { // we have overshot
                                scrollIncrements = -1;
                            }
                            else if (scrollIncrements < 0 && sliderScroll < scrollTo) { // we have overshot other side
                                scrollIncrements = 1;
                            }
                            counter++; // incremenet our frame counter scoped to this animation sequence
                            slider.scrollLeft = sliderScroll + 1; //apply the interpolation step
                            if (userScrolling != true) {
                                window.requestAnimationFrame(autoScroll);
                            }
                        }
                    }
                    else { //we have reached the end of the interpolation. stop the loop
                        userScrolling = true;
                        userScroll = false;
                        setTimeout(function () {
                            userScroll = true;
                        }, 500);
                        clearInterval(setSmoothScrollInterval);
                    }
                    // date = new Date();
                    // prevTime = date.getTime();
                    // console.log("code execution time: " + (prevTime - currentTime));
                }

                currentBlock = i;
                if (sliderBlocks[i].getElementsByClassName("ad_item").length >= 1) { //hide title if ad is current item in view
                    //title.style.opacity = '0';
                    parent[input.pause_variable] = true; //unpause ad if its in view
                }
                else {
                    //title.style.opacity = '1';
                    parent[input.pause_variable] = false; //pause ad when its out of view
                }
                return;
            }

            else if (slider.scrollLeft < 20) { // special logic for when you scroll back to the first list item
                scrollTo = 0;
                if (slider.scrollLeft < scrollTo) {
                    scrollIncrements = 1;
                }
                else {
                    scrollIncrements = -1;
                }
                setSmoothScrollInterval = setInterval(function () {
                    sliderScroll = slider.scrollLeft;
                    userScrolling = false;
                    var marginOfError = 0;
                    if (slider.scrollLeft < (scrollTo - marginOfError) || slider.scrollLeft > (scrollTo + marginOfError)) {
                        if (i == (sliderBlocks.length - 1) || counter > 30) {
                            userScrolling = true;
                            userScroll = false;
                            setTimeout(function () {
                                userScroll = true;
                            }, 500);
                            clearInterval(setSmoothScrollInterval);
                        }
                        else {
                            slider.scrollLeft = slider.scrollLeft + scrollIncrements;
                        }
                    }
                    else {
                        userScrolling = true;
                        userScroll = false;
                        setTimeout(function () {
                            userScroll = true;
                        }, 500);
                        clearInterval(setSmoothScrollInterval);
                    }
                }, 15);
                currentBlock = 0;
                return;
            }
        }
        // if ((currentBlock + 1) <= sliderBlocks.length) {
        //   slider.scrollLeft = sliderBlocks[currentBlock + 1].offsetLeft - 5;
        //   currentBlock = (currentBlock + 1);
        // }
    }
};
if (document.readyState == "complete") { // if page is already loaded, fire slider
    createFriendlyIframe();
    slider();
}
else { // else fire slider once page has finished loading, so as not to slowdown the page load at all
    var initLoops = 0;
    var initDelay = setInterval(function () { // check page load status every half second
        if (document.readyState == "complete" || initLoops > 10) { // if document is finished loading, or 5 seconds has elapsed
            clearInterval(initDelay);
            slider();
        }
        else {
            initLoops++;
        }
    }, 500);
    // document.onreadystatechange = function () {
    //   if(document.readyState == "complete"){
    //     slider();
    //   }
    // }
}
