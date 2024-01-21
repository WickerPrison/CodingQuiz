var timer = document.getElementById("timer");
var question = document.getElementById("question");
var answersElms = document.getElementsByClassName("answer");
var scoreElm = document.getElementById("score");
var greyOut = document.getElementById("grey-out");
var quizResults = document.getElementById("quiz-results");
var scoreDisplay = document.getElementById("final-score");
var submitBtn = document.getElementById("submit-button");
var closeBtn = document.getElementById("close-button");

var questionObject;
var shuffledAnswers;

var timeInSeconds = 100;
var score = 0;

displayTime(timeInSeconds);

var intervalID = setInterval(function startTimer() { 
    timeInSeconds--;
    displayTime(timeInSeconds);
}, 1000);
 
loadQuestion(0);

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

function loadQuestion(index){
    questionObject = window.questionDictionary[index];
    question.innerText = questionObject.Question;
    shuffledAnswers = shuffleArray(questionObject.Answers);
    for(var i = 0; i < shuffledAnswers.length; i++){
        answersElms[i].innerText = i + 1 + ". " + shuffledAnswers[i];
        answersElms[i].answerIndex = i;
    }
}

function answerQuestion(event){
    if(questionObject.Answers.indexOf(shuffledAnswers[event.currentTarget.answerIndex])==0){
        score += 10;
        scoreElm.innerText = score;
    }
    else{
        timeInSeconds -= 15;
        displayTime(timeInSeconds);
    }
}

function quizOver(){
    greyOut.style.backgroundColor = "rgba(0,0,0,0.5)";
    quizResults.style.display = "block";
    scoreDisplay.innerText = "Your Score: " + score;
}

// shuffles array using the Durstenfeld shuffle
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

for(var i = 0; i < answersElms.length; i++){
    answersElms[i].addEventListener("click", answerQuestion);
}
closeBtn.addEventListener("click", reloadPage);
submitBtn.addEventListener("click", reloadPage);