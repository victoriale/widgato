swp_wdgt = function(){
  A = function(id) {
    let d = document;
    if(id[0] == '#'){
      return d.getElementById(id.slice(1,id.length));
    }else if(id[0] == '.'){
      return d.getElementsByClassName(id.slice(1,id.length))[0];
    }else if(id[0] != '#' && id[0] != '.'){
      return d.getElementById(id.slice(1,id.length));
    }
  }

  var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
  // var APIUrl = protocolToUse + 'dev-homerunloyal-ai.synapsys.us/sidekick';
  // var APIUrl = protocolToUse + 'qa-homerunloyal-ai.synapsys.us/sidekick';
  //PRODUCTION API TO USE FOR AI ARTICLES
  var APIUrl = protocolToUse + 'prod-homerunloyal-ai.synapsys.us/sidekick';
  var articleIndex = 0;

  // A('.fcw-list-time').style.display = 'none';
  A('.buttons-timer').style.display = 'none';

  switch (getRandomInt(0,2)) {
    case 0:
      A('.fcw').style.zIndex = "-1";
      A('.swp').style.zIndex = "2";
      break;
    case 1:
      A('.fcw').style.zIndex = '2';
      A('.swp').style.zIndex = '-1'
      break;
    default:
      A('.fcw').style.zIndex = '2';
      A('.swp').style.zIndex = '-1';
  }


  // A('.fcw').style.zIndex = '2';
  // A('.swp').style.zIndex = '-1'

  // A('.fcw').style.zIndex = "-1";
  // A('.swp').style.zIndex = "2";

  function httpGet(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
  }

  function getData(APIUrl){
    var ret_data;
    ret_data = httpGet(APIUrl);
    return ret_data;
  }

  /* functions to be used as objects to get various data points */
  function eventData(metaData){
    metaData = metaData.current;
    for(let obj in metaData){
      let string = obj.toString();
      this[obj] = metaData[obj]
    }
  }

  function eventImage(metaData, teamId){
    var images = metaData.images;
    this.imgs = [];
    for(let a = 0; a < images[teamId].length; a++){
      this.imgs[a] = images[teamId][a];
    }
  }

  //this function will return all images, home and away, in an array. (not oo)
  function getAllImages(metaData){
    var imgRet = [];
    var images = metaData.images;
    for(let obj in images){
      for(let i = 0; i < images[obj].length; i++){
        imgRet.push(images[obj][i]);
      }
    }
    return imgRet;
  }

  var articleTypes = [];
  function mapArticles(data){
    articleTypes = [];
    for(let obj in data){
      if(obj == "meta-data")continue;
      articleTypes.push(obj);
      this[obj] = data[obj];
    }
  }

  // Main Function for mapping data to html elements
  function linkData(data, articleIndex){
    var mData = data['meta-data'];
    var article = new mapArticles(data)[articleTypes[articleIndex]];
    var game = new eventData(mData);

    //images being selected based on the articleIndex value
    var images = getAllImages(mData);
    var image = images[articleIndex];

    //change this to img tags instead of bg image
    A('.section-image').style.backgroundImage = 'url("' + image + '")';
    A('.section-text').innerHTML = article.displayHeadline;

    //article url structure: /articles/:article_type/:event_id
    var articleUrl = protocolToUse + 'homerunloyal.com/articles/' + articleTypes[articleIndex] + '/' + game.eventId;
    var articleText = article.article[0].substr(0, 130);
    A('.content-text').innerHTML = articleText + '...<a href="'+ articleUrl +'"><span class="content-readmore"> Read More </span></a>';

    A('.bar-date').innerHTML = convertDate(game.startDateTime);
    var author = 'www.homerunloyal.com';
    var authorLink = author;
    A('.bar-author').innerHTML = '<a id="authorlink" href="' + protocolToUse + authorLink +'">' + author + '</a>';

    A('#readbutton').setAttribute('href', articleUrl);
    A('.buttons-nextlist').onmouseover = function(){
      A('#arrow').style.fill = 'white';
    }
    A('.buttons-nextlist').onmouseout = function(){
      A('#arrow').style.fill = '#b31d24';
    }

  }

/* -- Set Up Data links to the Widget -- */
  var data = getData(APIUrl);
  linkData(data, articleIndex);


  /* Handling of Article Index */
   updateArticle = function(){
    if(articleIndex < articleTypes.length - 1){
      articleIndex++;
    }else if(articleIndex >= articleTypes.length - 1){
      articleIndex = 0;
    }
    linkData(data, articleIndex);
  }


/***/


A('#pause').style.display = 'none';
A('#swp-pause').style.display = 'none';
A('.adzone').style.zIndex = '-1';

A(".content-container").onmouseover = function() {
  A('#play').style.display = 'none';
  A('#pause').style.display = 'inline-block';
  A('#swp-pause').style.display = 'inline-block';
  A('#swp-play').style.display = 'none';
  //unslide();
}
A(".content-container").onmouseout  = function() {
  A('#play').style.display = 'inline-block';
  A('#pause').style.display = 'none';
  A('#swp-pause').style.display = 'none';
  A('#swp-play').style.display = 'inline-block';
  //slide();
}


//functions referenced in the toggle() function

function displayHandler(lastShown){  // display content if ad is in view
  if(A('.adzone').style.zIndex == '-1'){
    displayAd();
  }else{
    displayContent(lastShown);
  }
}
function displayAd(){ //placing ad over swp and fcw
  A('.swp').style.zIndex = '-1';
  A('.fcw').style.zIndex = '-1';
  A('.adzone').style.zIndex = '2';
}
function displayContent(lastShown){ //placing content over ad
  A('.adzone').style.zIndex = '-1';
  if(lastShown == 'fcw'){
    A('.fcw').style.zIndex = '-1';
    A('.swp').style.zIndex = '2';
  }else if(lastShown == 'swp'){
    A('.swp').style.zIndex = '-1';
    A('.fcw').style.zIndex = '2';
  }
}


// var timer, slideNumber = 15; // starting time limit for timer
var timer, slideNumber = 5;
var speed = 1000 //speed of timer
var toggle = true;
function slide() {
    timer = setInterval(function(){
        if (slideNumber < 10) { // when timer is less than ten at a decimal 0. [0:09]
          slideNumber = '0' + String(slideNumber);
        }
        A('#time').innerHTML = slideNumber;
        A('#timer').innerHTML = slideNumber;
        A('#timers').innerHTML = slideNumber;

        slideNumber--;
        if(slideNumber=== -1) { // when timer is -1 [0] reset it to 15
           toggle();
        //  slideNumber = 15;
        slideNumber = 5;

        }
    },speed);

    var lastShown;
    function toggle(){
      if(A('.fcw').style.zIndex == '2'){
        advanceList();
        lastShown = 'fcw';
      }else if(A('.swp').style.zIndex == '2'){
        updateArticle()
        lastShown = 'swp';
      }
      displayHandler(lastShown);
    }
}
function unslide() {
    clearInterval(timer);

}
//slide();

var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var bord = false;

var possibleTypes = ['nba', /*'mlb',*/ 'college_basketball', 'finance', 'crime', 'demographics', 'disaster'/*, 'weather'*/];
//var listType = 'weather'; //will get rand and weather from embed, (location.search)
var listType = possibleTypes[getRandomInt(0,possibleTypes.length)];
var listRand = getRandomInt(0,10);
var apiUrl = protocolToUse + 'dw.synapsys.us/list_api.php?';
apiUrl = apiUrl + 'cat=' + listType + '&rand=' + listRand;

var referrer = document.referrer;
var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

function getBaseUrl(string){
    var urlArray = string.split("/");
    var domain = urlArray[2];
    return protocolToUse +  domain;
}

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}
var colorSchemes = {
    nba: '#f7701d',
    mlb: '#b31d24',
    college_basketball: '#f7701d',
    finance: '#3098ff',
    crime: '#f6af05',
    demographics: '#65398e',
    disaster: '#902d8e',
    weather: '#ffdf30'
  };
