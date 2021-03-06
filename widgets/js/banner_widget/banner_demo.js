var rt_url = '//apirt.synapsys.us/index.php';
var get_remote_addr = "//w1.synapsys.us/get-remote-addr2/";
var plink = 'http://www.myhousekit.com/';
var rlink = 'http://www.joyfulhome.com/';

var data_conf = [
  {
    title: ' with the Highest Average Income',
    list_title: 'highest-income',
    url: rt_url + '?widget=demographics&wid=5',
    data_title2: 'Per Capita',
    data_transform2: function(val){
      return '$' + comma(Math.round(val.DemoAvgHighestIncome).toString());
    }
  },
  {
    title: ' with the Most Bilingual Residents',
    list_title: 'highest-bilingual',
    url: rt_url + '?widget=demographics&wid=3',
    data_title2: 'Are Bilingual',
    data_transform2: function(val){
      return val.DemonPctBilingual + '% of Residents';
    }
  },
  {
    title: ' that Carpool the Most',
    list_title: 'most-car-poolers',
    url: rt_url + '?widget=demographics&wid=9',
    data_title2: 'Carpool Everyday',
    data_transform2: function(val){
      return val.DemoCarPool + '% of Residents';
    }
  }
];

var nat_data_conf = [
  {
    title: ' with the Highest Average Income',
    list_title: 'nat-highest-income',
    url: rt_url + '?widget=national-demographics&wid=5',
    data_title2: 'Per Capita',
    data_transform2: function(val){
      return '$' + comma(Math.round(val.DemoAvgHighestIncome).toString());
    }
  },
  {
    title: ' with the Most Bilingual Residents',
    list_title: 'nat-highest-bilingual',
    url: rt_url + '?widget=national-demographics&wid=3',
    data_title2: 'Are Bilingual',
    data_transform2: function(val){
      return val.DemonPctBilingual + '% of Residents';
    }
  },
  {
    title: ' that Carpool the Most',
    list_title: 'nat-most-car-poolers',
    url: rt_url + '?widget=national-demographics&wid=9',
    data_title2: 'Carpool Everyday',
    data_transform2: function(val){
      return val.DemoCarPool + '% of Residents';
    }
  }
]

var dom_update = function(val){
  $('#number').text('#' + (offset + 1));

  if(isLocal === true){
    $('#title').text('Cities in ' + fullstate(val.DemoState) + config.title);
    if(remnant == 'true' || remnant == true){
      $('#profile_link').attr('href', rlink + 'location/' + val.DemoCity.toUpperCase() + '_' + val.DemoState);
      $('#full_list_link').attr('href', rlink + config.list_title + '/' + val.DemoState + '/' + val.DemoCity.toUpperCase() + '/demographics');
    }else{
      $('#profile_link').attr('href', plink + domain + '/loc/' + val.DemoState + '/' + val.DemoCity.toUpperCase());
      $('#full_list_link').attr('href', plink + domain + '/demographics/' + config.list_title + '/' + val.DemoState + '/' + val.DemoCity.toUpperCase());
    }
  }else{
    $('#title').text('Cities in the U.S.' + config.title);
    if(remnant == 'true' || remnant == true){
      $('#profile_link').attr('href', rlink + 'location/' + val.DemoCity.toUpperCase() + '_' + val.DemoState);
      $('#full_list_link').attr('href', rlink + config.list_title + '/national/demographics');
    }else{
      $('#profile_link').attr('href', plink + domain + '/loc/' + val.DemoState + '/' + val.DemoCity.toUpperCase());
      $('#full_list_link').attr('href', plink + domain + '/national/demographics/' + config.list_title);
    }
  }

  $('#main-image').css('background-image', 'url(' + imageUrl(val.img) + ')');
  $('#data-point1').text(val.DemoCity + ', ' + val.DemoState);
  $('#data-point2').text(config.data_transform2(val));
  $('#data-title2').text(config.data_title2);
}

var offset = 0;
var rand = Math.floor(Math.random() * data_conf.length);
var config = data_conf[rand];

var query = {}, redirectquery = '', domain = '', remnant = '', locName = '', city = '', state = '', loc = '', max, isLocal = true, no_data_ct = 0;

$(function(){
  var temp = location.search;
  if(temp !== ""){
    redirectquery = '?'+ decodeURIComponent(temp.substr(1));
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;

    //locName = query['loc']['loc_name'];
    //locName = locName.replace(/\+/g, ' ');
    city = query['loc']['loc_id']['city'];
  	state = query['loc']['loc_id']['state'];
  }

  $('#list-name').text('based off of 2012 census data');

  remnant == 'true' || remnant == true ? $('#vertical_link').attr('href', rlink) : $('#vertical_link').attr('href', plink + domain + '/loc');

  $('.widget-reel.left').on('click', function(){
    if(offset > 0){
      dataCall(--offset);
    }else if(typeof max !== 'undefined' && offset <= 0){
      offset = max - 1;
      dataCall(offset);
    }
  })

  $('.widget-reel.right').on('click', function(){
    if(typeof max !== 'undefined' && offset >= max - 1){
      offset = 0;
      dataCall(offset);
    }else{
      dataCall(++offset);
    }
  })

  if(city == '' || city == null || typeof city == 'undefined' || state == '' || state == null || typeof state == 'undefined'){
    $.get(get_remote_addr, function(r_data){
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

    if(data.widget.length === 0 || data.widget === null){
      if(no_data_ct < 5){
        console.log('Error: no widget data found');
        isLocal = false;
        config = nat_data_conf[rand];
        offset = 0;
        dataCall(offset);
        no_data_ct++;
      }
    }else{
      if(isLocal === true){
        data.widget.total_listings = 10;
      }else{
        data.widget.total_listings = 25;
      }
      max = data.widget.total_listings >= 25 ? 25 : data.widget.total_listings;

      var curData = data.widget;

      if(curData[0].DemoState === 'DC' && isLocal === true){
        isLocal = false;
        config = nat_data_conf[rand];
        offset = 0;
        dataCall(offset);
        no_data_ct++;
      }else{
        dom_update(curData[0]);
      }
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
