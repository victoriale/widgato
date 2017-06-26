window.top.onbeforeunload = function (e) {
    updatePayload(true); // if user exits the screen before
    console.log('window onbeforeunload post sent');
};

var htmlFile = '@@import /min/index.min.html';
// var cssFile = '@@import /min/standard_styles.min.css';
// var cssWideFile = '@@import /min/wide_styles.min.css';
var friendlyIframe;
var friendlyIframeWindow;
var $;
var wideWidget = false; // flag that changes certain functions to run differently (default = false)

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

    currentScript.parentNode.insertBefore(friendlyIframe, currentScript);

    //after getting querystring from js or iframe search query set currentScript to black
    friendlyIframeWindow = friendlyIframe.contentWindow;

    //create inline html for friendlyIframe
    friendlyIframeWindow.document.open();
    friendlyIframeWindow.document.write(htmlFile);
    // friendlyIframeWindow.document.write(htmlFile + "<scr"+"ipt type='text/javascript'>triviaWidget = "+ triviaWidget() +"</scr"+"ipt>");
    friendlyIframeWindow.document.close();
    //listen to when the iframe window content has returned and send in the srcQuery if there is one before it gets
    if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") { // if page is already loaded'
        setupIframe();
    } else { // elseonce page has finished loading, so as not to slowdown the page load at all
        friendlyIframeWindow.document.onreadystatechange = function () {
            if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") {
                setupIframe();
            }
        }
    }
}

function setupIframe() {
    var srcQuery = currentScript.src.split("js?")[1];
    //determine if a query string is after the index.html location || if query is after a javascript location
    var hostname = new RegExp(document.location.hostname);
    //todo Make a better way to test locally.
    if (srcQuery != "" && srcQuery != null) {
        try {
            query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
        } catch (e) {
            console.log(e);
        }
    } else {
        if ((hostname.test('localhost') || hostname.test('w1.synapsys.us') || hostname.test('dev-w1.synapsys.us') || hostname.test('homestead.widgets')) && (document.location.search != null && document.location.search != '')) {
            query = JSON.parse(decodeURIComponent(document.location.search.substr(1)));
            // listRand = query.rand ? query.rand : Math.floor((Math.random() * 100) + 1);
            // listRand = Math.floor((Math.random() * 100) + 1);
            //FIRST THING IS SETUP ENVIRONMENTS
        }
    }

    currentScript.src = 'about:blank'; // remove src of the script to about:blank to allow more than one widget to counter IE

    //create inline style for friendlyIframe
    var style = friendlyIframeWindow.document.createElement("link");
    style.type = 'text/css';
    style.rel = 'stylesheet';
    if (query.wide != null && query.wide != '') {
        friendlyIframe.width = friendlyIframe.parentNode.clientWidth - 300; //300 being the width
        // friendlyIframe.style.maxWidth = '992px';
        friendlyIframe.height = '250';

        //CREATE LISTENER FOR RESIZE
        window.addEventListener('resize', function () {
            //set iframe to width of parent node
            friendlyIframe.width = friendlyIframe.parentNode.clientWidth;
        }, true);
        style.href = './min/wide_styles.min.css';
        wideWidget = true; //set wide flag
    } else {
        friendlyIframe.width = 300;
        style.href = './min/standard_styles.min.css';
    }


    //append the css file into iframe head
    friendlyIframeWindow.document.head.appendChild(style);

    // create variable to be used similar to jquery for id's
    $ = function (e) { // create a simple version for grabbing id's of elements
        return friendlyIframeWindow.document.getElementById(e)
    };

    /*****************************************************Start Function calls*****************************************/

    //after you get the query you set the enironment
    setupEnvironment(query);
    triviaWidget();
}

/*ABOVE CODE NEEDS TO MERGE WITH CURRENT*/

// set initial content and variables to start trivia
var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var postUrl = "https://dev-pa.synapsys.us/";
var apiCallUrl = "dev-tw-api.synapsys.us/index.php";
var imageUrl;
var query;
var embedURL = "trivia";
var currentScript = document.currentScript != null && document.currentScript.src.indexOf(embedURL) != -1 ? document.currentScript : (function () { // resolution for IE since it does not have currentScript to find the currently running script on the page
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src.indexOf(embedURL) != -1) {
            return scripts[i];
        }
    }
})();

