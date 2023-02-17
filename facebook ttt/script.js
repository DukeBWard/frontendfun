const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#restart');
const board = new Array(9).fill(null);
let currentPlayer = 'x';
let gameEnded = false;

function playTurn(cell, index) {
  if (gameEnded) return;
  if (board[index]) return;

  board[index] = currentPlayer;
cell.classList.add(currentPlayer);
cell.innerText = currentPlayer.toUpperCase();
checkForWin();
switchPlayer();
}

function checkForWin() {
const winningCombos = [
// horizontal
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
// vertical
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
// diagonal
[0, 4, 8],
[2, 4, 6]
];

for (let combo of winningCombos) {
const [a, b, c] = combo;
if (board[a] && board[a] === board[b] && board[b] === board[c]) {
gameEnded = true;
cells[a].classList.add('winning');
cells[b].classList.add('winning');
cells[c].classList.add('winning');
alert('${currentPlayer.toUpperCase()} wins!');
break;
}
}

if (!board.includes(null)) {
gameEnded = true;
alert("It's a tie!");
}
}

function switchPlayer() {
currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function restartGame() {
board.fill(null);
cells.forEach(cell => {
cell.classList.remove('x', 'o', 'winning');
cell.innerText = '';
});
currentPlayer = 'x';
gameEnded = false;
}

cells.forEach(cell => {
cell.addEventListener('click', () => {
playTurn(cell, cell.dataset.cell);
});
});

restartButton.addEventListener('click', restartGame);