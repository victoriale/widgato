var offset=0;
var domain = '';
var clickyId = 0;
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;
var curData = {};

$(function () {

  var temp = location.search;
  var query = {};

  if(temp != null){
  	query = JSON.parse(decodeURIComponent(temp.substr(1)));

  	//set the query data from database to global variable to use
  	domain = query.dom;

  	remnant = query.remn;

  	clickyId = query.c_id;

  	locName = query['loc']['loc_name'];

    bord = query.bord;

    if(locName != null && typeof locName != 'undefined' && locName != ''){
      locName = locName.replace('+',' ');
    }
  }//end temp /if

  console.log("query:",query);

  //if partner database has absolutely nothing and it is a brand new partner
  if(query['loc']['loc_id'] == null || typeof query['loc']['loc_id'] == undefined || query['loc']['loc_id'] == ''){
    query['loc']['loc_id'] = {};
    query['loc']['loc_id']['city'] = null;
    query['loc']['loc_id']['state'] = null;
    city = query['loc']['loc_id']['city'];
    state = query['loc']['loc_id']['state'];
  }//end if

  //make an inital api call to get lists of all the list for real estate
  $.get("http://apireal.synapsys.us/listhuv/?action=list_of_lists", function(lists){
    curData = lists;
    //makes a check to see if data is being returned from parter
    var cityCheck = query['loc']['loc_id']['city'];
    var stateCheck = query['loc']['loc_id']['state'];
    //console.log('city',cityCheck, 'state',stateCheck);
    $.get("http://w1.synapsys.us/get-remote-addr2/",function(r_data){
      if(cityCheck != null && cityCheck != '' && typeof cityCheck != 'undefined' && stateCheck != null && stateCheck != '' && typeof stateCheck != 'undefined'){
        city = query['loc']['loc_id']['city'];
        state = query['loc']['loc_id']['state'];
        console.log('partner with location:', city, state);
      }else {
        city = r_data[0]['city'];
        state = r_data[0]['state'];
        console.log('remote addr location:', city, state);
      }//end of if/else

      offset = Math.floor((Math.random() * 9) + 1);
      var method = curData['available_lists'];;
      var name = method[offset]['name'];
      $("fcw-t1").html(name);
      listCall(method, offset);
      $('.fcw-rightnav').on('click', function() {
        //checks if the list has reach its max and restarts the list at 0
        offset++;
        if(offset == max){
          offset = 0;
          listCall(method, offset);
        }else{
          listCall(method, offset);
        }
      });//end of on.click
    });//end of api .get
  });//end .get
});

//DELETE but for Larry to recode
function listCall(method, count){
  console.log(domain, count, method);
  if(remnant == 'true'){
    $.get("http://apireal.synapsys.us/listhuv/?action="+method[count]['method']+"&city="+ city+"&state="+state, function(data){
      debugger;
      console.log('method data',data);
    //checks if the list exist or has reach its max and restarts the list at 0
    if(typeof data[0] == 'undefined'){
      offset++;
      if(offset >= max){
        offset = 0;
        listCall(method, offset);
      }else{
        listCall(method, offset);
      }
    }else{
        //will change the title text and resize using resizetext() function
        var name = method[offset]['name'];
        $(".fcw-t1").html(name);
        resizetext();
        var p_domain = domain+"/";

        var link = method[offset]['method'];
        //displays information on the widget
        $(".fcw-content1").html(data[0]['total_count']);
        var random = randomimage();
        $(".fcw-image").css("background-image","url('"+random[offset]+"')");
        //replace widget location name with name given name from database
        locName = city+", "+state;
        $(".fcw-t2-loc").html(locName);
        $(".fcw-href").attr('href',"//www.myhousekit.com/"+p_domain+"view_list/"+link+"/"+state+"/"+city);
        //go to location page go to myhousekit for partner non remnant
        $("#loc").attr('href',"//www.myhousekit.com/"+p_domain+"loc/"+state+"/"+city);
      }
    });//end of .get call
  }else{
    $.get("http://apireal.synapsys.us/listhuv/?action="+method[count]['method']+"&partner_domain="+ domain, function(data){
      debugger;
      console.log('method data',data);
      //checks if the list exist or has reach its max and restarts the list at 0
      if(typeof data[0] == 'undefined'){
        offset++;
        if(offset >= max){
          offset = 0;
          listCall(method, offset);
        }else{
          listCall(method, offset);
        }
      }else{
        //will change the title text and resize using resizetext() function
        var name = method[offset]['name'];
        $(".fcw-t1").html(name);
        resizetext();
        var p_domain = domain+"/";

        var link = method[offset]['method'];
        //displays information on the widget
        $(".re_w_list-content-textarea-t1").html(data[0]['total_count']);
        var random = randomimage();
        $(".re_w_list-content-image").css("background-image","url('"+random[offset]+"')");
        //replace widget location name with name given name from database
        //some reason had to run below again
        locName = locName.replace('+',' ');
        $(".fcw-t2-loc").html(locName);
        $(".fcw-href").attr('href',"//www.myhousekit.com/"+p_domain+"view_list/"+link+"/"+state+"/"+city);
        //go to location page go to myhousekit for partner non remnant
        $("#location_link").attr('href',"//www.myhousekit.com/"+p_domain+"loc/");
      }
    });
  }
}

//add commas to numbers to look readable PROB DONT NEED THIS BUT KEEPING HERE JUST IN CASE
NumberToCommaNumber = function(Number) {
  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//makes all first letters of every word uppercase
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//make sure title stays correct size to fit div
function resizetext(){
  $('fcw-t1').css('font-size', '24px');
  var maxsize= ($('.re_w_list-title').width());
  var currentsize= $('fcw-t1').width();
  while(currentsize > maxsize){
    //MUST HAVE BELOW otherwise infinite loops will happen
    currentsize= $('fcw-t1').width();
    var size = parseFloat($("fcw-t1").css("font-size"));
    size -= 1;
    $('fcw-t1').css('font-size', size + 'px');
  }
}

//random images to display list of lists
function randomimage(){
  var image_array = new Array();
  image_array['0'] = '../css/public/re_w_list_stock/Mosaic_Grid.png';
  image_array['1'] = '../css/public/re_w_list_stock/Mosaic_Grid2.png';
  image_array['2'] = '../css/public/re_w_list_stock/Mosaic_Grid3.png';
  image_array['3'] = '../css/public/re_w_list_stock/Mosaic_Grid4.png';
  image_array['4'] = '../css/public/re_w_list_stock/Mosaic_Grid5.png';
  image_array['5'] = '../css/public/re_w_list_stock/Mosaic_Grid6.png';
  image_array['6'] = '../css/public/re_w_list_stock/Mosaic_Grid7.png';
  image_array['7'] = '../css/public/re_w_list_stock/Mosaic_Grid8.png';
  image_array['8'] = '../css/public/re_w_list_stock/Mosaic_Grid9.png';
  image_array['9'] = '../css/public/re_w_list_stock/Mosaic_Grid10.png';
  return image_array;
}

//return ads PROB DONT NEED THIS BUT KEEPING HERE JUST IN CASE
function ad(){
  var ad_array = new Array();
  ad_array['0'] = '../css/public/re_w_list_stock/AudiAd.png';
  ad_array['1'] = '../css/public/re_w_list_stock/AudiAd#2.png';
  ad_array['2'] = '../css/public/re_w_list_stock/RolexAd.png';
  return ad_array;
}

//convert all state abbr to full  PROB DONT NEED THIS BUT KEEPING HERE JUST IN CASE
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
    PR: 'Peurto Rico',
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
  }
  return stateName[state];
}
