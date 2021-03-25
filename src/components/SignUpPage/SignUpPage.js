import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import * as SignUpPageStyle from '../../assets/styles/SignUpPage/SignUpPage';
import signupImg from '../../assets/images/signup.jpg';

import SignUpList from './SignUpList/SignUpList';
import Header  from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setSignup } from '../../actions';

const axios = require('axios');

const SignUpPage = ({ auth, menu, sidebar, email, authent, id, pw, conpw, onChangeMenuBar, onChangeMenuOption, onChangeSignup }) => {
    let history = useHistory();

    const text = 'Already have an account?'

    const [inputList, setInuptList] = useState([
        { 
            id: 0,
            name: 'Email',
            btn: true,
            warning: '',
        },
        { 
            id: 1,
            name: 'Authentication',
            btn: true,
            warning: '',
        },
        { 
            id: 2,
            name: 'ID',
            btn: false,
            warning: '',
        },
        { 
            id: 3,
            name: 'Password',
            btn: false,
            warning: '',
        },
        { 
            id: 4,
            name: 'Confirm Password',
            btn: false,
            warning: '',
        },
    ]),
          [inputClick, setInputClick] = useState({value:'', id:-1}),
          [inputChange, setInputChange] = useState({value:'', id:-1}),
          [side, setSide] = useState(sidebar),
          [sideType, setSideType] = useState(-1);

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

    const handleChangeInput = (value, num) => {
        setInputChange({value: value, id: num});
    }

    useEffect(() => {
        if(inputChange.id !== -1) {
            const num = inputChange.id;
            inputList.splice(num, 1, {id: num, name: inputList[num].name, btn: inputList[num].btn, warning: ''});
            switch(num) {
                case 0:
                    onChangeSignup(inputChange.value, authent, id, pw, conpw);
                    break;
                case 1:
                    onChangeSignup(email, inputChange.value, id, pw, conpw);
                    break;
                case 2:
                    onChangeSignup(email, authent, inputChange.value, pw, conpw);
                    break;
                case 3:
                    onChangeSignup(email, authent, id, inputChange.value, conpw);
                    break;
                case 4:
                    onChangeSignup(email, authent, id, pw, inputChange.value);
                    break;
                default:
                    break;
            }

            var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

            if(num === 0 && !reg_email.test(inputChange.value)) {
                inputList.splice(num, 1, {id: num, name: inputList[num].name, btn: inputList[num].btn, warning: 'Invalid email'});
            }

            if(num === 1 && !inputChange.value) {
                inputList.splice(num, 1, {id: num, name: inputList[num].name, btn: inputList[num].btn, warning: 'Invalid authentication'});
            }

            if(num === 4 && pw !== inputChange.value) {
                inputList.splice(num, 1, {id: num, name: inputList[num].name, btn: inputList[num].btn, warning: 'Invalid confirm password'});
            }
            
            setInputChange({value:'', id:-1});
        }
    }, [inputChange, inputList])

    const handleClickInput = (value, num) => {
        setInputClick({value: value, id: num});
    }

    useEffect(() => {
        if(inputClick.id !== -1) {
            const num = inputClick.id;
            if(inputClick.value === '') 
                inputList.splice(num, 1, {id: num, name: inputList[num].name, btn: inputList[num].btn, warning: 'Required'})

            setInputClick({value:'', id:-1});
        }
    }, [inputClick, inputList])
    
    const handleThisSignUp = () => {
        let checkWarn = false;

        for(let i=0;i<5;i++) {
            if(inputList[i].warning !== '') {
                checkWarn = true;
                break;
            }
        }
        console.log(checkWarn);

        if(!checkWarn && email !== '' && authent !== '' && id !== '' && pw !== '' && conpw !== '') {
            axios.post(`http://10.156.145.170:8080/user/join`, {
                email: email,
                userId: id,
                password: pw
            })
            .then(res => {
                console.log(res);
                history.push({
                    pathname: '/signin'
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const handleSend = (num) => {
        if(num === 0) {
            axios.post(`http://10.156.145.170:8080/email/send?email=${email}`, {
                email: email
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                setInputChange({value: email, id: 0});
            })
        } else if(num === 1) {
            axios.put(`http://10.156.145.170:8080/email/verify`, {
                email: email,
                code: authent
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                setInputChange({value: false, id: 1});
            })
        }
    }

    return (
        <SignUpPageStyle.Container>
            <SignUpPageStyle.Contents menu={menu}>
                <SignUpPageStyle.MainContents>
                    <SignUpPageStyle.Header>
                        <SignUpPageStyle.HeaderText>SIGN UP</SignUpPageStyle.HeaderText>
                        <SignUpPageStyle.UnderBar/>
                        <SignUpPageStyle.Text onClick={() => handleSignIn()}>{text}</SignUpPageStyle.Text>
                    </SignUpPageStyle.Header>
                    <SignUpPageStyle.Input>
                        <SignUpList lists={inputList} handleChangeInput={handleChangeInput} handleClickInput={handleClickInput} handleSend={handleSend}/>
                    </SignUpPageStyle.Input>
                    <SignUpPageStyle.Bottom>
                        <SignUpPageStyle.SendBtn onClick={() => handleThisSignUp()}>SIGN UP</SignUpPageStyle.SendBtn>
                    </SignUpPageStyle.Bottom>
                </SignUpPageStyle.MainContents>
                <SignUpPageStyle.SignUpImg src={signupImg}/>
            </SignUpPageStyle.Contents>
            <SignUpPageStyle.MainHeader>
                <Header auth={auth} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></Header>
            </SignUpPageStyle.MainHeader>
            <SignUpPageStyle.MaineSide menu={menu}>
                <SideBar auth={auth} menu={menu} sidebar={sidebar} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></SideBar>
            </SignUpPageStyle.MaineSide>
        </SignUpPageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        sidebar: state.sidebar.sidebar,
        email: state.signup.email,
        authent: state.signup.authent,
        id: state.signup.id,
        pw: state.signup.pw,
        conpw: state.signup.conpw,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: () => dispatch(setMenu()),
        onChangeMenuOption: (sidebar) => dispatch(setSideBar(sidebar)),
        onChangeSignup: (email, authent, id, pw, conpw) => dispatch(setSignup(email, authent, id, pw, conpw))
    }
}

const SignUpPageConnect = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

export default SignUpPageConnect;