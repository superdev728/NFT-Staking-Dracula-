// Import Constants
import {
    DRACULA,
} from '../../constants'

// Initial States
const initialState = {
    dracula: "",
}

const draculaReducer = (state = initialState, action) => {
    switch (action.type) {

        case DRACULA:
            return { ...state, dracula: action.payload }

        default:
            return state
    }
}

export default draculaReducer