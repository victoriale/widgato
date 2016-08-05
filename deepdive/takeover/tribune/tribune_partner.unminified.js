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
  boxScoreColor = '#004e87'; //Boxscores background color
  domain = domain.replace(/www./, '');
  var protocol = (location.protocol) === 'https:' ? 'https' : 'http';
  var partnerState; //State of partner needed for api
  var heroImage = protocol + '://w1.synapsys.us/widgets/deepdive/images/baseball_hero.jpg'; //Background Hero image of deepdive hero
  var contentEl; //Main node of the content. This is needed to calculate position of rails and to add deep dive hero

  switch(domain){
    case 'baltimoresun.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'md';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'capitalgazette.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'md';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'chicagotribune.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'il';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'courant.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'ct';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'dailypress.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'va';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'latimes.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'ca';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'mcall.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'pa';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'orlandosentinel.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'fl';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
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
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    case 'sun-sentinel.com':
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'fl';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
    default:
      //Default case
      railMarginTop = contentMarginTop = 131;
      contentMaxWidth = 1280;
      partnerState = 'il';
      contentEl = topWin.document.querySelector('.trb_allContentWrapper');
    break;
  }

  var railWidth = 500; //Width of rails (width of rail images)
  var deepDiveHero, leftRail, rightRail;
  var body = topWin.document.getElementsByTagName("body")[0];
  var bodyWidth = body.offsetWidth;
  var displayNumber = 4; //Amount of games displayed for box scores (changes based on browser width)
  var railsLoaded = false; //If rails have been built
  var railsVisible = false; //If rails are visible
  var deepDiveLoaded = false; //If deep dive has been built
  var deepDiveVisible = false; //If deep dive is visible
  var initialIndex = [], dataLength, processedData; //Variables for game data

  //If the body width is less than 990, exit embed (insert nothing)
  //Disabled: Disabled because if a user loads a page in a browser less than 990px and resizes. the deepdive would never load
  // if(bodyWidth < 990){
  //   return false;
  // }

  //Build rails
  var buildRails = function(){
    //console.log('BUILD RAILS');
    leftRail = topWin.document.createElement('a');
    leftRail.className = 'to-left-rail to-rail-visible';
    leftRail.href = 'http://www.myhomerunzone.com/' + domain;
    leftRail.target = '_blank';
    leftRail.innerHTML = `
      <div id="to-left-ad">
        <img class="to-left-ad-presented" src="` + protocol + `://w1.synapsys.us/widgets/deepdive/images/logo_left.png">
      </div>
    `;

    rightRail = topWin.document.createElement('a');
    rightRail.className = 'to-right-rail to-rail-visible';
    rightRail.href = 'http://www.myhomerunzone.com/' + domain;
    rightRail.target = '_blank';
    rightRail.innerHTML = `
      <div id="to-right-ad">
        <img class="to-right-ad-presented" src="` + protocol + `://w1.synapsys.us/widgets/deepdive/images/logo_right.png">
      </div>
    `;

    leftRail.style.left = getLeftRailPos();
    rightRail.style.left = getRightRailPos();

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
    railsVisible = true;
  }
  //Build deep dive
  var buildDeepDive = function(){
    //console.log('BUILD DEEPDIVE');
    deepDiveHero = topWin.document.createElement('div');
    deepDiveHero.className = 'ddh-container ddh-visible';
    deepDiveHero.innerHTML = `
      <div class="ddh-media">
        <button class="ddh-media-close">
          <span class="ddh-icon-times"></span><br>
          <span class="ddh-close-text">CLOSE</span>
        </button>
        <div class="ddh-media-content">
          <div id="ddh-media-video"></div>
          <a target="_blank" href="` + ('http://www.myhomerunzone.com/' + domain) + `">
            <div class="ddh-media-right-content">
              <img width="280px" height="40px" src="` + protocol + `://w1.synapsys.us/widgets/deepdive/images/baseball_logo.png?">
              <div class="ddh-media-right-title">
                Who's Hot and Who's Not?
                <div class="ddh-media-right-title-border"></div>
              </div>
              <ul class="ddh-media-right-list">
                <li>
                  <img src="` + protocol + `://w1.synapsys.us/widgets/deepdive/images/baseball_icon.png" >Stats
                </li>
                <li>
                  <img src="` + protocol + `://w1.synapsys.us/widgets/deepdive/images/baseball_field_icon.png" >Stories
                </li>
                <li>
                  <img src="` + protocol + `://w1.synapsys.us/widgets/deepdive/images/baseball_hat_icon.png" >Profiles
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
        <img src="` + protocol + `://w1.synapsys.us/widgets/deepdive/images/baseball_icon.png" >
        TODAY'S MLB GAMES
      </div>

      <ul class="ddh-bar-schedule"></ul>

      <div class="ddh-bar-nav">
        <button class="ddh-bar-button ddh-prev" >
          <span class="ddh-icon-angle-left"></span>
        </button>
        <button class="ddh-bar-button ddh-next">
          <span class="ddh-icon-angle-right"></span>
        </button>
      </div>
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
    videoXhttp.open('GET', protocol + '://prod-homerunloyal-api.synapsys.us/article/video/batch/division/' + partnerState + '/1/1', true);
    videoXhttp.send();

    var closeButton = topWin.document.getElementsByClassName('ddh-media-close')[0];
    //On click of close remove deep dive hero
    closeButton.addEventListener('click', function(){
      var deepDiveMedia = topWin.document.getElementsByClassName('ddh-media')[0];
      deepDiveMedia.parentElement.removeChild(deepDiveMedia);
    })

    //Get timezone abbreviation and offset
    var tz = getEasternTime();

    //Get today's date in eastern time
    var today = new Date(new Date().getTime() + tz.offset * 3600 * 1000);
    var year = today.getUTCFullYear();
    var month = today.getUTCMonth() + 1;
    month = month.toString().length === 1 ? '0' + month : month; //If month is single digit (1-9) add 0 so api is called with double digit params (for cache)
    var date = today.getUTCDate();
    var dateInput = year + '-' + month + '-' + date;

    //AJAX call to get box scores data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        //console.log('ajax complete', JSON.parse(xhttp.responseText));
        var res = JSON.parse(xhttp.responseText);
        processedData = formatData(res.data, tz.offset, tz.tzAbbrev, date);
        dataLength = processedData.length;
        //console.log('processedData', processedData);

        //Calculate bodyWidth to determine amount of games to display
        var contentWidth = contentEl.offsetWidth;
        displayNumber = contentWidth >= 1080 ? 4 : 3;

        //Add boxscores bar to deep dive hero
        deepDiveHero.appendChild(deepDiveBar);

        //Get initial indexes to show
        for(var c = 0; c < displayNumber; c++){
            if(typeof processedData[c] !== 'undefined'){
              initialIndex.push(c);
            }
        }
        //Display initial games
        for(var i = 0, length = initialIndex.length; i < length; i++){
          var nodeIndex = initialIndex[i];
          var gameNode = topWin.document.createElement('li');
          gameNode.className = 'ddh-bar-game';
          gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

          var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
          schedule.appendChild(gameNode);
        }

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
            var gameNode = topWin.document.createElement('li');
            gameNode.className = 'ddh-bar-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
            schedule.appendChild(gameNode);
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
            var gameNode = topWin.document.createElement('li');
            gameNode.className = 'ddh-bar-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
            schedule.appendChild(gameNode);
          }

        });

      }
    };
    xhttp.open('GET', protocol + '://prod-homerunloyal-api.synapsys.us/league/boxScores/' + dateInput , true);
    xhttp.send();

    deepDiveLoaded = true;
    deepDiveVisible = true;
  }

  //Get position of left rail
  var getLeftRailPos = function(){
    var contentLeft = contentEl.getBoundingClientRect().left;
    return (contentLeft - railWidth) + 'px';
  }

  //Get position of right rail
  var getRightRailPos = function(){
    var contentLeft = contentEl.getBoundingClientRect().left;
    var contentWidth = contentEl.offsetWidth;

    return (contentLeft + contentWidth) + 'px';
  }

  //Get current timezone offset and timezone abbreviation (in eastern)
  var getEasternTime = function(){
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
      abbrev = 'EST';
    }else{
      //Daylight Savings Time
      offset = -4;
      abbrev = 'EDT';
    }

    return {
      offset: offset,
      tzAbbrev: abbrev
    };
  }

  //Convert unix timestamp to datetime [hour:minute meridian tzAbbrev]
  var convertToEastern = function(date, offset, tzAbbrev){
    var date = new Date(date + offset * 3600 * 1000);
    var hour = date.getUTCHours();
    var meridian = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    var minutes = date.getUTCMinutes();
    minutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes;

    var convertedDate = hour + ':' + minutes + meridian + ' ' + tzAbbrev;

    return convertedDate;
  }

  //Compare timestamp with a date value. This is used to filter out games that do not occur on the date given
  var compareDate = function(timestamp, date, offset){
    var timestampDate = new Date(timestamp + offset * 3600 * 1000);
    var timestampDate = timestampDate.getUTCDate();
    return date === timestampDate;
  }

  //Sort object by timestamp
  var sortByTime = function(arr){
    return arr.sort(function(a, b){
      return a.timestamp - b.timestamp;
    })
  }

  //Get ordinal suffix of a number (1st, 2nd, etc..)
  var ordinalSuffix = function(i){
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
  var formatData = function(data, offset, tzAbbrev, todayDate){
    var pre = [], active = [], post = [];

    for(var index in data){
      var item = data[index];
      switch(item.gameInfo.eventStatus){
        case 'pre-event':
          if(item.gameInfo.live === false){
            //Pre Game

            //If games date matches todays date push to array
            if(compareDate(item.gameInfo.startDateTimestamp, todayDate, offset)){
              pre.push({
                homeTeam: item.homeTeamInfo.abbreviation,
                homeScore: '-',
                awayTeam: item.awayTeamInfo.abbreviation,
                awayScore: '-',
                timestamp: item.gameInfo.startDateTimestamp,
                eventStatus: item.gameInfo.eventStatus,
                htmlMarkup: `
                  <a target="_blank" href="http://myhomerunzone.com/` + domain +`/articles/pregame-report/` + item.gameInfo.eventId + `" class="ddh-bar-game-link">
                    <ul class="ddh-bar-game-teams">
                      <li>
                        ` + item.homeTeamInfo.abbreviation + `
                        <span class="ddh-bar-game-teamscore">
                          -
                        </span>
                      </li>
                      <li>
                        ` + item.awayTeamInfo.abbreviation + `
                        <span class="ddh-bar-game-teamscore">
                          -
                        </span>
                      </li>
                    </ul>
                    <span class="ddh-bar-game-time">
                      ` + convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev) +  `
                    </span>
                  </a>
                `
              })
            }
          }else{
            //Live Game

            //If games date matches todays date push to array
            if(compareDate(item.gameInfo.startDateTimestamp, todayDate, offset)){
              //Determines which report the live game links to
              if(item.gameInfo.inningsPlayed <= 3){
                var link = 'http://myhomerunzone.com/' + domain +'/articles/pregame-report/' + item.gameInfo.eventId;
              }else if(item.gameInfo.inningsPlayed > 3 && item.gameInfo.inningsPlayed <= 5){
                var link = 'http://myhomerunzone.com/' + domain +'/articles/third-inning-report/' + item.gameInfo.eventId;
              }else if(item.gameInfo.inningsPlayed > 5 && item.gameInfo.inningsPlayed <= 7){
                var link = 'http://myhomerunzone.com/' + domain +'/articles/fifth-inning-report/' + item.gameInfo.eventId;
              }else if(item.gameInfo.inningsPlayed > 7){
                var link = 'http://myhomerunzone.com/' + domain +'/articles/seventh-inning-report/' + item.gameInfo.eventId;
              }
              //Determine what inning arrow to display
              var inningMarkup;
              if(item.gameInfo.inningHalf === 'top'){
                inningMarkup = '<span class="ddh-game-inning-top"></span>';
              }else if(item.gameInfo.inningHalf === 'bottom'){
                inningMarkup = '<span class="ddh-game-inning-bottom"></span>';
              }else{
                inningMarkup = '';
              }

              active.push({
                homeTeam: item.homeTeamInfo.abbreviation,
                homeScore: item.homeTeamInfo.score,
                awayTeam: item.awayTeamInfo.abbreviation,
                awayScore: item.awayTeamInfo.score,
                timestamp: item.gameInfo.startDateTimestamp,
                eventStatus: item.gameInfo.eventStatus,
                htmlMarkup: `
                  <a target="_blank" href="` + link + `" class="ddh-bar-game-link">
                    <ul class="ddh-bar-game-teams">
                      <li>
                        ` + item.awayTeamInfo.abbreviation + `
                        <span class="ddh-bar-game-teamscore">
                          ` + item.awayTeamInfo.score + `
                        </span>
                      </li>
                      <li>
                        ` + item.homeTeamInfo.abbreviation + `
                        <span class="ddh-bar-game-teamscore">
                          ` + item.homeTeamInfo.score + `
                        </span>
                      </li>
                    </ul>
                    <span class="ddh-bar-game-time">
                      ` + inningMarkup + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev)) +  `
                    </span>
                  </a>
                `
              })
            }
          }
        break;
        case 'Final':
        case 'post-event':
          //Post Game

          //If games date matches todays date push to array
          if(compareDate(item.gameInfo.startDateTimestamp, todayDate, offset)){
            post.push({
              homeTeam: item.homeTeamInfo.abbreviation,
              homeScore: item.homeTeamInfo.score,
              awayTeam: item.awayTeamInfo.abbreviation,
              awayScore: item.awayTeamInfo.score,
              timestamp: item.gameInfo.startDateTimestamp,
              eventStatus: item.gameInfo.eventStatus,
              htmlMarkup: `
                <a target="_blank" href="http://myhomerunzone.com/` + domain +`/articles/postgame-report/` + item.gameInfo.eventId + `" class="ddh-bar-game-link">
                  <ul class="ddh-bar-game-teams">
                    <li>
                      ` + item.homeTeamInfo.abbreviation + `
                      <span class="ddh-bar-game-teamscore">
                        ` + (item.homeTeamInfo.score || '-') + `
                      </span>
                    </li>
                    <li>
                      ` + item.awayTeamInfo.abbreviation + `
                      <span class="ddh-bar-game-teamscore">
                        ` + (item.awayTeamInfo.score || '-') + `
                      </span>
                    </li>
                  </ul>
                  <span class="ddh-bar-game-time">
                    FINAL
                  </span>
                </a>
              `
            })
          }
        break;
        default:
          //Do nothing
        break;
      }
    };
    pre = sortByTime(pre);
    active = sortByTime(active);
    post = sortByTime(post);
    //Combine games in order, active + pre + post
    var allGames = active.concat(pre, post);

    return allGames;
  }

  //Clear games from boxscores bar
  var clearGames = function(){
    var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
    while(schedule.hasChildNodes()){
      schedule.removeChild(schedule.firstChild);
    }
  }

  //Build and load font
  var fontEl = topWin.document.createElement('link');
  fontEl.rel = 'stylesheet';
  fontEl.type = 'text/css';
  fontEl.href = 'https://fonts.googleapis.com/css?family=Lato:300,400';
  topWin.document.head.appendChild(fontEl);
  //Build and load icons
  var iconEl = topWin.document.createElement('link');
  iconEl.rel = 'stylesheet';
  iconEl.type = 'text/css';
  iconEl.href = protocol + '://w1.synapsys.us/widgets/deepdive/fonts/styles.css';
  topWin.document.head.appendChild(iconEl);

  //Build and load stylesheet
  var styleEl = topWin.document.createElement('style');
  styleEl.innerHTML = `
  .to-left-rail{
    width: ` + railWidth + `px;
    position: fixed;
    top: 0;
    bottom: 0;
    background-image: url('` + protocol + `://w1.synapsys.us/widgets/deepdive/images/baseball_left.jpg');
    display: none;
    background-color: #000;
    background-repeat: no-repeat;
  }
  .to-left-rail.to-rail-visible{
    display: block;
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
    bottom: 0;
    background-image: url('` + protocol + `://w1.synapsys.us/widgets/deepdive/images/baseball_right.jpg');
    display: none;
    background-color: #000;
    background-repeat: no-repeat;
  }
  .to-right-rail.to-rail-visible{
    display: block;
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
    margin-top: ` + contentMarginTop + `px;
    font-family: Lato, Helvetica;
    display: none;
  }
  .ddh-container.ddh-visible{
    display: block;
  }
  .ddh-media{
    background-color: #363636;
    padding: 40px 0;
    position: relative;
    background-size: cover;
    background-image: url('` + heroImage + `');
    background-position: 0% 50%;
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
    background-image: url('` + protocol + `://w1.synapsys.us/widgets/deepdive/images/right_bgimage.jpg');
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
    margin-top: 20px;
  }
  .ddh-media-right-title-border{
    width: 100%;
    height: 2px;
    margin-top: 5px;
    background: #b91614; /* For browsers that do not support gradients */
    background: -webkit-linear-gradient(left, #b91614 , #1b3e6d); /* For Safari 5.1 to 6.0 */
    background: linear-gradient(to right, #b91614 , #1b3e6d); /* Standard syntax */
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
    width: 30px;
    vertical-align: middle;
    margin-right: 15px;
  }
  .ddh-media-cta{
    width: 266px;
    height: 55px;
    line-height: 55px;
    background-color: #bc2027;
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
    background-color: ` + boxScoreColor + `;
    color: #fff;
  }
  .ddh-bar-title{
    font-size: 18px;
    float: left;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    width: auto;
  }
  .ddh-bar-title>img{
    vertical-align: middle;
    margin-right: 3px;
    -ms-transform: rotate(90deg); /* IE 9 */
    -webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */
    transform: rotate(90deg);
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
    border-right: 1px solid #2c2c2c;
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
    padding: 0 10px 0 15px;
    box-sizing: border-box;
    text-decoration: none;
    color: #fff !important;
  }
  .ddh-bar-game-teams{
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 57px;
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
  .ddh-bar-nav{
    float: left;
    margin-right: 5px;
  }
  .ddh-bar-button{
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    background-color: #fff !important;
    border: none;
    color: #000 !important;
    padding: 0;
    margin: 0 3px 0 0;
    vertical-align: middle;
    cursor: pointer;
    font-size: 24px;
  }
  .ddh-bar-button>span{
    vertical-align: middle;
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

  topWin.addEventListener('resize', function(){
    var resizeBodyWidth = topWin.document.getElementsByTagName("body")[0].offsetWidth;
    var resizeContentWidth = contentEl.offsetWidth;

    //JS responsiveness for boxscores games amount
    if(resizeContentWidth < 1080 && displayNumber !== 3 && deepDiveLoaded){
      //If resize is less than 1080 and display number is not 3, reformat games
      displayNumber = 3;
      //Remove last element from index array and remove last element from html markup
      initialIndex.pop();
      clearGames();
      for(var i = 0, length = initialIndex.length; i < length; i++){
        var nodeIndex = initialIndex[i];
        var gameNode = topWin.document.createElement('li');
        gameNode.className = 'ddh-bar-game';
        gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

        var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
        schedule.appendChild(gameNode);
      }

    }else if(resizeContentWidth >= 1080 && displayNumber !== 4 && deepDiveLoaded){
      //If resize is greater than 1080 and display number is not 4, reformat games
      displayNumber = 4;
      //Add another item to index array
      var lastIndex = initialIndex[initialIndex.length - 1];
      initialIndex[initialIndex.length] = lastIndex + 1 >= dataLength ? 0 : lastIndex + 1;
      clearGames();
      for(var i = 0, length = initialIndex.length; i < length; i++){
        var nodeIndex = initialIndex[i];
        var gameNode = topWin.document.createElement('li');
        gameNode.className = 'ddh-bar-game';
        gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

        var schedule = topWin.document.getElementsByClassName('ddh-bar-schedule')[0];
        schedule.appendChild(gameNode);
      }
    }
    //If rails dont exist and body is big enough for rails, build rails
    if(!railsLoaded && (resizeBodyWidth - resizeContentWidth) >= 320){
      buildRails();
    }
    //If deep dive does not exist and body is big enough, build deep dive
    if(!deepDiveLoaded && resizeBodyWidth >= 990){
      buildDeepDive();
    }
    //Determines if deep dive hero should be shown or hidden
    if(deepDiveLoaded && deepDiveVisible && resizeContentWidth < 990){
      deepDiveHero.className = 'ddh-container';
      deepDiveVisible = false;
    }
    if(deepDiveLoaded && !deepDiveVisible && resizeContentWidth >= 990){
      deepDiveHero.className = 'ddh-container ddh-visible';
      deepDiveVisible = true;
    }
    //Determines if rails should be shown or hidden
    if(railsLoaded && railsVisible && (resizeBodyWidth - resizeContentWidth) < 320){
      railsVisible = false;
      leftRail.className = 'to-left-rail';
      rightRail.className = 'to-right-rail';
    }
    if(railsLoaded && !railsVisible && (resizeBodyWidth - resizeContentWidth) >= 320){
      railsVisible = true;
      leftRail.className = 'to-left-rail to-rail-visible';
      rightRail.className = 'to-right-rail to-rail-visible';
    }
    //If rails exist, realign
    if(railsLoaded){
      leftRail.style.left = getLeftRailPos();
      rightRail.style.left = getRightRailPos();
    }
  });

})();
