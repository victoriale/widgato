(function () {
    var htmlFile = '@@import /min/index.min.html';
    var cssFile = '@@import /min/standard_styles.min.css';
    var cssWideFile = '@@import /min/wide_styles.min.css';
    // set initial content and variables to start trivia
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var postUrl = "-pa.synapsys.us/";
    var apiCallUrl = "-tw-api.synapsys.us/index.php";
    var imageUrl = "images.synapsys.us";
    var friendlyIframe;
    var friendlyIframeWindow;
    var iframeHostName;
    var $;
    var query;
    var baseEvent;
    var postObject; //object used for reporting

    var wideWidget = false; // flag that changes certain functions to run differently (default = false)
    var isSmall = false; //determine if the screen size is less than 650px
    var isMobile = false; //checks whether or not user agent is mobile
    var removeAd = false; //flag to keep the ad hidden if the user is on the correct, incorrect, or submission sections and the screen size changes
    var isActive = true;
    var timeToLive = 600000;
    var triviaStarted = false; //flag to signify that the user has began the quiz and to stop the quiz from restarting
    var swapImage = true; //flag to change the image once the user goes to a new question or the question rotates whilst the widget is inactive
    var debug = true;

    var embedURL = "trivia_widget/min"; //if debugging locally then change this to trivia_widget/main
    var currentScript = document.currentScript != null && document.currentScript.src.indexOf(embedURL) != -1 ? document.currentScript : (function () { // resolution for IE since it does not have currentScript to find the currently running script on the page
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src.indexOf(embedURL) != -1) {
                return scripts[i];
            }
        }
    })();

    /************************************************** GLOBALS ***************************************************/
    //STYLES used in console
    var analyticsStyles = [
        'background: linear-gradient(#2a9a13, #000000)', 'border: 1px solid #3E0E02', 'color: white', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
    ].join(';');
    var payloadStyles = [
        'background: linear-gradient(#4e028a, #000000)', 'border: 1px solid #3E0E02', 'color: white', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
    ].join(';');
    var defaultStyle = [
        'background: linear-gradient(#000000, #6e6e6e)', 'border: 1px solid #3E0E02', 'color: #1fc134', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
    ].join(';');

    //style log to use for coloring develop tool console
    function log(msg, style) {
        if (debug) {
            if (!style) {
                style = defaultStyle;
            }
            console.log('%c' + msg + '', style);
        }
    };


    function capitalizeFirstLetter(string) {
        var category = ['nfl', 'ncaaf', 'mlb', 'nba', 'ncaam'];
        if (category.indexOf(string) === 0) {
            return string.toUpperCase();
        } else {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    /**
     * RANDOM STRING GENERATOR
     *
     * Info:      http://stackoverflow.com/a/27872144/383904
     * Use:       randomString(length [,"A"] [,"N"] );
     * Default:   return a random alpha-numeric string
     * Arguments: If you use the optional "A", "N" flags:
     *            "A" (Alpha flag)   return random a-Z string
     *            "N" (Numeric flag) return random 0-9 string
     */
    function randomString(len, an) {
        an = an && an.toLowerCase();
        var str = "",
            i = 0,
            min = an == "a" ? 10 : 0,
            max = an == "n" ? 10 : 62;
        for (; i++ < len;) {
            var r = Math.random() * (max - min) + min << 0;
            str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
        }
        return str;
    }

    function getDomain(url) {
        var hostName = getHostName(url);
        var domain = hostName;
        if (hostName != null) {
            var parts = hostName.split('.').reverse();
            if (parts != null && parts.length > 1) {
                domain = parts[1] + '.' + parts[0];
                if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
                    domain = parts[2] + '.' + domain;
                }
            }
        }
        return domain;
    }

    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    }

    function getEnv(env) {
        if (env.match(/^homestead/) != null || env.match(/^localhost/) != null || env.match(/^dev/) != null) {
            env = "dev";
        } else if (env.match(/^qa\./) != null) {
            env = "qa";
        } else {
            env = "prod";
        }
        return env;
    }
    /************************************************** GLOBALS ***************************************************/

    function toggleDebug() {
        debug = debug ? false : true;
    }


    function createFriendlyIframe() {
        //create friendly iframe to place ourselves inside
        friendlyIframe = document.createElement('iframe');

        // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
        friendlyIframe.className = "twiframe";
        friendlyIframe.width = '300';
        friendlyIframe.height = 600 - 250; //250 is the add height
        friendlyIframe.scrolling = 'no';
        friendlyIframe.style.overflow = 'hidden';
        friendlyIframe.name = currentScript.src;
        friendlyIframe.style.border = 'none';

        //set base bath for iframe
        iframeHostName = getHostName(currentScript.src);

        currentScript.parentNode.insertBefore(friendlyIframe, currentScript);

        //after getting querystring from js or iframe search query set currentScript to black
        friendlyIframeWindow = friendlyIframe.contentWindow;

        //create inline html for friendlyIframe
        friendlyIframeWindow.document.open();
        friendlyIframeWindow.document.write(htmlFile);
        friendlyIframeWindow.document.close();

        // create variable to be used similar to jquery for id's
        $ = function (e) { // create a simple version for grabbing id's of elements
            return friendlyIframeWindow.document.getElementById(e)
        };

        //listen to when the iframe window content has returned and send in the srcQuery if there is one before it gets
        if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") { // if page is already loaded'
            setupIframe();
        } else { // else once page has finished loading, so as not to slowdown the page load at all
            friendlyIframeWindow.document.onreadystatechange = function () {
                if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") {
                    setupIframe();
                }
            }
        }
    }


    function setupIframe() {
        var srcQuery = currentScript.src.split("js?")[1];
        //TODO Make a better way to test locally.
        //determine if a query string is after the index.html locally || if query is after a javascript script
        var hostname = new RegExp(document.location.hostname);
        if (srcQuery != "" && srcQuery != null) {
            try {
                query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
            } catch (e) {
                console.log(e);
            }
        } else {
            if ((hostname.test('localhost') || hostname.test('w1.synapsys.us') || hostname.test('dev-w1.synapsys.us') || hostname.test('homestead.widgets')) && (document.location.search != null && document.location.search != '')) {
                query = JSON.parse(decodeURIComponent(document.location.search.substr(1)));
                //FIRST THING IS SETUP ENVIRONMENTS
            }
        }

        currentScript.src = 'about:blank'; // remove src of the script to about:blank to allow more than one widget to counter IE

        //create inline style for friendlyIframe
        var style = friendlyIframeWindow.document.createElement("style");
        // style.type = 'text/css';
        // style.rel = 'stylesheet';
        if (query.wide != null && query.wide != '') {
            friendlyIframe.width = '100%';
            friendlyIframe.height = '250';

            //CREATE LISTENER FOR RESIZE
            window.addEventListener('resize', function () {
                //set iframe to width of parent node
                friendlyIframe.width = '100%';
            }, true);

            // style.href = './min/wide_styles.min.css';
            style.appendChild(friendlyIframeWindow.document.createTextNode(cssWideFile));
            wideWidget = true; //set wide flag

            //grab the sibling igloo element and inject it inside the trivia CU where we can control it
            var triviaAdZone = $('trivia_ad_zone');
            triviaAdZone.style.display = 'none';
            parent[query.pause_variable] = false; //pause ad if its in view
            //TODO This needs to be reworked so that the ad is not within the widget's html.
            //TODO Bring it back out then create functions to dynamically ad the styles
            //TODO needed for the progress bar and manipulate the ad via z-index.
            triviaAdZone.appendChild(friendlyIframe.parentElement.getElementsByClassName("widget_zone")[0]);
            triviaAdZone.getElementsByClassName("widget_zone")[0].style.opacity = 1;
            triviaAdZone.getElementsByClassName("widget_zone")[0].style.zIndex = 50;

        } else {
            friendlyIframe.width = 300;
            style.appendChild(friendlyIframeWindow.document.createTextNode(cssFile));
            // style.href = './min/standard_styles.min.css';
        }

        //append the css file into iframe head
        friendlyIframeWindow.document.head.appendChild(style);

        //set igloo skeleton event for widget-interaction to be sent back to igloo to allow ads to rotate
        baseEvent = query.event;
        baseEvent.event = "widget-interaction";
        postObject = {
            snt_data: baseEvent,
            action: 'snt_tracker'
        };

        //after you get the query you set the enironment
        setupEnvironment(query);
        triviaWidget();
    }


    /***************************** SETUP ENVIRONMENTS ******************************
     * @function setupEnvironment
     * setup Environment function
     *
     * @param function widgetQuery - the query string sent back as and Object from the location.search substrings
     * to be parsed through and set for global use
     */
    function setupEnvironment(widgetQuery) { //runs once per embed
        query = widgetQuery;
        var cat = widgetQuery.category;
        var group = widgetQuery.group == '' ? widgetQuery.group = null : widgetQuery.group;
        var environment = iframeHostName.split('.')[0];
        var env;

        //setup Image Environment api
        imageUrl = getEnv(environment) == 'prod' ? protocolToUse + imageUrl : protocolToUse + getEnv(environment) + '-' + imageUrl; // this is global call that is used for images
        postUrl = protocolToUse + getEnv(environment) + postUrl;
        apiCallUrl = protocolToUse + getEnv(environment) + apiCallUrl;

        if (cat && cat != '') {
            apiCallUrl += '?category=' + cat;
        } else {
            apiCallUrl += '?category=' + group;
        }
    }


    var triviaWidget = function () {
        var triviaFail = 0;
        var friendlyIf = friendlyIframe;
        var friendlyIfWindow = friendlyIframeWindow;

        var rand_id = Math.floor(Math.random() * 1000);
        var currentQuizData;
        var dataQuestionTitles;

        // HTML Element variables
        var sntTriviaContent; // the Element Content that the analytics will be reporting
        var widgetContainer_el = friendlyIfWindow.document.getElementsByClassName('widget_container')[0];
        var triviaAdZone_el = $('trivia_ad_zone');

        var triviaContainer_el = $('trivia_container');
        var triviaImage_el = friendlyIfWindow.document.getElementsByClassName('trivia_image')[0];
        var triviaImageOverlay_el = friendlyIfWindow.document.getElementsByClassName('trivia_image_overlay')[0];
        var triviaQuestion_el = friendlyIfWindow.document.getElementsByClassName('trivia_question')[0].getElementsByTagName('p')[0];
        var triviaOptionsContainer_el = friendlyIfWindow.document.getElementsByClassName('trivia_options')[0];
        var triviaOptions_el = friendlyIfWindow.document.getElementsByClassName('trivia_options')[0].getElementsByTagName('li');

        var submissionOverlay_el = $("submission_overlay");
        var submissionInfoContainer_el = friendlyIfWindow.document.getElementsByClassName("submission_display_container")[0];

        var nextQuestionButton_el = $("next_question");
        var activeQuestion_el = $("active_question");
        var userScore_el = $("user_score");
        var totalQuestions_el = $("total_questions");
        var scoreComment_el = $("score_comment");
        var skipQuestion_el = $("skip_question");
        var restart_el = $("restart");

        var otherContentOptionContainer_el = friendlyIfWindow.document.getElementsByClassName("other_content_option_container");
        var animationContainer_el = friendlyIfWindow.document.getElementsByClassName("animation_container");
        var completedOverlay_el = $("completed_overlay");
        var correctResultDisplay_el = $("correct_result_display");
        var showOthersText_el = $("show_others");

        var resultsChart_el = friendlyIfWindow.document.getElementsByClassName("results_chart");
        var resultsChartValue_el = friendlyIfWindow.document.getElementsByClassName("results_chart_value");
        var randomOption_el = friendlyIfWindow.document.getElementsByClassName("random_option")[0];
        var progressBar_el = $("progress_bar");
        var adProgressBar_el = $("ad_progress_bar");
        var intervalScore_el = $("interval_score");
        var intervalScoreQuestion_el = $("interval_score_question");
        var pixelatedContainer_el = $("pixelateContainer");
        var youGuessPercentge_el = $("percentage_of_guess");
        var intervalScoreContainer_el = $("interval_score_container");

        var pixelatedContainerHeight = pixelatedContainer_el.offsetHeight;
        var pixelatedContainerWidth = pixelatedContainer_el.offsetWidth + 2;

        // calculated variables
        var localDataStore;
        var finalQuestion = false;
        var questionIterator = 1;
        var userScore = 0;
        var activeQuiz;
        var activeQuizKey;
        var dataVarSet;
        var questionKey;
        var quizTitles = [];
        var dataOptions;
        var totalResults;
        var correctResult;
        var correctPercentage;
        var incorrectResult;
        var incorrectPercentage;

        var totalQuestions = 10;
        var maxScore = 10;

        var pixelatedImage;
        var intervalTimer;
        var pixelationInterval;
        var widgetEngaged = false; // when user has hovered and interacted with widget
        var intervalScore = maxScore;
        var cumulativeScore = 0;
        var totalPossibleScore = maxScore * totalQuestions;

        var storeSessionFn = {
            get: function () {
                if (sessionStorage.getItem('snt_trivia_analytics') === null) {
                    storeSession = sessionStorage.setItem('snt_trivia_analytics', JSON.stringify({
                        before_time: null,
                        after_time: null,
                        session_id: null
                    }));
                }
                storeSession = JSON.parse(sessionStorage.getItem('snt_trivia_analytics'));
                return storeSession;

            },
            set: function (jsonData) {
                sessionStorage.setItem('snt_trivia_analytics', JSON.stringify(jsonData));
            }
        }; //storeSessionFn


        function initialSetup(qId) {
            try {
                //if currentQuizData is available then skip otherwise run function to make api call
                adjustIntervalScoreFn("clear")
                if (!currentQuizData) {
                    callTriviaApi();
                }

                quizTitles = getQuizKeys();
                activeQuizKey = qId ? qId : arrayShuffle(quizTitles)[0]; //get random quiz key.

                //filter throught quizzes and find the current active quiz by using the activeQuizKey
                activeQuiz = currentQuizData.filter(function (quiz) {
                    if (quiz.sub_category_id === activeQuizKey) {
                        return quiz;
                    }
                })[0];

                quizId = activeQuizKey; // set analytics quizId to be sent into PAYLOAD

                storeSession = storeSessionFn.get();

                dataQuestionTitles = getQuizSetKeys(activeQuiz);

                questionIterator = 1;
                finalQuestion = false;
                userScore = 0;
                cumulativeScore = 0;
                userScore_el.innerHTML = cumulativeScore;
                activeQuestion_el.innerHTML = questionIterator;
                totalQuestions_el.innerHTML = totalPossibleScore;

                var tempTitles = quizTitles;
                tempTitles.splice(tempTitles.indexOf(activeQuizKey), 1);
                setQuizKeys(tempTitles);
                setData();
            } catch (e) {
                console.warn("Data Error for Trivia", e);
            }
        } //initialSetup

        // function set to mimick API call
        function callTriviaApi() {
            // variable that stores the response of an http request
            if (window.XMLHttpRequest) {
                var xhttp = new XMLHttpRequest();
            } else {
                var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
            }
            xhttp.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (this.status == 200) {
                        // On success parse out the response
                        localDataStore = JSON.parse(this.responseText);
                        currentQuizData = localDataStore['quizzes'];
                    } else {
                        // Error handling
                        // Get the message
                        var msg = this.statusText;
                        if (this.status == 500) {
                            try {
                                msg = JSON.parse(this.responseText).message
                            } catch (e) {
                                console.log('No JSON message')
                            }
                        }
                        msg = 'HTTP Error (' + this.status + '): ' + msg;
                        // setTimeout(runAPI(apiCallUrl), 500)
                    }
                }
            };
            xhttp.open("GET", apiCallUrl, false);
            xhttp.send();
        } //callTriviaApi


        function setQuizKeys(titles) {
            questionKey = null; // Reset question key since a new quiz is being made
            intervalTimer = null;
            titles.splice(titles.indexOf(activeQuizKey), 1);
            for (var i = 0; otherContentOptionContainer_el.length - 1 > i; i++) {
                var subCatId = titles[0];
                var quizData = currentQuizData.filter(function (quiz) {
                    if (quiz.sub_category_id === subCatId) {
                        return quiz;
                    }
                })[0];

                // loop through other quiz options from data and insert link and image into view
                var firstRandomQuestion = quizData.questions[0];
                var thumbnailImage = firstRandomQuestion ? "url(" + imageUrl + firstRandomQuestion.metadata.image + "4_3.jpg)" : '';
                animationContainer_el[i].style.backgroundImage = thumbnailImage;
                animationContainer_el[i].getElementsByTagName('p')[0].innerHTML = quizData.sub_category.toUpperCase();
                otherContentOptionContainer_el[i].id = subCatId;
                //Click event for other quiz buttons
                otherContentOptionContainer_el[i].onclick = function (event) {
                    if (isSmall && wideWidget) {
                        removeAd = true;
                        adControl(false);
                        adjustIntervalScoreFn('clear');
                        hideAd();
                    }
                    sendPostMessageToIgloo(postObject, 5);
                    updatePayload('send');
                    restartFn(parseInt(event.target.parentNode.id));
                };

                titles.splice(titles.indexOf(subCatId), 1);
            }
            //Click event for random shuffle quiz button
            randomOption_el.onclick = function () {
                if (isSmall && wideWidget) {
                    removeAd = true;
                    adControl(false);
                    adjustIntervalScoreFn('clear');
                    hideAd();
                }
                sendPostMessageToIgloo(postObject, 5);
                updatePayload('send');
                restartFn(setRandomQuizLink());
            }
        } //setQuizKeys


        // gets all possible Quizzes
        function getQuizKeys() {
            var quizzes = currentQuizData;
            quizTitles = [];
            quizzes.forEach(function (quiz) {
                quizTitles.push(quiz.sub_category_id);
            })
            return quizTitles;
        } //getQuizKeys


        function arrayShuffle(data) {
            var shuffleArray = [];
            if (Array.isArray(data)) {
                shuffleArray = data;
            } else {
                for (var o in data) {
                    shuffleArray.push(data[o]);
                }
            }
            for (var i = shuffleArray.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = shuffleArray[i];
                shuffleArray[i] = shuffleArray[j];
                shuffleArray[j] = temp;
            }
            if (Array.isArray(data)) {
                return shuffleArray;
            } else {
                var returnObj = {};
                for (var i = 0; i < shuffleArray.length; i++) {
                    returnObj[i + 1] = shuffleArray[i];
                }
                return returnObj;
            }
        }

        // creates an array of question titles
        function getQuizSetKeys(data) {
            var quizQuestions = data.questions;
            dataQuestionTitles = [];
            quizQuestions.forEach(function (question, i) {
                //grabs question id from meta data
                dataQuestionTitles.push(question.metadata.question_id);
            })
            totalPossibleScore = dataQuestionTitles.length * 10;
            return dataQuestionTitles;
        } //getQuizKeys


        // function used to reduce size of text in options if it is too tall for container
        function reduceTextSizeCheck(element) {
            var standardHeight = 34,
                elementHeight = element.offsetHeight;
            if (elementHeight > standardHeight) {
                /*--TODO make this a class?--*/
                element.style.fontSize = "10px";
                element.style.lineHeight = "1.1";
            }
        } //checkOneLineOption


        // Inject data into HTML
        function setData() {
            try {
                triviaOptionsContainer_el.innerHTML = ''; // empty other content options so that can be reset
                triviaContainer_el.className = '';
                nextQuestionButton_el.innerHTML = "<p>Next Question</p>";

                questionKey = questionKey ? questionKey : arrayShuffle(dataQuestionTitles)[0]; //get random question key.

                var activeQuestion = activeQuiz.questions.filter(function (question) {
                    if (question.metadata.question_id === questionKey) {
                        return question;
                    }
                })[0];

                questionId = questionKey; // set analytics questionId to be sent into PAYLOAD
                if (isActive) {
                    updatePayload("send");
                }

                var metaData = activeQuestion.metadata,
                    answerData = activeQuestion.answers,
                    analyticsData = activeQuestion.analytics;
                var resultDisplay = activeQuestion ? metaData.correct_answer_result : 'Whoops!',
                    backgroundImage = activeQuestion ? "url(" + imageUrl + metaData.image + "16_9.jpg)" : '';

                triviaQuestion_el.innerHTML = metaData.question; //inserts active question into view
                correctResultDisplay_el.innerHTML = resultDisplay; //inserts result into the submission view
                if (swapImage && wideWidget) {
                    //creates stylesheet and appends media query that injects the proper image size into the background
                    var imageStyle = document.createElement('style');
                    if (!friendlyIfWindow.document.getElementById('trivia_image_style')) {
                        imageStyle.type = 'text/css';
                        imageStyle.innerHTML = '@media (max-width: 649px) {.trivia_image {background-image: url("' + imageUrl + metaData.image + '4_3.jpg")}}' +
                            '@media (min-width: 650px) {.trivia_image {background-image: url("' + imageUrl + metaData.image + '16_9.jpg")}}';
                        imageStyle.id = 'trivia_image_style';
                        friendlyIfWindow.document.getElementsByTagName('section')[0].appendChild(imageStyle);
                    } else {
                        friendlyIfWindow.document.getElementById('trivia_image_style').innerHTML = '@media (max-width: 649px) {.trivia_image {background-image: url("' + imageUrl + metaData.image + '4_3.jpg")}}' +
                            '@media (min-width: 650px) {.trivia_image {background-image: url("' + imageUrl + metaData.image + '16_9.jpg")}}';
                    }
                } else if (swapImage && !wideWidget) {
                    triviaImage_el.style.backgroundImage = backgroundImage; //inserts backgroundImage into the 300x600 view
                }
                dataOptions = arrayShuffle(answerData); // randomizes the object shuffling
                if (wideWidget) {
                    triviaImageOverlay_el.style.height = '97px';
                }
                intervalScoreContainer_el.style.display = 'block';
                progressBar_el.style.display = 'block';
                submissionOverlay_el.classList.remove('no_transition');
                // loop thorugh options in data and insert values into view
                answerData = dataOptions;
                for (var key in answerData) {
                    if (answerData.hasOwnProperty(key)) {
                        var index = Number(Object.keys(answerData).indexOf(key)) + 1,
                            child = friendlyIfWindow.document.createElement("li"),
                            value = answerData[key],
                            isCorrect = answerData[key] == metaData.correct_answer,
                            selectedOption;
                        child.setAttribute('class', 'button');
                        child.innerHTML = '<p>' + value + '</p>';
                        triviaOptionsContainer_el.appendChild(child);
                        reduceTextSizeCheck(child.getElementsByTagName('p')[0]); // run options through this function to check if text size needs adjusted
                        if (isCorrect) {
                            child.onclick = function () {
                                sendPostMessageToIgloo(postObject, 5);
                                selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                                answerSubmittedFn('correct');
                                setGraphInfo(activeQuestion, selectedOption);
                                triviaStarted = true;
                            }
                        } else {
                            child.onclick = function () {
                                sendPostMessageToIgloo(postObject, 5);
                                selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                                answerSubmittedFn('incorrect');
                                setGraphInfo(activeQuestion, selectedOption);
                                triviaStarted = true;
                            }
                        }
                    }
                }
                skipQuestion_el.onclick = function () {
                    sendPostMessageToIgloo(postObject, 5);
                    skipQuestionFn();
                };
                restart_el.onclick = function () {
                    sendPostMessageToIgloo(postObject, 5);
                    if (isSmall && wideWidget) {
                        removeAd = true;
                        adControl(false);
                        adjustIntervalScoreFn('clear');
                        hideAd();
                    }
                    restartFn(activeQuizKey);
                };

                if (wideWidget) {
                    fireResize();
                }
                adjustIntervalScoreFn(); // start new interval

            } catch (e) {
                console.warn('Error in setting trivia data', e);
            }
        }; //setData


        // Set Graph values
        function setGraphInfo(activeQuestion, selectedOption) {

            var metaData = activeQuestion.metadata,
                answerData = activeQuestion.answers,
                analyticsData = activeQuestion.analytics;

            correctPercentage = analyticsData.correct_percentage;
            incorrectPercentage = analyticsData.wrong_percentage;

            for (var i = 0; resultsChart_el.length > i; i++) {
                switch (i) {
                case 0:
                    resultsChartValue_el[i].innerHTML = correctPercentage + "%"; //sets chart label
                    resultsChart_el[i].children[0].className = "p" + correctPercentage; //give chart appropriate class to fill radial graph (i.e. p_50 = 50%)
                    break;
                default:
                    resultsChartValue_el[i].innerHTML = incorrectPercentage + "%"; //sets chart label
                    resultsChart_el[i].children[0].className = "p" + incorrectPercentage; //give chart appropriate class to fill radial graph (i.e. p_50 = 50%)
                    break;
                }
            }

            //go through selected answer based on user click and pull out the analytics data from data
            for (var selection in answerData) {
                if (selectedOption == answerData[selection]) {
                    analyticsSetAnswer(selection);
                    var selectedPercent = analyticsData[selection + '_percentage']; //TODO a better way to do this too hard coded
                    youGuessPercentge_el.innerHTML = "<b>" + selectedPercent + "%</b> of people also answered:<br> <b>" + selectedOption + ".</b>";
                }

            }
        } //setGraphInfo


        function answerSubmittedFn(answer) {
            switch (answer) {
            case 'correct':
                removeAd = true;
                widgetEngaged = true;
                addIntervalScoreFn();
                adjustIntervalScoreFn('clear');
                submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Correct";
                if (wideWidget) {
                    triviaImageOverlay_el.style.height = '230px';
                }
                intervalScoreContainer_el.style.visibility = 'hidden';
                progressBar_el.style.visibility = 'hidden';
                adjustIntervalScoreFn('clear');
                submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
                triviaContainer_el.className = "correct_submission";
                nextQuestionFn();
                break;
            case 'incorrect':
                removeAd = true;
                widgetEngaged = true;
                adjustIntervalScoreFn('clear');
                submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Incorrect";
                if (wideWidget) {
                    triviaImageOverlay_el.style.height = '230px';
                }
                intervalScoreContainer_el.style.visibility = 'hidden';
                progressBar_el.style.visibility = 'hidden';
                adjustIntervalScoreFn('clear');
                submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
                triviaContainer_el.className = "incorrect_submission";
                nextQuestionFn();
                break;
            }
        }


        function addIntervalScoreFn() {
            cumulativeScore = cumulativeScore + intervalScore;
            userScore_el.innerHTML = cumulativeScore;
        } //addIntervalScoreFn


        // sets functionality for next question button
        function nextQuestionFn() {
            // if last question show results screen
            if (questionIterator >= totalQuestions) {
                nextQuestionButton_el.onclick = function () {
                    sendPostMessageToIgloo(postObject, 5);
                    showCompleteFn()
                };
                nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
            } else {
                nextQuestionButton_el.onclick = function () { // create click event for when user clicks on the Next Question
                    sendPostMessageToIgloo(postObject, 5);
                    submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
                    if (isSmall && wideWidget) {
                        removeAd = true;
                        adControl(false);
                        adjustIntervalScoreFn('clear');
                        hideAd();
                    }
                    bounce = 0;
                    updatePayload('send');
                    iterateQuestion();
                };
            }
            submissionOverlay_el.classList.add('no_transition');
        } //nextQuestionFn


        function skipQuestionFn() {
            swapImage = true;
            skipped = 1;
            adjustIntervalScoreFn('clear');
            widgetEngaged = true;
            // if last question show results screen
            if (questionIterator >= totalQuestions) {
                showCompleteFn();
                nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
            } else {
                submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
                updatePayload('send');
                iterateQuestion();
            }
        } //skipQuestionFn


        // run function when last question is submitted
        function showCompleteFn() {
            swapImage = true;
            var comment;
            if (cumulativeScore < 20) {
                comment = "Ouch!"
            } else if (cumulativeScore >= 20 && cumulativeScore <= 40) {
                comment = "Not Bad!"
            } else {
                comment = "Great Job!"
            }
            showOthersText_el.innerHTML = "Other " + capitalizeFirstLetter(activeQuiz.category) + " Trivia You May Love:";
            scoreComment_el.innerHTML = comment;
            completedOverlay_el.className = "show";
            setRandomQuizLink();
        } //showCompleteFn

        function removeQuestionIndex(key) {
            var questionIndex = dataQuestionTitles.indexOf(key);
            if (questionIndex > -1) {
                dataQuestionTitles.splice(questionIndex, 1);
                ''
            }
            if (dataQuestionTitles.length > 0) {
                questionKey = dataQuestionTitles[0] ? dataQuestionTitles[0] : null;
            }
        }

        // gets data for next question
        function iterateQuestion() {
            swapImage = true;
            removeQuestionIndex(questionKey);

            questionIterator++;
            activeQuestion_el.innerHTML = questionIterator; // inject active question into view
            triviaContainer_el.className = (''); // resets view
            if (questionIterator <= totalQuestions) {
                setData();
            }
        } //iterateQuestion


        // restart current quiz
        function restartFn(categoryId) {
            adjustIntervalScoreFn('clear');
            initialSetup(categoryId);
            completedOverlay_el.className = "hidden";
        } //restartFn

        function resetIntervalScore() {
            intervalScore = maxScore;
        }


        //adjust pixelation
        function adjustIntervalScoreFn(clear) { //TODO USE GLOBAL TIMER FUNCTION
            if (clear == 'clear') {
                clearInterval(intervalTimer);
                resetIntervalScore();
            } else {
                var temp = 0,
                    buffer = 3, //buffer in seconds on how long befre the points should actually decrease
                    bufferCount = 1,
                    tempCount = 0,
                    progressCounter = 1,
                    intervalSeconds = 10,
                    intervalMiliSeconds = 1000;
                if (!removeAd) {
                    setSize();
                }
                if (isSmall && wideWidget && total_clicks == 0 && !widgetEngaged) {
                    progressBar_el.style.visibility = 'hidden';
                    intervalScoreContainer_el.style.visibility = 'hidden';
                } else {
                    progressBar_el.style.visibility = 'visible';
                    intervalScoreContainer_el.style.visibility = 'visible';

                    if (intervalTimer) {
                        clearInterval(intervalTimer)
                    }

                    intervalTimer = setInterval(function () {
                        bufferCount++; //3 second delay before loosing actual points
                        if (Math.floor(bufferCount / intervalSeconds) >= 3) {
                            progressCounter++;
                            tempCount = Math.floor(progressCounter / intervalSeconds);
                            progressBar_el.style.width = progressCounter + '%';

                            if (tempCount >= 0 && tempCount < maxScore && temp != tempCount) {
                                temp = tempCount;
                                intervalScore--;
                            }
                            intervalScoreQuestion_el.innerHTML = "Q" + questionIterator + " - Points : " + intervalScore;
                            if (tempCount >= maxScore || progressCounter >= 100) { // make sure tempCount and progress Counter finish entirely
                                clearInterval(intervalTimer);
                                if (!widgetEngaged && !triviaStarted) {
                                    var randomQuizKey = getRandomQuizKey();
                                    getNewQuiz(randomQuizKey);
                                }
                            }
                        } //end of BUFFER counter
                        else {
                            progressBar_el.style.width = progressCounter + '%';
                            intervalScoreQuestion_el.innerHTML = "Q" + questionIterator + " - Points : " + intervalScore;
                        }
                    }, intervalMiliSeconds / intervalSeconds);
                }
            }
        } //adjustPixelationFn


        // sets the random quiz link on the completed quiz overlay
        function setRandomQuizLink() {
            randomOption_el.id = getRandomQuizKey();
        } //setRandomQuizLink


        // returns a random quiz key that is not the current active key
        function getRandomQuizKey() {
            var activeIndex = quizTitles.indexOf(activeQuizKey);
            var withOutActiveIndex = quizTitles.filter(function (e) {
                return e !== activeQuizKey
            });
            var randomQuizKey = withOutActiveIndex[Math.floor(Math.random() * withOutActiveIndex.length)];
            questionKey = null; // since its a new random quiz then reset the current question key so that it can random a new key from a new quiz
            return randomQuizKey;
        } //getRandomQuizKey


        // gets new data if user clicks on new quiz
        function getNewQuiz(dataSetKey) {
            swapImage = true;
            activeQuizKey = dataSetKey;
            restartFn();
        } //getNewQuiz


        /**
         * Manually fires off the window resize event
         */
        function fireResize() {
            if (document.createEvent) {
                var ev = document.createEvent('Event');
                ev.initEvent('resize', true, true);
                window.dispatchEvent(ev);
                isSmall = ev.currentTarget.innerWidth < 650;
            } else { // IE
                element = document.documentElement;
                var event = document.createEventObject();
                element.fireEvent("onresize", event);
            }
        }

        function setSize() {
            var getWidth;
            if (typeof (window.innerWidth) == 'number') {
                getWidth = window.innerWidth;
            } else {
                if (document.documentElement && document.documentElement.clientWidth) {
                    getWidth = document.documentElement.clientWidth;
                } else {
                    if (document.body && document.body.clientWidth) {
                        getWidth = document.body.clientWidth;
                    }
                }
            }
            if (wideWidget) {
                isSmall = getWidth < 650;
                //bring the ad back in case it is hidden while the width is altered
                if (!isSmall && !removeAd) {
                    adControl(false);
                } else if (isSmall && !removeAd) {
                    triviaAdZone_el.style.display = 'none';
                    parent[query.pause_variable] = false; //pause ad when its out of view
                } else if (isSmall && removeAd) {
                    triviaAdZone_el.style.display = 'block';
                    parent[query.pause_variable] = true; //pause ad when its out of view
                }
            }
        }

        window.addEventListener('resize', setSize);

        if (wideWidget) {
            var isAdVisible = false;
            window.setInterval(function () { // create interval to swap the ad every 3 secs if the widget is not been engaged
                if (isSmall && total_clicks === 0 && !widgetEngaged && !triviaStarted) {
                    if (!isAdVisible) {
                        intervalScoreContainer_el.style.visibility = 'visible';
                        progressBar_el.style.visibility = 'visible';
                        adControl(true);
                        isAdVisible = true;
                    } else {
                        intervalScoreContainer_el.style.visibility = 'hidden';
                        progressBar_el.style.visibility = 'hidden';
                        adControl(false);
                        isAdVisible = false;
                    }
                }
            }, 3000);
        }

        function hideAd() {
            setTimeout(function () {
                adControl(true);
                removeAd = false;
            }, 3000)
        }

        function adControl(isPaused) {
            if (isPaused) {
                adjustIntervalScoreFn();
                triviaAdZone_el.style.display = 'none';
                parent[query.pause_variable] = false; //pause ad when its out of view
            } else {
                triviaAdZone_el.style.display = 'block';
                parent[query.pause_variable] = true; //unpause ad if its in view
                if (isSmall) {
                    var adProgressCounter = 1,
                        adIntervalSeconds = 10,
                        adIntervalMilliSeconds = 1000;
                    var adIntervalTimer = setInterval(function () {
                        adProgressCounter++;
                        adProgressBar_el.style.width = (adProgressCounter * 3.334) + '%';
                        if (adProgressCounter >= 31) {
                            adProgressCounter = 1;
                            adProgressBar_el.style.width = 0;
                            clearInterval(adIntervalTimer);
                        }
                    }, adIntervalMilliSeconds / adIntervalSeconds);
                }
            }
        }


        /*
         ****************************************************************************************************************************************
         ***********************ANALYTICS VARIABLES *********************************************************************************************
         ****************************************************************************************************************************************
         */

        //global variables used for payload
        var sessionId,
            partnerId,
            placementId,
            viewEngaged = false;

        var viewDwell, // view_dwell, Each time a quiz is 50%+ in view for any length of time. (collected every 100ms)
            embedTime, // engage_dwell, When CU is engaged*, each time a question is 50%+ in view for any length of time. (collected every 100ms)
            sessionTimer, // create Session Timer to know when the session has ended and create a new payload;
            payloadTimer, // create Payload Timer to know when to auto send payloads if variables are met;
            engageDwell, // time from the moment the widget is in view and engaged
            dwellLimitTimer,
            windowActiveTimer; // time limiter for dwell so dwell timer can be stopped after a certain time limit

        var storeSession;
        var sessionBefore = 0;
        var sessionAfter = 0;

        var igloo,
            windowActive = true,
            userAgentObj,
            category,
            quizId,
            questionId,
            question_view = 0, //When CU is engaged* (It is assumed to be in view)
            quiz_views = 0, //Each time a quiz is 50%+ in view for 1+ seconds. This is recorded only once per quiz load.
            embed_view = 0, //Each time an embed is 50%+ in view for 1+ seconds. This is recorded only once per embed load.
            total_clicks = 0,
            total_embeds, // Record total amount of embeds on a page no matter if in view or not
            bounce = 0, //should only ever be 1, never more than due to submission on a payload level.  || always return 1 until questions is answered then return 0 which zero means it is no longer in bounce since it has been answered

            skipped, // skippped question sends 0 || 1
            answered_correctly, // correct question sends 0 || 1
            answered_wrong_1, // wrong question sends 0 || 1
            answered_wrong_2, // wrong question sends 0 || 1
            answered_wrong_3; // wrong question sends 0 || 1

        var view = false;

        function startTriviaAnalytics() {
            resetAnalytics();

            userAgentObj = iglooAnalytics('useragent');

            // if igloo utilities then iglooAnalytics() function will return boolean true if igloo is 50% or more in view of use window
            view = iglooAnalytics('view'); // check initial load if widget is available
            //TODO COMBINE TIMERS TO GET A MORE ACCURATE TIME INTERVAL REPORTING
            analyticsSession(); // get session ID first
            analyticsWindowFocus();
            analyticsDwellEngagement();
            analyticsViewScroll();
            analyticsClick();

        };

        /** igloo.utils.elementIsVisible(element, debug_div, igloo_debug, min_percent)
         * This function checks if a given element is 60% or more in the viewport
         * @param  {DOMElement}  element     The element to check for visibility
         * @param  {DOMElement}  debug_div   The debugging div to put the % visible in
         * @param  {Boolean}     igloo_debug The debugging state of igloo
         * @param  {Number}      min_percent The minimum percent for an element to be
         *                                   considered in view (default 0.6)
         * @return {Boolean}                 Whether the element is in view
         */
        /** https://github.com/passit/adstack/blob/adstack/prod/src/js/IglooModule.js#L37
         * igloo.browser
         * This object describes the current browser including name, version, mobile,
         * and bot
         * @type {Object}
         * @key  {String}  name    The name of the broswer (Chrome, IE, etc)
         * @key  {String}  version The version of the browser
         * @key  {Boolean} bot     Whether the browser is a bot or not
         * @key  {Boolean} mobile  Whether the browser is mobile or not
         */
        function iglooAnalytics(type) {
            try {
                switch (type) {
                case 'view':
                    var triviaDocument = sntTriviaContent.contentWindow.document;
                    return igloo.utils.elementIsVisible(triviaDocument.getElementById('snt_trivia_game'), null, false, 0.5);
                    break;
                case 'useragent':
                    return igloo.browser;
                    break;
                default:
                    console.warn('igloo Utility not found', e);
                    break;
                }
            } catch (e) {
                console.warn('igloo not found', e);
            }
        }


        //TODO MUST USE TIMESTAMPS ON CERTAIN TIMERS TO GET A MORE PROPER TIME ANALYTICS;
        /**timer(name, tick, stopAt, debug_element)
         * Function to create a timer with variable features to startTime, pauseTime, get, or even auto pauseTime
         * @type {Object}
         * @key  {String} name    give the timer a name to track
         * @key  {Number} tick    tick is how many times the interval Timer should update the time(ms)
         * @key  {Number} stopAt  if you want the time to auto pauseTime at a certain time(ms)
         * @key  {Object} debug_div  the element (div/span/etc..) you want to debug off of
         * @key  {Object} createFunction runs the function user creates every interval
         */
        function timer(name, tick, stopAt, debug_element, createFunction) {
            this.name = name;
            this.time = 0;
            this.stopAt = stopAt;
            this.timerOn = false;
            this.tick = tick;
            this.intervalTimer = function () {},
                this.startTime = function () {
                    if (!this.timerOn) {
                        this.timerOn = true;
                        var cTimer = this;
                        this.intervalTimer = setInterval(function () {
                            cTimer.time += cTimer.tick;
                            if (cTimer.stopAt && cTimer.time >= cTimer.stopAt) {
                                cTimer.pauseTime();
                            }
                            if (debug_element && debug) {
                                debug_element.innerHTML = cTimer.time;
                            }
                            if (createFunction) {
                                createFunction(cTimer);
                            }
                        }, this.tick);
                    }
                },
                this.pauseTime = function () {
                    clearInterval(this.intervalTimer);
                    this.timerOn = false;
                },
                this.resetTime = function () {
                    this.time = 0;
                }
        };


        //create an iframe for post request that will be removed once the request has been sent
        function createPayloadFrame(jsonObject) {
            //create friendly iframe to place ourselves inside
            var payloadIframe = document.createElement('iframe');
            var payloadIframeWindow;
            var payloadId = "snt_payload_id_" + rand_id;
            payloadIframe.setAttribute("id", payloadId);
            payloadIframe.className = "report";
            payloadIframe.width = 1;
            payloadIframe.height = 1; //250 is the add height
            payloadIframe.scrolling = 'no';
            payloadIframe.style.overflow = 'hidden';
            payloadIframe.src = 'about:blank';
            payloadIframe.style.border = 'none';

            friendlyIf.parentNode.insertBefore(payloadIframe, friendlyIf);

            payloadIframeWindow = payloadIframe.contentWindow;

            //create inline html for payloadIframe
            payloadIframeWindow.document.open();
            payloadIframeWindow.document.write('<scr' + 'ipt type="text/javascript">' + sendPayload(postUrl, jsonObject) + ' </scr' + 'ipt>');
            payloadIframeWindow.document.close();

            // once postMsg sent the remove the iframe
            var reporting = document.getElementById(payloadId);
            if (typeof reporting.remove === 'function') {
                reporting.remove();
            } else {
                reporting.outerHTML = '';
            }
        }

        function sendPayload(url, jsonObject) {
            try {
                if (typeof jsonObject == 'object') {
                    var postXML = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                    postXML.open("POST", url, true);
                    postXML.send(JSON.stringify(jsonObject))
                        // setTimeout(function(){
                        //   postXML.abort(); // aborts the xhttp and sets readyState to 0 as (UNSENT)
                        // },200);
                }
            } catch (e) {
                console.warn("Product Analytics Error in Post Request", e)
            }
        }


        var jsonInfo = {
            "ac": "answered correctly - number 0||1", //correct
            "bo": "bounce - number == should only ever be 1, never more than due to submission on a payload level. 0||1 ", // bounce
            "cl": "clicks - number == amount since last payload CURRENT||RESETS", //total clicks
            "eb": "total embeds - number == amount since last payload CURRENT", //total embeds on the page
            "ed": "engage dwell - number == amount since last payload CURRENT||RESETS", //engaged dwell
            "ev": "embed views - number == should only ever be 1, never more than due to submission on a payload level CURRENT", // embed views
            "mo": "mobile - boolean 0||1", //mobile
            "pa": "partner id - number", //partner id
            "pl": "placement id - string", //placement id
            "qi": "question id - number",
            "qv": "question views - number == should only ever be 1, never more than due to submission on a payload level CURRENT", // question views
            "qz": "qz == quiz id - number", //quiz id
            "si": "session id - string", // i need to generate this myself
            "sp": "skipped question - number 0||1", //skip
            "vd": "view dwell - number == amount since last payload CURRENT||RESETS", //view dwell after engagements
            "w1": "answered wrong 1 - number 0||1", //wrong 1
            "w2": "answered wrong 2 - number 0||1", //wrong 2
            "w3": "answered wrong 3 - number 0||1", //wrong 3
            "zv": "quiz views - number == should only ever be 1, never more than due to submission on a payload level CURRENT" // quiz views
        };

        function updatePayload(send) {
            if (triviaFail <= 10) {
                try {
                    storeSession = storeSessionFn.get();
                    if (view && (storeSession['quizId'] != quizId)) {
                        quiz_views = 1;
                        storeSession['quizId'] = quizId;
                        storeSessionFn.set(storeSession);
                    }
                    storeSession['quizId'];

                    jsonObject = {
                        "ac": answered_correctly ? answered_correctly : 0, //correct
                        "bo": bounce, // bounce
                        "cl": total_clicks ? total_clicks : 0, //total clicks
                        "eb": total_embeds ? total_embeds : 0, //total embeds on the page
                        "ed": engageDwell ? engageDwell.time : 0, //engaged dwell
                        "ev": embed_view, // embed views
                        "mo": userAgentObj.mobile ? 1 : 0, //mobile
                        "pa": query.event.p, //partner id
                        "pl": query.event.z && query.event.z != '' ? query.event.z : 0, //placement id
                        "qi": questionId.toString(),
                        "qv": question_view ? question_view : 0, // question views
                        "qz": quizId, //quiz id
                        "si": sessionId, // i need to generate this myself
                        "sp": skipped ? skipped : 0, //skip
                        "vd": viewDwell ? viewDwell.time : 0, //view dwell
                        "w1": answered_wrong_1 ? answered_wrong_1 : 0, //wrong 1
                        "w2": answered_wrong_2 ? answered_wrong_2 : 0, //wrong 2
                        "w3": answered_wrong_3 ? answered_wrong_3 : 0, //wrong 3
                        "zv": quiz_views // quiz views
                    };

                    isMobile = jsonObject['mo'];

                    if (send == 'send') {
                        createPayloadFrame(jsonObject);
                        jsonObject = {};
                        resetAnalytics();
                    } else {
                        // for (var obj in jsonObject) {
                        //     log(obj + ':' + jsonObject[obj] + jsonInfo[obj]);
                        // };
                    }
                } catch (e) {
                    triviaFail++;
                    console.log('%cerror updating payload                                                     ', 'background: linear-gradient(#7a0000, #000000); border: 1px solid #3E0E02; color: white');
                    console.warn(e);
                }
            }
        }


        function analyticsSetAnswer(selection) { //TODO make a better analytics too hardcoded
            switch (selection) {
            case 'correct':
                answered_correctly = 1;
                break;
            case 'wrong_1':
                answered_wrong_1 = 1;
                break;
            case 'wrong_2':
                answered_wrong_2 = 1;
                break;
            case 'wrong_3':
                answered_wrong_3 = 1;
                break;
            default:
                break
            }
        }


        function analyticsWindowFocus() {
            var focused = true;

            var hidden = "hidden";

            // Standards:
            if (hidden in document)
                document.addEventListener("visibilitychange", onchange);
            else if ((hidden = "mozHidden") in document)
                document.addEventListener("mozvisibilitychange", onchange);
            else if ((hidden = "webkitHidden") in document)
                document.addEventListener("webkitvisibilitychange", onchange);
            else if ((hidden = "msHidden") in document)
                document.addEventListener("msvisibilitychange", onchange);
            // IE 9 and lower:
            else if ("onfocusin" in document)
                document.onfocusin = document.onfocusout = onchange;
            // All others:
            else
                window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

            function onchange(evt) {
                var v = "visible",
                    h = "hidden",
                    evtMap = {
                        focus: v,
                        focusin: v,
                        pageshow: v,
                        blur: h,
                        focusout: h,
                        pagehide: h
                    };

                evt = evt || window.event;

                storeSession = storeSessionFn.get();

                if (this[hidden]) {
                    isActive = false;
                    storeSession['before_time'] = Date.now();
                    storeSession['after_time'] = Date.now();
                    storeSession['session_id'] = storeSession.session_id ? storeSession.session_id : sessionId;

                    sessionStorage.setItem('snt_trivia_analytics', JSON.stringify(storeSession));
                } else {
                    isActive = true;
                    storeSession['before_time'] = storeSession['before_time'] ? storeSession['before_time'] : Date.now();
                    storeSession['after_time'] = Date.now();
                    storeSession['session_id'] = storeSession.session_id ? storeSession.session_id : sessionId;
                    sessionStorage.setItem('snt_trivia_analytics', JSON.stringify(storeSession));
                }
                if ((storeSession['after_time'] - storeSession['before_time']) >= timeToLive) {
                    getIgloo(); // RESET ENTIRE TEST
                }
            }

            // set the initial state (but only if browser supports the Page Visibility API)
            if (document[hidden] !== undefined)
                onchange({
                    type: document[hidden] ? "blur" : "focus"
                });
        }

        function set_idle_listeners() { //setup the event listeners if user becomes active trigger start timer
            window.top.document.addEventListener("mousemove", start_timer, false);
            window.top.document.addEventListener("mousedown", start_timer, false);
            window.top.document.addEventListener("keypress", start_timer, false);
            window.top.document.addEventListener("DOMMouseScroll", start_timer, false);
            window.top.document.addEventListener("mousewheel", start_timer, false);
            window.top.document.addEventListener("touchstart", start_timer, false);
            window.top.document.addEventListener("touchmove", start_timer, false);
            window.top.document.addEventListener("MSPointerMove", start_timer, false);

            var debugSession = window.top.document.getElementById('sessionTest');
            if (!widgetEngaged || !view) {
                if (sessionTimer) {
                    if (!sessionTimer.timerOn) {
                        sessionTimer.startTime();
                    }
                } else {
                    sessionTimer = new timer('session', 100, timeToLive, debugSession, function (event) {
                        if (event.time >= event.stopAt) {
                            event.pauseTime();
                            event.resetTime();
                            sessionStorage.removeItem('snt_trivia_analytics');
                            getIgloo(); // RESET ENTIRE TEST
                        }
                    }); //timeToLive in (ms) is 10 minutes
                    sessionTimer.startTime();
                }
            } else {
                sessionTimer.pauseTime();
                sessionTimer.resetTime();
            }
        }

        function start_timer() { //if user becomes active, remove event listeners so we dont polute the event space
            window.top.document.removeEventListener("mousemove", start_timer, false);
            window.top.document.removeEventListener("mousedown", start_timer, false);
            window.top.document.removeEventListener("keypress", start_timer, false);
            window.top.document.removeEventListener("DOMMouseScroll", start_timer, false);
            window.top.document.removeEventListener("mousewheel", start_timer, false);
            window.top.document.removeEventListener("touchstart", start_timer, false);
            window.top.document.removeEventListener("touchmove", start_timer, false);
            window.top.document.removeEventListener("MSPointerMove", start_timer, false);

            isActive = true;
            sessionTimer.pauseTime();
            sessionTimer.resetTime();

            dwellLimitTimer.resetTime();
            dwellLimitTimer.startTime();

            if (!widgetEngaged) {
                set_idle_listeners();
            }
        }

        function analyticsSession() {
            var sessionTest,
                s_id;

            var sstorage = storeSessionFn.get();
            sessionId = sstorage && sstorage.session_id ? sstorage.session_id : randomString(16); //Generate a session ID
            sstorage.session_id = sessionId;
            storeSessionFn.set(sstorage);

            set_idle_listeners();
        }


        function analyticsViewScroll() {
            try {
                var viewTest,
                    createTimer;

                var payloadTimer = 500, // (ms) Initial payload timer 0.5 seconds
                    payloadLimit = 10000,
                    payloadTempTimer = 0; // (ms) Initial payload limit 10 seconds

                // if (!window.document.getElementById('viewTest')) {
                //     viewTest = window.document.createElement('div');
                //     viewTest.id = 'viewTest';
                //     viewTest.style = "position:fixed;top:0;right:0;background:black;color:white;font-size:20px;z-index:100";
                //     window.document.body.insertBefore(viewTest, window.document.body.firstElementChild);
                // }

                var debugView = window.document.getElementById('viewTest');

                var debugTimer = window.document.getElementById('viewDwell');

                viewDwell = viewDwell ? viewDwell : new timer('view', 100, null, debugTimer, function (event) {
                    if (event.time >= 1000 && viewEngaged && question_view < 1) {
                        question_view = 1;
                    }

                    if (!widgetEngaged && !dwellLimitTimer.timerOn) {
                        isActive = false;
                    }
                    if (!widgetEngaged) {
                        set_idle_listeners(); // create Session Timer to listen for any event and determin if the use is idle
                        engageDwell.pauseTime();
                        if (isActive) {
                            sessionTimer.resetTime();
                            sessionTimer.pauseTime();
                            var payT = (event.time % payloadTimer);
                            if (payT == 0) {
                                payloadTempTimer += payloadTimer;
                                if(!view){// makes sure if widget is not in view to send 0 in for viewdwell.
                                  event.time = 0;
                                }
                                updatePayload('send');
                                if (payloadTempTimer == payloadLimit) {
                                    if (payloadLimit <= 10000) { //if payloadLimit is less than 10s || 10000ms
                                        payloadTimer = 1000;
                                        payloadLimit = 30000;
                                        payloadTempTimer = 0; // reset temp timer
                                    } else if (payloadLimit > 10000 && payloadLimit <= 30000) {
                                        payloadTimer = 5000;
                                        payloadLimit = 'forever';
                                        payloadTempTimer = 0;
                                    } else {
                                        //Should Never Get HERE
                                    }
                                }
                            } // payT
                        }
                    } // widgetEngaged
                });


                window.top.addEventListener("scroll", function () { // create listener on scroll to detect if widget in view
                    if (!viewDwell) {
                        viewDwell = new timer('view', 100, null, debugTimer);
                    }
                    view = iglooAnalytics('view');

                    embed_view = view ? 1 : embed_view; // if view is true then set it to 1 otherwise keep its current state;
                    if (debugView) {
                        debugView.innerHTML = 'view: ' + view;
                    }

                    if (view && widgetEngaged) { //if in view and engaged set and flag that will always run the viewDwell whenever in view
                        viewEngaged = true;
                    } else {
                        viewEngaged = !view && !viewEngaged ? false : viewEngaged;
                    }
                    if (view) { // if trivia is in view & timer isnt on & trivia is engaged => start timer
                        viewDwell.startTime();
                    } else {
                        engageDwell.pauseTime();
                        viewDwell.pauseTime();
                        set_idle_listeners(); // create Session Timer to listen for any event and determin if the use is idle
                    }
                });

                // to be able to initially run the scroll event listener;
                window.top.scrollTo(window.top.scrollX, window.top.scrollY - 1);
                window.top.scrollTo(window.top.scrollX, window.top.scrollY + 1);
            } catch (e) {
                console.warn('ViewScroll Error', e);
            }
        }


        function analyticsDwellEngagement() {
            try {
                var dwellTest,
                    createTimer,
                    dwellLimit;

                widgetEngaged = false; // by running this make sure to set all values to its default

                // if (!window.document.getElementById('dwellTest')) {
                //     dwellTest = window.document.createElement('div');
                //     dwellTest.id = 'dwellTest';
                //     dwellTest.style = "position:fixed;top:0;left:0;background:black;color:white;font-size:20px;z-index:100";
                //     window.document.body.insertBefore(dwellTest, window.document.body.firstElementChild);
                // }
                var debugDwell = window.document.getElementById('dwellTest');

                var dwellTime = window.document.getElementById('engageDwell');

                var debugLimit = window.document.getElementById('dwellLimit');

                engageDwell = new timer('dwell', 100, null, dwellTime);
                dwellLimitTimer = new timer('dwellLimit', 100, 10000, debugLimit, function (event) {
                    if ((event.time >= event.stopAt) && engageDwell) {
                        isActive = false;

                        if (engageDwell.timerOn) {
                            engageDwell.time = engageDwell.time - event.stopAt;
                        }
                        bounce = 1; // trivia engaged the question is now always able to be a bounced question until user clicks next question then metrics will change;
                        engageDwell.pauseTime();
                        sessionTimer.resetTime();
                        updatePayload('send');
                        if (!view) {
                            viewDwell.pauseTime();
                        }
                        widgetEngaged = false;

                    }
                }); //create new timer with limit of 10 seconds

                // debugDwell.innerHTML = 'dwell: ' + widgetEngaged; //initlal debug

                sntTriviaContent.onmouseover = function () { // create listener if widget becomes engaged
                    dwellLimitTimer.resetTime();
                    if (!widgetEngaged) {
                        widgetEngaged = true;
                        viewEngaged = true;

                        engageDwell.startTime();
                        dwellLimitTimer.startTime();

                        if (!viewDwell.timerOn) {
                            viewDwell.startTime();
                        }

                        if (viewEngaged && !triviaStarted) {
                            //once engaged reset score and timer for first time engagement
                            adjustIntervalScoreFn('clear');
                            adjustIntervalScoreFn();
                        }
                        triviaStarted = true;

                    } else {
                        dwellLimitTimer.resetTime();
                    }
                }

            } catch (e) {
                console.warn('DwellEngagement Error', e);
            }
        }


        function analyticsClick() {
            sntTriviaContent.onclick = function () { // tract every click event within the widget
                sendPostMessageToIgloo(postObject, 5);
                total_clicks++;
            }
        }

        function checkEmbeds() {
            var widgetContainers = window.document.getElementsByClassName('twiframe');
            if (widgetContainers) {
                total_embeds = widgetContainers.length;
                friendlyIf.id = !friendlyIf.id && friendlyIf.id != '' ? friendlyIf.id : 'trivia_id_' + total_embeds;
                sntTriviaContent = friendlyIframe;
            } else {
                console.warn('No widget containers found');
            }

        }

        function resetAnalytics() {
            if (viewDwell) {
                viewDwell.pauseTime();
                viewDwell.resetTime();
                viewDwell.startTime();
            }
            if (engageDwell) {
                engageDwell.resetTime();
            }

            total_clicks = 0;
            bounce = 1;
            skipped = 0;
            answered_correctly = 0;
            answered_wrong_1 = 0;
            answered_wrong_2 = 0;
            answered_wrong_3 = 0;
            quiz_views = 0;
        }

        /*
        ****************************************************************************************************************************************
        ****************ANALYTICS VARIABLES END*************************************************************************************************
        ****************************************************************************************************************************************
        /


        /**
        * Send a post message to every window up to the top window
        * @param  {Object}  postObject The object to send as a postMessage
        * @param  {Integer} maxLoops   The maximum number of layers to traverse up
        */
        function sendPostMessageToIgloo(postObject, maxLoops) {
            // Initialize variables
            var postWindows = [window];
            var currentWindow = window;
            var currentLoop = 0;
            maxLoops = typeof maxLoops === 'undefined' ? 10 : maxLoops;
            // Build all of the windows to send the message to
            try {
                // Loop through all of the windows
                while (currentLoop++ < maxLoops && currentWindow !== window.top) {
                    // Move up a layer
                    currentWindow = currentWindow.parent;
                    // Add to the postMessage array
                    postWindows.push(currentWindow);
                }
            } catch (e) {}

            // Send the post messages
            for (var i = 0; i < postWindows.length; i++) {
                postWindows[i].postMessage(postObject, '*');
            }
        }


        var firstRun = true; //makes sure the listeners run once
        var iglooUtilities;
        var viewTest;
        var dwellTest;
        var totalTries = 10;
        var iglooTries = 0;


        function getIgloo(windowFrame) {
            try {
                windowFrame = windowFrame ? windowFrame : window;
                if (iglooTries < totalTries) {
                    iglooTries++;
                    if (windowFrame.igloo) {
                        igloo = windowFrame.igloo;

                        checkEmbeds();
                        /*******************START ANALYTICS******************/
                        startTriviaAnalytics();
                        /******************** ANALYTICS* ******************/


                        initialSetup();
                        clearInterval(iglooUtilities);
                    } else {
                        getIgloo(windowFrame.parent);
                    }
                }
            } catch (e) {
                console.log('igloo not found after 10 tries');
            }
        }


        //Initial load Waits for the DOMContent to load
        if (firstRun == true && (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive")) { // if page is already loaded'
            firstRun = false;
            getIgloo(window);
        } else { // elseonce page has finished loading, so as not to slowdown the page load at all
            friendlyIframeWindow.document.onreadystatechange = function () {
                if (firstRun == true && (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive")) {
                    firstRun = false;
                    getIgloo(window);
                }
            }
        }
    }; //END triviaWidget()


    var firstWidgetRun = true; //makes sure the listeners run once
    function widgetSetup() {
        //Initial load Waits for the DOMContent to load
        if (firstWidgetRun == true && (document.readyState == "complete" || document.readyState == "interactive")) { // if page is already loaded'
            firstWidgetRun = false;
            createFriendlyIframe();
        } else { // elseonce page has finished loading, so as not to slowdown the page load at all
            document.onreadystatechange = function () {
                if (firstWidgetRun == true && (document.readyState == "complete" || document.readyState == "interactive")) {
                    firstWidgetRun = false;
                    createFriendlyIframe();
                }
            }
        }
    }

    //run the moment javascript file has been embeded
    widgetSetup();
})();
