const gameOverMusic = new Audio("gameover.mp3");
const music = new Audio("music.mp3");
const turnMusic = new Audio("ting.mp3");
const winningMusic = new Audio("winning.mp3");
let turn = "X";
let gameOver = false;
const resetBtn = document.querySelector("#reset");

const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

const checkWin = () => {
  let boxTexts = document.getElementsByClassName("boxtext");
  let win = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [2, 4, 6, 5, 15, 135],
    [0, 4, 8, 5, 15, 45],
  ];
  win.forEach((e) => {
    if (
      boxTexts[e[0]].innerText === boxTexts[e[1]].innerText &&
      boxTexts[e[2]].innerText === boxTexts[e[0]].innerText &&
      boxTexts[e[0]].innerText !== ""
    ) {
      document.getElementsByClassName("info")[0].innerText =
        boxTexts[e[0]].innerText + " Won";
      gameOver = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      setTimeout(function () {
        winningMusic.play();
      }, 500);
      document.querySelector(".line").style.width = "20vw";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
    }
  });
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = changeTurn();
      turnMusic.play();
      checkWin();
      if (!gameOver) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

resetBtn.addEventListener("click", () => {
  let box = document.getElementsByClassName("boxtext");
  Array.from(box).forEach((x) => {
    x.innerText = "";
  });
  turn = "X";
  gameOver = false;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
  document.querySelector(".line").style.width = "0vw";
});
