import { SET_WRITE } from '../actions/Write';

const writeIntialState = {
    title: "",
    text: "",
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
        default:
            return state
    }
}

export default write;