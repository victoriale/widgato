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
        if (offset < dataLength-1 && $(this).data('dir') === 'next') {
            dataCall(++offset);
        }else if(offset >= dataLength-1){
          offset = 0;
          dataCall(offset);
        }
    });
    $('.fcw-leftnav').on('click', function() {
        if (offset > 0 && $(this).data('dir') === 'prev') {
              dataCall(--offset);
        }else if(offset <= 0){
          offset = dataLength-1;
          dataCall(offset);
        }
    });

  	$.get('http://api.synapsys.us/rt/index.php?widget=politics&wid=5&county=Sedgwick&state=KS', function(data){
      curData = data.widget;
      dataLength = curData.length;
      dataCall(offset);
    }, 'json')
  })//END OF FUNCTION
  function dataCall(index){
    var link ="http://www.myhousekit.com/";
    var title = "counties-with-the-most-democratic-voters";
    $('.fcw-t2-loc').html(curData[index].county+' County, '+curData[index].state);
    $('.fcw-content1').html(dNumberToCommaNumber(curData[index].votes)+' Votes');
    $('.fcw-image').css('background', 'url('+curData[index].image+') no-repeat');
    if(remnant == 'true' || remnant == true){
      $('.fcw-href').attr('href',link+title+"/"+curData[index].state+"/"+curData[index].county+"/politics");
      $('#loc').attr('href',link+curData[index].state+"/"+curData[index].county+"/county");
      $('#county').attr('href',link+curData[index].state+"/"+curData[index].county+"/county");
    } else {
      $('.fcw-href').attr('href',link+domain+"/"+title+"/"+curData[index].state+"/"+curData[index].county+"/politics");
      $('#loc').attr('href',link+domain+"/"+curData[index].state+"/"+curData[index].county+"/county");
      $('#county').attr('href',link+domain+"/"+curData[index].state+"/"+curData[index].county+"/county");
    }

  }
  //number converter to decimal with correct format
  function nFormatter(num) {
  	if (num >= 1000000000) {
  		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' B';
  	}
  	if (num >= 1000000) {
  		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
  	}
  	if (num >= 1000) {
  		return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
  	}
  	return num;
  }
  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
      return '../css/public/no_image.jpg';
    }
    return 'http://images.investkit.com/images/' + path;
  }
	//puts comma on every thousand number
function dNumberToCommaNumber(Number) {
	  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
