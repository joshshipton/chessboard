const chessboard = document.querySelector('.chessboard');
const startBtn = document.getElementById('startBtn');
const startPosInput = document.getElementById('startPos');
const endPosInput = document.getElementById('endPos');
const result = document.getElementById('result');
const stepCounter = document.getElementById('stepCounter');
const directions = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]
];

function isValidMove(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

async function bfs(endX, endY) {
  const queue = [];
  const visited = new Set();
  queue.push([0, 0, 0]);
  visited.add(`0,0`);

  let destinationReached = false;

  while (queue.length > 0 && !destinationReached) {
    const [x, y, steps] = queue.shift();
    if (x === endX && y === endY) {
        for (const cell of chessboard.children) {
            if(!cell.classList.contains('destination') && !cell.classList.contains('start')){
                cell.classList.remove('knight');
            }
        }
      return steps;
    }
    
    // Update step counter
    stepCounter.textContent = `Step: ${steps}`;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`) && !destinationReached) {
        queue.push([newX, newY, steps + 1]);
        visited.add(`${newX},${newY}`);

        // Add knight class to the cell
        if(!destinationReached){
        setTimeout(() => {
          chessboard.children[newY * 8 + newX].classList.add('knight');
        }, (steps + 1) * 500);
    }

        setTimeout(() => {
          if (newX !== endX || newY !== endY) {
            chessboard.children[newY * 8 + newX].classList.remove('knight');
          }
        }, (steps + 1) * 2500);

        // Wait for 500ms before proceeding to the next step
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  return -1;
}

startBtn.addEventListener('click', async () => {
  // Remove the class 'destination' from all cells in the chessboard
  for (const cell of chessboard.children) {
    if(cell.classList.contains('start')) continue;  
    cell.classList.remove('destination');
    cell.classList.remove('knight');
  }

  const [endX, endY] = endPosInput.value.split(',').map(Number);
  chessboard.children[endY * 8 + endX].classList.add('destination');
  
  const minMoves = await bfs(endX, endY);
  result.textContent = `Minimum number of moves: ${minMoves}`;
  console.log(`Minimum number of moves: ${minMoves}`);
});