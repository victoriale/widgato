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

  	var script_tag = document.createElement('script');
  	script_tag.setAttribute('src','//static.getclicky.com/js');
  	document.head.appendChild(script_tag);
  	var clicks = $('<script>try{ clicky.init('+clickyId+'); }catch(e){}</script>');
  	document.head.appendChild(clicks[0]);
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
      if(remnant == 'true' || remnant === true){
        $.get("//apireal.synapsys.us/listhuv/?action=get_remote_addr2",function(r_data){
          city = r_data[0].city;
          state = r_data[0].state;
          dataCall(offset);
        });
      }
    }else{
      dataCall(offset);
    }
  })//END OF FUNCTION

  function dataCall(index){
    $.get('http://api.synapsys.us/rt/index.php?widget=crime&wid=4&city='+city+'&state='+state, function(data){
      var link = "http://www.joyfulhome.com/";
      var link_partner = "http://www.myhousekit.com/";
      var curData = data.widget;
      var dataLength = curData.length;
      var title = "violent-crime-by-city";
      $('.fcw-t1').html(curData[0].CrimeState + ' Cities with the Worse Property Damage Chances ');
      $('.fcw-t2-loc').html(curData[0].CrimeCity+', '+curData[0].CrimeState);
      $('.fcw-img2').html('#'+(index+1));
      $('.fcw-content1').html(Number(curData[0].CrimePropertyCrimeNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' out of ' + Number(curData[0].CrimePropertyCrimeNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('.fcw-content2').html('Experience Property Crime');
      $('.fcw-image').css('background', 'url('+curData[0].image+') no-repeat');

      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+title+"/"+curData[0].CrimeState+"/"+curData[0].CrimeCity+"/crimes");
        $('#loc').attr('href',link+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+(curData[0].CrimeStat)).toUpperCase();
        $('#link_vw_prof').attr('href',link+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+(curData[0].CrimeStat)).toUpperCase();
      } else {
        $('.fcw-href').attr('href',link_partner+domain+title+"/"+curData[0].CrimeState+"/"+curData[0].CrimeCity+"/crimes");
        $('#loc').attr('href',link_partner+domain+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+(curData[0].CrimeStat)).toUpperCase();
        $('#link_vw_prof').attr('href',link_partner+domai+"location/"+(curData[0].CrimeCity).toUpperCase()+"_"+(curData[0].CrimeStat)).toUpperCase();
      }
    }, 'json')
  }

  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
      return '../css/public/no_image.jpg';
    }
    return 'http://images.investkit.com/images/' + path;
  }
