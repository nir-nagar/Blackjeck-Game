import React from 'react';
import './App.css';
import { StartBlackjeckGame } from './components/startBlackjackGame/StartBlackjeckGame'
import { connect } from 'react-redux';
import { State } from './redux/store';
import { Game } from './components/Game/Game';
import { GameOver } from './components/GameOver/GameOver';


class _App extends React.Component<any, any> {
  render() {
    const { gameStarted, gameOver } = this.props
    const isGameStated = gameStarted ? <div><Game /></div> : openingScreen()
    const isGameOver = gameOver ? <GameOver /> : ""
    return (
      <div className="App">
        
        <div className='title'>
          <h1>Blackjeck Game</h1>
        </div>

        <div className='blackjeck-game'>
          {isGameStated}
        </div>

        {isGameOver}
      </div>
    );
  }
}
const openingScreen = () => {
  return (
    <div>
      <StartBlackjeckGame />
      <h1 className='color-Shadow'>Press "Start Game" To Play Game</h1>
    </div>
  )
}

const mapStateToProps = (state: State) => {
  return {
    text: state.text,
    tableId: state.tableId,
    gameStarted: state.gameStarted,
    gameOver: state.gameOver
  }
}
export const App = connect(mapStateToProps)(_App);
