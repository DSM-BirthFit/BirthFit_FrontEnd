export const SET_WRITE = 'SET_WRITE';

export const setWrite = (title, text, len) => {
    return {
        type: SET_WRITE,
        title: title,
        text: text,
        len: len
    }
}