export const SET_SIGNIN = 'SET_SIGNIN';
export const SET_SIGNUP = 'SET_SIGNUP';
export const SET_FORGOT = 'SET_FORGOT';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_USERIMG = 'SET_USERIMG';

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

export const setProfile = (id, pw, img) => {
    return {
        type: SET_PROFILE,
        id: id,
        pw: pw,
        img: img
    }
}

export const setUserImg = (img) => {
    return {
        type: SET_USERIMG,
        img
    }
}