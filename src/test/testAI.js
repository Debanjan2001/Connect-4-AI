import miniMax from "../AI.js";

// A Small Test To check if AI is winning or not.

const MAX_DEPTH = 5;

let board = [
    // Test
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
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
        1,
        MAX_DEPTH
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
        2,
        MAX_DEPTH
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
        1,
        MAX_DEPTH
    )
);
