import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'


export interface State {
    text: string;
    tableId: string;
    gameStarted: boolean;
    cards: Record<string, any>;
    cardsArray: Array<any>;
    remainingCards: number;
    playerCardsArray: Array<any>;
    sumPlayerCards: number;
    dilerCardsArray: Array<any>;
    sumDilerCards: number;
    gameOver: boolean;
    playerStand: boolean;
    dilerStand: boolean;
    winnerName: string;
    gameStartAgaing: boolean;
}

const initialState: State = {

    text: 'Hello',
    tableId: "",
    gameStarted: false,
    cards: {},
    cardsArray: [],
    remainingCards: 0,
    playerCardsArray: [],
    sumPlayerCards: 0,
    dilerCardsArray: [],
    sumDilerCards: 0,
    gameOver: false,
    playerStand: false,
    dilerStand: false,
    winnerName: "",
    gameStartAgaing: false,
}

export interface Action {
    type: string;
    payload: Record<string, any>;
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'Hello': {

            return {
                ...state,
                text: action.payload.text,
            }
        }

        case 'GET_TABLE_PENDING': {
            return {
                ...state,
            }
        }

        case 'GET_TABLE_SUCCESS': {

            return {
                ...state,
                tableId: action.payload.tableId,
                gameStarted: action.payload.gameStarted,
                remainingCards: action.payload.remainingCards,

            }
        }

        case 'START_GAME': {
            return {
                ...state,
            }
        }

        case 'GET_PLAYER_CARDS': {
            const { cards, remaining, cardsSum } = action.payload.data
            return {
                ...state,
                playerCardsArray: state.playerCardsArray.concat(cards),
                remainingCards: remaining,
                sumPlayerCards: state.sumPlayerCards + cardsSum,
                gameStartAgaing: false,
            }
        }

        case 'GET_DILER_CARDS': {
            const { cards, remaining, cardsSum } = action.payload.data
            return {
                ...state,
                dilerCardsArray: state.dilerCardsArray.concat(cards),
                remainingCards: remaining,
                sumDilerCards: state.sumDilerCards + cardsSum,
                gameStartAgaing: false,
            }
        }
        case 'START_NEW_GAME_RESHUFFLE_CARDS': {
            const { remaining } = action.payload.data

            return {
                ...state,
                remainingCards: remaining,
                playerCardsArray: [],
                sumPlayerCards: 0,
                dilerCardsArray: [],
                sumDilerCards: 0,
                gameOver: false,
                playerStand: false,
                dilerStand: false,
                gameStartAgaing: true,
            }
        }
        case 'GAME_OVER': {
            return {
                ...state,
                gameOver: true,
            }
        }
        case 'PLAYER_STAND': {
            return {
                ...state,
                playerStand: true,
            }
        }
        case 'PLAYER_WIN': {
            return {
                ...state,
                playerStand: true,
                gameOver: true,
                winnerName: 'You'
            }
        }
        case 'PLAYER_LOSS': {
            return {
                ...state,
                gameOver: true,
                winnerName: 'Diler'
            }
        }
        case 'DILER_STAND': {
            return {
                ...state,
                dilerStand: true,
            }
        }
        default: {
            return state;
        }
    }
}

export function createReduxStore() {
    const logger = createLogger()
    const middleware = composeWithDevTools(applyMiddleware(logger))
    return createStore(reducer, middleware)
}
