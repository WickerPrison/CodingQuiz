// This script contains an array of objects. It is referenced by the other js file and is used as a dictionary
var questionDictionary = [
    // each question has an object in this array. The objects contain a question string and an answers array
    question2 = {
        "Question":"Functions can return which of the following?",
        // The first entry in the answers array is the correct answer for each question
        "Answers": [
        "These are all valid", 
        "Strings",
        "Functions",
        "Nothing"
    ]
    },

    question3 = {
        "Question":"What is the correct syntax for changing the text displayed by an element with the id \"heading-3\"?",
        "Answers": [
        "document.getElementById(\"heading-3\").innerText = \"new text\";", 
        "document.getElementById(\"heading-3\").text = \"new text\";",
        "document.getElementById(\"heading-3\").text(\"new text\");",
        "document.getElementById(\"heading-3\").innerText(\"new text\");"
    ]
    },

    question4 = {
        "Question":"JSON stands for",
        "Answers": [
        "Java Script Object Notation", 
        "Java Script Oriented Nodes",
        "JavaScript Structured Object Nodes",
        "Nothing, it was created by a man named Jason"
    ]
    },

    question5 = {
        "Question":"Which of these statements will return true?",
        "Answers": [
        "\"3\" + \"1\" == 31", 
        "\"true\" == true",
        "\"3\" + \"1\" == 4",
        "\"1\" === 1"
    ]
    },

    question6 = {
        "Question":"Which of the following data types is not used in JavaScript?",
        "Answers": [
        "Integer", 
        "String",
        "Number",
        "Boolean"
    ]
    }
]