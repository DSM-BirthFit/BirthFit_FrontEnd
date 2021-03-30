import React from 'react';
import HelpPage from './../components/Common/TablePage/TablePage';

function Help(){
    return(
        <HelpPage pageTitle={"Help"} writeButton={"글 쓰기"} answerType={"댓글"} url="help"/>
    )
}

export default Help;