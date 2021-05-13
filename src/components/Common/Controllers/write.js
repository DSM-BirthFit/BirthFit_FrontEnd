import {PutRefreshToken} from './user';

const axios = require('axios');

export const handleWriteSubmit = (title, text, history, url, option, id, onChangeWrite, thisId) => {
    const local = JSON.parse(localStorage.getItem('userInfo'));
    
    axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

    if(option === "none") {
        axios.post(`http://13.124.184.19:8000/${url}`, {
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
            axios.post(`http://13.124.184.19:8000/${url}`, {
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
        axios.put(`http://13.124.184.19:8000/${url}/${id}`, {
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
            axios.put(`http://13.124.184.19:8000/${url}/${id}`, {
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
        if(thisId === -1) {
            axios.post(`http://13.124.184.19:8000/qna/answer/${id}`, {
                answer: text
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
                axios.post(`http://13.124.184.19:8000/qna/answer/${id}`, {
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
        } else {
            axios.put(`http://13.124.184.19:8000/qna/answer/${thisId}`, {
                answer: text
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
                axios.put(`http://13.124.184.19:8000/qna/answer/${thisId}`, {
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
}