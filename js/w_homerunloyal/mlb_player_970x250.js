var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;

var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var apiUrl = protocolToUse+'dev-homerunloyal-api.synapsys.us/'; //TODO: API Domain Name
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
    // Example Url: http://dev-homerunloyal-api.synapsys.us/randomList/player/25/1
    $.get(apiUrl+'randomList/player/20/1', function(data){
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
      var playerNameUrl = toLowerKababCase(listData[index].playerName);
      if(listData[index].stat == 1){
        dataValue = listInfo.nouns[0];
      } else {
        dataValue = listInfo.nouns[1];
      }
      // Check if no seasonId then return current year
      if(typeof listInfo.season == 'undefined'){
        listInfo.season = new Date().getFullYear();
      }
      $('.fcw-t1').html(listInfo.name);
      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-image').css('background', 'url('+imageUrl(listData[index].imageUrl)+') no-repeat');
      $('.fcw-logo').css('background', 'url('+imageUrl(listData[index].teamLogo)+') no-repeat');
      $('#title_link').html(listData[index].playerName);
      $('#teamProf').html(listData[index].teamName);
      $('#locName').html(listData[index].teamCity + ', ' + abbrState(listData[index].teamState));
      $('.fcw-content1').html(Math.round(dataPt * 100)/100 + ' ' + dataValue);
      $('.fcw-content2').html(listInfo.season + ' Season');
      $('.fcw-presentedby').html('MLB TOP PLAYER - PRESENTED BY');

      if(remnant == 'true' || remnant == true){
        $('.fcw-icon').attr('href', baseUrl); //Top Left Icon - link to Home Page
        $('.exec-link').attr('href', baseUrl + "/player/" + teamNameUrl + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#teamProfile').attr('href', baseUrl + "/team/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('#title_link').attr('href', baseUrl + "/player/" + teamNameUrl + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#teamProf').attr('href', baseUrl + "/team/" + teamNameUrl + "/" + listData[index].teamId); // Get teamUrl
        $('.fcw-href').attr('href', baseUrl + listInfo.url + "/20/1"); // Get list page url
      } else {
        $('.fcw-icon').attr('href', baseUrl+"/"+ domain); //Top Left Icon - link to Partner Home Page
        $('.exec-link').attr('href', baseUrl + "/" + domain + "/p/" + teamNameUrl + "/" + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#teamProfile').attr('href', baseUrl + "/" + domain + "/t/" + teamNameUrl + "/" + listData[index].teamId);// Get teamUrl
        $('#title_link').attr('href', baseUrl + "/" + domain + "/p/" + teamNameUrl + "/" + playerNameUrl + "/" + listData[index].playerId); // Get playerUrl
        $('#teamProf').attr('href', baseUrl + "/" + domain + "/t/" + teamNameUrl + "/" + listData[index].teamId);// Get teamUrl
        $('.fcw-href').attr('href', baseUrl + "/" + domain +  listInfo.url + "/20/1");
      }
  }

function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return 'http://prod-sports-images.synapsys.us/nba/players/headshots/no_player_icon.png';
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
