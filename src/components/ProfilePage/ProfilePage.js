import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import * as ProfilePageStyle from '../../assets/styles/ProfilePage/ProfilePage';
import profileImg from '../../assets/images/profile.jpg';
import BasicUserImg from '../../assets/images/user.jpg';

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';
import ProfileList from './ProfileList/ProfileList';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, PutRefreshToken } from '../Common/Controllers/user';

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
          [changeInput, setChangeInput] = useState({id: -1, value: ''}),
          [imgUrl, setImgUrl] = useState(BasicUserImg);
    
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
            onChangeAuth(true);
        } 
        if(!localStorage.getItem('userInfo')) {
            onChangeAuth(false);
            history.push('/')
        }
    }, [])

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
                onChangeMenuBar(false);
                handleMenuOption(0, onChangeMenuOption);
                history.push({
                    pathname: '/',
                })
            })
            .catch(err => {console.log(err);})
        }
    }

    const handleProfileImage = (e) => {
        e.preventDefault();
        setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
    
    return (
        <ProfilePageStyle.Container>
            <ProfilePageStyle.Contents menu={menu}>
                <ProfilePageStyle.MainContents>
                    <ProfilePageStyle.TextContents>
                        <ProfilePageStyle.Header>Profile</ProfilePageStyle.Header>
                        <ProfilePageStyle.UnderBar></ProfilePageStyle.UnderBar>
                    </ProfilePageStyle.TextContents>
                    <ProfilePageStyle.ImageChange>
                        <ProfilePageStyle.ImageChangeTitle>Profile Photo</ProfilePageStyle.ImageChangeTitle>
                        <ProfilePageStyle.ImageCircle src={imgUrl}></ProfilePageStyle.ImageCircle>
                        <ProfilePageStyle.ImageText>
                            <ProfilePageStyle.ImageDescription>Select an image file on your computer.</ProfilePageStyle.ImageDescription>
                            <ProfilePageStyle.ChooseImage>
                                <ProfilePageStyle.ChooseLabel for="choose_file">CHOOSE IMAGE</ProfilePageStyle.ChooseLabel>
                                <ProfilePageStyle.ChooseInput type="file" id="choose_file" onChange={(e) => handleProfileImage(e)}/>
                            </ProfilePageStyle.ChooseImage>
                            <ProfilePageStyle.ResetImage type="button" value="RESET IMAGE" onClick={() => setImgUrl(BasicUserImg)}/>
                        </ProfilePageStyle.ImageText>
                    </ProfilePageStyle.ImageChange>
                    <ProfilePageStyle.Input>
                        <ProfileList user={user} lists={inputList} handleChangeInput={handleChangeInput}/>
                        <ProfilePageStyle.UpdateBtn onClick={() => handleUpdateProfile()}>UPDATE PROFILE</ProfilePageStyle.UpdateBtn>
                    </ProfilePageStyle.Input>
                </ProfilePageStyle.MainContents>
                <ProfilePageStyle.ProfileImg src={profileImg}/>
            </ProfilePageStyle.Contents>
            <ProfilePageStyle.MainHeader>
                <Header auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile} onChangeMenuOption={onChangeMenuOption}></Header>
            </ProfilePageStyle.MainHeader>
            <ProfilePageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}></SideBar>
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
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangeProfile: (id, pw) => dispatch(setProfile(id, pw))
    }
}

const ProfilePageConnect = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

export default ProfilePageConnect;