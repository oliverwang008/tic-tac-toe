const Screen = require("./screen");
const Cursor = require("./cursor");
const TTT = require("./ttt");

class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    let result = [];
    for (let r =0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if(grid[r][c] === ' ') {
          result.push({ row: r, col: c});
        }
      }
    }
    return result;
  }

  static randomMove(grid) {
    // Your code here
    let validMoves = ComputerPlayer.getValidMoves(grid);
    let randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];

  }

  static getWinningMoves(grid, symbol) {
    // Your code here
    let result = [];
    let validMoves = ComputerPlayer.getValidMoves(grid);
    for (let i = 0; i < validMoves.length; i++) {
      grid[validMoves[i].row][validMoves[i].col] = symbol;
      if (ComputerPlayer.checkWin(grid) === symbol) {
        result.push(validMoves[i]);
      }
      grid[validMoves[i].row][validMoves[i].col] = ' ';
    }
    return result;

  }

  static getSmartMove(grid, symbol) {
    // Your code here
    if (ComputerPlayer.getWinningMoves(grid, symbol).length > 0) {
      return ComputerPlayer.getWinningMoves(grid, symbol)[0];
    } else {
      let blockMoves = [];
      if (symbol === 'X') {
        blockMoves = ComputerPlayer.getWinningMoves(grid, 'O');
      } else {
        blockMoves = ComputerPlayer.getWinningMoves(grid, 'X');
      }
      if (blockMoves.length > 0) {
        return blockMoves[0];
      } else {
        return ComputerPlayer.randomMove(grid);
      }
    }

  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    for (let r = 0; r < 3; r++) {
      if (grid[r][0] === 'X' && grid[r][1] === 'X' && grid[r][2] === 'X') {
        return 'X';
      }
      if (grid[r][0] === 'O' && grid[r][1] === 'O' && grid[r][2] === 'O') {
        return 'O';
      }
    }
    for (let c = 0; c < 3; c++) {
      if (grid[0][c] === 'X' && grid[1][c] === 'X' && grid[2][c] === 'X') {
        return 'X';
      }
      if (grid[0][c] === 'O' && grid[1][c] === 'O' && grid[2][c] === 'O') {
        return 'O';
      }
    }
    if (grid[0][0] === 'X' && grid[1][1] === 'X' && grid[2][2] === 'X') {
      return 'X';
    }
    if (grid[0][0] === 'O' && grid[1][1] === 'O' && grid[2][2] === 'O') {
      return 'O';
    }
    if (grid[0][2] === 'X' && grid[1][1] === 'X' && grid[2][0] === 'X') {
      return 'X';
    }
    if (grid[0][2] === 'O' && grid[1][1] === 'O' && grid[2][0] === 'O') {
      return 'O';
    }
    let tie = true;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[r][c] === ' ') {
          tie = false;
        }
      }
    }
    if (tie) {
      return 'T';
    } else {
      return false;
    }

  }

}

module.exports = ComputerPlayer;
