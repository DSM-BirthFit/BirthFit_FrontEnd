export const SET_SIDEBAR = 'SET_SIDEBAR';

export const setSideBar = (title, qna, help) => {
    return {
        type: SET_SIDEBAR,
        title: title,
        qna: qna,
        help: help
    }
}