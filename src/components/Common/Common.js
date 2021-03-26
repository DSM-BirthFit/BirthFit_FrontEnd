import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import * as CommonStyle from '../../assets/styles/Common/Common.js';

import Header from './Header/Header';
import SideBar from './SideBar/SideBar';

import { connect } from 'react-redux';
import { setSideBar } from '../../actions';

const axios = require('axios');

const Common = ({ auth, menu, title, qna, help, onChangeMenuBar, onChangeMenuOption, onChangeAuth }) => {
    let history = useHistory();

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

    return (
        <CommonStyle.Container>
            <CommonStyle.Header>
                <Header auth={auth} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}/>
            </CommonStyle.Header>
            <CommonStyle.SideBar>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}></SideBar>
            </CommonStyle.SideBar>
        </CommonStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help))
    }
}

const CommonConnect = connect(mapStateToProps, mapDispatchToProps)(Common);

export default CommonConnect;