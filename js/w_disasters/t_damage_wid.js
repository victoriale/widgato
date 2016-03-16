var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;
var apiUrl = '//apirt.synapsys.us';
var wid_num = 10;
var link = "http://www.joyfulhome.com/";
var link_partner = "http://www.myhousekit.com/";
$(function(){
  var temp = location.search;
  var query = {};
  if(temp != null){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
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
    dataCall(offset);
  })//END OF FUNCTION
  function dataCall(index){
  	$.get(apiUrl + '/index.php?widget=disaster&wid='+wid_num+'&skip='+index+'&limit=1', function(data){
      var curData = data.widget;
      dataLength = curData.length;
      var title = "tornado-damage-by-width";
      $('#title').html('Tornado with Biggest Damage Width');
      $('.fcw-t1').html('Tornadoes with the Biggest Damage Width');
      $('.fcw-t2-loc').html(curData[0].City+', '+curData[0].State);
      $('.fcw-image').css('background', 'url('+imageUrl(curData[0].img)+') no-repeat');
      $('.fcw-img2').html('#'+(index+1));
      if(curData[0].MilesWideDamaged == 1){
        $('.fcw-content1').html(curData[0].MilesWideDamaged + ' Mile Wide');
      } else {
        $('.fcw-content1').html(curData[0].MilesWideDamaged + ' Miles Wide');
      }
      $('.fcw-content2').html(curData[0].Month + ' ' + curData[0].Day + ', ' + curData[0].Year);
      $('.fcw-presentedby').html('TORNADO WITH BIGGEST DAMAGE WIDTH - PRESENTED BY');
      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+title+"/national/disasters");
        $('#loc').attr('href',link+"location/"+(curData[0].City).toUpperCase()+"_"+curData[0].State);
        $('#imgUrl').attr('href',link+"location/"+(curData[0].City).toUpperCase()+"_"+curData[0].State);
      } else {
        $('.fcw-href').attr('href',link_partner+domain+"/national/disasters/"+title);
        $('#loc').attr('href',link_partner+domain+"/loc/"+curData[0].State+"/"+(curData[0].City).toUpperCase());
        $('#imgUrl').attr('href',link_partner+domain+"/loc/"+curData[0].State+"/"+(curData[0].City).toUpperCase());
      }
    }, 'json')
  }

  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null' || path == 'http://apireal.synapsys.us/city-image/images/placeholder-location.jpg'){
      var image_array = new Array();
      var x = Math.floor((Math.random() * 9) + 1);
      image_array['0'] = '../css/public/nophoto1.png';
      image_array['1'] = '../css/public/nophoto2.png';
      image_array['2'] = '../css/public/nophoto3.png';
      image_array['3'] = '../css/public/nophoto4.png';
      image_array['4'] = '../css/public/nophoto5.png';
      image_array['5'] = '../css/public/nophoto6.png';
      image_array['6'] = '../css/public/nophoto7.png';
      image_array['7'] = '../css/public/nophoto8.png';
      image_array['8'] = '../css/public/nophoto9.png';
      image_array['9'] = '../css/public/nophoto10.png';
      return image_array[x];
    }
    return path;
  }
