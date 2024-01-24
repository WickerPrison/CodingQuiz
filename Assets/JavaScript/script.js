// get references to needed elements
var timer = document.getElementById("timer");
var question = document.getElementById("question");
var answersElms = document.getElementsByClassName("answer");
var scoreElm = document.getElementById("score");
var startScreen = document.getElementById("start");
var startBtn = document.getElementById("start-button");
var greyOut = document.getElementById("grey-out");
var quizResults = document.getElementById("quiz-results");
var scoreDisplay = document.getElementById("final-score");
var initials = document.getElementById("initials");
var submitBtn = document.getElementById("submit-button");
var closeBtn = document.getElementById("close-button");
var leaderboardBtn = document.getElementById("highscores");
var leaderboard = document.getElementById("leaderboard");
var leaderboardEntryTemplate = document.getElementById("leaderboard-entry-template");

// set up variables that will be used later
var askedQuestions = [];
var questionObject;
var shuffledAnswers;
var intervalID;

var initialTime = 100;
var timeInSeconds = initialTime;
var score = 0;

// the top scores will be saved using an array of this function
function TopScores(){
    this.initials = "";
    this.score = 0;
}

// sets up the leaderboard from local storage
var topScores = [];
topScores = JSON.parse(localStorage.getItem("scores"));
buildLeaderboard();

var showingLeaderboard = false;
var leaderboardEntriesElms = [];

displayTime(timeInSeconds);

// called when start button is pressed. starts timer and loads first question
function startQuiz(){
    // starts timer
    intervalID = setInterval(function startTimer() { 
        timeInSeconds--;
        displayTime(timeInSeconds);
    }, 1000);
     
    // attaches event listeners to answer buttons
    for(var i = 0; i < answersElms.length; i++){
        answersElms[i].addEventListener("click", answerQuestion);
        answersElms[i].style.pointerEvents = "all";
    }

    startScreen.style.display = "none";
    greyOut.style.backgroundColor = "rgba(0,0,0,0)";

    loadQuestion();
}

// this is called every second to update the time display. When time reaches zero this function calls the quizOver function
function displayTime(timeInSeconds){
    if(timeInSeconds <= 0){
        timeInSeconds = 0;
        clearInterval(intervalID);
        quizOver();
    }
    
    var minutes = 0;
    while(timeInSeconds > 59){
        timeInSeconds -= 60;
        minutes++;
    }

    var tensPlaceDigit = "";
    if(timeInSeconds < 10){
        tensPlaceDigit = 0;
    }

    timer.innerText = minutes + ":" + tensPlaceDigit + timeInSeconds;
}

// loads the next question
function loadQuestion(){
    var lookingForInt = true;
    // finds an integer that has not been used before to get a random question from dictionary
    while(lookingForInt){
        var randInt = Math.floor(Math.random() * window.questionDictionary.length);
        if(!askedQuestions.includes(randInt)) {
            askedQuestions.push(randInt);
            lookingForInt = false;
        }
    }
    
    // randomly places answers on each button
    questionObject = window.questionDictionary[randInt];
    question.innerText = questionObject.Question;
    shuffledAnswers = shuffleArray(questionObject.Answers);
    for(var i = 0; i < shuffledAnswers.length; i++){
        answersElms[i].innerText = i + 1 + ". " + shuffledAnswers[i];
        answersElms[i].answerIndex = i;
    }
}

// called when an answer is selected. Determines if answer is correct and responds accordingly
function answerQuestion(event){
    if(questionObject.Answers.indexOf(shuffledAnswers[event.currentTarget.answerIndex])==0){
        var scoreIncrease = Math.floor(50 * timeInSeconds / initialTime);
        score += scoreIncrease;
        scoreElm.innerText = score;
        if(window.questionDictionary.length == askedQuestions.length){
            quizOver();
        }
        else{
            loadQuestion();
        }
    }
    else{
        timeInSeconds -= 15;
        displayTime(timeInSeconds);
    }
}

// called when quiz ends. stops timer. pulls up results popup
function quizOver(){
    clearInterval(intervalID);
    greyOut.style.backgroundColor = "rgba(0,0,0,0.5)";
    quizResults.style.display = "block";
    scoreDisplay.innerText = "Your Score: " + score;
}

// shuffles array using the Durstenfeld shuffle method
function shuffleArray(originalArray) {
    var newArray = Array.from(originalArray);
    for (var i = originalArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}

function reloadPage(){
    location.reload();
}

// adds new score, sorts scores, and saves them to local storage
function submitScore(){
    if(initials.value.length <= 0) return;

    var newScore = new TopScores();
    newScore.initials = initials.value;
    newScore.score = score;

    if(topScores != null){
        topScores.push(newScore);
        topScores.sort((a,b) => {
            return b.score - a.score;
        });
    }
    else topScores = [newScore];

    localStorage.setItem("scores", JSON.stringify(topScores));
    location.reload();
}

// shows the leaderboard
function highscoresButton(){
    if(!showingLeaderboard){
        leaderboard.style.display = "block";
        showingLeaderboard = true;
    }
    else{
        leaderboard.style.display = "none";
        showingLeaderboard = false;
    }
}

// called on initialization. builds the elements that make up the leaderboard entries by copying leaderboard entry template from html
function buildLeaderboard(){
    if(topScores == null) return;
    
    for(var i = 0; i < topScores.length;i++){
        var newEntry = leaderboardEntryTemplate.cloneNode(true);
        newEntry.id = "leaderboard-entry-" + i;
        var position = newEntry.querySelector(".leaderboard-position");
        position.innerText = i + 1 + ".";
        var entryInitials = newEntry.querySelector(".leaderboard-initials");
        entryInitials.innerText = topScores[i].initials.toUpperCase();
        var entryScore = newEntry.querySelector(".leaderboard-score");
        entryScore.innerText = topScores[i].score;
        leaderboard.appendChild(newEntry);
    }
}

// sets up event listeners
startBtn.addEventListener("click", startQuiz);
closeBtn.addEventListener("click", reloadPage);
submitBtn.addEventListener("click", submitScore);
leaderboardBtn.addEventListener("click", highscoresButton)