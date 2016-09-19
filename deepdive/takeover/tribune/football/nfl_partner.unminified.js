(function(){
  var topWin = window;
  try {
    while(topWin !== top){
      topWin = topWin.parent;
    }
  }catch(e){
    console.error("ddh - couldn/'t access the top window");
  }

  var domain = topWin.location.hostname,
  contentMarginTop, //How many pixels to push the content down (to be flush with the header) This value will match railMarginTop if header is fixed
  railMarginTop, //How many pixels to push the rail ads down (to be flush with the header) This value will match contentMarginTop if header is fixed
  contentMaxWidth, //Max width of publisher content
  domain = domain.replace(/www./, '');
  var protocol = (location.protocol) === 'https:' ? 'https' : 'http';
  var partnerState; //State of partner needed for api
  var imagePath = protocol + '://w1.synapsys.us/widgets/deepdive/images/football'; //URL Path of images
  // var imagePath = protocol + '://localhost:8000/deepdive/images/football';
  var heroImage = imagePath + '/hero.jpg';
  var contentEl; //Main node of the content. This is needed to calculate position of rails and to add deep dive hero

  var easternTime = (function(){
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

  var todayObject = (function(offset, undefined){
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
  })(easternTime.offset);

  //Google analytics tags
  // var gaRails = '/?utm_source=Tribune&utm_medium=Siderails&utm_campaign=Baseball%20Takeover';
  // var gaTop = '/?utm_source=Tribune&utm_medium=TopSection&utm_campaign=Baseball%20Takeover';

  switch(domain){
    case 'baltimoresun.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'md';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'capitalgazette.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'md';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'chicagotribune.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'il';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'courant.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'ct';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'dailypress.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'va';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'latimes.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'ca';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'mcall.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'pa';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'orlandosentinel.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'fl';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'sandiegouniontribune.com':
      railMarginTop = 89;
      contentMarginTop = 0;
      contentMaxWidth = 1280;
      partnerState = 'ca';
      contentEl = topWin.document.querySelector('.target-bg');
    break;
    case 'southflorida.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'fl';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    case 'sun-sentinel.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'fl';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
    default:
      //Default case
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'il';
      contentEl = topWin.document.querySelector('.trb_masthead');
    break;
  }
  //Set microsite destination link
  // domain = 'http://football.' + domain;
  domain = 'http://mytouchdownzone.com/' + domain;

  var railWidth = 500; //Width of rails (width of rail images)
  var deepDiveHero, leftRail, rightRail;
  var body = topWin.document.getElementsByTagName("body")[0];
  var bodyWidth = body.offsetWidth;
  var displayNumber = 4; //Amount of games displayed for box scores (changes based on browser width)
  var railsLoaded = false; //If rails have been built
  var deepDiveLoaded = false; //If deep dive has been built
  var initialIndex = [], dataLength, processedData; //Variables for game data

  var videoApi = protocol + '://prod-touchdownloyal-api.synapsys.us/videoBatch/nfl/1/1/' + partnerState;
  var boxscoresApi = protocol + '://prod-touchdownloyal-api.synapsys.us/boxScores/league/nfl/' + todayObject.dateInput;

  //Build rails
  function buildRails(){
    leftRail = topWin.document.createElement('a');
    leftRail.className = 'to-left-rail';
    leftRail.href = domain + '/nfl';
    leftRail.target = '_blank';
    leftRail.innerHTML = `
      <div id="to-left-ad">
        <img class="to-left-ad-presented" src="` + imagePath + `/presented_left.png">
      </div>
    `;

    rightRail = topWin.document.createElement('a');
    rightRail.className = 'to-right-rail';
    rightRail.href = domain + '/nfl';
    rightRail.target = '_blank';
    rightRail.innerHTML = `
      <div id="to-right-ad">
        <img class="to-right-ad-presented" src="` + imagePath + `/presented_right.png">
      </div>
    `;

    body.insertBefore(rightRail, body.firstChild);
    body.insertBefore(leftRail, body.firstChild);

    //Inject left ad
    var leftAd = topWin.document.getElementById('to-left-ad');
    var leftEmbed = topWin.document.createElement('script');
    leftEmbed.src =  protocol + '://content.synapsys.us/embeds/mlb/deepdive_160x600/partner.js';
    leftAd.insertBefore(leftEmbed, leftAd.firstChild);

    //Inject right ad
    var rightAd = topWin.document.getElementById('to-right-ad');
    var rightEmbed = topWin.document.createElement('script');
    rightEmbed.src = protocol + '://content.synapsys.us/embeds/mlb/deepdive_160x600/partner-right.js';
    rightAd.insertBefore(rightEmbed, rightAd.firstChild);

    railsLoaded = true;
  }
  //Build deep dive
  function buildDeepDive(){
    deepDiveHero = topWin.document.createElement('div');
    deepDiveHero.className = 'ddh-container';
    deepDiveHero.innerHTML = `
      <div class="ddh-media">
        <button class="ddh-media-close">
          <span class="ddh-icon-times"></span><br>
          <span class="ddh-close-text">CLOSE</span>
        </button>
        <div class="ddh-media-content">
          <div id="ddh-media-video"></div>
          <a target="_blank" href="` + domain + `/nfl">
            <div class="ddh-media-right-content">
              <img width="260px" height="56px" src="` + imagePath + `/content_title.png?">
              <div class="ddh-media-right-title">
                Who's Hot and Who's Not?
              </div>
              <ul class="ddh-media-right-list">
                <li>
                  <img width="26px" height="30px" src="` + imagePath + `/icon_football.png" >Stats
                </li>
                <li>
                  <img width="32px" height="34px" src="` + imagePath + `/icon_news.png" >Stories
                </li>
                <li>
                  <img width="36px" height="16px" src="` + imagePath + `/icon_shoe.png" >Profiles
                </li>
              </ul>
              <div class="ddh-media-cta">
                FIND OUT NOW
                <span class="ddh-icon-arrow-right"></span>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;

    var deepDiveBar = topWin.document.createElement('div');
    deepDiveBar.className = 'ddh-bar';
    deepDiveBar.innerHTML = `
      <div class="ddh-bar-title">
        <img src="` + imagePath + `/icon_football.png" >
        NFL THIS WEEK
      </div>

      <ul class="ddh-bar-schedule"></ul>
    `;

    contentEl.insertBefore(deepDiveHero, contentEl.firstChild);

    var videoXhttp = new XMLHttpRequest();
    videoXhttp.onreadystatechange = function(){
      if(videoXhttp.readyState === 4 && videoXhttp.status === 200){
        //Success
        var res = JSON.parse(videoXhttp.responseText);
        //console.log('video ajax complete', res);
        var videoFrame = topWin.document.getElementById('ddh-media-video');
        var videoNode = topWin.document.createElement('iframe');
        videoNode.frameBorder = '0';
        videoNode.width = '650px';
        videoNode.height = '366px';
        videoNode.setAttribute('allowfullscreen', '');
        videoNode.src = res.data[0].videoLink + '&autoplay=on&sound=off';
        videoFrame.appendChild(videoNode);
      }
    }
    videoXhttp.open('GET', videoApi, true);
    videoXhttp.send();

    var closeButton = topWin.document.getElementsByClassName('ddh-media-close')[0];
    //On click of close remove deep dive hero
    closeButton.addEventListener('click', function(){
      var deepDiveMedia = topWin.document.getElementsByClassName('ddh-media')[0];
      deepDiveMedia.parentElement.removeChild(deepDiveMedia);
      deepDiveHero.className = 'ddh-container ddh-closed';
    })

    //Add boxscores bar to deep dive hero
    deepDiveHero.appendChild(deepDiveBar);

    //AJAX call to get box scores data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        // console.log('ajax complete', JSON.parse(xhttp.responseText));
        var res = JSON.parse(xhttp.responseText);
        processedData = formatData(res.data);
        dataLength = processedData.length;
        // console.log('processedData', processedData);

        //Calculate bodyWidth to determine amount of games to display
        var contentWidth = contentEl.offsetWidth;

        if(contentWidth >= 1280){
          displayNumber = 6;
        }else if(contentWidth >= 1140){
          displayNumber = 5;
        }else if(contentWidth >= 990){
          displayNumber = 4;
        }else{
          displayNumber = 4;
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
          var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
          schedule.appendChild(processedData[nodeIndex].gameNode);
        }

        var deepDiveBarNav = topWin.document.createElement('div');
        deepDiveBarNav.className = 'ddh-bar-nav';
        deepDiveBarNav.innerHTML = `
          <button class="ddh-bar-button ddh-prev" >
            <i class="ddh-icon-angle-left"></i>
          </button>
          <button class="ddh-bar-button ddh-next">
            <i class="ddh-icon-angle-right"></i>
          </button>
        `;

        deepDiveBar.appendChild(deepDiveBarNav);

        //Listen for next button click
        var nextButton = topWin.document.getElementsByClassName('ddh-bar-button ddh-next')[0];
        nextButton.addEventListener('click', function(){
          //Clear games
          clearGames();

          for(var z = 0; z < displayNumber; z++){
            var newIndex = initialIndex[z] + displayNumber;
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
            var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        });

        //Listen for previous button click
        var prevButton = topWin.document.getElementsByClassName('ddh-bar-button ddh-prev')[0];
        prevButton.addEventListener('click', function(){
          //Clear games
          clearGames();

          for(var z = 0; z < displayNumber; z++){
            var newIndex = initialIndex[z] - displayNumber;
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
            var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
            schedule.appendChild(processedData[nodeIndex].gameNode);
          }

        });

      }
    };
    xhttp.open('GET', boxscoresApi, true);
    xhttp.send();

    deepDiveLoaded = true;
  }

  //Convert unix timestamp to datetime [hour:minute meridian tzAbbrev]
  function convertToEastern(date){
    var date = new Date(date + easternTime.offset * 3600 * 1000);
    var hour = date.getUTCHours();
    var meridian = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    var minutes = date.getUTCMinutes();
    minutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes;

    var convertedDate = hour + ':' + minutes + meridian + ' ' + easternTime.tzAbbrev;

    return convertedDate;
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
  //Format boxscores data
  function formatData(data){
    var buildNode = function(data){
      var gameNode = document.createElement('li');
      var timeClass = data.timeClass ? data.timeClass + ' ddh-bar-game-time' : 'ddh-bar-game-time';
      gameNode.className = data.gameClass ? data.gameClass + ' ddh-bar-game' : 'ddh-bar-game';
      gameNode.innerHTML = `
        <a class="ddh-bar-game-link" href="` + data.link + `">
          <ul class="ddh-bar-game-teams">
            <li>
              ` + data.homeTeam + ` <span class="ddh-bar-game-teamscore">` + data.homeScore + `</span>
            </li>
            <li>
              ` + data.awayTeam + ` <span class="ddh-bar-game-teamscore">` + data.awayScore + `</span>
            </li>
          </ul>
          <span class="` + timeClass + `">
            ` + data.bottomData + `
          </span>
        </a>
      `;

      return gameNode;
    }

    var pre = [], active = [], post = [], wpre = [], wpost = [];

    var prettyDatetime = function(timestamp, datetime){
      var dateObject = new Date(timestamp + easternTime.offset * 3600  * 1000);
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
      var timestampDate = new Date(item.eventStartTime + easternTime.offset * 3600 * 1000).getUTCDate();
      var now = new Date().getTime();

      if(timestampDate == todayObject.date){
        gameIsToday = true;
      }

      if(gameIsToday){
       //Game is Today
       if(item.liveStatus === 'N' && item.eventStartTime > now){
         //Pre Game
         var homeRecord = item.team1Record.split('-');
         var homeScore = homeRecord[0] + '-' + homeRecord[1];
         var awayRecord = item.team2Record.split('-');
         var awayScore = awayRecord[0] + '-' + awayRecord[1];

         var gameObject = {
           homeTeam: item.team1Abbreviation,
           homeScore: homeScore,
           awayTeam:item.team2Abbreviation,
           awayScore: awayScore,
           timestamp: item.eventStartTime,
           datetime: convertToEastern(item.eventStartTime),
           eventId: item.eventId,
           gameClass: 'ddh-football',
           timeClass: 'ddh-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, gameObject.datetime);
         gameObject.link = domain + '/nfl/articles/pregame-report/' + item.eventId;

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
           gameClass: 'ddh-football'
         };

         gameObject.bottomData = item.eventQuarter ? ordinalSuffix(item.eventQuarter) : gameObject.datetime;
         gameObject.link = domain + '/nfl/articles/live-report/' + item.eventId;

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
           gameClass: 'ddh-football',
           timeClass: 'ddh-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, 'Final');
         gameObject.link = domain + '/nfl/articles/postgame-report/' + item.eventId;

         gameObject.gameNode = buildNode(gameObject);

         post.push(gameObject);
       }

      }else{
       //Game is this week
       if(item.eventStartTime > now){
         //Pre Game
         var homeRecord = item.team1Record.split('-');
         var homeScore = homeRecord[0] + '-' + homeRecord[1];
         var awayRecord = item.team2Record.split('-');
         var awayScore = awayRecord[0] + '-' + awayRecord[1];

         var gameObject = {
           homeTeam: item.team1Abbreviation,
           homeScore: homeScore,
           awayTeam:item.team2Abbreviation,
           awayScore: awayScore,
           timestamp: item.eventStartTime,
           datetime: convertToEastern(item.eventStartTime),
           eventId: item.eventId,
           gameClass: 'ddh-football',
           timeClass: 'ddh-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, gameObject.datetime);
         gameObject.link = domain + '/nfl/articles/pregame-report/' + item.eventId;

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
           gameClass: 'ddh-football',
           timeClass: 'ddh-e-2-lines'
         };

         gameObject.bottomData = prettyDatetime(gameObject.timestamp, 'Final');
         gameObject.link = domain + '/nfl/articles/postgame-report/' + item.eventId;

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
  //Clear games from boxscores bar
  function clearGames(){
    var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
    while(schedule.hasChildNodes()){
      schedule.removeChild(schedule.firstChild);
    }
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
  //Resize fnction
  function resizeEvent(){
    var resizeBodyWidth = topWin.document.getElementsByTagName("body")[0].offsetWidth;
    var resizeContentWidth = contentEl.offsetWidth;

    var addRemoveItem = function(){
      clearGames();
      var diff = displayNumber - initialIndex.length;
      if(diff > 0){
        //Add items to array

        for(var i = 0; i < diff; i++){
          var lastIndex = initialIndex[initialIndex.length - 1];
          initialIndex.push(lastIndex + 1 >= dataLength ? 0 : lastIndex + 1);
        }
        //Insert games
        for(var c = 0, length = initialIndex.length; c < length; c++){
          var nodeIndex = initialIndex[c];
          var schedule = document.getElementsByClassName('ddh-bar-schedule')[0];
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
          var schedule = document.getElementsByClassName('ddh-bar-schedule')[0];
          schedule.appendChild(processedData[nodeIndex].gameNode);
        }
      }
    }

    if(resizeContentWidth >= 1280 && displayNumber !== 6){
      displayNumber = 6;
      addRemoveItem();
    }else if(resizeContentWidth < 1280 && resizeContentWidth >= 1140 && displayNumber !== 5){
      displayNumber = 5;
      addRemoveItem();
    }else if(resizeContentWidth < 1140 && resizeContentWidth >= 990 && displayNumber !== 4){
      displayNumber = 4;
      addRemoveItem();
    }

    //If rails dont exist and body is big enough for rails, build rails
    if(!railsLoaded && (resizeBodyWidth - resizeContentWidth) >= 320){
      buildRails();
    }
    //If deep dive does not exist and body is big enough, build deep dive
    if(!deepDiveLoaded && resizeBodyWidth >= 990){
      buildDeepDive();
    }
  }

  //Build and load font
  var fontEl = topWin.document.createElement('link');
  fontEl.rel = 'stylesheet';
  fontEl.type = 'text/css';
  fontEl.href = 'https://fonts.googleapis.com/css?family=Lato:300,400';
  topWin.document.head.appendChild(fontEl);

  //Build and load stylesheet
  var styleEl = topWin.document.createElement('style');
  styleEl.innerHTML = `
    @charset "UTF-8";

    @font-face {
      font-family: "takeover-deep-dive";
      src:url("` + protocol + `://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=eot");
      src:url("` + protocol + `://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=eot_iefix") format("embedded-opentype"),
        url("` + protocol + `://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=woff") format("woff"),
        url("` + protocol + `://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=ttf") format("truetype"),
        url("` + protocol + `://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=svg") format("svg");
      font-weight: normal;
      font-style: normal;

    }

    [data-icon]:before {
      font-family: "takeover-deep-dive" !important;
      content: attr(data-icon);
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      speak: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    [class^="ddh-icon-"]:before,
    [class*=" ddh-icon-"]:before {
      font-family: "takeover-deep-dive" !important;
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      speak: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .ddh-icon-arrow-right:before {
      content: "` + "\\61" + `";
    }
    .ddh-icon-angle-right:before {
      content: "` + "\\62" + `";
    }
    .ddh-icon-angle-left:before {
      content: "` + "\\63" + `";
    }
    .ddh-icon-times:before {
      content: "` + "\\64" + `";
    }

    .to-left-rail{
      width: ` + railWidth + `px;
      position: fixed;
      top: 0;
      right: calc(50% + 640px);
      bottom: 0;
      background-image: url('` + imagePath + `/rail_left.jpg');
      display: none;
      background-color: #000;
      background-repeat: no-repeat;
      background-position: top right;
      contain: strict;
    }
    @media(min-width: 1600px){
      .to-left-rail{
        display: block;
      }
    }
    #to-left-ad{
      width: 160px;
      height: 600px;
      position: absolute;
      top: ` + railMarginTop + `px;
      right: 0;
    }
    .to-left-ad-presented{
      position: absolute;
      bottom: -76px;
      right: 15px;
    }
    .to-right-rail{
      width: ` + railWidth + `px;
      position: fixed;
      top: 0;
      left: calc(50% + 640px);
      bottom: 0;
      background-image: url('` + imagePath + `/rail_right.jpg');
      display: none;
      background-color: #000;
      background-repeat: no-repeat;
      contain: strict;
    }
    @media(min-width: 1600px){
      .to-right-rail{
        display: block;
      }
    }
    #to-right-ad{
      width: 160px;
      height: 600px;
      position: absolute;
      top: ` + railMarginTop + `px;
      left: 0;
    }
    .to-right-ad-presented{
      position: absolute;
      bottom: -76px;
      left: 15px;
    }

    .ddh-container{
      width: 100%;
      margin: -40px 0 40px;
      font-family: Lato, Helvetica;
      display: none;
      height: 496px;
      contain: strict;
    }
    .ddh-container.ddh-closed{
      height: 50px;
    }
    @media(min-width: 990px){
      .ddh-container{
        display: block;
      }
    }
    .ddh-media{
      background-color: #363636;
      padding: 40px 0;
      position: relative;
      background-size: cover;
      background-image: url('` + heroImage + `');
    }
    .ddh-media-content{
      width: 970px;
      height: 366px;
      margin: 0 auto;
      background-color: #000;
    }
    #ddh-media-video{
      width: 650px;
      height: 366px;
      background-color: #464646;
      float: left;
    }
    .ddh-media-right-content{
      box-sizing: border-box;
      border: 5px solid #e1e1e1;
      background-image: url('` + imagePath + `/content_bg.jpg');
      float: right;
      width: 320px;
      height: 366px;
      background-color: #363636;
      color: #fff;
      padding: 15px;
      text-align: center;
    }
    .ddh-media-right-title{
      font-size: 22px;
      display: inline-block;
      margin-top: 10px;
    }
    .ddh-media-right-list{
      list-style-type: none;
      margin: 15px 0 35px 0;
      padding: 0 0 0 35px;
      text-align: left;
      font-size: 24px;
    }
    .ddh-media-right-list>li{
      margin-bottom: 10px;
    }
    .ddh-media-right-list>li>img{
      vertical-align: middle;
    }
    .ddh-media-right-list>li:nth-child(1)>img{
      margin-right: 23px;
    }
    .ddh-media-right-list>li:nth-child(2)>img{
      margin-right: 17px;
    }
    .ddh-media-right-list>li:nth-child(3)>img{
      margin-right: 13px;
    }
    .ddh-media-cta{
      width: 266px;
      height: 55px;
      line-height: 55px;
      background-color: #fc501d;
      color: #fff;
      display: inline-block;
      border-radius: 30px;
      font-size: 24px;
      font-weight: 300;
      text-decoration: none;
    }
    .ddh-media-cta>.ddh-icon-arrow-right{
      vertical-align: middle;
      margin-left: 10px;
    }

    .ddh-media-close{
      width: 50px;
      height: 50px;
      background-color: #000 !important;
      opacity: 0.33;
      border-radius: 50%;
      color: #fff !important;
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      font-weight: 300;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      z-index: 10;
      padding: 0;
    }
    .ddh-media-close>.ddh-icon-times{
      font-size: 30px;
      vertical-align: middle;
    }
    .ddh-media-close>.ddh-close-text{
      display: none;
    }
    .ddh-media-close:focus{
      outline: none;
    }
    @media(min-width: 1180px){
      .ddh-media-close{
        width: 90px;
        height: 90px;
      }
      .ddh-media-close>.ddh-icon-times{
        font-size: 40px;
      }
      .ddh-media-close>.ddh-close-text{
        display: inline;
      }
    }

    .ddh-bar{
      width: 100%;
      min-width: 990px;
      height: 50px;
      line-height: 50px;
      background-color: #272727;
      color: #fff;
    }
    .ddh-bar-title{
      font-size: 18px;
      float: left;
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      width: auto;
      border-right: 1px solid #000;
    }
    .ddh-bar-title>img{
      vertical-align: middle;
      margin-right: 7px;
      width: 22px;
      position: relative;
      top: -2px;
    }
    .ddh-bar-schedule{
      list-style-type: none;
      float: left;
      margin: 0 5px 0 0;
      padding: 0;
      height: 100%;
    }
    .ddh-bar-game{
      display: inline-block;
      width: 166px;
      height: 50px;
      border-right: 1px solid #000;
      box-sizing: border-box;
      overflow: hidden;
    }
    .ddh-bar-game:last-child{
      border-right: none;
    }
    .ddh-bar-game-link{
      display: block;
      width: 100%;
      height: 100%;
      padding: 0 10px 0 10px;
      box-sizing: border-box;
      text-decoration: none;
      color: #fff !important;
    }
    .ddh-bar-game-teams{
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 65px;
      line-height: normal;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
    }
    .ddh-game-inning-top:before{
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 7px 9px 7px;
      border-color: transparent transparent #fff transparent;
      margin-right: 5px;
      display: inline-block;
    }
    .ddh-game-inning-bottom:before{
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 9px 7px 0 7px;
      border-color: #fff transparent transparent transparent;
      margin-right: 5px;
      display: inline-block;
    }
    .ddh-bar-game-teamscore{
      float: right;
    }
    .ddh-bar-game-time{
      font-size: 12px;
      float: right;
      font-weight: 400;
    }
    .ddh-e-2-lines{
      line-height: normal;
      padding-top: 10px;
    }
    .ddh-bar-nav{
      float: left;
      margin-right: 5px;
    }
    .ddh-bar-button{
      width: 30px;
      height: 30px;
      line-height: normal;
      border-radius: 5px;
      background-color: #fff !important;
      border: none;
      color: #fc501d !important;
      padding: 0;
      margin: 0 3px 0 0;
      vertical-align: middle;
      cursor: pointer;
      font-size: 24px;
      position: relative;
    }
    .ddh-bar-button>i{
      position: absolute;
      top: 4px;
      left: 4px;
    }
    .ddh-bar-button>i.ddh-icon-angle-left{
      left: 3px;
    }
    .ddh-bar-button:focus{
      outline: none;
    }
  `;

  topWin.document.head.appendChild(styleEl);

  var contentWidth = contentEl.offsetWidth;
  //Determine if screen is large enough for rails
  if((bodyWidth - contentWidth) >= 320){
    buildRails();
  }
  //Determine if screen is large enough for deep dive
  if(contentWidth >= 990){
    buildDeepDive();
  }

  topWin.addEventListener('resize', throttle(resizeEvent, 100));

})();
