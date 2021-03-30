import React from 'react';
import {useHistory} from 'react-router-dom';
import * as WritePageStyle from '../../../assets/styles/Common/WritePage/WritePage';

import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile } from '../Controllers/user';
import { handleWriteSubmit } from '../Controllers/write';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth, setWrite } from '../../../actions';

const WritePage = ({ auth, menu, title, qna, help, writeTitle, writeText, writeLen, headTiitle, url, headButton, TitleText, onChangeAuth, onChangeMenuBar, onChangeMenuOption, onChangeWrite}) => {
    let history = useHistory();

    const handleWriteTitle = (value) => {
        if(value.length <= 90 ) {
            onChangeWrite(value, writeText, value.length);
        } 
    }

    return (
        <WritePageStyle.Container>
            <WritePageStyle.Contents>
                <WritePageStyle.MainContents>
                    <WritePageStyle.TextContents>
                        <WritePageStyle.Header>{headTiitle}</WritePageStyle.Header>
                        <WritePageStyle.UnderBar></WritePageStyle.UnderBar>
                        <WritePageStyle.CancelBtn menu={menu}>작성 취소</WritePageStyle.CancelBtn>
                        <WritePageStyle.WritenBtn onClick={() => handleWriteSubmit(writeTitle, writeText, history, url, onChangeWrite)}>{headButton}</WritePageStyle.WritenBtn>
                    </WritePageStyle.TextContents>
                    <WritePageStyle.Input>
                        <WritePageStyle.InputTitle>
                            <WritePageStyle.InputTitleText>{TitleText}</WritePageStyle.InputTitleText>
                            <WritePageStyle.TitleInput onChange={(e) => handleWriteTitle(e.target.value)} value={writeTitle}/>
                            <WritePageStyle.LimitText>({writeLen}/90)</WritePageStyle.LimitText>
                        </WritePageStyle.InputTitle>
                        <WritePageStyle.ContentText onChange={(e) => onChangeWrite(writeTitle, e.target.value, writeLen)} value={writeText}/>
                    </WritePageStyle.Input>
                </WritePageStyle.MainContents>
            </WritePageStyle.Contents>
            <WritePageStyle.MainHeader>
                <Header auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile} onChangeMenuOption={onChangeMenuOption}></Header>
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