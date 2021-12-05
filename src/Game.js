import React from 'react';

// Game Board
import Board from './Board'
import checkGameStatus from './GameStatus'
import Actions from './Actions';


import { Card, CardContent, Grid } from '@mui/material';
import { useState } from 'react'
import getWinningPositions from './WinningPositions';

import miniMax from './AI';


const Game = () => {

  const numRows = 6;
  const numCols = 7;

  const [matrix, setMatrix] = useState(
    Array.from(
      { length: numRows }, () => Array.from(
        { length: numCols }, () => 0
      )
    )
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const [gameTextObject, setGameTextObject] = useState({
    gameText: "",
    gameTextMUIBackground: "error",
  });
  const [winningPosition, setWinningPosition] = useState(null);


  const dropDisk = (board, col, value) => {
    for (let i = numRows - 1; i >= 0; i--) {
      if (!board[i][col]) {
        board[i][col] = value;
        return;
      }
    }
  }

  const [aiValue, setAIValue] = useState(0);

  const updateDisplayGameText = () => {
    const gameStatus = checkGameStatus(matrix, numRows, numCols);
    const currentPlayer = ((lastPlayer === 1) ? 2 : 1);

    let displayText = "";
    if (gameStatus === 0) {
      displayText = "Current Turn: " + (gameMode === 1 ? ("Player " + currentPlayer) + (currentPlayer === 1 ? "(Red)" : "(Blue)") : ((currentPlayer === aiValue) ? "AI" : "Player"));
    } else if (gameStatus === 1 || gameStatus === 2) {
      if (gameMode === 1) {
        displayText = "Player " + currentPlayer + (currentPlayer === 1 ? "(Red)" : "(Blue)") + " Has Won !";
      } else {
        displayText = ((aiValue === gameStatus) ? "AI" : "Player") + " Has Won !";
      }
    } else if (gameStatus === 3) {
      displayText = "Game Draw !"
    }
    setGameTextObject({
      gameText: displayText,
      gameTextMUIBackground: (currentPlayer === 1) ? "error" : "info",
    })
  }


  const handleOpenStartGameModal = () => {
    setOpenStartGameModal(true);
  }

  const handleResetGame = () => {

    const currentMatrix = matrix.slice();
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        currentMatrix[i][j] = 0;
      }
    }

    setMatrix(currentMatrix);
    setGameStarted(false);
    setResetGame(true);
    setLastPlayer(0);
    setGameTextObject({
      gameText: "",
      gameTextMUIBackground: "error",
    }); // could be confusing to others ?? is it?
    setWinningPosition(null);
  }

  const [openInvalidClickModal, setOpenInvalidClickModal] = useState(false);

  const handleCloseInvalidClickModal = () => {
    setOpenInvalidClickModal(false);
  }

  const [openStartGameModal, setOpenStartGameModal] = useState(false);

  const handleCloseStartGameModal = () => {
    setOpenStartGameModal(false);
  }

  const [lastPlayer, setLastPlayer] = useState(1);
  const [gameMode, setGameMode] = useState(0);

  const makeMoveWithAI = (board, AI_VALUE) => {
    // make the best possible move on the board;
    // arrays are passed by reference, so we dont need to return the new board state as well.
    const [depth, alpha, beta, isMaximizingPlayer] = [0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, true]
    const [bestScore, bestColumn] = miniMax(
      board,
      depth,
      alpha,
      beta,
      isMaximizingPlayer
    )

    dropDisk(board, bestColumn, AI_VALUE);
  }

  const handleGameModeSelection = (choiceID) => {
    // choiceID => will pass 1 if multiplayer, 2 if AI
    setGameMode(choiceID);
    setGameStarted(true);
    setResetGame(false);
    handleCloseStartGameModal();

    if (choiceID === 1) {
      // multiplayer
      // we already have done all that was required 
      setGameTextObject({
        gameText: "Current Turn: Player 1(Red)",
        gameTextMUIBackground: "error",
      });
    } else {
      // ai will play
      // choose ai val;
      const AI_VALUE = 1 + Math.floor(Math.random() * 2);
      const PLAYER_VALUE = (AI_VALUE === 2 ? 1 : 2);
      setAIValue(AI_VALUE);
      if (PLAYER_VALUE === 1) {
        // we dont need to do anything
        // player will initiate his move
        // maybe we can setup the game text and all

      } else if (AI_VALUE === 1) {
        // ai needs to play asap.
        const currentMatrix = matrix.slice();
        makeMoveWithAI(currentMatrix, AI_VALUE);
        setMatrix(currentMatrix);
        setLastPlayer(AI_VALUE);
      }

      setGameTextObject({
        gameText: "Current Turn: Player",
        gameTextMUIBackground: (PLAYER_VALUE === 1 ? "error" : "info"),
      });

    }

  }

  const handleBoardClick = (row, col) => {
    // row, col => where you clicked 
    if (!gameStarted) {
      setOpenInvalidClickModal(true);
      return;
    }

    const currentMatrix = matrix.slice();
    const currentGameStatus = checkGameStatus(currentMatrix, numRows, numCols);

    if (currentGameStatus !== 0) {
      return;
    }

    let currPlayer = 1;
    if (lastPlayer === 1) {
      currPlayer = 2;
    }

    if (gameMode === 1) {
      // multiplayer and someone clicked
      dropDisk(currentMatrix, col, currPlayer);

    } else if (gameMode === 2) {
      // AI battle and someone clicked
      // so you drop and then force the AI to play.
      dropDisk(currentMatrix, col, currPlayer);
      setMatrix(currentMatrix);
      currPlayer = (currPlayer === 1) ? 2 : 1;
      // its time for AI;
      makeMoveWithAI(currentMatrix, currPlayer);
    }

    setWinningPosition(getWinningPositions(currentMatrix, numRows, numCols));
    setMatrix(currentMatrix);
    updateDisplayGameText();
    setLastPlayer(currPlayer);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >

      <Grid item>
        <Card sx={{ maxWidth: 1000, pl: 1, pr: 1, mt: 3, ml: 4, borderRadius: 3 }}>
          <CardContent>
            <Board
              matrix={matrix}
              onClick={
                (row, col) => { handleBoardClick(row, col) }
              }
              winningPosition={winningPosition}
              openInvalidClickModal={openInvalidClickModal}
              handleCloseInvalidClickModal={handleCloseInvalidClickModal}
            />
          </CardContent>

        </Card>

      </Grid>

      <Grid item>
        <Actions
          gameTextObject={gameTextObject}
          gameStarted={gameStarted}
          gameReset={resetGame}
          onStartGame={() => { handleOpenStartGameModal() }}
          onResetGame={() => { handleResetGame() }}
          openStartGameModal={openStartGameModal}
          handleCloseStartGameModal={handleCloseStartGameModal}
          handleGameModeSelection={(choiceID) => { handleGameModeSelection(choiceID) }}
        />
      </Grid>

    </Grid>
  );
}

export default Game;