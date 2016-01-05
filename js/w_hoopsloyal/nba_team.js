var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;
var link = "http://www.hoopsloyal.com";
var partner_link = "http://www.myhoopszone.com";
//var link = "http://pnsports.synapsys.us";
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

    $.get('//prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=nba&action=widgets&option=team_widget', function(data){
      curData = data;
      dataCall(offset);
    }, 'json');
  })//END OF FUNCTION

  function dataCall(index){
      var wData = curData.team_widget;
      var listData = wData.list_data;
      dataLength = listData.length;
      var title = (wData.list_title).replace('/','-').replace(/\s+/g, '-');
      var team_image = listData[index].team_name;
      team_image = team_image.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'').replace('amp;', '').replace('-',' ');
      team_image = team_image.replace(/ /g, '_');
      var w_value = listData[index][wData.list_metric];
      var teamName = (listData[index].team_name).replace(/\s+/g, '-');
      $('.fcw-t1').html(wData.list_title);
      $('.fcw-t2-title').html(listData[index].team_name);
      $('.fcw-loc').html(listData[index].player_position);
      $('.fcw-image').css('background', 'url('+teamImage(team_image)+') no-repeat');
      $('.fcw-t2-num').html('#'+(index+1));
      $('.fcw-content1').html(listData[index].formatted_metric + ' ' + listData[index].friendly_metric);
      $('.fcw-content2').html('in the 2015 Season');

      if(remnant == 'true' || remnant == true){
        $('#title_link').attr('href',link + "/NBA/team/" + teamName + "/" + listData[index].TeamID);
        $('.exec-link').attr('href',link + "/NBA/team/" + teamName + "/" + listData[index].TeamID);
        $('.fcw-href').attr('href',link + "/NBA/team/" + title + "/" + wData.list_id + "/listview/1");
      } else {
        $('#title_link').attr('href',partner_link + "/" + domain + "/NBA/t/" + teamName + "/" + listData[index].TeamID);
        $('.exec-link').attr('href',partner_link + "/" + domain + "/NBA/t/" + teamName + "/" + listData[index].TeamID);
        $('.fcw-href').attr('href',partner_link + "/" + domain + "/NBA/team/" + title + "/list/" + wData.list_id + "/1");
      }
  }

function teamImage(tpath){
  return 'http://prod-sports-images.synapsys.us/nba/logos/NBA_'+ tpath + '_Logo.jpg';
}
