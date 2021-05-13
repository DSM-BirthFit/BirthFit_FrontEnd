import { SET_VIEW, SET_LIKE } from '../actions/View';
import BasicUserImg from '../assets/images/user.jpg';

const viewIntialState = {
    answer: [],
    userImage: '',
    contents: '',
    createdAt: '',
    likeCount: 0,
    isLike: false,
    isMine: true,
    title: '',
    userId: '',
    view: 0
}

const view = (state=viewIntialState, action) => {
    switch(action.type) {
        case SET_VIEW:
            return Object.assign({}, state, {
                answer: action.answer,
                userImage: action.userImage == null ? BasicUserImg : `http://10.156.145.170:8000/image/${action.userImage}`,
                contents: action.contents,
                createdAt: action.createdAt,
                likeCount: action.likeCount,
                isLike: action.isLike,
                isMine: action.isMine,
                title: action.title,
                userId: action.userId,
                view: action.view
            })
        case SET_LIKE:
            if(action.like) {
                return Object.assign({}, state, {
                    likeCount: state.likeCount + 1,
                    isLike: action.like
                })
            } else {
                return Object.assign({}, state, {
                    likeCount: state.likeCount - 1,
                    isLike: action.like
                })
            }
        default:
            return state
    }
}

export default view;