import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import * as HeaderStyle from '../../../assets/styles/Common/Header/Header';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { handleLogout } from '../Controllers/user';
import userImg from '../../../assets/images/user.jpg';

const Header = ({ auth, menu, onChangeMenuBar, handleMenuOption, handleSignIn, handleSignUp, handleProfile, onChangeAuth, onChangeMenuOption }) => {
    let history = useHistory();

    const [userInfo, setUserInfo] = useState(false),
          [alarm, setAlarm] = useState(false);

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
                    <HeaderStyle.UserInfo src={userImg} onClick={() => {setAlarm(false);setUserInfo(!userInfo);}}></HeaderStyle.UserInfo>
                    <HeaderStyle.AlarmIcon onClick={() => {setUserInfo(false);setAlarm(!alarm);}}>
                        <BsBell size="30" color="white"></BsBell>
                        <HeaderStyle.AlarmTure/>
                    </HeaderStyle.AlarmIcon>
                    { userInfo &&
                        <HeaderStyle.UserInfoContents>
                            <HeaderStyle.Welcome>"Welcome to the <HeaderStyle.Strong>Birth<HeaderStyle.Point>Fit</HeaderStyle.Point>!</HeaderStyle.Strong>"</HeaderStyle.Welcome>
                            <HeaderStyle.Line></HeaderStyle.Line>
                            <HeaderStyle.AccountContents>
                                <HeaderStyle.Account>Account</HeaderStyle.Account>
                                <HeaderStyle.UserName>ID : esung246</HeaderStyle.UserName>
                                <HeaderStyle.UserEmail>Email : esung246@gmail.com</HeaderStyle.UserEmail>
                            </HeaderStyle.AccountContents>
                            <HeaderStyle.OptionContents>
                                <HeaderStyle.Option>Option</HeaderStyle.Option>
                                <HeaderStyle.Profile onClick={() => handleProfile(onChangeMenuOption, onChangeMenuBar, history)}>PROFILE</HeaderStyle.Profile>
                                <HeaderStyle.SignOut onClick={() => handleLogout(onChangeAuth, onChangeMenuBar, onChangeMenuOption, history)}>SIGN OUT</HeaderStyle.SignOut>
                            </HeaderStyle.OptionContents>
                        </HeaderStyle.UserInfoContents>
                    }
                    { alarm &&
                        <HeaderStyle.AlarmContents>
                            <HeaderStyle.AlarmHeader>Update</HeaderStyle.AlarmHeader>

                        </HeaderStyle.AlarmContents>
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

export default Header;