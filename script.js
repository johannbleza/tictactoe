const game = document.querySelector(".game");
const playerTurn = document.querySelector(".playerTurn");
const resetBtn = document.querySelector(".reset");
const playerOScore = document.querySelector(".playerOScore");
const playerXScore = document.querySelector(".playerXScore");
const tie = document.querySelector(".tie");
const modal = document.querySelector(".overlay");
const winner = document.querySelector(".winner");
const playAgain = document.querySelector(".playAgain");

let cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let turnCount = 0;

playerOScore.innerHTML = localStorage.getItem("Player O")
  ? localStorage.getItem("Player O")
  : 0;
playerXScore.innerHTML = localStorage.getItem("Player X")
  ? localStorage.getItem("Player X")
  : 0;
tie.innerHTML = localStorage.getItem("Tie") ? localStorage.getItem("Tie") : 0;

let currentPlayer = "⭕";

const changeTurn = () => {
  if (currentPlayer === "⭕") {
    playerTurn.innerHTML = "Player✖️'s turn ";
    playerTurn.classList.add("xTurn");
    currentPlayer = "✖️";
  } else {
    currentPlayer = "⭕";
    playerTurn.innerHTML = "Player⭕'s turn ";
    playerTurn.classList.remove("xTurn");
  }
};

cells.forEach((cell) => {
  let cellElement = document.createElement("div");
  cellElement.classList.add("cell");
  cellElement.value = cell;
  game.appendChild(cellElement);
  cellElement.addEventListener("click", () => {
    if (!cellElement.innerHTML) {
      placeTurn(cellElement);
    }
    turnCount++;
    checkWinner();
  });
});

const placeTurn = (cell) => {
  cells[cell.value - 1] = currentPlayer;
  cell.innerHTML = currentPlayer;
  changeTurn();
};

const checkWinner = () => {
  if (cells[0] == cells[1] && cells[1] == cells[2]) {
    playerWin();
  } else if (cells[3] == cells[4] && cells[4] == cells[5]) {
    playerWin();
  } else if (cells[6] == cells[7] && cells[7] == cells[8]) {
    playerWin();
  } else if (cells[0] == cells[3] && cells[3] == cells[6]) {
    playerWin();
  } else if (cells[1] == cells[4] && cells[4] == cells[7]) {
    playerWin();
  } else if (cells[2] == cells[5] && cells[5] == cells[8]) {
    playerWin();
  } else if (cells[0] == cells[4] && cells[4] == cells[8]) {
    playerWin();
  } else if (cells[2] == cells[4] && cells[4] == cells[6]) {
    playerWin();
  } else if (turnCount == cells.length) {
    tieGame();
  }
};

const tieGame = () => {
  modal.style.display = "flex";
  winner.innerHTML = `Tie Game!🏁`;
  tie.innerHTML++;
  localStorage.setItem("Tie", tie.innerHTML);
  resetGame();
};

const playerWin = () => {
  modal.style.display = "flex";

  if (currentPlayer == "⭕") {
    winner.innerHTML = `Player✖️Wins!🎉`;
    playerXScore.innerHTML++;
    localStorage.setItem("Player X", playerXScore.innerHTML);
  } else {
    winner.innerHTML = `Player⭕Wins!🎉`;
    playerOScore.innerHTML++;
    localStorage.setItem("Player O", playerOScore.innerHTML);
  }
};

playAgain.addEventListener("click", () => {
  modal.style.display = "none";
  resetGame();
});

// Reset Score
resetBtn.addEventListener("click", () => {
  currentPlayer = "⭕";
  localStorage.setItem("Player X", 0);
  localStorage.setItem("Player O", 0);
  localStorage.setItem("Tie", 0);
  tie.innerHTML = 0;

  playerOScore.innerHTML = 0;
  playerXScore.innerHTML = 0;
  tie.innerHTML = 0;
});

const resetGame = () => {
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  turnCount = 0;
};
