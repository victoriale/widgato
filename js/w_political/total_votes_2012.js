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
    //set the query data from database to global variable to use
    domain = query.dom;
    remnant = query.remn;
    switch (domain){
      case ('att.yahoo.com'):
        break;
      default:
      locName = query['loc']['loc_name'];

      if(locName != null && typeof locName != 'undefined' && locName != ''){
        locName = locName.replace(/\+/g, ' ');
      }
      //makes a check to see if data is being returned from parter
      if(city != null && city != '' && typeof city != 'undefined' && state != null && state != '' && typeof state != 'undefined'){
        city = query['loc']['loc_id']['city'];

        state = query['loc']['loc_id']['state'];
      }

      //if partner database has absolutely nothing and it is a brand new partner
      if(query['loc']['loc_id'] == null || typeof query['loc']['loc_id'] == undefined || query['loc']['loc_id'] == ''){
        query['loc']['loc_id'] = {};
        query['loc']['loc_id']['city'] = null;
        query['loc']['loc_id']['state'] = null;
        city = query['loc']['loc_id']['city'];
        state = query['loc']['loc_id']['state'];
      }else{
        city = query['loc']['loc_id']['city'];
        state = query['loc']['loc_id']['state'];
      }
    }
    //returns string true or false
    bord = query.bord;

  	}

  	if(bord == 'true'){
  		$(".re_w_list").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
  	}


    $('.tv-rightnav').on('click', function() {
        if ($(this).data('dir') === 'next') {
            dataCall(++offset);
        }
    });
    $('.tv-leftnav').on('click', function() {
        if (offset > 0 && $(this).data('dir') === 'prev') {
              dataCall(--offset);
        }else if(offset < 0){
          offset = 0;
          dataCall(offset);
        }
    });
    if(city == '' || city == null || typeof city == 'undefined' || state == '' || state == null || typeof state == 'undefined'){
      if(remnant == 'true' || remnant === true){
        $.get("//w1.synapsys.us/get-remote-addr2/",function(r_data){
          city = r_data[0].city;
          state = r_data[0].state;

          //transforms title to add in state
          var title = $('.tv-t1').html();
          title = title.split(' ');
          title.splice(1,0,state);
          $('.tv-t1').html(title.join(' '));
          dataCall(offset);
        });
      }else{
        //partner with no data same thing as if statement but doing this just in case
        $.get("//w1.synapsys.us/get-remote-addr2/",function(r_data){
          city = r_data[0].city;
          state = r_data[0].state;

          //transforms title to add in state
          var title = $('.tv-t1').html();
          title = title.split(' ');
          title.splice(1,0,state);
          $('.tv-t1').html(title.join(' '));
          dataCall(offset);
        });
      }
    }else{
      //transforms title to add in state
      var title = $('.tv-t1').html();
      title = title.split(' ');
      title.splice(1,0,state);
      $('.tv-t1').html(title.join(' '));
      dataCall(offset);
    }
  })//END OF FUNCTION
  function dataCall(index){
  	$.get('//apirt.synapsys.us/index.php?widget=politics&wid=1&city='+city+'&state='+state+'&skip='+index+'&limit=1', function(data){
      curData = data.widget;
      dataLength = curData.length;
      var title = "counties-with-the-most-total-votes-in-the-2012-election";
      $('.tv-img2').html('#'+(index+1));
      $('.tv-t2-loc').html(curData[0].county+' County, '+curData[0].state);
      $('.tv-content1').html(dNumberToCommaNumber(curData[0].votes)+' Votes');
      $('.tv-image').css('background', 'url('+imageUrl(curData[0].img)+') no-repeat');

      if(remnant == 'true' || remnant == true){
        $('.tv-href').attr('href',"http://www.joyfulhome.com/"+title+"/"+curData[0].state+"/"+curData[0].county+"/politics");
        $('#loc').attr('href',"http://www.joyfulhome.com/"+curData[0].state+"/"+curData[0].county+"/county");
        $('#county').attr('href',"http://www.joyfulhome.com/"+curData[0].state+"/"+curData[0].county+"/county");
      } else {
        $('.tv-href').attr('href',"http://www.myhousekit.com/"+domain+"/politics/"+title+"/"+curData[0].state+"/"+curData[0].county);
        $('#loc').attr('href',"http://www.myhousekit.com/"+domain+"/county/"+curData[0].state+"/"+curData[0].county);
        $('#county').attr('href',"http://www.myhousekit.com/"+domain+"/county/"+curData[0].state+"/"+curData[0].county);
      }
    }, 'json')
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
    return path;
  }

	//puts comma on every thousand number
function dNumberToCommaNumber(Number) {
	  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
