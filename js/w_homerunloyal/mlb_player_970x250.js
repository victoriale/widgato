var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;
var protocolToUse = (location.protocol == "https:") ? "https" : "http";
var link = protocolToUse+"://www.homerunloyal.com/";
var link_partner = protocolToUse+"://www.homerunzone.com/";
var apiUrl = protocolToUse+'://dev-homerunloyal-api.synapsys.us/';
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
      if(listData[index].stat == 1){
        dataValue = listInfo.nouns[0];
      } else {
        dataValue = listInfo.nouns[1];
      }
      if(typeof listInfo.seasonId == 'undefined'){
        listInfo.seasonId = '2016';
      }
      $('.fcw-t1').html(toTitleCase(listInfo.name));
      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-image').css('background', 'url('+imageUrl(listData[index].imageUrl)+') no-repeat');
      $('.fcw-logo').css('background', 'url('+imageUrl(listData[index].teamLogo)+') no-repeat');
      $('#title_link').html(listData[index].playerName);
      $('#teamProf').html(listData[index].teamName);
      $('#locName').html(listData[index].teamCity + ', ' + fullstate(listData[index].teamState));
      $('.fcw-content1').html(Math.round(dataPt * 100)/100 + ' ' + capitalizeFirstLetter(dataValue));
      $('.fcw-content2').html(listInfo.seasonId + ' Season');
      $('.fcw-presentedby').html('MLB TOP PLAYER - PRESENTED BY');


      if(remnant == 'true' || remnant == true){
        //TODO
        $('.fcw-icon').attr('href', link);
        $('.exec-link').attr('href', link);
        $('#teamProfile').attr('href', link);
        $('#title_link').attr('href', link);
        $('#teamProf').attr('href', link);
        $('#fcw-content2a').attr('href', link);
        $('.fcw-href').attr('href', link);
      } else {
        //TODO
        $('.fcw-icon').attr('href', link_partner);
        $('.exec-link').attr('href', link_partner);
        $('#teamProfile').attr('href', link_partner);
        $('#title_link').attr('href', link_partner);
        $('#teamProf').attr('href', link_partner);
        $('#fcw-content2a').attr('href', link_partner);
        $('.fcw-href').attr('href', link_partner);
      }
  }
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return 'http://prod-sports-images.synapsys.us/nba/players/headshots/no_player_icon.png';
  }
  return 'http://prod-sports-images.synapsys.us' + path;
}
function toTitleCase(str){
  if ( str === undefined || str === null || str == 'ERA') {
    return str;
  }
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
function fullstate(state){
  var stateName = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona':'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'District of Columbia':'DC',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Lousiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Ontario': 'ON',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  };
  return stateName[state];
}
