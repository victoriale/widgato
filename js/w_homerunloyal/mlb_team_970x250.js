//will need to update when api is ready
var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;
var link = "http://www.homerunloyal.com";
var partner_link = "http://www.homerunzone.com";
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
    //will need to update when api is ready, using nba api
    $.get('http://prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=nba&action=widgets&option=player_widget', function(data){
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
      $('.fcw-t1').html("Top teams with the highest [Baseball Data Point] for the [YYYY] season.");
      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-image').css('background', 'url('+imageUrl(listData[index].player_img)+') no-repeat');
      $('.fcw-logo').css('background', 'url('+teamImage(team_image)+') no-repeat');
      $('#team_name').html("[Team Name]");
      $('#teamProf').html("[Stadium Name]");
      $('#location_link').html("[Location]");
      $('.fcw-content1').html("[Data Point]");
      $('.fcw-content2').html('[Data Point Description]');
      $('.fcw-presentedby').html('MLB TOP TEAM - PRESENTED BY');

      if(remnant == 'true' || remnant == true){
        $('.fcw-icon').attr('href',link);
        $('#team_name').attr('href',link+ "/NBA/player/" + teamName + "/" + player_url + "/" + listData[index].person_id);
        $('.exec-link').attr('href',link+"/NBA/player/" + teamName + "/" + player_url + "/" + listData[index].person_id);
        $('#teamProf').attr('href',link + "/NBA/team/" + teamName + "/" + listData[index].team_id);
        $('#teamProfile').attr('href',link + "/NBA/team/" + teamName + "/" + listData[index].team_id);
        $('.fcw-href').attr('href',link + "/NBA/player/" + title + "/" + wData.list_id + "/listview/1");
      } else {
        $('.fcw-icon').attr('href',partner_link + "/" + domain);
        $('#team_name').attr('href',partner_link+ "/" + domain + "/NBA/p/"+teamName+"/"+par_player_url+"/"+listData[index].person_id);
        $('.exec-link').attr('href',partner_link+ "/" + domain + "/NBA/p/"+teamName+"/"+par_player_url+"/"+listData[index].person_id);
        $('#teamProf').attr('href',partner_link + "/" + domain + "/NBA/t/" + teamName + "/" + listData[index].team_id);
        $('#teamProfile').attr('href',partner_link + "/" + domain + "/MLB/t/" + teamName + "/" + listData[index].team_id);
        $('.fcw-href').attr('href',partner_link + "/" + domain + "/MLB/player/" + title + "/list/" + wData.list_id+"/1");
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
