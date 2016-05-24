ai_billboard = (function() {
  var APIUrl = 'http://dev-homerunloyal-ai.synapsys.us/sidekick';
  var randomArticles = [];
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
    var mainArticles = [];
    var subArticles = [];
    $.map(AIData, function(val, index) {
      if (index == 'about-the-teams' || index == 'pregame-report') {
        val['title'] = val.displayHeadline;
        val['content'] = val['article'][0];
        //content.images = val['carousel'];
        mainArticles.push(val);
      } else {
        val['title'] = val.displayHeadline;
        val['content'] = val['article'][0];
        //content.images = val['carousel'];
        subArticles.push(val);
      }
    });
    subArticles.sort(function() {
      return 0.5 - Math.random()
    });
    randomArticles = subArticles;
    $.map(randomArticles, function(val, index) {
    });

    var arr1 = {
      title: mainArticles[0].title,
      content: mainArticles[0].content + '<br>&nbsp; '
    };

    var arr2 = {
      title: mainArticles[1].title,
      content: mainArticles[1].content + '<br>&nbsp; '
    };
    // Set the data
    $('.main-top-title')[0].innerHTML = arr1.title;
    $('.main-top-description')[0].innerHTML = arr1.content;
    $('.main-top-image').css('background-image', 'url(' + arr1.img + ')');
    $('.main-bottom-title')[0].innerHTML = arr2.title;
    $('.main-bottom-description')[0].innerHTML = arr2.content;
    $('.main-bottom-image').css('background-image', 'url(' + arr2.img + ')');
    displaySubArticles();
    fitText();
  } // --> displayPage

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
      subContainer.appendChild(subDate);
      if (i != 0) {
        subContainer.appendChild(subHr);
      }
      subTitle.innerHTML = randomArticles[i].title;
      $('.news-updates-small')[0].appendChild(subContainerSmall);
      subContainerSmall.appendChild(subImageSmall);
      subContainerSmall.appendChild(subShareContainerSmall);
      subShareContainerSmall.appendChild(subShareSmall);
      subContainerSmall.appendChild(subTitleSmall);
      subContainerSmall.appendChild(subDateSmall);
      if (i != 0) {
        subContainerSmall.appendChild(subHrSmall);
      }
      $(subContainer).wrapInner($('<a href="' + randomArticles[i].title + '" />'));
      $(subContainerSmall).wrapInner($('<a href="' + randomArticles[i].title + '" />'));
      subTitleSmall.innerHTML = randomArticles[i].title;
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
    $('.news-container').remove();
    displaySubArticles();
  } // --> scrollDown
  function scrollUp() {
    randomArticles.splice(0,0,randomArticles[randomArticles.length-1]);
    randomArticles.pop();
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
    // toggleDropDown: toggleDropDown,
    switchGame: switchGame
  };
})();
// $(function() {
//   var domain, remnant;
//   var remLink = "http://www.hoopsloyal.com/";
//   var partLink = "http://www.myhoopszone.com/";
// });
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
