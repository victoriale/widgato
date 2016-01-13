var offset = 0;
var dataLength;
var curData;

var domain = '';

var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;

$(function(){

  var temp = location.search;
  var query = {};

  if(temp != null){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
    
    locName = query['loc']['loc_name'];
    locName = locName.replace(/\+/g, ' ');
    city = query['loc']['loc_id']['city'];
  	state = query['loc']['loc_id']['state'];
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

    if(city == null || typeof city == 'undefined' || state == null || typeof state == 'undefined'){
      $.get("//w1.synapsys.us/get-remote-addr2/",function(r_data){
          city = r_data[0].city;
          state = r_data[0].state;
          dataCall(offset);
      });
    }else{
      dataCall(offset);
    }
  })//END OF FUNCTION
  function dataCall(index){
  	$.get('//apirt.synapsys.us/index.php?widget=national-weathers&wid=7&city='+city+'&state='+state+'&skip='+index+'&limit=1', function(data){
      var link = "http://www.joyfulhome.com/";
      var link_partner = "http://www.myhousekit.com/";
      var curData = data.widget;
      var popData = curData[0].population;
      dataLength = curData.length;
      var title = "nat-highest-wind-spd-by-city";
      $('.fcw-t1').html('Cities with the Highest Average Wind Speed in the U.S.');
      $('.fcw-t2-loc').html(curData[0].WeatherCity + ', ' + curData[0].WeatherState);
      $('.fcw-img2').html('#'+(index+1));
      $('.fcw-content1').html(curData[0].WeatherWindSpeed + ' Miles Per Hour');
      var pop = Number(popData.population).toFixed(0);
      $('.fcw-content2').html('Pop. of ' + pop.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('.fcw-image').css('background', 'url('+imageUrl(imageUrl(curData[0].img))+') no-repeat');

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
