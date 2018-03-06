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
  	$.get('//apirt.synapsys.us/index.php?widget=national-crime&wid=6&skip='+index+'&limit=1', function(data){
      var curData = data.widget;
      dataLength = curData.length;
      var title = "nat-least-vehicle-theft-by-city";
      $('.fcw-t1').html('Cities in the U.S. with the Least Auto Thefts');
      $('.fcw-t2-loc').html(curData[0].CrimeCity+', '+curData[0].CrimeState);
      $('.fcw-img2').html('#'+(index+1));
      if(curData[0].CrimeMotorVehicleTheftNumber <= 1){
        $('.fcw-content1').html(curData[0].CrimeMotorVehicleTheftNumber+' Stolen Vehicle');
      } else {
        $('.fcw-content1').html(curData[0].CrimeMotorVehicleTheftNumber+' Stolen Vehicles');
      }
      if(curData[0].CrimeYear == null || typeof curData[0].CrimeYear == 'undefined'){
        $('.fcw-content2').html('In 2014');
      } else {
        $('.fcw-content2').html('In ' + curData[0].CrimeYear);
      }
      $('.fcw-image').css('background', 'url('+imageUrl(curData[0].img)+') no-repeat');

      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+title+"/national/crimes");
        $('#loc').attr('href',link+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+curData[0].CrimeState);
        $('#imgUrl').attr('href',link+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+curData[0].CrimeState);
      } else {
        $('.fcw-href').attr('href',link_partner+domain+"/national/crimes/"+title);
        $('#loc').attr('href',link_partner+domain+"/loc/"+curData[0].CrimeState+"/"+(curData[0].CrimeCity).toUpperCase());
        $('#imgUrl').attr('href',link_partner+domain+"/loc/"+curData[0].CrimeState+"/"+(curData[0].CrimeCity).toUpperCase());
      }

    }, 'json')
  }

  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null' || path == 'http://apireal.synapsys.us/city-image/images/placeholder-location.jpg'){
      var image_array = new Array();
      var x = Math.floor((Math.random() * 4) + 1);
      image_array['0'] = '../css/public/nophoto1.png';
      image_array['1'] = '../css/public/nophoto2.png';
      image_array['2'] = '../css/public/nophoto3.png';
      image_array['3'] = '../css/public/nophoto4.png';
      image_array['4'] = '../css/public/nophoto5.png';
      return image_array[x];
    }
    return path;
  }
