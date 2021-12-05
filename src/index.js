import React from "react";
import ReactDOM from "react-dom";

import Game from "./Game";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { red, blue } from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        userRed: {
            main: red[600],
        },
        userBlue: {
            main: blue[800],
        },
        userWhite: {
            main: "#FFFFFF",
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Game />
    </ThemeProvider>,

    document.getElementById("root")
);
