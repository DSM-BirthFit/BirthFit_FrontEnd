import React from "react";
import QnAItemPage from '../QnAItemPage/QnAItemPage';

const QnAPage = ({lists}) => {
    const qnaItemPage = lists.map(
        list => (
            <QnAItemPage/>
        )
    ) 

    return qnaItemPage;
}

export default QnAPage;