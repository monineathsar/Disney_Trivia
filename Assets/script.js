// main page global variables
const mainPageSection = document.getElementById("mainPage");
const homeContainer = document.querySelector(".container");
const startgameBtn = homeContainer.querySelector("#startBtn");
const viewHsBtn = document.getElementById("highscoreBtn");
viewHsBtn.setAttribute("onclick", "viewHighScore()");

// Game page global variables
const gamePageSection = document.getElementById("startGamePage");
let questionsArray;
let currentQuestion;

// Highscore page global variables
const highscoreSection = document.getElementById("highscorePage");
const mainPageBtn = document.getElementById("mainPageBtn");
mainPageBtn.setAttribute("onclick", "viewMainPage()");

// highscore FORM page global variables
const hsFormSection = document.getElementById("formPage");
const saveFormBtn = document.getElementById("saveBtn");
saveFormBtn.setAttribute("onclick", "viewMainPage()");

// Giphy API key
const giphyKey = "G0bL1VhIULA0XwlHEwdsZFsRp2kbEO4k";


// Marvel Trivia API fecth
async function getMarvel() {
    return new Promise(function(resolve, reject){
    fetch('https://the-trivia-api.com/api/questions?limit=10&difficulty=easy&tags=marvel')
    .then(function(response){
        response.json().then(function(data){
          resolve(data)
        });
      }).catch(function(error){
        reject(error);
      })
    });
}

// Giphy API fetch
async function getGiphy() {
  let keyword = questionsArray[currentQuestion].correctAnswer;
  let giphyUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + giphyKey + "&q=" + keyword + "&limit=1&offset=0&rating=g&lang=en";
  return await fetch(giphyUrl)
    .then(response => response.json())
    .then(json => {
      return json.data[0].images.fixed_height.url;
    });
}

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

// using the fetched trivia API to generate the questions
function generateQuestions() {
  questionTimer();
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
  let answerSelected = document.querySelector(".answerSelected");

  answerSelected.style.display = "none";
  answerList.style.display = "block"; 

  let choices = questionsArray[currentQuestion].incorrectAnswers;
  choices.push(questionsArray[currentQuestion].correctAnswer);
  
  let randomChoices = _.sample(choices, 4);

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

// function for when player selects on an answer option
async function optionSelected(selection) {
    if (selection.innerText === questionsArray[currentQuestion].correctAnswer) {
        selection.style.backgroundColor = 'green';
        document.querySelectorAll(".option").forEach(function(option) {
          if (option.innerText !== questionsArray[currentQuestion].correctAnswer) {
            option.style.display = "none";
          }
        });
        await getGiphy().then(result => {

          document.querySelector(".answerSelected").style.display = "flex";
          document.querySelector(".answerSelected").style.justifyContent = "center";
          document.getElementById("answerImg").src = result;
        });
    } else {
        selection.style.backgroundColor = 'red';
    }
  currentQuestion++;

  let timer = setInterval(function() {
    generateQuestions();
    clearInterval(timer);
  }, 3000);
}

// start game button on main page
startgameBtn.onclick = async function() {
  document.querySelector(".timeText").innerHTML = "Time: ";
  document.getElementById("secsLeft").style.display = "block";

  timeLeft = 15;
  currentQuestion = 0;
  //timer();
  await getMarvel(questionsArray).then(result => {
    questionsArray = result;
  });
  generateQuestions(currentQuestion);
}


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

// <<<<< Monineath's section
function questionTimer() {
  
}

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
