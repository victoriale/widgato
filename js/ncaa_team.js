var offset = 0;
var dataLength;
var curData;

var domain = '';
var clickyId = 0;
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;
var link = "http://pnsports.synapsys.us";
//var link = "http://localhost:3000";
$(function(){

  var temp = location.search;
  var query = {};

  if(temp != null){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
    clickyId = query.c_id;
    locName = query['loc']['loc_name'];
    locName = locName.replace('+',' ');
    city = query['loc']['loc_id']['city'];
  	state = query['loc']['loc_id']['state'];
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

    // if(city == null || typeof city == 'undefined' || state == null || typeof state == 'undefined'){
    //   if(remnant == 'true' || remnant === true){
    //     $.get("http://apireal.synapsys.us/listhuv/?action=get_remote_addr2",function(r_data){
    //       city = r_data[0].city;
    //       state = r_data[0].state;
    //       dataCall(offset);
    //     });
    //   }
    // }else{
    //   dataCall(offset);
    // }

    $.get('//apisports.synapsys.us:91/NBAHoops/call_controller.php?scope=ncaa&action=widgets&option=team_widget', function(data){
      curData = data;
      dataCall(offset);
    }, 'json');
  })//END OF FUNCTION

  function dataCall(index){
      var wData = curData.team_widget;
      var listData = wData.list_data;
      dataLength = listData.length;
      var title = (wData.list_title).replace(/\s+/g, '-');
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
        $('#title_link').attr('href',link + "/NCAA/team/" + teamName + "/" + listData[index].TeamID);
        $('.exec-link').attr('href',link + "/NCAA/team/" + teamName + "/" + listData[index].TeamID);
        $('.fcw-href').attr('href',link + "/NCAA/team/" + title + "/" + wData.list_id + "/listview/1");
      } else {
        $('#title_link').attr('href',link + "/" + domain + "/NCAA/t/" + teamName + "/" + listData[index].TeamID);
        $('.exec-link').attr('href',link + "/" + domain + "/NCAA/t/" + teamName + "/" + listData[index].TeamID);
        $('.fcw-href').attr('href',link + "/" + domain + "/NCAA/team/" + title + "/list/" + wData.list_id + "/1");
      }
  }

function teamImage(tpath){
  return 'http://sports-images.synapsys.us:99/ncaab/logos/NCAAB_'+ tpath + '_Logo.jpg';
}
