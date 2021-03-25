import React from 'react';
import * as SideBarStyle from '../../../assets/styles/Common/SideBar/SideBar';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { IoMdHelp } from 'react-icons/io';

const SideBar = ({ auth, menu, sidebar, handleMenuOption, handleSignIn, handleSignUp, handleProfile, onChangeAuth }) => {

    const handleLogout = () => {
        onChangeAuth();
        localStorage.removeItem('userInfo');
    }

    return (
        <SideBarStyle.Container menu={menu}>
            { auth ?
                <SideBarStyle.MenuUser menu={menu}>
                    <SideBarStyle.UserBtn onClick={() => handleProfile()}>PROFILE</SideBarStyle.UserBtn>
                    <SideBarStyle.UserBtn onClick={() => handleLogout()}>SIGN OUT</SideBarStyle.UserBtn>
                </SideBarStyle.MenuUser>
                :
                <SideBarStyle.MenuUser menu={menu}>
                    <SideBarStyle.UserBtn onClick={() => handleSignIn()}>SIGN IN</SideBarStyle.UserBtn>
                    <SideBarStyle.UserBtn onClick={() => handleSignUp()}>SIGN UP</SideBarStyle.UserBtn>
                </SideBarStyle.MenuUser>
            }

            <SideBarStyle.MenuDiv menu={menu} backColor={sidebar[0].stat} onClick={() => handleMenuOption(1)}>
                <SideBarStyle.IconDiv menu={menu}>
                    <RiQuestionAnswerLine color="white" size="45"></RiQuestionAnswerLine>
                </SideBarStyle.IconDiv>
                <SideBarStyle.MenuName menu={menu}>{sidebar[0].name}</SideBarStyle.MenuName>
            </SideBarStyle.MenuDiv>

            <SideBarStyle.MenuDiv menu={menu} backColor={sidebar[1].stat} onClick={() => handleMenuOption(2)}>
                <SideBarStyle.IconDiv menu={menu}>
                    <IoMdHelp color="white" size="45"></IoMdHelp>
                </SideBarStyle.IconDiv>
                <SideBarStyle.MenuName menu={menu}>{sidebar[1].name}</SideBarStyle.MenuName>
            </SideBarStyle.MenuDiv>
        </SideBarStyle.Container>
    )
}

export default SideBar;