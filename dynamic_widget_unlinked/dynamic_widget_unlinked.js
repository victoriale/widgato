var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var temp = location.search;
var query = {};
var apiCallUrl;
var imageUrl = "//images.synapsys.us";
var href = window.top.location;
var currentIndex = 0;
var maxIndex = 1;
var widgetData;
var tries = 0;
var canClick=true;
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

//Initial load Waits for the DOMContent to load
document.addEventListener("DOMContentLoaded", function(event) {
  /*
  create function to get API
  */
  if(temp != null){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    updateList();
  }
});


//increment index and rerun display widget
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

function updateList(){
  apiCallUrl = protocolToUse;
  let dom = query.dom;
  let cat = query.category;
  let env = query.env;
  let rand = Math.floor(Math.random() * 1000) + 1;

  //Run dynamic color of widget
  setCategoryColors(cat);


  //Determine whether to use Dynamic api call or use FOOTBALL data
  if(cat == "football" || cat == "nfl" || cat == "ncaaf" || cat == "nflncaaf"){
    apiCallUrl += env+"touchdownloyal-api.synapsys.us/list/";
    getFootballList(cat);
  }else{
    apiCallUrl += "dw.synapsys.us/list_api.php";
    if(cat != null){
      apiCallUrl += "?cat="+cat;
    }
    if(dom != null){
      apiCallUrl += "&partner="+dom;
    }
    apiCallUrl += "&rand="+rand;
    runAPI(apiCallUrl);
  }

}

function getFootballList(league){
  if (league == "nfl") {
    var url = '../js/tdl_list_array.json';
  }
  else if (league == "ncaaf") {
    var url = '../js/tdl_list_array_ncaaf.json';
  }
  else if (league == "nflncaaf") {
    rand = Math.floor((Math.random() * 2) + 1);
    if (rand == 1) {
      var url = '../js/tdl_list_array_ncaaf.json';
      l.category = "ncaaf";
    }
    else {
      var url = '../js/tdl_list_array.json';
      l.category = "nfl";
    }
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
      //On complete function
      initData = JSON.parse(xmlHttp.responseText);
      getRandFootballList(initData);
    }
  }
  xmlHttp.open( "GET", url, true ); // false for synchronous request
  xmlHttp.send( null );
}

function getRandFootballList(initData) {
  rand = Math.floor((Math.random() * (initData.length - 1)) + 1);
  var date = new Date;
  var compareDate = new Date('09/15/' + date.getFullYear());
  let season;
  if (date.getMonth() == compareDate.getMonth() && date.getDate() >= compareDate.getDate()) {
      season = initData[rand] + "&season=" + date.getFullYear();
  }
  else if (date.getMonth() > compareDate.getMonth()) {
      season = initData[rand] + "&season=" + date.getFullYear();
  }
  else {
      season= initData[rand] + "&season=" + (date.getFullYear() - 1);
  }
  apiCallUrl += season;
  runAPI(apiCallUrl)
}

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

  //Loops throught stylesheet and finds cssName and change the cssRules
  function classLoop(cssName, style, styleColor){
    let styleSheets = getCssSelector("5embed");
    var attribute = findCss(cssName, styleSheets);

    //delete inheritor rule and RE-APPLY css with new rule (easier when only one cssrule is needed to change)
    styleSheets.deleteRule(attribute.index);

    //try catch statements are for ie compatibility
    switch(style){
      case 'color':
        try{
          styleSheets.insertRule( '.'+cssName+' { color: '+styleColor+' !important; }', 0 );
        }catch(e){
          styleSheets.addRule('.'+cssName, 'color: '+styleColor+' !important', 0);
        }
      break;
      case 'border-color':
      try{
        styleSheets.insertRule( '.'+cssName+' { border-color: '+styleColor+' !important; }', 0 );
      }catch(e){
        styleSheets.addRule('.'+cssName, 'border-color: '+styleColor+' !important', 0);
      }
      break;
      case 'background-color':
        try{
          styleSheets.insertRule( '.'+cssName+' { background-color: '+styleColor+' !important; }', 0 );
        }catch(e){
          styleSheets.addRule('.'+cssName, 'background-color: '+styleColor+' !important', 0);
        }
      break;
      default:
      break;
    }

  }

  //find the css File with the title given to the function
  function getCssSelector(title){
    let selector = document.styleSheets;
    for(var index = 0; index < selector.length; index++){
      if(selector[index].title == title){
        return selector[index];
      }
    }
  }

  //find the the specific css element by the given selector Text (ex: .inheritor , body, html, #profile-name)
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

  //Class Loop will change the color by looping through cssSelector File and changing the given class
  classLoop('inheritor', 'color', color);
  classLoop('inheritor_border', 'border-color', color);
  classLoop('inheritor_img_bg', 'background-color', color);
  classLoop('inheritor_bg:hover::before', 'background-color', color);

}

