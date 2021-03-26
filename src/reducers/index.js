import { SET_AUTH, SET_FORGOT, SET_MENU, SET_SIDEBAR, SET_SIGNIN, SET_SIGNUP, SET_PROFILE } from '../actions';
import { combineReducers } from 'redux';

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
                menu: !(state.menu)
            })
        default:
            return state
    }
}

const sidebarIntialState = {
    title: true,
    qna: false,
    help: false
}

const sidebar = (state=sidebarIntialState, action) => {
    switch(action.type) {
        case SET_SIDEBAR:
            return Object.assign({}, state, {
                title: action.title,
                qna: action.qna,
                help: action.help
            })
        default:
            return state
    }
} 

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

const reducerApp = combineReducers({
    head,
    sidebar,
    signin,
    signup,
    forgot,
    profile
})


export default reducerApp;