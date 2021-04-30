export const SET_WRITE = 'SET_WRITE';
export const SET_COMMENT = 'SET_COMMENT';

export const setWrite = (title, text, len) => {
    return {
        type: SET_WRITE,
        title: title,
        text: text,
        len: len
    }
}

export const setComment = (comment, len) => {
    return {
        type: SET_COMMENT,
        comment: comment,
        len: len
    }
}