/****************************** onLoad ***************************
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
} /*************************** onLoad ***************************/

/***************************** runAPI ***************************
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
};/***************************** runAPI ****************************/

//Display Widget Data
function displayWidget() {
  try{
    /***************************FOOTBALL DATA APPLIANCE*******************************/
    if(query.category == "football" || query.category == "nfl" || query.category == "ncaaf" || query.category == "nflncaaf"){
      let dataArray = widgetData.data.listData;
      //set maximum index of returned dataLayer
      maxIndex = dataArray.length;
      let curData = dataArray[currentIndex];

      //list title
      $("profile-title").innerHTML = widgetData.data.listInfo.listName;
      $("mainimg").setAttribute('onerror',"//images.synapsys.us/01/fallback/stock/2017/03/");
      $("profile-rank").innerHTML = '#'+curData.rank;
      $("mainimg-rank").innerHTML = curData.rank;

      //current index of list
      if(curData.rankType == "player"){
        let image = checkImage(imageUrl+curData.playerHeadshotUrl);

        $("mainimg").setAttribute('src',image);
        $("profile-name").innerHTML = curData.playerFirstName + " " + curData.playerLastName;

        $("profile-datapoint1").innerHTML = "Team: ";
        $("profile-datavalue1").innerHTML = curData.teamName;
        $("profile-datavalue2").innerHTML = curData.stat+" "+curData.statDescription;
      }else{
        let image = checkImage(imageUrl+curData.teamLogo);
        $("mainimg").setAttribute('src',image);
        $("profile-name").innerHTML = curData.teamName;

        $("profile-datapoint1").innerHTML = "Division: ";
        $("profile-datavalue1").innerHTML = curData.divisionName;
        $("profile-datavalue2").innerHTML = curData.statDescription + ": "+curData.stat;
      }
      /***************************END OF FOOTBALL DATA*******************************/
    }else{
      /***************************DYNAMIC DATA APPLIANCE*******************************/
      let dataArray = widgetData.l_data;
      //set maximum index of returned dataLayer
      maxIndex = dataArray.length;
      let curData = dataArray[currentIndex];
      //list title
      $("profile-title").innerHTML = widgetData.l_title;
      //current index of list
      let image = checkImage(curData.li_img);
      $("mainimg").setAttribute('src',image);

      $("profile-rank").innerHTML = '#'+curData.li_rank;
      $("mainimg-rank").innerHTML = curData.li_rank;
      $("profile-name").innerHTML = curData.li_title;
      $("profile-datapoint1").innerHTML = curData.li_value;
      $("profile-datavalue1").innerHTML = curData.li_tag;
      $("profile-datavalue2").innerHTML = curData.li_sub_txt;
    }
    /***************************END OF DYNAMIC DATA*******************************/
  }catch(e){
    console.log('Error in displaying widget Data');
    // console.log(e);
  }
} // --> create_widget

//checks if the image is a placement and replace and change the look of the widget
function checkImage(image){
  let imageReturn;
  let showCover;
  //set onerror image
  $("mainimg").setAttribute('onerror', imageUrl+"/01/fallback/stock/2017/03/");

  //prep return
  if(image != null && image.indexOf('no-image') == -1 &&  window.location.pathname.indexOf('_970') == -1){
    imageReturn = image;
    showCover = false;
  }else{
    if(query.category == "football" || query.category == "nfl" || query.category == "ncaaf" || query.category == "nflncaaf"){
      imageReturn = imageUrl + "/01/fallback/stock/2017/03/football_stock.jpg";
    }
    showCover = true;
  }
  let imageBackground = document.getElementsByClassName('e_image-cover');

  for(var j = 0; j < imageBackground.length; j++){
    if(showCover){
      imageBackground[j].style.display = 'block';
    }else{
      imageBackground[j].style.display = 'none';
    }
  }

  imageReturn += "?width=" + (300 * window.devicePixelRatio);

  console.log('imageReturn',imageReturn);
  return imageReturn;
}
