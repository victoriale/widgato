var offset = 0;
var dataLength;
var curData;
var domain = '';
var remnant = '';
var max = 10;
var bord = false;
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
  	$.get('//apirt.synapsys.us/index.php?widget=national-demographics&wid=4&skip='+index+'&limit=1', function(data){
      var curData = data.widget;
      dataLength = curData.length;
      var title = "nat-highest-home-value";
      $('.fcw-t1').html('Cities in the U.S. with the Highest Home Values');
      $('.fcw-t2-loc').html(curData[0].DemoCity + ', ' + curData[0].DemoState);
      $('.fcw-image').css('background', 'url('+imageUrl(curData[0].img)+') no-repeat');
      $('.fcw-img2').html('#'+(index+1));
      $('.fcw-content1').html('$' + (Number(curData[0].DemoHomeValue).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $('.fcw-content2').html('Median Home Value');

      if(remnant == 'true' || remnant == true){
        $('.fcw-href').attr('href',link+title+"/national/demographics");
        $('#loc').attr('href',link+"location/"+(curData[0].DemoCity).toUpperCase()+"_"+curData[0].DemoState);
        $('#imgUrl').attr('href',link+"location/"+(curData[0].DemoCity).toUpperCase()+"_"+curData[0].DemoState);
      } else {
        $('.fcw-href').attr('href',link_partner+domain+"/national/demographics/"+title);
        $('#loc').attr('href',link_partner+domain+"/loc/"+curData[0].DemoState+"/"+(curData[0].DemoCity).toUpperCase());
        $('#imgUrl').attr('href',link_partner+domain+"/loc/"+curData[0].DemoState+"/"+(curData[0].DemoCity).toUpperCase());
      }

    }, 'json')
  }

  function imageUrl(path){
    if(typeof path == 'undefined' || path == null || path == '' || path == 'null' || path == 'http://apireal.synapsys.us/city-image/images/placeholder-location.jpg'){
      var image_array = new Array();
      var x = Math.floor((Math.random() * 4) + 1);
      image_array['0'] = '../css/public/nophoto1.png';
      image_array['1'] = '../css/public/nophoto2.png';
      image_array['2'] = '../css/public/nophoto3.png';
      image_array['3'] = '../css/public/nophoto4.png';
      image_array['4'] = '../css/public/nophoto5.png';
      return image_array[x];
    }
    return path;
  }
  function fullstate(state){
    var stateName = {
      AL: 'Alabama',
      AK: 'Alaska',
      AZ: 'Arizona',
      AR: 'Arkansas',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DC: 'District of Columbia',
      DE: 'Delaware',
      FL: 'Florida',
      GA: 'Georgia',
      HI: 'Hawaii',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      IA: 'Iowa',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Lousiana',
      ME: 'Maine',
      MD: 'Maryland',
      MA: 'Massachusetts',
      MI: 'Michigan',
      MN: 'Minnesota',
      MS: 'Mississippi',
      MO: 'Missouri',
      MT: 'Montana',
      NE: 'Nebraska',
      NV: 'Nevada',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NY: 'New York',
      NC: 'North Carolina',
      ND: 'North Dakota',
      OH: 'Ohio',
      OK: 'Oklahoma',
      ON: 'Ontario',
      OR: 'Oregon',
      PA: 'Pennsylvania',
      PR: 'Puerto Rico',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VT: 'Vermont',
      VA: 'Virginia',
      WA: 'Washington',
      WV: 'West Virginia',
      WI: 'Wisconsin',
      WY: 'Wyoming'
    };
    return stateName[state];
  }
