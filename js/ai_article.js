ai_widget = (function(){
  // Declare variables
  var APIUrl = 'http://prod-sports-ai.synapsys.us/HoopsLoyal/API_AI_SPO_NBA_Matchup_Mag_000006.php?call=widget',
          AIData = {},
          gameID = -1,
          pageInd = -1,
          availPages = [],
          gameArr = [],
          pages = ['pregame_report', 'postgame_report', 'about_the_teams', 'historical_team_stats', 'last_matchup', 'player_comparison_power_forwards', 'player_comparison_small_forwards', 'player_comparison_shooting_guards', 'player_comparison_point_guards', 'player_comparison_centers', 'home_team_starting_roster', 'away_team_starting_roster', 'home_team_injury_report', 'away_team_injury_report', 'upcoming'],
          transArr = {
            'pregame_report': 'pregame',
          'postgame_report': 'postgame',
          'about_the_teams': 'about',
          'historical_team_stats': 'history',
          'last_matchup': 'lastmatch',
          'player_comparison_centers': 'centers',
          'player_comparison_power_forwards': 'powerforwards',
          'player_comparison_point_guards': 'pointguards',
          'player_comparison_small_forwards': 'smallforwards',
          'player_comparison_shooting_guards': 'shootingguards',
          'home_team_starting_roster': 'homeroster',
          'away_team_starting_roster': 'awayroster',
          'home_team_injury_report': 'homeinjury',
          'away_team_injury_report': 'awayinjury',
          'upcoming': 'upcoming',
          };

function getContent(eventId) {
  // Clear old data
  if ( gameID != -1 ) {
    availPages = [];
    pageInd = -1;
    $('.aiw-title')[0].innerHTML = "Loading...";
    $('.aiw-txt')[0].innerHTML = '';
    $('.aiw-num')[0].innerHTML = '';
  }

  var locApiUrl = APIUrl;
  if ( typeof eventId != "undefined" ) {
    locApiUrl += "&event=" + eventId;
  }
  $.ajax({
    url: locApiUrl,
    success: function(data) {
      AIData = JSON.parse(data);
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
  if ( pageInd == -1 || gameID == -1 || typeof availPages[pageInd] == "undefined" ) {
    return console.log('Invalid page or game ID', pageInd, gameID);
  }

  // Get the data
  var pageID = availPages[pageInd];
  var data = $('<div>' + AIData[pageID].text + '</div>');
  var images = $(AIData.meta_data.text).find('.currentGameImages .image');
  var arr = {
    title: data.find('.widget_title')[0].innerHTML,
    number: (pageInd + 1) + '/' + availPages.length,
    url: 'article/' + transArr[pageID] + '/' + gameID,
    content: data.find('.article')[0].innerHTML.replace(/(<br>)+/g,' <br>&nbsp; '),
    img: images[pageInd % images.length].innerHTML // .replace('sports-images.synapsys.us:99', 'prod-sports-images.synapsys.us')
  };

  // Set the data
  $('.aiw-title')[0].innerHTML = arr.title;
  $('.aiw-num')[0].innerHTML = arr.number;
  $('#ai-link').attr('href', arr.url);
  $('.aiw-txt')[0].innerHTML = arr.content;
  $('.aiw-img').css('background-image', 'url(' + arr.img + ')');
      $('.aiw-ad')[0].innerHTML = arr.title + ' presented by:';
      fitText();
      } // --> displayPage
      function fitText() {
        var textDiv = $('.aiw-txt');
        if ( textDiv[0].scrollHeight > textDiv[0].clientHeight ) {
          var original = textDiv[0].innerHTML.substring(0, 400),
    index = 0;
  while ( index < 500 && textDiv[0].scrollHeight > textDiv[0].clientHeight ) {
    index++;
    original = original.substring(0, original.lastIndexOf(" "));
    textDiv[0].innerHTML = original + '...';
  }
        }
      } // --> fitText
      function nextPage() {
        // Exit if no pages
        if ( pageInd == -1 || availPages.length == 0 ) {
          return false;
        }

        // Create new pageInd
        pageInd++;
        if ( pageInd >= availPages.length ) {
          pageInd = 0;
        }

        // Create page
        displayPage();
      } // --> npextPage
function prevPage() {
  // Exit if no pages
  if ( pageInd == -1 || availPages.length == 0 ) {
    return false;
  }

  // Create new pageInd
  pageInd--;
  if ( pageInd <= -1 ) {
    pageInd = availPages.length - 1;
  }

  // Create page
  displayPage();
} // --> prevPage

// **** PARSING FUNCTION ****

function processData() {
  // Check for data
  if ( typeof AIData != "object" ) {
    return displayError('Invalid YSEOP Response');
  }

  // Get all the pages
  for ( var i = 0; i < pages.length; i++ ) {
    if ( AIData.hasOwnProperty(pages[i]) ) {
      availPages.push(pages[i]);
    }
  }
  pageInd = 0;

  // Get game ID
  gameID = $(AIData.meta_data.text).find('.currentGame .eventId')[0].innerHTML;

  if ( gameArr.length == 0 ) {
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
  var parseGame = function() {
    var gameData = {};
    // Team names
    $(this).find('.moduleTeam').each(function(){
      if ( typeof gameData.home == "undefined" ) {
        gameData.home = this.innerHTML;
      } else {
        gameData.away = this.innerHTML;
      }
    });
    // Event ID
    gameData.eventId = $(this).find('.eventId')[0].innerHTML;
    // Date
    gameData.eventDate = $(this).find('.moduleDate')[0].innerHTML;

    gameArr.push(gameData);
  }

  // Create Jquery object
  var games = $('<div>' + AIData.meta_data.text + '</div>').find('.nextNbaGames');
  // Save all the games
  games.find('.game').each(parseGame);

  // Display the current game
  showGame();
} // --> parseGames
// Creates the dropdown
function createDropdown() {
  var ddStr = '';
  for ( var i = 0; i < gameArr.length; i++ ) {
    if ( i > 0 ) {
      ddStr += '<div class="divider"></div>';
    }
    ddStr += '<div class="dropdown-elem' + (gameArr[i].eventId == gameID ? ' active"' : '" onclick="ai_widget.switchGame(' + i + ')"') + '"><span class="left"><b>' + gameArr[i].away + '</b> vs. <b>' + gameArr[i].home + '</b></span><span class="right">' + gameArr[i].eventDate + '</span></div>';
  }

  // Create
  $('.dropdown')[0].innerHTML = ddStr;
} // --> createDropdown
// Show the current game's teams in the header
function showGame() {
  // Loop through the games to find the current one
  for ( var i = 0; i < gameArr.length; i++ ) {
    if ( gameArr[i].eventId == gameID ) {
      $('.home.team')[0].innerHTML = gameArr[i].home;
      $('.away.team')[0].innerHTML = gameArr[i].away;
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
  if ( aiwImg.hasClass('active') ) {
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
