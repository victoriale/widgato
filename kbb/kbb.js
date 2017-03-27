//establish environment variables for the ad-stack based on which widget is being called
var hostname = window.top.location.hostname;

//Identifier for snt container when script has first loaded
var snt_id = "snt_container";
var widget_id = "widget";
var snt_widget_type1 = "//w1.synapsys.us/embeds/football_pro/dynamic_300x600/nfl.js";

var snt_widget_array = [];
var snt_widget_count = 1; //


//Waits for the DOMContent to load so we know where to append the widget
document.addEventListener("DOMContentLoaded", function(event){
  console.log(hostname);
  //declare initial snt container
  var snt_container = document.createElement("div");
  snt_container.setAttribute("id", snt_id);
  document.body.appendChild(snt_container);

  var snt_id_container = document.getElementById(snt_id);

  window.onscroll = function() {sntListener()};
  // snt_id_container.addEventListener("onscroll", sntListener);

  /*<---------------------------------------------------------------------------------------------------------->*/

  //setup create new element node function
  var createNode = function(attribute, attributeName, widgetType){
    var snt_widget = document.createElement("div");
    snt_widget.setAttribute(attribute, attributeName);

    //create iframe widget and append to end of snt_id_container
    var newFrame = createIframeWidget(widgetType);
    snt_widget.appendChild(newFrame);

    snt_id_container.appendChild(snt_widget);
    return;
  }

  /*<---------------------------------------------------------------------------------------------------------->*/

  //setup the onscroll function to listen to created snt identified container
  function sntListener() {
    var body = document.body,
        html = document.documentElement;
    var bodyHeight = Math.max( body.scrollHeight, body.offsetHeight,
                     html.clientHeight, html.scrollHeight, html.offsetHeight );

    var sntClientRect = snt_id_container.getBoundingClientRect();
    var heightListener = (sntClientRect.height * .80); // listen for 80% of height of snt_id_container content
    var widgetId = widget_id+snt_widget_count;

    //test of 80% of snt_id_container is visible then call
    if(sntClientRect.top <= heightListener || snt_widget_array.length == 0){
      // console.log(widgetId,snt_widget_array.indexOf(widgetId));
      if(snt_widget_array.indexOf(widgetId) <= -1){
        console.log('Limit Reach Call next Widget',sntClientRect.top);
        // createNode("id", widgetId, snt_widget_type1);

        snt_widget_array.push(widgetId);
        // snt_widget_count++;
        return;
      }
    }
  };


  console.log("WIDGET CREATE");
});

//create iframe script to be tossed into snt_id_container
function createIframeWidget(widgetType)
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = widgetType;
  return script;
};
