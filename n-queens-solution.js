function generateBoard(size) {
  chessBoard = [];
  if (size % 2 === 0) {
    for (let i = 0; i < size * size; i++) {
      chessBoard.push("0");
    }
    for (let i = 0; i < size * size; i += size) {
      chessBoard[getRndInteger(i + size, i)] = "1";
    }
  }
  return chessBoard;
}

function generatePopulation(quant, size) {
  let population = [];

  for (let i = 0; i < quant; i++) {
    population.push(generateBoard(size));
  }

  return population;
}

function calculateFitness(board, size) {
  let fitness = maxFitness(size);
  for (let row = 0; row < board.length; row += size) {
    for (let pos = row; pos < row + size; pos++) {
      if (board[pos] === "1") {
        fitness -= checkLeftDiagonal(board, pos, row, size);
        fitness -= checkRightDiagonal(board, pos, row, size);
        fitness -= checkVertical(board, pos, row, size);
      }
    }
  }
  return fitness;
}

function checkLeftDiagonal(board, pos, row, size) {
  let counter = 0;
  let curPos = pos + (size - 1);
  for (let prevRow = row; prevRow < board.length; prevRow += size) {
    if (curPos >= prevRow + size) {
      if (board[curPos] === "1") {
        counter += 1;
      }
      curPos += size - 1;
    } else {
      return counter;
    }
  }
  return counter;
}

function checkRightDiagonal(board, pos, row, size) {
  let counter = 0;
  let curPos = pos + (size + 1);
  for (let prevRow = row; prevRow < board.length; prevRow += size) {
    if (curPos <= prevRow + (size * 2 - 1)) {
      if (board[curPos] === "1") {
        counter += 1;
      }
      curPos += size + 1;
    } else {
      return counter;
    }
  }
  return counter;
}

function checkVertical(board, pos, row, size) {
  let counter = 0;
  let curPos = pos + size;
  for (let prevRow = row; prevRow < board.length; prevRow += size) {
    if (board[curPos] === "1") {
      counter += 1;
    }
    curPos += size;
  }
  return counter;
}

function tournament(population, size) {
  best = population[0];
  population.forEach((ind) => {
    if (calculateFitness(ind, size) > calculateFitness(best, size)) {
      best = ind;
    }
  });
  return best;
}

function ranking(population, selectedPopulation, size) {
  let rankedPopulation = population;
  for (let i = 0; i < rankedPopulation.length; i++) {
    for (let j = 0; j < rankedPopulation.length - 1; j++) {
      let temp = [];
      if (
        calculateFitness(rankedPopulation[j], size) <
        calculateFitness(rankedPopulation[j + 1], size)
      ) {
        temp = rankedPopulation[j];
        rankedPopulation[j] = rankedPopulation[j + 1];
        rankedPopulation[j + 1] = temp;
      }
    }
  }

  return rankedPopulation.splice(0, selectedPopulation);
}

function populationCrossing(population) {
  let populationToCross = [...population];
  let crossedPopulation = [];

  for (let i = 0; i < population.length / 2; i++) {
    let length = populationToCross.length;
    let crossedInd = [];

    let indexOne = getRndInteger(0, length - 1);
    let indexTwo = getRndInteger(0, length - 1);

    let parentOne = populationToCross[indexOne];
    populationToCross.splice(indexOne, 1);

    let parentTwo = populationToCross[indexTwo];
    populationToCross.splice(indexTwo, 1);

    crossedInd = crossedInd.concat(parentOne.splice(0, parentOne.length / 2));
    crossedInd = crossedInd.concat(
      parentTwo.splice(parentTwo.length / 2, parentTwo.length)
    );

    crossedPopulation.push(crossedInd);
  }

  return crossedPopulation;
}

function swapMutation(board, size) {
  chessBoard = [...board];

  arrayRows = [];
  for (let row = 0; row < board.length; row += size) {
    arrayRows.push(row);
  }
}

function printBoard(board) {
  let auxArray = [];
  for (let row = 0; row < board.length; row += boardSize) {
    for (let pos = row; pos < row + boardSize; pos++) {
      auxArray.push(board[pos]);
    }
    console.log(...auxArray);
    auxArray = [];
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function maxFitness(size) {
  let max = 0;
  for(let i = 0; i < size; i++) {
    max += i;    
  }
  return max;
}

let boardSize = 4;
// let population = generatePopulation(100, boardSize);
// let rankedPopulation = ranking(population, 20, boardSize);
// let crossedPopulation = populationCrossing(rankedPopulation);

let board = generateBoard(boardSize);
let counter = 0;

while(calculateFitness(board, boardSize) < maxFitness(boardSize)) {
  board = generateBoard(boardSize);  
  counter ++;
}

console.log(`Solução encontrada após ${counter} tentativas: ` );
printBoard(board);