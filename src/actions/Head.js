export const SET_AUTH = 'SET_AUTH';
export const SET_MENU = 'SET_MENU';

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