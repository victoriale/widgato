var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;

var protocolToUse = (location.protocol == "https:") ? "https" : "http";
var apiUrl = protocolToUse+'://dev-homerunloyal-api.synapsys.us/';//TODO: API Domain Name
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
$(function(){

  var temp = location.search;
  var query = {};

  if(temp != null){
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

    $.get(apiUrl+'randomList/team/20/1', function(data){
      curData = data.data;
      dataCall(offset);
    }, 'json');
  })//END OF FUNCTION

  function dataCall(index){
      var listInfo = curData.listInfo;
      var listData = curData['listData'];
      dataLength = listData.length;
      var dataPt = listData[index].stat;
      var dataValue = '';
      // Convert to lower kabab case for url links
      var teamNameUrl = toLowerKababCase(listData[index].teamName);
      $('.fcw-t1').html(listInfo.name);
      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-image').css('background', 'url('+imageUrl(listData[index].teamLogo)+') no-repeat');
      $('#team_name').html(listData[index].teamName);
      $('#teamProf').html(listData[index].teamVenue);
      $('#location_link').html(listData[index].teamCity + ', ' + abbrState(listData[index].teamState));
      $('.fcw-presentedby').html('MLB TOP TEAMS - PRESENTED BY');
      if(listData[index].stat == 1){
        dataValue = listInfo.nouns[0];
      } else {
        dataValue = listInfo.nouns[1];
      }
      if(typeof listInfo.season == 'undefined'){
        listInfo.season = new Date().getFullYear();
      }
      $('.fcw-content1').html(Math.round(dataPt * 100)/100 + ' ' + dataValue);
      $('.fcw-content2').html(listInfo.season + ' Season');

      if(remnant == 'true' || remnant == true){
        $('.fcw-icon').attr('href', baseUrl);
        $('.exec-link').attr('href', baseUrl + "/team/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('#team_name').attr('href', baseUrl + "/team/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('.fcw-href').attr('href', baseUrl  +  listInfo.url + "/20/1"); // Get list page domain
      } else {
        $('.fcw-icon').attr('href', baseUrl + "/" + domain);
        $('.exec-link').attr('href', baseUrl + "/" + domain + "/t/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('#team_name').attr('href', baseUrl + "/" + domain + "/t/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('.fcw-href').attr('href', baseUrl + "/" + domain +  listInfo.url + "/20/1"); // Get list page domain
      }
  }

function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return '../css/public/no-image.png';
  }
  return 'http://prod-sports-images.synapsys.us' + path;
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
