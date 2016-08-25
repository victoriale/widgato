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
  var query = {};

  if(temp !== null && temp !== ""){
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
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

  var possibleTypes = [/*'nba',*/ 'mlb', /*'college_basketball',*/ 'finance', 'crime', 'demographics', 'disaster', 'weather'];
  // var possibleTypes = ['weather'];
  var listType = possibleTypes[getRandomInt(0,possibleTypes.length)];
  var listRand = getRandomInt(0,10);
  var apiUrl = protocolToUse + 'dw.synapsys.us/list_api.php?';
  apiUrl = apiUrl + 'cat=' + listType + '&rand=' + listRand;

  var referrer = document.referrer;
  var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

  function getBaseUrl(string){
      var urlArray = string.split("/");
      var domain = urlArray[2];
      return protocolToUse +  domain;
  }

  var colorSchemes = {
      nba: '#f7701d',
      mlb: '#b31d24',
      college_basketball: '#f7701d',
      finance: '#3098ff',
      crime: '#f6af05',
      demographics: '#65398e',
      disaster: '#902d8e',
      weather: '#ffd800'
    };
  var iconScheme = {
      nba:'../css/public/icons/Hoops-Loyal_Icon 2.svg',
      mlb:'../css/public/icons/Home-Run-Loyal_Icon 2.svg',
      college_basketball:'../css/public/icons/Hoops-Loyal_Icon 2.svg',
      finance:'../css/public/icons/Invest-Kit_Icon.svg',
      crime:'../css/public/icons/Crime_Icon.svg',
      demographics:'../css/public/icons/Demographic_Icon.svg',
      disaster:'../css/public/icons/Disaster_Icon.svg',
      weather: '../css/public/icons/Weather_Icon.svg'
    };
  var urlScheme = {
    nba: 'http://www.hoopsloyal.com',
    mlb: 'http://www.homerunloyal.com',
    college_basketball: 'http://www.hoopsloyal.com/NCAA',
    finance: 'http://www.investkit.com',
    crime: 'http://www.joyfulhome.com',
    demographics: 'http://www.joyfulhome.com',
    disaster: 'http://www.joyfulhome.com',
    weather: 'http://www.joyfulhome.com',
  };

  var schemeToUse = colorSchemes[listType];
  var iconsToUse = iconScheme[listType];
  var urlToUse = urlScheme[listType];

  function mapColorScheme(color,icons, type, url){
    A('#nextlist-svg').style.fill = color;
    A('.fcw-icon').style.backgroundColor = color;
    A('.fcw-icon').style.zIndex = "5";
    A('.fcw-icon').style.cursor = "pointer";
    A('.fcw-icon').href = url;
    A('.fcw-content1').style.color = color;

    A('.fcw-icon').style.backgroundImage = "url('" + icons + "')";
    A('#fcw-content2b').style.color = color;
    A('.fcw-list-next').style.color = color;
    A('.fcw-list-next').style.borderColor = color;

    A(".fcw-list-next").onmouseover = function() {
      A('.fcw-list-next').style.backgroundColor = color;
      A('.fcw-list-next').style.color = 'white';
      A('#nextlist-svg').style.fill = '#FFFFFF';
    }
    A(".fcw-list-next").onmouseout  = function() {
      A('.fcw-list-next').style.bordercolor = color;
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


    A(".fcw-leftnav").onmouseover = function(){
      A('.fcw-leftnav').style.backgroundColor = color;
    }
    A(".fcw-leftnav").onmouseout = function(){
      A('.fcw-leftnav').style.backgroundColor = '';
    }

    A(".fcw-rightnav").onmouseover = function(){
      A('.fcw-rightnav').style.backgroundColor = color;
    }
    A(".fcw-rightnav").onmouseout = function(){
      A('.fcw-rightnav').style.backgroundColor = '';
    }

    A(".hover1").onmouseover = function() {
      A('.hover1').style.backgroundColor = color;
    }
    A(".hover1").onmouseout  = function() {
      A(".hover1").style.backgroundColor = '';
    }

    if(type == "college_basketball"){
      A('.fcw-content-top').style.height = '25px';
      A('.fcw-content-top').style.overflow = 'hidden';
    }

    if(type == "weather"){
      A('.fcw-content3').style.height = '25px';
      A('.fcw-content3').style.overflow = 'hidden';
      //yellow causes text colors to be black....
      A('.fcw-list-text').style.color = "#000000";
      A('#swoop-svg').style.fill = "#000000";
      A('#nextlist-svg').style.fill = "#000000";
      A('.fcw-list-next').style.color = '#000000';

      A(".fcw-list-next").onmouseover = function() {
        A('.fcw-list-next').style.backgroundColor = color;
        A('.fcw-list-next').style.color = '#000000';
        A('#nextlist-svg').style.fill = '#000000';
      }
      A(".fcw-list-next").onmouseout  = function() {
        A('.fcw-list-next').style.bordercolor = color;
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


      A(".fcw-leftnav").onmouseover = function(){
        A('.fcw-leftnav').style.backgroundColor = color;
        A('.fcw-leftnav').style.stroke = "#000000";
      }
      A(".fcw-leftnav").onmouseout = function(){
        A('.fcw-leftnav').style.backgroundColor = '';
        A('.fcw-leftnav').style.stroke = "#FFFFFF";
      }


      A(".fcw-rightnav").onmouseover = function(){
        A('.fcw-rightnav').style.backgroundColor = color;
        A('.fcw-rightnav').style.stroke = "#000000";
      }
      A(".fcw-rightnav").onmouseout = function(){
        A('.fcw-rightnav').style.backgroundColor = '';
        A('.fcw-rightnav').style.stroke = "#FFFFFF"
      }


      A('.fcw-list-list').onmouseover = function(){
        A('.fcw-list-list').style.backgroundColor = '#272727';
        A('.fcw-list-list').style.borderColor = '#272727';
        A('.fcw-list-text').style.color = "#FFFFFF";
        A('#swoop-svg').style.fill = "#FFFFFF";
      }
      A('.fcw-list-list').onmouseout = function(){
        A('.fcw-list-list').style.backgroundColor = color;
        A('.fcw-list-list').style.borderColor = color;
        A('.fcw-list-text').style.color = "#000000"
        A('#swoop-svg').style.fill = "#000000";
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

    function httpGetData(old_title){
      var url = protocolToUse + 'dw.synapsys.us/list_api.php?';
      url = url + 'cat=' + listType + '&rand=' + listRand;
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

    httpGetData();

    advanceList = function(){
      if(listRand < 9){
        listRand += 1;
      }else if(listRand >= 9){
        listRand = 0;
      }
      offset = 0;
      httpGetData(curData.l_title);
    }

    function dataCall(index){
        var listName = curData.l_title;
        var listData = curData.l_data;
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

        A('.fcw-t2-num').innerHTML = '#' + (index+1);

        A('.fcw-image').style.backgroundImage = 'url('+ protocolToUse + listData[index].li_img +')';
        A('.fcw-image').style.backgroundRepeat = 'no-repeat';

        A('#fcw-content2b').innerHTML = listData[index].li_sub_txt;
        if (listType == 'finance'){
          listData[index].li_str = listData[index].li_str.replace('Reported', '');
        }
        A('.fcw-content3').innerHTML = listData[index].li_str;
        if (listData[index].li_str.length >= 40) {
          A('.fcw-content2').style.display = 'inline';
          A('.fcw-content1').style.display = 'inline';
          A('.fcw-content').style.textAlign = 'center';
          A('.fcw-content1').innerHTML = listData[index].li_title + ' | ';
        }
        else {
          A('.fcw-content1').style.display = '';
          A('.fcw-content2').style.display = '';
          A('.fcw-content1').innerHTML = listData[index].li_title;
          var hoops = true;
        }

       if (listType == 'college_basketball' && listData[index].li_title.length + listData[index].li_sub_txt.length >= 35) {
         A('#fcw-content2b').style.fontSize = '10px';
         A('.fcw-content1').style.fontSize = '12px';
       }
       else if(hoops = true){
         A('#fcw-content2b').style.fontSize = '12px';
         A('.fcw-content1').style.fontSize = '16px';
       }

        var listLink = buildListLink(listType, remnant, domain, curData);
        A('.fcw-list-list').setAttribute('href', listLink);

        if(remnant == 'true' || remnant == true){
          A('.exec-link').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_primary_url);
        }else{
          //partner site
          A('.exec-link').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
        }
    }
}


/* -- Helper Functions -- */
function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

/* -- Manipulation Functions  -- */
function buildListLink(cat, remn, dom, widget_data){

  var mlbspecialDomains = [
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

  dom == "lasvegasnow.com"  ? change_url = true : change_url = false;
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
        var mlbSpecialDomain = "";
        var currentDomain = "";
        if (document.referrer = "") {
          currentDomain = window.location.hostname.toString();
        }
        else {
          currentDomain = document.referrer;
        }
        currentDomain = currentDomain.split('/')[2];
        currentDomain = currentDomain.replace(/^[^.]*\.(?=\w+\.\w+$)/, ""); //remove www.
          for (i = 0; i <= mlbspecialDomains.length; i++) {
            if (currentDomain == mlbspecialDomains[i]) {
              mlbSpecialDomain = "http://baseball." + mlbspecialDomains[i] + "/list";
            }
          }
          var base_url;
          if (mlbSpecialDomain == "") {
            base_url = remn == "true" ? "http://homerunloyal.com/list" : "http://www.myhomerunzone.com/" + dom + "/list";
          }
          else {
            base_url = mlbSpecialDomain;
          }
          doStep = false;
          break;
        default:
          var base_url = remn == "true" ? "http://www.joyfulhome.com/wlist" : "http://www.myhousekit.com/" + dom + "/wlist";
          var doStep = false;
      }
      base_url += ( doStep ) ? '?tw=' + widget_data.l_param + '&sw=' + widget_data.l_sort + '&input=' + widget_data.l_input : "/tw-" + widget_data.l_param + "+sw-" + widget_data.l_sort + "+input-" + widget_data.l_input;
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
