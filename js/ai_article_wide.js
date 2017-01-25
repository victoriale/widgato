ai_widget = (function() {
  // Declare variables
  var temp = location.search;
  var query = {};
  var scope = "nfl";
  var target;
  var APIUrl = 'http://dev-article-library.synapsys.us/articles?articleType=postgame-report',
    AIData = {},
    gameID = -1,
    pageInd = -1,
    availPages = [],
    gameArr = []
  function getContent(eventId) {
    // Clear old data
    if (gameID != -1) {
      availPages = [];
      pageInd = -1;
      $('.aiw-title')[0].innerHTML = "Loading...";
    }
    var locApiUrl = APIUrl;
    if (typeof eventId != "undefined") {
      locApiUrl += "&event=" + eventId;
    }
    $.ajax({
      url: locApiUrl,
      success: function(data) {
        AIData = data.data;
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
    // $('.aiw-txt')[0].innerHTML = errorMsg;
  } // --> displayError
  function getData() {
    return AIData;
  } // --> getData
  function displayPage() {

    // Get the data
    var pageID = availPages[pageInd];
    var imageArr = [];
    imageArr.push("http://prod-sports-images.synapsys.us" + AIData[0].image_url + "?width=175");
    // if (imageArr.length < 1) {
    //   imageArr = ['http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_1.png',
    //     'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_2.png',
    //     'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_3.png',
    //     'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_4.png',
    //     'http://prod-sports-images.synapsys.us/nba/headers/nba_cover_page_5.png',
    //   ];
    // }
    var imgIndex = Math.floor(Math.random() * ((imageArr.length)));
    imgIndex = (imgIndex > -1 ? imgIndex : 0);
    var arr = {
      title: AIData[0].title,
      type: AIData[0].type,
      number: (pageInd + 1) + '/' + availPages.length,
      url: scope + '/articles/' + "postgame-report" + '/' + gameID,
      content: AIData[0].content + '<br>&nbsp; ',
      img: imageArr[imgIndex]
    };
    // Set the data
    $('.aiw-title')[0].innerHTML = arr.title;
    $('.aiw-score')[0].innerHTML = AIData[0].postgame_meta.away_acronym + "&nbsp;&nbsp;&nbsp;" + AIData[0].postgame_meta.away_score + "<br>" + AIData[0].postgame_meta.home_acronym + "&nbsp;&nbsp;&nbsp;" + AIData[0].postgame_meta.home_score;
    $('#ai-link').attr('href', arr.url);
    $('#ai-link').attr('target', target);
    $('.aiw-img').css('background-image', 'url(' + arr.img + ')');
    fitText();
  } // --> displayPage
  function fitText() {
    // var textDiv = $('.aiw-txt');
    // if (textDiv[0].scrollHeight > textDiv[0].clientHeight) {
    //   var original = textDiv[0].innerHTML.substring(0, 400),
    //     index = 0;
    //   while (index < 500 && textDiv[0].scrollHeight > textDiv[0].clientHeight) {
    //     index++;
    //     original = original.substring(0, original.lastIndexOf(" "));
    //     textDiv[0].innerHTML = original + '...';
    //   }
    // }
  } // --> fitText
  // **** PARSING FUNCTION ****
  function processData() {
    // Check for data
    if (typeof AIData != "object") {
      return displayError('Invalid YSEOP Response');
    }

    // Get game ID
    gameID = AIData[0].event_id;
    pageInd = 0;
    displayPage();
  } // --> processData


  getContent();
  return {
    getData: getData
  };
})();
$(function() {
  var domain, remnant;
  var temp = location.search;
  var query = {};
  if (temp != null) {
    query = JSON.parse(decodeURIComponent(temp.substr(1)));
    var remLink = "http://" + (typeof(query.subd) == 'undefined' || !query.subd || query.subd == '' || query.subd == null) ? 'touchdownzone.com' : query.subd;
    var partLink = "http://" + (typeof(query.subd) == 'undefined' || !query.subd || query.subd == '' || query.subd == null) ? ('mytouchdownzone.com/' + query.dom) : query.subd;
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
