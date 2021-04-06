import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import * as ViewPageStyle from '../../../assets/styles/Common/ViewPage/ViewPage';
import { BsChatDots } from 'react-icons/bs';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import AnswerList from '../Answer/AnswerList/AnswerList';
import QnAImg from '../../../assets/images/qna.jpg';
import HelpImg from '../../../assets/images/help.jpg';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, PutRefreshToken } from '../Controllers/user';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth, setView, setComment, setLike } from '../../../actions';

const axios = require('axios');

const ViewPage = ({ auth, menu, title, qna, help, url, answer, contents, createdAt, likeCount, isLike, isMine, viewTitle, userId, view, comment, len,  onChangeAuth, onChangeMenuBar, onChangeMenuOption , onChnageView, onChangeCommet, onChangeLike}) => {
    let history = useHistory();
    const { id } = useParams();

    const [height, setHeight] = useState('35px'),
          [display, setDisplay] = useState(false),
          [commentLen, setCommentLen] = useState(0),
          [answerHeight, setAnswerHeight] = useState('18px'),
          [submitAnswer, setSubmitAnswer] = useState([0, {commentId: -1, userId: "", content: "", isMine: false}]),
          [editAnswer, setEditAnswer] = useState([-1, '']),
          [deleteAnswer, setDeleteAnswer] = useState(-1);

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
            if(url !== 'help') {
                setCommentLen(res.data.answer.length);
                onChnageView(res.data.answer, res.data.content, res.data.createdAt, res.data.likeCount, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
            } else {
                setCommentLen(res.data.comment.length);
                onChnageView(res.data.comment, res.data.content, res.data.createdAt, res.data.likeCount, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
            }
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.get(`http://10.156.145.170:8080/${url}/${id}`, {})
            .then(res => {
                onChnageView(res.data.answer, res.data.content, res.data.createdAt, res.data.likeCount, res.data.isLike, res.data.isMine, res.data.title, res.data.userId, res.data.view);
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

    const handleCommentSubmit = () => {
        const local = JSON.parse(localStorage.getItem('userInfo'));

        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.post(`http://10.156.145.170:8080/${url}/comment/${id}`, {
            content: comment
        })
        .then(res => {
            onChangeCommet('', 0);
            setDisplay(false);
            axios.get(`http://10.156.145.170:8080/user/profile`, {})
            .then(res => {
                setSubmitAnswer([1, {commentId: answer.length == 0 ? 0 : answer[answer.length-1].commentId+1, userId: res.data.userId, content: comment, isMine: true}]);
            })
            .catch(err => {console.log(err);})
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.post(`http://10.156.145.170:8080/${url}/comment/${id}`, {
                content: comment
            })
            .then(res => {
                onChangeCommet('', 0);
                setDisplay(false);
                axios.get(`http://10.156.145.170:8080/user/profile`, {})
                .then(res => {
                    setSubmitAnswer([1, {commentId: answer.length == 0 ? 0 : answer[answer.length-1].commentId+1, userId: res.data.userId, content: comment, isMine: true}]);
                })
                .catch(err => {console.log(err);})
            })
            .catch(err => {
                console.log(err);
            }) 
        }) 
    }

    useEffect(() => {
        if(submitAnswer[0] !== 0){
            let array = answer;
            array.push({
                commentId :submitAnswer[1].commentId,
                userId: submitAnswer[1].userId,
                content: submitAnswer[1].content,
                isMine: submitAnswer[1].isMine,
            });
            console.log(array);
            setSubmitAnswer([0, {commentId: -1, userId: "", content: "", isMine: false}]);
            setCommentLen(array.length);
            onChnageView(array, contents, createdAt, likeCount, isLike, isMine, viewTitle, userId, view);
        }
    }, [submitAnswer])

    const handleEditPage = () => {
        history.push({
            pathname: `/${url}/edit/${id}`,
            state: {
                title: viewTitle,
                contents: contents,
                len: viewTitle.length,
                userId: ''
            }
        })
    }

    const handleDeletePost = () => {
        axios.delete(`http://10.156.145.170:8080/${url}/${id}`,{})
        .then(res => {
            console.log(res);
            history.push({
                pathname: `/${url}`
            })
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.delete(`http://10.156.145.170:8080/${url}/${id}`,{})
            .then(res => {
                console.log(res);
                history.push({
                    pathname: `/${url}`
                })
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

    const handleAnswer = (num, answerContents) => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
    
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8080/user/profile`, {})
        .then(res => {
            console.log(res);
            history.push({
                pathname: answerContents==='' ? `/qna/answer/${id}` : `/qna/answer/edit/${id}`,
                state: {
                    title: '',
                    contents: answerContents,
                    len: 0,
                    userId: res.data.userId,
                    num: answerContents==='' ? -1 : num
                }
            })
        })
        .catch(err => {console.log(err);})
    }

    const AnswerySize = () => {
        var sTextarea = document.getElementById("answer_content");
        sTextarea.style.height = "1px";
        sTextarea.style.height = sTextarea.scrollHeight +5 + "px";
        setAnswerHeight(sTextarea.style.height);
    }

    const handleAnswerEditSubmit = (commentId, text, setText, setEdit) => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
    
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.put(`http://10.156.145.170:8080/help/comment/${commentId}`,
        {
            content: text
        })
        .then(res => {
            setText('');
            setEdit(false);
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.put(`http://10.156.145.170:8080/help/comment/${commentId}`,
            {
                content: text
            })
            .then(res => {
                setText('');
                setEdit(false);
            })
            .catch(err => {
                console.log(err);
            })
        })

        setEditAnswer([commentId, text]);
    }

    useEffect(() => {
        if(editAnswer[0] !== -1) {
            let array = answer;
            var num = 0; 
            array.find(function(value) {
                num++;
                return value.commentId === editAnswer[0];
            })

            array.splice(num-1, 1, {commentId :array[num-1].commentId, userId: array[num-1].userId, content: editAnswer[1], isMine: array[num-1].isMine,})
            setEditAnswer([-1, '']);
        }
    }, [editAnswer])

    const handleAnswerDeleteSubmit = (commentId) => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        var middle = url === "help" ? "comment" : "answer";

        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.delete(`http://10.156.145.170:8080/${url}/${middle}/${commentId}`,{})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            PutRefreshToken();
            axios.delete(`http://10.156.145.170:8080/${url}/${middle}/${commentId}`,{})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        })

        setDeleteAnswer(commentId);
    }

    useEffect(() => {
        if(deleteAnswer !== -1){
            let array = answer;
            var cha = array.filter(function(value, index, array) {
                return url==="help" ? value.commentId !== deleteAnswer : value.qnaId != deleteAnswer;
            })
            setDeleteAnswer(-1);
            setCommentLen(cha.length);
            onChnageView(cha, contents, createdAt, likeCount, isLike, isMine, viewTitle, userId, view);
        }
    }, [deleteAnswer])

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
                                <AnswerList lists={commentLen > 0 ? answer : []} height={answerHeight} ySize={AnswerySize} url={url} handleAnswer={handleAnswer} handleAnswerEditSubmit={handleAnswerEditSubmit} handleAnswerDeleteSubmit={handleAnswerDeleteSubmit}/>
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
                                        <AnswerList lists={commentLen > 0 ? answer : []} height={answerHeight} ySize={AnswerySize} url={url} handleAnswer={handleAnswer} handleAnswerEditSubmit={handleAnswerEditSubmit} handleAnswerDeleteSubmit={handleAnswerDeleteSubmit}/>
                                    </ViewPageStyle.List>
                                </ViewPageStyle.CommntPage>
                            </ViewPageStyle.HelpPage>
                        }
                    </ViewPageStyle.Input>
                    <ViewPageStyle.Bottom>
                        { isLike ?
                            <ViewPageStyle.Heart url={url} isMine={isMine} onClick={() => onChangeLike(false)}>
                                <IoIosHeart color="#FF9999" size="45"></IoIosHeart>
                                <ViewPageStyle.HeartCount>{likeCount}</ViewPageStyle.HeartCount>
                            </ViewPageStyle.Heart>
                        :
                            <ViewPageStyle.Heart url={url} isMine={isMine} onClick={() => onChangeLike(true)}>
                                <IoIosHeartEmpty color="#FF9999" size="45"></IoIosHeartEmpty>
                                <ViewPageStyle.HeartCount>{likeCount}</ViewPageStyle.HeartCount>
                            </ViewPageStyle.Heart>

                        }
                        {isMine &&
                            <ViewPageStyle.isMine>
                                <ViewPageStyle.ViewEdit onClick={() => handleEditPage()}>수정하기</ViewPageStyle.ViewEdit>
                                <ViewPageStyle.ViewDelete onClick={() => handleDeletePost()}>삭제하기</ViewPageStyle.ViewDelete>
                            </ViewPageStyle.isMine>
                        }
                        {url !== "help" && !isMine &&
                            <ViewPageStyle.isMine>
                                <ViewPageStyle.AnswerButton onClick={() => handleAnswer(-1, '')}>답변하기</ViewPageStyle.AnswerButton>
                            </ViewPageStyle.isMine>
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
        likeCount: state.view.likeCount,
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
        onChnageView: (answer, contents, createdAt, likeCount, isLike, isMine, title, userId, view) => dispatch(setView(answer, contents, createdAt, likeCount, isLike, isMine, title, userId, view)),
        onChangeCommet: (comment, len) => dispatch(setComment(comment, len)),
        onChangeLike: (like) => dispatch(setLike(like))
    }
}

const ViewPageConnect = connect(mapStateToProps, mapDispatchToProps)(ViewPage);

export default ViewPageConnect;