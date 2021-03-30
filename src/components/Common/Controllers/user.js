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

    axios.get(`http://10.156.145.170:8080/user/profile`, {})
    .then(res => {
        console.log(res);
        handleMenuOption(0, onChangeMenuOption);
        onChangeMenuBar(false);
        history.push({
            pathname: '/profile',
            state: {
                user: {
                    userEmail: res.data.email,
                    userId: res.data.userId
                }
            }
        })
    })
    .catch(err => {console.log(err);})
}