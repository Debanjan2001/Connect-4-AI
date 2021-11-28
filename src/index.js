import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Board from './Board'

function Game(props){
  return (
    <Board />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);