var iconScheme = {
    nba:'../css/public/icons/Hoops-Loyal_Icon 2.svg',
    // mlb:'../css/public/icons/Home-Run-Loyal_Icon 2.svg',
    college_basketball:'../css/public/icons/Hoops-Loyal_Icon 2.svg',
    finance:'../css/public/icons/Invest-Kit_Icon.svg',
    crime:'../css/public/icons/Crime_Icon.svg',
    demographics:'../css/public/icons/Demographic_Icon.svg',
    disaster:'../css/public/icons/Disaster_Icon.svg',
    weather: '../css/public/icons/Weather_Icon.png'
  };

var schemeToUse = colorSchemes[listType];
var iconsToUse = iconScheme[listType];
A('#nextlist-svg').style.fill = schemeToUse;
function mapColorScheme(color,icons){
  A('.fcw-icon').style.backgroundColor = color;
  A('.fcw-content1').style.color = color;

  A('.fcw-icon').style.backgroundImage = "url('" + icons + "')";
  A('#fcw-content2b').style.color = color;
  A('.fcw-list-next').style.color = color;
  A('.fcw-list-next').style.borderColor = color;

  A(".fcw-list-next").onmouseover = function() {
    A('.fcw-list-next').style.backgroundColor = color;
    A('.fcw-list-next').style.color = 'white';
    A('#nextlist-svg').style.fill = '#FFFFFF';
  }
  A(".fcw-list-next").onmouseout  = function() {
    A('.fcw-list-next').style.bordercolor = color;
    A('.fcw-list-next').style.backgroundColor = '';
    A('.fcw-list-next').style.color = color;
    A('#nextlist-svg').style.fill = color;
  }



  A(".fcw-leftnav").onmouseover = function(){
    A('.fcw-leftnav').style.backgroundColor = color;
  }
  A(".fcw-leftnav").onmouseout = function(){
    A('.fcw-leftnav').style.backgroundColor = '';
  }

  A(".fcw-rightnav").onmouseover = function(){
    A('.fcw-rightnav').style.backgroundColor = color;
  }
  A(".fcw-rightnav").onmouseout = function(){
    A('.fcw-rightnav').style.backgroundColor = '';
  }

  A(".hover1").onmouseover = function() {
    A('.hover1').style.backgroundColor = color;
  }
  A(".hover1").onmouseout  = function() {
    A(".hover1").style.backgroundColor = '';
  }
  A('.fcw-list-time').style.color = color;
  A('.fcw-list-time').style.borderColor = color;
  A('.fcw-list-list').style.borderColor = color;
  A('.fcw-list-list').style.backgroundColor = color;


  A('#pause').style.color = color;
  A('#play').style.color = color;
}

