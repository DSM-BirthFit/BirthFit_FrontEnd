import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as MainPageStyle from '../../assets/styles/MainPage/MainPage';
import introImg from '../../assets/images/intro.jpg';

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';

import { connect } from 'react-redux';
import { setAuth, setMenu, setSideBar, } from '../../actions';

const axios = require('axios');

const MainPage = ({ auth, menu, title, qna, help, onChangeMenuBar, onChangeAuth, onChangeMenuOption }) => {
    let history = useHistory();
    let location = useLocation();

    const pointText = "We give information about benefits and welfare.",
          detailText = "QnA allows you to ask questions and receive answers, and posts about benefits and welfare are posted.";

    useEffect(() => {
        if(localStorage.getItem('userInfo') && auth===false) {
            onChangeAuth(true)
        }
    }, [])

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
        <MainPageStyle.Container>
            <MainPageStyle.Contents menu={menu}>
                <MainPageStyle.MainContents>
                    <MainPageStyle.TextContents>
                        <MainPageStyle.Welcome>Welcome</MainPageStyle.Welcome>
                        <MainPageStyle.PointText>{pointText}</MainPageStyle.PointText>
                        <MainPageStyle.DetailText>{detailText}</MainPageStyle.DetailText>
                    </MainPageStyle.TextContents>
                    <MainPageStyle.MainBtn>
                        <MainPageStyle.QnABtn>QnA</MainPageStyle.QnABtn>
                        <MainPageStyle.HelpBtn>Help</MainPageStyle.HelpBtn>
                    </MainPageStyle.MainBtn>
                </MainPageStyle.MainContents>
                <MainPageStyle.IntroImg src={introImg}/>
            </MainPageStyle.Contents>
            <MainPageStyle.MainHeader>
                <Header auth={auth} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></Header>
            </MainPageStyle.MainHeader>
            <MainPageStyle.MaineSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></SideBar>
            </MainPageStyle.MaineSide>
        </MainPageStyle.Container>
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
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
    }
}

const MainPageConnect = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default MainPageConnect;
