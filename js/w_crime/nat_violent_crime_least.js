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
$(function(){
  var temp = location.search;
  var query = {};

  if(temp != null){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));

    //set the query data from database to global variable to use
    domain = query.dom;

    remnant = query.remn;

    clickyId = query.c_id;

    locName = query['loc']['loc_name'];

    locName = locName.replace('+',' ');

    city = query['loc']['loc_id']['city'];

  	state = query['loc']['loc_id']['state'];
    //returns string true or false
    bord = query.bord;
		/*
		//Same as domain = query.dom  but if that doesnt work this should work so USE [loc] global variable
		//USE BOTTOM ONCE WE IMPLEMENT MULTIPLE CITIES INTO LIST PAGE
		for(var i = 0; i < query['loc']['loc']['city'].length; i++){
			var c = query['loc']['loc']['city'][i].city;
			var s = query['loc']['loc']['city'][i].state;
			loc = loc + c + "," + s;
			if (typeof query['loc']['loc']['city'][i+1] != 'undefined'){
				loc += '|';
			}
		}
		*/
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
      $.get("//apireal.synapsys.us/listhuv/?action=get_remote_addr2",function(r_data){
          city = r_data[0].city;
          state = r_data[0].state;
          dataCall(offset);
      });
    }else{
      dataCall(offset);
    }
  })//END OF FUNCTION

  function dataCall(index){
    $.get('//apirt.synapsys.us/index.php?widget=national-crime&wid=5&city='+city+'&state='+state+'&skip='+index+'&limit=1', function(data){
      var link = "http://www.joyfulhome.com/";
      var link_partner = "http://www.myhousekit.com/";
      var curData = data.widget;
      var dataLength = curData.length;
      var title = "nat-least-violent-crime-by-city";
      $('.fcw-t1').html('Cities with the Least Violent Crimes in the U.S.');
      $('.fcw-t2-loc').html(curData[0].CrimeCity+', '+curData[0].CrimeState);
      $('.fcw-image').css('background', 'url('+imageUrl(curData[0].img)+') no-repeat');
      $('.fcw-img2').html('#'+(index+1));
      if(curData[0].CrimeViolentNumber <= 1){
        $('.fcw-content1').html((curData[0].CrimeViolentNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Violent Crime');
      } else {
        $('.fcw-content1').html((curData[0].CrimeViolentNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Violent Crimes');
      }
      if(curData[0].CrimeYear == null || typeof curData[0].CrimeYear == 'undefined'){
        $('.fcw-content2').html('In 2014');
      } else {
        $('.fcw-content2').html('In ' + curData[0].CrimeYear);
      }

      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+title+"/"+curData[0].CrimeState+"/national/crimes");
        $('#loc').attr('href',link+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+curData[0].CrimeState);
        $('#imgUrl').attr('href',link+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+curData[0].CrimeState);
      } else {
        $('.fcw-href').attr('href',link_partner+domain+"/national/crimes/"+title+"/"+curData[0].CrimeState);
        $('#loc').attr('href',link_partner+domain+"/loc/"+curData[0].CrimeState+"/"+(curData[0].CrimeCity).toUpperCase());
        $('#imgUrl').attr('href',link_partner+domain+"/loc/"+curData[0].CrimeState+"/"+(curData[0].CrimeCity).toUpperCase());
      }
    }, 'json')
  }

  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
      return '../css/public/no_image.jpg';
    }
    return path;
  }