mapColorScheme(schemeToUse,iconsToUse);


  var temp = location.search;
  var query = {};

  if(temp !== null && temp !== ""){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
    bord = query.bord;
  }

  remnant = 'true';

  A(".fcw-rightnav").onclick = function() {
    if (offset < dataLength-1) {
           dataCall(++offset);
       }else if(offset >= dataLength-1){
         offset = 0;
         dataCall(offset);
         }
  };
  A(".fcw-leftnav").onclick = function() {
    if (offset > 0 ) {
        dataCall(--offset);
    }else if(offset <= 0){
      offset = dataLength-1;
      dataCall(offset);
    }
  };

  function executeListCall(type, rand, old_title){
    let url = protocolToUse + 'dw.synapsys.us/list_api.php?';
    url = url + 'cat=' + listType + '&rand=' + listRand;
    curData = httpGet(url);
    dataCall(offset);
    if(old_title != undefined && old_title == curData.l_title){
      advanceList();
    }
  }

  executeListCall(listType, listRand);

  advanceList = function(){
    if(listRand < 9){
      listRand += 1;
    }else if(listRand >= 9){
      listRand = 0;
    }
    offset = 0;
    executeListCall(listType, listRand, curData.l_title);
  }

  function dataCall(index){
      var listName = curData.l_title;
      var listData = curData.l_data;
      dataLength = listData.length;
      // Convert to lower kabab case for url links

      A('.fcw-t1-p').innerHTML = listName;
      if (listName.length >= 63) {
        A('.fcw-icon').style.top = '8px';
        A('.fcw-t1').style.bottom = '0px';
      }
      else {
        A('.fcw-icon').style.top = '0px';
        A('.fcw-t1').style.bottom = '8px';
      }

      A('.fcw-t2-num').innerHTML = '#' + (index+1);

      A('.fcw-image').style.backgroundImage = 'url('+ protocolToUse + listData[index].li_img +')';
      A('.fcw-image').style.backgroundRepeat = 'no-repeat';

      A('#fcw-content2b').innerHTML = listData[index].li_sub_txt;
      if (listType == 'finance'){
        listData[index].li_str = listData[index].li_str.replace('Reported', '');
      }
      A('.fcw-content3').innerHTML = listData[index].li_str;
      if (listData[index].li_str.length >= 40) {
        A('.fcw-content2').style.display = 'inline';
        A('.fcw-content1').style.display = 'inline';
        A('.fcw-content').style.textAlign = 'center';
        A('.fcw-content1').innerHTML = listData[index].li_title + ' | ';
      }
      else {
        A('.fcw-content1').style.display = '';
        A('.fcw-content2').style.display = '';
        A('.fcw-content1').innerHTML = listData[index].li_title;
        var hoops = true;
      }

     if (listType == 'college_basketball' && listData[index].li_title.length + listData[index].li_sub_txt.length >= 35) {
       A('#fcw-content2b').style.fontSize = '10px';
       A('.fcw-content1').style.fontSize = '12px';
     }
     else if(hoops = true){
       A('#fcw-content2b').style.fontSize = '12px';
       A('.fcw-content1').style.fontSize = '16px';
     }

      var listLink = buildListLink(listType, remnant, domain, curData);
      A('.fcw-list-list').setAttribute('href', listLink);

      if(remnant == 'true' || remnant == true){
        A('.exec-link').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_primary_url);
      }else{
        //partner site
        A('.exec-link').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
      }


  }
