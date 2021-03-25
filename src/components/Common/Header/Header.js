import React from 'react';
import { useHistory } from 'react-router-dom';
import * as HeaderStyle from '../../../assets/styles/Common/Header/Header';
import { AiOutlineMenu } from 'react-icons/ai'

const Header = ({ auth, onChangeMenuBar, handleMenuOption, handleSignIn, handleSignUp, handleProfile, onChangeAuth }) => {
    let history = useHistory();

    const handleMain = () => {
        history.push({
            pathname: '/'
        })
    }

    const handleLogout = () => {
        onChangeAuth(false);
        localStorage.removeItem('userInfo');
    }

    return (
        <HeaderStyle.Container>
            <HeaderStyle.MenuBarIcon onClick={() => onChangeMenuBar()}>
                <AiOutlineMenu color="white" size="50"></AiOutlineMenu>
            </HeaderStyle.MenuBarIcon>
            <HeaderStyle.MainTitle onClick={() => {handleMenuOption(0);handleMain()}}>Birth<HeaderStyle.HighLightTitle>Fit</HeaderStyle.HighLightTitle></HeaderStyle.MainTitle>
            { auth ? 
                <HeaderStyle.RightMenu>
                    <HeaderStyle.FirstBtn onClick={() => handleLogout()}>SIGN OUT</HeaderStyle.FirstBtn>
                    <HeaderStyle.SecondBtn onClick={() => handleProfile()}>PROFILE</HeaderStyle.SecondBtn>
                </HeaderStyle.RightMenu>
                :
                <HeaderStyle.RightMenu>
                    <HeaderStyle.FirstBtn onClick={() => handleSignUp()}>SIGN UP</HeaderStyle.FirstBtn>
                    <HeaderStyle.SecondBtn onClick={() => handleSignIn()}>SIGN IN</HeaderStyle.SecondBtn>
                </HeaderStyle.RightMenu>
            }
        </HeaderStyle.Container>
    )
}

export default Header;