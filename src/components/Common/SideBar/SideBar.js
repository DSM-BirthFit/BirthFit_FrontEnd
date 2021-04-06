import React from 'react';
import { useHistory } from 'react-router-dom';
import * as SideBarStyle from '../../../assets/styles/Common/SideBar/SideBar';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { IoMdHelp } from 'react-icons/io';
import { handleLogout } from '../Controllers/user';

const SideBar = ({ auth, menu, qna, help, onChangeMenuBar, handleMenuOption, handleSignIn, handleSignUp, handleProfile, onChangeAuth, onChangeMenuOption }) => {
    let history = useHistory();

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
        <SideBarStyle.Container menu={menu}>
            { auth ?
                <SideBarStyle.MenuUser menu={menu}>
                    <SideBarStyle.UserBtn onClick={() => handleProfile(onChangeMenuOption, onChangeMenuBar, history)}>PROFILE</SideBarStyle.UserBtn>
                    <SideBarStyle.UserBtn onClick={() => handleLogout(onChangeAuth, onChangeMenuBar, onChangeMenuOption, history)}>SIGN OUT</SideBarStyle.UserBtn>
                </SideBarStyle.MenuUser>
                :
                <SideBarStyle.MenuUser menu={menu}>
                    <SideBarStyle.UserBtn onClick={() => handleSignIn(onChangeMenuBar, history)}>SIGN IN</SideBarStyle.UserBtn>
                    <SideBarStyle.UserBtn onClick={() => handleSignUp(onChangeMenuBar, history)}>SIGN UP</SideBarStyle.UserBtn>
                </SideBarStyle.MenuUser>
            }

            <SideBarStyle.MenuDiv menu={menu} backColor={qna} onClick={() => auth ? handleQna() : alert("로그인해주세요")}>
                <SideBarStyle.IconDiv menu={menu}>
                    <RiQuestionAnswerLine color="white" size="45"></RiQuestionAnswerLine>
                </SideBarStyle.IconDiv>
                <SideBarStyle.MenuName menu={menu}>QnA</SideBarStyle.MenuName>
            </SideBarStyle.MenuDiv>

            <SideBarStyle.MenuDiv menu={menu} backColor={help} onClick={() => auth ? handleHelp() : alert("로그인해주세요")}>
                <SideBarStyle.IconDiv menu={menu}>
                    <IoMdHelp color="white" size="45"></IoMdHelp>
                </SideBarStyle.IconDiv>
                <SideBarStyle.MenuName menu={menu}>Help</SideBarStyle.MenuName>
            </SideBarStyle.MenuDiv>
        </SideBarStyle.Container>
    )
}

export default SideBar;