function buildListLink(cat, remn, dom, widget_data){

  dom == "lasvegasnow.com"  ? change_url = true : change_url = false;
  change_url ? new_url = "finance.lasvegasnow.com" : "";
  doStep = true;
  switch ( cat ) {
        case 'nba':
          var base_url = remn == "true" ? "http://www.hoopsloyal.com/NBA/widget-list" : "http://www.myhoopszone.com/" + dom + "/NBA/w-list";
          break;
        case 'college_basketball':
          var base_url = remn == "true" ? "http://www.hoopsloyal.com/NCAA/widget-list" : "http://www.myhoopszone.com/" + dom + "/NCAA/w-list";
          break;
        case 'finance':
          var base_url = remn == "true" ? "http://www.investkit.com/widget-list" : "http://www.myinvestkit.com/" + dom + "/w-list";
          if ( change_url ) {
            base_url = base_url.replace("www.myinvestkit.com", new_url);
          }
          break;
        default:
          var base_url = remn == "true" ? "http://www.joyfulhome.com/wlist" : "http://www.myhousekit.com/" + dom + "/wlist";
          var doStep = false;
      }
      base_url += ( doStep ) ? '?tw=' + widget_data.l_param + '&sw=' + widget_data.l_sort + '&input=' + widget_data.l_input : "/tw-" + widget_data.l_param + "+sw-" + widget_data.l_sort + "+input-" + widget_data.l_input;
      return base_url;
}

/* -- Manipulation Functions  -- */
function convertDate(d){
  var date = d.split(' ');

  var day = date[0];
  var time = date[1];
  var tz = date[2];

  var month = MonthsFullName(day.split('/')[0]);
  var year = day.split('/')[2];
  var weekDay = day.split('/')[1];

  day = new Date(day);
  day = WeekDayNumToName(day.getDay());

  var today = new Date();
  var todayMonth = MonthsFullNameZed(today.getMonth());
  var todayYear = String(today.getFullYear()).slice(2);
  var todayDay = String(today.getDate());

  if(todayMonth == month && todayDay == weekDay && todayYear == year){
    // then it is today
    var string = 'Today' + ' ' + time + ' ' + tz;
  }else if(todayMonth == month && todayYear == year && Number(todayDay) - 1 == Number(weekDay)){
    // then it is yesterday (unless edge case where it is the end of the month)
    var string = 'Yesterday' + ' ' + time + ' ' + tz;
  }else{
    // otherwise just use day of the week
    var string = day + ' ' + time + ' ' + tz;
  }
  return string;
}

function WeekDayNumToName(n){
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[n];
}

function MonthsFullNameZed(number){
  var month = {
    "0":"January",
    "1":"February",
    "2":"March",
    "3":"April",
    "4":"May",
    "5":"June",
    "6":"July",
    "7":"August",
    "8":"September",
    "9":"October",
    "10":"November",
    "11":"December",
  }
  return month[number];
}

function MonthsFullName(number){
  var month = {
    "1":"January",
    "2":"February",
    "3":"March",
    "4":"April",
    "5":"May",
    "6":"June",
    "7":"July",
    "8":"August",
    "9":"September",
    "10":"October",
    "11":"November",
    "12":"December",
  }

  return month[number];
}
}();
