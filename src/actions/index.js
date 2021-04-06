export const SET_AUTH = 'SET_AUTH';
export const SET_MENU = 'SET_MENU';
export const SET_SIDEBAR = 'SET_SIDEBAR';
export const SET_SIGNIN = 'SET_SIGNIN';
export const SET_SIGNUP = 'SET_SIGNUP';
export const SET_FORGOT = 'SET_FORGOT';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_WRITE = 'SET_WRITE';
export const SET_VIEW = 'SET_VIEW';
export const SET_COMMENT = 'SET_COMMENT';
export const SET_LIKE = 'SET_LIKE';

export const setAuth = (auth) => {
    return {
        type: SET_AUTH,
        auth: auth
    }
}

export const setMenu = (menu) => {
    return {
        type: SET_MENU,
        menu: menu
    }
}

export const setSideBar = (title, qna, help) => {
    return {
        type: SET_SIDEBAR,
        title: title,
        qna: qna,
        help: help
    }
}

export const setSignin = (id, pw, idClick, pwClick) => {
    return {
        type: SET_SIGNIN,
        id: id,
        pw: pw,
        idClick: idClick,
        pwClick: pwClick
    }
}

export const setSignup = (email, authent, id, pw, conpw) => {
    return {
        type: SET_SIGNUP,
        email : email, 
        authent : authent, 
        id : id, 
        pw : pw, 
        conpw : conpw
    }
}

export const setForgot = (email, authent, pw, conpw) => {
    return {
        type: SET_FORGOT,
        email: email,
        authent: authent,
        pw: pw,
        conpw: conpw
    }
}

export const setProfile = (id, pw) => {
    return {
        type: SET_PROFILE,
        id: id,
        pw: pw
    }
}

export const setWrite = (title, text, len) => {
    return {
        type: SET_WRITE,
        title: title,
        text: text,
        len: len
    }
}

export const setView = (answer, contents, createdAt, likeCount, isLike, isMine, title, userId, view) => {
    return {
        type: SET_VIEW,
        answer: answer,
        contents: contents,
        createdAt: createdAt,
        likeCount: likeCount,
        isLike: isLike,
        isMine: isMine,
        title: title,
        userId: userId,
        view: view
    }
}

export const setLike = (like) => {
    return {
        type: SET_LIKE,
        like: like
    }
}

export const setComment = (comment, len) => {
    return {
        type: SET_COMMENT,
        comment: comment,
        len: len
    }
}