ai_billboard = (function() {
  var domain, remnant;
  var remLink = "http://dev.homerunloyal.com/";
  var partLink = "http://dev.homerunzone.com/";
  var temp = location.search;
  var href;
  var query = {};
  if (temp != null) {
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    domain = query.dom;
    remnant = query.remn;
    if (remnant == 'true') {
      href = remLink;
      $("base").attr("href", remLink);
    } else {
      $("base").attr("href", partLink + domain + "/");
      href = partLink + domain + "/";
    }
  }
  var teamId = query.team;
  var APIUrl = 'http://dev-homerunloyal-ai.synapsys.us/billboard/' + teamId;
  var randomArticles = [];
  var teamData = [];
  var imageArr = [];
  var leftRgb;
  var rightRgb;
  var red;
  var green;
  var blue;

  function getContent(eventId) {
    var locApiUrl = APIUrl;
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
  function displayMainArticles() {
    $.map(AIData['meta-data']['nextGame']['images'], function(val, index) {
      val.images = val;
      imageArr.push(val);
    });
    imageArr = imageArr[0].concat(imageArr[1]);
    var mainArticles = [];
    var subArticles = [];
    $.map(AIData, function(val, index) {
      if (index != 'meta-data') {
        if (index == 'about-the-teams' || index == 'pregame-report') {
          if (index == 'pregame-report') {
            val.lastGame = val.lastGame;
          }
          val.title = val.displayHeadline;
          val.content = val['article'][0];
          val.urlSegment = index;
        } else {
          val.title = val.displayHeadline;
          val.content = val['article'][0];
          val.urlSegment = index;
          subArticles.push(val);
        }
        mainArticles.push(val);
      } else {
        teamData.push(val);
      }
    });
    $.map(AIData['meta-data'], function(val, index) {
      teamData.push(val);
    });
    subArticles.sort(function() {
      return 0.5 - Math.random()
    });
    randomArticles = subArticles;
    var arr1 = {
      title: mainArticles[0].title,
      content: mainArticles[0].content + '<br>&nbsp; ',
      lastGame: mainArticles[0].lastGame,
      url: href + 'articles/' + mainArticles[0].urlSegment + '/' + teamData[1].eventId
    };
    var arr2 = {
      title: mainArticles[1].title,
      content: mainArticles[1].content + '<br>&nbsp; ',
      url: href + 'articles/' + mainArticles[1].urlSegment + '/' + teamData[1].eventId
    };
    leftRgb = teamData[1].awayTeamColors.split(', ')[0];
    rightRgb = teamData[1].homeTeamColors.split(', ')[0];
    getGradient(leftRgb, rightRgb);
    var homeTeamLinkName = teamData[1].homeTeamName;
    var awayTeamLinkName = teamData[1].awayTeamName;
    var homeLastName = (teamData[1].homeLastName.toLowerCase() == "diamondbacks") ? "D'backs" : teamData[1].homeLastName;
    var awayLastName = (teamData[1].awayLastName.toLowerCase() == "diamondbacks") ? "D'backs" : teamData[1].awayLastName;
    $('.header-teams')[0].innerHTML = awayLastName + ' vs ' + homeLastName + ":";
    $('.header-date')[0].innerHTML = teamData[1].gameFlag + " Game - " + teamData[1].startDateLong;
    $('#main-top-link').attr('href', arr1.url);
    $('.main-top-title')[0].innerHTML = arr1.title;
    $('.main-top-description')[0].innerHTML = arr1.content;
    $('.main-top-event-data')[0].innerHTML = arr1.lastGame;
    $('.main-top-image').css('background-image', 'url(' + imageArr[0] + ')');
    $('#main-bottom-link').attr('href', arr2.url);
    $('.main-bottom-title')[0].innerHTML = arr2.title;
    $('.main-bottom-description')[0].innerHTML = arr2.content;
    $('.main-bottom-event-data')[0].innerHTML = arr1.lastGame;
    $('.main-bottom-image').css('background-image', 'url(' + imageArr[1] + ')');
    $('#left-team-link').attr('href', href + 'team/' + toKebabCase(awayTeamLinkName) + '/' + teamData[1].awayTeamId);
    $('#left-team-link-small').attr('href', href + 'team/' + toKebabCase(awayTeamLinkName) + '/' + teamData[1].awayTeamId);
    $('.news-profile-image-left').css('background-image', 'url(' + teamData[1].awayTeamLogo + ')');
    $('.news-profile-team1')[0].innerHTML = awayLastName;
    $('.news-profile-record1')[0].innerHTML = teamData[1].awayWins + '-' + teamData[1].awayLosses;
    $('.news-profile-team1')[1].innerHTML = awayLastName;
    $('.news-profile-record1')[1].innerHTML = teamData[1].awayWins + '-' + teamData[1].awayLosses;
    $('#right-team-link').attr('href', href + 'team/' + toKebabCase(homeTeamLinkName) + '/' + teamData[1].homeTeamId);
    $('#right-team-link-small').attr('href', href + 'team/' + toKebabCase(homeTeamLinkName) + '/' + teamData[1].homeTeamId);
    $('.news-profile-image-right').css('background-image', 'url(' + teamData[1].homeTeamLogo + ')');
    $('.news-profile-team2')[0].innerHTML = homeLastName;
    $('.news-profile-team2')[1].innerHTML = homeLastName;
    $('.news-profile-record2')[0].innerHTML = teamData[1].homeWins + '-' + teamData[1].homeLosses;
    $('.news-profile-record2')[1].innerHTML = teamData[1].homeWins + '-' + teamData[1].homeLosses;
    displaySubArticles();
    fitText();
  } // --> displayPage

  function toKebabCase(str) {
    str = str.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[\.,']/g, '');
    return str;
  }

  function getGradient(homeHex, awayHex) {
    if (homeHex != null && awayHex != null) {
      var homeRedValue = hexToR(homeHex);
      var homeGreenValue = hexToG(homeHex);
      var homeBlueValue = hexToB(homeHex);
      var leftGradientRgba = "rgba(" + homeRedValue + "," + homeGreenValue + "," + homeBlueValue + ", 1)";
      var awayRedValue = hexToR(awayHex);
      var awayGreenValue = hexToG(awayHex);
      var awayBlueValue = hexToB(awayHex);
      var rightGradientRgba = "rgba(" + awayRedValue + "," + awayGreenValue + "," + awayBlueValue + ", 1)";
      var gradient = fullGradient(leftGradientRgba, rightGradientRgba);
      $('.news-profile').css(gradient);
    } else {
      defaultGradient = 'default-gradient';
    }
  }
  //converts hex to RGB
  function hexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
  }

  function hexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
  }

  function hexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
  }

  function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
  }

  function fullGradient(a, b) {
    var lgc = a;
    var rgc = b;
    return {
      '-ms-filter': "progid:DXImageTransform.Microsoft.gradient (0deg," + lgc + ',' + rgc + ")",
      'background': "linear-gradient(90deg," + lgc + ',' + rgc + ")"
    };
  };

  function displaySubArticles() {
    for (var i = 0; i < randomArticles.length; i++) {
      var subContainer = document.createElement('div');
      var subImage = document.createElement('img');
      var subTitle = document.createElement('div');
      var subDate = document.createElement('div');
      var subHr = document.createElement('div');
      var subContainerSmall = document.createElement('div');
      var subImageSmall = document.createElement('img');
      var subTitleSmall = document.createElement('div');
      var subDateSmall = document.createElement('div');
      var subHrSmall = document.createElement('div');
      var subShareContainerSmall = document.createElement('div');
      var subShareSmall = document.createElement('i');
      var subShareContainer = document.createElement('div');
      var subShare = document.createElement('i');
      subContainer.className = 'news-container';
      subImage.className = 'news-image overlay red';
      subTitle.className = 'news-title';
      subDate.className = 'news-time'
      subHr.className = 'news-hr';
      subContainerSmall.className = 'news-container';
      subImageSmall.className = 'news-image';
      subTitleSmall.className = 'news-title';
      subDateSmall.className = 'news-time'
      subHrSmall.className = 'news-hr';
      subShareContainer.className = 'news-share-container';
      subShareContainerSmall.className = 'news-share-container';
      subShare.className = 'fa fa-share news-share';
      subShareSmall.className = 'fa fa-share news-share';
      $('.news-updates')[0].appendChild(subContainer);
      subContainer.appendChild(subImage);
      subContainer.appendChild(subShareContainer);
      subShareContainer.appendChild(subShare);
      subContainer.appendChild(subTitle);
      subDate.innerHTML = randomArticles[i].dateline;
      subDateSmall.innerHTML = randomArticles[i].dateline
      subContainer.appendChild(subDate);
      subTitle.innerHTML = randomArticles[i].title;
      $('.news-updates-small')[0].appendChild(subContainerSmall);
      subImageSmall.src = imageArr[i + 2];
      subImage.src = imageArr[i + 2];
      subContainerSmall.appendChild(subImageSmall);
      subContainerSmall.appendChild(subShareContainerSmall);
      subShareContainerSmall.appendChild(subShareSmall);
      subContainerSmall.appendChild(subTitleSmall);
      subContainerSmall.appendChild(subDateSmall);
      subContainerSmall.appendChild(subHrSmall);
      $(subContainer).wrapInner($('<a href="' + href + 'articles/' + randomArticles[i].urlSegment + teamData[1].eventId + '" />'));
      $(subContainerSmall).wrapInner($('<a href="' + href + 'articles/' + randomArticles[i].urlSegment + teamData[1].eventId + '" />'));
      subTitleSmall.innerHTML = randomArticles[i].title;
      subContainer.appendChild(subHr);
      if (randomArticles[i].title.length <= 36) {
        $(subHrSmall).css({"padding-top":"25px"});
      }
    }
  }

  function fitText() {
    var textDiv1 = $('.main-top-description');
    if (textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
      var original = textDiv1[0].innerHTML.substring(0, 400),
        index = 0;
      while (index < 500 && textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
        index++;
        original = original.substring(0, original.lastIndexOf(" "));
        textDiv1[0].innerHTML = original + '...';
      }
    }
    var textDiv2 = $('.main-bottom-description');
    if (textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
      var original = textDiv2[0].innerHTML.substring(0, 400),
        index = 0;
      while (index < 500 && textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
        index++;
        original = original.substring(0, original.lastIndexOf(" "));
        textDiv2[0].innerHTML = original + '...';
      }
    }
  } // --> fitText
  function scrollDown() {
    randomArticles.push(randomArticles.shift());
    imageArr.push(imageArr.shift());
    $('.news-container').remove();
    displaySubArticles();
  } // --> scrollDown
  function scrollUp() {
    randomArticles.splice(0, 0, randomArticles[randomArticles.length - 1]);
    randomArticles.pop();
    imageArr.splice(0, 0, imageArr[imageArr.length - 1]);
    imageArr.pop();
    $('.news-container').remove();
    displaySubArticles();
  } // --> scrollUp
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
    parseGames();
    // Display first data
    displayMainArticles();
  } // --> processData
  // Parse the games into an array
  function parseGames() {
    // Array of games
    gameArr = [];
    // Function for the parser
    var parseGame = function(articles) {
        // Team names
        $.map(articles, function(val, index) {
          var gameData = {};
          gameArr.push(gameData);
        });
        return gameArr;
      }
      // Create Jquery object
    var articles = AIData;
    // Save all the games
    gameArr = parseGame(articles);
    // Display the current game
    //showGame();
  } // --> parseGames
  function switchGame(gameNum) {
    gameID = gameArr[parseInt(gameNum)].eventId;
    toggleDropDown();
    getContent(gameID);
    showGame();
  } // --> switchGame
  getContent();
  return {
    getData: getData,
    scrollDown: scrollDown,
    scrollUp: scrollUp,
    switchGame: switchGame
  };
})();
window.onresize = function(event) {
  var textDiv1 = $('.main-top-description');
  if (textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
    var original = textDiv1[0].innerHTML.substring(0, 400),
      index = 0;
    while (index < 500 && textDiv1[0].scrollHeight > textDiv1[0].clientHeight) {
      index++;
      original = original.substring(0, original.lastIndexOf(" "));
      textDiv1[0].innerHTML = original + '...';
    }
  }
  var textDiv2 = $('.main-bottom-description');
  if (textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
    var original = textDiv2[0].innerHTML.substring(0, 400),
      index = 0;
    while (index < 500 && textDiv2[0].scrollHeight > textDiv2[0].clientHeight) {
      index++;
      original = original.substring(0, original.lastIndexOf(" "));
      textDiv2[0].innerHTML = original + '...';
    }
  }
};
