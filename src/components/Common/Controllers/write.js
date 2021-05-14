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

export const handleReRenderViewPage = (url, id, onChangeView) => {
    const local = JSON.parse(localStorage.getItem('userInfo'));
    
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://13.124.184.19:8000/${url}/${id}`, {})
        .then(res => {
            if(url !== 'help') {
                console.log(res);
                onChangeView(res.data.answer, res.data.userImage, res.data.content, res.data.createdAt, res.data.likeCount, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
            } else {
                console.log(res);
                onChangeView(res.data.comment, res.data.userImage, res.data.content, res.data.createdAt, res.data.likeCount, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
            }
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.get(`http://13.124.184.19:8000/${url}/${id}`, {})
            .then(res => {
                onChangeView(res.data.answer, res.data.content, res.data.createdAt, res.data.likeCount, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
            })
            .catch(err => {
                console.log(err);
            }) 
        }) 
}