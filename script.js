const server = require('./server.js');

const gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function checkWin() {
  // Check rows
  if (gameBoard[0] === currentPlayer && gameBoard[1] === currentPlayer && gameBoard[2] === currentPlayer) {
    return true;
  }
  if (gameBoard[3] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[5] === currentPlayer) {
    return true;
  }
  if (gameBoard[6] === currentPlayer && gameBoard[7] === currentPlayer && gameBoard[8] === currentPlayer) {
    return true;
  }

  // Check columns
  if (gameBoard[0] === currentPlayer && gameBoard[3] === currentPlayer && gameBoard[6] === currentPlayer) {
    return true;
  }
  if (gameBoard[1] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[7] === currentPlayer) {
    return true;
  }
  if (gameBoard[2] === currentPlayer && gameBoard[5] === currentPlayer && gameBoard[8] === currentPlayer) {
    return true;
  }

  // Check diagonals
  if (gameBoard[0] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[8] === currentPlayer) {
    return true;
  }
  if (gameBoard[2] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[6] === currentPlayer) {
    return true;
  }

  return false;
}

function resetGame() {
  gameBoard.fill('');
  currentPlayer = 'X';
}

server.start();