var rt_url = '//apirt.synapsys.us/index.php?widget=national-demographics';
var plink = 'http://www.myhousekit.com/';
var rlink = 'http://www.joyfulhome.com/';

var data_conf = [
  {
    title: ' with the Highest Average Income',
    list_title: 'nat-highest-income',
    url: rt_url + '&wid=5',
    data_title2: 'Income Per Capita',
    data_transform2: function(val){
      return '$' + comma(val.DemoAvgHighestIncome);
    }
  },
  {
    title: ' with the Highest Home Value',
    list_title: 'nat-highest-home-value',
    url: rt_url + '&wid=4',
    data_title2: 'Home Value',
    data_transform2: function(val){
      return '$' + comma(val.DemoHomeValue);
    }
  },
  {
    title: ' with the Cheapest Average Rent',
    list_title: 'nat-cheapest-rent',
    url: rt_url + '&wid=1',
    data_title2: 'Rent Per Month',
    data_transform2: function(val){
      return '$' + comma(val.DemoAvgRent);
    }
  }
];

var dom_update = function(val){
  $('#number').text('#' + (offset + 1));
  $('#title').text('Cities in the U.S.' + config.title + ' in ' + val.DemoYear);
  $('#main-image').css('background-image', 'url(' + imageUrl(val.img) + ')');
  $('#data-point1').text(val.DemoCity + ', ' + val.DemoState);
  $('#data-point2').text(config.data_transform2(val));
  $('#data-title1').text(typeof val.listings[val.DemoCity + ', ' + val.DemoState] === 'undefined' ? '0 Listings Available' : val.listings[val.DemoCity + ', ' + val.DemoState] + ' Listings Available');

  if(remnant == 'true' || remnant == true){
    $('#profile_link').attr('href', rlink + 'location/' + val.DemoCity.toUpperCase() + '_' + val.DemoState);
    $('#full_list_link').attr('href', rlink + config.list_title + '/national/demographics');
  }else{
    $('#profile_link').attr('href', plink + domain + '/loc/' + val.DemoState + '/' + val.DemoCity.toUpperCase());
    $('#full_list_link').attr('href', plink + domain + '/national/demographics/' + config.list_title);
  }

}

var offset = 0;
var rand = Math.floor(Math.random() * data_conf.length);
var config = data_conf[rand];

var query = {}, redirectquery = '', domain = '', remnant = '', locName = '', loc = '', max = 25;

$(function(){
  var temp = location.search;
  if(temp !== ""){
    redirectquery = '?'+ decodeURIComponent(temp.substr(1));
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
  }

  $('#list-name').text('Cities ' + config.title);
  $('#data-title2').text(config.data_title2);

  remnant == 'true' || remnant == true ? $('#vertical_link').attr('href', rlink) : $('#vertical_link').attr('href', plink + domain + '/loc');

  $('.widget-reel.left').on('click', function(){
    if(offset > 0){
      dataCall(--offset);
    }
    // }else{
    //   offset = max - 1;
    //   dataCall(offset);
    // }
  })

  $('.widget-reel.right').on('click', function(){
    // if(offset < max - 1){
    //   dataCall(++offset);
    // }else{
    //   offset = 0;
    //   dataCall(offset);
    // }
    dataCall(++offset);
  })

  dataCall(offset);

})

function dataCall(index){
  $.get(config.url + '&limit=1&skip=' + index, function(data){

    if(data.widget === null){
      console.log('Error: no widget data found');
    }
    if(data.widget.length === 0){
      offset--;
    }else{
      var curData = data.widget;
      dom_update(curData[0]);
    }

  }, 'json')
}

function comma(val){
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
