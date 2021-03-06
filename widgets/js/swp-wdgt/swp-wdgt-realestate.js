var query = {};
var count = 0;
var method = [
    {method: 'homesAtLeast5YearsOld',             name: 'Homes at least 5 years old'},
    {method: 'homesLessThan5YearsOld',            name: 'Homes less than 5 years old'},
    {method: 'homesWith2BedroomsMostExpensive',   name: 'Most expensive homes with 2 bedrooms'},
    {method: 'homesWith3BedroomsMostExpensive',   name: 'Most expensive homes with 3 bedrooms'},
    {method: 'homesLargest',                      name: 'Largest homes'},
    {method: 'homesBrickLeastExpensive',          name: 'Least expensive brick homes'},
    {method: 'homesLeastExpensive',               name: 'Least expensive homes'},
    {method: 'homesWithPoolLeastExpensive',       name: 'Least expensive homes with pool'},
    {method: 'homesWithWaterfrontLeastExpensive', name: 'Least expensive waterfront homes'},
    {method: 'homesMostExpensive',                name: 'Most expensive homes'},
    {method: 'listingsMostRecent',                name: 'Most recent homes'},
    {method: 'condosMostExpensive',               name: 'Most expensive condos'}
    //{method: 'homesNewTraditional',               name: 'New traditional homes'},
    //'hiestZipCode',
    //'homesWithSprinklerAndDeck',
    //'homesWithVaultedCeilingsAndSecuritySystem',
    //'listingsWithLongDescriptions',
    //'listingsWithMoreThan10Photos',
    //'listingsWithMoreThan5Photos',
    //'listingsWithVirtualTours',
];
swp_wdgt = function(){
  A = function(id) {
    var d = document;
    if(id[0] == '#'){
      return d.getElementById(id.slice(1,id.length));
    }else if(id[0] == '.'){
      return d.getElementsByClassName(id.slice(1,id.length))[0];
    }else if(id[0] != '#' && id[0] != '.'){
      return d.getElementById(id.slice(1,id.length));
    }
  }

  var temp = location.search;
  var season;
  if(temp != null && temp != ""){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    if (query.remn != "" && query.remn != null) {
      remnant = query.remn;
    }
    else {
      remnant = 'true';
    }
    bord = query.bord;
  }else{
    domain = false;
    remnant = 'true';
    bord = false;
  }

  var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";

  RenderDynamicSide(protocolToUse);

}();

