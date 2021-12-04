import getWinningPositions from './WinningPositions.js';

const numRows = 6;
const numCols = 7;
const AI_PIECE = 2;
const PLAYER_PIECE = 1;
const alpha = Number.NEGATIVE_INFINITY;
const beta = Number.POSITIVE_INFINITY;


const isBoardFilled = (board) => {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!board[i][j]) {
                return false;
            }
        }
    }
    return true;
}

const isGameWonBySomeone = (board) => {
    if (getWinningPositions(board, numRows, numCols)) {
        return true;
    }
    return false;
}

const getUnfilledColumns = (board) => {
    let unfilledColumns = []
    for (let i = 0; i < numCols; i++) {
        if (!board[0][i]) {
            unfilledColumns.push(i);
        }
    }
    return unfilledColumns;
}

const dropDisk = (board, col, value) => {
    for (let i = numRows - 1; i >= 0; i--) {
        if (!board[i][col]) {
            board[i][col] = value;
            // console.log("dropped at row,col = ", [i, col]);
            return;
        }
    }
}

const removeLastFilledDisk = (board, col) => {
    for (let i = 0; i < numRows; i++) {
        if (board[i][col]) {
            board[i][col] = 0;
            // console.log("removed at row,col = ", [i, col]);
            return;
        }
    }
}

const miniMax = (board, depth, alpha, beta, isMaximizingPlayer) => {

    if (isGameWonBySomeone(board)) {
        if (depth % 2 === 0) {
            // after AI (Maximizer) drops, a win is achieved
            const result = [-1000, -1];
            return result;
        } else {
            // after Player (Minimizer) drops, a win is achieved
            const result = [+1000, -1];
            return result;
        }
    }

    if (isBoardFilled(board)) {
        const result = [0, -1];
        return result;
    }

    if (depth > 5) {
        return [0, -1];
    }


    const unfilledColumns = getUnfilledColumns(board);

    if (isMaximizingPlayer) {
        let bestScore = Number.NEGATIVE_INFINITY;
        let bestColumn = unfilledColumns[0];

        for (const col of unfilledColumns) {
            dropDisk(board, col, AI_PIECE);
            // console.log("hello1\n", board);
            const [currentScore, bestOpponentCol] = miniMax(board, depth + 1, alpha, beta, false);
            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestColumn = col;
            }
            alpha = Math.max(alpha, bestScore);
            removeLastFilledDisk(board, col);
            // console.log("hello2\n", board);

            if (beta <= alpha) {
                break;
            }
        }

        const result = [bestScore, bestColumn];
        return result;

    } else {
        let bestScore = Number.POSITIVE_INFINITY;
        let bestColumn = unfilledColumns[0];

        for (const col of unfilledColumns) {
            dropDisk(board, col, PLAYER_PIECE);
            const [currentScore, bestOpponentCol] = miniMax(board, depth + 1, alpha, beta, true);

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
}

/*
const board = [
    // Test
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 1, 2, 0],

]

const win = [
    // Test
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 1, 2, 0],

]

console.log(miniMax(board, 0, alpha, beta, true));

*/

export default miniMax;