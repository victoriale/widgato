var offset = 0;
var dataLength;
var curData;
var domain = '';
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
    $.get('//prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=nba&action=widgets&option=player_widget', function(data){
      curData = data;
      dataCall(offset);
    }, 'json');
  })//END OF FUNCTION

  function dataCall(index){
      var wData = curData.player_widget;
      var listData = wData.list_data;
      dataLength = listData.length;
      // Title to go to list pages
      var title = (wData.list_title).replace('/','-').replace(/\s+/g, '-');
      // Get Team name for linking purposes
      var team_image = listData[index].team_name;
      var player_url = listData[index].first_name+'-'+listData[index].last_name;
      var par_player_url = listData[index].last_name+'-'+listData[index].first_name;
      team_image = team_image.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'').replace('amp;', '').replace('-',' ');
      team_image = team_image.replace(/ /g, '_');
      var teamName = (listData[index].team_name).replace(/\s+/g, '-');
      $('.fcw-t1').html(wData.list_title);
      $('.fcw-t2-title').html(listData[index].first_name  + ' ' + listData[index].last_name + ',' );
      $('.fcw-loc').html(listData[index].team_name);
      $('.fcw-image').css('background', 'url('+imageUrl(listData[index].player_img)+') no-repeat');
      $('.fcw-logo').css('background', 'url('+teamImage(team_image)+') no-repeat');
      $('.fcw-t2-num').html('#'+(index+1));
      // var w_value = listData[index][wData.list_metric];
      if(listData[index].friendly_metric == 'Assist to Turnover Ratio'){
        listData[index].friendly_metric = 'Turnover Ratio';
      } else if(listData[index].friendly_metric == '3 Pointer Percentage'){
        listData[index].friendly_metric = '3-Pointer Percentage'
      }
      $('.fcw-content1').html(listData[index].formatted_metric + ' ' + (listData[index].friendly_metric).replace('Percentage', '%'));
      $('.fcw-content2').html('in the 2015 Season');

      if(remnant == 'true' || remnant == true){
        // go to player profile
        $('#title_link').attr('href',link+ "/NBA/player/" + teamName + "/" + player_url + "/" + listData[index].person_id);
        // go to player profile
        $('.exec-link').attr('href',link+"/NBA/player/" + teamName + "/" + player_url + "/" + listData[index].person_id);
        // go to team profile
        $('#teamProf').attr('href',link + "/NBA/team/" + teamName + "/" + listData[index].team_id);
        $('#teamProfile').attr('href',link + "/NBA/team/" + teamName + "/" + listData[index].team_id);
        $('.fcw-href').attr('href',link + "/NBA/player/" + title + "/" + wData.list_id + "/listview/1");
      } else {
        $('#title_link').attr('href',partner_link+ "/" + domain + "/NBA/p/"+teamName+"/"+par_player_url+"/"+listData[index].person_id);
        $('.exec-link').attr('href',partner_link+ "/" + domain + "/NBA/p/"+teamName+"/"+par_player_url+"/"+listData[index].person_id);
        $('#teamProf').attr('href',partner_link + "/" + domain + "/NBA/t/" + teamName + "/" + listData[index].team_id);
        $('#teamProfile').attr('href',partner_link + "/" + domain + "/NBA/t/" + teamName + "/" + listData[index].team_id);
        $('.fcw-href').attr('href',partner_link + "/" + domain + "/NBA/player/" + title + "/list/" + wData.list_id+"/1");
      }
  }

function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return 'http://prod-sports-images.synapsys.us/nba/players/headshots/no_player_icon.png';
  }
  return 'http://prod-sports-images.synapsys.us' + path;
}

function teamImage(tpath){
  return 'http://prod-sports-images.synapsys.us/nba/logos/NBA_'+ tpath + '_Logo.jpg';
}
