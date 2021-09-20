// Libraries
import React from 'react';
import Board from './board.js';
import CapturedPiecesArea from './captured_pieces_area';
import initializeChessBoard from '../utils/board_initializer.js';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      squares: initializeChessBoard(),
      whiteCapturedPieces: [],
      blackCapturedPieces: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white'
    }
  }


  render (){
    return (
      <div>
        <div className="game">
          <div className="game_board">
            <Board 
            squares = {this.state.squares}
            />
          </div>
          <div className="game_info">
            <h3>Turn</h3>
            <div id="player_turn_box" style={{backgroundColor: this.state.turn}}>
  
            </div>
            <div className="game_status">{this.state.status}</div>

            <div className="captured_pieces_area">
              
              {<CapturedPiecesArea
              whiteCapturedPieces = {this.state.whiteCapturedPieces}
              blackCapturedPieces = {this.state.blackCapturedPieces}
              />
            }
            </div>
            
          </div>
        </div>

      </div>
    )
  }
}


export default App;
