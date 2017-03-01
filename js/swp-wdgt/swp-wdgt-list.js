var query = {};
var count = 0;
function getPublisher (pub) {
  var pubs = {
    mlb: {
      displayName: "Home Run Loyal",
      link: "www.homerunloyal.com",
      logo: "../css/public/pub_logos/logo-homerun-loyal.svg",
      hex: "#bc2027"
    },
    nfl: {
      displayName: "Touchdown Loyal",
      link: "www.touchdownloyal.com",
      logo: "../css/public/pub_logos/logo-touchdown-loyal.svg",
      hex: "#0b3656"
    },
    ncaaf: {
      displayName: "Touchdown Loyal",
      link: "www.touchdownloyal.com",
      logo: "../css/public/pub_logos/logo-touchdown-loyal.svg",
      hex: "#0b3656"
    },
    nba: {
      displayName: "Hoops Loyal",
      link: "www.hoopsloyal.com",
      logo: "../css/public/pub_logos/logo-hoops-loyal.svg",
      hex: "#f26f26"
    },
    college_basketball: {
      displayName: "Hoops Loyal",
      link: "www.hoopsloyal.com",
      logo: "../css/public/pub_logos/logo-hoops-loyal.svg",
      hex: "#f26f26"
    },
    finance: {
      displayName: "Invest Kit",
      link: "www.investkit.com",
      logo: "../css/public/pub_logos/logo-invest-kit.svg",
      hex: "#3098ff"
    },
    disaster: {
      displayName: "Joyful Home",
      link: "www.joyfulhome.com",
      logo: "../css/public/pub_logos/logo-joyful-home.svg",
      hex: "#43B149"
    },
    crime: {
      displayName: "Joyful Home",
      link: "www.joyfulhome.com",
      logo: "../css/public/pub_logos/logo-joyful-home.svg",
      hex: "#43B149"
    },
    weather: {
      displayName: "Joyful Home",
      link: "www.joyfulhome.com",
      logo: "../css/public/pub_logos/logo-joyful-home.svg",
      hex: "#43B149"
    },
    demographics: {
      displayName: "Joyful Home",
      link: "www.joyfulhome.com",
      logo: "../css/public/pub_logos/logo-joyful-home.svg",
      hex: "#43B149"
    }
  };
  return pubs[pub];
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
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
  var possibleTypes = [/*'nba','mlb', 'college_basketball', 'finance', 'crime',*/ 'demographics'/*, 'disaster', 'weather', 'nfl'*/];
  var listType = possibleTypes[getRandomInt(0,possibleTypes.length)];
  var listRand = getRandomInt(0,10);

  var referrer = document.referrer;
  var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;
  function getBaseUrl(string){
      var urlArray = string.split("/");
      var domain = urlArray[2];
      return protocolToUse +  domain;
  }

  var colorSchemes = {
      nba: '#f26f26',
      mlb: '#bc2027',
      nfl: '#2d3e50',
      college_basketball: '#f26f26',
      finance: '#3098ff',
      crime: '#f6af05',
      demographics: '#65398e',
      disaster: '#902d8e',
      weather: '#ffd800'
    };
  var iconScheme = {
      nba:'../css/public/icons/Hoops-Loyal_Icon 2.svg',
      mlb:'../css/public/icons/Home-Run-Loyal_Icon 2.svg',
      nfl:'../css/public/Icon_Football.png',
      college_basketball:'../css/public/icons/Hoops-Loyal_Icon 2.svg',
      finance:'../css/public/Invest-Kit_Icon.svg',
      crime:'../css/public/icons/Crime_Icon.svg',
      demographics:'../css/public/icons/Demographic_Icon.svg',
      disaster:'../css/public/icons/Disaster_Icon.svg',
      weather: '../css/public/icons/Weather_Icon.svg'
    };
  var urlScheme = {
    nba: 'http://www.hoopsloyal.com',
    mlb: 'http://www.homerunloyal.com',
    nfl: 'http://www.touchdownloyal.com',
    college_basketball: 'http://www.hoopsloyal.com/NCAA',
    finance: 'http://www.investkit.com',
    crime: 'http://www.joyfulhome.com',
    demographics: 'http://www.joyfulhome.com',
    disaster: 'http://www.joyfulhome.com',
    weather: 'http://www.joyfulhome.com',
  };
  var siteName = {
    nba: 'Basketball',
    mlb: 'Baseball',
    nfl: 'Football',
    college_basketball: 'Basketball',
    finance: 'Finance',
    crime: 'Crime',
    demographics: 'Demographics',
    disaster: 'Disaster',
    weather: 'Weather',
  };

  var schemeToUse = colorSchemes[listType];
  var iconsToUse = iconScheme[listType];
  var urlToUse = urlScheme[listType];
  var siteNameToUse = siteName[listType];

  function mapColorScheme(color,icons, type, url){

    if (query.showLink != "false") {
      A(".fcw-content1").onmouseover = function() {
        A('.fcw-content1').style.color = color;
      }
      A(".fcw-content1").onmouseout  = function() {
        A(".fcw-content1").style.color = '';
      }
    }

    currentPub = getPublisher(type);

    //new dyanmic pub color css code
    A('#pub_logo').style.backgroundImage = "url('" + currentPub.logo + "')";
    var css = "";
    if (query.showLink != "false") {
      A('#pub_link').href = "http://" + currentPub.link;
      css += '#carousel:hover .carouselShaderHover {background-color: ' + currentPub.hex + '; opacity: 0.4;} ';
      css += '#carousel:hover #mainimg {-webkit-transform: scale(1.08) translateY(-50%); transform: scale(1.08) translateY(-50%);}';
    }
    css += '.dw-info {border-left: 3px solid ' + currentPub.hex + '; padding-left: 10px;}';
    css += '.dw-nav {stroke: ' + currentPub.hex + '; } .dw-nav:hover {background-color: ' + currentPub.hex + '; stroke: white;}';
    style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    //end dynamic pub color css code

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
      if (listType == "nfl") {
        var url = protocolToUse + 'prod-touchdownloyal-api.synapsys.us/list/' + query;
      }
      else {
        var url = protocolToUse + 'dw.synapsys.us/list_api.php?';
        url = url + 'cat=' + listType + '&rand=' + listRand;
      }
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
        if (listType == "nfl") {
          var listData = curData.data.listData;
          var listName = curData.data.listInfo.listName;
        }
        else {
          var listData = curData.l_data;
          var listName = curData.l_title;
          listName = listName.replace("MLB","Baseball");
        }
        if (count == 0 && (listType == "nfl" || listType == "ncaaf")) {
          var goodIndex = 0;
          for (n = 0; n < listData.length; n++) {
            if (listData[n].playerHeadshotUrl.indexOf('no_image') == -1 || listData[n].teamLogo.indexOf('no_image') == -1) {
              goodIndex = n;
              break;
            }
          }
          count++;
          dataCall(goodIndex);
          return;
        }
        dataLength = listData.length;
        // Convert to lower kabab case for url links

        A('.fcw-t1-p').innerHTML = listName;
        // if (listName.length >= 63) {
        //   // A('.fcw-icon').style.top = '8px';
        //   A('.fcw-t1').style.bottom = '0px';
        // }
        // else {
        //   // A('.fcw-icon').style.top = '0px';
        //   A('.fcw-t1').style.bottom = '8px';
        // }
        // A('#verticalDisplayName').innerHTML = siteNameToUse;

        A('#num').innerHTML = '<hash>#</hash>' + (index+1);

        //todo: plug in actual api date values here
        var date = new Date();
        var monthNames = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        A('#meta').innerHTML = "Posted on " + dayNames[date.getDay()] + ", " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

        if (listType == "nfl") {
          if (listData[index].rankType == "team") {

            if (listData[index].teamLogo != null) {
              A('.fcw-image').src = protocolToUse + "images.synapsys.us" + listData[index].teamLogo;
            }
            else {
              A('.fcw-image').src = protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg";
            }

          }
          else {

            if (listData[index].playerHeadshotUrl != null) {
              A('.fcw-image').src = protocolToUse + "images.synapsys.us" + listData[index].playerHeadshotUrl;
            }
            else {
              A('.fcw-image').src = protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg";
            }

          }
        }
        else {

          if (listData[index].li_img != null) {
            A('.fcw-image').src = protocolToUse + listData[index].li_img.replace("//","");
          }
          else {
            A('.fcw-image').src = protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg";
          }

        }
        A('.fcw-image').style.backgroundRepeat = 'no-repeat';

        if (listType == "nfl") {
          A('#fcw-content2b').innerHTML = listData[index].divisionName;
        }
        else {
          A('#fcw-content2b').innerHTML = listData[index].li_sub_txt;
        }
        if (listType == 'finance'){
          listData[index].li_str = listData[index].li_str.replace('Reported', '');
        }
        if (listType == "nfl") {
          var statType = listData[index].statDescription.replace(/_/g, " ");
          statType = statType.replace("player", "");
          statType = statType.replace("team", "");
          statType = statType.replace(/(^| )(\w)/g, function(x) {
            return x.toUpperCase();
          });
          var stat = Math.floor(Number(listData[index].stat));
          A('.fcw-content3').innerHTML = stat + " " + statType;
        }
        else {
          A('.fcw-content3').innerHTML = listData[index].li_str;
        }
        if (listType == "nfl") {
          A('.fcw-content1').style.display = '';
          A('.fcw-content2').style.display = '';
          if (listData[index].rankType == "team") {
            A('.fcw-content1').innerHTML = listData[index].teamName;
          }
          else {
            A('.fcw-content1').innerHTML = listData[index].playerFirstName + " " + listData[index].playerLastName;
          }
        }
        else if (listData[index].li_str != null && listData[index].li_str.length >= 40) {
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
          //main links
          A('#imgurl').setAttribute('href', listLink);
          A('#title-link').setAttribute('href', listLink);
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
            //partner site
            if (listType == "nfl") {
              A('.exec-link').setAttribute('href', protocolToUse + "www.touchdownloyal.com/nfl/team/" + listData[index].teamName.replace(/ /g, "").toLowerCase() + "/" + listData[index].teamId);
              A('.exec-link-text').setAttribute('href', protocolToUse + "www.touchdownloyal.com/nfl/team/" + listData[index].teamName.replace(/ /g, "").toLowerCase() + "/" + listData[index].teamId);
            }
            else {
              A('.exec-link').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
              A('.exec-link-text').setAttribute('href', protocolToUse.replace('//','') + listData[index].li_partner_url.replace('{partner}',domain));
            }
          }
        }
        else {
          var linkHovers = document.getElementsByClassName("hover1");
          for (i = 0; i < linkHovers.length; i++) {
            linkHovers[i].style.display = "none";
          }
        }
        //share links
        A('#shareFacebook').href = "https://www.facebook.com/sharer/sharer.php?u=" + listLink;
        A('#shareTwitter').href = "https://twitter.com/home?status=" + listLink;
        A('#shareLink').addEventListener("click", function(){
          copyToClipboard(listLink);
          A('#shareSuccess').style.display = "block";
          setTimeout(function(){
            A('#shareSuccess').style.display = "none";
          }, 2000);
         });
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
