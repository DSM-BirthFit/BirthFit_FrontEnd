import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import * as ProfilePageStyle from '../../assets/styles/ProfilePage/ProfilePage';
import profileImg from '../../assets/images/profile.jpg';

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';
import ProfileList from './ProfileList/ProfileList';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth, setProfile } from '../../actions';

const axios = require('axios');

const ProfilePage = ({ auth, menu, title, qna, help, id, pw, onChangeMenuBar, onChangeMenuOption, onChangeAuth, onChangeProfile }) => {
    let history = useHistory();
    let location = useLocation();

    const [user, setUser] = useState({userId: '', userEmail: ''}),
          [inputList, setInuptList] = useState([
              {
                id: 0,
                name: 'ID',
                warning: `Your ID is used as a nickname in BirthFit. 
                You can change the ID at any time.`,
              },
              {
                id: 1,
                name: 'Email',
                warning: 'This email cannot be changed.',
              },
              {
                id: 2,
                name: 'Password',
                warning: '',
              },
              {
                id: 3,
                name: 'Confirm password',
                warning: '',
              }
          ]),
          [changeInput, setChangeInput] = useState({id: -1, value: ''});
    
    useEffect(() => {
        if(typeof (location.state) !== 'undefined' && location.state !== null) {
            const { user } = location.state;
            setUser(user);
        } else {
            setUser({userId: '', userEmail: ''});
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem('userInfo') && auth===false) {
            onChangeAuth(true)
        }
    }, [])

    const handleMenuOption = (num) => {
        if(num === 0) {
            onChangeMenuOption(true, false, false);
        } else if(num === 1) {
            onChangeMenuOption(false, true, false);
        } else if(num === 2){
            onChangeMenuOption(false, false, true);
        }
    }

    const handleSignIn = () => {
        history.push({
            pathname: '/signin'
        })
    }

    const handleSignUp = () => {
        history.push({
            pathname: '/signup'
        })
    }

    const handleProfile = () => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8080/user/profile`, {})
        .then(res => {
            console.log(res);
            history.push({
                pathname: '/profile',
                state: {
                    user: {
                        userEmail: res.data.email,
                        userId: res.data.userId
                    }
                }
            })
        })
        .catch(err => {console.log(err);})
    }

    const handleChangeInput = (input, num) => {
        setChangeInput({id: num, value: input});
    }

    useEffect(() => {
        if(changeInput.id !== -1) {
            const num = changeInput.id;
            inputList.splice(num, 1, {id: num, name: inputList[num].name, warning: num==0 ? inputList[num].warning : ''});
            switch(num) {
                case 0:
                    onChangeProfile(changeInput.value, pw);
                    break;
                case 2:
                    onChangeProfile(id, changeInput.value);
                    break;
                default:
                    break;
            }

            if(num===3 && pw !== changeInput.value) {
                inputList.splice(num, 1, {id: num, name: inputList[num].name, btn: inputList[num].btn, warning: 'Invalid confirm password'});
                inputList.splice(num-1, 1, {id: num-1, name: inputList[num-1].name, btn: inputList[num-1].btn, warning: 'hidden'});
            } else if(num===3 && pw === changeInput.value) {
                inputList.splice(num-1, 1, {id: num-1, name: inputList[num-1].name, btn: inputList[num-1].btn, warning: ''});
            } else if(num === 2 && pw === changeInput.value) {
                inputList.splice(num, 1, {id: num, name: inputList[num].name, btn: inputList[num].btn, warning: ''});
                inputList.splice(num+1, 1, {id: num+1, name: inputList[num+1].name, btn: inputList[num+1].btn, warning: ''});
            }

            setChangeInput({id: -1, value: ''});
        }
    }, [changeInput, inputList])

    const handleUpdateProfile = () => {
        let checkWarn = false;
        let thisId = id;

        for(let i=2;i<4;i++) {
            if(inputList[i].warning !== '') {
                console.log(inputList[i].warning);
                checkWarn = true;
                break;
            }
        }

        if(thisId === '') {
            thisId = user.userId;   
        }

        if(!checkWarn) {
            const local = JSON.parse(localStorage.getItem('userInfo'));

            axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

            axios.put(`http://10.156.145.170:8080/user/profile`, {
                userId: thisId,
                password: pw
            })
            .then(res => {console.log(res);
                onChangeProfile('', '');
                history.push({
                    pathname: '/',
                })
            })
            .catch(err => {console.log(err);})
        }
    }

    return (
        <ProfilePageStyle.Container>
            <ProfilePageStyle.Contents menu={menu}>
                <ProfilePageStyle.MainContents>
                    <ProfilePageStyle.TextContents>
                        <ProfilePageStyle.Header>Profile</ProfilePageStyle.Header>
                        <ProfilePageStyle.UnderBar></ProfilePageStyle.UnderBar>
                    </ProfilePageStyle.TextContents>
                    <ProfilePageStyle.Input>
                        <ProfileList user={user} lists={inputList} handleChangeInput={handleChangeInput}/>
                        <ProfilePageStyle.UpdateBtn onClick={() => handleUpdateProfile()}>UPDATE PROFILE</ProfilePageStyle.UpdateBtn>
                    </ProfilePageStyle.Input>
                </ProfilePageStyle.MainContents>
                <ProfilePageStyle.ProfileImg src={profileImg}/>
            </ProfilePageStyle.Contents>
            <ProfilePageStyle.MainHeader>
                <Header auth={auth} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile}></Header>
            </ProfilePageStyle.MainHeader>
            <ProfilePageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}></SideBar>
            </ProfilePageStyle.MainSide>
        </ProfilePageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
        id: state.profile.id,
        pw: state.profile.pw
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: () => dispatch(setMenu()),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangeProfile: (id, pw) => dispatch(setProfile(id, pw))
    }
}

const ProfilePageConnect = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

export default ProfilePageConnect;