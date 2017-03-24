ai_widget = (function() {
  // Declare variables
  var temp = location.search;
  var query = {};
  var scope;
  var target;
  if (temp != null) {
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    scope = query.category;
    if (scope == "ncaad1") {
      scope = "ncaa";
    }
    target = query.targ;
  } else {
    scope = 'nba';
  }
  var APIUrl = 'http://prod-sports-ai.synapsys.us/sidekick?scope=' + scope,
    AIData = {},
    gameID = -1,
    pageInd = -1,
    availPages = [],
    gameArr = [],
    pages = ['pregame_report', 'in_game_report', 'postgame_report', 'about_the_teams', 'historical_team_statistics', 'last_matchup', 'center_player_comparison', 'guards1_player_comparison', 'guards2_player_comparison', 'power_forward_player_comparison', 'point_guard_player_comparison', 'forwards1_player_comparison', 'forwards2_player_comparison', 'scorers_player_comparison', 'assisters_player_comparison', 'three_point_player_comparison', 'rebounders_player_comparison', 'stealers_player_comparison', 'power_forward_player_comparison', 'small_forward_player_comparison', 'shooting_guard_player_comparison', 'point_guard_player_comparison', 'center_player_comparison', 'starting_roster_home', 'starting_roster_away', 'home_team_injury_report', 'injuries_away', 'upcoming_games'],
    transArr = {
      'pregame_report': 'pregame-report',
      'in_game_report': 'in-game-report',
      'postgame_report': 'postgame-report',
      'about_the_teams': 'about-the-teams',
      'historical_team_statistics': 'historical-team-statistics',
      'last_matchup': 'last-matchup',
      'center_player_comparison': 'center-player-comparison',
      'forwards1_player_comparison': 'forwards1-player-comparison',
      'guards1_player_comparison': 'guards1-player-comparison',
      'forwards2_player_comparison': 'forwards2-player-comparison',
      'guards2_player_comparison': 'guards2-player-comparison',
      'scorers_player_comparison': 'scorers-player-comparison',
      'assisters_player_comparison': 'assisters-player-comparison',
      'three_point_player_comparison': 'three-point-player-comparison',
      'rebounders_player_comparison': 'rebounders-player-comparison',
      'stealers_player_comparison': 'stealers-player-comparison',
      'center_player_comparison': 'center-player-comparison',
      'power_forward_player_comparison': 'power-forward-player-comparison',
      'point_guard_player_comparison': 'point-guard-player-comparison',
      'small_forward_player_comparison': 'small-forward-player-comparison',
      'shooting_guard_player_comparison': 'shooting-guard-player-comparison',
      'starting_roster_home': 'starting-roster-home',
      'starting_roster_away': 'starting-roster-away',
      'injuries_home': 'injuries-home',
      'injuries_away': 'injuries-away',
      'upcoming_games': 'upcoming-games',
    };
  function getContent(eventId) {
    // Clear old data
    if (gameID != -1) {
      availPages = [];
      pageInd = -1;
      $('.aiw-title')[0].innerHTML = "Loading...";
      $('.aiw-txt')[0].innerHTML = '';
      $('.aiw-num')[0].innerHTML = '';
    }
    var locApiUrl = APIUrl;
    if (typeof eventId != "undefined") {
      locApiUrl += "&event=" + eventId;
    }
    $.ajax({
      url: locApiUrl,
      success: function(data) {
        var newArray = [data.data['meta-data']];
        for (var key in data.data) {
          if (data.data[key].scope) {
            newArray.push(data.data[key]);
            data.data[key].id = key.replace(/-/g,"_");
          }
        }
        AIData = newArray;
        processData();
      },
      error: function(jqXHR, status, error) {
        console.log(jqXHR, status, error);
        displayError('Error Loading Sports API: ' + status);
      },
      dataType: 'json'
    });
  } // --> getContent
  function displayError(errorMsg) {
    $('.aiw-txt')[0].innerHTML = errorMsg;
  } // --> displayError
  function getData() {
    return AIData;
  } // --> getData
  function displayPage() {
    // Check for data
    if (pageInd == -1 || gameID == -1 || typeof availPages[pageInd] == "undefined") {
      return console.log('Invalid page or game ID', pageInd, gameID);
    }
    // Get the data
    var pageID = availPages[pageInd];
    var content = [];
    var dataArr = [];
    var imageArr = [];
    $.map(AIData, function(val, index) {
      if (val.id == pageID) {
        content.title = val.id.replace(/_/g," ").replace(/\b\w/g, l => l.toUpperCase());
        content.content = val.teaser;
        content.images = val['carousel'];
        dataArr.push(content);
        imageArr.push("http://prod-sports-images.synapsys.us" + val.image_url);
      }
    });
    if (imageArr.length < 1) {
      imageArr = ['http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_1.png',
        'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_2.png',
        'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_3.png',
        'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_4.png',
        'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_5.png',
      ];
    }
    var imgIndex = Math.floor(Math.random() * ((imageArr.length)));
    imgIndex = (imgIndex > -1 ? imgIndex : 0);
    var arr = {
      title: dataArr[0].title,
      number: (pageInd + 1) + '/' + availPages.length,
      url: scope + '/articles/' + transArr[pageID] + '/' + gameID,
      content: dataArr[0].content + '<br>&nbsp; ',
      img: imageArr[imgIndex]
    };
    // Set the data
    $('.aiw-title')[0].innerHTML = arr.title;
    $('.aiw-num')[0].innerHTML = arr.number;
    $('#ai-link').attr('href', arr.url);
    $('#ai-link').attr('target', target);
    $('.aiw-txt')[0].innerHTML = arr.content;
    $('.aiw-img').css('background-image', 'url(' + arr.img + ')');
    $('.aiw-ad')[0].innerHTML = arr.title + ' presented by:';
    fitText();
  } // --> displayPage
  function fitText() {
    var textDiv = $('.aiw-txt');
    if (textDiv[0].scrollHeight > textDiv[0].clientHeight) {
      var original = textDiv[0].innerHTML.substring(0, 400),
        index = 0;
      while (index < 500 && textDiv[0].scrollHeight > textDiv[0].clientHeight) {
        index++;
        original = original.substring(0, original.lastIndexOf(" "));
        textDiv[0].innerHTML = original + '...';
      }
    }
  } // --> fitText
  function nextPage() {
    // Exit if no pages
    if (pageInd == -1 || availPages.length == 0) {
      return false;
    }
    // Create new pageInd
    pageInd++;
    if (pageInd >= availPages.length) {
      pageInd = 0;
    }
    // Create page
    displayPage();
  } // --> npextPage
  function prevPage() {
    // Exit if no pages
    if (pageInd == -1 || availPages.length == 0) {
      return false;
    }
    // Create new pageInd
    pageInd--;
    if (pageInd <= -1) {
      pageInd = availPages.length - 1;
    }
    // Create page
    displayPage();
  } // --> prevPage
  // **** PARSING FUNCTION ****
  function processData() {
    // Check for data
    if (typeof AIData != "object") {
      return displayError('Invalid YSEOP Response');
    }
    // Get all the pages
    for (var i = 0; i < AIData.length; i++) {
      if (pages.indexOf(AIData[i].id) > -1) {
        availPages.push(AIData[i].id);
      }
    }
    pageInd = 0;
    // Get game ID
    gameID = AIData[0].current.event_id;
    if (gameArr.length == 0) {
      parseGames();
    }
    // Display first data
    displayPage();
  } // --> processData
  // Parse the games into an array
  function parseGames() {
    // Array of games
    gameArr = [];
    // Function for the parser
    var parseGame = function(games) {
        // Team names
        $.map(games, function(val, index) {
          var gameData = {};
          gameData.home = val.home_abbreviation;
          gameData.away = val.away_abbreviation;
          gameData.fullHome = val.home_team_name;
          gameData.fullAway = val.away_team_name;
          // Event ID
          gameData.eventId = val.event_id;
          // Date
          gameData.eventDate = val.start_date_time.date;
          //due to a '-' in the eventDate the position of the date and Time will be [0] and [2]
          gameData.date = gameData.eventDate.split(' ')[0].split('/');
          //get rid of extra 0 in date month
          if (Number(gameData.date[0]) < 10) {
            gameData.date[0] = gameData.date[0].slice(1, 2);
          }
          //get rid of the 20 in 20XX year
          gameData.date[2] = gameData.date[2].slice(2, 4);
          gameData.date = gameData.date.join('/');
          //convert hours to get rid of 0 in 09:XX AM/PM
          // gameData.Time = gameData.eventDate.split(' ')[2].split(':');
          // if (Number(gameData.Time[0]) < 10) {
          //   gameData.Time[0] = gameData.Time[0].slice(1, 2);
          // }
          gameData.Time = val.start_date_time.time;
          gameData.meridian = gameData.eventDate.split(' ')[3];
          //rejoin gameData.eventDate to one single use
          gameData.eventDate = gameData.date + ' - ' + gameData.Time;
          gameData.eventTime = ' - ' + gameData.Time + ' EST';
          gameArr.push(gameData);
        });
        return gameArr;
      }
      // Create Jquery object
    var games = AIData[0].games;
    // Save all the games
    gameArr = parseGame(games);
    // Display the current game
    showGame();
  } // --> parseGames
  // Creates the dropdown
  function createDropdown() {
    var ddStr = '';
    for (var i = 0; i < gameArr.length; i++) {
      if (i > 0) {
        ddStr += '<div class="divider"></div>';
      } else {
        ddStr += '<div class="text-snippet">All times are in Eastern Time</div>';
      }
      ddStr += '<div class="dropdown-elem' + (gameArr[i].eventId == gameID ? ' active" " onclick="ai_widget.switchGame(' + i + ')"' : '" onclick="ai_widget.switchGame(' + i + ')"') + ' title="' + gameArr[i].fullAway + ' vs ' + gameArr[i].fullHome + '"><span class="left"><b>' + gameArr[i].away + '</b> vs <b>' + gameArr[i].home + '</b></span><span class="right">' + gameArr[i].eventDate + '</span></div>';
    }

    // Create
    $('.dropdown')[0].innerHTML = ddStr;
  } // --> createDropdown
  // Show the current game's teams in the header
  function showGame() {
    // Loop through the games to find the current one
    for (var i = 0; i < gameArr.length; i++) {
      if (gameArr[i].eventId == gameID) {
        $('.home.team')[0].innerHTML = gameArr[i].home;
        $('.away.team')[0].innerHTML = gameArr[i].away;
        $('.header-right.team')[0].innerHTML = gameArr[i].eventTime;
      }
    }
    // Create dropdown
    createDropdown();
  } // --> showGame
  // Switches the game
  function switchGame(gameNum) {
    gameID = gameArr[parseInt(gameNum)].eventId;
    toggleDropDown();
    getContent(gameID);
    showGame();
  } // --> switchGame
  // Toggle the dropdown
  function toggleDropDown() {
    var aiwImg = $('.aiw-img');
    if (aiwImg.hasClass('active')) {
      aiwImg.removeClass('active');
      aiwImg.find('.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
    } else {
      aiwImg.addClass('active');
      aiwImg.find('.fa').addClass('fa-caret-up').removeClass('fa-caret-down');
    }
  } // --> toggleDropDown
  getContent();
  return {
    getData: getData,
    nextPage: nextPage,
    prevPage: prevPage,
    toggleDropDown: toggleDropDown,
    switchGame: switchGame
  };
})();
$(function() {
  var domain, remnant;
  var temp = location.search;
  var query = {};
  if (temp != null) {
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    var remLink = "http://" + ((typeof(query.subd) == 'undefined' || !query.subd || query.subd == '' || query.subd == null) ? 'hoopsloyal.com' : query.subd);
    var partLink = "http://" + ((typeof(query.subd) == 'undefined' || !query.subd || query.subd == '' || query.subd == null) ? ('myhoopszone.com/' + query.dom) : query.subd);
    //set the query data from database to global variable to use
    domain = query.dom;
    remnant = query.remn;
    if (remnant == 'true') {
      $("base").attr("href", remLink);
    } else {
      $("base").attr("href", partLink + "/");
    }
  }
});
