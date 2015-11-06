var offset = 0;
var dataLength;
var curData;

$(function(){

    $('.tv-rightnav').on('click', function() {
        if (offset < dataLength-1 && $(this).data('dir') === 'next') {
            dataCall(++offset);
        }else if(offset >= dataLength-1){
          offset = 0;
          dataCall(offset);
        }
    });
    $('.tv-leftnav').on('click', function() {
        if (offset > 0 && $(this).data('dir') === 'prev') {
              dataCall(--offset);
        }else if(offset <= 0){
          offset = dataLength-1;
          dataCall(offset);
        }
    });

  	$.get('http://api.synapsys.us/rt/index.php?widget=politics&wid=1&city=Wichita&state=KS', function(data){
      console.log(data);
      curData = data.widget;
      dataLength = curData.length;
      dataCall(offset);
    }, 'json')
  })//END OF FUNCTION
  function dataCall(index){
    var link ="http://localhost:3000/";
    $('.tv-t2-loc').html(curData[index].county+' County, '+curData[index].state);
    $('.tv-content1').html(dNumberToCommaNumber(curData[index].votes)+' Votes');
		$('.tv-image').css('background', 'url('+curData[index].image+') no-repeat');
		$('.tv-href').attr('href',link+"Politics/"+curData[index].state);
		$('#loc').attr('href',link+"Politics/"+curData[index].state);

    //$('#loc').attr('href',link+"location/"+toUpperCase(curData[index].county)+"_"+toUpperCase(curData[index].state));
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
	/*
  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
      return '../css/public/no_image.jpg';
    }
    return 'http://#/images/' + path;
  }
	*/
	//puts comma on every thousand number
function dNumberToCommaNumber(Number) {
	  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
