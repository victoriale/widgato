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

	$.get('http://apifin.investkit.com/call_controller.php?action=top_list&option=female_ceo', function(data){
    data_result = data.female_ceo;
    curData = data_result.list_data;
    dataLength = curData.length;
    dataCall(offset);
  }, 'json')
})//END OF FUNCTION
function dataCall(index){
  $('.fcw-t2-num').html((index+1) + ".");
  $('.fcw-t2-title').html(curData[index].o_first_name+' '+curData[index].o_last_name);
  $('.fcw-logo').css('background','url('+imageUrl(curData[index].c_logo)+') no-repeat');
  $('.fcw-loc').html(curData[index].c_name);
  $('#paid').html("$"+nFormatter(curData[index].TotalComp));
  $('.fcw-image').css('background','url('+imageUrl(curData[index].o_pic)+') no-repeat');
  if(remnant == 'true' || remnant == true){
    $('.comp-link').attr('href',"http://www.investkit.com/"+curData[index].c_ticker+"/"+compUrlName(curData[index].c_name)+"/company/"+curData[index].c_id);

    $('.exec-link').attr('href',"http://www.investkit.com/"+curData[index].o_first_name+"-"+curData[index].o_last_name+"/"+curData[index].c_ticker+"/executive/"+curData[index].o_id);

    $('.fcw-href').attr('href',"http://www.investkit.com/"+compUrlName(data_result.list_title)+"/female_ceo/executive-list/1");

    $('#title_link').attr('href',"http://www.investkit.com/"+curData[index].c_ticker+"/"+compUrlName(curData[index].c_name)+"/company/"+curData[index].c_id);

    $('#loc_link').attr('href',"http://www.investkit.com/"+curData[index].c_ticker+"/"+compUrlName(curData[index].c_name)+"/company/"+curData[index].c_id);
  }else{
    $('.comp-link').attr('href',"http://www.myinvestkit.com/"+domain+"/"+compUrlName(curData[index].c_name)+"/"+curData[index].c_ticker+"/c/"+curData[index].c_id);

    $('.exec-link').attr('href',"http://www.myinvestkit.com/"+domain+"/"+curData[index].c_ticker+"/"+curData[index].o_last_name+"-"+curData[index].o_first_name+"/e/"+curData[index].o_id);

    $('.fcw-href').attr('href',"http://www.myinvestkit.com/"+domain+"/"+compUrlName(data_result.list_title)+"/female_ceo/list-executives/1");

    $('#title_link').attr('href',"http://www.myinvestkit.com/"+domain+"/"+compUrlName(curData[index].c_name)+"/"+curData[index].c_ticker+"/c/"+curData[index].c_id);

    $('#loc_link').attr('href',"http://www.myinvestkit.com/"+domain+"/"+compUrlName(curData[index].c_name)+"/"+curData[index].c_ticker+"/c/"+curData[index].c_id);
  }
}

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-').replace(/\//g,'_');
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
  return 'http://images.investkit.com/images/'+path;
}
