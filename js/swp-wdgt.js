$(function(){
  var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
  var APIUrl = protocolToUse + 'dev-homerunloyal-ai.synapsys.us/sidekick';
  //PRODUCTION API TO USE FOR AI ARTICLES
  //var APIUrl = protocolToUse + 'prod-homerunloyal-ai.synapsys.us/sidekick';
  var articleIndex = 0;

  function getData(APIUrl){
    var ret_data;
    $.ajax({
      url: APIUrl,
      async: false,
      dataType: 'json',
      success: function(r){
        ret_data = r;
      },
      error: function(jqXHR, status, error){
        console.log(jqXHR, status, error);
        displayError('Error Loading API: ' + status);
      }
    });
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
    $('.section-image').css({'background-image': 'url("' + image + '")'});
    $('.section-text').html(article.displayHeadline);

    //article url structure: /articles/:article_type/:event_id
    var articleUrl = protocolToUse + 'homerunloyal.com/articles/' + articleTypes[articleIndex] + '/' + game.eventId;
    var articleText = article.article[0].substr(0, 130);
    $('.content-text').html(articleText + '...<a href="'+ articleUrl +'"><span class="content-readmore"> Read More </span></a>');

    $('.bar-date').html(convertDate(game.startDateTime));
    var author = 'www.homerunloyal.com';
    $('.bar-author').html('<a id="authorlink" href="' + protocolToUse + author +'">' + author + '</a>');

    $('#readbutton').attr('href', articleUrl);

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

$(document).ready(function(){
  $('#pause').css({'display':'none'});
  $('#swp-pause').css({'display':'none'});
//  $('.tester').css({'display': 'hidden'});
  $('.tester').css({'z-index': '-1'});
  $('.content-container').hover( // hover function for pause, and play icon change.
    function() {
      $(this).find('#pause').css({'display': 'inline-block'});
      $(this).find('#play').css({'display': 'none'});
      $(this).find('#swp-pause').css({'display': 'inline-block'});
      $(this).find('#swp-play').css({'display': 'none'});
      unslide();
    },
    function(){
      $(this).find('#pause').css({'display': 'none'});
      $(this).find('#play').css({'display': 'inline-block'});
      $(this).find('#swp-pause').css({'display': 'none'});
      $(this).find('#swp-play').css({'display': 'inline-block'});
      //setTimeout(slide, 1500);
    //  setTimeout(progress, 1500);
    slide();
  });
});

//functions referenced in the toggle() function

function displayHandler(lastShown){  // display content if ad is in view
  if($('.tester').css('z-index') == '-1'){
    displayAd();
  }else{
    displayContent(lastShown);
  }
}
function displayAd(){ //placing ad over swp and fcw
  $('.swp').css({'z-index': '1'});
  $('.fcw').css({'z-index': '1'});
  $('.tester').css({'z-index': '2'});
}
function displayContent(lastShown){ //placing content over ad
  $('.tester').css({'z-index': '-1'});
  if(lastShown == 'fcw'){
    $('.swp').css({'z-index': '2'});
  }else if(lastShown == 'swp'){
    $('.fcw').css({'z-index': '2'});
  }
}


// var timer, slideNumber = 15; // starting time limit for timer
var timer, slideNumber = 2;
var speed = 1000 //speed of timer
var toggle = true;
function slide() {
    timer = setInterval(function(){
        if (slideNumber < 10) { // when timer is less than ten at a decimal 0. [0:09]
          slideNumber = '0' + String(slideNumber);
        }

        $('#time').html(slideNumber);
        $('#timer').html(slideNumber);
        $('#timers').html(slideNumber);
        slideNumber--;
        if(slideNumber=== -1) { // when timer is -1 [0] reset it to 15
           toggle();
        //  slideNumber = 15;
        slideNumber = 2;

        }
    },speed);

    var lastShown;
    function toggle(){

      if($('.fcw').css('z-index') == '2'){ 
        advanceList();
        lastShown = 'fcw';
      }else if($('.swp').css('z-index') == '2'){
        updateArticle()
        lastShown = 'swp';
      }
      displayHandler(lastShown);
    }
}
function unslide() {
    clearInterval(timer);

}
slide();

var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var bord = false;



var listType = 'disaster'; //will get rand and weather from embed, (location.search)
var listRand = 0;
var apiUrl = protocolToUse + 'dw.synapsys.us/list_api.php?';
apiUrl = apiUrl + 'cat=' + listType + '&rand=' + listRand;

var referrer = document.referrer;
// if in iframe, get url from parent (referrer), else get it from this window location (works for localhost)
var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

function getBaseUrl(string){
    var urlArray = string.split("/");
    var domain = urlArray[2];
    return protocolToUse +  domain;
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
    mlb:'../css/public/icons/Home-Run-Loyal_Icon 2.svg',
    college_basketball:'../css/public/icons/Hoops-Loyal_Icon 2.svg',
    finance:'../css/public/icons/Invest-Kit_Icon.svg',
    crime:'../css/public/icons/Crime_Icon.svg',
    demographics:'../css/public/icons/Demographic_Icon.svg',
    disaster:'../css/public/icons/Disaster_Icon.svg',
    weather: '../css/public/icons/Weather_Icon.svg'
  };

var schemeToUse = colorSchemes[listType];
var iconsToUse = iconScheme[listType];

function mapColorScheme(color,icons){
  $('.fcw-icon').css({'background-color': color});
  // $('.fcw-logo:hover').css({'background-color': color});
  // if($('.fcw-logo').is(':hover')) $('.fcw-logo:hover').css({'background-color': color});
  $('.fcw-content1').css({'color': color});
  $('#fcw-team').css({'color': color});
  $('.fcw-icon').css({'background-image': "url('" + icons + "')"});
  $('#fcw-content2b').css({'color': color});
  $('.fcw-list-next').css({'border-color': color, 'color': color});
  $('.fcw-list-next').hover(function(){
    $('.fcw-list-next').css({'background-color': color, 'color': 'white'});
  },
  function (){
    $('.fcw-list-next').css({'border-color': color, 'background-color': '', 'color' : color});
  });
  $("button[class $= 'nav']").hover(function(){
    $(this).css({'background-color': color});
  },
  function (){
    $(this).css({'background-color': ''});
  });
  $(".hover1").hover(function(){
    $('.hover1').css({'background-color': color});
  },
  function(){
    $('.hover1').css({'background-color': ''});
  });
  $('.fcw-list-time').css({'border-color': color, 'color': color});
  $('.fcw-list-list').css({'background-color': color, 'border-color': color});
  $('.fcw-list-link').css({'border-color': color});
  $('.fcw-rightnav:hover').css({'background-color': color});
  $('#pause').css({'color': color});
  $('#play').css({'color': color});
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

  $('.fcw-rightnav').on('click', function() {
      if (offset < dataLength-1 && $(this).data('dir') === 'next') {
          dataCall(++offset);
      }else if(offset >= dataLength-1){
        offset = 0;
        dataCall(offset);
      }
  });

  $('.fcw-leftnav').on('click', function() {
      if (offset > 0 && $(this).data('dir') === 'prev') {
          dataCall(--offset);
      }else if(offset <= 0){
        offset = dataLength-1;
        dataCall(offset);
      }
  });

  function executeListCall(type, rand){
    let url = protocolToUse + 'dw.synapsys.us/list_api.php?';
    url = url + 'cat=' + listType + '&rand=' + listRand;
    $.ajax({
      url: url,
      async: false,
      dataType: 'json',
      success: function(r){
        curData = r;
        dataCall(offset);
      },
      error: function(jqXHR, status, error){
        console.log(jqXHR, status, error);
        displayError('Error Loading API: ' + status);
      }
    });
  }

  executeListCall(listType, listRand);

  advanceList = function(){
    if(listRand < 9){
      listRand += 1;
    }else if(listRand >= 9){
      listRand = 0;
    }
    offset = 0;
    executeListCall(listType, listRand);
  }

  function dataCall(index){
      var listName = curData.l_title;
      var listData = curData.l_data;
      dataLength = listData.length;
      // Convert to lower kabab case for url links

      $('.fcw-t1 p').html(listName);
      if (listName.length >= 63) {
        $('.fcw-icon').css({'top': '8px'});
        $('.fcw-t1').css({'bottom':'0px'});
      }
      else {
        $('.fcw-icon').css({'top': '0px'});
        $('.fcw-t1').css({'bottom':'6px'});
      }

      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-image').css('background', 'url('+ protocolToUse + listData[index].li_img +') no-repeat');
      $('#fcw-content2b').html(listData[index].li_sub_txt);
      if (listType == 'finance'){
        listData[index].li_str = listData[index].li_str.replace('Reported', '');
      }
      $('.fcw-content3').html(listData[index].li_str);
      if (listData[index].li_str.length >= 40) {
        $('.fcw-content1, .fcw-content2').css({'display': 'inline'});
        $('.fcw-content').css({'text-align' : 'center'});
        $('.fcw-content1').html(listData[index].li_title + ' | ');
      }
      else {
        listData[index].li_title = listData[index].li_title;
        $('.fcw-content1').html(listData[index].li_title);
      }

      var listLink = buildListLink(listType, remnant, domain, listData);
      $('.fcw-list-list').attr('href', listLink);

      if(remnant == 'true' || remnant == true){
         $('.exec-link').attr('href', protocolToUse.replace('//','') + listData[index].li_primary_url);
      }else{
        //partner site
        $('.exec-link').attr('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
      }

  }
function buildListLink(cat, remn, dom, widget_data){

  dom == "lasvegasnow.com"  ? change_url = true : change_url = false;
  change_url ? new_url = "finance.lasvegasnow.com" : "";

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
  day = WeekDayNumToName(day.getDate());

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
    var string = day + ' ' + time + ' tz';
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
});
