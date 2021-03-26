import React from 'react';
import { useHistory } from 'react-router-dom';
import * as SideBarStyle from '../../../assets/styles/Common/SideBar/SideBar';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { IoMdHelp } from 'react-icons/io';

const SideBar = ({ auth, menu, title, qna, help, handleMenuOption, handleSignIn, handleSignUp, handleProfile, onChangeAuth }) => {
    let history = useHistory();

    const handleLogout = () => {
        onChangeAuth(false);
        handleMenuOption(0);
        localStorage.removeItem('userInfo');
        history.push({
            pathname: '/'
        })
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

            <SideBarStyle.MenuDiv menu={menu} backColor={qna} onClick={() => auth ? handleMenuOption(1) : alert("로그인해주세요")}>
                <SideBarStyle.IconDiv menu={menu}>
                    <RiQuestionAnswerLine color="white" size="45"></RiQuestionAnswerLine>
                </SideBarStyle.IconDiv>
                <SideBarStyle.MenuName menu={menu}>QnA</SideBarStyle.MenuName>
            </SideBarStyle.MenuDiv>

            <SideBarStyle.MenuDiv menu={menu} backColor={help} onClick={() => auth ? handleMenuOption(2) : alert("로그인해주세요")}>
                <SideBarStyle.IconDiv menu={menu}>
                    <IoMdHelp color="white" size="45"></IoMdHelp>
                </SideBarStyle.IconDiv>
                <SideBarStyle.MenuName menu={menu}>Help</SideBarStyle.MenuName>
            </SideBarStyle.MenuDiv>
        </SideBarStyle.Container>
    )
}

export default SideBar;