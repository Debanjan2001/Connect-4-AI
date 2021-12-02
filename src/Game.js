import React from 'react';

// Game Board
import Board from './Board'

import { Card, Container, Grid } from '@mui/material';
import Actions from './Actions';

import { useState } from 'react'

import checkGameStatus from './GameStatus'
import { Box } from '@mui/system';


const Game = ()=>{

  const numRows = 6;
  const numCols = 7;

  const [matrix, setMatrix] = useState(
    Array.from(
      {length: numRows},()=> Array.from(
        {length: numCols}, () => 0
      )
    )
  );

  const [gameStarted, setGameStarted] =  useState(false);
  const [resetGame, setResetGame] =  useState(false);
  
  //0 if none  1 if PlayerOne else 2
  const [currentPlayer,setCurrentPlayer] = useState(0);
  const [gameText, setGameText] = useState("");

  const toggleCurrentPlayer = ()=>{
    let nextPlayer = 2;
    if(currentPlayer === 2 || currentPlayer === 0){
      nextPlayer = 1;
    } 
    setCurrentPlayer(nextPlayer);
    return nextPlayer;
  }

  const getGameText = () => {
    const gameStatus = checkGameStatus(matrix, numRows, numCols);
    const nextPlayer = ( (currentPlayer === 0) ? 1 : (currentPlayer === 1) ? 2 : 1 );
    const currentPlayerText = "Player " + currentPlayer;
    const nextPlayerText = "Player " + nextPlayer;
    let textToShow = "";
    if(gameStatus === 0){
      textToShow = "Current Turn: "+ nextPlayerText ;
    } else if(gameStatus === 1 || gameStatus === 2){
      textToShow =  currentPlayerText + (currentPlayer === 1 ? "(Red)" : "(Blue)") + " has won !" ;
    } else if (gameStatus === 3){
      textToShow = "Game Drawn!";
    }
    // console.log(gameStatus)
    // console.log(gameText);
    return textToShow;
  }

  const handleStartGame = () => {
    setGameStarted(true);
    setResetGame(false);
    setGameText(getGameText());
    toggleCurrentPlayer();
    // console.log("Success");
  }

  const handleResetGame = () => {

    if(resetGame || (!gameStarted)){
      // if already at start/reset, dont do the same operations again and again
      return;
    }

    const currentMatrix = matrix.slice();
    for(let i=0;i<numRows;i++){
      for(let j=0;j<numCols;j++){
          currentMatrix[i][j] = 0;
      }
    }

    setMatrix(currentMatrix);
    setGameStarted(false);
    setResetGame(true);
    setCurrentPlayer(0); 
  }

  const handleBoardClick = (row, col) => {
    // row, col => where you clicked 
    if(!gameStarted){
      alert("Start the game first");
      return;
    }

    const currentMatrix = matrix.slice();

    const currentGameStatus = checkGameStatus(currentMatrix, numRows, numCols);
    if(currentGameStatus > 0){
      return;
    }

    let rowToChange = -1;
    for(let i = 0; i < numRows; i++){
        if(currentMatrix[i][col]){
          break;
        }
        rowToChange += 1;
    }
    if(rowToChange < 0){
      return;
    }

    currentMatrix[rowToChange][col] = currentPlayer;
    
    console.log(matrix);
    setGameText(getGameText());
    setMatrix(currentMatrix);
    toggleCurrentPlayer();
};

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Box sx={{ m:5, borderRadius:100 }}>
       <Card sx={{ maxWidth: 800 ,  p: 3 }}>
      <Grid item> 
        <Board 
          matrix={matrix}
          onClick={(row,col)=>handleBoardClick(row,col)} 
        />
      </Grid>
      </Card>
      </Box>

      <Grid item>
        <Actions 
          gameText={gameText}
          gameStarted={gameStarted}
          gameReset={resetGame}
          onStartGame={()=>{handleStartGame()}}
          onResetGame={()=>{handleResetGame()}}
        />
      </Grid>

    </Grid>
  );
}
  
export default Game;