function RenderDynamicSide(protocolToUse){
  // A('.fcw').style.display = 'block';
  var offset = 0;
  var dataLength;
  var curData;
  // var domain = '';
  // var remnant = '';
  // var bord = false;
  var possibleTypes = ['realestate'];
  var listType = possibleTypes[getRandomInt(0,possibleTypes.length)];
  var methodType = method[getRandomInt(0,method.length)];
  var listRand = getRandomInt(0,10);

  var referrer = document.referrer;
  var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;
  function getBaseUrl(string){
      var urlArray = string.split("/");
      var domain = urlArray[2];
      return protocolToUse +  domain;
  }

  var colorSchemes = {
      realestate: '#1d881d'
    };
  var iconScheme = {
      realestate: ''
    };
  var urlScheme = {
    realestate: 'http://www.joyfulhome.com'
  };
  var siteName = {
    realestate: 'Real Estate'
  };

  var schemeToUse = colorSchemes[listType];
  var iconsToUse = iconScheme[listType];
  var urlToUse = urlScheme[listType];
  var siteNameToUse = siteName[listType];

  function mapColorScheme(color,icons, type, url){
    A('#verticalName').style.backgroundColor = color;
    A('#nextlist-svg').style.fill = color;
    A('.fcw-icon').style.backgroundColor = color;
    A('.fcw-icon').style.zIndex = "5";

    A('.fcw-icon').style.backgroundImage = "url('" + icons + "')";
    A('.fcw-list-next').style.color = color;
    A('.fcw-list-next').style.borderColor = color;

    A(".fcw-list-next").onmouseover = function() {
      A('.fcw-list-next').style.backgroundColor = "#272727";
      A('.fcw-list-next').style.borderColor = "#272727";
      A('.fcw-list-next').style.color = 'white';
      A('#nextlist-svg').style.fill = '#FFFFFF';
    }
    A(".fcw-list-next").onmouseout  = function() {
      A('.fcw-list-next').style.borderColor = color;
      A('.fcw-list-next').style.backgroundColor = '';
      A('.fcw-list-next').style.color = color;
      A('#nextlist-svg').style.fill = color;
    }

    A('.fcw-list-list').style.borderColor = color;
    A('.fcw-list-list').style.backgroundColor = color;
    //handle hover change to black on next lists
    A('.fcw-list-list').onmouseover = function(){
      A('.fcw-list-list').style.backgroundColor = '#272727';
      A('.fcw-list-list').style.borderColor = '#272727';
    }
    A('.fcw-list-list').onmouseout = function(){
      A('.fcw-list-list').style.backgroundColor = color;
      A('.fcw-list-list').style.borderColor = color;
    }


    A('.fcw-leftnav').style.backgroundColor = color;
    A(".fcw-leftnav").onmouseover = function(){
      A('.fcw-leftnav').style.backgroundColor = "black";
    }
    A(".fcw-leftnav").onmouseout = function(){
      A('.fcw-leftnav').style.backgroundColor = color;
    }

    A('.fcw-rightnav').style.backgroundColor = color;
    A(".fcw-rightnav").onmouseover = function(){
      A('.fcw-rightnav').style.backgroundColor = "black";
    }
    A(".fcw-rightnav").onmouseout = function(){
      A('.fcw-rightnav').style.backgroundColor = color;
    }

    A(".hover1").onmouseover = function() {
      A('.hover1').style.Color = color;
    }
    A(".hover1").onmouseout  = function() {
      A(".hover1").style.Color = '';
    }
    if (query.showLink != "false") {
      A(".fcw-content1").onmouseover = function() {
        A('.fcw-content1').style.color = color;
      }
      A(".fcw-content1").onmouseout  = function() {
        A(".fcw-content1").style.color = '';
      }
    }


    if(type == "college_basketball"){
      A('.fcw-content-top').style.height = '25px';
      A('.fcw-content-top').style.overflow = 'hidden';
    }

    A(".hover1").onmouseover = function() {
      A('.hover1').style.backgroundColor = color;
      A('.txt1').style.color = 'white';
      A('.txt2').style.color = 'white';
    }
    A(".hover1").onmouseout  = function() {
      A('.hover1').style.backgroundColor = '';
      A('.txt1').style.color = 'white';
      A('.txt2').style.color = 'white';
    }

    if(type == "weather"){
      A('#verticalName').style.color = "#272727";
      A('.fcw-content3').style.height = '25px';
      A('.fcw-content3').style.overflow = 'hidden';
      //yellow causes text colors to be black....
      A('.fcw-list-text').style.color = "#000000";
      //A('#swoop-svg').style.fill = "#000000";
      A('#nextlist-svg').style.fill = "#000000";
      A('.fcw-list-next').style.color = '#000000';
      A('.list-icon').style.fill = '#272727';

      A(".fcw-list-next").onmouseover = function() {
        A('.fcw-list-next').style.backgroundColor = "black";
        A('.fcw-list-next').style.borderColor = "black";
        A('.fcw-list-next').style.color = 'white';
        A('#nextlist-svg').style.fill = 'white';
      }
      A(".fcw-list-next").onmouseout  = function() {
        A('.fcw-list-next').style.borderColor = color;
        A('.fcw-list-next').style.backgroundColor = '';
        A('.fcw-list-next').style.color = '#000000';
        A('#nextlist-svg').style.fill = '#000000';
      }


      A(".hover1").onmouseover = function() {
        A('.hover1').style.backgroundColor = color;
        A('.txt1').style.color = '#000000';
        A('.txt2').style.color = '#000000';
      }
      A(".hover1").onmouseout  = function() {
        A('.hover1').style.backgroundColor = '';
        A('.txt1').style.color = '#000000';
        A('.txt2').style.color = '#000000';
      }

      A('.fcw-leftnav').style.stroke = "#272727";
      A('.fcw-rightnav').style.stroke = "#272727";

      A(".fcw-leftnav").onmouseover = function(){
        A('.fcw-leftnav').style.backgroundColor = "#272727";
        A('.fcw-leftnav').style.stroke = "white";
      }
      A(".fcw-leftnav").onmouseout = function(){
        A('.fcw-leftnav').style.backgroundColor = color;
        A('.fcw-leftnav').style.stroke = "#272727";
      }


      A(".fcw-rightnav").onmouseover = function(){
        A('.fcw-rightnav').style.backgroundColor = "#272727";
        A('.fcw-rightnav').style.stroke = "white";
      }
      A(".fcw-rightnav").onmouseout = function(){
        A('.fcw-rightnav').style.backgroundColor = color;
        A('.fcw-rightnav').style.stroke = "#272727"
      }


      A('.fcw-list-list').onmouseover = function(){
        A('.fcw-list-list').style.backgroundColor = '#272727';
        A('.fcw-list-list').style.borderColor = '#272727';
        A('.fcw-list-text').style.color = "#FFFFFF";
        A('.list-icon').style.fill = 'white';
        //A('#swoop-svg').style.fill = "#FFFFFF";
      }
      A('.fcw-list-list').onmouseout = function(){
        A('.fcw-list-list').style.backgroundColor = color;
        A('.fcw-list-list').style.borderColor = color;
        A('.fcw-list-text').style.color = "#000000"
        A('.list-icon').style.fill = '#272727';
        //A('#swoop-svg').style.fill = "#000000";
      }
      A(".fcw-content1").onmouseover = function() {
        A('.fcw-content1').style.color = "black";
      }
      A(".fcw-content1").onmouseout  = function() {
        A(".fcw-content1").style.color = 'black';
      }
    }
  }

  mapColorScheme(schemeToUse, iconsToUse, listType, urlToUse);

    A(".fcw-rightnav").onclick = function() {
      if (offset < dataLength-1) {
             dataCall(++offset);
         }else if(offset >= dataLength-1){
           offset = 0;
           dataCall(offset);
           }
    };
    A(".fcw-leftnav").onclick = function() {
      if (offset > 0 ) {
          dataCall(--offset);
      }else if(offset <= 0){
        offset = dataLength-1;
        dataCall(offset);
      }
    };
    var initData;
    //get query string array for NFL list data
    function httpGetInitData(){
      var url = '../js/tdl_list_array.json';
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
          //On complete function
          initData = JSON.parse(xmlHttp.responseText);
          getRandList(initData);
        }
      }
      xmlHttp.open( "GET", url, true ); // false for synchronous request
      xmlHttp.send( null );
    }
    httpGetInitData();

    function getRandList(initData) {
      rand = Math.floor((Math.random() * (initData.length - 1)) + 1);
      var date = new Date;
      var compareDate = new Date('09/15/' + date.getFullYear());
      if (date.getMonth() == compareDate.getMonth() && date.getDate() >= compareDate.getDate()) {
        httpGetData("",initData[rand] + "&season=" + date.getFullYear());
        season = date.getFullYear();
      }
      else if (date.getMonth() > compareDate.getMonth()) {
        httpGetData("",initData[rand] + "&season=" + date.getFullYear());
        season = date.getFullYear();
      }
      else {
        httpGetData("",initData[rand] + "&season=" + (date.getFullYear() - 1));
        season = (date.getFullYear() - 1);
      }
    }

    function httpGetData(old_title, query){
      var url = protocolToUse + 'prod-joyfulhome-api.synapsys.us/list/' + methodType.method + '/CA/Los%20Angeles/empty/1/1';
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
          //On complete function
          curData = JSON.parse(xmlHttp.responseText);
          dataCall(offset);
          if(old_title != undefined && old_title == curData.l_title){
            advanceList();
          }
        }
      }
      xmlHttp.open( "GET", url, true ); // false for synchronous request
      xmlHttp.send( null );
    }

    // httpGetData();

    advanceList = function(){
      if(listRand < 9){
        listRand += 1;
      }else if(listRand >= 9){
        listRand = 0;
      }
      offset = 0;
      if (listType == "nfl") {
        getRandList(initData);
      }
      else {
        httpGetData(curData.l_title);
      }

    }

    function dataCall(index){
      console.log(curData);
        var listData = curData.data;
        var listName = methodType.name;
        dataLength = listData.length;
        // Convert to lower kabab case for url links

        A('.fcw-t1-p').innerHTML = listName;
        if (listName.length >= 63) {
          A('.fcw-icon').style.top = '8px';
          A('.fcw-t1').style.bottom = '0px';
        }
        else {
          A('.fcw-icon').style.top = '0px';
          A('.fcw-t1').style.bottom = '8px';
        }
        A('#verticalDisplayName').innerHTML = siteNameToUse;

        A('.fcw-t2-num').innerHTML = '#' + (index+1);
          listData[index].li_img = 'w1.synapsys.us/widgets/css/public/re_w_list_stock/Mosaic_Grid2.png';
          listData[index].li_title = listData[index].loc;
          listData[index].li_sub_txt = listData[index].totalListings;
          if (listData[index].li_img != null) {
            A('.fcw-image').style.backgroundImage = 'url('+ protocolToUse + listData[index].li_img.replace("//","") +')';
          }
          else {
            A('.fcw-image').style.backgroundImage = 'url('+ protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg" + ')';
          }
        A('.fcw-image').style.backgroundRepeat = 'no-repeat';

          A('#fcw-content2b').innerHTML = listData[index].li_sub_txt;

          A('.fcw-content3').innerHTML = "Listings Available";

          if (listData[index].li_str != null && listData[index].li_str.length >= 40) {
          A('.fcw-content1').style.display = '';
          A('.fcw-content2').style.display = '';
          A('.fcw-content').style.textAlign = 'center';
          A('.fcw-content1').innerHTML = listData[index].li_title;
        }
        else {
          A('.fcw-content1').style.display = '';
          A('.fcw-content2').style.display = '';
          A('.fcw-content1').innerHTML = listData[index].li_title;
          var hoops = true;
        }

        var listLink = buildListLink(listType, remnant, domain, curData);
        if (query.showLink != "false") {
          A('.fcw-list-list').setAttribute('href', listLink);
          if(remnant == 'true' || remnant == true){
            A('.exec-link').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_primary_url);
            A('.exec-link-text').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_primary_url);
            if (listType == "nfl" && listData[index].rankType == "team") {
              A('.exec-link').setAttribute('href', protocolToUse + "www.touchdownloyal.com/nfl/team/" + listData[index].teamName.replace(/ /g, "-").toLowerCase() + "/" + listData[index].teamId);
              A('.exec-link-text').setAttribute('href', protocolToUse + "www.touchdownloyal.com/nfl/team/" + listData[index].teamName.replace(/ /g, "-").toLowerCase() + "/" + listData[index].teamId);
            }
            else if (listType == "nfl" && listData[index].rankType == "player") {
              A('.exec-link').setAttribute('href', protocolToUse + "www.touchdownloyal.com/nfl/player/" + listData[index].teamName.replace(/ /g, "-").toLowerCase() + "/" + listData[index].playerFirstName.toLowerCase() + "-" + listData[index].playerLastName.toLowerCase() + "/" + listData[index].playerId);
              A('.exec-link-text').setAttribute('href', protocolToUse + "www.touchdownloyal.com/nfl/player/" + listData[index].teamName.replace(/ /g, "-").toLowerCase() + "/" + listData[index].playerFirstName.toLowerCase() + "-" + listData[index].playerLastName.toLowerCase() + "/" + listData[index].playerId);
            }
          }else{
              A('.exec-link').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
              A('.exec-link-text').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
          }
        }
        else {
          document.getElementsByClassName("fcw-list-list")[0].style.display = "none";
          var linkHovers = document.getElementsByClassName("hover1");
          for (i = 0; i < linkHovers.length; i++) {
            linkHovers[i].style.display = "none";
          }
        }
    }
}


