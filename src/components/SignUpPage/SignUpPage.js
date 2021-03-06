import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import * as SignUpPageStyle from '../../assets/styles/SignUpPage/SignUpPage';
import signupImg from '../../assets/images/signup.jpg';

import SignUpList from './SignUpList/SignUpList';
import Header  from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';

import { connect } from 'react-redux';
import { setMenu } from '../../actions/Head';
import { setSideBar } from '../../actions/Sidebar';
import { setSignup } from '../../actions/User';

const axios = require('axios');

const SignUpPage = ({ auth, menu, title, qna, help, email, authent, id, pw, conpw, onChangeMenuBar, onChangeMenuOption, onChangeSignup }) => {
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
                btn: true,
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
            axios.post(`http://13.124.184.19:8000/user/join`, {
                email: email,
                userId: id,
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
            axios.post(`http://13.124.184.19:8000/email/send?email=${email}`, {
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
            axios.put(`http://13.124.184.19:8000/email/verify`, {
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
        } else if(num === 2) {
            axios.get(`http://13.124.184.19:8000/user/userId?userId=${id}`, {})
            .then( res => {
                console.log(res);
                if(res.data)
                    inputList.splice(2, 1, {id: 2, name: inputList[2].name, btn: inputList[2].btn, warning: 'This id is exist'});
            })
            .catch( err => {
                console.log(err);
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
                <Header/>
            </SignUpPageStyle.MainHeader>
            <SignUpPageStyle.MaineSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help}  onChangeMenuBar={onChangeMenuBar} onChangeMenuOption={onChangeMenuOption} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp}></SideBar>
            </SignUpPageStyle.MaineSide>
        </SignUpPageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
        email: state.user.email,
        authent: state.user.authent,
        id: state.user.id,
        pw: state.user.pw,
        conpw: state.user.conpw,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeSignup: (email, authent, id, pw, conpw) => dispatch(setSignup(email, authent, id, pw, conpw))
    }
}

const SignUpPageConnect = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

export default SignUpPageConnect;