import React from 'react';

// Game Board
import Board from './Board'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { red, blue } from '@mui/material/colors';

const Game = ()=>{
    
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            userRed: {
                main: red[600],
            },
            userBlue: {
                main: blue[800],
            },
        },
    });
    
    return (
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Board />
      </ThemeProvider>
    );
  }
  
export default Game;