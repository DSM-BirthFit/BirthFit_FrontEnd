import { SET_SIGNUP } from '../actions/Signup';

const signupIntialState = {
    email : "", 
    authent : "", 
    id : "", 
    pw : "", 
    conpw : ""
}

const signup = (state=signupIntialState, action) => {
    switch(action.type) {
        case SET_SIGNUP:
            return Object.assign({}, state, {
                email : action.email, 
                authent : action.authent, 
                id : action.id, 
                pw : action.pw, 
                conpw : action.conpw          
            })
        default:
            return state
    }
}

export default signup;