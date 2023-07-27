const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let players = [];
let currentPlayer = null;

function checkWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return true;
  }

  return false;
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  players = [];
  currentPlayer = null;
}

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (playerName) => {
    if (players.length < 2) {
      players.push(playerName);
      socket.emit('playerJoined', playerName);
      if (players.length === 2) {
        currentPlayer = players[0];
        io.emit('gameStart', currentPlayer);
      }
    } else {
      socket.emit('gameFull');
    }
  });

  socket.on('makeMove', (data) => {
    const { row, col, player } = data;
    if (player === currentPlayer && board[row][col] === '') {
      board[row][col] = player;
      io.emit('moveMade', { row, col, player });
      if (checkWin()) {
        io.emit('gameOver', currentPlayer);
        resetGame();
      } else {
        currentPlayer = players.find(p => p !== currentPlayer);
        io.emit('nextTurn', currentPlayer);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    resetGame();
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});