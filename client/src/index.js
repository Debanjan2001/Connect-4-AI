import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { red } from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        userRed: {
            main: red[600],
        },
        userBlue: {
            main: '#3029ef',
        },
        userWhite: {
            main: "#FFFFFF",
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,

    document.getElementById("root")
);
