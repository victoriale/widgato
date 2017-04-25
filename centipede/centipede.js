var centipede = function() {
var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
//create friendly iframe to place ourselves inside
var countSelf = document.getElementsByClassName("centipedeIframe");
var friendlyIframe = document.createElement('iframe');
friendlyIframe.id = "friendlyIframe_" + countSelf.length;
friendlyIframe.className = "centipedeIframe"
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
      -webkit-overflow-scrolling: touch;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
    img {
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
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
      border: 1px solid #e1e1e1;
      box-sizing: border-box;
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
      font-weight: 900;
      color: #666666;
      font-size: 12px;
      -webkit-backdrop-filter: blur(3px);
      backdrop-filter: blur(3px);
      background-color: rgba(248, 248, 248, 0.8);
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
      color: white;
      fill: white;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      overflow: hidden;
      -webkit-backdrop-filter: blur(3px);
      backdrop-filter: blur(3px);
      background-color: rgba(0, 0, 0, 0.8);
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
        opacity: 0.1;
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
        opacity:0.1;
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
      cursor: move;
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
    // .worm_block:nth-of-type(3n+1) {
    //   padding-left: 0px;
    // }
    .worm_block:last-of-type {
      margin: 0;
      padding: 0;
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
      width: 296px;
      height: 100%;
    }
    .worm_block:nth-of-type(3n+5) {
      margin-left:2px;
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
      /*border-bottom: 1px solid rgba(50,50,50,0.1);*/
    }
    .profile_image_div.fallback::before {
      content: "";
      height: 100%;
      width: 100%;
      top:0;
      left:0;
      position: absolute;
      z-index: 99;
      opacity: 0.6;
    }
    .profile_image {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .num {
      font-family: lato;
      position: absolute;
      right: -5px;
      top: -20px;
      width: 0;
      height: 0;
      border-top: 30px solid transparent;
      border-bottom: 30px solid transparent;
      border-left: 30px solid black;
      transform: rotate(-45deg);
      z-index: 100;
      outline: 1px solid rgba(255,255,255,0.4);
    }
    .num_text {
    	font-size: 12px;
      color: white;
      width: 20px;
      top: -9px;
      right: 9px;
      text-align: center;
      font-weight: lighter;
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
      font-size: 14px;
      max-width 95%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 5px;
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
      color: #272727;
      font-weight: 900;
      margin-top: 3px;
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
    .next_list {
      font-family: lato;
      font-size: 12px;
      position: relative;
      top: -96px;
      width: 56px;
      margin: 0 5px 0 0;
      padding: 80px 10px 88px 10px;
      text-align: center;
      color: white;
    }
    .next_arrow {
      font-size: 30px;
      margin-bottom: 5px;
    }
    </style>
    <div class="wrapper">
      <div class="helper" id="helper">
      </div>
      <div class="helper2" id="helper2">
        <div class="icon swipe_right">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  version="1.1" x="0px" y="0px" viewBox="10 10 80 80" enable-background="new 0 0 100 100" xml:space="preserve"><g><path  d="M36,31.345c0-0.912,0-1.778,0-2.591c-2-1.458-3.402-3.814-3.402-6.476c0-4.416,3.55-8.01,7.965-8.01   c4.418,0,7.881,3.594,7.881,8.01c0,2.662-1.443,5.019-3.443,6.477v2.59c3-1.704,5.631-5.125,5.631-9.066   c0-5.635-4.531-10.219-10.166-10.219s-10.103,4.584-10.103,10.219C30.362,26.221,33,29.642,36,31.345z"/><path  d="M70.07,43.118h-2.762c-0.777,0-1.574,0.188-2.275,0.53c-0.362-2.075-2.176-3.658-4.353-3.658h-2.763   c-0.909,0-1.759,0.278-2.462,0.752c-0.608-1.715-2.246-2.944-4.165-2.944h-2.763c-0.805,0-1.559,0.216-2.21,0.593V22.278   c0-3.198-2.602-5.8-5.8-5.8c-3.196,0-5.8,2.602-5.8,5.8v30.591c-1.239,0.589-2.389,1.381-3.389,2.379l-2.264,2.265   c-4.739,4.739-4.739,12.447,0,17.186l6.31,6.311c0.31,0.31,0.635,0.596,0.97,0.867c2.103,3.621,6.032,6.064,10.525,6.064h15.467   c6.701,0,12.15-5.429,12.15-12.102V47.536C74.488,45.1,72.507,43.118,70.07,43.118z M72.279,75.839   c0,5.454-4.459,9.892-9.941,9.892H46.871c-1.821,0-3.525-0.497-4.995-1.353c-1.219-0.729-2.577-1.788-3.82-3.981   c-0.717-1.365-1.127-2.914-1.127-4.558c0-0.61-0.495-1.105-1.104-1.105c-0.611,0-1.105,0.495-1.105,1.105   c0,0.503,0.035,0.997,0.095,1.482l-4.186-4.186c-3.876-3.876-3.876-10.184,0-14.061l2.265-2.264   c0.557-0.557,1.173-1.029,1.826-1.434v7.567c0,0.611,0.494,1.105,1.105,1.105c0.609,0,1.104-0.494,1.104-1.105V22.278   c0-1.979,1.61-3.591,3.59-3.591c1.98,0,3.591,1.612,3.591,3.591v28.378c0,0.611,0.494,1.105,1.104,1.105   c0.609,0,1.104-0.494,1.104-1.105v-8.44c0-1.217,0.991-2.208,2.21-2.208h2.763c1.217,0,2.209,0.991,2.209,2.208v8.452   c0,0.61,0.493,1.104,1.104,1.104c0.609,0,1.105-0.493,1.105-1.104v-6.259c0-1.217,0.99-2.209,2.208-2.209h2.763   c1.218,0,2.209,0.992,2.209,2.209v6.247c0,0.611,0.494,1.105,1.105,1.105c0.608,0,1.104-0.494,1.104-1.105v-4.005   c0-0.644,1.137-1.324,2.21-1.324h2.762c1.218,0,2.209,0.991,2.209,2.209V75.839z"/><path  d="M62.912,68H49.009l1.428-1.348c0.432-0.432,0.432-1.09,0-1.521c-0.432-0.433-1.131-0.412-1.562,0.02   l-3.311,3.321c-0.103,0.102-0.185,0.229-0.241,0.364c-0.056,0.134-0.086,0.279-0.086,0.427s0.03,0.294,0.086,0.427   c0.052,0.124,0.129,0.233,0.22,0.329c0.008,0.008,0.011,0.021,0.019,0.028l3.313,3.313c0.215,0.216,0.498,0.323,0.782,0.323   c0.281,0,0.564-0.107,0.78-0.323c0.432-0.432,0.432-1.315,0-1.747L49.007,70h13.905c0.61,0,1.104-0.39,1.104-0.999   C64.017,68.39,63.522,68,62.912,68z"/></g></svg>
        </div>
      </div>
    <div class="worm" id="worm">
    </div>
  </div>
    `);
    //inject Google font CSS
    var link = iframeContent.document.createElement( "link" );
    link.href = protocolToUse+"fonts.googleapis.com/css?family=Lato:400,300,100,700,900";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    iframeContent.document.getElementsByTagName( "head" )[0].appendChild( link );

  //begin centipede logic
  //initial variable declaration
  var input = {dom:"chicagotribune.com",category:"nba",rand:"1",env:"prod-"};
  if (decodeURIComponent(location.search.substr(1)) != null && decodeURIComponent(location.search.substr(1)) != "") {
    input = JSON.parse(decodeURIComponent(location.search.substr(1)));
  }
  else {
    var scripts = document.getElementsByTagName('script');
    var myScript;
    for (i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf("centipede.js") != -1) {
        myScript = scripts[i];
      }
    }
    var queryString = myScript.src.split("centipede.js?")[1];

    if (queryString != "" && queryString != null) {
      try {
        input = JSON.parse(decodeURI(queryString));
      }
      catch(e) {
        console.log(e);
      }
    }
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
  var currentPub;

  if (typeof input.group == 'undefined' && (typeof input.category == 'undefined' || categories.indexOf(input.category) == -1)) {
      input.category = 'finance'; //default category fallback
  }
  friendlyIframe.classList.add("centipede_"+input.category);
  function getPublisher (pub) {
    var pubs = {
      mlb: {
        hex: "#bc2027",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/baseball_stock.jpg"
      },
      nfl: {
        hex: "#004e87",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg"
      },
      ncaaf: {
        hex: "#004e87",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg"
      },
      nba: {
        hex: "#f26f26",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"
      },
      college_basketball: {
        hex: "#f26f26",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"
      },
      finance: {
        hex: "#3098ff",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/finance_stock.jpg"
      },
      weather: {
        hex: "#43B149",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
      },
      crime: {
        hex: "#43B149",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
      },
      demographics: {
        hex: "#43B149",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
      },
      politics: {
        hex: "#43B149",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
      },
      disaster: {
        hex: "#43B149",
        fallbackImage: "images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"
      }
    };
      if (pub == null || pub == "" || !pubs[pub]) {
        return pubs["finance"];
      }
      else {
        return pubs[pub];
      }
  }

  function loadData() {
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
            var r = JSON.parse(i.responseText);
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
  if (input.category != null && input.category != "") { //category param
    currentPub = getPublisher(input.category);
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
          input.category = "ncaaf";
        }
        else {
          var url = protocolToUse + 'w1.synapsys.us/widgets/js/tdl_list_array.json';
          input.category = "nfl";
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
  }
  else { //group param
    i.open('GET', apiUrl + '?partner=' + (typeof input.dom != 'undefined' ? input.dom : '') + '&group=' + input.group + '&rand=' + e, true);
    i.send()
  }
}
loadData();

  function populateWorm(data) {
    if ((input.category == null || input.category == "") && input.group != null && input.group != "") {
      currentPub = getPublisher(data.category);
    }
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
    if (image == null || image == "" || image.indexOf("no_") != -1 || image.indexOf("no-") != -1) {
      image = protocolToUse + currentPub.fallbackImage;
      var style="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
      var image_class = "fallback";
    }
    else {
      var style="";
      var image_class = "";
    }
    helper.innerHTML = data.l_title;
    worm.innerHTML = `
    <style>
      .profile_image_div.fallback::before {
        background-color: `+currentPub.hex+`;
      }
    </style>
      <div class="worm_block">
        <div class="list_item">
          <div class="profile_image_div `+image_class+`" style="background-image:url('`+image+"?width=138"+`')">
          <div class="num" style="border-color:`+currentPub.hex+`"><div class="num_text">#<b>1</b></div></div>
            <img class="profile_image" src="`+image+"?width=138"+`" style="`+style+`">
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
        <div id="first_ad" class="ad_item" style="background-color: gray; width: 300px; height: 300px;">

        </div>
      </div>
    `;
    if (location.host.indexOf("synapsys.us") == -1 && location.host.indexOf("localhost") == -1 && location.host.indexOf("127.0.0.1") == -1) { //dont run igloo if not on real site
      setTimeout(function(){ //wait for dom to render before executing igloo script
        firstAd = iframeContent.document.getElementById('first_ad');
        var s = iframeContent.document.createElement("script");
        s.type = "text/javascript";
        if (input.group != null && input.group != "" && input.p != null && input.p != "") {
          s.src = "//content.synapsys.us/embeds/placement.js?p=" + input.p + "&type=centipede_" + input.group + "&style=inline";
        }
        else {
          s.src = "//content.synapsys.us/embeds/inline_300x250/partner.js";
        }
        firstAd.appendChild(s);
      }, 100);
    }
    else {
      setTimeout(function(){
        firstAd = iframeContent.document.getElementById('first_ad');
      }, 100);
    }

    var outputHTML = "";
    var maxOutput = 50;
    //every other item (except the first)
    for (var i = 1; i < items.length && i < maxOutput; i++) {
      items[i].li_value = items[i].li_value.replace(items[i].li_tag,"");
      image = items[i].li_img;
      if (image == null || image == "" || image.indexOf("no_") != -1 || image.indexOf("no-") != -1) {
        image = protocolToUse + currentPub.fallbackImage;
        var style="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);";
        var image_class = "fallback";
      }
      else {
        var style="";
        var image_class = "";
      }
      if (Math.abs(i % 2) == 1) { //every odd number
        outputHTML += `<div class="worm_block">`;
      }
      outputHTML += `
          <div class="list_item">
            <div class="profile_image_div `+image_class+`" style="background-image:url('`+image+"?width=138"+`')">
            <div class="num" style="border-color:`+currentPub.hex+`"><div class="num_text">#<b>`+(i+1)+`</b></div></div>
              <img class="profile_image" src="`+image+"?width=138"+`" style="`+style+`">
            </div>
            <div class="info">
              <div class="name">
                `+items[i].li_title+`
              </div>
              <div class="value">
                `+items[i].li_value+`
              </div>
              <div class="stat_type">
                `+items[i].li_tag+`
              </div>
            </div>
          </div>
      `;
      if (i % 2 == 0) { //end block div every even number
        outputHTML += `</div>`;
      }
      if (i && (i % 4 === 0)) { //show ad every 4 items
        outputHTML += `
        <div class="worm_block">
        <div class="ad_spacer"></div>
          <div class="ad_item">

          </div>
        </div>`;
      }
      if (i == items.length-1 || i == maxOutput-1) { //fire when done iterating over all items
        outputHTML += `
        </div>
        <div class="worm_block">
          <div class="next_list" style="background-color:`+currentPub.hex+`;" id="next_list">
          <div class="next_arrow">
            <svg width="17" height="30" viewBox="0 0 17 30">
                <path fill="#FFF" fill-rule="nonzero" d="M16.89 14.463l-14.967 14.9s-.801.555-1.577-.218c-.778-.772 0-1.449 0-1.449L13.663 14.44.976 1.81s-.66-.791.05-1.496c.707-.706 1.696 0 1.696 0l14.168 14.15z"/>
            </svg>
          </div>
          Next List
          </div>
        </div>
        `;
        worm.innerHTML += outputHTML; //write out the accumulated item's html
        setTimeout(function(){
          iframeContent.document.getElementById("next_list").addEventListener("touchend", nextList);
        }, 100);
        friendlyIframe.classList.add("widget_loaded"); //set leaded flag on bounding iframe
      }
    }
  }

  function nextList(e) {
    worm.innerHTML = "";
    firstAd.style.left = "0px";
    worm.scrollLeft = 0;
    loadData();
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
    if (rect.left < -600 || rect.left > 600) { //logic to jump ad to next space when you scroll past it
      var left = iframeContent.document.getElementsByClassName("ad_spacer")[Math.floor((this.scrollLeft+450) /900)].parentElement.offsetLeft + 150;
      firstAd.style.left = (left - firstAd.offsetWidth) + "px";
    }
    clearTimeout(scrollingTimout);
    scrollingTimout = setTimeout(function(){ // wait till scroll is finished and set flag as false
      if (userScroll == true) {
        setScroll();
      }
      worm.removeEventListener("mousemove", onMouseMove);
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
    userScroll = false;
    setTimeout(function(){
      userScroll = true;
    }, 500);
    clearInterval(setSmoothScrollInterval);
  }

  var initialMouseX;
  worm.addEventListener("mousedown", onMouseDown);
  function onMouseDown(e) {
    initialMouseX = e.clientX;
    worm.addEventListener("mousemove", onMouseMove);
  }
  function onMouseMove(e) {
    worm.scrollLeft = worm.scrollLeft + (initialMouseX - e.clientX);
    initialMouseX = e.clientX;
  }
  worm.addEventListener("mouseup", onMouseUp);
  function onMouseUp(e) {
    worm.removeEventListener("mousemove", onMouseMove);
  }

  //logic to snap scrolled block into view, when user scroll has ended
  function setScroll() {
    var counter = 0;
    for (i = 0; i < wormBlocks.length;  i++) {
      if ((worm.scrollLeft + 150) >= wormBlocks[i].offsetLeft && (worm.scrollLeft + 150) <= (wormBlocks[i].offsetLeft + wormBlocks[i].offsetWidth) && worm.scrollLeft > 20) {
        //if user has swiped past the halfway mark on the next block, advance blocks to the one user has scrolled to. Otherwise, reset blocks back to starting point of swipe
        scrollTo = wormBlocks[i].offsetLeft;
        if (worm.scrollLeft < scrollTo) {
          scrollIncrements = 10; //advance
        }
        else {
          scrollIncrements = -10; //retreat
        }
        clearInterval(setSmoothScrollInterval);
        setSmoothScrollInterval = setInterval(function(){
          var marginOfError = Math.abs(scrollIncrements) - 1;
          if (worm.scrollLeft < (scrollTo - marginOfError) || worm.scrollLeft > (scrollTo + marginOfError)) {
            if (scrollIncrements > 0 && worm.scrollLeft > scrollTo) { // we have overshot
              scrollIncrements = -1;
            }
            else if (scrollIncrements < 0 && worm.scrollLeft < scrollTo) { // we have overshot other side
              scrollIncrements = 1;
            }
            //if within margin of error of target, end scroll
            if (i == (wormBlocks.length - 1) || counter > 30) {
              userScroll = false;
              setTimeout(function(){
                userScroll = true;
              }, 500);
              clearInterval(setSmoothScrollInterval); //we have reached the end of the list. stop the loop
            }
            else {
              counter++;
              worm.scrollLeft = worm.scrollLeft + scrollIncrements; //apply the interpolation step
            }
          }
          else if (worm.scrollLeft < (scrollTo) || worm.scrollLeft > (scrollTo)) {// if in the last frame of interpolation
            if (scrollIncrements > 0 && worm.scrollLeft > scrollTo) { // we have overshot
              scrollIncrements = -1;
            }
            else if (scrollIncrements < 0 && worm.scrollLeft < scrollTo) { // we have overshot other side
              scrollIncrements = 1;
            }
            if (i == (wormBlocks.length - 1) || counter > 30) {
              userScroll = false;
              setTimeout(function(){
                userScroll = true;
              }, 500);
              clearInterval(setSmoothScrollInterval); //we have reached the end of the list. stop the loop
            }
            else {
              counter++;
              worm.scrollLeft = worm.scrollLeft + 1; //apply the interpolation step
            }
          }
          else { //we have reached the end of the interpolation. stop the loop
            userScroll = false;
            setTimeout(function(){
              userScroll = true;
            }, 500);
            clearInterval(setSmoothScrollInterval);
          }
        }, 20);
        currentBlock = i;
        if (wormBlocks[i].getElementsByClassName("ad_item").length >= 1) { //hide title if ad is current item in view
          helper.style.opacity = '0';
          iframeContent.ig_rotation_control=true; //unpause ad if its in view
        }
        else {
          helper.style.opacity = '1';
          iframeContent.ig_rotation_control=false; //pause ad when its out of view
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
            if (i == (wormBlocks.length - 1) || counter > 30) {
              userScroll = false;
              setTimeout(function(){
                userScroll = true;
              }, 500);
              clearInterval(setSmoothScrollInterval);
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
            clearInterval(setSmoothScrollInterval);
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
}
centipede();
