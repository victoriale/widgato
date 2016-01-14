var offset = 0;
var dataLength;
var curData;
var domain = '';
var clickyId = 0;
var remnant = '';
var max = 10;
var bord = false;
var link = "http://www.hoopsloyal.com";
var partner_link = "http://www.myhoopszone.com";
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
        }
    });

    $('.fcw-leftnav').on('click', function() {
        if (offset > 0 && $(this).data('dir') === 'prev') {
            dataCall(--offset);
        }else if(offset <= 0){
          offset = 0;
          dataCall(offset);
        }
    });

    $.get('//prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=ncaa&action=widgets&option=player_widget', function(data){
      curData = data;
      dataCall(offset);
    }, 'json');
  })//END OF FUNCTION

  function dataCall(index){
      var wData = curData.player_widget;
      var listData = wData.list_data;
      dataLength = listData.length;
      var title = (wData.list_title).replace('/','-').replace(/\s+/g, '-');
      var team_image = listData[index].team_firstname + ' ' + listData[index].team_lastname;
      team_image = team_image.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'').replace('amp;', '').replace('-',' ');
      var teamName = team_image.replace(/\s+/g, '-');
      team_image = team_image.replace(/ /g, '_');
      var player_url = listData[index].player_first_name+'-'+listData[index].player_last_name;
      var wid_title = (wData.list_title).replace('College Basketball', 'NCAAB');
      if(wid_title.indexOf('percentage') >= 0){
        wid_title = wid_title.replace('percentage', '%');
      }
      $('.fcw-t1').html(wid_title);
      $('.fcw-t2-title').html(listData[index].player_first_name + ' ' + listData[index].player_last_name + ',');
      $('.fcw-loc').html(listData[index].team_firstname + ' ' + listData[index].team_lastname);
      $('.fcw-image').css('background', 'url('+imageUrl(listData[index].player_img)+') no-repeat');
      $('.fcw-logo').css('background', 'url('+teamImage(team_image)+') no-repeat');
      $('.fcw-t2-num').html('#'+(index+1));
      if(listData[index].friendly_metric == 'Assist to Turnover Ratio'){
        listData[index].friendly_metric = 'Turnover Ratio';
      } else if(listData[index].friendly_metric == '3 Pointer Percentage'){
        listData[index].friendly_metric = '3-Pointer Percentage'
      }
      $('.fcw-content1').html(listData[index].formatted_metric + ' ' + (listData[index].friendly_metric).replace('Percentage', '%'));
      $('.fcw-content2').html('in the 2015 Season');

      if(remnant == 'true' || remnant == true){
        $('#title_link').attr('href',link+ "/NCAA/player/" + teamName + "/"+ player_url+ "/" + listData[index].PlayerId);
        $('.exec-link').attr('href',link+ "/NCAA/player/"+teamName+"/" + player_url + "/" + listData[index].PlayerId);
        $('#loc_link').attr('href',link + "/NCAA/team/" + teamName + "/" + listData[index].team_id);
        $('#teamProfile').attr('href',link + "/NCAA/team/" + teamName + "/" + listData[index].team_id);
        $('.fcw-href').attr('href',link + "/NCAA/player/" + title + "/" + wData.list_id+"/listview/1");
       } else {
        $('#title_link').attr('href',partner_link+ "/" + domain + "/NCAA/p/"+teamName+"/"+listData[index].player_last_name+'-'+listData[index].player_first_name+"/"+listData[index].PlayerId);
        $('.exec-link').attr('href',partner_link+ "/" + domain + "/NCAA/p/"+teamName+"/"+listData[index].player_last_name+'-'+listData[index].player_first_name+"/"+listData[index].PlayerId);
        $('#loc_link').attr('href',partner_link + "/NCAA/team/" + teamName + "/" + listData[index].team_id);
        $('#teamProfile').attr('href',partner_link + "/NCAA/team/" + teamName + "/" + listData[index].team_id);
        $('.fcw-href').attr('href',partner_link + "/" + domain + "/NCAA/player/" + title + "/list/" + wData.list_id+"/1");
      }
  }

function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return 'http://sports-images.synapsys.us:99/nba/players/headshots/no_player_icon.png';
  }
  return 'http://prod-sports-images.synapsys.us' + path;
}
function teamImage(tpath){
  return 'http://prod-sports-images.synapsys.us/ncaab/logos/NCAAB_'+ tpath + '_Logo.jpg';
}
