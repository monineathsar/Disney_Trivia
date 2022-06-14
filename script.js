let questionEl = document.querySelector(".questionText");
// main page elements
const mainPageSection = document.getElementById("mainPage");

const gamePageSection = document.getElementById("startGamePage");

// Highscore page elements
const highscoreSection = document.getElementById("highscorePage");

const mainPageBtn = document.getElementById("mainPageBtn");
mainPageBtn.setAttribute("onclick", "viewMainPage()");

// highscore FORM page elements
const hsFormSection = document.getElementById("formPage");

const saveFormBtn = document.getElementById("saveBtn");
saveFormBtn.setAttribute("onclick", "viewMainPage()");

const homeContainer = document.querySelector(".container");
const startgameBtn = homeContainer.querySelector("#startBtn");
const viewHsBtn = document.getElementById("highscoresBtn");
viewHsBtn.setAttribute("onclick", "viewHighScore()");

const giphyKey = "G0bL1VhIULA0XwlHEwdsZFsRp2kbEO4k";

let questionsArray;
let currentQuestion;

// // // Variables defined 
// // var game = $("#game");
// // var questEl = $('#question');
// // var answerOrdered = $("#answers");
// // var answerAlert = $("#answeralert");
// // var correctInput;
// // var incorrectInput;
// // var quizIndex;
// // var timeLeft;
// // var startButton = $("#startbutton");


async function getMarvel() {
    return new Promise(function(resolve, reject){
    fetch('https://the-trivia-api.com/api/questions?limit=10&difficulty=easy&tags=marvel').then(function(response){
        response.json().then(function(data){
          resolve(data)
        });
      }).catch(function(error){
        reject(error);
      })
    });
}

async function getGiphy() {
  let giphyUrl = 'https://api.giphy.com/v1/gifs/G0bL1VhIULA0XwlHEwdsZFsRp2kbEO4k?api_key=' + giphyKey;
  let giphyPng = await fetch(giphyUrl)
    .then(function(response){
    response.json().then(function(data){
      resolve(data)
    });
  return giphyPng;
  // }).catch(function(error){
  //   reject(error);
  });
};

