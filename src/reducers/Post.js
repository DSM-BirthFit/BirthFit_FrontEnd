import { SET_PAGENUMLIMIT, SET_TOTALPAGE, SET_CURRENTPAGE, SET_MAXPAGENUMLIMIT, SET_MINPAGENUMLIMIT } from '../actions/Post';

const postIntialState = {
    pageNumLimit: 0,
    totalPage: 0,
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
        case SET_TOTALPAGE:
            return Object.assign({}, state, {
                totalPage: action.totalPage,
                pageNumbers: [1,2]
            })
        case SET_CURRENTPAGE:
            return Object.assign({}, state, {
                currentPage: action.currentPage,
                currentPosts: action.currentPosts,
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