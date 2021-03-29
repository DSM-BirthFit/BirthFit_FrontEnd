import React from "react";
import * as QnAItemStyle from '../../../assets/styles/QnAPage/QnAItemPage';

const QnAPage = ({ id, title, answer, like }) => {
    return (
        <QnAItemStyle.Container key={id}>
            <QnAItemStyle.Tdtag>{title}</QnAItemStyle.Tdtag>
            <QnAItemStyle.Tdtag>{answer}</QnAItemStyle.Tdtag>
            <QnAItemStyle.Tdtag>{like}</QnAItemStyle.Tdtag>
        </QnAItemStyle.Container>
    )
}

export default QnAPage;