import {PutRefreshToken} from './user';

const axios = require('axios');

export const handleWriteSubmit = (title, text, history, url, option, id, onChangeWrite) => {
    const local = JSON.parse(localStorage.getItem('userInfo'));
    
    axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

    if(option === "none") {
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
        .catch(err => {
            console.log(err);
            PutRefreshToken();
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
            .catch(err => {
                console.log(err);
            })
        })
    } else if(option === 'edit') {
        axios.put(`http://10.156.145.170:8080/${url}/${id}`, {
            title: title,
            content: text
        })
        .then(res => {
            console.log(res);
            onChangeWrite('', '', 0);
            history.push({
                pathname: `/${url}/${id}`
            })
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.put(`http://10.156.145.170:8080/${url}/${id}`, {
                title: title,
                content: text
            })
            .then(res => {
                console.log(res);
                onChangeWrite('', '', 0);
                history.push({
                    pathname: `/${url}/${id}`
                })
            })
            .catch(err => {
                console.log(err);
            })
        })
    } else if(option === "answer"){
        axios.post(`http://10.156.145.170:8080/qna/answer/${id}`, {
            content: text
        })
        .then(res => {
            console.log(res);
            onChangeWrite('', '', 0);
            history.push({
                pathname: `/${url}/${id}`
            })
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.post(`http://10.156.145.170:8080/qna/answer/${id}`, {
                content: text
            })
            .then(res => {
                console.log(res);
                onChangeWrite('', '', 0);
                history.push({
                    pathname: `/${url}/${id}`
                })
            })
            .catch(err => {
                console.log(err);
            })
        })
    }
}