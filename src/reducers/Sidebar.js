import { SET_SIDEBAR } from '../actions/Sidebar';

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

export default sidebar;