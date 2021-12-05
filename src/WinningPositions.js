const getWinningPositions = (matrix, numRows, numCols) => {
    const isInsideMatrix = (row, col) => {
        return row >= 0 && row < numRows && col >= 0 && col < numCols;
    };

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const possibleWinningPositions = [
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

            for (const winningPosition of possibleWinningPositions) {
                let allMarkedSame = true;
                let allInsideMatrix = true;

                for (const [x, y] of winningPosition) {
                    if (!isInsideMatrix(x, y)) {
                        allInsideMatrix = false;
                        break;
                    }
                }

                if (!allInsideMatrix) {
                    continue;
                }

                for (let index = 1; index < winningPosition.length; index++) {
                    const [x1, y1] = winningPosition[index];
                    const [x2, y2] = winningPosition[index - 1];
                    // console.log(matrix, x1);
                    if (!matrix[x1][y1] || matrix[x1][y1] !== matrix[x2][y2]) {
                        allMarkedSame = false;
                        break;
                    }
                }

                if (allMarkedSame) {
                    return winningPosition;
                }
            }
        }
    }

    return null;
};

export default getWinningPositions;
