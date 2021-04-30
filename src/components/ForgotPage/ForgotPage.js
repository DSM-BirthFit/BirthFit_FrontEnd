import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import * as ForgotPageStyle from '../../assets/styles/ForgotPage/ForgotPage';
import forgotImg from '../../assets/images/forgot.jpg';

import ForgotList from './ForgotList/ForgotList';
import Header  from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';

import { connect } from 'react-redux';
import { setMenu } from '../../actions/Head';
import { setSideBar } from '../../actions/Sidebar';
import { setForgot } from '../../actions/User';

const axios = require('axios');

const ForgotPage = ({ auth, menu, title, qna, help, email, authent, pw, conpw, onChangeMenuBar, onChangeMenuOption, onChangeForgot }) => {
    let history = useHistory();

    const text = 'Enter your email address below and we\'ll send you a link to reset your password.'

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
            name: 'Password',
            btn: false,
            warning: '',
        },
        { 
            id: 3,
            name: 'Confirm Password',
            btn: false,
            warning: '',
        },
    ]),
          [inputClick, setInputClick] = useState({value:'', id:-1}),
          [inputChange, setInputChange] = useState({value:'', id:-1});

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
        onChangeMenuBar(false);
        history.push({
            pathname: '/signin'
        })
    }

    const handleSignUp = () => {
        onChangeMenuBar(false);
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
                    onChangeForgot(inputChange.value, authent, pw, conpw);
                    break;
                case 1:
                    onChangeForgot(email, inputChange.value, pw, conpw);
                    break;
                case 2:
                    onChangeForgot(email, authent, inputChange.value, conpw);
                    break;
                case 3:
                    onChangeForgot(email, authent, pw, inputChange.value);
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

            if(num === 3 && pw !== inputChange.value) {
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
    
    const handleThisForgot = () => {
        let checkWarn = false;

        for(let i=0;i<4;i++) {
            if(inputList[i].warning !== '') {
                checkWarn = true;
                break;
            }
        }

        if(!checkWarn && email !== '' && authent !== '' && pw !== '' && conpw !== '') {
            axios.put(`http://10.156.145.170:8000/user/password`, {
                email: email,
                password: pw
            })
            .then(res => {
                console.log(res);
                onChangeMenuBar(false);
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
            axios.post(`http://10.156.145.170:8000/email/password?email=${email}`, {
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
            axios.put(`http://10.156.145.170:8000/email/verify`, {
                email: email,
                code: authent
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                setInputChange({value: authent, id: 1});
            })
        }
    }

    return (
        <ForgotPageStyle.Container>
            <ForgotPageStyle.Contents menu={menu}>
                <ForgotPageStyle.MainContents>
                    <ForgotPageStyle.Header>
                        <ForgotPageStyle.HeaderText>FORGOT YOUR PASSWORD?</ForgotPageStyle.HeaderText>
                        <ForgotPageStyle.UnderBar/>
                        <ForgotPageStyle.Text>{text}</ForgotPageStyle.Text>
                    </ForgotPageStyle.Header>
                    <ForgotPageStyle.Input>
                        <ForgotList lists={inputList} handleChangeInput={handleChangeInput} handleClickInput={handleClickInput} handleSend={handleSend}/>
                    </ForgotPageStyle.Input>
                    <ForgotPageStyle.Bottom>
                        <ForgotPageStyle.SendBtn onClick={() => handleThisForgot()}>RESET PASSWORD</ForgotPageStyle.SendBtn>
                    </ForgotPageStyle.Bottom>
                </ForgotPageStyle.MainContents>
                <ForgotPageStyle.ForgotImg src={forgotImg}/>
            </ForgotPageStyle.Contents>
            <ForgotPageStyle.MainHeader>
                <Header auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></Header>
            </ForgotPageStyle.MainHeader>
            <ForgotPageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></SideBar>
            </ForgotPageStyle.MainSide>
        </ForgotPageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
        email: state.forgot.email,
        authent: state.forgot.authent,
        pw: state.forgot.pw,
        conpw: state.forgot.conpw,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeForgot: (email, authent, pw, conpw) => dispatch(setForgot(email, authent, pw, conpw))
    }
}

const ForgotPageConnect = connect(mapStateToProps, mapDispatchToProps)(ForgotPage);

export default ForgotPageConnect;