/* -- Helper Functions -- */
function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

/* -- Manipulation Functions  -- */
function buildListLink(cat, remn, dom, widget_data){
  var specialDomains = [
    "latimes.com",
    "orlandosentinel.com",
    "sun-sentinel.com",
    "baltimoresun.com",
    "mcall.com",
    "courant.com",
    "dailypress.com",
    "southflorida.com",
    "citypaper.com",
    "themash.com",
    "coastlinepilot.com",
    "sandiegouniontribune.com",
    "ramonasentinel.com",
    "capitalgazette.com",
    "chicagotribune.com"
  ];
  var SpecialDomain = "";
  var currentDomain = "";
  if (document.referrer == "") {
    currentDomain = window.location.hostname.toString();
  }
  else {
    currentDomain = document.referrer;
    currentDomain = currentDomain.split('/')[2];
  }
  currentDomain = currentDomain.replace(/^[^.]*\.(?=\w+\.\w+$)/, ""); //remove www.

  dom == "lasvegasnow.com"  ? change_url = true : change_url = false;
  if (dom == null || dom == "") {
    dom = currentDomain;
  }
  change_url ? new_url = "finance.lasvegasnow.com" : "";
  doStep = true;
  switch ( cat ) {
        case 'nba':
          var base_url = remn == "true" ? "http://www.hoopsloyal.com/NBA/widget-list" : "http://www.myhoopszone.com/" + dom + "/NBA/w-list";
          break;
        case 'college_basketball':
          var base_url = remn == "true" ? "http://www.hoopsloyal.com/NCAA/widget-list" : "http://www.myhoopszone.com/" + dom + "/NCAA/w-list";
          break;
        case 'finance':
          var base_url = remn == "true" ? "http://www.investkit.com/widget-list" : "http://www.myinvestkit.com/" + dom + "/w-list";
          if ( change_url ) {
            base_url = base_url.replace("www.myinvestkit.com", new_url);
          }
          break;
        case 'mlb':
          for (i = 0; i <= specialDomains.length; i++) {
            if (currentDomain == specialDomains[i]) {
              SpecialDomain = "http://baseball." + specialDomains[i] + "/list";
            }
          }
          var base_url;
          if (SpecialDomain == "") {
            base_url = remn == "true" ? "http://homerunloyal.com/list" : "http://www.myhomerunzone.com/" + dom + "/list";
          }
          else {
            base_url = SpecialDomain;
          }
          doStep = false;
          break;
        case 'nfl':
          for (i = 0; i <= specialDomains.length; i++) {
            if (currentDomain == specialDomains[i]) {
              SpecialDomain = "http://football." + specialDomains[i] + "/list";
            }
          }
          var base_url;
          if (SpecialDomain == "") {
            base_url = remn == "true" ? "http://touchdownloyal.com/nfl" : "http://www.mytouchdownzone.com/" + dom + "/nfl";
          }
          else {
            base_url = SpecialDomain;
          }
          doStep = false;
          break;
        default:
          var base_url = remn == "true" ? "http://www.joyfulhome.com/wlist" : "http://www.myhousekit.com/" + dom + "/wlist";
          var doStep = false;
      }
      if (cat != "nfl") {
        base_url += ( doStep ) ? '?tw=' + widget_data.l_param + '&sw=' + widget_data.l_sort + '&input=' + widget_data.l_input : "/tw-" + widget_data.l_param + "+sw-" + widget_data.l_sort + "+input-" + widget_data.l_input;
      }
      else {
        base_url += "/" + "list" + "/" + widget_data.data.listData[0].rankType + "/" + widget_data.data.listData[0].statType.replace(widget_data.data.listData[0].rankType + "_", "") + "/" + season + "/" + "asc" + "/" + "10" + "/" + "1";
      }
      return base_url;
}

