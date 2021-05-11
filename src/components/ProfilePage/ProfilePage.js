import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import * as ProfilePageStyle from '../../assets/styles/ProfilePage/ProfilePage';
import profileImg from '../../assets/images/profile.jpg';
import BasicUserImg from '../../assets/images/user.jpg';

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';
import ProfileList from './ProfileList/ProfileList';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, handleLogout } from '../Common/Controllers/user';

import { connect } from 'react-redux';
import { setMenu, setAuth } from '../../actions/Head';
import { setSideBar } from '../../actions/Sidebar';
import { setProfile, setUserImg } from '../../actions/User';

const axios = require('axios');

const ProfilePage = ({ auth, menu, title, qna, help, id, email, pw, conpw, img, chooseImg, onChangeMenuBar, onChangeMenuOption, onChangeAuth, onChangeProfile, onChangeUserImg }) => {
    let history = useHistory();
    let location = useLocation();

    const [inputList, setInuptList] = useState([
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

        for(let i=2;i<4;i++) {
            if(inputList[i].warning !== '') {
                console.log(inputList[i].warning);
                checkWarn = true;
                break;
            }
        }

        if(!checkWarn) {
            const local = JSON.parse(localStorage.getItem('userInfo'));

            axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

            var formData = new FormData();
            formData.append("image", img);
            formData.append("password", conpw);
            formData.append("userId", id);

            axios.put(`http://13.124.184.19:8000/user/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
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
        onChangeUserImg(e.target.files[0]);
    }
    
    const handleDeleteProfile = () => {
        var deletePassword = prompt("Insert Your Password");
        console.log(deletePassword);

        const local = JSON.parse(localStorage.getItem('userInfo'));

        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.delete(`http://13.124.184.19:8000/user`, {
            data: {
                password: deletePassword
            },
        })
        .then(res => {
            console.log(res);
            handleLogout(onChangeAuth, onChangeMenuBar, onChangeMenuOption, history);
        })
        .catch(err => {
            console.log(err);
        })
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
                        <ProfilePageStyle.ImageCircle src={chooseImg}></ProfilePageStyle.ImageCircle>
                        <ProfilePageStyle.ImageText>
                            <ProfilePageStyle.ImageDescription>Select an image file on your computer.</ProfilePageStyle.ImageDescription>
                            <ProfilePageStyle.ChooseImage>
                                <ProfilePageStyle.ChooseLabel for="choose_file">CHOOSE IMAGE</ProfilePageStyle.ChooseLabel>
                                <ProfilePageStyle.ChooseInput type="file" id="choose_file" onChange={(e) => handleProfileImage(e)}/>
                            </ProfilePageStyle.ChooseImage>
                            <ProfilePageStyle.ResetImage type="button" value="RESET IMAGE" onClick={() => onChangeUserImg(BasicUserImg)}/>
                        </ProfilePageStyle.ImageText>
                    </ProfilePageStyle.ImageChange>
                    <ProfilePageStyle.Input>
                        <ProfileList userid={id} userEmail={email} lists={inputList} handleChangeInput={handleChangeInput}/>
                        <ProfilePageStyle.ProfileBtn>
                            <ProfilePageStyle.UpdateBtn onClick={() => handleUpdateProfile()}>UPDATE PROFILE</ProfilePageStyle.UpdateBtn>
                            <ProfilePageStyle.DeleteBtn onClick={() => handleDeleteProfile()}>DELETE PROFILE</ProfilePageStyle.DeleteBtn>
                        </ProfilePageStyle.ProfileBtn>
                    </ProfilePageStyle.Input>
                </ProfilePageStyle.MainContents>
                <ProfilePageStyle.ProfileImg src={profileImg}/>
            </ProfilePageStyle.Contents>
            <ProfilePageStyle.MainHeader>
                <Header/>
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
        id: state.user.id,
        email: state.user.email,
        pw: state.user.pw,
        conpw: state.user.conpw,
        img: state.user.img,
        imgURL: state.user.imgURL,
        chooseImg: state.user.chooseImg
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangeProfile: (id, pw, img) => dispatch(setProfile(id, pw, img)),
        onChangeUserImg: (img) => dispatch(setUserImg(img))
    }
}

const ProfilePageConnect = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

export default ProfilePageConnect;