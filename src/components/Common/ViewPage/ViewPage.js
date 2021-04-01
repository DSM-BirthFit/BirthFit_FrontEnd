import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import * as ViewPageStyle from '../../../assets/styles/Common/ViewPage/ViewPage';
import { BsChatDots } from 'react-icons/bs';

import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, PutRefreshToken } from '../Controllers/user';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth, setView, setComment } from '../../../actions';

const axios = require('axios');

const ViewPage = ({ auth, menu, title, qna, help, url, answer, contents, createdAt, isLike, isMine, viewTitle, userId, view, comment, len,  onChangeAuth, onChangeMenuBar, onChangeMenuOption , onChnageView, onChangeCommet}) => {
    let history = useHistory();
    const { id } = useParams();

    const [height, setHeight] = useState('35px'),
          [display, setDisplay] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('userInfo') && auth===false) {
            onChangeAuth(true);
            if(url==='help') {
                handleMenuOption(2, onChangeMenuOption);
            } else {
                handleMenuOption(1, onChangeMenuOption);
            }
        } 
        if(!localStorage.getItem('userInfo')) {
            onChangeAuth(false);
            history.push('/');
        }
    }, []);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
    
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8080/${url}/${id}`, {})
        .then(res => {
            console.log(res);
            onChnageView(res.data.answer, res.data.content, res.data.createdAt, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view)
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.get(`http://10.156.145.170:8080/${url}/${id}`, {})
            .then(res => {
                console.log(res);
                onChnageView(res.data.answer, res.data.contents, res.data.createdAt, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view)
            })
            .catch(err => {
                console.log(err);
            }) 
        }) 

    }, []);

    const ySize = () => {
        var sTextarea = document.getElementById("text_content");
        sTextarea.style.height = "1px";
        sTextarea.style.height = sTextarea.scrollHeight +5 + "px";
        setHeight(sTextarea.style.height);
    }

    return (
        <ViewPageStyle.Container>
            <ViewPageStyle.Contents menu={menu}>
                <ViewPageStyle.MainContents>
                    <ViewPageStyle.TextContents>
                        <ViewPageStyle.Header>
                            <ViewPageStyle.QType>{url==="qna" && 'Q.' }</ViewPageStyle.QType>
                            <ViewPageStyle.HeaderTitle url={url}>{viewTitle}</ViewPageStyle.HeaderTitle>
                            <ViewPageStyle.TitleContents>{contents}</ViewPageStyle.TitleContents>
                        </ViewPageStyle.Header>
                        <ViewPageStyle.Information>
                            <ViewPageStyle.UserId>{userId}</ViewPageStyle.UserId>
                            <ViewPageStyle.CreateAt>{createdAt}</ViewPageStyle.CreateAt>
                            <ViewPageStyle.Views>조회수 {view}</ViewPageStyle.Views>
                        </ViewPageStyle.Information>
                    </ViewPageStyle.TextContents>
                    <ViewPageStyle.Input>
                        { url !== "help" ?
                            <ViewPageStyle.QnAPage>
                                <ViewPageStyle.QnAHeader>A</ViewPageStyle.QnAHeader>
                                {/*QnA 답변 리스트*/}
                            </ViewPageStyle.QnAPage>
                          :
                            <ViewPageStyle.HelpPage>
                                <ViewPageStyle.HelpHeader>
                                    <BsChatDots color="#394B5A" size="40"></BsChatDots>
                                    <ViewPageStyle.HelpHeaderTitle>1</ViewPageStyle.HelpHeaderTitle>
                                </ViewPageStyle.HelpHeader>
                                <ViewPageStyle.CommntPage>
                                    <ViewPageStyle.CommentInput id="text_content" height={height} onKeyDown={() => ySize()} onKeyUp={() => ySize()} onClick={() => setDisplay(true)} placeholder="댓글 추가..." onChange={(e) => onChangeCommet(e.target.value, e.target.value.length)} value={comment}/>
                                    <ViewPageStyle.CommentBottom display={display}>
                                        <ViewPageStyle.CommnetLength>{len} / 250</ViewPageStyle.CommnetLength>
                                        <ViewPageStyle.CommentBtn>
                                            <ViewPageStyle.CancelComment onClick={() => {setDisplay(false); onChangeCommet('', 0)}}>취소</ViewPageStyle.CancelComment>
                                            <ViewPageStyle.Submitcomment>댓글</ViewPageStyle.Submitcomment>
                                        </ViewPageStyle.CommentBtn>
                                    </ViewPageStyle.CommentBottom>
                                    {/*Help 댓글 리스트*/}
                                </ViewPageStyle.CommntPage>
                            </ViewPageStyle.HelpPage>
                        }
                    </ViewPageStyle.Input>
                </ViewPageStyle.MainContents>
            </ViewPageStyle.Contents>
            <ViewPageStyle.MainHeader>
                <Header auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile} onChangeMenuOption={onChangeMenuOption}/>
            </ViewPageStyle.MainHeader>
            <ViewPageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} onChangeMenuBar={onChangeMenuBar} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth} onChangeMenuOption={onChangeMenuOption}/>
            </ViewPageStyle.MainSide>
        </ViewPageStyle.Container>
    );
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
        answer: state.view.answer,
        contents: state.view.contents,
        createdAt: state.view.createdAt,
        isLike: state.view.isLike,
        isMine: state.view.isMine,
        viewTitle: state.view.title,
        userId: state.view.userId,
        view: state.view.view,
        comment: state.comment.comment,
        len: state.comment.len
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChnageView: (answer, contents, createdAt, isLike, isMine, title, userId, view) => dispatch(setView(answer, contents, createdAt, isLike, isMine, title, userId, view)),
        onChangeCommet: (comment, len) => dispatch(setComment(comment, len))
    }
}

const ViewPageConnect = connect(mapStateToProps, mapDispatchToProps)(ViewPage);

export default ViewPageConnect;