window.top.onbeforeunload = function (e) {
    updatePayload(true); // if user exits the screen before
    console.log('window onbeforeunload post sent');
};

/*****************ANALYTICS VARIABLES **************************/
//global variables used for payload
var userAgentObj, //checks browser, browser version, bot, and mobile variables to all be returned
    embedSize,
    category,
    view,
    embedTime,
    clicks = 0,
    engageDwell,
    viewDwell;

var sessionId,
    partnerId,
    placementId;

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
    console.log('%c' + msg + '                                                                                         ', style);
}

/**
 * This function checks if a given element is 60% or more in the viewport
 * @param  {DOMElement}  element     The element to check for visibility
 * @param  {DOMElement}  debug_div   The debugging div to put the % visible in
 * @param  {Boolean}     igloo_debug The debugging state of igloo
 * @param  {Number}      min_percent The minimum percent for an element to be
 *                                   considered in view (default 0.6)
 * @return {Boolean}                 Whether the element is in view
 */
function iglooAnalytics(type) {
    try {
        switch (type) {
        case 'view':
            log('view     =   ' + view);
            document.getElementById('scrolling-test').innerHTML = 'WidgetInView:' + view;
            return window.igloo.utils.elementIsVisible(sntTriviaContent, null, true, 0.5);
            break;
        case 'useragent':
            log('BROWSER    =   ' + window.igloo.browser.name);
            log('MOBILE     =   ' + window.igloo.browser.mobile);
            return window.igloo.browser;
            break;
        default:
            console.warn('igloo Utility not found', e);
            break;
        }
    } catch (e) {
        console.warn('igloo not found', e);
    }
}

/** https://github.com/passit/adstack/blob/adstack/prod/src/js/IglooModule.js#L37
 * This object describes the current browser including name, version, mobile,
 * and bot
 * @type {Object}
 * @key  {String}  name    The name of the broswer (Chrome, IE, etc)
 * @key  {String}  version The version of the browser
 * @key  {Boolean} bot     Whether the browser is a bot or not
 * @key  {Boolean} mobile  Whether the browser is mobile or not
 */
function getUserAgent() {
    try {
        log('BROWSER    =   ' + window.igloo.browser.name);
        log('MOBILE     =   ' + window.igloo.browser.mobile);
        return window.igloo.browser;
    } catch (e) {
        console.warn('igloo Utilities not found', e);
    }
}

//create an iframe for post request that will be removed once the request has been sent
function createPostRequestIframe(jsonObject) {
    log('Create Initial Payload', payloadStyles);
    // console.log(jsonObject);
    //create friendly iframe to place ourselves inside
    var friendlyIframe = document.createElement('iframe');
    // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
    var uniqueIframeId = "snt_product_id_" + rand_id;
    friendlyIframe.setAttribute("id", uniqueIframeId);
    friendlyIframe.className = "report"
    friendlyIframe.width = 1;
    friendlyIframe.height = 1; //250 is the add height
    friendlyIframe.scrolling = 'no';
    friendlyIframe.style.overflow = 'hidden';
    friendlyIframe.src = 'about:blank';
    friendlyIframe.style.border = 'none';
    document.body.appendChild(friendlyIframe);
    friendlyIframeWindow = friendlyIframe.contentWindow;

    //create inline html for friendlyIframe
    friendlyIframeWindow.document.open();
    friendlyIframeWindow.document.write('<scr' + 'ipt type="text/javascript">' + sendPayload(postUrl, jsonObject) + ' </scr' + 'ipt>');
    friendlyIframeWindow.document.close();

    // once postMsg sent the remove the iframe
    if (typeof document.getElementById(uniqueIframeId).remove === 'function') {
        document.getElementById(uniqueIframeId).remove();
    } else {
        document.getElementById(uniqueIframeId).outerHTML = '';
    }
}

function sendPayload(url, jsonObject) {
    try {
        if (typeof jsonObject == 'object') {
            var postXML = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            postXML.open("POST", url, true);
            postXML.send(JSON.stringify(jsonObject))
                // postXML.abort(); // aborts the xhttp and sets readyState to 0 as (UNSENT)
                // console.log('json object sent and abort reponse', jsonObject);
            log('SENT PAYLOAD', payloadStyles);
        }
    } catch (e) {
        console.warn("Product Analytics Error in Post Request", e)
    }
}


