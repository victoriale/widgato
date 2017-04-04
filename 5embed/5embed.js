var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var temp = location.search;
var query = {};
var target;
var href = window.top.location;
var currentIndex = 0;
var maxIndex = 1;
var widgetData;
var tries = 0;
var categoryColors = {
  // Brand Color Palette
  'football'    : '#2d3e50',
  'basketball'  : '#f26f26',
  'baseball'    : '#bc2027',
  'finance'     : '#3098ff',
  'realestate'  : '#44b224',
  'lifestyle'   : '#65398e',
  'disaster'    : '#902d8e',
  'politics'    : '#ff0101',
  'crime'       : '#f6af05',
  'weather'     : '#ffdf30',
  'default'     : '#000000',
};

//Waits for the DOMContent to load
document.addEventListener("DOMContentLoaded", function(event) {
  /*
  create function to get API
  */
  var apiUrl = "http://dw.synapsys.us/list_api.php?partner=chicagotribune.com&cat=mlb&rand=9949894";

  setCategoryColors('lifestyle');

  var test = runAPI(apiUrl);
});

function setCategoryColors(category){
  let color;
  switch(category){
    case 'football':
    case 'nfl':
    case 'ncaaf':
      category = 'football';
    break;
    case 'basketball':
    case 'nba':
    case 'ncaam':
      category = 'basketball';
    break;
    case 'baseball':
    case 'mlb':
      category = 'baseball';
    break;
    default:
    break;
  }
  color =  categoryColors[category];

  function classLoop(cssName, style, styleColor){
    let classArray = document.getElementsByClassName(cssName);
    let styleSheets = getCssSelector("5embed");
    var attribute = findCss(cssName, styleSheets);
    styleSheets.deleteRule(attribute.index);

    //try catch statements are for ie compatibility
    switch(style){
      case 'color':
        try{
          styleSheets.insertRule( '.'+cssName+' { color: '+styleColor+'; }', 0 );
        }catch(e){
          styleSheets.addRule('.'+cssName, 'color: '+styleColor, 0);
        }
      break;
      case 'border-color':
      try{
        styleSheets.insertRule( '.'+cssName+' { border-color: '+styleColor+'; }', 0 );
      }catch(e){
        styleSheets.addRule('.'+cssName, 'border-color: '+styleColor, 0);
      }
      break;
      case 'background-color':
        try{
          styleSheets.insertRule( '.'+cssName+' { background-color: '+styleColor+'; }', 0 );
        }catch(e){
          styleSheets.addRule('.'+cssName, 'background-color: '+styleColor, 0);
        }
      break;
      default:
      break;
    }

  }

  function getCssSelector(title){
    let selector = document.styleSheets;
    for(var index = 0; index < selector.length; index++){
      if(selector[index].title == title){
        return selector[index];
      }
    }
  }

  function findCss(cssName, styleSheets){
    if(styleSheets.cssRules != null){
      for(var index = 0; index < styleSheets.cssRules.length; index++){
        if(styleSheets.cssRules[index].selectorText == "."+cssName){
          styleSheets.cssRules[index].index = index;
          return styleSheets.cssRules[index];
        }
      }
    }
  }

  classLoop('inheritor', 'color', color);
  classLoop('inheritor_border', 'border-color', color);
  classLoop('inheritor_bg:hover::before', 'background-color', color);

}

/**
* @function onLoad
* Once the DOM has loaded, Adds a function to the "onLoad" event OR runs the function if the page is
* already loaded
*
* @param function func - The function to run when the page has loaded
*/
function onLoad(func) {
  if ( document.readyState == "complete" || document.readyState == "interactive" ) {
    func();
  } else if ( document.addEventListener ) {
    document.addEventListener('DOMContentLoaded', func);
  } else if ( document.attachEvent ) {
    document.attachEvent('onreadystatechange', function(){
      if ( document.readyState == "complete" ) {
        func();
      }
    });
  }
} // --> onLoad

/**
* @function runAPI
* function that makes an asynchronous request using http and setting a global variable equal to the response of the text.
* fail safe of retrying 10 times before sending error message
*
* @param function apiUrl -
*/
function runAPI(apiUrl, func){
  //variable that stores the response of an http request
  if (window.XMLHttpRequest) {
      var xhttp = new XMLHttpRequest();
  } else {
      var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhttp.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE) {
          if (this.status == 200) {
              // On success parse out the response
              widgetData = JSON.parse(this.responseText);
              onLoad(displayWidget);//send in the name of the function that needs to be ran once data has been confirmed
          } else {
              // Error handling
              // Get the message
              var msg = this.statusText;
              if (this.status == 500) {
                  try {
                      msg = JSON.parse(this.responseText).message
                  } catch (e) {
                      console.log('No JSON message')
                  }
              }
              msg = 'HTTP Error (' + this.status + '): ' + msg;
              if (tries++ > 10) {
                  throw msg
              }
              setTimeout(runAPI(apiUrl, func), 500)
          }
      }
  };

  xhttp.open("GET", apiUrl, true);
  xhttp.send();
};



function displayWidget() {
  try{
    let dataArray = widgetData.l_data;
    //set maximum index of returned dataLayer
    maxIndex = dataArray.length;

    let curData = dataArray[currentIndex];
    //list title
    $("profile-title").innerHTML = widgetData.l_title;

    //current index of list
    $("mainimg").setAttribute('src',curData.li_img+"?width=300");
    $("mainimg").setAttribute('onerror',"//images.synapsys.us/01/fallback/stock/2017/03/");

    $("profile-rank").innerHTML = curData.li_rank;
    $("profile-name").innerHTML = curData.li_title;
    $("profile-datapoint1").innerHTML = curData.li_tag;
    $("profile-datavalue1").innerHTML = curData.li_value;
    $("profile-datavalue2").innerHTML = curData.li_sub_txt;
  }catch(e){
    console.log('Error in displaying widget Data');
    // console.log(e);
  }
} // --> create_widget

function updateIndex(difference){
  currentIndex += difference;
  if ( currentIndex < 0 ){
    currentIndex = 0;
  }else if ( currentIndex >= maxIndex ){
    currentIndex = maxIndex;
  }else{
  }
  //call display widget
  displayWidget();
}
