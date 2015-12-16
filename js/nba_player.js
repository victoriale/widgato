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
var link = "http://pnsports.synapsys.us/";
var link_partner = "http://localhost:3000/";
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

  	// var script_tag = document.createElement('script');
  	// script_tag.setAttribute('src','//static.getclicky.com/js');
  	// document.head.appendChild(script_tag);
  	// var clicks = $('<script>try{ clicky.init('+clickyId+'); }catch(e){}</script>');
  	// document.head.appendChild(clicks[0]);
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

    $.get('http://apisports.synapsys.us:91/NBAHoops/call_controller.php?scope=nba&action=widgets&option=team_widget', function(data){
      curData = data;
      dataCall(offset);
    }, 'json');
  })//END OF FUNCTION

  function dataCall(index){
      var wData = curData.team_widget;
      console.log(wData);
      console.log(wData.list_metric);
      var listData = wData.list_data;
      console.log(listData);
      dataLength = listData.length;
      console.log(dataLength);
      var title = "nba-team-top-lists";
      var teamName = spaceToHypen(listData.team_name);
      console.log(teamName);
      var w_value = listData[index][wData.list_metric];
      console.log(w_value);
      $('.fcw-t1').html(wData.list_title);
      $('.fcw-t2-loc').html(listData[index].team_name);
      $('.fcw-img2').html('#'+(index+1));
      $('.fcw-content1').html(Number(w_value).toFixed(2) +'%');
      $('.fcw-content2').html('In 2015');
      //$('.fcw-image').css('background', 'url('+curData[0].img+') no-repeat');

      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+"/NBA/"+title+"/team");
        $('#loc').attr('href',link+"/NBA/team/"+listData.team_name+"/"+listData[index].TeamID);
        $('#imgUrl').aattr('href',link+"/NBA/team/"+listData.team_name+"/"+listData[index].TeamID);
      } else {
        $('.fcw-href').attr('href',link_partner+domain+"/NBA/team/"+title);
        $('#loc').attr('href',link_partner+domain+"/NBA/t/"+listData.team_name+"/"+listData[index].TeamID);
        $('#imgUrl').attr('href',link_partner+domain+"/NBA/t/"+listData.team_name+"/"+listData[index].TeamID);
      }
  }

function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return '../css/public/no_image.jpg';
  }
  return path;
}
function spaceToHypen(str) {
  if ( typeof str == "undefined" || str == null || typeof str != "string" ) {
    return '';
  }
  return str.replace(/(,|\.|&|\*)/g,'').replace(/ /g,'-').replace(/\//g,'_').replace(/%20/g,'-');
}
