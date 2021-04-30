import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import * as SignInPageStyle from '../../assets/styles/SignInPage/SignInPage';
import signinImg from '../../assets/images/signin.jpg';

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';

import { connect } from 'react-redux';
import { setMenu, setAuth } from '../../actions/Head';
import { setSideBar } from '../../actions/Sidebar';
import { setSignin } from '../../actions/User';

const axios = require('axios');

const SignInPage = ({ auth, menu, title, qna, help, id, pw, idClick, pwClick, onChangeMenuBar, onChangeAuth, onChangeSignin, onChangeMenuOption }) => {
    let history = useHistory();

    const [signId, setSignId] = useState(''),
          [signPw, setSignPw] = useState(''),
          [nullId, setNullId] = useState(false),
          [nullPw, setNullPw] = useState(false),
          [nullIn, setNullIn] = useState(false);

    const text = 'Not a member yet?';
    const signupText = 'Sign up here';
    const dontMatch = 'Username/password doesn\'t match, or the user does\'t exist';
    const require = 'Require';

    const handleMenuOption = (num) => {
        if(num === 0) {
            onChangeMenuOption(true, false, false);
        } else if(num === 1) {
            onChangeMenuOption(false, true, false);
        } else if(num === 2){
            onChangeMenuOption(false, false, true);
        }
    }

    useEffect(() => {
        if(signId!=='' || signPw!=='') {
            if(nullId) {
                onChangeSignin(signId, signPw, false, pwClick);
                setNullId(false);
            }
            if(nullPw) {
                onChangeSignin(signId, signPw, idClick, false);
                setNullPw(false);
            }
        }
    }, [signId, signPw, nullId, nullPw, onChangeSignin])


    const handleEnter = () => {
        if(window.event.keyCode == 13) {
            handleSignin();
        }
    }

    const handleSignin = () => {
        axios.post(`http://10.156.145.170:8000/user/login`, {
            email: id,
            password: pw,
        })
        .then(res => {
            console.log(res);
            setNullIn(true);
            onChangeAuth(true);

            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    tokenType: res.data.tokenType 
                })
            );
            onChangeMenuBar(false);
            handleMenuOption(0, onChangeMenuOption);

            history.push({
                pathname: '/',
            })
        })
        .catch(err => {
            console.log(err);
            setNullIn(true);
        })
    }


    const handleSignIn = () => {
        onChangeMenuBar(false);
        history.push({
            pathname: '/signin'
        })
    }

    const handleSignUp = () => {
        onChangeMenuBar(false);
        history.push({
            pathname: '/signup'
        })
    }

    useEffect(() => {
        if(nullIn) {
            setTimeout(() => setNullIn(false), 5000);
        }
    }, [nullIn])

    const handleForgot = () => {
        onChangeMenuBar(false);
        history.push({
            pathname: '/forgot'
        })
    }

    return (
        <SignInPageStyle.Container>
            <SignInPageStyle.Contents menu={menu}>
                <SignInPageStyle.MainContents>
                    <SignInPageStyle.Header>
                        <SignInPageStyle.HeaderText>SIGN IN</SignInPageStyle.HeaderText>
                        <SignInPageStyle.UnderBar/>
                        <SignInPageStyle.Text>{text}<SignInPageStyle.SignUp onClick={() => handleSignUp()}>{signupText}</SignInPageStyle.SignUp></SignInPageStyle.Text>
                    </SignInPageStyle.Header>
                    <SignInPageStyle.Input>
                        <SignInPageStyle.ID>
                            <SignInPageStyle.IDText idClick={signId === '' ? idClick : false}>Email</SignInPageStyle.IDText>
                            <SignInPageStyle.IDInput onChange={(e) => {setSignId(e.target.value); setNullId(true)}} onClick={() => onChangeSignin(signId, signPw, true, pwClick)}/>
                            { (idClick === true && signId === '') &&
                                <SignInPageStyle.Warning>{require}</SignInPageStyle.Warning>
                            }
                        </SignInPageStyle.ID>
                        <SignInPageStyle.PW>
                            <SignInPageStyle.PWText pwClick={signPw === '' ? pwClick : false}>Password</SignInPageStyle.PWText>
                            <SignInPageStyle.PWInput type="password" onChange={(e) => {setSignPw(e.target.value); setNullPw(true)}} onKeyDown={() => handleEnter()} onClick={() => onChangeSignin(signId, signPw, idClick, true)}/>
                            { (pwClick === true && signPw === '') &&
                                <SignInPageStyle.Warning>{require}</SignInPageStyle.Warning>
                            }
                        </SignInPageStyle.PW>
                    </SignInPageStyle.Input>
                    <SignInPageStyle.Bottom>
                        <SignInPageStyle.SendBtn onClick={handleSignin}>SIGN IN</SignInPageStyle.SendBtn>
                        <SignInPageStyle.Forgot onClick={handleForgot}>Forgot Password?</SignInPageStyle.Forgot>
                    </SignInPageStyle.Bottom>
                </SignInPageStyle.MainContents>
                <SignInPageStyle.SignInImg src={signinImg}/>
                { nullIn &&
                    <SignInPageStyle.WarningContents>
                        <SignInPageStyle.WarningText>{dontMatch}<SignInPageStyle.CloseWarning onClick={() => setNullIn(false)}>X</SignInPageStyle.CloseWarning></SignInPageStyle.WarningText>
                    </SignInPageStyle.WarningContents>
                }
            </SignInPageStyle.Contents>
            <SignInPageStyle.MainHeader>
                <Header auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></Header>
            </SignInPageStyle.MainHeader>
            <SignInPageStyle.MaineSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></SideBar>
            </SignInPageStyle.MaineSide>
        </SignInPageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        id: state.signin.id,
        pw: state.signin.pw,
        idClick: state.signin.idClick,
        pwClick: state.signin.pwClick,
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
        onChangeSignin: (id, pw, idClick, pwClick) => dispatch(setSignin(id, pw, idClick, pwClick))
    }
}

const SignInPageConnect = connect(mapStateToProps, mapDispatchToProps)(SignInPage);

export default SignInPageConnect;