function renderTime() {
    var currentTime = new Date();
    var h = currentTime.getUTCHours();
    var m = currentTime.getUTCMinutes();
    var s = currentTime.getUTCSeconds();
    var ms = currentTime.getUTCMilliseconds();
    setTimeout('renderTime()', 1);
    if (h == 0) {
        h = 12;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    if (ms < 1000) {
        ms = ms;
    }
    document.getElementById("timer").innerHTML = h + ":" + m + ":" + s + ":" + ms;
    return h + ":" + m + ":" + s + ":" + ms;
}

function updatePayload(send) {
    try {
        jsonObject = {
            "3tdt63r": { //session id
                "pa": "vhfiuv", //partner id
                "pl": "fvuyhf908r9", //placement id
                "qz": "yu987fyusr", //quiz id
                "9087uiucnse": { //questionID
                    "ac": "0", //correct
                    "w1": "0", //wrong 1
                    "w2": "1", //wrong 2
                    "w3": "0", //wrong 3
                    "sp": "0" //skip
                },
                "ed": 123, //engaged dwell
                "vd": view, //view dwellafter engagement
                "cl": clicks, //total clicks
                "mo": userAgentObj.mobile, //mobile
                "eb": 2 //total embeds on the page
            },
        };
        if (send) {
            createPayloadFrame(jsonObject);
        } else {
            console.log('CURRENT PAYLOAD UPDATE:', jsonObject);
        }
    } catch (e) {
        console.log('%cerror updating payload                                                     ', 'background: linear-gradient(#7a0000, #000000); border: 1px solid #3E0E02; color: white');
        console.warn(e);
    }
}

/*****************ANALYTICS VARIABLES END***********************/

//TEST AJAX POST REQUEST
var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var postUrl = "http://dev-trivia-ingest.ppipwhzncn.us-east-1.elasticbeanstalk.com/";
var apiCallUrl;
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

var rand_id = Math.floor(Math.random() * 1000);
var currentDataSet;
var dataQuestionTitles;

// HTML Element variables
var sntTriviaContent = document.getElementById('snt_trivia_game');

var triviaContainer_el = document.getElementById('trivia_container');
var triviaImage_el = document.getElementsByClassName('trivia_image')[0];
var triviaImageOverlay_el = document.getElementsByClassName('trivia_image_overlay')[0];
var triviaQuestion_el = document.getElementsByClassName('trivia_question')[0].getElementsByTagName('p')[0];
var triviaOptionsContainer_el = document.getElementsByClassName('trivia_options')[0];
var triviaOptions_el = document.getElementsByClassName('trivia_options')[0].getElementsByTagName('li');

var submissionOverlay_el = document.getElementById("submission_overlay");
var submissionInfoContainer_el = document.getElementsByClassName("submission_display_container")[0];

var nextQuestionButton_el = document.getElementById("next_question");
var activeQuestion_el = document.getElementById("active_question");
var userScore_el = document.getElementById("user_score");
var totalQuestions_el = document.getElementById("total_questions");
var scoreComment_el = document.getElementById("score_comment");
var skipQuestion_el = document.getElementById("skip_question");

var otherContentOptionContainer_el = document.getElementsByClassName("other_content_option_container");
var animationContainer_el = document.getElementsByClassName("animation_container");
var completedOverlay_el = document.getElementById("completed_overlay");
var correctResultDisplay_el = document.getElementById("correct_result_display");

var resultsChart_el = document.getElementsByClassName("results_chart");
var resultsChartValue_el = document.getElementsByClassName("results_chart_value");
var randomOption_el = document.getElementsByClassName("random_option")[0];
var progressBar_el = document.getElementById("progress_bar");
var intervalScore_el = document.getElementById("interval_score");
var intervalScoreQuestion_el = document.getElementById("interval_score_question");
var pixelatedContainer_el = document.getElementById("pixelateContainer");
var youGuessPercentge_el = document.getElementById("percentage_of_guess");
var intervalScoreContainer_el = document.getElementById("interval_score_container");

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
var activeDataSet;
var activeDataSetKey;
var dataVarSet;
var dataKey;
var otherContentBgImages = [];
var dataSetTitles = [];
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


// fake data
var triviaData2 = {
    dataSet_1: {
        data_1: {
            question: "Which actor has won has won two Academy Awards?",
            options: {
                "1": {
                    value: "Daniel Day-Lewis",
                    correct: false
                },
                "2": {
                    value: "Kevin Costner",
                    correct: true
                },
                "3": {
                    value: "Jack Nicholson",
                    correct: false
                },
                "4": {
                    value: "Walter Brennan",
                    correct: false
                }
            },
            correct_result: "Kevin Costner",
            image: "kevin_costner.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_2: {
            question: "On the CBS sitcom \"The Big Bang Theory,\" which actor plays Dr. Sheldon Cooper?",
            options: {
                "1": {
                    value: "Jim Parsons",
                    correct: true
                },
                "2": {
                    value: "Jon Cryer",
                    correct: false
                },
                "3": {
                    value: "Kevin James",
                    correct: false
                },
                "4": {
                    value: "Ed O'Neill",
                    correct: false
                }
            },
            correct_result: "Jim Parsons",
            image: "jim_parsons.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_3: {
            question: "Which animated comedy aired its first episode in 1989?",
            options: {
                "1": {
                    value: "Family Guy",
                    correct: false
                },
                "2": {
                    value: "The Simpsons",
                    correct: true
                },
                "3": {
                    value: "Archer",
                    correct: false
                },
                "4": {
                    value: "Rick and Morty",
                    correct: false
                }
            },
            correct_result: "The Simpsons",
            image: "the_simpsons.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_4: {
            question: "Which band holds the Billboard record for the most number-one singles with 20?",
            options: {
                "1": {
                    value: "Mariah Carey",
                    correct: false
                },
                "2": {
                    value: "The Rolling Stones",
                    correct: false
                },
                "3": {
                    value: "The Beatles",
                    correct: true
                },
                "4": {
                    value: "The Eagles",
                    correct: false
                }
            },
            correct_result: "The Beatles",
            image: "the_beatles.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_5: {
            question: "With adjustment for inflation, which film had the largest box office gross?",
            options: {
                "1": {
                    value: "Avatar",
                    correct: false
                },
                "2": {
                    value: "The Sound of Music",
                    correct: false
                },
                "3": {
                    value: "Gone With the Wind",
                    correct: true
                },
                "4": {
                    value: "Titanic",
                    correct: false
                }
            },
            correct_result: "Gone With the Wind",
            image: "gone_with_the_wind.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        }
    },
    dataSet_2: {
        data_1: {
            question: "Which of these films did not win the Academy Award for Best Picture?",
            options: {
                "1": {
                    value: "Chicago",
                    correct: false
                },
                "2": {
                    value: "Pulp Fiction",
                    correct: true
                },
                "3": {
                    value: "Moonlight",
                    correct: false
                },
                "4": {
                    value: "Dances with Wolves",
                    correct: false
                }
            },
            correct_result: "Pulp Fiction",
            image: "pulp_fiction.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_2: {
            question: "Which actress has won the most Academy Awards for Best Actress?",
            options: {
                "1": {
                    value: "Meryl Streep",
                    correct: false
                },
                "2": {
                    value: "Emma Stone",
                    correct: false
                },
                "3": {
                    value: "Katharine Hepburn",
                    correct: true
                },
                "4": {
                    value: "Rita Hayworth",
                    correct: false
                }
            },
            correct_result: "Katharine Hepburn",
            image: "katherine_hepburn.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_3: {
            question: "Which artist holds the record for most solo albums on the Billboard 200?",
            options: {
                "1": {
                    value: "Michael Jackson",
                    correct: false
                },
                "2": {
                    value: "Jay-Z",
                    correct: true
                },
                "3": {
                    value: "Aertha Franklin",
                    correct: false
                },
                "4": {
                    value: "Beyoncé",
                    correct: false
                }
            },
            correct_result: "Jay-Z",
            image: "jayz_4.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_4: {
            question: "Which rap artists released his chart-topping album \"Views\" in 2016?",
            options: {
                "1": {
                    value: "Lil Wayne",
                    correct: false
                },
                "2": {
                    value: "2-Chains",
                    correct: false
                },
                "3": {
                    value: "Kanye West",
                    correct: false
                },
                "4": {
                    value: "Drake",
                    correct: true
                }
            },
            correct_result: "Drake",
            image: "drake.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_5: {
            question: "Which Martin Scorsese film had the largest box office opening?",
            options: {
                "1": {
                    value: "Goodfellas",
                    correct: false
                },
                "2": {
                    value: "Shutter Island",
                    correct: true
                },
                "3": {
                    value: "The Wolf of Wall Street",
                    correct: false
                },
                "4": {
                    value: "Cape Fear",
                    correct: false
                }
            },
            correct_result: "Shutter Island",
            image: "shutter_island.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        }
    },
    dataSet_3: {
        data_1: {
            question: "In 2017 which album did Adele win the Album of the Year for?",
            options: {
                "1": {
                    value: "Rolling in the Deep",
                    correct: false
                },
                "2": {
                    value: "28",
                    correct: false
                },
                "3": {
                    value: "19",
                    correct: false
                },
                "4": {
                    value: "25",
                    correct: true
                }
            },
            correct_result: "25",
            image: "adele_25.jpg",
            thumbnails: ["adele_25.jpg", "pulp_fiction.jpg", "kevin_costner.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_2: {
            question: "Simon is the name of whos husband?",
            options: {
                "1": {
                    value: "Adele",
                    correct: true
                },
                "2": {
                    value: "Taylor Swift",
                    correct: false
                },
                "3": {
                    value: "Carrie Underwood",
                    correct: false
                },
                "4": {
                    value: "Mariah Carey",
                    correct: false
                }
            },
            correct_result: "Adele",
            image: "simon.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_3: {
            question: "What is the name of Adele's first hit song?",
            options: {
                "1": {
                    value: "Chasing Pavements",
                    correct: true
                },
                "2": {
                    value: "Hello",
                    correct: false
                },
                "3": {
                    value: "Lemonade",
                    correct: false
                },
                "4": {
                    value: "Love in the Dark",
                    correct: false
                }
            },
            correct_result: "Chasing Pavements",
            image: "chasing_pavements.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_4: {
            question: "In which country was Adele born?",
            options: {
                "1": {
                    value: "England",
                    correct: true
                },
                "2": {
                    value: "Australia",
                    correct: false
                },
                "3": {
                    value: "United States",
                    correct: false
                },
                "4": {
                    value: "Westeros",
                    correct: false
                }
            },
            correct_result: "England",
            image: "england_flag.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        },
        data_5: {
            question: "What is the name of Adele's most recent album?",
            options: {
                "1": {
                    value: "19",
                    correct: false
                },
                "2": {
                    value: "Hello",
                    correct: false
                },
                "3": {
                    value: "25",
                    correct: true
                },
                "4": {
                    value: "28",
                    correct: false
                }
            },
            correct_result: "25",
            image: "adele_25.jpg",
            thumbnails: ["the_beatles.jpg", "drake.jpg", "chasing_pavements.jpg"],
            results: {
                total: 0,
                correct: 0,
                incorrect: 0
            }
        }
    }
}


// function set to mimick API call
var localStorageFn = {
        get: function () {
            console.log("2 ####### local storage found localGET");
            // window.localStorage.clear();
            if (localStorage.getItem('triviaData2') === null) {
                localDataStore = localStorage.setItem('triviaData2', JSON.stringify(triviaData2));
            }
            localDataStore = JSON.parse(localStorage.getItem('triviaData2'));
            return localDataStore;
        },
        set: function (correctResult, incorrectResult, totalResults) {
            console.log("2 ####### no local storage found localSET");
            localDataStore[activeDataSetKey][dataKey].results.correct = correctResult;
            localDataStore[activeDataSetKey][dataKey].results.incorrect = incorrectResult;
            localDataStore[activeDataSetKey][dataKey].results.total = totalResults;
            localStorage.setItem('triviaData2', JSON.stringify(localDataStore));
        }
    } //localStorageFn


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
    console.log(widgetQuery);
    apiCallUrl = protocolToUse;
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
}


// set initial content and variables to start trivia
console.log('1 ####### initialSetup');

initialSetup();

// function productAnalytics(jsonObject) {
//     console.log('test');
// }

function initialSetup() {
    //start detecting analytics once user mouse over content
    var srcQuery = currentScript.src.split("js?")[1];
    //determine if a query string is after the index.html location || if query is after a javascript location
    var hostname = new RegExp(document.location.hostname);
    if (hostname.test('localhost') || hostname.test('w1.synapsys.us') || hostname.test('dev-w1.synapsys.us') || hostname.test('homestead.widgets') && (document.location.search != null && document.location.search != '')) {
        query = JSON.parse(decodeURIComponent(document.location.search.substr(1)));
        // listRand = query.rand ? query.rand : Math.floor((Math.random() * 100) + 1);
        // listRand = Math.floor((Math.random() * 100) + 1);
        //FIRST THING IS SETUP ENVIRONMENTS
    } else {
        if (srcQuery != "" && srcQuery != null) {
            try {
                query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
            } catch (e) {
                console.log(e);
            }
        }
    }
    setupEnvironment(query);

    renderTime();

    currentDataSet = localStorageFn.get();
    console.log('API RETURNED', currentDataSet);

    /*******************START ANALYTICS******************/
    log('Data Found -- STARTING initial Analytics', analyticsStyles);

    log('IGLOO check browser && user agent --vvvvvvvvvvv--', payloadStyles);
    userAgentObj = iglooAnalytics('useragent');

    /**** TODO
    userAgentObj, //checks browser, browser version, bot, and mobile variables to all be returned <-- DONE
    embedSize, // TODO more checks needed
    category, // TODO coming from api or query
    view,
    embedTime,
    clicks,
    engageDwell,
    viewDwell;
    ****/
    log('IGLOO Initial View check ---vvv---', payloadStyles);
    view = iglooAnalytics('view');
    log(view ? view : 'false');
    log('IGLOO View Listening... ---vvv---', payloadStyles);
    window.onscroll = function () {
        view = iglooAnalytics('view');
    }
    sntTriviaContent.onclick = function () {
        clicks++;
        log('clicks      =   ' + clicks, );
    }

    log('Create MouseOver Interaction - Listening...', payloadStyles);
    sntTriviaContent.onmouseover = function () {
        if (!widgetEngaged) {
            log('UpdateAnalytics', analyticsStyles);
            //content hovered has been mouse overed
            widgetEngaged = true;
            log('widgetEngaged  =   ' + widgetEngaged);
            updatePayload(true);
            log('END UpdateAnalytics', analyticsStyles);
        }
    }
    updatePayload();
    log('END initial Analytics', analyticsStyles);
    /******************** ANALYTICS* ******************/
    // getDataSetKeys();
    if (activeDataSetKey) {
        console.log("CHOSEN KEY ", activeDataSetKey);
    } else {
        console.log("GET RANDOM KEY ", activeDataSetKey);
    }
    activeDataSetKey = activeDataSetKey ? activeDataSetKey : arrayShuffle(getDataSetKeys())[0]; //get random dataset key. <== needs to be looked at again TODO
    activeDataSet = currentDataSet[activeDataSetKey];
    console.log("3 ####### ", activeDataSetKey, activeDataSet);
    dataQuestionTitles = getQuizSetKeys(activeDataSet);

    questionIterator = 1;
    finalQuestion = false;
    userScore = 0;
    cumulativeScore = 0;
    userScore_el.innerHTML = cumulativeScore;
    activeQuestion_el.innerHTML = questionIterator;
    totalQuestions_el.innerHTML = totalPossibleScore;
    // sets other options links on completed overlay views
    for (var i = 0; otherContentOptionContainer_el.length - 1 > i; i++) {
        otherContentOptionContainer_el[i].id = 'dataSet_' + (i + 1);
    }
    setData();
} //initialSetup

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

// gets all possible dataSets
function getDataSetKeys() {
    var quizes = currentDataSet;
    dataSetTitles = [];
    for (var quiz in quizes) {
        dataSetTitles.push(quiz);
    }
    return dataSetTitles;
} //getDataSetKeys

function getQuizSetKeys(data) {
    var quiz = data;
    dataQuestionTitles = [];
    for (var question in quiz) {
        dataQuestionTitles.push(question);
    }
    console.log('dataQuestionTitles.length', dataQuestionTitles.length);
    totalPossibleScore = dataQuestionTitles.length * 10;
    console.log('totalPossibleScore', totalPossibleScore);
    return dataQuestionTitles;
} //getDataSetKeys

// sets the random quiz link on the completed quiz overlay
function setRandomQuizLink() {
    randomOption_el.id = getRandomDataSetKey();
} //setRandomQuizLink


// returns a random data set key that is not the current active key
function getRandomDataSetKey() {
    var activeIndex = dataSetTitles.indexOf(activeDataSetKey);
    var withOutActiveIndex = dataSetTitles.filter(function (e) {
        return e !== activeDataSetKey
    });
    var randomDataSetKey = withOutActiveIndex[Math.floor(Math.random() * withOutActiveIndex.length)];
    return randomDataSetKey;
} //getRandomDataSetKey


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
    triviaOptionsContainer_el.innerHTML = ''; // empty other content options so that can be reset
    triviaContainer_el.className = '';
    nextQuestionButton_el.innerHTML = "<p>Next Question</p>";
    // dataKey = 'data_' + questionIterator; //sets the data key based on question number
    activeDataSet = activeDataSet ? activeDataSet : localDataStore; //sets dataset

    //TODO get below to work with dataKey and activeDataSet
    dataKey = dataKey ? dataKey : arrayShuffle(dataQuestionTitles)[0]; //get random dataset key.


    console.log('4 ####### CHOOSING Question', dataKey, activeDataSet[dataKey]);
    var question = activeDataSet[dataKey].question,
        resultDisplay = activeDataSet[dataKey] ? activeDataSet[dataKey].correct_result : 'Whoops!',
        backgroundImage = activeDataSet[dataKey] ? "url(" + imagePath_el + activeDataSet[dataKey].image + ")" : '';

    console.log(activeDataSet[dataKey].question);
    triviaQuestion_el.innerHTML = question; //inserts active question into view
    correctResultDisplay_el.innerHTML = resultDisplay; //inserts result into the submission view
    triviaImage_el.style.backgroundImage = backgroundImage; //inserts backgroundImage into view
    // graph results variables
    totalResults = activeDataSet[dataKey].results.total;
    correctResult = activeDataSet[dataKey].results.correct;
    incorrectResult = activeDataSet[dataKey].results.incorrect;
    dataOptions = arrayShuffle(activeDataSet[dataKey].options); // randomizes the object shuffling
    triviaImageOverlay_el.style.height = '97px';
    intervalScoreContainer_el.style.display = 'block';
    progressBar_el.style.display = 'block';
    submissionOverlay_el.classList.remove('no_transition');
    // loop thorugh options in data and insert values into view
    activeDataSet[dataKey].options = dataOptions;
    for (var key in dataOptions) {
        if (dataOptions.hasOwnProperty(key)) {
            var index = Number(Object.keys(dataOptions).indexOf(key)) + 1,
                child = document.createElement("li"),
                value = activeDataSet[dataKey].options[key].value,
                isCorrect = activeDataSet[dataKey].options[key].correct,
                selectedOption;
            child.setAttribute('class', 'button');
            child.innerHTML = '<p>' + value + '</p>';
            triviaOptionsContainer_el.appendChild(child);
            reduceTextSizeCheck(child.getElementsByTagName('p')[0]); // run options through this function to check if text size needs adjusted
            if (isCorrect) {
                child.onclick = function () {
                    selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                    totalResults++; //add to results
                    correctResult++;
                    answerSubmittedFn('correct');
                    localStorageFn.set(correctResult, incorrectResult, totalResults);
                    setGraphInfo(selectedOption, isCorrect);
                }
            } else {
                child.onclick = function () {
                    selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                    totalResults++; //add to results
                    incorrectResult++;
                    answerSubmittedFn('incorrect');
                    localStorageFn.set(correctResult, incorrectResult, totalResults);
                    setGraphInfo(selectedOption, isCorrect);
                }
            }
        }
    }
    // loop through other quiz options from data and insert link and image into view
    for (var i = 0; animationContainer_el.length > i; i++) { //subtract 1 because the last item is the shuffle button
        var thumbnailImage = activeDataSet[dataKey] ? "url(" + imagePath_el + activeDataSet[dataKey].thumbnails[i] + ")" : '';
        otherContentBgImages.push(thumbnailImage);
        animationContainer_el[i].style.backgroundImage = thumbnailImage;
    }

    adjustIntervalScoreFn(); //reset image pixelation
}; //setData


// get percentages of graph data values
function getPercentages(result1, result2, resultsTotal) {
    var value1 = Math.round(result1 / resultsTotal * 100) > 100 ? 100 : Math.round(result1 / resultsTotal * 100),
        value2 = 100 - value1; //values set this way to esnure demographic data adds up to 100%
    return {
        value1: value1,
        value2: value2
    };
} //getPercentages


// Set Graph values
function setGraphInfo(selectedOption, isCorrectParam) {
    correctPercentage = getPercentages(correctResult, incorrectResult, totalResults).value1;
    incorrectPercentage = getPercentages(correctResult, incorrectResult, totalResults).value2;
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
    var randomPercent = document.getElementsByClassName("correct_submission").length > 0 ? correctPercentage : Math.floor(Math.random() * (100 + 1)) //TODO - need to calculate wrong submissions instead of random
    youGuessPercentge_el.innerHTML = "<b>" + randomPercent + "%</b> of people also answered:<br> <b>" + selectedOption + ".</b>";
} //setGraphInfo


function answerSubmittedFn(answer) {
    switch (answer) {
    case 'correct':
        widgetEngaged = true;
        addIntervalScoreFn();
        console.log('CORRECT clearInterval');
        adjustIntervalScoreFn('clear');
        submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Correct";
        triviaImageOverlay_el.style.height = '230px';
        intervalScoreContainer_el.style.display = 'none';
        progressBar_el.style.display = 'none';
        submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
        triviaContainer_el.className = "correct_submission";
        nextQuestionFn();
        break;
    case 'incorrect':
        widgetEngaged = true;
        console.log('INCORRECT clearInterval');
        adjustIntervalScoreFn('clear');
        submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Incorrect";
        triviaImageOverlay_el.style.height = '230px';
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
    console.log('removing dataKey', dataKey);
    var questionIndex = dataQuestionTitles.indexOf(key);
    if (questionIndex > -1) {
        dataQuestionTitles.splice(questionIndex, 1);
        ''
        console.log('removed ' + dataKey, dataQuestionTitles);
    }
    if (dataQuestionTitles.length > 0) {
        dataKey = dataQuestionTitles[0] ? dataQuestionTitles[0] : null;
        console.log('New Key', dataKey);
    }
}

// gets data for next question
function iterateQuestion() {

    console.log('6 ####### iterateQuestion() REMOVING ', dataKey);
    removeQuestionIndex(dataKey);
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
    console.log('restartFn');
    initialSetup();
    completedOverlay_el.className = "hidden";
} //restartFn

function resetIntervalScore() {
    intervalScore = 10;
}

// gets new data if user clicks on new quiz
function getNewDataSet(dataSetKey) {
    console.log('getNewDataSet');
    resetIntervalScore();
    activeDataSetKey = dataSetKey;
    localStorageFn.get();
    restartFn();
} //getNewDataSet


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
                    var randomDataSetKey = getRandomDataSetKey();
                    getNewDataSet(randomDataSetKey);
                }
            }
        }, intervalMiliSeconds / intervalSeconds);
    }
} //adjustPixelationFn
