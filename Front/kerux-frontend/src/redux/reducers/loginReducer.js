import { NOM } from "../actions/types"

const loginReducer = (state = {} , action) => {
    if(action.type === NOM) {
        return state
    }
    return state
}

export default loginReducer