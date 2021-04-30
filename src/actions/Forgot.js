export const SET_FORGOT = 'SET_FORGOT';

export const setForgot = (email, authent, pw, conpw) => {
    return {
        type: SET_FORGOT,
        email: email,
        authent: authent,
        pw: pw,
        conpw: conpw
    }
}
