var timer = document.getElementById("timer");
var question = document.getElementById("question");
var answersElms = document.getElementsByClassName("answer");
var scoreElm = document.getElementById("score");

var questionObject;
var shuffledAnswers;

var timeInSeconds = 200;
var score = 0;

displayTime(timeInSeconds);

setInterval(function startTimer() { 
    timeInSeconds--;
    displayTime(timeInSeconds);
}, 1000);
 
loadQuestion(0);

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


function displayTime(timeInSeconds){
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

for(var i = 0; i < answersElms.length; i++){
    answersElms[i].addEventListener("click", answerQuestion);
}