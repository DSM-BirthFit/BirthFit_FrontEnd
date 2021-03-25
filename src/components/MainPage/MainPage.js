import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as MainPageStyle from '../../assets/styles/MainPage/MainPage';
import introImg from '../../assets/images/intro.jpg';

import Common from '../Common/Common';

import { connect } from 'react-redux';
import { setAuth, setMenu } from '../../actions';

const MainPage = ({ auth, menu, onChangeMenuBar, onChangeAuth }) => {
    let history = useHistory();
    let location = useLocation();

    const pointText = "We give information about benefits and welfare.",
          detailText = "QnA allows you to ask questions and receive answers, and posts about benefits and welfare are posted.";

    useEffect(() => {
        if(localStorage.getItem('userInfo') && auth===false) {
            onChangeAuth(true)
        }
    }, [])

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
            <Common auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} onChangeAuth={onChangeAuth}></Common>
        </MainPageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: () => dispatch(setMenu()),
        onChangeAuth: (auth) => dispatch(setAuth(auth))
    }
}

const MainPageConnect = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default MainPageConnect;
