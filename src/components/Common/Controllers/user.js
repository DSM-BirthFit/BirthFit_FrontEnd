export const handleMenuOption = (num, onChangeMenuOption) => {
    if(num === 0) {
        onChangeMenuOption(true, false, false);
    } else if(num === 1) {
        onChangeMenuOption(false, true, false);
    } else if(num === 2){
        onChangeMenuOption(false, false, true);
    }
}

export const handleSignIn = (onChangeMenuBar, history) => {
    onChangeMenuBar(false);
    history.push({
        pathname: '/signin'
    })
}

export const handleSignUp = (onChangeMenuBar, history) => {
    onChangeMenuBar(false);
    history.push({
        pathname: '/signup'
    })
}

const axios = require('axios');

export const handleProfile = (onChangeMenuOption, onChangeMenuBar, history) => {
    const local = JSON.parse(localStorage.getItem('userInfo'));
    
    axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

    axios.get(`http://13.124.184.19:8000/user/profile`, {})
    .then(res => {
        console.log(res);
        handleMenuOption(0, onChangeMenuOption);
        onChangeMenuBar(false);
        history.push('/profile')
    })
    .catch(err => {console.log(err);})
}

export const handleLogout = (onChangeAuth, onChangeMenuBar, onChangeMenuOption, history) => {
    onChangeAuth(false);
    onChangeMenuBar(false);
    handleMenuOption(0, onChangeMenuOption);
    localStorage.removeItem('userInfo');
    history.push({
        pathname: '/'
    })
}

export const PutRefreshToken = () => {
    const local = JSON.parse(localStorage.getItem('userInfo'));

    axios.defaults.headers.common['X-Refresh-Token'] = `${local.tokenType} ${local.refreshToken}`;

    axios.put(`http://13.124.184.19:8000/user`, {})
    .then(res => {
        console.log(res);
        localStorage.removeItem('userInfo');
        localStorage.setItem(
            "userInfo",
            JSON.stringify({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                tokenType: res.data.tokenType 
            })
        );
    })
}