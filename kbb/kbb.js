//establish environment variables for the ad-stack based on which widget is being called
var hostname = window.top.location.hostname;

//Identifier for snt container when script has first loaded
var snt_id = "snt_container";
var widget_id = "widget";
var snt_widget_type1 = "//w1.synapsys.us/embeds/football_pro/dynamic_300x600/nfl.js";

var valid_widget_identifiers = []; // store all valid widget identifers in this array so that it cannot be called again
var snt_widget_count = 1; // counter for amount of widgets showing on page

var intervalFailSafe = 0;


//Waits for the DOMContent to load so we know where to append the widget
document.addEventListener("DOMContentLoaded", function(event) {
    console.log(hostname);
    //declare initial snt container
    var snt_container = document.createElement("div");
    snt_container.setAttribute("id", snt_id);
    document.body.appendChild(snt_container);

    var snt_id_container = document.getElementById(snt_id);

    window.onscroll = function() {
        sntListener()
    };
    // snt_id_container.addEventListener("onscroll", sntListener);

    /*<---------------------------------------------------------------------------------------------------------->*/

    //setup create new element node function
    var createNode = function(attribute, attributeName, widgetType) {
        var snt_widget = document.createElement("div");
        snt_widget.setAttribute(attribute, attributeName);

        //create iframe widget and append to end of snt_id_container
        var script = createIframeWidget(widgetType);
        snt_widget.appendChild(script);

        //and script to end of snt_id_container container
        snt_id_container.appendChild(snt_widget);
        return;
    }

    /*<---------------------------------------------------------------------------------------------------------->*/

    //setup the onscroll function to listen to created snt identified container
    function sntListener() {
        var maxScrollPercent = 80;
        var body = document.body,
            html = document.documentElement;

        // for used to allow ie9 && other browsers to grab the proper height, client height and scrollTop
        var bodyHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
            windHeight = window.innerHeight || (document.documentElement || document.body).clientHeight,
            scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop,
            trackLength = bodyHeight - windHeight;

        // will return the percent of the scrolled height on client
        var heightListener = Math.floor((scrollTop / trackLength) * 100);

        //create widget identifier based on the amount of widgets that are on the page
        var widgetId = widget_id + snt_widget_count;

        //if 80% of snt_id_container is visible then call next widget unless it is the first call then index it
        if (heightListener >= maxScrollPercent || valid_widget_identifiers.length == 0) {
            if (valid_widget_identifiers.indexOf(widgetId) == -1) {
                valid_widget_identifiers.push(widgetId);

                //functions to create the node script with an identifier then wait for the widget with a unique identifier to show that it has loaded to allow the next set of widgets to be called.
                createNode("id", widgetId, snt_widget_type1);
                waitForElementToDisplay(widgetId, "id[igloo_id]", 500);
            }
        }
    };
});

//create iframe script to be tossed into snt_id_container
function createIframeWidget(widgetType) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = widgetType;
    return script;
};

//recursive function that will keep calling itself until something is found
function waitForElementToDisplay(identifier, selector, time) {
    if (document.getElementById(identifier)) {
        if (document.getElementById(identifier).querySelector(selector) != null) {
            snt_widget_count++; //global count that attaches to widgetID;
            intervalFailSafe = 0;
            return;
        } else {
            console.log(intervalFailSafe);
            if (intervalFailSafe < 10) {
                var snt_frame_element = setTimeout(function() {
                    intervalFailSafe++;
                    waitForElementToDisplay(identifier, selector, time);
                }, time);
            } else {
                console.warn('query selector cannot find ' + selector + ' within element with id of ' + identifier + '! Time:' + (time * intervalFailSafe) / 1000 + 'secs');
                intervalFailSafe = 0;
                clearTimeout(snt_frame_element);
            }
        }
    } else {
        console.warn('warning no id of ' + identifier + 'is found!');
    }
}
