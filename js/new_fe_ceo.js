var offset = 0;
var dataLength;
var curData;
$(function(){
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

	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=highest_paid_female_ceo', function(data){
    data_result = data.highest_paid_female_ceo;
    curData = data_result.list_data;
    dataLength = curData.length;
    dataCall(offset);
  }, 'json')
})//END OF FUNCTION
function dataCall(index){
  $('.fcw-t2-title').html(curData[index].c_name);
  $('.fcw-content1').html(curData[index].o_first_name+' '+curData[index].o_last_name);
  $('#paid').html(nFormatter(curData[index].TotalComp));
  $('.fcw-image').css('background','url(http://apifin2.synapsys.us/images/'+curData[index].o_pic+') no-repeat');
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
