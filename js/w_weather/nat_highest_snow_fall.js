var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;
var link = "http://www.joyfulhome.com/";
var link_partner = "http://www.myhousekit.com/";
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
        if ($(this).data('dir') === 'next') {
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

    dataCall(offset);
  })//END OF FUNCTION
  function dataCall(index){
  	$.get('//apirt.synapsys.us/index.php?widget=national-weathers&wid=6&skip='+index+'&limit=1', function(data){
      var curData = data.widget;
      dataLength = curData.length;
      var title = "nat-highest-snow-fall-by-city";
      $('.fcw-t1').html('Cities in the U.S. with the Most Annual Snowfall');
      $('.fcw-t2-loc').html(curData[0].WeatherCity + ', ' + curData[0].WeatherState);
      $('.fcw-image').css('background', 'url('+imageUrl(curData[0].img)+') no-repeat');
      $('.fcw-img2').html('#'+(index+1));
      if(curData[0].WeatherAvgSnowFall == 1){
        $('.fcw-content1').html(curData[0].WeatherAvgSnowFall + ' Inch');
      } else if(curData[0].WeatherAvgSnowFall == 0 || curData[0].WeatherAvgSnowFall == null){
        $('.fcw-content1').html('0 Inches');
      } else{
        $('.fcw-content1').html(curData[0].WeatherAvgSnowFall + ' Inches');
      }
      $('.fcw-content2').html('Annual Snowfall');

      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+title+"/national/weathers");
        $('#loc').attr('href',link+"location/"+(curData[0].WeatherCity).toUpperCase()+"_"+curData[0].WeatherState);
        $('#imgUrl').attr('href',link+"location/"+(curData[0].WeatherCity).toUpperCase()+"_"+curData[0].WeatherState);
      } else {
        $('.fcw-href').attr('href',link_partner+domain+"/national/weathers/"+title);
        $('#loc').attr('href',link_partner+domain+"/loc/"+curData[0].WeatherState+"/"+(curData[0].WeatherCity).toUpperCase());
        $('#imgUrl').attr('href',link_partner+domain+"/loc/"+curData[0].WeatherState+"/"+(curData[0].WeatherCity).toUpperCase());
      }
    }, 'json')
  }

  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null' || path == 'http://apireal.synapsys.us/city-image/images/placeholder-location.jpg'){
      return '../css/public/no_image.jpg';
    }
    return path;
  }
