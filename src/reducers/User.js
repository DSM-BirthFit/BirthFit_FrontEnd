import { SET_SIGNIN, SET_SIGNUP, SET_FORGOT, SET_PROFILE } from '../actions/User';

const userIntialState = {
    email : "", 
    authent : "", 
    id : "", 
    idClick: false,
    pw : "", 
    pwClick: false,
    conpw : "",
}

const user = (state=userIntialState, action) => {
    switch(action.type) {
        case SET_SIGNIN:
            return Object.assign({}, state, {
                id: action.id,
                idClick: action.idClick,
                pw: action.pw,
                pwClick: action.pwClick
            })
        case SET_SIGNUP:
            return Object.assign({}, state, {
                email : action.email, 
                authent : action.authent, 
                id : action.id, 
                pw : action.pw, 
                conpw : action.conpw          
            })
        case SET_FORGOT:
            return Object.assign({}, state, {
                email: action.email,
                authent: action.authent,
                pw: action.pw,
                conpw: action.conpw
            }) 
        case SET_PROFILE:
            return Object.assign({}, state, {
                id: action.id,
                pw: action.pw
            })   
        default:
            return state
    }
}

export default user;