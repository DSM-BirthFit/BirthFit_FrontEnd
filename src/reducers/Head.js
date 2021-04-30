import { SET_AUTH, SET_MENU } from '../actions/Head';

const headIntialState = {
    auth: false,
    menu: false
}

const head = (state=headIntialState, action) => {
    switch(action.type) {
        case SET_AUTH:
            return Object.assign({}, state, {
                auth: action.auth
            })
        case SET_MENU:
            return Object.assign({}, state, {
                menu: action.menu
            })
        default:
            return state
    }
}

export default head;