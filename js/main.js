// Source: https://github.com/bradtraversy/wordbeater/blob/master/dist/js/main.js
window.addEventListener('load', init);

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// Global variables to be used

//Available Levels
const levels = { easy: 10, medium: 5, hard: 2 }

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let gameOn;

// Word bank
var words = [];

// Get data
// data from: https://www.bragitoff.com/2016/03/english-dictionary-in-csv-format/
async function getData(words) {
  const response = await fetch('dictionary.csv');
  const data = await response.text();
  const rows = data.split('\n');

  // for each loop used to add all words from CSV
  rows.forEach(elt => {
      const row = elt.split(',');
      var word = row[0];
      words.push(word);
  });

  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);

  // Output random word
  currentWord.innerHTML = words[randIndex];

}

// Initialize game
function init() {

  // Show seconds in UI
  seconds.innerHTML = currentLevel;

  // Show initial page time
  timeDisplay.innerHTML = time;

  // Obtain words to be displayed from CSV
  getData(words);

  // Start matching on word input
  wordInput.addEventListener('input', startMatch);

  // Call countdown every second
  setInterval(countdown, 1000);

  //Check game status
  setInterval(checkStatus, 50);
}

// Start Match
function startMatch() {
  if(matchWords()) {
    gameOn = true;
    time = currentLevel+1; //Because of the page load, 1 extra second added
    getData(words);
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = -1;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Countdown timer
function countdown() {
  // Make sure time did not run out
  if (time > 0) {
    time--; // decrement time
  } else if (time === 0) {
    gameOn = false;
  }
  timeDisplay.innerHTML = time; // show time
}

// Check game status
function checkStatus() {
  if(!gameOn && time === 0) {
    message.innerHTML = 'Game Over';
    score = -1;
  }
}