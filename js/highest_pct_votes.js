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

  	$.get('http://api.synapsys.us/rt/index.php?widget=politics&wid=3&county=Sedgwick&state=KS', function(data){
      curData = data.widget;
      dataLength = curData.length;
      dataCall(offset);
    }, 'json')
  })//END OF FUNCTION
  function dataCall(index){
    var link ="http://localhost:3000/";
    var title = "counties-with-the-highest-percent-of-republican-voters";
    $('.fcw-t2-loc').html(curData[index].county+' County, '+curData[index].state);
    $('.fcw-content1').html(Number(curData[index].percent).toFixed()+'% of Voters');
    $('.fcw-image').css('background', 'url('+curData[index].image+') no-repeat');
    $('.fcw-href').attr('href',link+title+"/"+curData[index].state+"/"+curData[index].county+"/politics");
    $('#loc').attr('href',link+curData[index].state+"/"+curData[index].county+"/county");
    $('#county').attr('href',link+curData[index].state+"/"+curData[index].county+"/county");
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
