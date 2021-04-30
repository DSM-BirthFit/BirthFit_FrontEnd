export const SET_SIGNIN = 'SET_SIGNIN';

export const setSignin = (id, pw, idClick, pwClick) => {
    return {
        type: SET_SIGNIN,
        id: id,
        pw: pw,
        idClick: idClick,
        pwClick: pwClick
    }
}