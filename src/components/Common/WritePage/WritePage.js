import React, {useState, useEffect} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import * as WritePageStyle from '../../../assets/styles/Common/WritePage/WritePage';

import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile } from '../Controllers/user';
import { handleWriteSubmit } from '../Controllers/write';

import { connect } from 'react-redux';
import { setMenu, setAuth } from '../../../actions/Head';
import { setSideBar } from '../../../actions/Sidebar';
import { setWrite } from '../../../actions/Write';

const WritePage = ({ auth, menu, title, qna, help, writeTitle, writeText, writeLen, headTiitle, url, option, headButton, TitleText, onChangeAuth, onChangeMenuBar, onChangeMenuOption, onChangeWrite}) => {
    let history = useHistory();
    let location = useLocation();
    const { id } = useParams();
    const [user, setUser] = useState(''),
          [thisId, setThisId] = useState(-1);

    useEffect(() => {
        if(localStorage.getItem('userInfo') && auth===false) {
            onChangeAuth(true);
            if(url==='help') {
                handleMenuOption(2, onChangeMenuOption);
            } else if(url==='qna') {
                handleMenuOption(1, onChangeMenuOption);
            }
        } 
        if(!localStorage.getItem('userInfo')) {
            onChangeAuth(false);
            history.push('/');
        }
        if (typeof (location.state) !== 'undefined' && location.state !== null) {
            const { title, contents, len, userId, num } = location.state;
            onChangeWrite(title, contents, len);
            setUser(userId);
            if(num !== -1) {
                setThisId(num);
            }
        }
    }, []);

    const handleWriteTitle = (value) => {
        if(value.length <= 90 ) {
            onChangeWrite(value, writeText, value.length);
        } 
    }

    const handleWriteCancel = () => {
        onChangeWrite('', '', 0);
        if(option === 'none') {
            history.push({
                pathname: `/${url}`
            })
        } else {
            history.push({
                pathname: `/${url}/${id}`
            })
        }
    }

    return (
        <WritePageStyle.Container>
            <WritePageStyle.Contents menu={menu}>
                <WritePageStyle.MainContents>
                    <WritePageStyle.TextContents>
                        <WritePageStyle.Header>{headTiitle}</WritePageStyle.Header>
                        <WritePageStyle.UnderBar></WritePageStyle.UnderBar>
                        <WritePageStyle.CancelBtn menu={menu} onClick={() => handleWriteCancel()}>작성 취소</WritePageStyle.CancelBtn>
                        <WritePageStyle.WritenBtn onClick={() => handleWriteSubmit(writeTitle, writeText, history, url, option, id, onChangeWrite, thisId)}>{headButton}</WritePageStyle.WritenBtn>
                    </WritePageStyle.TextContents>
                    <WritePageStyle.Input>
                        <WritePageStyle.InputTitle>
                            <WritePageStyle.InputTitleText>{TitleText}</WritePageStyle.InputTitleText>
                            { user === '' ?
                                <WritePageStyle.TitleInput menu={menu} onChange={(e) => handleWriteTitle(e.target.value)} value={writeTitle}/>
                            :
                                <WritePageStyle.TitleInput menu={menu} readOnly value={user + "님의 답변"}/>
                            }
                            <WritePageStyle.LimitText>({writeLen} / 90)</WritePageStyle.LimitText>
                        </WritePageStyle.InputTitle>
                        <WritePageStyle.ContentText menu={menu} onChange={(e) => onChangeWrite(writeTitle, e.target.value, writeLen)} value={writeText}/>
                    </WritePageStyle.Input>
                </WritePageStyle.MainContents>
            </WritePageStyle.Contents>
            <WritePageStyle.MainHeader>
                <Header/>
            </WritePageStyle.MainHeader>
            <WritePageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} onChangeMenuBar={onChangeMenuBar} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth} onChangeMenuOption={onChangeMenuOption}></SideBar>
            </WritePageStyle.MainSide>
        </WritePageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
        writeTitle: state.write.title,
        writeText: state.write.text,
        writeLen: state.write.len
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangeWrite: (title, text, len) => dispatch(setWrite(title, text, len))
    }
}

const WritePageConnect = connect(mapStateToProps, mapDispatchToProps)(WritePage);

export default WritePageConnect;