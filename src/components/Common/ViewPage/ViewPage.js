import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import * as ViewPageStyle from '../../../assets/styles/Common/ViewPage/ViewPage';
import { BsChatDots } from 'react-icons/bs';

import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import AnswerList from '../Answer/AnswerList/AnswerList';
import QnAImg from '../../../assets/images/qna.jpg';
import HelpImg from '../../../assets/images/help.jpg';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, PutRefreshToken } from '../Controllers/user';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth, setView, setComment } from '../../../actions';

const axios = require('axios');

const ViewPage = ({ auth, menu, title, qna, help, url, answer, contents, createdAt, isLike, isMine, viewTitle, userId, view, comment, len,  onChangeAuth, onChangeMenuBar, onChangeMenuOption , onChnageView, onChangeCommet}) => {
    let history = useHistory();
    const { id } = useParams();

    const [getAnswer, setGetAnswer] = useState(false),
          [height, setHeight] = useState('35px'),
          [display, setDisplay] = useState(false),
          [commentLen, setCommentLen] = useState(0);

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
        console.log("getAnswer change");
        const local = JSON.parse(localStorage.getItem('userInfo'));
    
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8080/${url}/${id}`, {})
        .then(res => {
            if(url !== 'help') {
                setCommentLen(res.data.answer.length);
                onChnageView(res.data.answer, res.data.content, res.data.createdAt, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
            } else {
                setCommentLen(res.data.comment.length);
                onChnageView(res.data.comment, res.data.content, res.data.createdAt, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
            }
            setGetAnswer(false);
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.get(`http://10.156.145.170:8080/${url}/${id}`, {})
            .then(res => {
                onChnageView(res.data.answer, res.data.content, res.data.createdAt, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
                setGetAnswer(false);
            })
            .catch(err => {
                console.log(err);
            }) 
        }) 

    }, [getAnswer]);

    const ySize = () => {
        var sTextarea = document.getElementById("text_content");
        sTextarea.style.height = "1px";
        sTextarea.style.height = sTextarea.scrollHeight +5 + "px";
        setHeight(sTextarea.style.height);
    }

    const handleCommentSubmit = () => {
        const local = JSON.parse(localStorage.getItem('userInfo'));

        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.post(`http://10.156.145.170:8080/${url}/comment/${id}`, {
            content: comment
        })
        .then(res => {
            setGetAnswer(true);
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.post(`http://10.156.145.170:8080/${url}/comment/${id}`, {
                content: comment
            })
            .then(res => {
                setGetAnswer(true);
            })
            .catch(err => {
                console.log(err);
            }) 
        }) 
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
                                <AnswerList lists={commentLen>0 ? answer : []} url={url}/>
                            </ViewPageStyle.QnAPage>
                          :
                            <ViewPageStyle.HelpPage>
                                <ViewPageStyle.HelpHeader>
                                    <BsChatDots color="#394B5A" size="40"></BsChatDots>
                                    <ViewPageStyle.HelpHeaderTitle>{commentLen}</ViewPageStyle.HelpHeaderTitle>
                                </ViewPageStyle.HelpHeader>
                                <ViewPageStyle.CommntPage>
                                    <ViewPageStyle.CommentInput id="text_content" height={height} display={display} onKeyDown={() => ySize()} onKeyUp={() => ySize()} onClick={() => setDisplay(true)} placeholder="댓글 추가..." onChange={(e) => {e.target.value.length <= 250 && onChangeCommet(e.target.value, e.target.value.length)}} value={comment}/>
                                    <ViewPageStyle.CommentBottom display={display}>
                                        <ViewPageStyle.CommnetLength>{len} / 250</ViewPageStyle.CommnetLength>
                                        <ViewPageStyle.CommentBtn>
                                            <ViewPageStyle.CancelComment onClick={() => {setDisplay(false); onChangeCommet('', 0)}}>취소</ViewPageStyle.CancelComment>
                                            <ViewPageStyle.Submitcomment onClick={() => handleCommentSubmit()}>댓글</ViewPageStyle.Submitcomment>
                                        </ViewPageStyle.CommentBtn>
                                    </ViewPageStyle.CommentBottom>
                                    <ViewPageStyle.List display={display}>
                                        <AnswerList lists={commentLen > 0 ? answer : []} url={url}/>
                                    </ViewPageStyle.List>
                                </ViewPageStyle.CommntPage>
                            </ViewPageStyle.HelpPage>
                        }
                    </ViewPageStyle.Input>
                    <ViewPageStyle.Bottom>
                        {url !== "help" ?
                            <ViewPageStyle.QnABottom>
                                {isMine ?
                                    <div>
                                        {/*수정하기 삭제하기*/}
                                    </div>
                                :
                                    <div>
                                        {/*답변하기*/}
                                    </div>
                                }
                                <div>
                                    {/*좋아요*/}
                                </div>
                            </ViewPageStyle.QnABottom>
                        :
                            <ViewPageStyle.HelpBottom>
                                {isMine &&
                                    <div>
                                        {/*수정하기 삭제하기*/}
                                    </div>
                                }
                                <div>
                                    {/*좋아요*/}
                                </div>
                            </ViewPageStyle.HelpBottom>
                        }
                    </ViewPageStyle.Bottom>
                </ViewPageStyle.MainContents>
            </ViewPageStyle.Contents>
            {url !== "help" ?
                <ViewPageStyle.QnAImage src={QnAImg}/>
            :
                <ViewPageStyle.HelpImage src={HelpImg}/>
            }
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