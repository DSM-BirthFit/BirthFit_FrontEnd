import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import * as CommonStyle from '../../assets/styles/Common/Common.js';

import Header from './Header/Header';
import SideBar from './SideBar/SideBar';

import { connect } from 'react-redux';
import { setSideBar } from '../../actions';

const axios = require('axios');

const Common = ({ auth, menu, sidebar, onChangeMenuBar, onChangeMenuOption, onChangeAuth }) => {
    let history = useHistory();

    const [mainAuth, setMainAuth] = useState(false),
          [side, setSide] = useState(sidebar),
          [sideType, setSideType] = useState(-1);
        
    useEffect(() => {
        setMainAuth(state => auth);
        setSide(state => sidebar);
    }, [auth, sidebar])


    const handleMenuOption = (num) => {
        setSideType(num);
    }

    useEffect(() => {
    if(sideType !== -1) {
        if(sideType === 0) {
            side.splice(0, 1, {name: side[0].name, stat: false});
            side.splice(1, 1, {name: side[1].name, stat: false});
        }
        else if(sideType === 1) {
            side.splice(sideType-1, 1, {name: side[sideType-1].name, stat: true});
            side.splice(1, 1, {name: side[1].name, stat: false});
        } else if(sideType === 2){
            side.splice(sideType-1, 1, {name: side[sideType-1].name, stat: true});
            side.splice(0, 1, {name: side[0].name, stat: false});
        }

        onChangeMenuOption(side);
        setSideType(-1);
    }
    }, [side, sideType, onChangeMenuOption])

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
                <Header auth={mainAuth} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}/>
            </CommonStyle.Header>
            <CommonStyle.SideBar>
                <SideBar auth={mainAuth} menu={menu} sidebar={side} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}></SideBar>
            </CommonStyle.SideBar>
        </CommonStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar.sidebar
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuOption: (sidebar) => dispatch(setSideBar(sidebar))
    }
}

const CommonConnect = connect(mapStateToProps, mapDispatchToProps)(Common);

export default CommonConnect;