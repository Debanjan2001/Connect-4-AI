function checkGameStatus(matrix,  numRows, numCols){
    /*
      Return 1 if Player 1 has won,
      Return 2 if Player 2 has won,
      Return 3 if Game has drawn,
      Return 0 if Game in Progress and not finished yet
  
    */ 
    let status = 0;
  
    const isInsideMatrix = (row, col) => {
        return (row >= 0 && row < numRows && col >= 0 && col < numCols);
    };
  
    const getHorizontalWinner = () => {
  
      let winner = 0;
  
      for(let i=0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){
          const isInside = (
            isInsideMatrix(i,j) && isInsideMatrix(i,j+1) && isInsideMatrix(i,j+2) && isInsideMatrix(i,j+3)
          );

          if(isInside && matrix[i][j] && matrix[i][j] === matrix[i][j+1] && matrix[i][j] === matrix[i][j+2] && matrix[i][j] === matrix[i][j+3]){
            winner = matrix[i][j];
            return winner;
          }
        }
      }  
      return winner;
    }
  
    const getVerticalWinner = () => {
  
      let winner = 0;
  
      for(let i=0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){
          
          const isInside = (
            isInsideMatrix(i+1,j) && isInsideMatrix(i+1,j) && isInsideMatrix(i+2,j) && isInsideMatrix(i+3,j)
          );
          
          if(isInside && matrix[i][j] && matrix[i][j] === matrix[i+1][j] && matrix[i][j] === matrix[i+2][j] && matrix[i][j] === matrix[i+3][j]){
            winner = matrix[i][j];
            return winner;
          }
        }  
      }
      return winner;
    }
  
    const getPrimaryDiagonalWinner = () => {
  
      let winner = 0;
  
      for(let i=0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){
          const isInside = (
            isInsideMatrix(i,j) && isInsideMatrix(i-1,j+1) && isInsideMatrix(i-2,j+2) && isInsideMatrix(i-3,j+3)
          );
            
          if(isInside && matrix[i][j] && matrix[i][j] === matrix[i-1][j+1] && matrix[i][j] === matrix[i-2][j+2] && matrix[i][j] === matrix[i-3][j+3]){
            winner = matrix[i][j];
            return winner;
          }
  
        }
      }  
      return winner;
    }
  
    const getSecondaryDiagonalWinner = () => {
  
      let winner = 0;
      for(let i=0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){
          const isInside = (
            isInsideMatrix(i,j) && isInsideMatrix(i+1,j+1) && isInsideMatrix(i+2,j+2) && isInsideMatrix(i+3,j+3)
          );
            
          if(isInside && matrix[i][j] && matrix[i][j] === matrix[i+1][j+1] && matrix[i][j] === matrix[i+2][j+2] && matrix[i][j] === matrix[i+3][j+3]){
            winner = matrix[i][j];
            return winner;
          }
        }
      }  
      return winner;
    }

    const isDraw = () => {
      for(let i=0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){
          if(!matrix[i][j])
            return false;
        }
      }
      return true;  
    }
    
    const horizontalWinner = getHorizontalWinner();
    const verticalWinner = getVerticalWinner();
    const primaryDiagonalWinner = getPrimaryDiagonalWinner();
    const secondaryDiagonalWinner = getSecondaryDiagonalWinner(); 

    if(!status && horizontalWinner){
        status = horizontalWinner;
    } else if(!status && verticalWinner){
        status = verticalWinner;
    } else if(!status && primaryDiagonalWinner){
        status = primaryDiagonalWinner;
    } else if(!status && secondaryDiagonalWinner){
        status = secondaryDiagonalWinner;
    } else if(!status && isDraw()){
        status = 3;
    }

    // console.log(horizontalWinner, verticalWinner, primaryDiagonalWinner, secondaryDiagonalWinner);
    return status;
}

export default checkGameStatus;


// // Test for GameStatus Check 

// test = [
//   [
//       0,
//       0,
//       0,
//       0,
//       0,
//       0,
//       0
//   ],
//   [
//       0,
//       0,
//       0,
//       0,
//       0,
//       0,
//       0
//   ],
//   [
//       0,
//       0,
//       0,
//       1,
//       2,
//       0,
//       0
//   ],
//   [
//       0,
//       0,
//       0,
//       1,
//       2,
//       0,
//       0
//   ],
//   [
//       0,
//       0,
//       0,
//       1,
//       2,
//       0,
//       0
//   ],
//   [
//       0,
//       0,
//       0,
//       1,
//       1,
//       2,
//       0
//   ]
// ]

// console.log(checkGameStatus(test,6,7));