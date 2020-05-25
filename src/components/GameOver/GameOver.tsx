import React from 'react';
import './GameOver.css';
import { connect } from 'react-redux';
import { State } from '../../redux/store';
import axios from 'axios';

class _GameOver extends React.Component<any, any> {

    render() {
        const { tableId, winnerName, sumPlayerCards, sumDilerCards, } = this.props
        return (
            <div className="game-over-full-screen">

                <div className='game-over-full-screen-opacity'>

                </div>
                <div className="game-over">

                    <h1>Game Over</h1>

                    <button
                        onClick={() => {
                            console.log('start-again-this.props', this.props)
                            this.props.startGameAgain(tableId)
                            if (tableId) {
                                // this.props.hitPlayerCard(tableId, 2)
                                // this.props.hitDilerCard(tableId, 1)
                                console.log('startGameAgain')
                            }
                        }}>
                        Start Again
                    </button>
                    <h1>{`${winnerName} WIN`}</h1>
                    <h5>{`You Have: ${sumPlayerCards}`}</h5>
                    <h5>{`Diler Have: ${sumDilerCards}`}</h5>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        text: state.text,
        tableId: state.tableId,
        gameStarted: state.gameStarted,
        cards: state.cards,
        winnerName: state.winnerName,
        sumPlayerCards: state.sumPlayerCards,
        sumDilerCards: state.sumDilerCards,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGameAgain: async (table: String) => {
            const data = await axios.get(`https://deckofcardsapi.com/api/deck/${table}/shuffle/`)

            dispatch({
                type: 'START_NEW_GAME_RESHUFFLE_CARDS',
                payload: {
                    data
                }
            })
        }
    }
}
export const GameOver = connect(mapStateToProps, mapDispatchToProps)(_GameOver);
