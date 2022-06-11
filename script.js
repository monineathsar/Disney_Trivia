let questionEl = document.querySelector(".questionText");
// Variables defined 
// var game = $("#game");
// var questEl = $('#question');
// var answerOrdered = $("#answers");
// var answerAlert = $("#answeralert");
// var correctInput;
// var incorrectInput;
// var quizIndex;
// var timeLeft;

//Main page variables
// var startButton = $("#startbutton");
var highScoreBtn = document.getElementById("highscoreBtn");

// highscoreContainer variables
var highscoreContainer = document.querySelector(".hsContainer");
var backBtn = document.querySelector(".backBtn");

// function getDisney() {
//     return new Promise(function(resolve, reject){
//     fetch('https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=20&tags=disney').then(function(response){
//         response.json().then(function(data){
//           resolve(data)
//         });
//       }).catch(function(error){
//         reject(error);
//       })
//     });
//   }

// getDisney().then(function(result){
//   console.log(result)
// });

// function getTrivia() {
//   return new Promise(function(resolve, reject){
//   fetch('https://opentdb.com/api.php?amount=50&category=11&type=multiple').then(function(response){
//     response.json().then(function(data){
//       resolve(data)
//     });
//   }).catch(function(error){
//     reject(error);
//   })
// });
// }

// getTrivia().then(function(data){
//   for(let i = 0; i < data.results.length; i++){
//     if(data.results[i].question.includes("Disney")){
//       let question = document.createElement("p");
//       question.innerHTML = data.results[i].question;
//       questionEl.appendChild(question);
//       break;
//     }
//   }
//   console.log(data);
// });


// // Set clock, remove button, and start 60 seconds, begin game
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


// // Function to display questions and correct answers
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


// // Create the timer function and to have run smoothly
// function timer() {
//     game.text(`You have ${timeLeft} seconds left.`);
//     var timeInterval = setInterval(function () {

//         if (timeLeft > 0 && quizIndex !== quizObject.length){
//             game.text(`You have ${timeLeft} seconds left.`);
//             timeLeft--;
//         }
        
//         // Completed the questions or time has run out
//         else (timeLeft === 0 || quizIndex === quizObject.length);

//     },1000);
// };

// // Write an event listener for start button
// // Start button will begin game
// startButton.on("click", function(event) {
//     let element = event.target;
//     if (element.matches("button") === true) {
//         // Initialize Game
//         gameInit();
//     }
// })

// // Write an event listener for answer selection
// answerOrdered.on("click", function(event) {
//     let element = event.target;
//     if (element.matches("li") === true) {

//         // Move to the following question
//         if (quizIndex < quizObject.length) {
            
//             questEl.text('');
            
            answerOrdered.html('');
            displayQuestion(quizObject[quizIndex]);
        };
    };
});

//             answerOrdered.html('');
//             displayQuestion(quizObject[quizIndex]);
//         };
//     };
// });

// Monineath working on this
var targetDiv = document.getElementById("mainPage");
var hsBtn = document.getElementById("highscoresBtn");
hsBtn.setAttribute("onclick", "viewHighScore()");

var mainPageBtn = document.getElementById("mainPageBtn");
mainPageBtn.setAttribute("onclick", "viewMainPage()");

function viewHighScore() {
  targetDiv.style.display = "none";

    //pulls stored score arrays from local storage 
  // var storedScoreArray = JSON.parse(localStorage.getItem("data"));
  // if (storedScoreArray !== null) { //sorts highscores from highest to lowest 
  //   storedScoreArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  //   scoresarray = storedScoreArray;
  // }

  //show stored highscores in highscore box
  
};

function viewMainPage() {
  targetDiv.style.display = "block";
}

