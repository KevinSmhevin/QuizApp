//score of user
let score = 0;

//question user is on
let questionNumber = 0;


//quiz questions object
const quizQuestions = [
  {
    number: 1,
    question: 'Who is the Stark that built the Wall?',
    answers: [
      'Brandon Stark',
      'Cregan Stark',
      'Theon Stark',
      'Rob Stark',
    ],
    correctAnswer: 'Brandon Stark'
  },
  {
    number: 2,
    question: 'What is the name of Rob Starks dire wolf?',
    answers: [
      'Shaggy Dog',
      'Summer',
      'Grey Wind',
      'Ghost',
    ],
    correctAnswer: 'Grey Wind'
  },
  {
    number: 3,
    question: 'What is the name of the Valarian steel sword owned by house stark?',
    answers: [
      'Winter',
      'Ice',
      'Frost',
      'Wolf Jaw',
    ],
    correctAnswer: 'Ice'
  },
  {
    number: 4,
    question: 'Which of the following is not located in Winterfell?',
    answers: [
      'The shadow tower',
      'The glass garden',
      'The broken tower',
      'The crypts',
    ],
    correctAnswer: 'The shadow tower'
  },
  {
    number: 5,
    question: 'Which of the following is NOT a nickname of a Stark?',
    answers: [
      'The quiet wolf',
      'The wolf cub',
      'The blue rose',
      'The cat wolf',
    ],
    correctAnswer: 'The cat wolf'
  },
  {
    number: 6,
    question: 'Who is the Stark who is known as the king who knelt?',
    answers: [
      'Ned Stark',
      'Artos Stark',
      'Rickard Stark',
      'Torrhen Stark',
    ],
    correctAnswer: 'Torrhen Stark'
  },
  {
    number: 7,
    question: 'Who slew the king beyond the wall known as Raymon Redbeard?',
    answers: [
      'Cregan Stark',
      'Artos Stark',
      'Theon Stark',
      'Torrhen Stark',
    ],
    correctAnswer: 'Artos Stark'
  },
  {
    number: 8,
    question: 'Who served as hand of the king at the end of the Dance with Dragons?',
    answers: [
      'Cregan Stark',
      'Torrhen Stark',
      'Ned Stark',
      'Artos Stark',
    ],
    correctAnswer: 'Cregan Stark'
  },
  {
    number: 9,
    question: 'Which house is not a loyal vassal to the Starks?',
    answers: [
      'House Glover',
      'House Harding',
      'House Dustin',
      'House Poole',
    ],
    correctAnswer: 'House Harding'
  },
  {
    number: 10,
    question: 'What did the Testimony of Mushroom say about crypts of Winterfell?',
    answers: [
      'There are children of the forest hiding in the crypts',
      'There is plenty of Dragon Glass hidden in the crypts',
      'There is a dragon egg hidden in the crypts',
      'Glass candles burn deep in the crypts of Winterfell',
    ],
    correctAnswer: 'There is a dragon egg hidden in the crypts'
  },
];

//function to generate question form or results page. Due to my layout i did not want a fieldset in my form. 
function generateQuestion() {
  if (questionNumber < quizQuestions.length) {
    return `<form role="form" id="stark-quiz" class="main-container">
    <div class="main-box-1">${quizQuestions[questionNumber].question}</div>
    <label class="main-box-2">${quizQuestions[questionNumber].answers[0]}
      <input type="radio" name="answer" value="${quizQuestions[questionNumber].answers[0]}" checked>
      <span class="checkmark"></span>
    </label>
    <label class="main-box-2">${quizQuestions[questionNumber].answers[1]}
      <input type="radio" name="answer" value="${quizQuestions[questionNumber].answers[1]}">
      <span class="checkmark"></span>
    </label>
    <label class="main-box-2">${quizQuestions[questionNumber].answers[2]}
      <input type="radio" name="answer" value="${quizQuestions[questionNumber].answers[2]}">
      <span class="checkmark"></span>
    </label>
    <label class="main-box-2">${quizQuestions[questionNumber].answers[3]}
      <input type="radio" name="answer" value="${quizQuestions[questionNumber].answers[3]}">
      <span class="checkmark"></span>
    </label>
    <button type="button" class="submit-button">Submit</button>
    </form>`;
  } else {
    renderResults();
  }
}

//these functions alter/updates the question # and score

function changeQuestionNumber() {
  if (questionNumber < quizQuestions.length) {
    questionNumber++;
  }
}

function changeScore() {
  score++;
}

