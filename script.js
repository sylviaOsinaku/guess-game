"use strict";
console.log("heyy");

const levels = [0, 1, 2];

const userInput = document.querySelector("#number");
const myForm = document.querySelector("form");
const yourScore = document.querySelector(".your-score");
const chances = document.querySelector(".chances");
const highScore = document.querySelector(".high-score");
const userGameState = document.querySelector(".user-game-state");
const displayGameRange = document.querySelector(".between");
const userLossUi = document.querySelector(".user-loss-ui");
const tryAgianBtnAfterUserLost = document.querySelector(
  ".try-again-game-ender"
);
const tryAgainAfterUserWinsBtn = document.querySelector(".try-again-btn");

let score = 20;
let randomNumber;
let userChances = 5;
let highscore = 0;

const getRandomNumber = (max) => {
  randomNumber = Math.trunc(Math.random() * max);
  console.log(randomNumber);
  return randomNumber;
};
getRandomNumber(20);

const changeDom = () => {
  yourScore.textContent = score;
  chances.textContent = userChances;
  highScore.textContent = highscore;
};
const UserWins = () => {
  userChances = 5;
  highscore >= score ? (highscore += 4) : (highscore = score);
  userGameState.textContent = "You Win 🥇🎉";
  changeDom();
  tryAgainAfterUserWinsBtn.classList.add("shadow");
};

const userLost = () => {
  score > 0 ? (score -= 4) : (score = 0);
  userChances -= 1;
  userInput.value > randomNumber
    ? (userGameState.textContent = "Too High!")
    : (userGameState.textContent = "Too Low!");
  changeDom();
};

const userExceedChances = () => {
  userLossUi.classList.remove("hidden");
};

const tryAgainAfterUserEndFunc = () => {
  userLossUi.classList.add("hidden");
  score = 20;
  randomNumber;
  userChances = 5;
  highscore = 0;
  userGameState.textContent = "Start Guessing!";
  changeDom();
  getRandomNumber(20);
};

const tryAGainAfterUserWin = () => getRandomNumber(20);

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (userInput.value.trim("") !== "" || +userInput.value >= 0) {
    console.log(userInput.value);
    if (userChances >= 1) {
      userLossUi.classList.add("hidden");
      if (randomNumber === +userInput.value) {
        UserWins();
      }
      if (randomNumber !== +userInput.value) {
        userLost();
      }
    } else {
      userExceedChances();
    }
  }
  userInput.value = "";
});

tryAgianBtnAfterUserLost.addEventListener("click", tryAgainAfterUserEndFunc);

tryAgainAfterUserWinsBtn.addEventListener("click", tryAGainAfterUserWin);
