//create friendly iframe to place ourselves inside
var friendlyIframe = document.createElement('iframe');
friendlyIframe.width = '300';
friendlyIframe.height = '250';
friendlyIframe.src = 'about:blank';
friendlyIframe.style.border = 'none';
document.body.appendChild(friendlyIframe);
var iframeContent = friendlyIframe.contentWindow;
//inject HTML and CSS structure
  iframeContent.document.write(`
    <style>
    body {
      border: none;
      margin: 0;
      padding: 0;
      -webkit-overflow-scrolling: auto;
    }
    .icon {
      background-position: 50%;
      background-repeat: no-repeat;
      height: 30px;
      width: 30px;
    }
    .wrapper {
      position: absolute;
      overflow: hidden;
      width: 300px;
      height: 250px;
      background-color: #f7f7f7;
    }
    .edge_shader {
      position: absolute;
      right:-5px;
      top:0;
      width: 3px;
      height: 100%;
      box-shadow:  -5px 0 10px rgba(0,0,0,0.8);
      z-index: 999;
      transition: opacity 0.2s ease-in-out;
    }
    .helper {
      box-sizing: border-box;
      position: absolute;
      right:0px;
      left:0px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 5px 10px;
      font-family: lato;
      /*font-weight: 300;*/
      font-size: 12px;
      color: black;
      -webkit-backdrop-filter: blur(3px);
      backdrop-filter: blur(3px);
      background-color: rgba(248, 248, 248, 0.9);
      transition: opacity 0.2s ease-in-out;
      z-index: 9999;
    }
    .helper2 {
      pointer-events: none;
      position: absolute;
      box-sizing: border-box;
      width: 35px;
      right:0px;
      top: 50%;
      transform: translateY(-50%);
      padding: 10px 5px 10px 10px;
      font-family: lato;
      /*font-weight: 300;*/
      font-size: 20px;
      color: black;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      overflow: hidden;
      -webkit-backdrop-filter: blur(3px);
      backdrop-filter: blur(3px);
      background-color: rgba(247, 247, 247, 0.85);
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.26), 0 0 0 1px rgba(0,0,0,0.09);
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
      z-index: 9999;
    }
    .helper2 .icon {
      animation:swipe 2s infinite;
    }
    @keyframes swipe {
      0%{
        -webkit-transform: translateX(50px);
        -moz-transform: translateX(50px);
        -ms-transform: translateX(50px);
        -o-transform: translateX(50px);
        transform: translateX(50px);
        opacity: 0.01;
      }
      50% {
        -webkit-transform: translateX(-5px);
        -moz-transform: translateX(-5px);
        -ms-transform: translateX(-5px);
        -o-transform: translateX(-5px);
        transform: translateX(-5px);
        opacity:1;
      }
      100% {
        -webkit-transform: translateX(-50px);
        -moz-transform: translateX(-50px);
        -ms-transform: translateX(-50px);
        -o-transform: translateX(-50px);
        transform: translateX(-50px);
        opacity:0.01;
      }
    }
    .worm {
      position: absolute;
      width: 300px;
      height: 250px;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      background-color: #f7f7f7;
      animation:bounce 2s infinite;
    }
    .worm.stopAnim {
      -webkit-animation: 0;
      animation: 0;
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        -webkit-transform: translateX(0);
        -moz-transform: translateX(0);
        -ms-transform: translateX(0);
        -o-transform: translateX(0);
        transform: translateX(0); }
      40% {
        -webkit-transform: translateX(30px);
        -moz-transform: translateX(30px);
        -ms-transform: translateX(30px);
        -o-transform: translateX(30px);
        transform: translateX(30px); }
      60% {
        -webkit-transform: translateX(15px);
        -moz-transform: translateX(15px);
        -ms-transform: translateX(15px);
        -o-transform: translateX(15px);
        transform: translateX(15px); } }
    .worm_block {
      position: relative;
      display: inline-block;
      height: 250px;
      padding-left: 5px;
    }
    .worm_block:nth-of-type(1) {
      padding-left: 5px!important;
    }
    .worm_block:nth-of-type(2) {
      padding-left: 0px;
    }
    .worm_block:nth-of-type(3n+1) {
      padding-left: 0px;
    }
    .worm_block:last-of-type {
      margin-right: 10px;
    }
    .list_item {
      overflow: hidden;
      position: relative;
      display: inline-block;
      height: 218px;
      width: 138px;
      margin-bottom:4px;
      background-color: white;
      border-radius: 2px;
      border: solid 1px #e1e1e1;
      margin-left: 2px;
    }
    .ad_spacer {
      width: 300px;
      height: 100%;
      background-color: red;
    }
    .ad_item {
      position: absolute;
      height: 100%;
      top:0;
      z-index: 99;
    }
    .profile_image_div {
      width: 100%;
      height: 123px;
      display: block;
      overflow:hidden;
      position: absolute;
      background-size: 10000% 10000%;
      image-rendering: optimizeSpeed;             /*                     */
      image-rendering: -moz-crisp-edges;          /* Firefox             */
      image-rendering: -o-crisp-edges;            /* Opera               */
      image-rendering: -webkit-optimize-contrast; /* Chrome (and Safari) */
      image-rendering: optimize-contrast;         /* CSS3 Proposed       */
      -ms-interpolation-mode: nearest-neighbor;   /* IE8+                */
      border-bottom: 1px solid rgba(50,50,50,0.1);
    }
    .profile_image {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .num {
      position: absolute;
      right: -5px;
      top: -20px;
      width: 0;
      height: 0;
      border-top: 30px solid transparent;
      border-bottom: 30px solid transparent;
      border-left: 30px solid #ff00a8;
      transform: rotate(-45deg);
      z-index: 9;
    }
    .num_text {
    	font-size: 12px;
      color: white;
      top: -8px;
      right: 12px;
      position: absolute;
      transform: rotate(45deg);
    }
    .info {
      width: 100%;
      position: absolute;
      top: 130px;
      font-family: lato;
      text-align: center;
    }
    .name {
      font-weight: bold;
      font-size: 14px;
      max-width 95%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 5px;
      margin-bottom: 5px;
      margin-top: 5px;
    }
    .symbl, .location {
      font-size: 12px;
      color: #bebebe;
      max-width 95%;
      padding: 0 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .location {
      margin-bottom: 5px;
      max-width 95%;
      padding: 0 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .value {
      font-size: 20px;
      color: #545454;
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 5px;
    }
    .stat_type {
      font-size: 12px;
      color: #666666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 5px;
    }

    </style>
    <div class="wrapper">
      <div class="helper" id="helper">
      </div>
      <div class="helper2" id="helper2">
        <div class="icon swipe_right" style="background-image:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTM2LDMxLjM0NWMwLTAuOTEyLDAtMS43NzgsMC0yLjU5MWMtMi0xLjQ1OC0zLjQwMi0zLjgxNC0zLjQwMi02LjQ3NmMwLTQuNDE2LDMuNTUtOC4wMSw3Ljk2NS04LjAxICAgYzQuNDE4LDAsNy44ODEsMy41OTQsNy44ODEsOC4wMWMwLDIuNjYyLTEuNDQzLDUuMDE5LTMuNDQzLDYuNDc3djIuNTljMy0xLjcwNCw1LjYzMS01LjEyNSw1LjYzMS05LjA2NiAgIGMwLTUuNjM1LTQuNTMxLTEwLjIxOS0xMC4xNjYtMTAuMjE5cy0xMC4xMDMsNC41ODQtMTAuMTAzLDEwLjIxOUMzMC4zNjIsMjYuMjIxLDMzLDI5LjY0MiwzNiwzMS4zNDV6Ii8+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTcwLjA3LDQzLjExOGgtMi43NjJjLTAuNzc3LDAtMS41NzQsMC4xODgtMi4yNzUsMC41M2MtMC4zNjItMi4wNzUtMi4xNzYtMy42NTgtNC4zNTMtMy42NThoLTIuNzYzICAgYy0wLjkwOSwwLTEuNzU5LDAuMjc4LTIuNDYyLDAuNzUyYy0wLjYwOC0xLjcxNS0yLjI0Ni0yLjk0NC00LjE2NS0yLjk0NGgtMi43NjNjLTAuODA1LDAtMS41NTksMC4yMTYtMi4yMSwwLjU5M1YyMi4yNzggICBjMC0zLjE5OC0yLjYwMi01LjgtNS44LTUuOGMtMy4xOTYsMC01LjgsMi42MDItNS44LDUuOHYzMC41OTFjLTEuMjM5LDAuNTg5LTIuMzg5LDEuMzgxLTMuMzg5LDIuMzc5bC0yLjI2NCwyLjI2NSAgIGMtNC43MzksNC43MzktNC43MzksMTIuNDQ3LDAsMTcuMTg2bDYuMzEsNi4zMTFjMC4zMSwwLjMxLDAuNjM1LDAuNTk2LDAuOTcsMC44NjdjMi4xMDMsMy42MjEsNi4wMzIsNi4wNjQsMTAuNTI1LDYuMDY0aDE1LjQ2NyAgIGM2LjcwMSwwLDEyLjE1LTUuNDI5LDEyLjE1LTEyLjEwMlY0Ny41MzZDNzQuNDg4LDQ1LjEsNzIuNTA3LDQzLjExOCw3MC4wNyw0My4xMTh6IE03Mi4yNzksNzUuODM5ICAgYzAsNS40NTQtNC40NTksOS44OTItOS45NDEsOS44OTJINDYuODcxYy0xLjgyMSwwLTMuNTI1LTAuNDk3LTQuOTk1LTEuMzUzYy0xLjIxOS0wLjcyOS0yLjU3Ny0xLjc4OC0zLjgyLTMuOTgxICAgYy0wLjcxNy0xLjM2NS0xLjEyNy0yLjkxNC0xLjEyNy00LjU1OGMwLTAuNjEtMC40OTUtMS4xMDUtMS4xMDQtMS4xMDVjLTAuNjExLDAtMS4xMDUsMC40OTUtMS4xMDUsMS4xMDUgICBjMCwwLjUwMywwLjAzNSwwLjk5NywwLjA5NSwxLjQ4MmwtNC4xODYtNC4xODZjLTMuODc2LTMuODc2LTMuODc2LTEwLjE4NCwwLTE0LjA2MWwyLjI2NS0yLjI2NCAgIGMwLjU1Ny0wLjU1NywxLjE3My0xLjAyOSwxLjgyNi0xLjQzNHY3LjU2N2MwLDAuNjExLDAuNDk0LDEuMTA1LDEuMTA1LDEuMTA1YzAuNjA5LDAsMS4xMDQtMC40OTQsMS4xMDQtMS4xMDVWMjIuMjc4ICAgYzAtMS45NzksMS42MS0zLjU5MSwzLjU5LTMuNTkxYzEuOTgsMCwzLjU5MSwxLjYxMiwzLjU5MSwzLjU5MXYyOC4zNzhjMCwwLjYxMSwwLjQ5NCwxLjEwNSwxLjEwNCwxLjEwNSAgIGMwLjYwOSwwLDEuMTA0LTAuNDk0LDEuMTA0LTEuMTA1di04LjQ0YzAtMS4yMTcsMC45OTEtMi4yMDgsMi4yMS0yLjIwOGgyLjc2M2MxLjIxNywwLDIuMjA5LDAuOTkxLDIuMjA5LDIuMjA4djguNDUyICAgYzAsMC42MSwwLjQ5MywxLjEwNCwxLjEwNCwxLjEwNGMwLjYwOSwwLDEuMTA1LTAuNDkzLDEuMTA1LTEuMTA0di02LjI1OWMwLTEuMjE3LDAuOTktMi4yMDksMi4yMDgtMi4yMDloMi43NjMgICBjMS4yMTgsMCwyLjIwOSwwLjk5MiwyLjIwOSwyLjIwOXY2LjI0N2MwLDAuNjExLDAuNDk0LDEuMTA1LDEuMTA1LDEuMTA1YzAuNjA4LDAsMS4xMDQtMC40OTQsMS4xMDQtMS4xMDV2LTQuMDA1ICAgYzAtMC42NDQsMS4xMzctMS4zMjQsMi4yMS0xLjMyNGgyLjc2MmMxLjIxOCwwLDIuMjA5LDAuOTkxLDIuMjA5LDIuMjA5Vjc1LjgzOXoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNjIuOTEyLDY4SDQ5LjAwOWwxLjQyOC0xLjM0OGMwLjQzMi0wLjQzMiwwLjQzMi0xLjA5LDAtMS41MjFjLTAuNDMyLTAuNDMzLTEuMTMxLTAuNDEyLTEuNTYyLDAuMDIgICBsLTMuMzExLDMuMzIxYy0wLjEwMywwLjEwMi0wLjE4NSwwLjIyOS0wLjI0MSwwLjM2NGMtMC4wNTYsMC4xMzQtMC4wODYsMC4yNzktMC4wODYsMC40MjdzMC4wMywwLjI5NCwwLjA4NiwwLjQyNyAgIGMwLjA1MiwwLjEyNCwwLjEyOSwwLjIzMywwLjIyLDAuMzI5YzAuMDA4LDAuMDA4LDAuMDExLDAuMDIxLDAuMDE5LDAuMDI4bDMuMzEzLDMuMzEzYzAuMjE1LDAuMjE2LDAuNDk4LDAuMzIzLDAuNzgyLDAuMzIzICAgYzAuMjgxLDAsMC41NjQtMC4xMDcsMC43OC0wLjMyM2MwLjQzMi0wLjQzMiwwLjQzMi0xLjMxNSwwLTEuNzQ3TDQ5LjAwNyw3MGgxMy45MDVjMC42MSwwLDEuMTA0LTAuMzksMS4xMDQtMC45OTkgICBDNjQuMDE3LDY4LjM5LDYzLjUyMiw2OCw2Mi45MTIsNjh6Ii8+PC9nPjwvc3ZnPg==);"></div>
      </div>
    <div class="worm" id="worm">
    </div>
  </div>
    `);
    //inject Google font CSS
    var link = iframeContent.document.createElement( "link" );
    link.href = "http://fonts.googleapis.com/css?family=Lato:400,300,100,700,900";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    iframeContent.document.getElementsByTagName( "head" )[0].appendChild( link );

  //begin centipede logic
  //initial variable declaration
  var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
  if (decodeURIComponent(location.search.substr(1)) != null && decodeURIComponent(location.search.substr(1)) != "") {
    var input = JSON.parse(decodeURIComponent(location.search.substr(1)));
  }
  else {
    var scripts = document.getElementsByTagName('script');
    for (i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf("centipede.js") != -1) {
        var myScript = scripts[i];
      }
    }
    var queryString = myScript.src.replace(/^[^\?]+\??/,'');
    var input = JSON.parse(decodeURI(queryString));
  }
  if (input.env != "prod-" && input.env != "dev-") {
    input.env = "prod-";
  }
  var categories = ['finance', 'nba', 'college_basketball', 'weather', 'crime', 'demographics', 'politics', 'disaster', 'mlb', 'nfl','ncaaf','nflncaaf'];
  var apiUrl = protocolToUse +input.env.replace("prod-","")+'dw.synapsys.us/list_api.php';
  var helper = iframeContent.document.getElementById('helper');
  var helper2 = iframeContent.document.getElementById('helper2');
  var wormBlocks = iframeContent.document.getElementsByClassName('worm_block');
  var worm = iframeContent.document.getElementById('worm');
  var position;
  var currentBlock = 0;
  var isScrolling = false;
  var scrollingTimout;
  var scrollTo = 0;
  var scrollIncrements = 0;
  var rand;
  var setSmoothScrollInterval;
  var n = 0;
  var userScroll = true;
  var firstAd;

  if (typeof input.category == 'undefined' || categories.indexOf(input.category) == -1) {
      input.category = 'finance'; //default category fallback
  }
    //rand is a random value (1-50) that coresponds to a specific list for a given category (does not apply to football)
    var e = rand;
    while (e == rand) {
      e = Math.floor(Math.random() * 50);
      if (e == 0) {e = 1;}
    }
  rand = e;
  var i;
  if (window.XMLHttpRequest) {
      i = new XMLHttpRequest
  } else {
      i = new ActiveXObject('Microsoft.XMLHTTP')
  }
  i.onreadystatechange = function() {
      if (i.readyState == XMLHttpRequest.DONE) {
          if (i.status == 200) {
            //fire this, when either the TDL api or the standard API comes back
            r = JSON.parse(i.responseText);
            populateWorm(r);
          } else {
              var e = i.statusText;
              if (i.status == 500) {
                  try {
                      e = JSON.parse(i.responseText).message;
                  } catch (t) {
                      console.log('No JSON message')
                  }
              }
              e = 'HTTP Error (' + i.status + '): ' + e;
              if (n++ > 10) {
                  throw e
              }
          }
      }
  };
  rand = e;
  if (input.category == "nfl" || input.category == "ncaaf" || input.category == "nflncaaf") { //fetch curated TDL API queries
      if (input.category == "nfl") {
        var url = protocolToUse + 'w1.synapsys.us/widgets/js/tdl_list_array.json';
      }
      else if (input.category == "ncaaf") {
        var url = protocolToUse + 'w1.synapsys.us/widgets/js/tdl_list_array_ncaaf.json';
      }
      else if (input.category == "nflncaaf") {
        rand = Math.floor((Math.random() * 2) + 1);
        if (rand == 1) {
          var url = protocolToUse + 'w1.synapsys.us/widgets/js/tdl_list_array_ncaaf.json';
          l.category = "ncaaf";
        }
        else {
          var url = protocolToUse + 'w1.synapsys.us/widgets/js/tdl_list_array.json';
          l.category = "nfl";
        }
      }
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
          //On complete function
          initData = JSON.parse(xmlHttp.responseText);
          rand = Math.floor((Math.random() * (initData.length - 1)) + 1);
          var date = new Date;
          var compareDate = new Date('09/15/' + date.getFullYear());
          //TDL API queries
          if (date.getMonth() == compareDate.getMonth() && date.getDate() >= compareDate.getDate()) {
            i.open('GET', protocolToUse + input.env+"touchdownloyal-api.synapsys.us/list/" + initData[rand] + "&season=" + date.getFullYear() , true);
            i.send()
          }
          else if (date.getMonth() > compareDate.getMonth()) {
            i.open('GET', protocolToUse + input.env+"touchdownloyal-api.synapsys.us/list/" + initData[rand] + "&season=" + date.getFullYear() , true);
            i.send()
          }
          else {
            i.open('GET', protocolToUse +input.env+"touchdownloyal-api.synapsys.us/list/" + initData[rand] + "&season=" + (date.getFullYear() - 1) , true);
            i.send()
          }
        }
      }
      xmlHttp.open( "GET", url, true ); // false for synchronous request
      xmlHttp.send( null );
  }
  else { //normal, non TDL api query
    i.open('GET', apiUrl + '?partner=' + (typeof input.dom != 'undefined' ? input.dom : '') + '&cat=' + input.category + '&rand=' + e, true);
    i.send()
  }

  function populateWorm(data) {
    if (input.category == "nfl" || input.category == "ncaaf") { //if TDL data, transform it
      data = data.data;
      data.l_title = data.listInfo.listName;
      var items = [];
      if (data.listData[0].rankType == "team") { // team
        for (i = 0; i < data.listData.length; i++) {
          items.push(
            {
              li_img: protocolToUse + "images.synapsys.us" + data.listData[i].teamLogo,
              li_value: data.listData[i].stat,
              li_tag: data.listData[i].statDescription,
              li_title: data.listData[i].teamName,
              li_sub_txt: data.listData[i].divisionName
            }
          );
        }
      }
      else { //player
        for (i = 0; i < data.listData.length; i++) {
          items.push(
            {
              li_img: protocolToUse + "images.synapsys.us" + data.listData[i].playerHeadshotUrl,
              li_value: data.listData[i].stat,
              li_tag: data.listData[i].statDescription,
              li_title: data.listData[i].playerFirstName + " " + data.listData[i].playerLastName,
              li_sub_txt: data.listData[i].teamName
            }
          );
        }
      }
    }
    else { //non TDL data
      var items = data.l_data;
    }
    //1st item before the ad
    items[0].li_value = items[0].li_value.replace(items[0].li_tag,"");
    var image = items[0].li_img;
    helper.innerHTML = data.l_title;
    worm.innerHTML = `
      <div class="worm_block">
        <div class="list_item">
          <div class="profile_image_div" style="background-image:url('`+image+`')">
          <div class="num"><div class="num_text">#<b>1</b></div></div>
            <img class="profile_image" src="`+image+`">
          </div>
          <div class="info">
            <div class="name">
              `+items[0].li_title.replace("Corporation","Corp")+`
            </div>
            <div class="value">
              `+items[0].li_value+`
            </div>
            <div class="stat_type">
              `+items[0].li_tag+`
            </div>
          </div>
        </div>
      </div>
      <div class="worm_block">
      <div class="ad_spacer"></div>
        <div id="first_ad" class="ad_item">

        </div>
      </div>
    `;
    setTimeout(function(){ //wait for dom to render before executing igloo script
      var s = iframeContent.document.createElement("script");
      s.type = "text/javascript";
      s.src = "//content.synapsys.us/embeds/inline_300x250/partner.js";
      firstAd = iframeContent.document.getElementById('first_ad');
      firstAd.appendChild(s);
    }, 100);

    //every other item (except the first)
    for (var i = 1; i < items.length && i < 10; i ++) {
      items[i].li_value = items[i].li_value.replace(items[i].li_tag,"");
      image = items[i].li_img;
      worm.innerHTML += `
        <div class="worm_block">
          <div class="list_item">
            <div class="profile_image_div" style="background-image:url('`+image+`')">
            <div class="num"><div class="num_text">#<b>`+(i+1)+`</b></div></div>
              <img class="profile_image" src="`+image+`">
            </div>
            <div class="info">
              <div class="name">
                `+items[i].li_title.replace("Corporation","Corp")+`
              </div>
              <div class="value">
                `+items[i].li_value+`
              </div>
              <div class="stat_type">
                `+items[i].li_tag+`
              </div>
            </div>
          </div>
        </div>
      `;
      if (i % 2 == 0) { //show ad every even number
        worm.innerHTML += `
        <div class="worm_block">
        <div class="ad_spacer"></div>
          <div class="ad_item">

          </div>
        </div>`;
      }
    }
  }

  //initial event listeners declaration

  worm.addEventListener("scroll", onSwipe);
  function onSwipe(e) {
    isScrolling = true; //will return true or false based on whether the user is currently scrolling or not

    // set visibility of helper and list title, based on scroll position
    if (this.scrollLeft > 20) {
      worm.classList.add("stopAnim");
      helper2.style.opacity = '0';
    }
    else {
      worm.classList.remove("stopAnim");
      helper.style.opacity = '1';
      helper2.style.opacity = '1';
    }
    var rect = firstAd.getBoundingClientRect();
    if (rect.left < -320) { //logic to jump ad to next space when you scroll past it
      // console.log("fire move next");
      firstAd.style.left = (Math.floor(this.scrollLeft / 300)*304 + 300) + "px";
    }
     else if (rect.left > 320) { //logic to jump ad to prev space when you scroll past it
      // console.log("fire move prev");
      firstAd.style.left = ((Math.floor(this.scrollLeft / 300)*304) - 300) + "px";
    }
    clearTimeout(scrollingTimout);
    scrollingTimout = setTimeout(function(){ // wait till scroll is finished and set flag as false
      if (userScroll == true) {
        setScroll();
      }
      isScrolling = false; //will return true or false based on whether the user is currently scrolling or not
    }, 250);
  }
  worm.addEventListener("touchend", onFingerUp);
  function onFingerUp(e) { //logic to determine if the user is currently actively scrolling
    if (isScrolling == false) {
      // setScroll();
    }
    else {
      var setScrollInterval = setInterval(function(){
        if (isScrolling == false) {
          // setScroll();
          clearTimeout(setScrollInterval);
        }
      }, 250);
    }
  }
  worm.addEventListener("touchstart", onFingerDown);
  function onFingerDown(e) { //if another swipe interups our snap animation, stop the snap and allow the swipe
    clearTimeout(setSmoothScrollInterval);
  }

  //logic to snap scrolled block into view, when user scroll has ended
  function setScroll() {
    for (i = 0; i < wormBlocks.length;  i++) {
      if ((worm.scrollLeft + 180) >= wormBlocks[i].offsetLeft && (worm.scrollLeft + 180) <= (wormBlocks[i].offsetLeft + wormBlocks[i].offsetWidth) && worm.scrollLeft > 20) {
        //if user has swiped past the halfway mark on the next block, advance blocks to the one user has scrolled to. Otherwise, reset blocks back to starting point of swipe
        scrollTo = wormBlocks[i].offsetLeft;
        if (worm.scrollLeft < scrollTo) {
          scrollIncrements = 1;
        }
        else {
          scrollIncrements = -1;
        }
        setSmoothScrollInterval = setInterval(function(){
          var marginOfError = 0;
          if (worm.scrollLeft < (scrollTo - marginOfError) || worm.scrollLeft > (scrollTo + marginOfError)) {
            //if within margin of error of target, end scroll
            if (i == (wormBlocks.length - 1)) {
              clearTimeout(setSmoothScrollInterval);
            }
            else {
              worm.scrollLeft = worm.scrollLeft + scrollIncrements;
            }
          }
          else {
            userScroll = false;
            setTimeout(function(){
              userScroll = true;
            }, 500);
            clearTimeout(setSmoothScrollInterval);
          }
        }, 2);
        currentBlock = i;
        if (wormBlocks[i].getElementsByClassName("ad_item").length >= 1) { //hide title if ad is current item in view
          helper.style.opacity = '0';
        }
        else {
          helper.style.opacity = '1';
        }
        return;
      }

      else if (worm.scrollLeft < 20) { // special logic for first list item
        scrollTo = 0;
        if (worm.scrollLeft < scrollTo) {
          scrollIncrements = 1;
        }
        else {
          scrollIncrements = -1;
        }
        setSmoothScrollInterval = setInterval(function(){
          var marginOfError = 0;
          if (worm.scrollLeft < (scrollTo - marginOfError) || worm.scrollLeft > (scrollTo + marginOfError)) {
            if (i == (wormBlocks.length - 1)) {
              clearTimeout(setSmoothScrollInterval);
            }
            else {
              worm.scrollLeft = worm.scrollLeft + scrollIncrements;
            }
          }
          else {
            userScroll = false;
            setTimeout(function(){
              userScroll = true;
            }, 500);
            clearTimeout(setSmoothScrollInterval);
          }
        }, 15);
        currentBlock = 0;
        return;
      }
    }
    // if ((currentBlock + 1) <= wormBlocks.length) {
    //   worm.scrollLeft = wormBlocks[currentBlock + 1].offsetLeft - 5;
    //   currentBlock = (currentBlock + 1);
    // }
  }