function getEnv(env) {
    if (env.match(/^localhost\./) != null || env.match(/^dev\./) != null) {
        env = "dev";
    } else if (env.match(/^qa\./) != null) {
        env = "qa";
    } else {
        env = "prod";
    }
    return env;
}

//DEPRECATED WILL BE REPLACED WITH getENV
function synapsysENV(env) {
    if (env.match(/^localhost\./) != null || env.match(/^dev\./) != null) {
        env = 'dev-';
    } else if (env.match(/^qa\./) == 'qa.') {
        env = 'qa-';
    } else {
        env = '';
    }
    return env;
}

/***************************** SETUP ENVIRONMENTS ******************************
 * @function setupEnvironment
 * setup Environment function
 *
 * @param function widgetQuery - the query string sent back as and Object from the location.search substrings
 * to be parsed through and set for global use
 */
function setupEnvironment(widgetQuery) {
    // console.log(widgetQuery);
    query = widgetQuery;
    apiCallUrl = protocolToUse + apiCallUrl;
    var cat = widgetQuery.category;
    var group = widgetQuery.group == '' ? widgetQuery.group = null : widgetQuery.group;
    var environment = window.location.hostname.split('.')[0];
    var env;
    if (widgetQuery.env != null) {
        env = widgetQuery.env ? widgetQuery.env : 'prod';
    } else {
        env = getEnv(environment);
    }
    //setup Image Environment api
    imageUrl = protocolToUse + synapsysENV(environment) + imageUrl; // this is global call that is used for images
    log('category:    ' + cat, analyticsStyles);
    log('group:       ' + group, analyticsStyles);
    log('environment: ' + environment, analyticsStyles);
    log('env:         ' + env, analyticsStyles);

    if (cat && cat != '') {
        apiCallUrl += '?category=' + cat;
    } else {
        apiCallUrl += '?category=' + group;
    }
    log('API:         ' + apiCallUrl, analyticsStyles);
}

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
    if (!style) {
        style = defaultStyle;
    }
    // console.log('%c' + msg + '                                                                                         ', style);
}


