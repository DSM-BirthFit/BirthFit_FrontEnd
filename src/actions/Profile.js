export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = (id, pw) => {
    return {
        type: SET_PROFILE,
        id: id,
        pw: pw
    }
}