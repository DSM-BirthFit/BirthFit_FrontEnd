import React, {useState, useEffect} from "react";
import { useHistory, useLocation } from 'react-router';
import * as QnAPageStyle from '../../assets/styles/QnAPage/QnAPage'

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';
import QnAListPage from './QnAListPage/QnAListPage';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth } from '../../actions';

const axios = require('axios');

const QnAPage = ({ auth, menu, title, qna, help, onChangeMenuBar, onChangeMenuOption, onChangeAuth }) => {
    let history = useHistory();
     
    const lists = [];

    const handleMenuOption = (num) => {
        if(num === 0) {
            onChangeMenuOption(true, false, false);
        } else if(num === 1) {
            onChangeMenuOption(false, true, false);
        } else if(num === 2){
            onChangeMenuOption(false, false, true);
        }
    }

    const handleSignIn = () => {
        history.push({
            pathname: '/signin'
        })
    }

    const handleSignUp = () => {
        history.push({
            pathname: '/signup'
        })
    }

    const handleProfile = () => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8080/user/profile`, {})
        .then(res => {
            console.log(res);
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


    return (
        <QnAPageStyle.Container>
            <QnAPageStyle.Contents>
                <QnAPageStyle.MainContents>
                    <QnAPageStyle.TextContents>
                        <QnAPageStyle.Header>QnA</QnAPageStyle.Header>
                        <QnAPageStyle.UnderBar></QnAPageStyle.UnderBar>
                        <QnAPageStyle.WritenBtn></QnAPageStyle.WritenBtn>
                    </QnAPageStyle.TextContents>
                    <QnAPageStyle.Input>
                        <QnAListPage lists={lists}/>
                    </QnAPageStyle.Input>
                </QnAPageStyle.MainContents>
            </QnAPageStyle.Contents>
            <QnAPageStyle.MainHeader>
                <Header auth={auth} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile}></Header>
            </QnAPageStyle.MainHeader>
            <QnAPageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}></SideBar>
            </QnAPageStyle.MainSide>
        </QnAPageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: () => dispatch(setMenu()),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
    }
}

const QnAPageConnect = connect(mapStateToProps, mapDispatchToProps)(QnAPage);

export default QnAPageConnect;