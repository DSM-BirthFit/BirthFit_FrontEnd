import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router';
import * as TablePageStyle from '../../../assets/styles/Common/TablePage/TablePage'

import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import QnAListPage from './TableListPage/TableListPage';
import Pagination from '../Pagination/Pagination';
import { handleMenuOption, handleSignIn, handleSignUp, handleProfile, PutRefreshToken } from '../Controllers/user';

import { connect } from 'react-redux';
import { setMenu, setSideBar, setAuth } from '../../../actions';

const axios = require('axios');

const TablePage = ({ auth, menu, title, qna, help, pageTitle, writeButton, answerType, url, onChangeMenuBar, onChangeMenuOption, onChangeAuth }) => {
    let history = useHistory();
     
    const [posts, setPosts] = useState([]),
          [currentPage, setCurrentPage] = useState(1),
          [pageNumLimit, setPageNumLimit] = useState(10),
          [maxPageNumLimit, setMaxPageNumLimit] = useState(10),
          [minPageNumLimit, setMinPageNumLimit] = useState(0),
          [totalPage, setTotalPage] = useState(0),
          [totalElement, setTotalElement] = useState(0);

    const pageAxios = (num) => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        
        axios.defaults.headers.common['Authorization'] = `${local.tokenType} ${local.accessToken}`;

        axios.get(`http://10.156.145.170:8000/${url}?page=${num}`, {})
        .then(res => {
            setPosts(res.data.listResponse);
            setTotalElement(res.data.totalElement);
            setTotalPage(res.data.totalPage);
        })
        .catch(err => {
            PutRefreshToken();
            axios.get(`http://10.156.145.170:8000/${url}?page=${num}`, {})
            .then(res => {
                console.log(res);
                setPosts(res.data.listResponse);
                setTotalElement(res.data.totalElement);
                setTotalPage(res.data.totalPage);
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

    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
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
                        <QnAListPage lists={posts} url={url}/>
                    </TablePageStyle.Input>
                    <TablePageStyle.PageUl>
                        <TablePageStyle.btnLi onClick={handlePrevBtn}>
                            <TablePageStyle.pageBtn>◁</TablePageStyle.pageBtn>
                        </TablePageStyle.btnLi>
                        {pageDecrementBtn}
                        <Pagination pageNumbers={pageNumbers} paginate={setCurrentPage} currentPage={currentPage} maxPageNumLimit={maxPageNumLimit} minPageNumLimit={minPageNumLimit}></Pagination>
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
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangeMenuBar: (menu) => dispatch(setMenu(menu)),
        onChangeMenuOption: (title, qna, help) => dispatch(setSideBar(title, qna, help)),
        onChangeAuth: (auth) => dispatch(setAuth(auth)),
    }
}

const TablePageConnect = connect(mapStateToProps, mapDispatchToProps)(TablePage);

export default TablePageConnect;