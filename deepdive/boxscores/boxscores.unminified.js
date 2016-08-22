(function(){
  var topWin = window;
  try {
    while(topWin !== top){
      topWin = topWin.parent;
    }
  }catch(e){
    console.error("boxscores - couldn/'t access the top window");
  }

  //Grab domain name to know where to point
  var wLocation = topWin.location;
  var domain = wLocation.hostname.replace(/www./, '');
  if(domain === 'myhomerunzone.com' || domain === 'dev.myhomerunzone.com' || domain === 'qa.myhomerunzone.com'){
    var partnerDomainArr = wLocation.pathname.split('/');
    var partnerDomain = partnerDomainArr[1];
    domain += '/' + partnerDomain;
  }

  var embedURL = 'http://w1.synapsys.us/widgets/deepdive/boxscores/boxscores.js'; //Source of embed
  var parentNodeWidth; //width of container
  var displayNumber; //number of games to display
  var initialIndex = [], dataLength, processedData; //Variables for game data
  var protocol = (location.protocol) === 'https:' ? 'https' : 'http';
  var boxscoresLoaded = false; //Boolean if boxscores has loaded
  var parentNode; //Parent node of script tag

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
                  <a href="http://` + domain + `/articles/pregame-report/` + item.gameInfo.eventId + `" class="boxscores-e-game-link">
                    <ul class="boxscores-e-game-teams">
                      <li>
                        ` + item.homeTeamInfo.abbreviation + `
                        <span class="boxscores-e-game-teamscore">
                          -
                        </span>
                      </li>
                      <li>
                        ` + item.awayTeamInfo.abbreviation + `
                        <span class="boxscores-e-game-teamscore">
                          -
                        </span>
                      </li>
                    </ul>
                    <span class="boxscores-e-game-time">
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
                var link = 'http://' + domain + '/articles/pregame-report/' + item.gameInfo.eventId;
              }else if(item.gameInfo.inningsPlayed > 3 && item.gameInfo.inningsPlayed <= 5){
                var link = 'http://' + domain + '/articles/third-inning-report/' + item.gameInfo.eventId;
              }else if(item.gameInfo.inningsPlayed > 5 && item.gameInfo.inningsPlayed <= 7){
                var link = 'http://' + domain + '/articles/fifth-inning-report/' + item.gameInfo.eventId;
              }else if(item.gameInfo.inningsPlayed > 7){
                var link = 'http://' + domain + '/articles/seventh-inning-report/' + item.gameInfo.eventId;
              }
              //Determine what inning arrow to display
              var inningMarkup;
              if(item.gameInfo.inningHalf === 'top'){
                inningMarkup = '<span class="boxscores-e-game-inning-top"></span>';
              }else if(item.gameInfo.inningHalf === 'bottom'){
                inningMarkup = '<span class="boxscores-e-game-inning-bottom"></span>';
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
                  <a href="` + link + `" class="boxscores-e-game-link">
                    <ul class="boxscores-e-game-teams">
                      <li>
                        ` + item.awayTeamInfo.abbreviation + `
                        <span class="boxscores-e-game-teamscore">
                          ` + item.awayTeamInfo.score + `
                        </span>
                      </li>
                      <li>
                        ` + item.homeTeamInfo.abbreviation + `
                        <span class="boxscores-e-game-teamscore">
                          ` + item.homeTeamInfo.score + `
                        </span>
                      </li>
                    </ul>
                    <span class="boxscores-e-game-time">
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
                <a ="_blank" href="http://` + domain + `/articles/postgame-report/` + item.gameInfo.eventId + `" class="boxscores-e-game-link">
                  <ul class="boxscores-e-game-teams">
                    <li>
                      ` + item.homeTeamInfo.abbreviation + `
                      <span class="boxscores-e-game-teamscore">
                        ` + (item.homeTeamInfo.score || '-') + `
                      </span>
                    </li>
                    <li>
                      ` + item.awayTeamInfo.abbreviation + `
                      <span class="boxscores-e-game-teamscore">
                        ` + (item.awayTeamInfo.score || '-') + `
                      </span>
                    </li>
                  </ul>
                  <span class="boxscores-e-game-time">
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
    var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
    while(schedule.hasChildNodes()){
      schedule.removeChild(schedule.firstChild);
    }
  }

  var buildBoxscores = function(){
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

        /**
         * Build Out Main HTML
         */
        boxscoresContainer.innerHTML = `
          <div class="boxscores-e-title">
            TODAY'S MLB GAMES
          </div>

          <ul class="boxscores-e-schedule"></ul>

          <div class="boxscores-e-nav">
            <button class="boxscores-e-nav-button boxscores-e-prev">
              <span class="ddh-icon-angle-left"></span>
            </button>
            <button class="boxscores-e-nav-button boxscores-e-next">
              <span class="ddh-icon-angle-right"></span>
            </button>
          </div>
        `;
        var currentScript = document.currentScript || (function() {
            var scripts = document.getElementsByTagName("script");
            for (var i = scripts.length - 1; i >= 0; i--) {
               if (scripts[i].src.indexOf(embedURL) != -1) {
                  return scripts[i];
               }
            }
         })();
         parentNode = currentScript.parentNode;
         //Inject HTML
         parentNode.insertBefore(boxscoresContainer, currentScript);
         /**
          * End Build Main HTML
          */

        //Calculate parentNodeWith to determine amount of games to display
        parentNodeWidth = parentNode.offsetWidth;
        if(parentNodeWidth >= 1340){
          displayNumber = 5;
        }else if(parentNodeWidth >= 1180){
          displayNumber = 4;
        }else if(parentNodeWidth >= 990){
          displayNumber = 3;
        }else if(parentNodeWidth >= 640){
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
          var gameNode = document.createElement('li');
          gameNode.className = 'boxscores-e-game';
          gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

          var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
          schedule.appendChild(gameNode);
        }

        //Listen for next button click
        var nextButton = document.getElementsByClassName('boxscores-e-nav-button boxscores-e-next')[0];
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
          }

        });

        //Listen for previous button click
        var prevButton = document.getElementsByClassName('boxscores-e-nav-button boxscores-e-prev')[0];
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
          }

        });

      }
    };
    xhttp.open('GET', protocol + '://prod-homerunloyal-api.synapsys.us/league/boxScores/' + dateInput , true);
    xhttp.send();

    boxscoresLoaded = true;
  }

  //Build base tag
  var baseEl = document.createElement('base');
  baseEl.target = '_parent';
  document.head.appendChild(baseEl);
  //Build and load font
  var fontEl = document.createElement('link');
  fontEl.rel = 'stylesheet';
  fontEl.type = 'text/css';
  fontEl.dataset.resource_from = 'boxscores-embed';
  fontEl.href = 'https://fonts.googleapis.com/css?family=Lato:300,400';
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
    .boxscores-e-bar{
      width: 100%;
      min-width: 640px;
      height: 50px;
      line-height: 50px;
      background-color: #004e87;
      color: #fff;
      font-family: Lato;
      overflow: hidden;
    }
    .boxscores-e-title{
      font-size: 18px;
      float: left;
      padding: 0 10px;
      box-sizing: border-box;
      line-height: 50px;
    }
    .boxscores-e-schedule{
      list-style-type: none;
      float: left;
      margin: 0 5px 0 0;
      padding: 0;
      height: 100%;
    }
    .boxscores-e-game{
      display: inline-block;
      width: 166px;
      height: 50px;
      border-right: 1px solid #2c2c2c;
      box-sizing: border-box;
      overflow: hidden;
    }
    .boxscores-e-game:last-child{
      border-right: none;
    }
    .boxscores-e-game-link{
      display: block;
      width: 100%;
      height: 100%;
      padding: 0 10px 0 15px;
      box-sizing: border-box;
      text-decoration: none;
      color: #fff;
    }
    .boxscores-e-game-link:hover{
      color: #fff;
    }
    .boxscores-e-game-teams{
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 57px;
      line-height: normal;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      margin-top: 8px;
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
    .boxscores-e-nav{
      float: left;
      margin-right: 5px;
      line-height: 50px;
    }
    .boxscores-e-nav-button{
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background-color: #fff;
      color: #000;
      border: none;
      margin: 0 3px 0 0;
      vertical-align: middle;
      cursor: pointer;
      font-size: 24px;
      padding: 0;
    }
    .boxscores-e-nav-button>span{
      vertical-align: middle;
      margin-top: 1px;
      display: inline-block;
    }
    .boxscores-e-nav-button:focus{
      outline: none;
    }
  `;
  document.head.appendChild(styleEl);

  var boxscoresContainer = document.createElement('section');
  boxscoresContainer.className = 'boxscores-e-bar';

  buildBoxscores();

  window.addEventListener('resize', function(){
    parentNodeWidth = parentNode.offsetWidth;
    //console.log('resize', parentNodeWidth);
    //Resizing functions
    if(boxscoresLoaded){

      if(parentNodeWidth >= 1170 && displayNumber !== 5){
        displayNumber = 5;
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
          }

        }else{
          //Remove items from array
          //Since this is the max, this case will never be hit
        }

      }else if(parentNodeWidth < 1170 && parentNodeWidth >= 1010 && displayNumber !== 4){
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
          }

        }

      }else if(parentNodeWidth < 1010 && parentNodeWidth >= 820 && displayNumber !== 3){
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
          }

        }

      }else if(parentNodeWidth < 820 && parentNodeWidth >= 640 && displayNumber !== 2){
        displayNumber = 2;
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
            var gameNode = document.createElement('li');
            gameNode.className = 'boxscores-e-game';
            gameNode.innerHTML = processedData[nodeIndex].htmlMarkup;

            var schedule = document.getElementsByClassName('boxscores-e-schedule')[0];
            schedule.appendChild(gameNode);
          }

        }

      }

    }
  })

})();
