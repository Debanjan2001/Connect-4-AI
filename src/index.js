import React from 'react';
import ReactDOM from 'react-dom';

// Game Board
import Board from './Board'


function Game(props){
  return (
    <Board />
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
