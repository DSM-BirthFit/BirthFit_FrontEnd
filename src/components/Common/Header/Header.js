import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import * as HeaderStyle from '../../../assets/styles/Common/Header/Header';
import { AiOutlineMenu } from 'react-icons/ai';

import { connect } from 'react-redux';
import { setMenu, setAuth } from '../../../actions/Head';
import { setSideBar } from '../../../actions/Sidebar';
import { setHeader } from '../../../actions/User';

import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, handleLogout, PutRefreshToken } from '../Controllers/user';

import axios from 'axios';

const Header = ({ auth, menu, email, id, img, onChangeMenuBar, onChangeAuth, onChangeMenuOption, onChnageHeader }) => {
    let history = useHistory();

    const [userInfo, setUserInfo] = useState(false),
          [aImg, setAImg] = useState('');

    useEffect(() => {
        if(auth) {
            const local = JSON.parse(localStorage.getItem('userInfo'));
            axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;
    
            axios.get(`http://13.124.184.19:8000/user/profile`, {})
            .then(res => {
                console.log(res);
                onChnageHeader(res.data.email, res.data.userId, res.data.image);
            })
            .catch(err => {
                console.log(err);
                PutRefreshToken();
                axios.get(`http://13.124.184.19:8000/user/profile`, {})
                .then(res => {
                    console.log(res);
                    onChnageHeader(res.data.email, res.data.userId, res.data.image);
                })
                .catch(err => console.log(err))
            })
        }
    }, [auth])

    const handleMain = () => {
        onChangeMenuBar(false);
        handleMenuOption(0, onChangeMenuOption);
        history.push({
            pathname: '/'
        })
    }

    return (
        <HeaderStyle.Container>
            <HeaderStyle.MenuBarIcon onClick={() => onChangeMenuBar(!menu)}>
                <AiOutlineMenu color="white" size="50"></AiOutlineMenu>
            </HeaderStyle.MenuBarIcon>
            <HeaderStyle.MainTitle onClick={() => {handleMenuOption(0, onChangeMenuOption);handleMain()}}>Birth<HeaderStyle.HighLightTitle>Fit</HeaderStyle.HighLightTitle></HeaderStyle.MainTitle>
            { auth ? 
                <HeaderStyle.RightMenu>
                    <HeaderStyle.UserInfo src={img} onClick={() => setUserInfo(!userInfo)}></HeaderStyle.UserInfo>
                    { userInfo &&
                        <HeaderStyle.UserInfoContents>
                            <HeaderStyle.Welcome>"Welcome to the <HeaderStyle.Strong>Birth<HeaderStyle.Point>Fit</HeaderStyle.Point>!</HeaderStyle.Strong>"</HeaderStyle.Welcome>
                            <HeaderStyle.Line></HeaderStyle.Line>
                            <HeaderStyle.AccountContents>
                                <HeaderStyle.Account>Account</HeaderStyle.Account>
                                <HeaderStyle.UserName>ID : {id}</HeaderStyle.UserName>
                                <HeaderStyle.UserEmail>Email : {email}</HeaderStyle.UserEmail>
                            </HeaderStyle.AccountContents>
                            <HeaderStyle.OptionContents>
                                <HeaderStyle.Option>Option</HeaderStyle.Option>
                                <HeaderStyle.Profile onClick={() => handleProfile(onChangeMenuOption, onChangeMenuBar, history)}>PROFILE</HeaderStyle.Profile>
                                <HeaderStyle.SignOut onClick={() => handleLogout(onChangeAuth, onChangeMenuBar, onChangeMenuOption, history)}>SIGN OUT</HeaderStyle.SignOut>
                            </HeaderStyle.OptionContents>
                        </HeaderStyle.UserInfoContents>
                    }
                </HeaderStyle.RightMenu>
                :
                <HeaderStyle.RightMenu>
                    <HeaderStyle.FirstBtn onClick={() => handleSignUp(onChangeMenuBar, history)}>SIGN UP</HeaderStyle.FirstBtn>
                    <HeaderStyle.SecondBtn onClick={() => handleSignIn(onChangeMenuBar, history)}>SIGN IN</HeaderStyle.SecondBtn>
                </HeaderStyle.RightMenu>
            }
        </HeaderStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        email: state.user.email,
        id: state.user.id,
        img: state.user.img
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChnageHeader: (email, id, img) => dispatch(setHeader(email, id, img))
    }
}

const HeaderConnect = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderConnect;