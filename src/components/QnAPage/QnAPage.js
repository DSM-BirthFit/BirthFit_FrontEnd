import React, {useState, useEffect} from "react";
import { useHistory, useLocation } from 'react-router';
import * as QnAPageStyle from '../../assets/styles/QnAPage/QnAPage'

import Header from '../Common/Header/Header';
import SideBar from '../Common/SideBar/SideBar';
import QnAListPage from './QnAListPage/QnAListPage';
import Pagination from '../Common/Pagination/Pagination';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth } from '../../actions';

const axios = require('axios');

const QnAPage = ({ auth, menu, title, qna, help, onChangeMenuBar, onChangeMenuOption, onChangeAuth }) => {
    let history = useHistory();
     
    const [posts, setPosts] = useState([
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
        {   
            id: 1,
            title: 'qna title 135 in',
            answer: 5,
            like: 10            
        },
    ]),
          [currentPage, setCurrentPage] = useState(1),
          [postsPerPage, setPostsPerPage] = useState(10),
          [pageNumLimit, setPageNumLimit] = useState(10),
          [maxPageNumLimit, setMaxPageNumLimit] = useState(10),
          [minPageNumLimit, setMinPageNumLimit] = useState(0);

    useEffect(() => {
        if(localStorage.getItem('userInfo') && auth===false) {
            onChangeAuth(true);
        } 
        if(!localStorage.getItem('userInfo')) {
            onChangeAuth(false);
            history.push('/');
        }
    }, [])

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

    const handleProfile = () => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8080/user/profile`, {})
        .then(res => {
            console.log(res);
            handleMenuOption(0);
            onChangeMenuBar(false);
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

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const currentPosts = (tmp) => {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    const handlePrevBtn = () => {
        if(currentPage != pageNumbers[0]) {
            setCurrentPage(currentPage - 1);
    
            if((currentPage - 1)%pageNumLimit==0) {
                setMaxPageNumLimit(maxPageNumLimit - pageNumLimit);
                setMinPageNumLimit(minPageNumLimit - pageNumLimit);
            }
        }
    }

    const handleNextBtn = () => {
        if(currentPage != pageNumbers[pageNumbers.length - 1]) {
            setCurrentPage(currentPage + 1);
    
            if(currentPage+1> maxPageNumLimit) {
                setMaxPageNumLimit(maxPageNumLimit + pageNumLimit);
                setMinPageNumLimit(minPageNumLimit + pageNumLimit);
            }
        }
    }

    var chr = String.fromCharCode(8230);

    let pageIncrementBtn = null;
    if(pageNumbers.length > maxPageNumLimit) {
        pageIncrementBtn = <QnAPageStyle.btnLi onClick={handleNextBtn}>{chr}</QnAPageStyle.btnLi>
    }

    let pageDecrementBtn = null;
    if(minPageNumLimit >= 1) {
        pageDecrementBtn = <QnAPageStyle.btnLi onClick={handlePrevBtn}>{chr}</QnAPageStyle.btnLi>
    }

    return (
        <QnAPageStyle.Container>
            <QnAPageStyle.Contents menu={menu}>
                <QnAPageStyle.MainContents>
                    <QnAPageStyle.TextContents>
                        <QnAPageStyle.Header>QnA</QnAPageStyle.Header>
                        <QnAPageStyle.UnderBar></QnAPageStyle.UnderBar>
                        <QnAPageStyle.WritenBtn menu={menu}>질문하기</QnAPageStyle.WritenBtn>
                    </QnAPageStyle.TextContents>
                    <QnAPageStyle.Input menu={menu}>
                        <QnAPageStyle.Trtag>
                            <QnAPageStyle.Headertable>제목</QnAPageStyle.Headertable>
                            <QnAPageStyle.Headertable>답변</QnAPageStyle.Headertable>
                            <QnAPageStyle.Headertable>좋아요</QnAPageStyle.Headertable>
                        </QnAPageStyle.Trtag>
                        <QnAListPage lists={currentPosts(posts)}/>
                    </QnAPageStyle.Input>
                    <QnAPageStyle.PageUl>
                        <QnAPageStyle.btnLi onClick={handlePrevBtn}>
                            <QnAPageStyle.pageBtn>◁</QnAPageStyle.pageBtn>
                        </QnAPageStyle.btnLi>
                        {pageDecrementBtn}
                        <Pagination pageNumbers={pageNumbers} paginate={setCurrentPage} currentPage={currentPage} maxPageNumLimit={maxPageNumLimit} minPageNumLimit={minPageNumLimit}></Pagination>
                        {pageIncrementBtn}
                        <QnAPageStyle.btnLi onClick={handleNextBtn}>
                            <QnAPageStyle.pageBtn>▷</QnAPageStyle.pageBtn>
                        </QnAPageStyle.btnLi>
                    </QnAPageStyle.PageUl>
                </QnAPageStyle.MainContents>
            </QnAPageStyle.Contents>
            <QnAPageStyle.MainHeader>
                <Header auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile}></Header>
            </QnAPageStyle.MainHeader>
            <QnAPageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} onChangeMenuBar={onChangeMenuBar} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth}></SideBar>
            </QnAPageStyle.MainSide>
        </QnAPageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
    }
}

const QnAPageConnect = connect(mapStateToProps, mapDispatchToProps)(QnAPage);

export default QnAPageConnect;