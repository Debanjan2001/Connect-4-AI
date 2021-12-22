import React, { useEffect } from "react";

// Game Board
import Board from "./Board";
import checkGameStatus from "./GameStatus";
import Actions from "./Actions";

import { Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";
import getWinningPositions from "./WinningPositions";

import miniMax from "./AI";

import io from "socket.io-client";


const difficultyToMaxDepth = {
    1: 0,
    2: 1,
    3: 5,
};

const socket = io.connect();

const Game = () => {
    const numRows = 6;
    const numCols = 7;

    const [matrix, setMatrix] = useState(
        Array.from({ length: numRows }, () =>
            Array.from({ length: numCols }, () => 0)
        )
    );

    const [gameStarted, setGameStarted] = useState(false);
    const [resetGame, setResetGame] = useState(false);

    const [gameTextObject, setGameTextObject] = useState({
        gameText: "",
        gameTextMUIBackground: "error",
    });
    const [winningPosition, setWinningPosition] = useState(null);
    const [aiValue, setAIValue] = useState(0);
    const [openInvalidClickModal, setOpenInvalidClickModal] = useState(false);
    const [openConfirmGameModal, setOpenConfirmGameModal] = useState(false);
    const [lastPlayer, setLastPlayer] = useState(0);

    // false if multiplayer, true if cpu
    const [gameModeCPU, setGameModeCPU] = useState(false);

    //default difficulty is medium(2)
    const [difficulty, setDifficulty] = useState(2);

    // using websockets ? or not
    const [isLocalGame, setIsLocalGame] = useState(false);

    const [roomId, setRoomId] = useState("");
    const [isRoomFull, setIsRoomFull] = useState(false);
    const [onlinePlayerNumber, setOnlinePlayerNumber] = useState(0);

    const [isWaiting, setIsWaiting] = useState(false);


    useEffect(() => {

        socket.on("room-full", (message) => {
            // console.log(message);
            setIsRoomFull(true);
        })

        socket.on("room-available", (message) => {
            // console.log(message);
            setIsRoomFull(false);
        })

        socket.on("allot-number", (num) => {
            setOnlinePlayerNumber(num);
        })

        socket.on("start-waiting",(message) => {
            setIsWaiting(true);
            // console.log(message);
        })

        socket.on("finish-waiting",(message) => {
            setIsWaiting(false);
            // console.log(message);
        })

        socket.on("broadcast-click", (data) => {
            const playerNum = data.playerNum;
            const col = data.col;
            broadcastClick(col, playerNum);
        });

        socket.on("broadcast-reset",(message)=>{
            // console.log(message);
            handleResetGame();
        })

        socket.on("broadcast-leave",(message)=>{
            // console.log(message);
            handleResetGame();
            // make the other client the first player (if any client available in room)
            setOnlinePlayerNumber(1);
            // keep the other client waiting(if any)
            setIsWaiting(true);
        })

        // update only once after component renders
        // passing the empty dependency list to achieve that
        // use with caution
    }, []);


    const broadcastClick = (col, playerNum) => {
        // console.log(col, playerNum);
        const currentMatrix = matrix.slice();
        dropDisk(currentMatrix, col, playerNum);
        setWinningPosition(
            getWinningPositions(currentMatrix, numRows, numCols)
        );
        setMatrix(currentMatrix);
        setLastPlayer(playerNum);
        updateDisplayGameText(playerNum);
    }

    const handleChangeRoomId = (newRoomId) => {
        socket.emit("check-room-availability", newRoomId);
        setInputFieldError(false);
        setRoomId(newRoomId);
    }

    const [inputFieldError, setInputFieldError] = useState(false);


    const handleDifficultyChange = (val) => {
        setDifficulty(val);
    };

    const dropDisk = (board, col, value) => {
        for (let i = numRows - 1; i >= 0; i--) {
            if (!board[i][col]) {
                board[i][col] = value;
                return true;
            }
        }
        return false;
    };

    const getNextPlayer = (currentPlayer) => {
        if (currentPlayer === 0 || currentPlayer === 2) {
            return 1;
        }
        return 2;
    };

    const updateDisplayGameText = (currentPlayer) => {
        const gameStatus = checkGameStatus(matrix, numRows, numCols);

        // who the fuck clicked the board now? ans=> currentPlayer ... 
        // so now update the next state accordingly.
        const nextPlayer = getNextPlayer(currentPlayer);

        let displayText = "";
        let backgroundVariant = "";

        if (gameStatus === 0) {
            // ongoing
            if (gameModeCPU === true) {
                displayText = "Current Turn : Player";
                backgroundVariant = (aiValue === 1 ? "info" : "error");
            } else if (gameModeCPU === false && isLocalGame === true) {
                displayText = "Current Turn : Player " + nextPlayer + (nextPlayer === 1 ? "(Red)" : "(Blue)");
                backgroundVariant = (nextPlayer === 1 ? "error" : "info");
            } else if (gameModeCPU === false && isLocalGame === false) {
                // console.log(lastPlayer, currentPlayer, onlinePlayerNumber);
                const isPlayerNext = (currentPlayer === onlinePlayerNumber ? false : true); 
                displayText = "Current Turn : " + (isPlayerNext ? "You" : "Opponent");
                backgroundVariant = (nextPlayer === 1 ? "error":"info"); 
            }

        } else if (gameStatus === 1) {
            // player 1 has won
            backgroundVariant = "error";

            if (gameModeCPU === true) {
                displayText = (aiValue === 1 ? "AI" : "Player") + " Has Won";
            } else if (gameModeCPU === false && isLocalGame === true) {
                displayText ="Player " + currentPlayer + (currentPlayer === 1 ?  "(Red)" : "(Blue)") + " Has Won !";
            } else if (gameModeCPU === false && isLocalGame === false) {
                displayText = (onlinePlayerNumber === 1 ? "You have won !" : "Opponent has won !");
            }
        } else if (gameStatus === 2) {
            // player 2 has won
            backgroundVariant = "info";

            if (gameModeCPU === true) {
                displayText = (aiValue === 2 ? "AI" : "Player") + " Has Won";
            } else if (gameModeCPU === false && isLocalGame === true) {
                displayText ="Player " + currentPlayer + (currentPlayer === 2 ?  "(Blue)" : "(Red)") + " Has Won !";
            } else if (gameModeCPU === false && isLocalGame === false) {
                displayText = (onlinePlayerNumber === 2 ? "You have won !" : "Opponent has won !");
            }
        } else if (gameStatus === 3) {
            // draw
            displayText = "Game Drawn !";
            backgroundVariant = "warning";
        }

        setGameTextObject({
            gameText: displayText,
            gameTextMUIBackground: backgroundVariant,
        });
    };

    const handleLeaveRoom = () => {
        const currentMatrix = matrix.slice();
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                currentMatrix[i][j] = 0;
            }
        }

        setMatrix(currentMatrix);
        setWinningPosition(null);
        setLastPlayer(0);
        setGameTextObject({
            gameText: "",
            gameTextMUIBackground: "",
        }); 
        // Make difficulty medium again
        setDifficulty(2);
        setResetGame(true);
        setGameStarted(false);
        socket.emit("leave-room",roomId);
    }

    const handleGameStart = () => {

        // Handle Case of Online Multiplayer
        if (!gameStarted && gameModeCPU === false && isLocalGame === false) {
            // It is a Game of websockets, not real players :-p
            if (!roomId) {
                setInputFieldError(true);
                return;
            }
            if (isRoomFull) {
                return;
            }
        }

        setGameStarted(true);
        setResetGame(false);
        handleCloseConfirmGameModal();

        let newGameText = "";
        let newGameTextMUIBackground = ""; 

        if (gameModeCPU === false && isLocalGame === true) {
            // multiplayer local
            newGameText = "Current Turn : Player 1(Red)";
            newGameTextMUIBackground = "error";
        } else if (gameModeCPU === false && isLocalGame === false) {
            // multiplayer online mode
            socket.emit("join-room", roomId);
            newGameText  =  "Current Turn : Whoever Clicks first :-p";
            newGameTextMUIBackground = "info";
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
                makeMoveWithAI(currentMatrix, AI_VALUE, difficulty);
                setMatrix(currentMatrix);
                setLastPlayer(AI_VALUE);
            }

            newGameText = "Current Turn : Player"; 
            newGameTextMUIBackground = ( PLAYER_VALUE === 1 ? "error" : "info" );
        }

        setGameTextObject({
            gameText : newGameText,
            gameTextMUIBackground : newGameTextMUIBackground,
        })
    };

    const handleGameModeSelection = (event) => {
        // switch button => false if multiplayer, true if cpu
        setGameModeCPU(event.target.checked);
    };

    const handleMultiplayerGameModeSelection = (event) => {
        // switch button => false if local, true if over websocket
        setIsLocalGame(event.target.checked);
    };

    const handleOpenConfirmGameModal = () => {
        setOpenConfirmGameModal(true);
    };

    const handleCloseConfirmGameModal = () => {
        setOpenConfirmGameModal(false);
    };

    const handleResetGame = () => {

        const currentMatrix = matrix.slice();
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                currentMatrix[i][j] = 0;
            }
        }

        setMatrix(currentMatrix);
        setWinningPosition(null);
        setLastPlayer(0);
        // Make difficulty medium again
        setDifficulty(2);

        if(!gameModeCPU && !isLocalGame){
            setGameTextObject({
                gameText: "Current Turn : Whoever Clicks first :-p",
                gameTextMUIBackground: "info",
            });
            socket.emit("reset-game",roomId);
        } else{
            setGameTextObject({
                gameText: "",
                gameTextMUIBackground: "",
            }); 
            setResetGame(true);
            setGameStarted(false);
        } 
    };

    const handleCloseInvalidClickModal = () => {
        setOpenInvalidClickModal(false);
    };

    const makeMoveWithAI = (board, AI_VALUE, difficulty) => {
        // make the best possible move on the board;
        // arrays are passed by reference, so we dont need to return the new board state as well.
        const maxDepth = difficultyToMaxDepth[difficulty];
        const [depth, alpha, beta, isMaximizingPlayer] = [
            0,
            Number.NEGATIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            true,
        ];
        const [bestScore, bestColumn] = miniMax(
            board,
            depth,
            alpha,
            beta,
            isMaximizingPlayer,
            AI_VALUE,
            getNextPlayer(AI_VALUE),
            maxDepth
        );

        if (bestColumn >= 0) {
            dropDisk(board, bestColumn, AI_VALUE);
        }
    };

    const handleBoardClick = (row, col) => {
        // row, col => where you clicked
        if (!gameStarted) {
            setOpenInvalidClickModal(true);
            return;
        }

        const currentMatrix = matrix.slice();
        const currentGameStatus = checkGameStatus(
            currentMatrix,
            numRows,
            numCols
        );

        if (currentGameStatus !== 0) {
            return;
        }

        let currPlayer = null;
        if(gameModeCPU === false && isLocalGame === false){
            currPlayer = onlinePlayerNumber;
        } else {
            currPlayer = getNextPlayer(lastPlayer);
        }

        if (gameModeCPU === false && isLocalGame === true) {
            // multiplayer and local game
            // console.log("Multiplayer Game Locally");
            const success = dropDisk(currentMatrix, col, currPlayer);
            if (!success) {
                return;
            }
            setLastPlayer(currPlayer);
        } else if (gameModeCPU === false && isLocalGame === false) {
            // console.log("Multiplayer Online");
            
            if(lastPlayer === onlinePlayerNumber){
                return;
            }

            if(isWaiting){
                return;
            }

            const success = dropDisk(currentMatrix, col, onlinePlayerNumber);
            if (!success) {
                return;
            }
            const data = {
                roomId: roomId,
                row: row,
                col: col,
                playerNum: onlinePlayerNumber,
            }
            // console.log(data);
            socket.emit("click-board", data);
            setLastPlayer(currPlayer);

        } else if (gameModeCPU === true) {
            // console.log("AI Game");
            // AI battle and someone clicked
            // so you drop and then force the AI to play.
            const success = dropDisk(currentMatrix, col, currPlayer);
            if (!success) {
                return;
            }
            const nextPlayer = getNextPlayer(currPlayer);
            // its time for AI;
            makeMoveWithAI(currentMatrix, nextPlayer, difficulty);
            setLastPlayer(nextPlayer);
        }

        setWinningPosition(
            getWinningPositions(currentMatrix, numRows, numCols)
        );
        setMatrix(currentMatrix);
        updateDisplayGameText(currPlayer);
    };

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-evenly'
            alignItems='center'
        >
            <Grid item>
                <Card
                    variant="outlined"
                    sx={{
                        border: 3,
                        maxWidth: 1000,
                        pl: 1,
                        pr: 1,
                        pt: 0,
                        pd: 0,
                        mt: 3,
                        md: 2,
                        borderRadius: 3,
                    }}
                >
                    <CardContent>
                        <Board
                            matrix={matrix}
                            onClick={(row, col) => {
                                handleBoardClick(row, col);
                            }}
                            winningPosition={winningPosition}
                            openInvalidClickModal={openInvalidClickModal}
                            handleCloseInvalidClickModal={
                                handleCloseInvalidClickModal
                            }
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item>
                <Actions
                    gameTextObject={gameTextObject}
                    gameStarted={gameStarted}
                    gameReset={resetGame}
                    handleDifficultyChange={handleDifficultyChange}
                    handleGameModeSelection={handleGameModeSelection}
                    openConfirmGameModal={openConfirmGameModal}
                    handleCloseConfirmGameModal={handleCloseConfirmGameModal}
                    onStartGame={() => {
                        handleOpenConfirmGameModal();
                    }}
                    onResetGame={() => {
                        handleResetGame();
                    }}
                    handleGameStart={handleGameStart}
                    gameModeCPU={gameModeCPU}
                    difficulty={difficulty}
                    isLocalGame={isLocalGame}
                    handleMultiplayerGameModeSelection={handleMultiplayerGameModeSelection}
                    roomId={roomId}
                    handleChangeRoomId={handleChangeRoomId}
                    inputFieldError={inputFieldError}
                    isRoomFull={isRoomFull}
                    isWaiting={isWaiting}
                    handleLeaveRoom={handleLeaveRoom}
                />
            </Grid>
        </Grid>
    );
};

export default Game;