// to fetch trivia API
function generateQuestions() {
  viewGamePage();
  if (currentQuestion > 9) {
    score = correctAnswersCount;
    clearInterval(timer);
    gameOver();
    viewFormPage();
    return;
  }

  let questionText = document.querySelector(".questionText");
  let answerList = document.querySelector(".answerList");

  let choices = questionsArray[currentQuestion].incorrectAnswers;
  choices.push(questionsArray[currentQuestion].correctAnswer);
  
  let randomChoices = _.sample(choices, 4);
  console.log(randomChoices);

  questionText.innerHTML = '<div class="questionText"><span>' + (currentQuestion+1) + '. ' + questionsArray[currentQuestion].question + '</span>'; 
  //shows answers choices in quiz box in order it was written in questions object array
  answerList.innerHTML = '<div class="option"><span>'+ randomChoices[0] +'</span></div>'
  + '<div class="option"><span>'+ randomChoices[1] +'</span></div>'
  + '<div class="option"><span>'+ randomChoices[2] +'</span></div>'
  + '<div class="option"><span>'+ randomChoices[3] +'</span></div>'; 

  //grabs all choices array from questions array object
  let options = answerList.querySelectorAll(".option");

  //adds even listener for when player clicks on their choice
  for (i=0; i < options.length; i++){
    options[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  if(answer.innerText === questionsArray[currentQuestion].correctAnswer) {
    console.log("yay");
  }

  currentQuestion++;
  generateQuestions();
}

// start game funtion
startgameBtn.onclick = async function() {
  document.querySelector(".timeText").innerHTML = "Time: ";
  document.getElementById("secsLeft").style.display = "block";

  timeLeft = 15;
  currentQuestion = 0;
  //timer();
  await getMarvel(questionsArray).then(result => {
    questionsArray = result;
    console.log(questionsArray);
  });
  generateQuestions(currentQuestion);
}
// getGiphy().then(function(data){
//   for(let i = 0; i < data.results.length; i++){
//     if(data.results[i].question.includes("Marvel")){
//       let question = document.createElement("p");
//       question.innerHTML = data.results[i].question;
//       questionEl.appendChild(question);
//       break;
//     }
//   }
//   console.log(data);
// });


// Set clock, remove button, and start 60 seconds, begin game
// function gameInit() {
//     highScore = JSON.parse(localStorage.getItem("xxx"));
//     correctInput = 0;
//     incorrectInput = 0;
//     quizIndex = 0;
//     timeLeft = 60;
//     startButton.css("display", "none");
//     displayQuestion(quizObject[quizIndex]);
//     timer();
// }


// Function to display questions and correct answers
// function displayQuestion(myObject) {

//     questEl.text(myObject.question);

//     let order = Math.round(Math.random() * 3);
//     for (i=0; i<3; i++) {
//         let answerTrue = $("xxx").addClass("xxx");
//         let answerWrong = $("xxx").addClass("xxx");

//         if (order === i && order < 3) {
//             answerTrue.text(myObject.true);
//             answerOrdered.append(answerTrue);
//             answerWrong.text(myObject.wrong[i]);
//             answerOrdered.append(answerWrong);
//         }
//         else if (order === 3 && i === 2) {

//             answerWrong.text(myObject.wrong[i]);
//             answerOrdered.append(answerWrong);

//             answerTrue.text(myObject.true);
//             answerOrdered.append(answerTrue);
//         }
//         else {

//             answerWrong.text(myObject.wrong[i]);
//             answerOrdered.append(answerWrong);
//         }
//     }
// }


// Create the timer function and to have run smoothly
// function timer() {
//     var timeInterval = setInterval(function () {

//         if (timeLeft > 0 && quizIndex !== quizObject.length){
//             game.text(`You have ${timeLeft} seconds left.`);
//             timeLeft--;
//         }

//         // Completed the questions or time has run out
//         else (timeLeft === 0 || quizIndex === quizObject.length);

//     },1000);
// };

// Write an event listener for start button
// Start button will begin game
// startButton.on("click", function(event) {
//     let element = event.target;
//     if (element.matches("button") === true) {
//         // Initialize Game
//         gameInit();
//     }
//     console.log(event);
// })

// Write an event listener for answer selection
// answerOrdered.on("click", function(event) {
//     let element = event.target;
//     if (element.matches("li") === true) {

//         // Move to the following question
//         if (quizIndex < quizObject.length) {

//             questEl.text('');

//             answerOrdered.html('');
//             displayQuestion(quizObject[quizIndex]);
//         };
//     };
// });
// Monineath's section >>>>>

// start game page elements
// var startGameSection = 

// to display highscore page
function viewHighScore() {
  highscoreSection.style.display = "block";
  mainPageSection.style.display = "none";
  hsFormSection.style.display = "none";
}

// to display main page
function viewMainPage() {
  mainPageSection.style.display = "block";
  highscoreSection.style.display = "none";
  hsFormSection.style.display = "none";
}

// to diplay highscore FORM page
function viewFormPage() {
  mainPageSection.style.display = "none";
  highscoreSection.style.display = "none";
  hsFormSection.style.display = "block";
}

// to display game page
function viewGamePage() {
  gamePageSection.style.display = "block";
  mainPageSection.style.display = "none";
  highscoreSection.style.display = "none";
  hsFormSection.style.display = "none";
}
// <<<<< Monineath's section


// Uday's gameover section
function play(quiz) {
  //hide button and show form
  hide($start);
  show($form);
  //main game loop
  update($score,score);
  
  $form.addEventListener('submit', function(event) {
      event.preventDefault();
      check($form[0].value);
  }, false);
  
  
  var i = 0;
  chooseQuestion();
  //end of main game loop
  
  gameOver();
  
  function chooseQuestion() {
      var question = quiz.questions[i].question;
      ask(question);
  }
  
  function ask(question) {
      update($question, quiz.question + question);
      $form[0].value=" ";
      $form[0].focus();
  }
  
  function check(answer) {
      if(answer === quiz.questions[i].answer){  
      update($feedback, "Correct!","right");
      //increase score by 1
      score++;
      update($score,score)
      } else {
      update ($feedback, "Wrong!", "wrong");
      }
      i++;
      if(i===quiz.questions.length) {
      gameOver();
      } else {
          chooseQuestion();
      }
      
  }
  
  function gameOver() {
      //inform the player that the game has finished and tell them how many points they have scored
      update($question , "Game Over, you scored " + score + " points");
      hide($form);
      show($start);
  }
};
