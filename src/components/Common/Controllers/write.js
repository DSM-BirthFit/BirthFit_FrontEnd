const axios = require('axios');

export const handleWriteSubmit = (title, text, history, url, onChangeWrite) => {
    const local = JSON.parse(localStorage.getItem('userInfo'));
    
    axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

    axios.post(`http://10.156.145.170:8080/${url}`, {
        title: title,
        content: text
    })
    .then(res => {
        console.log(res);
        onChangeWrite('', '', 0);
        history.push({
            pathname: `/${url}`
        })
    })
    .catch(err => {console.log(err);})
}