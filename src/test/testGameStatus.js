import checkGameStatus from "../GameStatus.js";
// Test for GameStatus Check

const test1 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 1, 2, 0],
];

const test2 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 1, 2, 0],
];

const test3 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 1, 2, 0],
];

console.log(checkGameStatus(test1, 6, 7));
console.log(checkGameStatus(test2, 6, 7));
console.log(checkGameStatus(test3, 6, 7));