function convertDate(d){
  var date = d.split(' ');

  var day = date[0];
  var time = date[1];
  var tz = date[2];

  var month = MonthsFullName(day.split('/')[0]);
  var year = day.split('/')[2];
  var weekDay = day.split('/')[1];

  day = new Date(day);
  day = WeekDayNumToName(day.getDay());

  var today = new Date();
  var todayMonth = MonthsFullNameZed(today.getMonth());
  var todayYear = String(today.getFullYear()).slice(2);
  var todayDay = String(today.getDate());

  if(todayMonth == month && todayDay == weekDay && todayYear == year){
    // then it is today
    var string = 'Today' + ' ' + time + ' ' + tz;
  }else if(todayMonth == month && todayYear == year && Number(todayDay) - 1 == Number(weekDay)){
    // then it is yesterday (unless edge case where it is the end of the month)
    var string = 'Yesterday' + ' ' + time + ' ' + tz;
  }else{
    // otherwise just use day of the week
    var string = day + ' ' + time + ' ' + tz;
  }
  return string;
}

function WeekDayNumToName(n){
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[n];
}

function MonthsFullNameZed(number){
  var month = {
    "0":"January",
    "1":"February",
    "2":"March",
    "3":"April",
    "4":"May",
    "5":"June",
    "6":"July",
    "7":"August",
    "8":"September",
    "9":"October",
    "10":"November",
    "11":"December",
  }
  return month[number];
}

function MonthsFullName(number){
  var month = {
    "1":"January",
    "2":"February",
    "3":"March",
    "4":"April",
    "5":"May",
    "6":"June",
    "7":"July",
    "8":"August",
    "9":"September",
    "10":"October",
    "11":"November",
    "12":"December",
  }

  return month[number];
}
