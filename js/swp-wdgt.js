$(function(){
  var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
  var APIUrl = protocolToUse + 'dev-homerunloyal-ai.synapsys.us/sidekick';
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
    var articleUrl = 'http://homerunloyal.com/articles/' + articleTypes[articleIndex] + '/' + game.eventId;
    var articleText = article.article[0].substr(0, 130);
    $('.content-text').html(articleText + '...<a href="'+ articleUrl +'"><span class="content-readmore"> Read More </span></a>');

    $('.bar-date').html(convertDate(game.startDateTime));
    var author = 'www.homerunloyal.com';
    $('.bar-author').html('<a id="authorlink" href="http://'+ author +'">' + author + '</a>');

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
  $('.tester').css({'display': 'hidden'});
  $('.tester').css({'display': 'none'});
  $('.content-container').hover(
    function() {
      $(this).find('#pause').css({'display': 'inline-block'});
      $(this).find('#play').css({'display': 'none'});
      $(this).find('#swp-pause').css({'display': 'inline-block'});
      $(this).find('#swp-play').css({'display': 'none'});
      unslide();
  //  endprogress();
    },
    function(){
      $(this).find('#pause').css({'display': 'none'});
      $(this).find('#play').css({'display': 'inline-block'});
      $(this).find('#swp-pause').css({'display': 'none'});
      $(this).find('#swp-play').css({'display': 'inline-block'});
      setTimeout(slide, 1500);
    //  setTimeout(progress, 1500);
  });
});

//functions referenced in the toggle() function
function displayHandler(lastShown){
  if($('.tester').css('display') == 'none'){
    displayAd();
  }else{
    displayContent(lastShown);
  }
}
function displayAd(){
  $('.swp').css({'display': 'none'});
  $('.fcw').css({'display': 'none'});
  $('.tester').css({'display': 'block'});
}
function displayContent(lastShown){
  $('.tester').css({'display': 'none'});
  if(lastShown == 'fcw'){
    $('.swp').css({'display': 'block'});
  }else if(lastShown == 'swp'){
    $('.fcw').css({'display': 'block'});
  }
}


var timer, slideNumber = 14;
var speed = 1000
var toggle = true;
function slide() {
    timer = setInterval(function(){
        if (slideNumber < 10) {
          slideNumber = '0' + String(slideNumber);
        }

        // document.getElementById("time").innerHTML = slideNumber;
        // document.getElementById("timer").innerHTML = slideNumber;

        $('#time').html(slideNumber);
        $('#timer').html(slideNumber);
        $('#timers').html(slideNumber);
        slideNumber--;
        if(slideNumber=== -1) {
           toggle();
         slideNumber = 15;
         console.log(slideNumber);
        }
    },speed);

    var lastShown;
    function toggle(){
      if($('.fcw').css('display') == 'block'){
        lastShown = 'fcw';
      }else if($('.swp').css('display') == 'block'){
        lastShown = 'swp';
      }
      displayHandler(lastShown);
    }
}
function unslide() {
    clearInterval(timer);

}
slide();


// VL - last updated: June 16th 2016
var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;

// var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";

// var apiUrl = protocolToUse+'dev-homerunloyal-api.synapsys.us/'; //TODO: API Domain Name
var listType = 'finance';
var listRand = '1';
var apiUrl = protocolToUse + 'dw.synapsys.us/list_api.php?';
apiUrl = apiUrl + 'cat=' + listType + '&rand=' + listRand;

var referrer = document.referrer;
// if in iframe, get url from parent (referrer), else get it from this window location (works for localhost)
var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