var triviaWidget = function () {
    var rand_id = Math.floor(Math.random() * 1000);
    var currentDataSet;
    var dataQuestionTitles;

    // HTML Element variables
    var sntTriviaContent = $('snt_trivia_game');
    var widgetContainer_el = friendlyIframeWindow.document.getElementsByClassName('widget_container')[0];

    var triviaContainer_el = $('trivia_container');
    var triviaImage_el = friendlyIframeWindow.document.getElementsByClassName('trivia_image')[0];
    var triviaImageOverlay_el = friendlyIframeWindow.document.getElementsByClassName('trivia_image_overlay')[0];
    var triviaQuestion_el = friendlyIframeWindow.document.getElementsByClassName('trivia_question')[0].getElementsByTagName('p')[0];
    var triviaOptionsContainer_el = friendlyIframeWindow.document.getElementsByClassName('trivia_options')[0];
    var triviaOptions_el = friendlyIframeWindow.document.getElementsByClassName('trivia_options')[0].getElementsByTagName('li');

    var submissionOverlay_el = $("submission_overlay");
    var submissionInfoContainer_el = friendlyIframeWindow.document.getElementsByClassName("submission_display_container")[0];

    var nextQuestionButton_el = $("next_question");
    var activeQuestion_el = $("active_question");
    var userScore_el = $("user_score");
    var totalQuestions_el = $("total_questions");
    var scoreComment_el = $("score_comment");
    var skipQuestion_el = $("skip_question");

    var otherContentOptionContainer_el = friendlyIframeWindow.document.getElementsByClassName("other_content_option_container");
    var animationContainer_el = friendlyIframeWindow.document.getElementsByClassName("animation_container");
    var completedOverlay_el = $("completed_overlay");
    var correctResultDisplay_el = $("correct_result_display");

    var resultsChart_el = friendlyIframeWindow.document.getElementsByClassName("results_chart");
    var resultsChartValue_el = friendlyIframeWindow.document.getElementsByClassName("results_chart_value");
    var randomOption_el = friendlyIframeWindow.document.getElementsByClassName("random_option")[0];
    var progressBar_el = $("progress_bar");
    var intervalScore_el = $("interval_score");
    var intervalScoreQuestion_el = $("interval_score_question");
    var pixelatedContainer_el = $("pixelateContainer");
    var youGuessPercentge_el = $("percentage_of_guess");
    var intervalScoreContainer_el = $("interval_score_container");

    var pixelatedContainerHeight = pixelatedContainer_el.offsetHeight;
    var pixelatedContainerWidth = pixelatedContainer_el.offsetWidth + 2;
    var imagePath_el = "./images/";
    var url = window.location.href;

    // calculated variables
    var localDataStore;
    var finalQuestion = false;
    var totalQuestions = 5;
    var questionIterator = 1;
    var userScore = 0;
    var activeQuiz;
    var activeQuizKey;
    var dataVarSet;
    var questionKey;
    var otherContentBgImages = [];
    var quizTitles = [];
    var dataOptions;
    var totalResults;
    var correctResult;
    var correctPercentage;
    var incorrectResult;
    var incorrectPercentage;

    // var ctx = pixelateContainer.getContext('2d');
    var pixelatedImage;
    var intervalTimer;
    var pixelationInterval;
    var widgetEngaged = false; // when user has hovered and interacted with widget
    var intervalScore = 10;
    var cumulativeScore = 0;
    var totalPossibleScore = 50;


    // function set to mimick API call
    function localStorageFn() {
        // variable that stores the response of an http request
        if (window.XMLHttpRequest) {
            var xhttp = new XMLHttpRequest();
        } else {
            var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }
        console.log('1 ####### MAKE API CALL', apiCallUrl)
        xhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    // On success parse out the response
                    localDataStore = JSON.parse(this.responseText);
                    currentDataSet = localDataStore['quizzes'];
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
                    console.log('RETURNING DUMMY DATA');
                    // setTimeout(runAPI(apiCallUrl), 500)
                }
            }
        };
        xhttp.open("GET", apiCallUrl, false);
        xhttp.send();
    } //localStorageFn


    function initialSetup() {
        try {
            localStorageFn();
            console.log('API RETURNED', currentDataSet);


            /*******************START ANALYTICS******************/
            startTriviaAnalytics();
            /******************** ANALYTICS* ******************/


            // getQuizKeys();
            if (activeQuizKey) {
                console.log("CHOSEN KEY ", activeQuizKey);
            } else {
                console.log("GET RANDOM KEY ", activeQuizKey);
            }
            activeQuizKey = activeQuizKey ? activeQuizKey : arrayShuffle(getQuizKeys())[0]; //get random quiz key.
            console.log("2 ###### SET quizTitles", quizTitles);

            //filter throught quizzes and find the current active quiz by using the activeQuizKey
            activeQuiz = currentDataSet.filter(function(quiz){
              if(quiz.sub_category_id === activeQuizKey){
                return quiz;
              }
            })[0];

            quizId = activeQuizKey; // set analytics quizId to be sent into PAYLOAD
            log('quizId:    ' + quizId, analyticsStyles);
            console.log("3 ####### ACTIVE QUIZ", activeQuizKey, activeQuiz);

            dataQuestionTitles = getQuizSetKeys(activeQuiz);

            questionIterator = 1;
            finalQuestion = false;
            userScore = 0;
            cumulativeScore = 0;
            userScore_el.innerHTML = cumulativeScore;
            activeQuestion_el.innerHTML = questionIterator;
            totalQuestions_el.innerHTML = totalPossibleScore;
            // sets other options links on completed overlay views
            for (var i = 0; otherContentOptionContainer_el.length - 1 > i; i++) {
                otherContentOptionContainer_el[i].id = 'quiz_' + (i + 1);
            }
            setData();
        } catch (e) {
            console.warn("Data Error for Trivia", e);
        }
    } //initialSetup


    // gets all possible Quizzes
    function getQuizKeys() {
        var quizzes = currentDataSet;
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
        quizQuestions.forEach(function (question,i) {
            //grabs question id from meta data
            dataQuestionTitles.push(question.metadata.question_id);
        })
        // console.log('dataQuestionTitles.length', dataQuestionTitles.length);
        totalPossibleScore = dataQuestionTitles.length * 10;
        // console.log('totalPossibleScore', totalPossibleScore);
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
      try{
        triviaOptionsContainer_el.innerHTML = ''; // empty other content options so that can be reset
        triviaContainer_el.className = '';
        nextQuestionButton_el.innerHTML = "<p>Next Question</p>";
        // questionKey = 'data_' + questionIterator; //sets the data key based on question number

        console.log('questionKey', questionKey);
        questionKey = questionKey ? questionKey : arrayShuffle(dataQuestionTitles)[0]; //get random question key.

        var activeQuestion = activeQuiz.questions.filter(function(question){
          if(question.metadata.question_id === questionKey){
            return question;
          }
        })[0];

        questionId = questionKey; // set analytics questionId to be sent into PAYLOAD
        log('questionId:    ' + questionId, analyticsStyles);
        console.log('4 ####### CHOOSING Question', questionKey, activeQuestion);

        var metaData = activeQuestion.metadata,
            answerData = activeQuestion.answers,
            analyticsData = activeQuestion.analytics;
        var resultDisplay = activeQuestion ? metaData.correct_answer_result : 'Whoops!',
            backgroundImage = activeQuestion ? "url(" + imagePath_el + metaData.image + ")" : '';

        triviaQuestion_el.innerHTML = metaData.question; //inserts active question into view
        correctResultDisplay_el.innerHTML = resultDisplay; //inserts result into the submission view
        triviaImage_el.style.backgroundImage = backgroundImage; //inserts backgroundImage into view

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
            child = friendlyIframeWindow.document.createElement("li"),
            value = answerData[key],
            isCorrect = answerData[key] == metaData.correct_answer,
            selectedOption;
            child.setAttribute('class', 'button');
            child.innerHTML = '<p>' + value + '</p>';
            triviaOptionsContainer_el.appendChild(child);
            reduceTextSizeCheck(child.getElementsByTagName('p')[0]); // run options through this function to check if text size needs adjusted
            if (isCorrect) {
              child.onclick = function () {
                selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                answerSubmittedFn('correct');
                // localStorageFn.set(correctResult, incorrectResult, totalResults); //TODO replace with send post request
                setGraphInfo(activeQuestion, selectedOption, isCorrect);
              }
            } else {
              child.onclick = function () {
                selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                answerSubmittedFn('incorrect');
                // localStorageFn.set(correctResult, incorrectResult, totalResults);
                setGraphInfo(activeQuestion, selectedOption, isCorrect);
              }
            }
          }
        }
        // loop through other quiz options from data and insert link and image into view
        for (var i = 0; animationContainer_el.length > i; i++) { //subtract 1 because the last item is the shuffle button
          var thumbnailImage = currentDataSet ? "url(" + imagePath_el + currentDataSet[i].thumbnail + ")" : '';
          otherContentBgImages.push(thumbnailImage);
          animationContainer_el[i].style.backgroundImage = thumbnailImage;
        }

        adjustIntervalScoreFn(); //reset image pixelation
        if (wideWidget) {
            fireResize();
        }
      }catch(e){
        console.warn('Error in setting trivia data', e);
      }
    }; //setData


    // Set Graph values
    function setGraphInfo(activeQuestion, selectedOption, isCorrectParam) {
        console.log('%csetGraphInfo',analyticsStyles);
        console.log('%c'+isCorrectParam + ' : ' + selectedOption,payloadStyles);

        var metaData = activeQuestion.metadata,
            answerData = activeQuestion.answers,
            analyticsData = activeQuestion.analytics;

        correctPercentage = analyticsData.correct_percentage;
        incorrectPercentage = analyticsData.wrong_percentage;

        console.log('activeQuestion',activeQuestion);
        for (var i = 0; resultsChart_el.length > i; i++) {
            console.log(resultsChart_el[i]);
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
        for(var selection in answerData){
            if(selectedOption == answerData[selection]){
              var selectedPercent = analyticsData[selection+'_percentage'];//TODO a better way to do this too hard coded
              youGuessPercentge_el.innerHTML = "<b>" + selectedPercent + "%</b> of people also answered:<br> <b>" + selectedOption + ".</b>";
            }

        }
    } //setGraphInfo



    function answerSubmittedFn(answer) {
        switch (answer) {
        case 'correct':
            widgetEngaged = true;
            addIntervalScoreFn();
            // console.log('CORRECT clearInterval');
            adjustIntervalScoreFn('clear');
            submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Correct";
            if (wideWidget) {
                triviaImageOverlay_el.style.height = '230px';
            }
            intervalScoreContainer_el.style.display = 'none';
            progressBar_el.style.display = 'none';
            submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
            triviaContainer_el.className = "correct_submission";
            nextQuestionFn();
            break;
        case 'incorrect':
            widgetEngaged = true;
            // console.log('INCORRECT clearInterval');
            adjustIntervalScoreFn('clear');
            submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Incorrect";
            if (wideWidget) {
                triviaImageOverlay_el.style.height = '230px';
            }
            intervalScoreContainer_el.style.display = 'none';
            progressBar_el.style.display = 'none';
            submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
            triviaContainer_el.className = "incorrect_submission";
            nextQuestionFn();
            break;
        }
    }


    function addIntervalScoreFn() {
        console.log('5 ####### Current + IntervalScore', cumulativeScore, intervalScore);
        cumulativeScore = cumulativeScore + intervalScore;
        userScore_el.innerHTML = cumulativeScore;
        console.log('NEW SCORE ', cumulativeScore);
    } //addIntervalScoreFn


    // sets functionality for next question button
    function nextQuestionFn() {
        // if last question show results screen
        if (questionIterator >= totalQuestions) {
            nextQuestionButton_el.onclick = function () {
                showCompleteFn()
            };
            nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
        } else {
            nextQuestionButton_el.onclick = function () {
                submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
                iterateQuestion();
            };
        }
        submissionOverlay_el.classList.add('no_transition');
    } //nextQuestionFn


    function skipQuestionFn() {
        adjustIntervalScoreFn('clear');
        widgetEngaged = true;
        // if last question show results screen
        if (questionIterator >= totalQuestions) {
            showCompleteFn();
            nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
        } else {
            submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
            iterateQuestion();
        }
    } //skipQuestionFn


    // run function when last question is submitted
    function showCompleteFn() {
        var comment;
        if (cumulativeScore < 10) {
            comment = "Ouch!"
        } else if (cumulativeScore >= 10 && cumulativeScore <= 20) {
            comment = "Not Bad!"
        } else {
            comment = "Great Job!"
        }
        scoreComment_el.innerHTML = comment;
        completedOverlay_el.className = "show";
        setRandomQuizLink();
    } //showCompleteFn

    function removeQuestionIndex(key) {
        console.log('removeQuestionIndex() from dataQuestionTitles', dataQuestionTitles);
        console.log('removing questionKey', questionKey);
        var questionIndex = dataQuestionTitles.indexOf(key);
        if (questionIndex > -1) {
            dataQuestionTitles.splice(questionIndex, 1);
            ''
            console.log('removed ' + questionKey, dataQuestionTitles);
        }
        if (dataQuestionTitles.length > 0) {
            questionKey = dataQuestionTitles[0] ? dataQuestionTitles[0] : null;
            console.log('New Key', questionKey);
        }
    }

    // gets data for next question
    function iterateQuestion() {

        console.log('6 ####### iterateQuestion() REMOVING ', questionKey);
        removeQuestionIndex(questionKey);
        console.log("Questions Left", dataQuestionTitles);

        console.log('7 ####### iterate questionIterator for tooltip text');
        questionIterator++;
        activeQuestion_el.innerHTML = questionIterator; // inject active question into view
        triviaContainer_el.className = (''); // resets view
        if (questionIterator <= totalQuestions) {
            console.log('END NEW DATA SET');
            setData();
        }
    } //iterateQuestion


    // restart current quiz
    function restartFn() {
        // console.log('restartFn');
        initialSetup();
        completedOverlay_el.className = "hidden";
    } //restartFn

    function resetIntervalScore() {
        intervalScore = 10;
    }


    //adjust pixelation
    function adjustIntervalScoreFn(clear) {
        if (clear == 'clear') {
            clearInterval(intervalTimer);
            resetIntervalScore();
        } else {
            var temp = 0,
                tempCount = 0,
                progressCounter = 1,
                intervalCounter = 1000 / 10, //*--TODO- figure out a way to set this as variable and calcuate adjusting variables accordingly--*//
                intervalSeconds = 10,
                intervalMiliSeconds = 1000;

            // set counter for image animations
            intervalTimer = setInterval(function () {
                progressCounter++;
                tempCount = Math.floor(progressCounter / intervalSeconds);
                progressBar_el.style.width = progressCounter + '%';

                if (tempCount >= 0 && tempCount < 10 && temp != tempCount) {
                    temp = tempCount;
                    intervalScore--;
                }
                intervalScoreQuestion_el.innerHTML = "Q" + questionIterator + " - Points : " + intervalScore;
                if (tempCount === 10 || progressCounter === 100) { // make sure tempCount and progress Counter finish entirely
                    clearInterval(intervalTimer);

                    // clearInterval(pixelationInterval);
                    if (!widgetEngaged) {
                        var randomQuizKey = getRandomQuizKey();
                        getNewQuiz(randomQuizKey);
                    }
                }
            }, intervalMiliSeconds / intervalSeconds);
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
        questionKey = null;// since its a new random quiz then reset the current question key so that it can random a new key from a new quiz
        return randomQuizKey;
    } //getRandomQuizKey


    // gets new data if user clicks on new quiz
    function getNewQuiz(dataSetKey) {
        // console.log('getNewQuiz');
        resetIntervalScore();
        activeQuizKey = dataSetKey;
        // localStorageFn.get();
        restartFn();
    } //getNewQuiz


    window.top.onbeforeunload = function (e) {
        updatePayload('send'); // if user exits the screen before
        console.log('window onbeforeunload post sent');
    };

    /*****************ANALYTICS VARIABLES **************************/
    //global variables used for payload
    var sessionId,
        partnerId,
        placementId;

    var viewTimer,
        dwellTimer;

    var igloo,
        userAgentObj,
        category,
        quizId,
        questionId,
        embedTime, //time the moment client embeded widget
        total_questions_views, //When CU is engaged* (It is assumed to be in view)
        total_quiz_views, //Each time a quiz is 50%+ in view for 1+ seconds. This is recorded only once per quiz load.
        total_embed_views, //Each time an embed is 50%+ in view for 1+ seconds. This is recorded only once per embed load.
        total_clicks = 0,
        total_embeds,
        view_dwell, //Each time a quiz is 50%+ in view for any length of time. (collected every 100ms)
        engage_dwell, //When CU is engaged*, each time a question is 50%+ in view for any length of time. (collected every 100ms)
        total_bounce, //When CU is engaged*, whatever question is the last item in view (including the question results screen). This is determined in dynamoDB lambda function. Bounce rate will be calculated by dividing total_bounce by total_question_views.
        // mobile_total, // being returned by userAgentObj
        // desktop_total, // being returned by userAgentObj
        skipped, // skippped question sends 0 || 1
        answered_correctly, // correct question sends 0 || 1
        answered_wrong_1, // wrong question sends 0 || 1
        answered_wrong_2, // wrong question sends 0 || 1
        answered_wrong_3; // wrong question sends 0 || 1

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
                return igloo.utils.elementIsVisible(sntTriviaContent, null, false, 0.5);
                break;
            case 'useragent':
                log('BROWSER    =   ' + igloo.browser.name);
                log('MOBILE     =   ' + igloo.browser.mobile);
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


    //create an iframe for post request that will be removed once the request has been sent
    function createPayloadFrame(jsonObject) {
        log('Create Payload', payloadStyles);
        // console.log(jsonObject);
        //create friendly iframe to place ourselves inside
        var payloadIframe = document.createElement('iframe');
        var payloadIframeWindow;
        // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
        var payloadId = "snt_payload_id_" + rand_id;
        payloadIframe.setAttribute("id", payloadId);
        payloadIframe.className = "report";
        payloadIframe.width = 1;
        payloadIframe.height = 1; //250 is the add height
        payloadIframe.scrolling = 'no';
        payloadIframe.style.overflow = 'hidden';
        payloadIframe.src = 'about:blank';
        payloadIframe.style.border = 'none';

        friendlyIframe.parentNode.insertBefore(payloadIframe, friendlyIframe);

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
                // postXML.open("POST", url, true);
                // postXML.send(JSON.stringify(jsonObject))
                // postXML.abort(); // aborts the xhttp and sets readyState to 0 as (UNSENT)
                // console.log('json object sent and abort reponse', jsonObject);
                for (var obj in jsonObject) {
                    log(obj + '   :     ' + jsonObject[obj]);
                }
                log('SENT PAYLOAD', payloadStyles);
            }
        } catch (e) {
            console.warn("Product Analytics Error in Post Request", e)
        }
    }

    function updatePayload(send) {
        try {
            jsonObject = {
                "si": "3tdt63r", // i need to generate this myself
                "pa": query.event.p, //partner id
                "pl": query.event.z, //placement id
                "qz": "yu987fyusr", //quiz id
                "qi": "9087uiucnse",
                "ac": "0", //correct
                "w1": "0", //wrong 1
                "w2": "0", //wrong 2
                "w3": "0", //wrong 3
                "sp": "0", //skip
                "ed": 123, //engaged dwell
                "vd": 53, //view dwellafter engagements
                "cl": total_clicks ? total_clicks : 0, //total clicks
                "mo": userAgentObj.mobile, //mobile
                "eb": 2 //total embeds on the page
            };

            if (send == 'send') {
                createPayloadFrame(jsonObject);
                jsonObject = {};
            } else {
                log("UPDATING PAYLOAD vvvvvvvvvv", payloadStyles);
                for (var obj in jsonObject) {
                    log(obj + '   :     ' + jsonObject[obj]);
                };
                log("UPDATING PAYLOAD ^^^^^^^^^^", payloadStyles);
            }
        } catch (e) {
            console.log('%cerror updating payload                                                     ', 'background: linear-gradient(#7a0000, #000000); border: 1px solid #3E0E02; color: white');
            console.warn(e);
        }
    }


    /**timer(name, tick, stopAt, debug_element)
     * Function to create a timer with variable features to start, stop, get, or even auto stop
     * @type {Object}
     * @key  {String}  name    give the timer a name to track
     * @key  {Number}  tick    tick is how many times the interval Timer should update the time(ms)
     * @key  {Number} stopAt  if you want the time to auto stop at a certain time(ms)
     * @key  {Object} debug_div  the element (div/span/etc..) you want to debug off of
     */
    function timer(name, tick, stopAt, debug_element) {
        this.name = name;
        this.time = 0;
        this.stopAt = stopAt;
        this.intervalTimer = function () {},
            this.start = function () {
                var cTimer = this;
                this.intervalTimer = setInterval(function () {
                    cTimer.time += tick;
                    if (cTimer.stopAt && cTimer.time >= cTimer.stopAt) {
                        cTimer.stop();
                    }
                    if (debug_element) {
                        debug_element.innerHTML = cTimer.time;
                    }
                }, tick);
            },
            this.stop = function () {
                clearInterval(this.intervalTimer);
            },
            this.getTime = function () {
                return this.time;
            }

    };

    /**
     * Manually fires off the window resize event
     */
    function fireResize(){
        if (document.createEvent) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
        }
        else { // IE
            element=document.documentElement;
            var event=document.createEventObject();
            element.fireEvent("onresize",event);
        }
    };

    function startTriviaAnalytics() {
        resetAnalytics();

        log('Data Found -- STARTING initial Analytics', analyticsStyles);
        log('IGLOO check browser && user agent --vvvvvvvvvvv--', payloadStyles);
        userAgentObj = iglooAnalytics('useragent');


        log('IGLOO Initial View check ---vvv---', payloadStyles);
        // if igloo utilities then iglooAnalytics() function will return boolean true if igloo is 50% or more in view of use window
        view = iglooAnalytics('view'); // check initial load if widget is available
        log('view       =   ' + view);


        log('IGLOO View Listening... ---vvv---', payloadStyles);
        window.onscroll = function () { // create listener on scroll for widget in view
            view = iglooAnalytics('view');
        }


        log('START TIMERS widget loaded in view', payloadStyles)
        var testWindow = window.top.friendlyIframeWindow.document;
        if (testWindow.getElementById('viewTest')) {
            viewTest = testWindow.getElementById('viewTest');
        } else {
            viewTest = testWindow.createElement('div');
            viewTest.id = 'viewTest';
            viewTest.style.position = 'fixed';
            viewTest.style.top = '0';
            viewTest.style.right = '0';
            testWindow.body.insertBefore(viewTest, testWindow.body.firstElementChild);
        }

        if (testWindow.getElementById('dwewllTest')) {
            dwellTest = testWindow.getElementById('dwewllTest');
        } else {
            dwellTest = testWindow.createElement('div');
            dwellTest.id = 'dwewllTest';
            dwellTest.style.position = 'fixed';
            dwellTest.style.top = '0';
            dwellTest.style.left = '0';
            testWindow.body.insertBefore(dwellTest, testWindow.body.firstElementChild);
        }

        viewTimer = new timer('view', 100, null, viewTest);
        dwellTimer = new timer('dwell', 1000, null, dwellTest);
        viewTimer.start();
        dwellTimer.start();

        // viewTest;
        // dwellTest;
        sntTriviaContent.onclick = function () { // tract every click event within the widget
            total_clicks++;
            log('total_clicks      =   ' + total_clicks);
        }

        log('Create MouseOver Interaction - Listening...', payloadStyles);
        sntTriviaContent.onmouseover = function () { // create listener if widget becomes engaged
            if (!widgetEngaged) {
                log('UpdateAnalytics', analyticsStyles);
                //content hovered has been mouse overed
                //once engaged reset score and timer for first time engagement
                adjustIntervalScoreFn('clear');
                adjustIntervalScoreFn();
                widgetEngaged = true;
                log('widgetEngaged  =   ' + widgetEngaged);
                updatePayload();
                log('END UpdateAnalytics', analyticsStyles);
            }
        }
        updatePayload('send');
        log('END initial Analytics', analyticsStyles);
    };

    function resetAnalytics() {
        if (viewTimer) {
            viewTimer.stop();
            viewTimer = null;
        }
        if (dwellTimer) {
            dwellTimer.stop();
            dwellTimer = null;
        }
    }

    /*****************ANALYTICS VARIABLES END***********************/



    // function getCurrentWindow(maxLoops) {
    //     // Initialize variables
    //     var postWindows = [window];
    //     var currentWindow = window;
    //     var currentLoop = 0;
    //     maxLoops = typeof maxLoops === 'undefined' ? 10 : maxLoops;
    //     // Build all of the windows to send the message to
    //     try {
    //         // Loop through all of the windows
    //         while (currentLoop++ < maxLoops && currentWindow !== window.top) {
    //             // Move up a layer
    //             currentWindow = currentWindow.parent;
    //             // Add to the postMessage array
    //             postWindows.push(currentWindow);
    //         }
    //     } catch (e) {}
    // }


    var firstRun = true; //makes sure the listeners run once
    var iglooUtilities;

    var viewTest;
    var dwellTest;



    function getIgloo() {
        if (window.top.igloo) {
            igloo = window.top.igloo;
            initialSetup();
            clearInterval(iglooUtilities);
        } else {
            console.log('igloo not found', window.top.igloo);
        }
    }

    //Initial load Waits for the DOMContent to load
    if (firstRun == true && (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive")) { // if page is already loaded'
        firstRun = false;
        iglooUtilities = setInterval(getIgloo, 100);;
    } else { // elseonce page has finished loading, so as not to slowdown the page load at all
        friendlyIframeWindow.document.onreadystatechange = function () {
            if (firstRun == true && (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive")) {
                firstRun = false;
                iglooUtilities = setInterval(getIgloo, 100);;
            }
        }
    }
};


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
widgetSetup() //start waldo call since its required and has no dependencies
