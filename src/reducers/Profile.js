import { SET_PROFILE } from '../actions/Profile';

const profileIntialState = {
    id: "",
    pw: "",
}

const profile = (state=profileIntialState, action) => {
    switch(action.type) {
        case SET_PROFILE:
            return Object.assign({}, state, {
                id: action.id,
                pw: action.pw
            })
        default:
            return state
    }
}

export default profile