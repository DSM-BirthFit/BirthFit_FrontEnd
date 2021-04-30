import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as MainPageStyle from '../../assets/styles/MainPage/MainPage';
import introImg from '../../assets/images/intro.jpg';

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile } from '../Common/Controllers/user';

import { connect } from 'react-redux';
import { setMenu, setAuth } from '../../actions/Head';
import { setSideBar } from '../../actions/Sidebar';

const axios = require('axios');

const MainPage = ({ auth, menu, title, qna, help, onChangeMenuBar, onChangeAuth, onChangeMenuOption }) => {
    let history = useHistory();

    const pointText = "We give information about benefits and welfare.",
          detailText = "QnA allows you to ask questions and receive answers, and posts about benefits and welfare are posted.";

    useEffect(() => {
        if(localStorage.getItem('userInfo') && auth===false) {
            onChangeAuth(true)
        }
    }, []);

    const handleQna = () => {
        onChangeMenuBar(false);
        handleMenuOption(1, onChangeMenuOption);
        history.push({
            pathname: '/qna'
        })
    }

    const handleHelp = () => {
        onChangeMenuBar(false);
        handleMenuOption(2, onChangeMenuOption);
        history.push({
            pathname: '/help'
        })
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
                        <MainPageStyle.QnABtn onClick={() => auth ? handleQna() : alert("로그인해주세요")}>QnA</MainPageStyle.QnABtn>
                        <MainPageStyle.HelpBtn onClick={() => auth ? handleHelp() : alert("로그인해주세요")}>Help</MainPageStyle.HelpBtn>
                    </MainPageStyle.MainBtn>
                </MainPageStyle.MainContents>
                <MainPageStyle.IntroImg src={introImg}/>
            </MainPageStyle.Contents>
            <MainPageStyle.MainHeader>
                <Header/>
            </MainPageStyle.MainHeader>
            <MainPageStyle.MaineSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} onChangeMenuBar={onChangeMenuBar}  onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile}></SideBar>
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
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
    }
}

const MainPageConnect = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default MainPageConnect;
