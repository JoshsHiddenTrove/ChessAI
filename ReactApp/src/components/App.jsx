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

  handleClick(i){
    const squares = this.state.squares.slice();
    
    if(this.state.sourceSelection === -1){
      if(!squares[i] || squares[i].player !== this.state.player){
        this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
        squares[i]? delete squares[i].style.backgroundColor: null;
      }
      else{
        
        squares[i].style.backgroundColor = "RGB(111,143,114)";
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i
        });
      }
    }

    else if(this.state.sourceSelection > -1){
      delete squares[this.state.sourceSelection].style.backgroundColor;
      if(squares[i] && squares[i].player === this.state.player){
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      }
      else{
        
        const squares = this.state.squares.slice();
        const whiteCapturedPieces = this.state.whiteCapturedPieces.slice();
        const blackCapturedPieces = this.state.blackCapturedPieces.slice();
        const isDestEnemyOccupied = squares[i]? true : false; 
        const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
        const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if(isMovePossible && isMoveLegal){
          if(squares[i] !== null){
            if(squares[i].player === 1){
              whiteCapturedPieces.push(squares[i]);
            }
            else{
              blackCapturedPieces.push(squares[i]);
            }
          }
          console.log("whiteCapturedPieces", whiteCapturedPieces) ;
          console.log("blackCapturedPieces", blackCapturedPieces);
          squares[i] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;
          let player = this.state.player === 1? 2: 1;
          let turn = this.state.turn === 'white'? 'black' : 'white';
          this.setState({
            sourceSelection: -1,
            squares: squares,
            whiteCapturedPieces: whiteCapturedPieces,
            blackCapturedPieces: blackCapturedPieces,
            player: player,
            status: '',
            turn: turn
          });
        }
        else{
          this.setState({
            status: "Wrong selection. Choose valid source and destination again.",
            sourceSelection: -1,
          });
        }
      }
    }

  }

  isMoveLegal(srcToDestPath){
    let isLegal = true;
    for(let i = 0; i < srcToDestPath.length; i++){
      if(this.state.squares[srcToDestPath[i]] !== null){
        isLegal = false;
      }
    }
    return isLegal;
  }



  render (){
    return (
      <div>
        <div className="game">
          <div className="game_board">
            <Board 
            squares = {this.state.squares}
            onClick = {(i) => this.handleClick(i)}
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
