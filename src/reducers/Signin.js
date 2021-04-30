import { SET_SIGNIN } from '../actions/Signin';

const signinIntialState = {
    id: "",
    idClick: false,
    pw: "",
    pwClick: false
}

const signin = (state=signinIntialState, action) => {
    switch(action.type) {
        case SET_SIGNIN:
            return Object.assign({}, state, {
                id: action.id,
                idClick: action.idClick,
                pw: action.pw,
                pwClick: action.pwClick
            })
        default:
            return state
    }
}

export default signin;