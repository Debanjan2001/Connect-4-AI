import React from 'react'
import { Button, Grid,} from '@mui/material'
import { useState } from 'react'

import checkGameStatus from './GameStatus'

const DiskHolder = (props) => {
  
    return (
        <Button
          variant = {props.diskHolderProperties.variant}
          color = {props.diskHolderProperties.color} 
          sx={ { height:80,width:80,borderRadius: 100 } }
          onClick = {()=>props.onClick()}
        >
          {props.value}
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

    const [gameText, setGameText] = useState("Current Turn: Player 1 ");

    const [isPlayer1,setIsPlayer1] = useState(true);

    function togglePlayer(){
      setIsPlayer1(!isPlayer1);
    }

    const handleClick = (row, col) => {
        // row, col => where you clicked 
        const current_matrix = matrix.slice();
        let rowToChange = -1;
        for(let i = 0; i < numRows; i++){
            if(current_matrix[i][col]){
              break;
            }
            rowToChange += 1;
        }
        if(rowToChange < 0){
          return;
        }

        current_matrix[rowToChange][col] = (isPlayer1 ? 1 : 2);
        togglePlayer();
        setMatrix(current_matrix);
        // console.log(matrix);
        setGameText(getGameText());
    };

    const renderDiskHolder = (row, col)=>{
      let color = "";
      let variant = "null";
      if(matrix[row][col] === 1){
        color = "error";
        variant = "contained";
      } else if (matrix[row][col] === 2){
        color = "primary";
        variant = "contained";
      } else{
        color = "primary";
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
        <div>
          {renderDiskHolder(row,0)}
          {renderDiskHolder(row,1)}
          {renderDiskHolder(row,2)}
          {renderDiskHolder(row,3)}
          {renderDiskHolder(row,4)}
          {renderDiskHolder(row,5)}
          {renderDiskHolder(row,6)}
        </div>
      )
    }

    const getGameText = () => {
      const gameStatus = checkGameStatus(matrix, numRows, numCols);
      const currentPlayer = "Player " + (isPlayer1 ? "1" : "2");
      let textToShow = "";
      if(gameStatus === 0){
        textToShow = "Current Turn: "+ currentPlayer ;
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

    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      >
      <Grid item xs = {12}> { gameText }</Grid>
      </Grid>
      <Grid item>Player Stats-1</Grid>
      <Grid item>
        {renderDiskHolderRow(0)}
        {renderDiskHolderRow(1)}
        {renderDiskHolderRow(2)}
        {renderDiskHolderRow(3)}
        {renderDiskHolderRow(4)}
        {renderDiskHolderRow(5)}
      </Grid>
      <Grid item>Player Stats-2</Grid>
    </Grid>
    );
}

export default Board