function getBaseUrl(string){
    var urlArray = string.split("/");
    var domain = urlArray[2];
    return protocolToUse + "//" + domain;
}
// convert camel case to lower kabab case for url
toLowerKababCase = function(str){
  str = str.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[\.,']/g, '');
  return str;
};

var colorSchemes = {
    nba: '#f7701d',
    mlb: '#b31d24',
    college_basketball: '#f7701d',
    finance: '#3098ff',
    crime: '#f6af05',
    demographics: '#65398',
    disaster: '#90sd8e',
    weather: '#ffdf30'
  };

var schemeToUse = colorSchemes[listType];

function mapColorScheme(color){
  $('.fcw-icon').css({'background-color': color});
  // $('.fcw-logo:hover').css({'background-color': color});
  // if($('.fcw-logo').is(':hover')) $('.fcw-logo:hover').css({'background-color': color});
  $('.fcw-content1').css({'color': color});
  $('#fcw-team').css({'color': color});
  $('#fcw-content2b').css({'color': color});
  $('.fcw-list-next').css({'border-color': color, 'color': color});
  $('.fcw-list-next').hover(function(){
    $('.fcw-list-next').css({'background-color': color, 'color': 'white'});
  },function (){
    $('.fcw-list-next').css({'border-color': color, 'background-color': '','color':color});
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
  // $('.fcw-list-next:hover').css({'background-color': color});
  // if($('.fcw-list-next').is(':hover')) $('.fcw-list-next:hover').css({'background-color': color});
  $('.fcw-list-time').css({'border-color': color, 'color': color});
  $('.fcw-list-list').css({'background-color': color, 'border-color': color});
  $('.fcw-list-link').css({'border-color': color});
//  $('#button:hover').css({'background-color': color});
  $('.fcw-rightnav:hover').css({'background-color': color});
  // $('.fcw-leftnav:hover').css({'background-color': color});
  // $('.fcw-t2-title:hover').css({'color': color});
  // $('.fcw-loc:hover').css({'color': color});
  $('#pause').css({'color': color});
  $('#play').css({'color': color});
}

mapColorScheme(schemeToUse);

  var temp = location.search;
  var query = {};

  if(temp !== null && temp !== ""){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
    bord = query.bord;
  }


  	if(bord == 'true'){
  		$(".re_w_list").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
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
    // Example Url: http://dev-homerunloyal-api.synapsys.us/randomList/player/25/1

    $.get(apiUrl, function(data){
      curData = data;
      console.log(curData);
      dataCall(offset);
    }, 'json');


  function dataCall(index){
      var listName = curData.l_title;
      var listData = curData.l_data;
      dataLength = listData.length;
      // Convert to lower kabab case for url links

      $('.fcw-t1 p').html(listName);
      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-image').css('background', 'url('+ protocolToUse + listData[index].li_img +') no-repeat');
      $('#fcw-content2b').html(listData[index].li_sub_txt);
      $('.fcw-content3').html(listData[index].li_str);
      if (listData[index].li_str.length >= 36) {
        $('.fcw-content1, .fcw-content2').css({'display': 'inline'});
      //  $('.fcw-content2').css({'display' : 'inline'});
        $('.fcw-content').css({'text-align' : 'center'});
        //listData[index].li_title = listData[index].li_title + ' | ';
        $('.fcw-content1').html(listData[index].li_title + ' | ');
      }
      else {
        listData[index].li_title = listData[index].li_title;
        $('.fcw-content1').html(listData[index].li_title);
      }



      // if(listData[index].stat == 1){
      //   dataValue = listInfo.nouns[0];
      // } else {
      //   dataValue = listInfo.nouns[1];
      // }
      // Check if no seasonId then return current year
      // if(typeof listInfo.season == 'undefined'){
      //   listInfo.season = new Date().getFullYear();
      // }
      //$('.fcw-content3').html(Math.round(dataPt * 100)/100 + ' ' + dataValue + ' for ' + listInfo.season);

      if(remnant == 'true' || remnant == true){
         $('.exec-link').attr('href', protocolToUse.replace('//','') + listData[index].li_primary_url);
      }else{
        $('.exec-link').attr('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
      }

      if(remnant == 'true' || remnant == true){
        $('.fcw-icon').attr('href', baseUrl); //Top Left Icon - link to Home Page
        $('.exec-link').attr('href', baseUrl + "/player/" + teamNameUrl + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#teamProfile').attr('href', baseUrl + "/team/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('#playerUrl').attr('href', baseUrl + "/player/" + teamNameUrl + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#fcw-team').attr('href', baseUrl + "/team/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('.fcw-href').attr('href', baseUrl + listInfo.url + "/20/1"); // Get list page url
      } else {
        $('.fcw-icon').attr('href', baseUrl+"/"+ domain); //Top Left Icon - link to Partner Home Page
        $('.exec-link').attr('href', baseUrl + "/" + domain + "/p/" + teamNameUrl + "/" + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#teamProfile').attr('href', baseUrl+ "/" + domain + "/t/" + teamNameUrl + "/" + listData[index].teamId);
        $('#playerUrl').attr('href', baseUrl + "/" + domain + "/p/" + teamNameUrl + "/" + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#fcw-team').attr('href', baseUrl + "/" + domain + "/t/" + teamNameUrl + "/" + listData[index].teamId);// Get teamUrl
        $('.fcw-href').attr('href', baseUrl + "/" + domain +  listInfo.url + "/20/1"); // Get list page domain
      }
  }

function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return '../css/public/no-image.png';
  }
  return 'http://prod-sports-images.synapsys.us' + path;
  console.log(path);
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
function abbrState(state){
  var stateName = {
    'Alabama': 'Ala.',
    'Alaska': 'Alaska',
    'Arizona':'Ariz.',
    'Arkansas': 'Ark.',
    'California': 'Calif.',
    'Colorado': 'Colo.',
    'Connecticut': 'Conn.',
    'Delaware': 'Del.',
    'D.C.':'D.C.',
    'Florida': 'Fla.',
    'Georgia': 'Ga.',
    'Hawaii': 'Hawaii',
    'Idaho': 'Idaho',
    'Illinois': 'Ill.',
    'Indiana': 'Ind.',
    'Iowa': 'Iowa',
    'Kansas': 'Kan.',
    'Kentucky': 'Ky.',
    'Lousiana': 'La.',
    'Maine': 'Maine',
    'Maryland': 'Md.',
    'Massachusetts': 'Mass.',
    'Michigan': 'Mich.',
    'Minnesota': 'Minn.',
    'Mississippi': 'Miss.',
    'Missouri': 'Mo.',
    'Montana': 'Mont.',
    'Nebraska': 'Neb.',
    'Nevada': 'Nev.',
    'New Hampshire': 'N.H.',
    'New Jersey': 'N.J.',
    'New Mexico': 'N.M.',
    'New York': 'N.Y.',
    'North Carolina': 'N.C.',
    'North Dakota': 'N.D.',
    'Ohio': 'Ohio',
    'Oklahoma': 'Okla.',
    'Ontario': 'Ontario',
    'Oregon': 'Ore.',
    'Pennsylvania': 'Pa.',
    'Puerto Rico': 'P.R.',
    'Rhode Island': 'R.I.',
    'South Carolina': 'S.C.',
    'South Dakota': 'S.D.',
    'Tennessee': 'Tenn.',
    'Texas': 'Texas',
    'Utah': 'Utah',
    'Vermont': 'Vt.',
    'Virginia': 'Va.',
    'Washington': 'Wash.',
    'West Virginia': 'W.Va.',
    'Wisconsin': 'Wis.',
    'Wyoming': 'Wyo.'
  };
  return stateName[state];
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
