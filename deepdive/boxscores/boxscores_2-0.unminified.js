(function(boxscoresBar, undefined){
  boxscoresBar.embedSource = 'http://w1.synapsys.us/widgets/deepdive/boxscores/boxscores_2-0.js';
  // boxscoresBar.embedSource = 'localhost:8000/deepdive/boxscores/boxscores_2-0.unminified.js';
  boxscoresBar.boxscoresLoaded = false; //Boolean if boxscores has loaded
  //Help function
  boxscoresBar.help = function(){
    console.warn(`Boxscores Bar - Must specify query string.
      Paramters:
      [vertical] - vertical of the boxscores embed. Options are (mlb, nfl, and ncaaf)
    `);
  }
  //Get eastern timezone abbreviation and offset
  boxscoresBar.easternTime = (function(){
    //Grab current year
    var utcYear = new Date().getUTCFullYear();
    var daylightStart, daylightEnd, offset, abbrev;
    var currentUTC = (new Date).getTime();

    //Get second sunday of march 2:00 EST (beginning of daylight savings time)
    daylightStart = new Date(utcYear, 2, 7, 0, 0, 0, 0);
    daylightStart.setDate(7 + (7 - daylightStart.getDay()));
    daylightStart.setUTCHours(7);
    daylightStart = daylightStart.getTime();
    //Get first sunday of november 2:00 EDT (end of daylight savings time)
    daylightEnd = new Date(utcYear, 10, 1, 0, 0, 0, 0);
    while(daylightEnd.getDay() !== 0){
      daylightEnd.setDate(daylightEnd.getDate() + 1);
    }
    daylightEnd.setUTCHours(6);
    daylightEnd = daylightEnd.getTime();

    if(currentUTC <= daylightStart || currentUTC > daylightEnd){
      //Standard Time
      offset = -5;
      // abbrev = 'EST';
      abbrev = 'ET';
    }else{
      //Daylight Savings Time
      offset = -4;
      // abbrev = 'EDT';
      abbrev = 'ET';
    }

    return {
      offset: offset,
      tzAbbrev: abbrev
    };
  })();
  //Get today's date
  boxscoresBar.todayObject = (function(offset, undefined){
    var today = new Date(new Date().getTime() + offset * 3600 * 1000);
    var month = today.getUTCMonth() + 1;
    var date = today.getUTCDate();

    var todayObject = {
      today: today,
      year: today.getUTCFullYear(),
      month: month.toString().length === 1 ? '0' + month : month,
      date: date.toString().length === 1 ? '0' + date : date
    };
    todayObject.dateInput = todayObject.year + '-' +  todayObject.month + '-' + todayObject.date;

    return todayObject;
  })(boxscoresBar.easternTime.offset);

  var topWin = window;
  try {
    while(topWin !== top){
      topWin = topWin.parent;
    }
  }catch(e){
    console.error("boxscores - couldn/'t access the top window");
  }

  //Global variables
  var wLocation = topWin.location;
  var domain = wLocation.hostname.replace(/www./, '');
  var protocol = (topWin.protocol) === 'https' ? 'https' : 'http';
  var parentNode, parentNodeWidth; //Container and width of container
  var displayNumber; //number of games to display
  var initialIndex = [], dataLength, processedData; //Variables for game data

  //Grab parent node
  var currentScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src.indexOf(skyscraperRails.embedSource) != -1) {
        return scripts[i];
      }
    }
  })();
  parentNode = currentScript.parentNode;

  var queryString = currentScript.src.split('?')[1];
  if(typeof queryString === 'undefined'){
    boxscoresBar.help();
    return false;
    //Parse query string
  }else{
    var params = queryString.split('&');
    //Define query params
    var vertical;
    params.forEach(function(item){
      var pair = item.split('=');
      switch(pair[0]){
        case 'vertical':
          vertical = decodeURIComponent(pair[1]);
        break;
      }
    })
    //Check if required variables are defined
    try{
      if(typeof vertical === 'undefined'){
        throw 'Must speicify vertical of boxscores bar. (Options are mlb, nfl, and ncaaf)';
      }
    }catch(e){
      console.warn('Boxscores Bar - ' + e);
      return false;
    }

  }

  //Vertical specific variables
  var apiString, //Api for the boxscores data
    domainList, //List of domains to add partner domain too (Ex. myhomerunzone.com/latimes.com)
    barColor, //Background color of bar
    arrowColor, //Color of bar arrows
    barTitle, //Title of bar
    toggleTitle, //Title of the toggle scope button
    toggleLink,
    gameBorderColor, //Color of border for games
    formatData; //Function to format the data
  switch(vertical){
    case 'mlb':
      apiString = protocol + '://prod-homerunloyal-api.synapsys.us/league/boxScores/' + boxscoresBar.todayObject.dateInput;
      domainList = ['myhomerunzone.com', 'dev.myhomerunzone.com', 'qa.myhomerunzone.com'];
      barColor = '#004e87';
      arrowColor = '#000';
      barTitle = 'TODAY\'S MLB GAMES';
      gameBorderColor = '#2c2c2c';
      formatData = function(data){
        return formatBaseballData(data);
      };
    break;
    case 'nfl':
      apiString = protocol + '://prod-touchdownloyal-api.synapsys.us/boxScores/league/nfl/' + boxscoresBar.todayObject.dateInput;
      domainList = ['mytouchdownzone.com', 'dev.mytouchdownzone.com', 'qa.mytouchdownzone.com'];
      barColor = '#272727';
      arrowColor = '#fc501d';
      barTitle = '<b>NFL</b> GAMES THIS WEEK';
      toggleTitle = "College Football";
      toggleLink = "/app/fe-core/ads/ncaafbluebar.html"
      gameBorderColor = '#000';
      formatData = function(data){
        return formatFootballData(data, 'nfl');
      };
    break;
    case 'ncaaf':
      apiString = protocol + '://prod-touchdownloyal-api.synapsys.us/boxScores/league/fbs/' + boxscoresBar.todayObject.dateInput;
      domainList = ['mytouchdownzone.com', 'dev.mytouchdownzone.com', 'qa.mytouchdownzone.com'];
      barColor = '#272727';
      arrowColor = '#fc501d';
      barTitle = '<b>NCAAF</b> GAMES THIS WEEK';
      toggleTitle = "Pro Football";
      toggleLink = "/app/fe-core/ads/nflbluebar.html";
      gameBorderColor = '#000';
      formatData = function(data){
        return formatFootballData(data, 'ncaaf');
      };
    break;
    default:
      apiString = protocol + '://prod-homerunloyal-api.synapsys.us/league/boxScores/' + boxscoresBar.todayObject.dateInput;
      domainList = ['myhomerunzone.com', 'dev.myhomerunzone.com', 'qa.myhomerunzone.com'];
      barColor = '#004e87';
      arrowColor = '#000';
      barTitle = 'TODAY\'S MLB GAMES';
      gameBorderColor = '#2c2c2c';
      formatData = function(ata){
        return formatBaseballData(data);
      };
    break;
  }

  //Check to see if embed lives on partner site
  var domainMatch = false;
  for(var i = 0, length = domainList.length; i < length; i++){
    if(domainList[i] === domain){
      //Domain matches domain in list
      domainMatch = true;
      break;
    }
  }
  if(domainMatch){
    var partnerDomainArr = wLocation.pathname.split('/');
    var partnerDomain = partnerDomainArr[1];
    domain += '/' + partnerDomain;
  }

  domain = protocol + '://' + domain;

  boxscoresBar.resize = function(){
    parentNodeWidth = parentNode.offsetWidth;

    if(boxscoresBar.boxscoresLoaded){

      if(parentNodeWidth >= 1310 && displayNumber !== Math.round((window.innerWidth - 520) / 150)){
        displayNumber = Math.round((window.innerWidth - 520) / 150);
        clearGames();

        var diff = displayNumber - initialIndex.length;
        if(diff){
          //Add items to array

          //Get new index values
          for(var i = 0; i < diff; i++){
            var lastIndex = initialIndex[initialIndex.length - 1];
            initialIndex.push(lastIndex + 1 >= dataLength ? 0 : lastIndex + 1);
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }else{
          //Remove items from array
          //Since this is the max, this case will never be hit
        }

      }else if(parentNodeWidth < 1100 && parentNodeWidth >= 935 && displayNumber !== 4){
        displayNumber = 4;
        clearGames();

        var diff = displayNumber - initialIndex.length;
        if(diff > 0){
          //Add items to array

          //Get new index values
          for(var i = 0; i < diff; i++){
            var lastIndex = initialIndex[initialIndex.length - 1];
            initialIndex.push(lastIndex + 1 >= dataLength ? 0 : lastIndex + 1);
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }else{
          //Remove items from array
          diff = Math.abs(diff);

          //Get new index values
          for(var i = 0; i < diff; i ++){
            initialIndex.pop();
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }

      }else if(parentNodeWidth < 935 && parentNodeWidth >= 495 && displayNumber !== 3){
        displayNumber = 3;
        clearGames();

        var diff = displayNumber - initialIndex.length;
        if(diff > 0){
          //Add items to array

          //Get new index values
          for(var i = 0; i < diff; i++){
            var lastIndex = initialIndex[initialIndex.length - 1];
            initialIndex.push(lastIndex + 1 >= dataLength ? 0 : lastIndex + 1);
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }else{
          //Remove items from array

          diff = Math.abs(diff);

          //Get new index values
          for(var i = 0; i < diff; i ++){
            initialIndex.pop();
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }

      }else if(parentNodeWidth < 495 && parentNodeWidth >= 330 && displayNumber !== 2){
        displayNumber = 2;
        clearGames();

        var diff = displayNumber - initialIndex.length;
        if(diff > 0){
          //Add items to array

          //Get new index values
          for(var i = 0; i < diff; i++){
            var lastIndex = initialIndex[initialIndex.length - 1];
            initialIndex.push(lastIndex + 1 >= dataLength ? 0 : lastIndex + 1);
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }else{
          //Remove items from array

          diff = Math.abs(diff);

          //Get new index values
          for(var i = 0; i < diff; i ++){
            initialIndex.pop();
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }

      }else if(parentNodeWidth < 330 && displayNumber !== 1){
        displayNumber = 1;
        clearGames();

        var diff = displayNumber - initialIndex.length;
        if(diff > 0){
          //Add items to array
          //Since this is the min, this case will never be hit
        }else{
          //Remove items from array

          diff = Math.abs(diff);

          //Get new index values
          for(var i = 0; i < diff; i ++){
            initialIndex.pop();
          }
          //Insert games
          for(var c = 0, length = initialIndex.length; c < length; c++){
            var nodeIndex = initialIndex[c];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        }

      }

    }
  }

  boxscoresBar.buildBoxscores = function(){
    //Exit function if boxscores already built
    if(boxscoresBar.boxscoresLoaded){
      return false;
    }

    var boxscoresContainer = document.createElement('section');
    boxscoresContainer.className = 'boxscores-e-bar';

    var toggleButton = '';
    if (toggleTitle) {
      toggleButton = `<a href="`+ toggleLink +`" target="_self"><div class="boxscores-e-scope-toggle">
        ` + toggleTitle + `
      </div></a>`
    }

    boxscoresContainer.innerHTML = `
      <div class="boxscores-e-title ` + vertical + `">
        ` + barTitle + `
      </div>
      `+ toggleButton +`

      <ul class="boxscores-e-schedule"></ul>

      <div class="boxscores-e-nav">
        <button id="boxscores-e-left" class="boxscores-e-nav-button boxscores-e-prev">
          <i class="ddh-icon-angle-left"></i>
        </button>
        <button id="boxscores-e-right" class="boxscores-e-nav-button boxscores-e-next">
          <i class="ddh-icon-angle-right"></i>
        </button>
      </div>
    `;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        var res = JSON.parse(xhttp.responseText);
        //console.log('ajax complete', res);
        processedData = formatData(res.data);
        dataLength = processedData.length;
        //console.log('processed data', processedData);

        //Inject HTML
        parentNode.insertBefore(boxscoresContainer, currentScript);

        //If 1 or 0 games, remove arrows
        if(dataLength <= 1){
          var nav = document.getElementsByClassName('boxscores-e-nav')[0];
          nav.parentNode.removeChild(nav);
        }

        //Calculate parentNodeWith to determine amount of games to display
        parentNodeWidth = parentNode.offsetWidth;
        if(parentNodeWidth >= 1310){
          displayNumber = Math.round((window.innerWidth - 520) / 150);
        }else if(parentNodeWidth >= 1100){
          displayNumber = 5;
        }else if(parentNodeWidth >= 935){
          displayNumber = 4;
        }else if(parentNodeWidth >= 495){
          displayNumber = 3;
        }else{
          displayNumber = 2;
        }

        //Get initial indexes to show
        for(var c = 0; c < displayNumber; c++){
            if(typeof processedData[c] !== 'undefined'){
              initialIndex.push(c);
            }
        }
        //Display initial games
        for(var i = 0, length = initialIndex.length; i < length; i++){
          var nodeIndex = initialIndex[i];
          var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
          schedule.appendChild(processedData[nodeIndex].gameNode);
        }
        //Configure next button
        var nextButton = document.getElementById('boxscores-e-right');
        nextButton.addEventListener('click', function(){
          //Clear games
          clearGames();

          for(var z = 0; z < displayNumber; z++){
            var newIndex = initialIndex[z] + 1;
            //If index is greater than amount of data, wrap around to beginning of array;
            if(newIndex >= dataLength){
              newIndex = newIndex - dataLength;
            }

            if(typeof processedData[newIndex] !== 'undefined'){
              initialIndex[z] = newIndex;
            }
          }

          for(var t = 0, length = initialIndex.length; t < length; t++){
            var nodeIndex = initialIndex[t];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        });
        //Confgure prev button
        var prevButton = document.getElementById('boxscores-e-left');
        prevButton.addEventListener('click', function(){
          //Clear games
          clearGames();

          for(var z = 0; z < displayNumber; z++){
            var newIndex = initialIndex[z] - 1;
            //If index is less than 0, wrap around to end of array
            if(newIndex < 0){
              newIndex = newIndex + dataLength;
            }
            if(typeof processedData[newIndex] !== 'undefined'){
              initialIndex[z] = newIndex;
            }
          }

          for(var t = 0, length = initialIndex.length; t < length; t++){
            var nodeIndex = initialIndex[t];
            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        });
        //Declare boxscores loaded
        boxscoresBar.boxscoresLoaded = true;

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        // console.log('BOXSCORES BAR ERROR', xhttp.responseText);
      }

    }

    xhttp.open('GET', apiString, true);
    xhttp.send();
  };

  loadLibraries();
  boxscoresBar.buildBoxscores();

  window.addEventListener('resize', throttle(boxscoresBar.resize, 100));

  //Load Dependencies
  function loadLibraries(){
    //Build base tag
    var baseEl = document.createElement('base');
    baseEl.target = '_parent';
    document.head.appendChild(baseEl);
    //Build and load font
    var fontEl = document.createElement('link');
    fontEl.rel = 'stylesheet';
    fontEl.type = 'text/css';
    fontEl.dataset.resource_from = 'boxscores-embed';
    fontEl.href = 'https://fonts.googleapis.com/css?family=Lato:300,400,800,900';
    document.head.appendChild(fontEl);
    //Build and load icons
    var iconEl = document.createElement('link');
    iconEl.rel = 'stylesheet';
    iconEl.type = 'text/css';
    iconEl.dataset.resource_from = 'boxscores-embed';
    iconEl.href = protocol + '://w1.synapsys.us/widgets/deepdive/fonts/styles.css';
    document.head.appendChild(iconEl);
    //Build and load stylesheet
    var styleEl = document.createElement('style');
    styleEl.dataset.resource_from = 'boxscores-embed';
    styleEl.innerHTML = `
      .boxscores-e-scope-toggle {
        background-color: white;
        border-radius: 3px;
        width: 130px;
        float: left;
        display: inline-block;
        height: 30px;
        margin: 10px 20px 10px 0;
        color: #f26f26;
        text-align: center;
        line-height: 30px;
        font-weight: normal;
      }
      @media (max-width: 767px) {
        .boxscores-e-scope-toggle {
          display: none;
        }
      }
      .boxscores-e-bar{
        font-weight: 300;
        width: 100%;
        min-width: 640px;
        height: 50px;
        line-height: 50px;
        background-color:` + barColor + `;
        color: #fff;
        font-family: Lato;
        overflow: hidden;
      }
      .boxscores-e-title{
        font-size: 18px;
        float: left;
        padding: 0 20px;
        box-sizing: border-box;
        line-height: 48px;
      }
      @media (max-width: 767px) {
        .boxscores-e-title{
          font-size: 14px;
          padding: 9px 10px;
          line-height: 15px;
        }
        .boxscores-e-title.nfl{
          width: 97px;
        }
        .boxscores-e-title.ncaaf{
          width: 120px;
        }
      }
      @media (min-width: 768px) {
        .boxscores-e-title{
          font-size: 14px;
        }
      }
      @media (min-width: 992px) {
        .boxscores-e-title{
          font-size: 16px;
        }
      }
      @media (min-width: 1280px) {
        .boxscores-e-title{
          font-size: 18px;
        }
      }
      .boxscores-e-schedule{
        list-style-type: none;
        float: left;
        margin: 0 5px 0 0;
        padding: 0;
        height: 100%;
        max-width: calc(100% - 420px);
        white-space: nowrap;
      }
      .boxscores-e-game{
        display: inline-block;
        width: 166px;
        height: 50px;
        border-right: 1px solid` + gameBorderColor + `;
        box-sizing: border-box;
        overflow: hidden;
      }
      @media (max-width: 768px) {
        .boxscores-e-game {
          width: 151px;
        }
      }
      .boxscores-e-game:first-child{
        border-left: 1px solid` + gameBorderColor + `;
      }
      .boxscores-e-game:last-child{
        border-right: none;
      }
      .boxscores-e-game-link{
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        text-decoration: none;
        color: #fff;
      }
      .boxscores-e-football .boxscores-e-game-link{
        padding: 0 15px;
      }
      .boxscores-e-game-link:hover{
        color: #fff;
      }
      .boxscores-e-game-teams{
        list-style-type: none;
        margin: 0;
        padding: 0;
        width: 57px;
        height: 100%;
        line-height: normal;
        display: inline-block;
        vertical-align: middle;
        font-size: 13px;
        padding-top: 8px;
        box-sizing: border-box;
        float: left;
        white-space: normal;
      }
      .boxscores-e-game-inning-top:before{
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 7px 9px 7px;
        border-color: transparent transparent #fff transparent;
        margin-right: 5px;
        display: inline-block;
      }
      .boxscores-e-game-inning-bottom:before{
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 7px 0 7px;
        border-color: #fff transparent transparent transparent;
        margin-right: 5px;
        display: inline-block;
      }
      .boxscores-e-game-teamscore{
        float: right;
      }
      .boxscores-e-game-time{
        font-size: 12px;
        float: right;
        font-weight: 400;
      }
      .boxscores-e-game-time.boxscores-e-2-lines{
        line-height: normal;
        padding-top: 10px;
      }
      .boxscores-e-nav{
        position: absolute;
        right: 0;
        padding: 0 18px;
        line-height: 50px;
        background-color: #272727;
        border-left: 1px solid` + gameBorderColor + `;
        box-shadow: -20px 0px 20px 0px #272727;
      }
      .boxscores-e-nav-button{
        width: 30px;
        height: 30px;
        border-radius: 5px;
        background-color: #fff;
        color: ` + arrowColor + `;
        border: none;
        margin: 0 3px 0 0;
        vertical-align: -1px;
        cursor: pointer;
        font-size: 25px;
        padding: 0;
        line-height: normal;
      }
      @media (max-width: 992px) {
        .boxscores-e-nav{
          padding: 0 10px;
        }
      }
      @media (max-width: 768px) {
        .boxscores-e-nav{
          padding: 0 5px;
        }
        .boxscores-e-nav-button{
          width: 24px;
          height: 24px;
        }
      }
      .boxscores-e-nav-button>i{
        vertical-align: middle;
        margin-top: 1px;
        display: inline-block;
      }
      .boxscores-e-nav-button:focus{
        outline: none;
      }
    `;
    document.head.appendChild(styleEl);
  }
  //Clear games from boxscores bar
  function clearGames(){
    var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
    while(schedule.hasChildNodes()){
      schedule.removeChild(schedule.firstChild);
    }
  }
  //Get ordinal suffix of a number (1st, 2nd, etc..)
  function ordinalSuffix(i){
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }
  //Throttle function
  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold + last - now);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }
  //Function to sort array (ascending or descending) in a particular order (1 for ascending, 0 for descending)
  function array_sort(arr, ascending, attr){
    arr = arr.sort(function(a, b){
      if(ascending > 0){
        if(a[attr] < b[attr])
          return -1;
        if(a[attr] > b[attr])
          return 1;
        return 0;
      }else{
        if(a[attr] > b[attr])
          return -1;
        if(a[attr] < b[attr])
          return 1;
        return 0;
      }
    })
    return arr;
  }
  //Build game node
  function buildNode(data){
    var gameNode = document.createElement('li');
    var timeClass = data.timeClass ? data.timeClass + ' boxscores-e-game-time' : 'boxscores-e-game-time';
    gameNode.className = data.gameClass ? data.gameClass + ' boxscores-e-game' : 'boxscores-e-game';
    gameNode.innerHTML = `
      <a class="boxscores-e-game-link" href="` + data.link + `">
        <ul class="boxscores-e-game-teams">
          <li>
            <b>` + data.homeTeam + `</b> <span class="boxscores-e-game-teamscore">` + data.homeScore + `</span>
          </li>
          <li>
            <b>` + data.awayTeam + `</b> <span class="boxscores-e-game-teamscore">` + data.awayScore + `</span>
          </li>
        </ul>
        <span class="` + timeClass + `">
          ` + data.bottomData + `
        </span>
      </a>
    `;

    return gameNode;
  }
  //Convert unix timestamp to datetime [hour:minute meridian tzAbbrev]
  function convertToEastern(date){
    var date = new Date(date + boxscoresBar.easternTime.offset * 3600 * 1000);
    var hour = date.getUTCHours();
    var meridian = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    var minutes = date.getUTCMinutes();
    minutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes;

    var convertedDate = hour + ':' + minutes + meridian + ' ' + boxscoresBar.easternTime.tzAbbrev;

    return convertedDate;
  }
  //Format football data
  // data: array of data from api to be processed
  // vertical: vertical to determine links (nfl or ncaaf)
  function formatFootballData(data, vertical){
    var pre = [], active = [], post = [], wpre = [], wpost = [];

    var prettyDatetime = function(timestamp, datetime){
      var dateObject = new Date(timestamp + boxscoresBar.easternTime.offset * 3600  * 1000);
      var day = dateObject.getUTCDay();
      var daysMap = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      return daysMap[day] + '<br>' + datetime;
    }

    for(var index in data){
      var item = data[index];
      var gameIsToday = false;
      var timestampDate = new Date(item.eventStartTime + boxscoresBar.easternTime.offset * 3600 * 1000).getUTCDate();
      var now = new Date().getTime();

      if(timestampDate == boxscoresBar.todayObject.date){
        gameIsToday = true;
      }

      if(gameIsToday){
       //Game is Today
       if(item.liveStatus === 'N' && item.eventStartTime > now){
         //Pre Game
         var homeRecord, homeScore, awayRecord, awayScore;
         if(vertical === 'nfl'){
           homeRecord = item.team1Record.split('-');
           homeScore = homeRecord[0] + '-' + homeRecord[1];
           awayRecord = item.team2Record.split('-');
           awayScore = awayRecord[0] + '-' + awayRecord[1];
         }else{
           homeScore = '-';
           awayScore = '-';
         }

         var gameObject = {
           homeTeam: item.team1Abbreviation,
           homeScore: homeScore,
           awayTeam:item.team2Abbreviation,
           awayScore: awayScore,
           timestamp: item.eventStartTime,
           datetime: convertToEastern(item.eventStartTime),
           eventId: item.eventId,
           gameClass: 'boxscores-e-football',
           timeClass: 'boxscores-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, gameObject.datetime);
         if(vertical === 'nfl'){
           gameObject.link = domain + '/nfl/articles/pregame-report/' + item.eventId;
         }else if(vertical === 'ncaaf'){
           gameObject.link = domain + '/ncaaf/articles/pregame-report/' + item.eventId;
         }else{
           gameObject.link = '#';
         }

         gameObject.gameNode = buildNode(gameObject);

         pre.push(gameObject);
       }else if(item.liveStatus === 'Y' && item.eventStartTime < now){
         //Live Game
         var gameObject = {
           homeTeam: item.team1Abbreviation,
           homeScore: item.team1Score ? item.team1Score : '-',
           awayTeam:item.team2Abbreviation,
           awayScore: item.team2Score ? item.team2Score: '-',
           timestamp: item.eventStartTime,
           datetime: convertToEastern(item.eventStartTime),
           eventId: item.eventId,
           gameClass: 'boxscores-e-football'
         };

         gameObject.bottomData = item.eventQuarter ? ordinalSuffix(item.eventQuarter) : gameObject.datetime;
         if(vertical === 'nfl'){
           gameObject.link = domain + '/nfl/articles/in-game-report/' + item.eventId;
         }else if(vertical === 'ncaaf'){
           gameObject.link = domain + '/ncaaf/articles/in-game-report/' + item.eventId;
         }else{
           gameObject.link = '#';
         }

         gameObject.gameNode = buildNode(gameObject);

         active.push(gameObject);
       }else if(item.liveStatus === 'N' && item.eventStartTime < now){
         //Post Game
         var gameObject = {
           homeTeam: item.team1Abbreviation,
           homeScore: item.team1Score ? item.team1Score : '-',
           awayTeam:item.team2Abbreviation,
           awayScore: item.team2Score ? item.team2Score : '-',
           timestamp: item.eventStartTime,
           datetime: convertToEastern(item.eventStartTime),
           eventId: item.eventId,
           gameClass: 'boxscores-e-football',
           timeClass: 'boxscores-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, 'Final');
         if(vertical === 'nfl'){
           gameObject.link = domain + '/nfl/articles/postgame-report/' + item.eventId;
         }else if(vertical === 'ncaaf'){
           gameObject.link = domain + '/ncaaf/articles/postgame-report/' + item.eventId;
         }else{
           gameObject.link = '#';
         }

         gameObject.gameNode = buildNode(gameObject);

         post.push(gameObject);
       }

      }else{
       //Game is this week
       if(item.eventStartTime > now){
         //Pre Game
         var homeRecord, homeScore, awayRecord, awayScore;
         if(vertical === 'nfl'){
           homeRecord = item.team1Record.split('-');
           homeScore = homeRecord[0] + '-' + homeRecord[1];
           awayRecord = item.team2Record.split('-');
           awayScore = awayRecord[0] + '-' + awayRecord[1];
         }else{
           homeScore = '-';
           awayScore = '-';
         }

         var gameObject = {
           homeTeam: item.team1Abbreviation,
           homeScore: homeScore,
           awayTeam:item.team2Abbreviation,
           awayScore: awayScore,
           timestamp: item.eventStartTime,
           datetime: convertToEastern(item.eventStartTime),
           eventId: item.eventId,
           gameClass: 'boxscores-e-football',
           timeClass: 'boxscores-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, gameObject.datetime);
         if(vertical === 'nfl'){
           gameObject.link = domain + '/nfl/articles/pregame-report/' + item.eventId;
         }else if(vertical === 'ncaaf'){
           gameObject.link = domain + '/ncaaf/articles/pregame-report/' + item.eventId;
         }else{
           gameObject.link = '#';
         }

         gameObject.gameNode = buildNode(gameObject);

         wpre.push(gameObject);

       }else if(item.eventStartTime < now){
         //Post Game
         var gameObject = {
           homeTeam: item.team1Abbreviation,
           homeScore: item.team1Score ? item.team1Score : '-',
           awayTeam:item.team2Abbreviation,
           awayScore: item.team2Score ? item.team2Score : '-',
           timestamp: item.eventStartTime,
           datetime: convertToEastern(item.eventStartTime),
           eventId: item.eventId,
           gameClass: 'boxscores-e-football',
           timeClass: 'boxscores-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, 'Final')
         if(vertical === 'nfl'){
           gameObject.link = domain + '/nfl/articles/postgame-report/' + item.eventId;
         }else if(vertical === 'ncaaf'){
           gameObject.link = domain + '/ncaaf/articles/postgame-report/' + item.eventId;
         }else{
           gameObject.link = '#';
         }

         gameObject.gameNode = buildNode(gameObject);

         wpost.push(gameObject);
       }

      }

    }

    pre = array_sort(pre, 1, 'timestamp');
    active = array_sort(active, 1, 'timestamp');
    post = array_sort(post, 1, 'timestamp');
    wpre = array_sort(wpre, 1, 'timestamp');
    wpost = array_sort(wpost, 1, 'timestamp');

    var allGames = active.concat(pre, post, wpre, wpost);

    return allGames;
  }
  //Format baseball data
  // data: array of data from api to be processed
  function formatBaseballData(data){
    var pre = [], active = [], post = [];

    for(var index in data){
      var item = data[index];
      //Determine if game is today (Also allow games that are live, but the day has rolled over past midnight)
      var gameIsToday = false;
      var timestampDate = new Date(item.gameInfo.startDateTimestamp + boxscoresBar.easternTime.offset * 3600 * 1000).getUTCDate();
      if(timestampDate == boxscoresBar.todayObject.date){
        gameIsToday = true;
      }else if(item.gameInfo.live){
        gameIsToday = true;
      }

      //If game is today or live, push to return array
      if(gameIsToday){
        switch(item.gameInfo.eventStatus){
          case 'pre-event':
           if(item.gameInfo.live === false){
             //Pre Game
             var gameObject = {
               homeTeam: item.homeTeamInfo.abbreviation,
               homeScore: '-',
               awayTeam: item.awayTeamInfo.abbreviation,
               awayScore: '-',
               timestamp: item.gameInfo.startDateTimestamp,
               datetime: convertToEastern(item.gameInfo.startDateTimestamp),
               eventStatus: item.gameInfo.eventStatus,
               eventId: item.gameInfo.eventId,
               gameClass: 'boxscores-e-baseball'
             };
             gameObject.bottomData = gameObject.datetime;
             gameObject.link = domain + '/articles/pregame-report/' + gameObject.eventId;

             gameObject.gameNode = buildNode(gameObject);

             pre.push(gameObject);
           }else{
             //Live Game
             var gameObject = {
               homeTeam: item.homeTeamInfo.abbreviation,
               homeScore: item.homeTeamInfo.score,
               awayTeam: item.awayTeamInfo.abbreviation,
               awayScore: item.awayTeamInfo.score,
               timestamp: item.gameInfo.startDateTimestamp,
               datetime: convertToEastern(item.gameInfo.startDateTimestamp),
               eventStatus: item.gameInfo.eventStatus,
               eventId: item.gameInfo.eventId,
               gameClass: 'boxscores-e-baseball'
             };

             if(item.gameInfo.inningHalf === 'top'){
               gameObject.bottomData = '<i class="boxscores-e-game-inning-top"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
             }else if(item.gameInfo.inningHalf === 'bottom'){
               gameObject.bottomData = '<i class="boxscores-e-game-inning-bottom"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
             }else{
               gameObject.bottomData = '';
             }

             if(item.gameInfo.inningsPlayed <= 3){
               gameObject.link = domain + '/articles/pregame-report/' + gameObject.eventId;
             }else if(item.gameInfo.inningsPlayed > 3 && item.gameInfo.inningsPlayed <= 5){
               gameObject.link = domain + '/articles/third-inning-report/' + gameObject.eventId;
             }else if(item.gameInfo.inningsPlayed > 5 && item.gameInfo.inningsPlayed <= 7){
               gameObject.link = domain + '/articles/fifth-inning-report/' + gameObject.eventId;
             }else if(item.gameInfo.inningsPlayed > 7){
               gameObject.link = domain + '/articles/seventh-inning-report/' + gameObject.eventId;
             }

             gameObject.gameNode = buildNode(gameObject);

             active.push(gameObject)
           }
          break;
          case 'post-event':
             //Post Game
             var gameObject = {
               homeTeam: item.homeTeamInfo.abbreviation,
               homeScore: item.homeTeamInfo.score,
               awayTeam: item.awayTeamInfo.abbreviation,
               awayScore: item.awayTeamInfo.score,
               timestamp: item.gameInfo.startDateTimestamp,
               datetime: convertToEastern(item.gameInfo.startDateTimestamp),
               eventStatus: item.gameInfo.eventStatus,
               eventId: item.gameInfo.eventId,
               gameClass: 'boxscores-e-baseball'
             };

             gameObject.bottomData = 'Final';
             gameObject.link = domain + '/articles/postgame-report/' + gameObject.eventId;

             gameObject.gameNode = buildNode(gameObject);

             post.push(gameObject);
          break;
          default:
           //Do nothing
          break;
        }
      }
    }

    pre = array_sort(pre, 1, 'timestamp');
    active = array_sort(active, 1, 'timestamp');
    post = array_sort(post, 1, 'timestamp');

    var allGames = active.concat(pre, post);

    return allGames;
  }
}(window.boxscoresBar = window.boxscoresBar || {}))
