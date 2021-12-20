/*
Reference : https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/
First AI was designed to help itself i.e it will try to form a block of four and if opponent does that, it will get punished.
Very Trivial but it was really interesting to learn how to design a game with AI.

Improvements in AI :
Realized that better rewarding and punishment was required in the basic AI
Came across this blog and found the idea cool.
https://medium.com/analytics-vidhya/artificial-intelligence-at-play-connect-four-minimax-algorithm-explained-3b5fc32e4a4f
*/

import checkGameStatus from "./GameStatus.js";

const AI_WIN_REWARD = 10000;
const PLAYER_WIN_PUNISHMENT = -10000;

const numRows = 6;
const numCols = 7;

const getUnfilledColumns = (board) => {
    let unfilledColumns = [];
    for (let i = 0; i < numCols; i++) {
        if (!board[0][i]) {
            unfilledColumns.push(i);
        }
    }
    return unfilledColumns;
};

const dropDisk = (board, col, value) => {
    for (let i = numRows - 1; i >= 0; i--) {
        if (!board[i][col]) {
            board[i][col] = value;
            // console.log("dropped at row,col = ", [i, col]);
            return;
        }
    }
};

const removeLastFilledDisk = (board, col) => {
    for (let i = 0; i < numRows; i++) {
        if (board[i][col]) {
            board[i][col] = 0;
            // console.log("removed at row,col = ", [i, col]);
            return;
        }
    }
};

const isThisTheEndGame = (board) => {
    const gameStatus = checkGameStatus(board, numRows, numCols);
    if (gameStatus === 0) {
        return false;
    }
    return true;
};

const rewardScheme = (board, AI_PIECE, PLAYER_PIECE) => {
    /*
    1. generate windows of length  4 
    2. Based on different configuration of opponent and AI, either reward or punish
    */

    const isInsideBoard = (row, col) => {
        return row >= 0 && col >= 0 && row < numRows && col < numCols;
    };

    const getWindowScore = (window) => {
        // window => an array of length 4 (could be diagonal cut,horizontal cut etc)
        let score = 0;

        const freq = {};
        for (const num of window) {
            freq[num] = freq[num] ? freq[num] + 1 : 1;
        }

        const countAI = freq[AI_PIECE] ? freq[AI_PIECE] : 0;
        const countPlayer = freq[PLAYER_PIECE] ? freq[PLAYER_PIECE] : 0;
        const countEmpty = freq[0] ? freq[0] : 0;
        // console.log(countAI, countPlayer, countEmpty);
        if (countAI === 4) {
            score += 400;
        }
        if (countAI === 3 && countEmpty === 1) {
            score += 300;
        }
        if (countAI === 2 && countEmpty === 2) {
            score += 200;
        }
        if (countAI === 3 && countPlayer === 1) {
            score -= 50;
        }
        if (countPlayer === 3 && countEmpty === 1) {
            score -= 300;
        }
        if (countPlayer === 2 && countEmpty === 2) {
            score -= 200;
        }

        // Special Case: AI is trying to block the player
        // hence give AI a good reward
        if (countPlayer === 3 && countAI === 1) {
            score += 300;
        }

        return score;
    };

    let score = 0;

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const possibleWindowPositions = [
                [
                    [i, j],
                    [i, j + 1],
                    [i, j + 2],
                    [i, j + 3],
                ],
                [
                    [i, j],
                    [i + 1, j],
                    [i + 2, j],
                    [i + 3, j],
                ],
                [
                    [i, j],
                    [i + 1, j + 1],
                    [i + 2, j + 2],
                    [i + 3, j + 3],
                ],
                [
                    [i, j],
                    [i + 1, j - 1],
                    [i + 2, j - 2],
                    [i + 3, j - 3],
                ],
            ];

            for (const windowPosition of possibleWindowPositions) {
                let isInside = true;
                for (const [row, col] of windowPosition) {
                    if (!isInsideBoard(row, col)) {
                        isInside = false;
                        break;
                    }
                }

                if (!isInside) {
                    continue;
                }

                const window = windowPosition.map(
                    (position) => board[position[0]][position[1]]
                );
                score += getWindowScore(window);
            }
        }
    }

    return score;
};

const miniMax = (
    board,
    depth,
    alpha,
    beta,
    isMaximizingPlayer,
    AI_PIECE,
    PLAYER_PIECE,
    MAX_DEPTH
) => {
    // difficulty can be tuned using max_depth.

    if (isThisTheEndGame(board)) {
        const gameStatus = checkGameStatus(board, numRows, numCols);
        if (gameStatus === AI_PIECE) {
            return [AI_WIN_REWARD, -1];
        } else if (gameStatus === PLAYER_PIECE) {
            return [PLAYER_WIN_PUNISHMENT, -1];
        } else {
            // draw
            return [0, -1];
        }
    }

    const unfilledColumns = getUnfilledColumns(board);

    if (depth >= MAX_DEPTH) {
        const randomIndex = Math.floor(Math.random() * unfilledColumns.length);
        const result = [
            rewardScheme(board, AI_PIECE, PLAYER_PIECE),
            unfilledColumns[randomIndex],
        ];
        // console.log(result);
        return result;
    }

    if (isMaximizingPlayer) {
        let bestScore = Number.NEGATIVE_INFINITY;
        const randomIndex = Math.floor(Math.random() * unfilledColumns.length);
        let bestColumn = unfilledColumns[randomIndex];

        for (const col of unfilledColumns) {
            dropDisk(board, col, AI_PIECE);
            const [currentScore, bestOpponentCol] = miniMax(
                board,
                depth + 1,
                alpha,
                beta,
                false,
                AI_PIECE,
                PLAYER_PIECE,
                MAX_DEPTH
            );
            if (currentScore > bestScore) {
                // console.log("yes");
                bestScore = currentScore;
                bestColumn = col;
            }
            alpha = Math.max(alpha, bestScore);
            removeLastFilledDisk(board, col);

            if (beta <= alpha) {
                break;
            }
        }

        const result = [bestScore, bestColumn];
        return result;
    } else {
        let bestScore = Number.POSITIVE_INFINITY;
        const randomIndex = Math.floor(Math.random() * unfilledColumns.length);
        let bestColumn = unfilledColumns[randomIndex];

        for (const col of unfilledColumns) {
            dropDisk(board, col, PLAYER_PIECE);
            const [currentScore, bestOpponentCol] = miniMax(
                board,
                depth + 1,
                alpha,
                beta,
                true,
                AI_PIECE,
                PLAYER_PIECE,
                MAX_DEPTH
            );

            if (currentScore < bestScore) {
                bestScore = currentScore;
                bestColumn = col;
            }
            beta = Math.min(beta, bestScore);
            removeLastFilledDisk(board, col);

            if (beta <= alpha) {
                break;
            }
        }

        // console.log(bestScore);
        const result = [bestScore, bestColumn];
        return result;
    }
};

export default miniMax;