function updateScore() {
  changeScore();
  $('.score').text(score);
}

function resetScore() {
  score = 0;
  $('.score').text(score);
}

function resetQuestionNumber() {
  questionNumber = 0;
  $('.questionNumber').text(questionNumber);
}

function updateQuestionNumber() {
  changeQuestionNumber();
  $('.questionNumber').text(questionNumber);
}

// The following functions are event functions on click

function startQuiz() {
  $('.main-content').on('click', '.start-button', function (event) {
    $('.main-container').remove();
    $('main').append(generateQuestion());
  });
}

function continueQuiz() {
  $('.main-content').on('click', '.continue-button', function (event) {
    $('.main-container').remove();
    $('main').append(generateQuestion());
  });
}

function userSelectAnswer() {
  //im selecting .test because it is on the original html and not rendered later
  $('.main-content').on('click', '.submit-button', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      ifCorrectAnswer();
    } else {
      ifWrongAnswer();
     }
  });
}

function restartQuiz() {
  $('.main-content').on('click', '.restart-button', function (event) {
    $('.main-container').remove();
    $('main').append(renderRestart());
  });
}

// the following functions give user feedback

function ifCorrectAnswer() {
  $('.main-container').remove();
  $('main').append(renderCorrectFeedback());
  updateScore();
}

function renderCorrectFeedback() {
  updateQuestionNumber();
  return `<div class="main-container">
    <div class="main-box-1">You got it right!</div>
    <div class="main-box-2">
      <img src="https://media.giphy.com/media/ny5JmdnA0g9Yk/giphy.gif" alt="Arya-bow" class="feedback-image">
    </div>
    <button type="button" class="continue-button">Continue</button>
  </div>`;
}

function ifWrongAnswer() {
  $('.main-container').remove();
  $('main').append(renderWrongFeedback());
}

function renderWrongFeedback() {
  updateQuestionNumber();
  return `<div class="main-container">
    <div class="main-box-1">You got it wrong!</div>
    <div class="main-box-2">
      <img src="https://media.giphy.com/media/3UBsVLRP8BZ5u/giphy.gif" alt="Wolf-nod" class="feedback-image">
    </div>
    <button type="button" class="continue-button">Continue</button>
  </div>`;
}

function renderGoodResults() {
  return `<div class="main-container">
    <div class="good main-box-1">Your Score: ${score} / 10</div>
    <div class="good main-box-2">
      "All Hail The King Of The North!"
    </div>
    <div class="good main-box-2">
      <img src="https://media.giphy.com/media/lioUUz1SRK7Ju/giphy.gif" alt="Stark-bow" class="feedback-image">
    </div>
    <button type="button" class="restart-button">Try again?</button>
  </div>`;
}

function renderOkResults() {
  return `<div class="main-container">
    <div class="okay main-box-1">Your Score: ${score} / 10</div>
    <div class="okay main-box-2">
      "Winter Is Coming"
    </div>
    <div class="main-box-2">
      <img src="https://media.giphy.com/media/jqSHL8cMcZQKQ/giphy.gif" alt="Jon-drinks" class="feedback-image">
    </div>
    <button type="button" class="restart-button">Try again?</button>
  </div>`;
}

function renderBadResults() {
  return `<div class="main-container">
    <div class="bad main-box-1">Your Score:  ${score} / 10</div>
    <div class="bad main-box-2">
      "The Lannisters send their regards"
    </div>
    <div class="main-box-2">
      <img src="https://media.giphy.com/media/Leli3yHzxCRAQ/giphy.gif" alt="red-wedding" class="feedback-image">
    </div>
    <button type="button" class="restart-button">Try again?</button>
  </div>`;
}

function renderResults() {
  $('.main-container').remove();
  if (score >= 8) {
    $('main').append(renderGoodResults());
  }
  else if (score < 8 && score >= 5) {
    $('main').append(renderOkResults());
  } else {
    $('main').append(renderBadResults());
  }
}

// this function will restart the quiz

function renderRestart() {
  resetScore();
  resetQuestionNumber();
  return `<div class="main-container">
    <div class="main-box-1">Winter is Coming.. Are you ready?</div>
    <div class="main-box-2">This quiz will test your knowledge of House Stark</div>
    <button type="button" class="start-button">Begin Quiz!</button>
  </div>`;

}

// function to render all event functions

function renderQuizApp() {
  startQuiz();
  userSelectAnswer();
  continueQuiz();
  restartQuiz();
}

$(renderQuizApp);
