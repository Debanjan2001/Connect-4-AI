import React from 'react'
import { Button, Container } from '@mui/material'
import { useState } from 'react'

const DiskHolder = (props) => {

  const [val,setVal] = useState(1);

  function handleClick(){
    setVal(!val);
  }
  
    return (
        <Button 
          onclick={()=>{}} 
          variant="contained" 
          color={val?'primary':'secondary'}
          sx={ { height:80,width:80,borderRadius: 100 } }
          onClick = {()=> handleClick()}
        >
          {props.value}
        </Button>
    );
}

const Board = () => {

    const numRows = 6;
    const numCols = 7;
    
    const renderDiskHolder = (row, col)=>{
      return (
        <DiskHolder value={row * numCols + col} />
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

    return (
      <Container fixed>
        {renderDiskHolderRow(0)}
        {renderDiskHolderRow(1)}
        {renderDiskHolderRow(2)}
        {renderDiskHolderRow(3)}
        {renderDiskHolderRow(4)}
        {renderDiskHolderRow(5)}
      </Container>
      

    );
}

export default Board
