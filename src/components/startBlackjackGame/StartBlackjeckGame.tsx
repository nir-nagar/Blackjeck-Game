import React from 'react'
import './StartBlackjeckGame.css'
import { connect } from 'react-redux'
import { State } from '../../redux/store'
import svg from './cardSVG.svg'
import axios from 'axios'


const URLS = {
    getTable: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',

}

class _StartBlackjeckGame extends React.Component<any, any>{
    render() {
        const { getTable } = this.props
        return (
            <div>
                <img className='card-svg' src={svg} />
                <button
                    className='start-blackjeck-game'
                    onClick={() => {
                        getTable()
                    }}>
                    Start Game
                </button>
                <img className='card-svg' src={svg} />
            </div>
        )
    }
}

const mapStateToProps = (state: State) => {
    return {
        text: state.text,
        tableId: state.tableId,
        gameStarted: state.gameStarted,
        remainingCards: state.remainingCards,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        getTable: async () => {
           
            try {
                const { data } = await axios.get(URLS.getTable)

                const { deck_id, success, remaining } = data

                dispatch({
                    type: 'GET_TABLE_SUCCESS',
                    payload: {
                        tableId: deck_id,
                        gameStarted: success,
                        remainingCards: remaining,
                    }
                })
            }
            catch (e) {
                dispatch({
                    type: 'GET_TABLE_FAIL'
                })
            }
        }
    }

}


export const StartBlackjeckGame = connect(mapStateToProps, mapDispatchToProps)(_StartBlackjeckGame)

