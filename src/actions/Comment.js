export const SET_COMMENT = 'SET_COMMENT';

export const setComment = (comment, len) => {
    return {
        type: SET_COMMENT,
        comment: comment,
        len: len
    }
}