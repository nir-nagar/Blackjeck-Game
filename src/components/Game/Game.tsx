import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import { State } from '../../redux/store';
import axios from 'axios';
import { Card } from '../Card/Card';



class _Game extends React.Component<any, any> {


    componentDidMount() {
        const { tableId, hitPlayerCard, hitDilerCard } = this.props
        if (tableId) {
            hitPlayerCard(tableId, 2)
            hitDilerCard(tableId, 1)
        }
    }
    componentDidUpdate() {
        this.winOrLoss()

    }
    winOrLoss = () => {
        const { sumPlayerCards, sumDilerCards, hitPlayerCard, gameStartAgaing, dilerStand, tableId, hitDilerCard, gameOver, playerWin, playerLoss, isGameOver, playerStand } = this.props

        if (gameStartAgaing && tableId) {
            if (tableId) {
                hitPlayerCard(tableId, 2)
                hitDilerCard(tableId, 1)
            }
        }

        if ((sumPlayerCards === 21) && (playerStand))
            playerWin()

        if (sumPlayerCards > 21)
            playerLoss()

        if (sumDilerCards > 21)
            playerWin()

        if ((playerStand) && (sumDilerCards <= 21) && (sumDilerCards >= 17)) {
            console.log("if (playerStand && dilerStand)(playerStand) && (sumDilerCards < 17)) {")


            if (sumDilerCards <= sumPlayerCards)
                playerWin()
            else
                playerLoss()

        }

        if ((playerStand) && (sumDilerCards < 17)) {
            hitDilerCard(tableId, 1)
        }
    }

    render() {
        const {
            tableId,
            remainingCards,
            playerCardsArray,
            sumPlayerCards,
            dilerCardsArray,
            sumDilerCards,
            playerPressStand,
            hitPlayerCard,

        } = this.props

        return (
            <div className="Game">

                {/* ------------ Diler Erea ------------*/}
                <div className='playerErea'>
                    <div className='display'>
                        <h1 className='shadow'>Diler</h1>
                        <div className='display-button'>

                        </div>
                    </div>
                    <div className='card'>
                        <div className='rowCard'>
                            {dilerCardsArray.map((card: any) => {
                                return <Card url={card.image} />
                            })}
                        </div>
                        <h3 className='remainingCards'>{`Sum Diler Cards: ${sumDilerCards}`}</h3>
                    </div>
                </div>

                <br></br>

                <h2 className='remainingCards remainingCardsPosition1'>{`Remaining Cards: ${remainingCards}`}</h2>


                {/* ------------ Player Erea ------------*/}
                <div className='playerErea'>
                    <div className='display'>
                        <h1 className='shadow'>Player</h1>
                        <div className='display-button'>
                            <button
                                className='start-blackjeck-game'
                                onClick={() => {
                                    hitPlayerCard(tableId, 1)
                                }}>
                                HIT
                            </button>
                            <button
                                className='start-blackjeck-game'
                                onClick={() => {
                                    playerPressStand()
                                }}>
                                STAND
                            </button>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='rowCard'>
                            {playerCardsArray.map((card: any) => {
                                return <Card url={card.image} />
                            })}

                        </div>
                        <h3 className='remainingCards'>{`Sum Player Cards: ${sumPlayerCards}`}</h3>
                    </div>
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
        cardsArray: state.cardsArray,
        remainingCards: state.remainingCards,
        playerCardsArray: state.playerCardsArray,
        sumPlayerCards: state.sumPlayerCards,
        dilerCardsArray: state.dilerCardsArray,
        sumDilerCards: state.sumDilerCards,
        playerStand: state.playerStand,
        gameStartAgaing: state.gameStartAgaing,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getCards: async (table: String, numbersOfCards: Number) => {

            const data = await getCardsFromUrl(table, numbersOfCards)
            dispatch({
                type: 'START_GAME',
                payload: {
                    data
                }
            })

        },
        hitPlayerCard: async (table: String, numbersOfCards: Number) => {

            const data = await getCardsFromUrl(table, numbersOfCards)

            data.cardsSum = getCardsValue(data.cards)

            dispatch({
                type: 'GET_PLAYER_CARDS',
                payload: {
                    data
                }
            })
        },
        hitDilerCard: async (table: String, numbersOfCards: Number) => {

            const data = await getCardsFromUrl(table, numbersOfCards)

            data.cardsSum = getCardsValue(data.cards)

            dispatch({
                type: 'GET_DILER_CARDS',
                payload: {
                    data
                }
            })
        },
        isGameOver: () => {
            dispatch({
                type: 'GAME_OVER',
                payload: {}
            })
        },
        playerWin: () => {
            dispatch({
                type: 'PLAYER_WIN',
                payload: {}
            })
        },
        playerLoss: () => {
            dispatch({
                type: 'PLAYER_LOSS',
                payload: {}
            })
        },
        playerPressStand: () => {
            dispatch({
                type: 'PLAYER_STAND',
                payload: {}
            })
        },
        dilerPressStand: () => {
            dispatch({
                type: 'DILER_STAND',
                payload: {}
            })
        }
    }
}
export const Game = connect(mapStateToProps, mapDispatchToProps)(_Game);

const getCardsFromUrl = async (table: String, numbersOfCards: Number) => {
    try {
        const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${table}/draw/?count=${numbersOfCards}`)
        return data


    } catch{

        return {}
    }

}

const getCardValue = (value: string) => {
    if (value === 'ACE') return 11
    const result = parseInt(value)
    return (result ? result : 10)
}

const getCardsValue = (array: Array<any>) => {
    var cardsSum = 0
    array.forEach((card: any) => {
        cardsSum += getCardValue(card.value)
    });
    return cardsSum
}


