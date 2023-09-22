const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require("./computer-player");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    Screen.setBackgroundColor(0, 0, 'yellow');


    Screen.addCommand('up', 'cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'place move', this.placeMove.bind(this));

    Screen.render();
  }

  placeMove() {
    let r = this.cursor.row;
    let c = this.cursor.col;
    if (this.grid[r][c] === ' ') {
      if (this.playerTurn === 'O') {
        this.grid[r][c] = 'O';
        this.playerTurn = 'X';
        Screen.setGrid(r, c, 'O');
        Screen.render();
      } else {
        this.grid[r][c] = 'X';
        this.playerTurn = 'O'
        Screen.setGrid(r, c, 'X');
        Screen.render();
      }
    }
    let winner = ComputerPlayer.checkWin(this.grid);
    if (winner) {
      TTT.endGame(winner);
    } else {
      if (this.playerTurn === 'O') {
        console.log('O');
        let smartMove = ComputerPlayer.getSmartMove(this.grid, 'O');
        this.grid[smartMove.row][smartMove.col] = 'O'
        this.playerTurn = 'X';
        Screen.setGrid(smartMove.row, smartMove.col, 'O');
        Screen.render();
      } else {
        console.log('X');
        let smartMove = ComputerPlayer.getSmartMove(this.grid, 'X');
        this.grid[smartMove.row][smartMove.col] = 'X'
        this.playerTurn = 'O';
        Screen.setGrid(smartMove.row, smartMove.col, 'X');
        Screen.render();
      }
      winner = ComputerPlayer.checkWin(this.grid);
      if (winner) {
        TTT.endGame(winner);
      }
    }

  };

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

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
