// Import Constants
import {
    DRACULA,
} from '../../constants'

export const on_dracula_change = () => {
    return dispatch => {
        return dispatch({
            type: DRACULA,
            payload: "dracula test"
        })
    }
}