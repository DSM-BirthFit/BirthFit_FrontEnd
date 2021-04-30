import { SET_WRITE, SET_COMMENT } from '../actions/Write';

const writeIntialState = {
    title: "",
    text: "",
    comment: "",
    len: 0
}

const write = (state=writeIntialState, action) => {
    switch(action.type) {
        case SET_WRITE:
            return Object.assign({}, state, {
                title: action.title,
                text: action.text,
                len: action.len
            })
        case SET_COMMENT:
            return Object.assign({}, state, {
                comment: action.comment,
                len: action.len
            }) 
        default:
            return state
    }
}

export default write;