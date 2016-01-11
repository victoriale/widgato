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

    locName = query['loc']['loc_name'];

    locName = locName.replace('+',' ');

    city = query['loc']['city'];

  	state = query['loc']['state'];
    //returns string true or false
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
      if(remnant == 'true' || remnant === true){
        $.get("//w1.synapsys.us/get-remote-addr2/",function(r_data){
          city = r_data[0].city;
          state = r_data[0].state;
          //transforms title to add in state
          var title = $('.fcw-t1').html();
          title = title.split(' ');
          title.splice(1,0,state);
          $('.fcw-t1').html(title.join(' '));
          dataCall(offset);
        });
      }else{
        //partner with no data same thing as if statement but doing this just in case
        $.get("http://w1.synapsys.us/get-remote-addr2/",function(r_data){
          city = r_data[0].city;
          state = r_data[0].state;

          //transforms title to add in state
          var title = $('.fcw-t1').html();
          title = title.split(' ');
          title.splice(1,0,state);
          $('.fcw-t1').html(title.join(' '));
          dataCall(offset);
        });
      }
    }else{
      //transforms title to add in state
      var title = $('.fcw-t1').html();
      title = title.split(' ');
      title.splice(1,0,state);
      $('.fcw-t1').html(title.join(' '));
      dataCall(offset);
    }
  })//END OF FUNCTION

  function dataCall(index){
  	$.get('http://apirt.synapsys.us/index.php?widget=politics&wid=3&city='+city+'&state='+state+'&page-list=1&city-list=1&page-list=1&skip='+index+'&limit=1', function(data){
      var link = "http://www.joyfulhome.com/";
      var county = data.county;
      curData = data.widget;
      dataLength = curData.length;
      var title = "counties-with-the-highest-percent-of-republican-voters";
      $('.fcw-t2-loc').html(curData[0].county+' County, '+curData[0].state);
      $('.fcw-img2').html('#'+(index+1));
      $('.fcw-content1').html(Number(curData[0].percent).toFixed()+'% of Voters');
      $('.fcw-image').css('background', 'url('+imageUrl(curData[0].image)+') no-repeat');

      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+title+"/"+curData[0].state+"/"+curData[0].county+"/politics");
        $('#loc').attr('href',link+curData[0].state+"/"+curData[0].county+"/county");
        $('#county').attr('href',link+curData[0].state+"/"+curData[0].county+"/county");
      } else {
        $('.fcw-href').attr('href',"http://www.myhousekit.com/"+domain+"/politics/"+title+"/"+curData[0].state+"/"+curData[0].county);
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
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null' || path == 'http://pics4.city-data.com/cpic1/1files123.jpg'){
      return '../css/public/no_image.jpg';
    }
    return path;
  }
