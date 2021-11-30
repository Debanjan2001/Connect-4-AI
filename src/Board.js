import React from 'react'
import { Button, Grid, Stack,} from '@mui/material'
import { useState } from 'react'

import  Item  from '@mui/material/List'

import checkGameStatus from './GameStatus'

import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
const DiskHolder = (props) => {
  
    return (
        <Button
          variant = {props.diskHolderProperties.variant}
          color = {props.diskHolderProperties.color} 
          sx={ { height:60, width:70, borderRadius:100 } }
          onClick = {()=>props.onClick()}
        >
            {/* {props.value} */}
        </Button>
    );
}

const Board = () => {

    
    const numRows = 6;
    const numCols = 7;

    const [matrix, setMatrix] = useState(
      Array.from(
        {length: numRows},()=> Array.from(
          {length: numCols}, () => 0
        )
      )
    );

    const [gameText, setGameText] = useState("");
    const [isPlayer1,setIsPlayer1] = useState(true);

    function togglePlayer(){
      setIsPlayer1(!isPlayer1);
    }

    const handleClick = (row, col) => {
        // row, col => where you clicked 
        const currentMatrix = matrix.slice();

        const currentGameStatus = checkGameStatus(currentMatrix, numRows, numCols);
        if(currentGameStatus > 0){
          return;
        }

        let rowToChange = -1;
        for(let i = 0; i < numRows; i++){
            if(currentMatrix[i][col]){
              break;
            }
            rowToChange += 1;
        }
        if(rowToChange < 0){
          return;
        }
        currentMatrix[rowToChange][col] = (isPlayer1 ? 1 : 2);
        
        // console.log(matrix);
        setGameText(getGameText());
        setMatrix(currentMatrix);
        togglePlayer();
    };

    const renderDiskHolder = (row, col)=>{
      let color = "";
      let variant = "null";
      if(matrix[row][col] === 1){
        color = "userRed";
        variant = "contained";
      } else if (matrix[row][col] === 2){
        color = "userBlue";
        variant = "contained";
      } else{
        color = "info";
        variant = "outlined";
      }

      const diskHolderProperties = {
        color : color,
        variant : variant,
      } 

      return (
        <DiskHolder 
          value={row * numCols + col}
          diskHolderProperties = {diskHolderProperties}
          onClick = {()=>handleClick(row,col)}
          color = { color }
        />
      )
    }

    const renderDiskHolderRow = (row) => {
      return (
        <Stack direction="row" spacing={1}>
          <Item>{renderDiskHolder(row,0)}</Item>
          <Item>{renderDiskHolder(row,1)}</Item>
          <Item>{renderDiskHolder(row,2)}</Item>
          <Item>{renderDiskHolder(row,3)}</Item>
          <Item>{renderDiskHolder(row,4)}</Item>
          <Item>{renderDiskHolder(row,5)}</Item>
          <Item>{renderDiskHolder(row,6)}</Item>
        </Stack>
      )
    }

    const getGameText = () => {
      const gameStatus = checkGameStatus(matrix, numRows, numCols);
      const currentPlayer = "Player " + (isPlayer1 ? "1" : "2");
      let textToShow = "";
      if(gameStatus === 0){
        textToShow = "Last Turn: "+ currentPlayer ;
      } else if(gameStatus === 1 || gameStatus === 2){
        textToShow =  currentPlayer + " has won !" ;
      } else if (gameStatus === 3){
        textToShow = "Game Drawn!";
      }
      // console.log(gameStatus)
      // console.log(gameText);
      return textToShow;
    }

    return (
      
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
        <Grid item
        > 
        <Stack direction="column" spacing={1}>
          <Item>{renderDiskHolderRow(0)}</Item>
          <Item>{renderDiskHolderRow(1)}</Item>
          <Item>{renderDiskHolderRow(2)}</Item>
          <Item>{renderDiskHolderRow(3)}</Item>
          <Item>{renderDiskHolderRow(4)}</Item>
          <Item>{renderDiskHolderRow(5)}</Item>
        </Stack>

        </Grid>

        <Grid item>
          <Stack>
            <Item>
              <Fab variant="extended" onClick={()=>{console.log("Start")}}>
              {/* if else logic based fabicon */}
              <PlayCircleFilledIcon sx={{ mr: 1 }} />
                Start Game
              </Fab>
            </Item>

            {/* if else logic based display */}
            {false && 
              <Item>
                <Button>vs Enemy</Button>
                <Button>vs CPU</Button>
              </Item>
            }

            {/* if else logic based display */}
            { gameText &&
              <Item>
              {gameText}
              </Item>
            }
            
          </Stack>
        </Grid>
      </Grid>
    );
}

export default Board