import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import * as HeaderStyle from '../../../assets/styles/Common/Header/Header';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import userImg from '../../../assets/images/user.jpg';

import AlarmList from '../Alarm/AlarmList';

import { connect } from 'react-redux';
import { setAlarm, setAlarmList } from '../../../actions/Alarm';
import { setMenu, setAuth } from '../../../actions/Head';
import { setSideBar } from '../../../actions/Sidebar';
import { setHeader } from '../../../actions/User';

import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, handleLogout } from '../Controllers/user';

import axios from 'axios';

const Header = ({ auth, menu, alarm, alarmLists, email, id, imgURL, onChangeAlarm, onChangeAlarmList, onChangeMenuBar, onChangeAuth, onChangeMenuOption, onChnageHeader }) => {
    let history = useHistory();

    const [userInfo, setUserInfo] = useState(false),
          alarmList = [
              {
                alarm_id: 1,
                user_name: "userTest",
                image: userImg,
                content: 'asdfasdfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfsdfd',
                date: '오전 11:22'
              },
              {
                alarm_id: 2,
                user_name: "userTest",
                image: userImg,
                content: 'asdfasdfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfsdfd',
                date: '오전 11:22'
              },
              {
                alarm_id: 3,
                user_name: "userTest",
                image: userImg,
                content: 'asdfasdfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfsdfd',
                date: '오전 11:22'
              },
              {
                alarm_id: 4,
                user_name: "userTest",
                image: userImg,
                content: 'asdfasdfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfsdfd',
                date: '오전 11:22'
              },
              {
                alarm_id: 5,
                user_name: "userTest",
                image: userImg,
                content: 'asdfasdfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfsdfd',
                date: '오전 11:22'
              }
          ];

    useEffect(() => {
        onChangeAlarmList(alarmList);
        const local = JSON.parse(localStorage.getItem('userInfo'));
        if(auth) {
            axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;
    
            axios.get(`http://13.124.184.19:8000/user/profile`, {})
            .then(res => {
                console.log(res);
                onChnageHeader(res.data.email, res.data.userId, res.data.image);
            })
            .catch(err => {console.log(err);})
        }
    }, [])

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
                    <HeaderStyle.UserInfo src={imgURL} onClick={() => {onChangeAlarm(false);setUserInfo(!userInfo);}}></HeaderStyle.UserInfo>
                    <HeaderStyle.AlarmIcon onClick={() => {setUserInfo(false);onChangeAlarm(!alarm);}}>
                        <BsBell size="30" color="white"></BsBell>
                        <HeaderStyle.AlarmTure/>
                    </HeaderStyle.AlarmIcon>
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
                    { alarm &&
                        <HeaderStyle.AlarmContents>
                            <HeaderStyle.AlarmHeader>Update</HeaderStyle.AlarmHeader>
                            <HeaderStyle.AlarmList>
                                <AlarmList lists={alarmLists}></AlarmList>
                            </HeaderStyle.AlarmList>
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

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        alarm: state.alarm.alarm, 
        alarmLists: state.alarm.alarmLists,
        email: state.user.email,
        id: state.user.id,
        imgURL: state.user.imgURL
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangeAlarmList: (alarmLists) => dispatch(setAlarmList(alarmLists)),
        onChangeAlarm: (alarm) => dispatch(setAlarm(alarm)),
        onChnageHeader: (email, id, img) => dispatch(setHeader(email, id, img))
    }
}

const HeaderConnect = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderConnect;