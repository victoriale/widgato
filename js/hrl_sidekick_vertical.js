ai_widget = (function() {
  var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
  var mlbDomain = "http://www.homerunloyal.com/";
  var mlbPartnerDomain = "http://www.myhomerunzone.com/";
  var referrer = document.referrer;
  if (referrer.match(/baseball/g)) {
    mlbPartnerDomain = protocolToUse + referrer.split('/')[2] + "/";
  }

  // Declare variables
  var event = '';
  var domain, remnant;
  var temp = location.search;
  var query = {};
  var target;
  var href;

  if (temp != null) {
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
    target = query.targ;

    if (remnant == 'true') {
      href = mlbDomain;
      $("base").attr("href", mlbDomain);
    } else if(referrer.match(/baseball/g)){
      $("base").attr("href", mlbPartnerDomain);
      href = mlbPartnerDomain;
    } else {
      $("base").attr("href", mlbPartnerDomain + domain + "/");
      href = mlbPartnerDomain + domain + "/";
    }

  }
  function getEnv(env) {
      if (env.match(/^localhost/) != null || env.match(/^dev/) != null) {
          env = "dev";
      } else if (env.match(/^qa/) != null) {
          env = "qa";
      } else {
          env = "prod";
      }
      return env;
  }
  function getHostName(url) {
      var locationElement = document.createElement("a");
      locationElement.href = url;
      /* Some times IE fail to populate properties of all the links while setting .href with relative URL, In this case .href will return an absolute URL which can be used on itself to populate the additional fields.*/
      if (locationElement.host == "") {
          locationElement.href = locationElement.href;
      }
      return locationElement;
  }
  function createAPIUrl(hostParameter) {
      return protocolToUse + hostParameter + "-homerunloyal-ai.synapsys.us/sidekick?scope=mlb";
  }
  function createImageUrl(hostParameter) {
      return protocolToUse + hostParameter + "-images.synapsys.us";
  }

  var hrlSidekickUrl = location != parent.location? document.referrer : document.location.href; //parent window url
  var hrlSidekickHost = getHostName(hrlSidekickUrl).hostname; //get hostname for the parent window url
  var sidekickApiHost = getEnv(hrlSidekickHost); //dev || qa || prod??

  var APIUrl = createAPIUrl(sidekickApiHost),
    AIData = {},
    gameID = -1,
    pageInd = -1,
    availPages = [],
    gameArr = [];
    //console.log(APIUrl, "HRL Sidekick api call"); // for testing purposes. will remove it in he next commit
  function getContent(event_id) {
    // Clear old data
    if (gameID != -1) {
      availPages = [];
      pageInd = -1;
      $('.aiw-title')[0].innerHTML = "Loading...";
      $('.aiw-txt')[0].innerHTML = '';
      //$('.aiw-num')[0].innerHTML = '';
      //$('.aiw-num-length')[0].innerHTML = '';
    }
    var locApiUrl = APIUrl;
    if (typeof event_id != "undefined") {
      locApiUrl += "&event=" + event_id;
      event = event_id;
    }
    $.ajax({
      url: locApiUrl,
      success: function(data) {
        AIData = data;
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
    $.map(AIData.data, function(val, index) {
      if (index != "meta-data" && index == pageID) {
        val.content = val.teaser;
        val.report = index;
        dataArr.push(val);
      }
    });
    var imageArr = [];
    // $.map(AIData.data['meta-data']['images'], function(val, index) {
    //   val.images = val;
    //   imageArr.push(val);
    // });
    for (var article in AIData.data) {
      if (AIData.data[article].image_url) {
        imageArr.push(AIData.data[article].image_url);
      }
    }
    // imageArr = imageArr[0].concat(imageArr[1]);
    var imgIndex = Math.floor(Math.random() * ((imageArr.length)));
    imgIndex = (imgIndex > -1 ? imgIndex : 0);
    var arr = {
      title: dataArr[0].title,
      url: href + 'articles/' + dataArr[0].report + '/' + dataArr[0].event_id,
      content: dataArr[0].content + '<br>&nbsp; ',
      img: imageArr[imgIndex]
    };
    var ImageUrl = createImageUrl(sidekickApiHost);
    //console.log(ImageUrl, "HRL Sidekick image call"); // for testing purposes. will remove it in he next commit
    // Set the data
    $('.aiw-title')[0].innerHTML = arr.title;
    //$('.aiw-num')[0].innerHTML = (pageInd + 1);
    //$('.aiw-num-length')[0].innerHTML = '/' + availPages.length;
    $('#ai-link').attr('href', arr.url);
    $('#ai-link').attr('target', target);
    $('.aiw-txt')[0].innerHTML = arr.content;
    $('.aiw-img').css('background-image', 'url(' + ImageUrl + arr.img + ')');
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
    var pages = [];
    for (var i = 0; i < Object.keys(AIData.data).length; i++) {
      if (pages.indexOf(Object.keys(AIData.data)[i] > -1) && Object.keys(AIData.data)[i] != "meta-data") {
        availPages.push(Object.keys(AIData.data)[i]);
      }
    }
    pageInd = 0;
    // Get game ID
    gameID = AIData.data['meta-data']['current'].event_id;
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
        gameData.home = val.home_team_abbreviation;
        gameData.away = val.away_team_abbreviation;
        gameData.fullHome = val.home_team_name;
        gameData.fullAway = val.away_team_name;
        // Event ID
        gameData.event_id = val.event_id;
        // Date
        gameData.eventDate = val.start_date_time.date;
        gameData.Time = val.start_date_time.time;
        gameData.eventTime = ' - ' + gameData.Time;
        gameArr.push(gameData);
      });
      return gameArr;
    }
    var games = AIData.data['meta-data'].games;
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
      ddStr += '<div class="dropdown-elem' + (gameArr[i].event_id == gameID ? ' active" " onclick="ai_widget.switchGame(' + i + ')"' : '" onclick="ai_widget.switchGame(' + i + ')"') + ' title="' + gameArr[i].fullAway + ' vs ' + gameArr[i].fullHome + '"><span class="left"><b>' + gameArr[i].away + '</b> vs <b>' + gameArr[i].home + '</b></span><span class="right">' + gameArr[i].eventDate + '</span></div>';
    }

    // Create
    $('.dropdown')[0].innerHTML = ddStr;
  } // --> createDropdown
  // Show the current game's teams in the header
  function showGame() {
    // Loop through the games to find the current one
    for (var i = 0; i < gameArr.length; i++) {
      if (gameArr[i].event_id == gameID) {
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
    gameID = gameArr[parseInt(gameNum)].event_id;
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
