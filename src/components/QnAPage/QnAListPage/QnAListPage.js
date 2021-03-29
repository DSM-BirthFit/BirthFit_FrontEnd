import React from "react";
import QnAItemPage from '../QnAItemPage/QnAItemPage';

const QnAPage = ({lists}) => {
    const qnaItemPage = lists.map(
        list => (
            <QnAItemPage id={list.id} title={list.title} answer={list.answer} like={list.like} />
        )
    ) 

    return qnaItemPage;
}

export default QnAPage;