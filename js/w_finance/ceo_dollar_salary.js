var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;
var subdom = 'false';
//set protocol to use
var protocolToUse = (location.protocol == "https:") ? "https" : "http";
var link = protocolToUse+"://www.investkit.com/";
var partner_link = protocolToUse+"://www.myinvestkit.com/";

$(function(){
  var temp = location.search;
  var query = {};

  if(temp != null){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    //set the query data from database to global variable to use
    domain = query.dom;
    subdom = query.subdom;
    remnant = query.remn;
    bord = query.bord;
  	}

    //makes a check to see if subdom exists for certain partners
    if(  typeof subdom != 'undefined' && (subdom == 'true' || subdom == true) ){
      partner_link = protocolToUse+'://finance.' + domain + '/';
    }

  	if(bord == 'true'){
  		$(".re_w_list").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
  	}

    $('.fcw-rightnav').on('click', function() {
        if (offset < dataLength-1 && $(this).data('dir') === 'next') {
            dataCall(++offset);
        }else if(offset >= dataLength-1){
          offset = 0;
          dataCall(offset);
        }
        if(offset < 1){
            $('.fcw-leftnav').css("opacity", "0");
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

	$.get(protocolToUse+'://apifin.investkit.com/call_controller.php?action=top_list&option=dollar_ceo', function(data){
    data_result = data.dollar_ceo;
    curData = data_result.list_data;
    dataLength = curData.length;
    dataCall(offset);
  }, 'json')
})//END OF FUNCTION
function dataCall(index){
  $('.fcw-t2-num').html("#"+(index + 1));
  $('.fcw-t2-title').html(curData[index].o_first_name+' '+curData[index].o_last_name);
  $('.fcw-content1').html('$1.00 Salary');
  $('.fcw-loc').html(curData[index].c_name);
  $('.fcw-image').css('background', 'url('+imageUrl(curData[index].o_pic)+') no-repeat');
  $('.fcw-logo').css('background', 'url('+imageUrl(curData[index].c_logo)+') no-repeat');
  //$('.cds-image').css('background','url(http://images.investkit.com/images/'+curData[index].o_pic+') no-repeat');
  if(remnant == 'true' || remnant == true){
    $('#investkit').attr('href',link);
    $('.exec-link').attr('href',link+curData[index].o_first_name+'-'+curData[index].o_last_name+"/"+curData[index].c_ticker+"/executive/"+curData[index].o_id);
    $('.fcw-href').attr('href', link+compUrlName(data_result.list_title)+"/dollar_ceo/executive-list/1");
    $('#title_link').attr('href',link+curData[index].o_first_name+'-'+curData[index].o_last_name+"/"+curData[index].c_ticker+"/executive/"+curData[index].o_id);
    $('.comp-link').attr('href',link+curData[index].c_ticker+"/"+compUrlName(curData[index].c_name)+"/company/"+curData[index].c_id);
    $('#loc_link').attr('href',link+curData[index].c_ticker+"/"+compUrlName(curData[index].c_name)+"/company/"+curData[index].c_id);
  }else{
    $('#investkit').attr('href', partner_link+domain);
    $('.exec-link').attr('href', partner_link+domain+"/"+curData[index].c_ticker+"/"+curData[index].o_last_name+'-'+curData[index].o_first_name+"/e/"+curData[index].o_id);
    $('.fcw-href').attr('href', partner_link+domain+"/"+compUrlName(data_result.list_title)+"/dollar_ceo/list-executives/1");
    $('#title_link').attr('href',partner_link+domain+"/"+curData[index].c_ticker+"/"+curData[index].o_last_name+'-'+curData[index].o_first_name+"/e/"+curData[index].o_id);
    $('.comp-link').attr('href',partner_link+domain+"/"+compUrlName(curData[index].c_name)+"/"+curData[index].c_ticker+"/c/"+curData[index].c_id);
    $('#loc_link').attr('href',partner_link+domain+"/"+compUrlName(curData[index].c_name)+"/"+curData[index].c_ticker+"/c/"+curData[index].c_id);
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
  return 'http://images.investkit.com/images/' + path;
}
