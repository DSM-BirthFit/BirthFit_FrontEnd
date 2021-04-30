import { SET_PAGENUMLIMIT, SET_POST, SET_CURRENTPAGE, SET_MAXPAGENUMLIMIT, SET_MINPAGENUMLIMIT } from '../actions/Post';

const postIntialState = {
    everyPost: [],
    pageNumLimit: 0,
    pageNumbers: [],
    currentPage: 1,
    currentPosts: [],
    maxPageNumLimit: 10,
    minPageNumLimit: 0
}

const post = (state=postIntialState, action) => {
    switch(action.type) {
        case SET_PAGENUMLIMIT:
            return Object.assign({}, state, {
                pageNumLimit: action.pageNumLimit
            })
        case SET_POST:
            return Object.assign({}, state, {
                everyPost: action.everyPost,
                pageNumbers: [...action.everyPost.keys()].filter(e=>e%state.pageNumLimit===0).map(e=> e/state.pageNumLimit+1)
            })
        case SET_CURRENTPAGE:
            return Object.assign({}, state, {
                currentPage: action.currentPage,
                currentPosts: state.everyPost.slice(action.currentPage*state.pageNumLimit-state.pageNumLimit, action.currentPage*state.pageNumLimit),
            })
        case SET_MAXPAGENUMLIMIT:
            return Object.assign({}, state, {
                maxPageNumLimit: action.maxPageNumLimit
            })
        case SET_MINPAGENUMLIMIT:
            return Object.assign({}, state, {
                minPageNumLimit: action.minPageNumLimit
            })
        default:
            return state
    }
}

export default post;