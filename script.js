const chessboard = document.querySelector('.chessboard');
const startBtn = document.getElementById('startBtn');
const startPosInput = document.getElementById('startPos');
const endPosInput = document.getElementById('endPos');
const result = document.getElementById('result');

const directions = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1]
];

function isValidMove(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function bfs(endX, endY) {
  const queue = [];
  const visited = new Set();

  queue.push([0, 0, 0]);
  visited.add(`0,0`);

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();

    if (x === endX && y === endY) {
      return steps;
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
        queue.push([newX, newY, steps + 1]);
        visited.add(`${newX},${newY}`);
        setTimeout(() => {
          chessboard.children[newY * 8 + newX].classList.add('knight');
        }, (steps + 1) * 500);
      }
    }
  }

  return -1;
}

startBtn.addEventListener('click', () => {
  const [endX, endY] = endPosInput.value.split(',').map(Number);

  const minMoves = bfs(endX, endY);
  result.textContent = `Minimum number of moves: ${minMoves}`;
  console.log(`Minimum number of moves: ${minMoves}`);
});