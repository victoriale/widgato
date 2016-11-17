ai_widget = (function () {
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    // Declare variables
    var event = '';
    var target = "_blank";

    //adjust api url for testing or live
    var APIUrl = protocolToUse + 'dev-touchdownloyal-ai.synapsys.us/sidekick?scope=nfl',
        AIData = {},
        gameID = -1,
        pageInd = -1,
        availPages = [];

    function getContent(eventId) {
        // Clear old data
        if (gameID != -1) {
            availPages = [];
            pageInd = -1;
            $('.aiw-title')[0].innerHTML = "Loading...";
            $('.aiw-txt')[0].innerHTML = '';
        }
        jsonData = {
            "success": true,
            "message": "",
            "data": {
                "article_data": [
                    {
                        "source": "touchdownloyal.com",
                        "article_id": "33509",
                        "title": "The roster: Dolphins' special teams",
                        "keyword": "Football",
                        "image_url": "/nfl/players/liveimages/1941fc4f-0b69-42fa-a8d2-fc55879ba5b7.jpg",
                        "teaser": "On Sunday, the Miami Dolphins will step onto the field against the Los Angeles Rams. Miami is third in the AFC East this year with an a 3-4 record.",
                        "article_url": "www.touchdownloyal.com/nfl/articles/starting-roster-away-special-teams/460",
                        "date": "Unix timestamp",
                        "icon": "../css/public/Icon_Football.png",
                        "article_color": "#2d3e50"
                    },
                    {
                        "source": "touchdownloyal.com",
                        "article_id": "107072",
                        "title": "Injury update: Chicago Cubs",
                        "keyword": "Baseball",
                        "image_url": "/mlb/players/liveimages/b741459c-7648-489e-9303-895564223cc6.jpg",
                        "teaser": "Look for the whole team to be available for the Chicago Cubs in Nov. 2's head-to-head against the Cleveland Indians. Chicago is not reporting any player injuries for their next game.",
                        "article_url": "www.homerunloyal.com/articles/injuries-home/107072",
                        "date": "Unix timestamp",
                        "icon": "../css/public/Icon_Baseball.png",
                        "article_color": "#bc2027"
                    },
                    {
                        "source": "touchdownloyal.com",
                        "article_id": "33509",
                        "title": "Raptors crash through stonewall Denver defense",
                        "keyword": "Basketball",
                        "image_url": "/nba/live/6b91fab3-008a-427a-8a04-f9ee150cada1/1000.jpg",
                        "teaser": "Friday's game will be a face-off between two of the league's elite teams. The Toronto Raptors have one of the NBA's top producing offenses this season.",
                        "article_url": "www.hoopsloyal.com/NBA/article/pregame/98957",
                        "date": "Unix timestamp",
                        "icon": "../css/public/Icon_Basketball.png",
                        "article_color": "#f7701d"
                    }
                ]
            }
        };

        var locApiUrl = APIUrl;
        if (typeof eventId != "undefined") {
            locApiUrl += "&event=" + eventId;
            event = eventId;
        }
        $.ajax({
            url: locApiUrl,
            success: function (data) {
                AIData = data;
                processData();
            },
            error: function (jqXHR, status, error) {
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
        var dataArr = [];
        $.map(AIData['data']['article_data'], function (val, index) {
            if (index == pageInd) {
                val.headline = val.title;
                val.report = val.teaser;
                val.eventId = val.article_id;
                val.articleImage = val.image_url;
                val.key = val.keyword;
                val.index = index;
                val.verticalIcon = val.icon;
                val.color = val.article_color;
                val.url = protocolToUse + val.article_url;
                dataArr.push(val);
            }
        });
        var arr = {
            title: dataArr[0].headline,
            url: dataArr[0].url,
            content: dataArr[0].report + '<br>&nbsp; ',
            img: protocolToUse + 'images.synapsys.us' + dataArr[0].articleImage,
            keyword: dataArr[0].key,
            icon: dataArr[0].verticalIcon,
            color: dataArr[0].color
        };
        // Set the data
        $('.keyword')[0].innerHTML = arr.keyword;
        $('.aiw-title')[0].innerHTML = arr.title;
        $('#ai-link-img').attr('href', arr.url);
        $('#ai-link-img').attr('target', target);
        $('#ai-link').attr('href', arr.url);
        $('#ai-link').attr('target', target);
        $('.aiw-txt')[0].innerHTML = arr.content;
        $('.aiw-top').css('background-color', arr.color);
        $('.aiw-img').css('background-image', 'url(' + arr.img + ')');
        $('.ball').css('background-image', 'url(' + arr.icon + ')');

        $('.aiw-link').css({'background-color': '#000', 'border': '1px solid #000'});
        $('.aiw-link').hover(function () {
            $(this).css({'background-color': arr.color, 'border': "1px solid" + arr.color + ""});
        }, function () {
            $(this).css({'background-color': '#000', 'border': '1px solid #000'});
        });

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
    } // --> nextPage
    // **** PARSING FUNCTION ****
    function processData() {
        // Check for data
        if (typeof AIData != "object") {
            return displayError('Invalid YSEOP Response');
        }
        // Get all the pages
        var pages = [];
        AIData = jsonData;
        for (var i = 0; i < AIData['data']['article_data'].length; i++) {
            availPages.push(AIData['data']['article_data'][i]);
        }
        availPages.sort(function () {
            return 0.5 - Math.random()
        });
        pageInd = 0;
        // Get game ID
        gameID = AIData['data']['article_data'].article_id;
        // Display first data
        displayPage();
    } // --> processData
    getContent();
    return {
        getData: getData,
        nextPage: nextPage
    };
})();


