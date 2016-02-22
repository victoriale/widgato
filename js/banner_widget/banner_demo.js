var rt_url = 'http://apirt.synapsys.us/index.php?widget=demographics';
var plink = 'http://www.myhousekit.com/';
var rlink = 'http://www.joyfulhome.com/';

var data_conf = [
  {
    title: ' with the Highest Average Income',
    list_title: 'highest-income',
    url: rt_url + '&wid=5',
    data_title1: '[Profile Name]',
    data_title2: 'Income',
    data_transform2: function(val){
      return '$' + comma(val.DemoAvgHighestIncome) + ' Per Capita';
    }
  },
  {
    title: ' with the Highest Home Value',
    list_title: 'highest-home-value',
    url: rt_url + '&wid=4',
    data_title1: '[Profile Name]',
    data_title2: 'Home Value',
    data_transform2: function(val){
      return '$' + comma(val.DemoHomeValue);
    }
  },
  {
    title: ' with the Cheapest Average Rent',
    list_title: 'cheapest-rent',
    url: rt_url + '&wid=1',
    data_title1: '[Profile Name]',
    data_title2: 'Rent',
    data_transform2: function(val){
      return '$' + comma(val.DemoAvgRent) + ' Per Month';
    }
  }
];

var dom_update = function(val){
  $('#number').text('#' + (offset + 1));
  $('#title').text('Cities in ' + fullstate(val.DemoState) + config.title + ' in ' + val.DemoYear);
  $('#main-image').css('background-image', 'url(' + imageUrl(val.img) + ')');
  $('#data-point1').text(val.DemoCity + ', ' + fullstate(val.DemoState));
  $('#data-point2').text(config.data_transform2(val));

  if(remnant == 'true' || remnant == true){
    $('#profile_link').attr('href', rlink + 'location/' + val.DemoCity.toUpperCase() + '_' + val.DemoState);
    $('#full_list_link').attr('href', rlink + config.list_title + '/' + val.DemoState + '/' + val.DemoCity.toUpperCase() + '/demographics');
  }else{
    $('#profile_link').attr('href', plink + domain + '/loc/' + val.DemoState + '/' + val.DemoCity.toUpperCase());
    $('#full_list_link').attr('href', plink + domain + '/demographics/' + config.list_title + '/' + val.DemoState + '/' + val.DemoCity.toUpperCase());
  }

}

var offset = 0;
var rand = Math.floor(Math.random() * data_conf.length);
var config = data_conf[rand];

var query = {}, redirectquery = '', domain = '', remnant = '', locName = '', city = '', state = '', loc = '', max = 25;

$(function(){
  var temp = location.search;
  if(temp !== ""){
    redirectquery = '?'+ decodeURIComponent(temp.substr(1));
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;

    locName = query['loc']['loc_name'];
    locName = locName.replace(/\+/g, ' ');
    city = query['loc']['loc_id']['city'];
  	state = query['loc']['loc_id']['state'];
  }

  $('#list-name').text('Cities ' + config.title);
  $('#data-title1').text(config.data_title1);
  $('#data-title2').text(config.data_title2);

  remnant == 'true' || remnant == true ? $('#vertical_link').attr('href', rlink) : $('#vertical_link').attr('href', plink + domain);

  $('.widget-reel.left').on('click', function(){
    if(offset > 0){
      dataCall(--offset);
    }
  })

  $('.widget-reel.right').on('click', function(){
    if(offset < max - 1){
      dataCall(++offset);
    }
  })

  if(city == null || typeof city == 'undefined' || state == null || typeof state == 'undefined'){
    $.get("http://w1.synapsys.us/get-remote-addr2/",function(r_data){
      city = r_data[0].city;
      state = r_data[0].state;
      dataCall(offset);
    });
  }else{
    dataCall(offset);
  }

})

function dataCall(index){
  $.get(config.url + '&city=' + city + '&state=' + state + '&limit=1&skip=' + index, function(data){

    if(data.widget === null){
      console.log('Error: no widget data found');
    }

    var curData = data.widget;
    dom_update(curData[0]);

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
