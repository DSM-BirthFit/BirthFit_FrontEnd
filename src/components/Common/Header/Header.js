import React from 'react';
import { useHistory } from 'react-router-dom';
import * as HeaderStyle from '../../../assets/styles/Common/Header/Header';
import { AiOutlineMenu } from 'react-icons/ai';
import { handleLogout } from '../Controllers/user';

const Header = ({ auth, menu, onChangeMenuBar, handleMenuOption, handleSignIn, handleSignUp, handleProfile, onChangeAuth, onChangeMenuOption }) => {
    let history = useHistory();

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
                    <HeaderStyle.FirstBtn onClick={() => handleLogout(onChangeAuth, onChangeMenuBar, onChangeMenuOption, history)}>SIGN OUT</HeaderStyle.FirstBtn>
                    <HeaderStyle.SecondBtn onClick={() => handleProfile(onChangeMenuOption, onChangeMenuBar, history)}>PROFILE</HeaderStyle.SecondBtn>
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

export default Header;