function isValidc(r, c, x) {
    for (let i = 0; i < 9; i++) {
      // Check the row and column
      if (board[i][c] == x) return false;
      if (board[r][i] == x) return false;
  
      // Check the sub-grid
      const subRow = Math.floor(r / 3) * 3 + Math.floor(i / 3);
      const subCol = Math.floor(c / 3) * 3 + (i % 3);
      if (board[subRow][subCol] == x) return false;
    }
    return true;
  }
  
  function sendSolution() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") { // Find an empty cell
          for (let c = 1; c <= 9; c++) {
            if (isValidc(i, j, c)) {
              board[i][j] = c; // Try placing a number
  
              // Recursively solve the rest of the board
              if (sendSolution()) return true;
  
              // If not solvable, backtrack
              board[i][j] = ".";
            }
          }
          return false; // Return false if no valid number fits
        }
      }
    }
    return true; // Return true if the board is solved
  }

  function fillAnswer() {
     
    
      
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const index = row * 9 + col; 
          const value = board[row][col];

    
          const cell = cells[index]; 
    
            cell.textContent = value;
            
         
        }
      }
    }
  
  
  function solveSudoku() {
    if (sendSolution()) {
      console.log("Sudoku Solved:");
      console.log(board); 
      fillAnswer(); 
    } else {
      console.log("No solution exists for the given board.");
      return null; // Indicate no solution was found
    }
  }
  