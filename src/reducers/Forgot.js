import { SET_FORGOT } from '../actions/Forgot';

const forgotIntialState = {
    email : "", 
    authent : "", 
    pw : "", 
    conpw : ""
}

const forgot = (state=forgotIntialState, action) => {
    switch(action.type) {
        case SET_FORGOT:
            return Object.assign({}, state, {
                email: action.email,
                authent: action.authent,
                pw: action.pw,
                conpw: action.conpw
            })
        default:
            return state
    }
}

export default forgot;