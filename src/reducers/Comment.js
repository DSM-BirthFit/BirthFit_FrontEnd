import {SET_COMMENT} from '../actions/Comment';

const commentIntialState = {
    comment: '',
    len: 0
}

const comment = (state=commentIntialState, action) => {
    switch(action.type) {
        case SET_COMMENT:
            return Object.assign({}, state, {
                comment: action.comment,
                len: action.len
            }) 
        default:
            return state
    }
}

export default comment;