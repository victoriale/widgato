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
    $.get(apiUrl+'randomList/player/25/1', function(data){
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
      $('.fcw-t1').html(listInfo.name);
      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-image').css('background', 'url('+imageUrl(listData[index].imageUrl)+') no-repeat');
      $('.fcw-logo').css('background', 'url('+imageUrl(listData[index].teamLogo)+') no-repeat');
      $('.fcw-content1').html(listData[index].playerName);
      $('#fcw-content2a').html(listData[index].teamLastName);
      $('#fcw-content2b').html(listData[index].teamCity + ', ' + abbrState(listData[index].teamState));

      if(listData[index].stat == 1){
        dataValue = listInfo.nouns[0];
      } else {
        dataValue = listInfo.nouns[1];
      }

      if(typeof listInfo.seasonId == 'undefined'){
        listInfo.seasonId = '2016';
      }
      $('.fcw-content3').html(Math.round(dataPt * 100)/100 + ' ' + dataValue + ' for ' + listInfo.seasonId);

      if(remnant == 'true' || remnant == true){
        //TODO
        $('.fcw-icon').attr('href', link);
        $('.exec-link').attr('href', link);
        $('#teamProfile').attr('href', link);
        $('#playerUrl').attr('href', link);
        $('#fcw-content2a').attr('href', link);
        $('.fcw-href').attr('href', link);
      } else {
        //TODO
        $('.fcw-icon').attr('href', link_partner);
        $('.exec-link').attr('href', link_partner);
        $('#teamProfile').attr('href', link_partner);
        $('#playerUrl').attr('href', link_partner);
        $('#fcw-content2a').attr('href', link_partner);
        $('.fcw-href').attr('href', link_partner);
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
