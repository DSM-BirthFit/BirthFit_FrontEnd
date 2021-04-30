export const SET_SIGNUP = 'SET_SIGNUP';

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