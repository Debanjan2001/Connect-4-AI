import miniMax from "../AI.js";

// A Small Test To check if AI is winning or not.
let board = [
    // Test
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 1, 2, 0],
];

let win = [
    // Test
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 1, 1, 2, 0],
];

console.log(
    miniMax(
        board,
        0,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        true,
        2,
        1
    )
);

console.log(
    miniMax(
        board,
        0,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        true,
        1,
        2
    )
);

board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 2, 2, 2],
];

console.log(
    miniMax(
        board,
        0,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        true,
        2,
        1
    )
);
