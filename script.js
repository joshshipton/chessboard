const chessboard = document.querySelector('.chessboard');
const startBtn = document.getElementById('startBtn');
const startPosInput = document.getElementById('startPos');
const endPosInput = document.getElementById('endPos');
const result = document.getElementById('result');
const stepCounter = document.getElementById('stepCounter');

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
    // sleep for 500ms
    sleep(1);
    stepCounter.textContent = `Step: ${steps}`;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
        queue.push([newX, newY, steps + 1]);
        visited.add(`${newX},${newY}`);
        setTimeout(() => {
          chessboard.children[newY * 8 + newX].classList.add('knight');
        }, (steps + 1) * 500);
        setTimeout(() => {
            if(newX != endX || newY != endY){
            chessboard.children[newY * 8 + newX].classList.remove('knight');
            }
          }, (steps + 1) * 1000);
      }
    }
  }

  return -1;
}

startBtn.addEventListener('click', () => {
    // remove the class destination from everything in the chessboard
    let counter = 0; 
    for (const cell of chessboard.children) {
        if(counter == 0){
            counter++;
            continue;
        }
        cell.classList.remove('destination');
        // if it isnt the first cell, remove the class knight
        cell.classList.remove('knight');
    }
  const [endX, endY] = endPosInput.value.split(',').map(Number);
  chessboard.children[endY * 8 + endX].classList.add('destination');

  const minMoves = bfs(endX, endY);
  result.textContent = `Minimum number of moves: ${minMoves}`;
  console.log(`Minimum number of moves: ${minMoves}`);
});