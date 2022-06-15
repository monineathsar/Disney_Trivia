// main page global variables
const mainPageSection = document.getElementById("mainPage");
const homeContainer = document.querySelector(".container");
const startgameBtn = homeContainer.querySelector("#startBtn");
const viewHsBtn = document.getElementById("highscoreBtn");
viewHsBtn.setAttribute("onclick", "viewHighScore()");

// Game page global variables
const gamePageSection = document.getElementById("startGamePage");
const endGameDiv = document.querySelector(".endGameDiv");
const viewFormBtn = document.getElementById("endGameBtn");
viewFormBtn.setAttribute("onclick", "viewFormPage()");
let questionsArray;
let currentQuestion;
let timer;
let timeLeft;

// Highscore page global variables
const highscoreSection = document.getElementById("highscorePage");
const mainPageBtn = document.getElementById("mainPageBtn");
mainPageBtn.setAttribute("onclick", "viewMainPage()");

// highscore FORM page global variables
const hsFormSection = document.getElementById("formPage");
const saveFormBtn = document.getElementById("saveBtn");
saveFormBtn.setAttribute("onclick", "saveHighScore()");

// score tracking global variables
let scoreTracker;
let scoreArray = [];

// Giphy API key
const giphyKey = "G0bL1VhIULA0XwlHEwdsZFsRp2kbEO4k";


// Marvel Trivia API fecth
async function getMarvel() {
    return new Promise(function(resolve, reject){
    fetch('https://the-trivia-api.com/api/questions?limit=10&difficulty=medium&tags=marvel')
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
  gamePageSection.style.display = "none";

  let storedScoreArray = JSON.parse(localStorage.getItem("data"));
  if (storedScoreArray !== null) { //sorts highscores from highest to lowest 
    storedScoreArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    scoreArray = storedScoreArray;
  }
  renderHighscore();
}

// to display main page
function viewMainPage() {
  mainPageSection.style.display = "block";
  highscoreSection.style.display = "none";
  hsFormSection.style.display = "none";
  gamePageSection.style.display = "none";
}

// to diplay highscore FORM page
function viewFormPage() {
  gamePageSection.style.display = "none";
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
  viewGamePage();
  if (currentQuestion > 9) {
    //score = correctAnswersCount;
    endGameDiv.style.display = "block";
    clearInterval(timer);
    // gameOver();
    return;
  }

  questionTimer();
  let questionText = document.querySelector(".questionText");
  let answerList = document.querySelector(".answerList");
  let answerSelected = document.querySelector(".answerSelected");
  
  endGameDiv.style.display = "none";
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
  clearInterval(timer);
    if (selection.innerText === questionsArray[currentQuestion].correctAnswer) {
        scoreTracker++;
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
        document.querySelectorAll(".option").forEach(function(option) {
          if (option.innerText === questionsArray[currentQuestion].correctAnswer) {
            option.style.backgroundColor = "green";
          }
        });
    }
  currentQuestion++;

  setTimeout(function() {
    generateQuestions();
  }, 3000);
}

// start game button on main page
startgameBtn.onclick = async function() {
  currentQuestion = 0;
  scoreTracker = 0;
  await getMarvel(questionsArray).then(result => {
    questionsArray = result;
  });
  generateQuestions(currentQuestion);
}

function questionTimer() {
  timeLeft = 30;
  document.getElementById("secsLeft").innerHTML = "Time: 00:" + formatSecond();
 
  timer = setInterval(function(){
    timeLeft--;
    
    if (timeLeft <= 0){
      clearInterval(timer);
      currentQuestion++;
      generateQuestions();
    } else {
      document.getElementById("secsLeft").innerHTML = "Time: 00:" + formatSecond();
    }
  }, 1000);
}

function formatSecond() {
  let second = timeLeft > 9 ? timeLeft : "0" + timeLeft;
  return second;
}

function saveHighScore() {
  let initial = document.getElementById("playerInitials").value.trim();
  if (initial === ""){
    return;
  }

  let currentPlayer = {
    playerName: initial,
    score: scoreTracker
  };

  scoreArray.push(currentPlayer);
  localStorage.setItem("data", JSON.stringify(scoreArray));
  viewHighScore();
}

//pulls stored highscore from local storage
function renderHighscore() {
  highscoreHistory = document.getElementById("highscoreHistory");
  highscoreHistory.innerHTML = "";

  for (let i = 0; i < scoreArray.length; i++) {
    let score = scoreArray[i];
    let li = document.createElement("li");
    li.classList.add("history");
    //puts player's initials under the initial column
    let initialDiv = document.createElement("div");
    initialDiv.innerHTML = score.playerName;
    li.appendChild(initialDiv);
    //puts the accociated player's score under the score column
    let scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = score.score;
    li.appendChild(scoreDiv); 

    //creates player's initals & score into list elements
    highscoreHistory.appendChild(li);
  }
}