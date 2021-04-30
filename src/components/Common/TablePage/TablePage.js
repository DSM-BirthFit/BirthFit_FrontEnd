import React, { useEffect } from "react";
import { useHistory } from 'react-router';
import * as TablePageStyle from '../../../assets/styles/Common/TablePage/TablePage'

import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import QnAListPage from './TableListPage/TableListPage';
import Pagination from '../Pagination/Pagination';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, PutRefreshToken } from '../Controllers/user';

import { connect } from 'react-redux';
import { setMenu, setAuth } from '../../../actions/Head';
import { setSideBar } from '../../../actions/Sidebar';
import { setCurrentPage, setMaxPageNumLimit, setMinPageNumLimit, setPageNumLimit, setTotal } from '../../../actions/Post';

const axios = require('axios');

const TablePage = ({ auth, menu, title, qna, help, pageTitle, writeButton, answerType, url, currentPage, pageNumLimit, currentPosts, pageNumbers, maxPageNumLimit, minPageNumLimit, onChangeMenuBar, onChangeMenuOption, onChangeAuth, onChangeTotalPage, onChangeCurrentpage, onChangeMaxPageNumLimit, onChangeMinPageNumLimit, onChangePageNumLimit }) => {
    let history = useHistory();
     
    const pageAxios = (num) => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8000/${url}?page=${num}`, {})
        .then(res => {
            console.log(res);
            onChangePageNumLimit(10);
            onChangeTotalPage(res.data.totalPage);
            onChangeCurrentpage(num+1, res.data.listResponse);
            if(currentPage%pageNumLimit===0) {
                onChangeMaxPageNumLimit(maxPageNumLimit - pageNumLimit);
                onChangeMinPageNumLimit(minPageNumLimit - pageNumLimit);
            }
            if(currentPage+1> maxPageNumLimit) {
                onChangeMaxPageNumLimit(maxPageNumLimit + pageNumLimit);
                onChangeMinPageNumLimit(minPageNumLimit + pageNumLimit);
            }
        })
        .catch(err => {
            PutRefreshToken();
            axios.get(`http://10.156.145.170:8000/${url}?page=${num}`, {})
            .then(res => {
                onChangePageNumLimit(10);
                onChangeTotalPage(res.data.totalPage);
                onChangeCurrentpage(num+1, res.data.listResponse);
                if(currentPage%pageNumLimit===0) {
                    onChangeMaxPageNumLimit(maxPageNumLimit - pageNumLimit);
                    onChangeMinPageNumLimit(minPageNumLimit - pageNumLimit);
                }
                if(currentPage+1> maxPageNumLimit) {
                onChangeMaxPageNumLimit(maxPageNumLimit + pageNumLimit);
                onChangeMinPageNumLimit(minPageNumLimit + pageNumLimit);
            }
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

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

        pageAxios(0);
    }, [])

    useEffect(() => {
        pageAxios(currentPage-1);
    }, [currentPage])

    let num = 0;
    pageNumbers.map(number => {
        if(number < maxPageNumLimit+1 && number > minPageNumLimit){
            num++;
        }
    })

    const handlePrevBtn = () => {
        if(currentPage != pageNumbers[0]) {
            pageAxios(currentPage-2);
        }
    }

    const handleNextBtn = () => {
        if(currentPage != pageNumbers[pageNumbers.length - 1]) {
            pageAxios(currentPage);
        }
    }

    var chr = String.fromCharCode(8230);

    let pageIncrementBtn = null;
    if(pageNumbers.length > maxPageNumLimit) {
        pageIncrementBtn = <TablePageStyle.btnLi onClick={handleNextBtn}>{chr}</TablePageStyle.btnLi>
    }

    let pageDecrementBtn = null;
    if(minPageNumLimit >= 1) {
        pageDecrementBtn = <TablePageStyle.btnLi onClick={handlePrevBtn}>{chr}</TablePageStyle.btnLi>
    }

    const handleWrite = () => {
        history.push({
            pathname: `/${url}/write`
        })
    }

    return (
        <TablePageStyle.Container>
            <TablePageStyle.Contents menu={menu}>
                <TablePageStyle.MainContents>
                    <TablePageStyle.TextContents>
                        <TablePageStyle.Header>{pageTitle}</TablePageStyle.Header>
                        <TablePageStyle.UnderBar></TablePageStyle.UnderBar>
                        <TablePageStyle.WritenBtn menu={menu} onClick={() => handleWrite()}>{writeButton}</TablePageStyle.WritenBtn>
                    </TablePageStyle.TextContents>
                    <TablePageStyle.Input menu={menu}>
                        <TablePageStyle.Trtag>
                            <TablePageStyle.Headertable>제목</TablePageStyle.Headertable>
                            <TablePageStyle.Headertable>{answerType}</TablePageStyle.Headertable>
                            <TablePageStyle.Headertable>좋아요</TablePageStyle.Headertable>
                        </TablePageStyle.Trtag>
                        <QnAListPage lists={currentPosts} url={url}/>
                    </TablePageStyle.Input>
                    <TablePageStyle.PageUl>
                        <TablePageStyle.btnLi onClick={handlePrevBtn}>
                            <TablePageStyle.pageBtn>◁</TablePageStyle.pageBtn>
                        </TablePageStyle.btnLi>
                        {pageDecrementBtn}
                        <Pagination 
                            pageNumbers={pageNumbers} 
                            paginate={pageAxios} 
                            currentPage={currentPage} 
                            maxPageNumLimit={maxPageNumLimit} 
                            minPageNumLimit={minPageNumLimit}
                        />
                        {pageIncrementBtn}
                        <TablePageStyle.btnLi onClick={handleNextBtn}>
                            <TablePageStyle.pageBtn>▷</TablePageStyle.pageBtn>
                        </TablePageStyle.btnLi>
                    </TablePageStyle.PageUl>
                </TablePageStyle.MainContents>
            </TablePageStyle.Contents>
            <TablePageStyle.MainHeader>
                <Header auth={auth} menu={menu} onChangeMenuBar={onChangeMenuBar} handleMenuOption={handleMenuOption} handleSignIn={handleSignIn} handleSignUp={handleSignUp} onChangeAuth={onChangeAuth} handleProfile={handleProfile} onChangeMenuOption={onChangeMenuOption}></Header>
            </TablePageStyle.MainHeader>
            <TablePageStyle.MainSide menu={menu}>
                <SideBar auth={auth} menu={menu} title={title} qna={qna} help={help} handleMenuOption={handleMenuOption} onChangeMenuBar={onChangeMenuBar} handleSignIn={handleSignIn} handleSignUp={handleSignUp} handleProfile={handleProfile} onChangeAuth={onChangeAuth} onChangeMenuOption={onChangeMenuOption}></SideBar>
            </TablePageStyle.MainSide>
        </TablePageStyle.Container>
    )
}

let mapStateToProps = (state) => {
    return {
        auth: state.head.auth,
        menu: state.head.menu,
        title: state.sidebar.title,
        qna: state.sidebar.qna,
        help: state.sidebar.help,
        pageNumbers: state.post.pageNumbers,
        pageNumLimit: state.post.pageNumLimit,
        currentPage: state.post.currentPage,
        currentPosts: state.post.currentPosts,
        maxPageNumLimit: state.post.maxPageNumLimit,
        minPageNumLimit: state.post.minPageNumLimit
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
        onChangePageNumLimit: (pageNumLimit) => dispatch(setPageNumLimit(pageNumLimit)),
        onChangeTotalPage: (totalPage) => dispatch(setTotal(totalPage)),
        onChangeCurrentpage: (currentPage, currentPosts) => dispatch(setCurrentPage(currentPage, currentPosts)),
        onChangeMaxPageNumLimit: (maxPageNumLimit) => dispatch(setMaxPageNumLimit(maxPageNumLimit)),
        onChangeMinPageNumLimit: (minPageNumLimit) => dispatch(setMinPageNumLimit(minPageNumLimit))
    }
}

const TablePageConnect = connect(mapStateToProps, mapDispatchToProps)(TablePage);

export default TablePageConnect;