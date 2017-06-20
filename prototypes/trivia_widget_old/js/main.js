
    // HTML Element variables
    var triviaContainer_el = document.getElementById('trivia_container');
    var triviaImage_el = document.getElementsByClassName('trivia_image')[0];
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
    var imagePath_el = "./images/";
    var resultsChart_el = document.getElementsByClassName("results_chart");
    var resultsChartValue_el = document.getElementsByClassName("results_chart_value");
    var randomOption_el = document.getElementsByClassName("random_option")[0];
    var youGuessPercentge_el = document.getElementById("percentage_of_guess");
    var url = window.location.href;
    var facebookIcon_el = document.getElementById("facebook_icon");
    var twitterIcon_el = document.getElementById("twitter_icon");
    var googlePlusIcon_el = document.getElementById("google_plus_icon");
    var linkIcon_el = document.getElementById("link_icon");

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
    var totalPossibleScore = 5;
    var initialInteraction = false;

    // fake data
    var triviaData = {
        dataSet_1: {
            data_1: {
                question: "In which year did Adele win the Album of the Year Grammy for her album \"25\"?",
                options: {
                    "1": {
                        value: "2014",
                        correct: false
                    },
                    "2": {
                        value: "2015",
                        correct: false
                    },
                    "3": {
                        value: "2016",
                        correct: false
                    },
                    "4": {
                        value: "2017",
                        correct: true
                    }
                },
                correct_result: "2017",
                image: "adele_1.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 50,
                    incorrect: 50,
                    male: 70,
                    female: 30
                }
            },
            data_2: {
                question: "What is Adele's husband's name?",
                options: {
                    "1": {
                        value: "Simon",
                        correct: true
                    },
                    "2": {
                        value: "Carl",
                        correct: false
                    },
                    "3": {
                        value: "Logan",
                        correct: false
                    },
                    "4": {
                        value: "Angelo",
                        correct: false
                    }
                },
                correct_result: "Simon",
                image: "simon.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 10,
                    incorrect: 90,
                    male: 80,
                    female: 20
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
                image: "adele_3.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 100,
                    incorrect: 0,
                    male: 23,
                    female: 77
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
                image: "adele_4.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 15,
                    incorrect: 85,
                    male: 55,
                    female: 45
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
                image: "adele_5.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 90,
                    incorrect: 10,
                    male: 20,
                    female: 80
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
                image: "academy_award.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 100,
                    incorrect: 0,
                    male: 12,
                    female: 88
                }
            },
            data_2: {
                question: "Which of these actresses has won the most Academy Awards for Best Actress",
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
                image: "academy_award_2.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 5,
                    incorrect: 95,
                    male: 50,
                    female: 50
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
                image: "billboard_200.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 25,
                    incorrect: 75,
                    male: 36,
                    female: 64
                }
            },
            data_4: {
                question: "In which year did rap artist Drake release his chart-topping album \"Views\"?",
                options: {
                    "1": {
                        value: "2017",
                        correct: false
                    },
                    "2": {
                        value: "2012",
                        correct: false
                    },
                    "3": {
                        value: "2015",
                        correct: false
                    },
                    "4": {
                        value: "2016",
                        correct: true
                    }
                },
                correct_result: "2016",
                image: "drake.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 58,
                    incorrect: 42,
                    male: 62,
                    female: 38
                }
            },
            data_5: {
                question: "Which of these Martin Scorsese films had the largest box office opening?",
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
                image: "martin_scorsese.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 0,
                    incorrect: 100,
                    male: 12,
                    female: 88
                }
            }
        },
        dataSet_3: {
            data_1: {
                question: "How many Academy Awards has actor Kevin Costner won?",
                options: {
                    "1": {
                        value: "One",
                        correct: false
                    },
                    "2": {
                        value: "Two",
                        correct: true
                    },
                    "3": {
                        value: "Three",
                        correct: false
                    },
                    "4": {
                        value: "Four",
                        correct: false
                    }
                },
                correct_result: "Two",
                image: "kevin_costner.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 50,
                    incorrect: 50,
                    male: 40,
                    female: 60
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
                image: "big_bang_theory.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 80,
                    incorrect: 20,
                    male: 30,
                    female: 70
                }
            },
            data_3: {
                question: "In which year did the animated comedy \"The Simpsons\" air its first episode?",
                options: {
                    "1": {
                        value: "1987",
                        correct: false
                    },
                    "2": {
                        value: "1989",
                        correct: true
                    },
                    "3": {
                        value: "1991",
                        correct: false
                    },
                    "4": {
                        value: "1992",
                        correct: false
                    }
                },
                correct_result: "1989",
                image: "the_simpsons.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 90,
                    incorrect: 10,
                    male: 20,
                    female: 80
                }
            },
            data_4: {
                question: "The Beatles hold the Billboard record for most number-one singles. How many do they have?",
                options: {
                    "1": {
                        value: "13",
                        correct: false
                    },
                    "2": {
                        value: "15",
                        correct: false
                    },
                    "3": {
                        value: "20",
                        correct: true
                    },
                    "4": {
                        value: "25",
                        correct: false
                    }
                },
                correct_result: "20",
                image: "the_beatles.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 50,
                    incorrect: 50,
                    male: 20,
                    female: 80
                }
            },
            data_5: {
                question: "With adjustment for inflation, which of these films had the largest box office gross?",
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
                image: "box_office.jpg",
                thumbnails: [ "adele_1.jpg", "academy_award.jpg", "kevin_costner.jpg"],
                results: {
                    total: 100,
                    correct: 70,
                    incorrect: 30,
                    male: 50,
                    female: 50
                }
            }
        }
    }



    // function set to mimick API call
    var localStorageFn = {
        get: function () {
            // window.localStorage.clear();
            if ( localStorage.getItem('triviaData') === null ) {
                localDataStore = localStorage.setItem('triviaData', JSON.stringify(triviaData));
            }
            localDataStore = JSON.parse(localStorage.getItem('triviaData'));
            return localDataStore;
        },
        set: function (correctResult, incorrectResult, totalResults) {
            activeDataSet[dataKey].results.correct = correctResult;
            activeDataSet[dataKey].results.incorrect = incorrectResult;
            activeDataSet[dataKey].results.total = totalResults;
            localStorage.setItem('triviaData', JSON.stringify(localDataStore));
        }
    } //localStorageFn



    // returns a random data set key that is not the current active key
    function getRandomDataSetKey() {
        var activeIndex = dataSetTitles.indexOf(activeDataSetKey);
        var withOutActiveIndex = dataSetTitles.filter(function(e) { return e !== activeDataSetKey });
        var randomDataSetKey = withOutActiveIndex[Math.floor(Math.random()*withOutActiveIndex.length)];
        return randomDataSetKey;
    } //getRandomDataSetKey



    function newQuizTimer() {
        console.log('---newQuizTimer---');
        intervalTimer = setInterval(function() {
            if ( !initialInteraction ) {
                console.log('test');
                var randomDataSetKey = getRandomDataSetKey();
                getNewDataSet(randomDataSetKey);
            }
        }, 10000);
    }
    newQuizTimer();



    initialSetup();
    // set initial content and variables to start trivia
    function initialSetup() {
        activeDataSetKey = activeDataSetKey ? activeDataSetKey : 'dataSet_1';
        activeDataSet = localStorageFn.get()[activeDataSetKey];
        questionIterator = 1;
        finalQuestion = false;
        userScore = 0;
        userScore_el.innerHTML = userScore;
        activeQuestion_el.innerHTML = questionIterator;
        totalQuestions_el.innerHTML = totalQuestions;
        for ( var i=0; otherContentOptionContainer_el.length-1 > i; i++ ) {
            otherContentOptionContainer_el[i].id = 'dataSet_'+(i+1);
            dataSetTitles.push('dataSet_'+(i+1));
        }
        getDataSetKeys();
        setData();
    } //initialSetup



    // gets all possible dataSets
    function getDataSetKeys() {
        dataSetTitles = [];
        for ( var i=0; animationContainer_el.length > i; i++ ) { //subtract 1 because the last item is the shuffle button
            dataSetTitles.push('dataSet_'+(i+1));
        }
        return dataSetTitles;
    } //getDataSetKeys



    // sets the random quiz link on the completed overlay
    function setRandomQuizLink() {
        randomOption_el.id = getRandomDataSetKey();
    } //setRandomQuizLink



    // returns a random data set key that is not the current active key
    function getRandomDataSetKey() {
        var activeIndex = dataSetTitles.indexOf(activeDataSetKey);
        var withOutActiveIndex = dataSetTitles.filter(function(e) { return e !== activeDataSetKey });
        var randomDataSetKey = withOutActiveIndex[Math.floor(Math.random()*withOutActiveIndex.length)];
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
        triviaOptionsContainer_el.innerHTML = '';
        triviaContainer_el.className = '';
        nextQuestionButton_el.innerHTML = "<p>Next Question</p>";
        dataKey = 'data_'+questionIterator;
        activeDataSet = activeDataSet ? activeDataSet : localDataStore;
        var question = activeDataSet[dataKey].question,
            resultDisplay = activeDataSet[dataKey] ? activeDataSet[dataKey].correct_result : 'Whoops!',
            backgroundImage = activeDataSet[dataKey] ? "url("+imagePath_el+activeDataSet[dataKey].image+")" : '';
        triviaQuestion_el.innerHTML = question; //inserts active question into view
        correctResultDisplay_el.innerHTML = resultDisplay; //inserts result into the submission view
        triviaImage_el.style.backgroundImage = backgroundImage; //inserts backgroundImage into view
        // graph results variables
        totalResults = activeDataSet[dataKey].results.total;
        correctResult = activeDataSet[dataKey].results.correct;
        incorrectResult = activeDataSet[dataKey].results.incorrect;
        dataOptions = activeDataSet[dataKey].options;
        // loop thorugh options in data and insert values into view
        for ( var key in dataOptions ) {
            if (dataOptions.hasOwnProperty(key)) {
                var index = Number(Object.keys(dataOptions).indexOf(key))+1,
                    child = document.createElement("li"),
                    value = activeDataSet[dataKey].options[key].value,
                    isCorrect = activeDataSet[dataKey].options[key].correct,
                    selectedOption;
                child.setAttribute('class', 'button');
                child.innerHTML = '<p>'+value+'</p>';
                triviaOptionsContainer_el.appendChild(child);
                reduceTextSizeCheck(child.getElementsByTagName('p')[0]); // run options through this function to check if text size needs adjusted
                if (isCorrect) {
                    child.onclick = function() {
                        selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                        totalResults ++; //add to results
                        correctResult ++;
                        answerSubmittedFn.correct();
                        localStorageFn.set(correctResult, incorrectResult, totalResults);
                        setGraphInfo(selectedOption, isCorrect);
                    }
                }
                else {
                    child.onclick = function() {
                        selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                        totalResults ++; //add to results
                        incorrectResult ++;
                        answerSubmittedFn.incorrect();
                        localStorageFn.set(correctResult, incorrectResult, totalResults);
                        setGraphInfo(selectedOption, isCorrect);
                    }
                }
            }
        }
        // loop through other quiz options from data and insert link and image into view
        for ( var i=0; animationContainer_el.length > i; i++ ) { //subtract 1 because the last item is the shuffle button
            var thumbnailImage = activeDataSet[dataKey] ? "url("+imagePath_el+activeDataSet[dataKey].thumbnails[i]+")" : '';
            otherContentBgImages.push(thumbnailImage);
            animationContainer_el[i].style.backgroundImage = thumbnailImage;
        }
    }; //setData



    // get percentages of graph data values
    function getPercentages(result1, result2, resultsTotal) {
        var value1 = Math.round(result1/resultsTotal*100) > 100 ? 100 : Math.round(result1/resultsTotal*100),
            value2 = 100-value1; //values set this way to esnure demographic data adds up to 100%
        return { value1: value1, value2: value2};
    } //getPercentages



    // Set Graph values
    function setGraphInfo(selectedOption, isCorrectParam) {
        correctPercentage = getPercentages(correctResult, incorrectResult, totalResults).value1;
        incorrectPercentage = getPercentages(correctResult, incorrectResult, totalResults).value2;
        for ( var i=0; resultsChart_el.length > i; i++ ) {
            switch (i) {
                case 0:
                resultsChartValue_el[i].innerHTML = correctPercentage+"%"; //sets chart label
                resultsChart_el[i].children[0].className = "p"+correctPercentage; //give chart appropriate class to fill radial graph (i.e. p_50 = 50%)
                break;
                default:
                resultsChartValue_el[i].innerHTML = incorrectPercentage+"%"; //sets chart label
                resultsChart_el[i].children[0].className = "p"+incorrectPercentage; //give chart appropriate class to fill radial graph (i.e. p_50 = 50%)
                break;
            }
        }
        var randomPercent = document.getElementsByClassName("correct_submission").length > 0 ? correctPercentage : Math.floor(Math.random() * (100+1)) //TODO - need to calculate wrong submissions instead of random
        youGuessPercentge_el.innerHTML = "<b>"+randomPercent+"%</b> of people also answered:<br> <b>"+selectedOption+".</b>";
    } //setGraphInfo



    var answerSubmittedFn = {
        correct: function() {
            initialInteraction = true;
            addScoreFn();
            submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Correct";
            submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
            triviaContainer_el.className = "correct_submission";
            nextQuestionFn();
        },
        incorrect: function() {
            initialInteraction = true;
            submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Incorrect";
            submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
            triviaContainer_el.className = "incorrect_submission";
            nextQuestionFn();
        }
    }



    // function adds to the user score and injects into template
    function addScoreFn() {
        userScore++;
        userScore_el.innerHTML = userScore;
    } //addScoreFn



    // sets functionality for next question button
    function nextQuestionFn() {
        // if last question show results screen
        if ( questionIterator >= totalQuestions ) {
            nextQuestionButton_el.onclick = function() { showCompletedFn() };
            nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
        }
        else {
            nextQuestionButton_el.onclick = function() {
                submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
                iterateQuestion();
            };
        }
    } //nextQuestionFn



    function skipQuestionFn() {
        initialInteraction = true;
        // if last question show results screen
        if ( questionIterator >= totalQuestions ) {
            showCompletedFn();
            nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
        }
        else {
            submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
            iterateQuestion();
        }
    } //skipQuestionFn



    // run function when last question is submitted
    function showCompletedFn() {
        var comment;
        switch(userScore) {
            case 0: case 1: case 2:
            comment = "Ouch!"
            break;
            case 3:
            comment = "Not Bad!"
            break;
            default:
            comment = "Great Job!"
        }
        scoreComment_el.innerHTML = comment;
        completedOverlay_el.className = "show";
    } //showCompletedFn



    // gets data for next question
    function iterateQuestion() {
        questionIterator++;
        activeQuestion_el.innerHTML = questionIterator; // inject active question into view
        triviaContainer_el.className = (''); // resets view
        if ( questionIterator <= totalQuestions ) {
            setData();
        }
    } //iterateQuestion



    // restart current quiz
    function restartFn() {
        initialSetup();
        completedOverlay_el.className = "hidden";
    } //restartFn



    // gets new data if user clicks on new quiz
    function getNewDataSet(dataSetKey) {
        activeDataSetKey = dataSetKey;
        localStorageFn.get();
        restartFn();
    } //getNewDataSet
