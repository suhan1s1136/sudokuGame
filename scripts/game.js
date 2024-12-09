    
    let currentSelectedCell = null;
    let board  = TakeBoard();;
    function TakeBoard(){
        const randomPuzzle = sudokuPuzzles[Math.floor(Math.random() * sudokuPuzzles.length)];

        
        const board = [];
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const cell = randomPuzzle[i * 9 + j] === "0" ? "." : parseInt(randomPuzzle[i * 9 + j]);
                row.push(cell);
            }
            board.push(row);
        }
       console.log(board);
        return board;
        

      }
      let copyOfBoard = board.map(row => [...row]);

    function fillGameboard() {
       
     
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            const index = row * 9 + col; // Calculate the index for the current cell
            const value = board[row][col];


      
            const cell = cells[index]; // Get the cell at the calculated index
            cell.classList.remove('invalid');
      
            // If the value is a number, set it as text, otherwise leave the cell empty
            if (value !== ".") {
              cell.textContent = value;
              cell.classList.add('locked');
              // Lock cells with original numbers
            } else {
              cell.textContent = ""; // Clear the cell if the value is not a number
              
            }
          }
        }
      }
    
      function winCheck(){
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
              const index = row * 9 + col; // Calculate the index for the current cell
              if(copyOfBoard[row][col]==="."||cells[index].classList.contains('invalid'))return false;
            }
        }
        return true;
      }

      function addNumber(event) {
        if (currentSelectedCell.classList.contains('locked')) {
            return; // Don't allow changing the number in locked cells
          }
        const number = parseInt(event.target.textContent); // Get the number from the numpad button
        if (!currentSelectedCell || isNaN(number)) return; // If no cell is selected, or input is invalid, exit
      
        const rowIndex = Math.floor(Array.from(currentSelectedCell.parentElement.children).indexOf(currentSelectedCell) / 9);
        const colIndex = Array.from(currentSelectedCell.parentElement.children).indexOf(currentSelectedCell) % 9;
      
        const previousValue = copyOfBoard[rowIndex][colIndex];
        if (previousValue !== ".") {
          copyOfBoard[rowIndex][colIndex] = "."; // Clear the previous value
        }
      
        // Validate the new number
        const isValid = checkForInvalid(number, rowIndex, colIndex);
      
        // Update the cell's text content and board state
        currentSelectedCell.textContent = number;
      
        if (isValid) {
          currentSelectedCell.classList.remove("invalid"); // Remove invalid highlight if valid
          copyOfBoard[rowIndex][colIndex] = number; // Update the board state
        } else {
          currentSelectedCell.classList.add("invalid"); // Highlight as invalid
        }
        if(winCheck()){
            winText.classList.remove('hidden');
            
        }
      }

      function removeText(){
        winText.classList.add('hidden');

      }
      
  
  function highlightRowCol(rowIndex, colIndex) {
   
    // Highlight the entire row
    for (let i = rowIndex * 9; i < (rowIndex + 1) * 9; i++) {
      cells[i].classList.add('highlight');
    }
    
    // Highlight the entire column
    for (let i = colIndex; i < 81; i += 9) {
      cells[i].classList.add('highlight');
    }
    const startRow = Math.floor(rowIndex / 3) * 3; // Starting row of the block
  const startCol = Math.floor(colIndex / 3) * 3; // Starting column of the block

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      const index = r * 9 + c; // Calculate the cell index for the block
      cells[index].classList.add('highlight');
    }
  }
   
  }
  
  // Function to reset highlights and invalid state
  function resetHighlights() {
    cells.forEach(cell => {
      cell.classList.remove('highlight');
    });
  }
  
  function checkForInvalid(number, rowIndex, colIndex) {
    let invalid = false;
  
    // Check if the number already exists in the row
    for (let col = 0; col < 9; col++) {
      if (copyOfBoard[rowIndex][col] === number) {
        invalid = true;
        break;
      }
    }
  
    // Check if the number already exists in the column
    for (let row = 0; row < 9; row++) {
      if (copyOfBoard[row][colIndex] === number) {
        invalid = true;
        break;
      }
    }
  
    // Check if the number exists in the 3x3 grid
    const gridRowStart = Math.floor(rowIndex / 3) * 3;
    const gridColStart = Math.floor(colIndex / 3) * 3;
  
    for (let r = gridRowStart; r < gridRowStart + 3; r++) {
      for (let c = gridColStart; c < gridColStart + 3; c++) {
        if (copyOfBoard[r][c] === number) {
          invalid = true;
          break;
        }
      }
    }
  
    return !invalid; // Return true if valid, false otherwise
  }
  
  // Function to handle cell selection and input
  function selectedCell(event) {
    const selected = event.target;
  
    // Prevent interaction if the cell is locked (has original number)
   
    currentSelectedCell = selected;
  
    const rowIndex = Math.floor(Array.from(selected.parentElement.children).indexOf(selected) / 9);
    const colIndex = Array.from(selected.parentElement.children).indexOf(selected) % 9;
  
    // Reset all highlights
    resetHighlights();
  
    // Highlight the entire row and column
    highlightRowCol(rowIndex, colIndex);
  
      
  }

 
  
  window.onload = fillGameboard;
  
  