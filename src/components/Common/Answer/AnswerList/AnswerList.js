import React from 'react';
import AnswerItem from '../AnswerItem/AnswerItem';

const AnswerList = ({url, height, ySize, lists, edit, handleAnswerDeleteSubmit }) => {
    const answerItem = lists.map(
        list => (
            <AnswerItem commentId={url === "help" ? list.commentId : list.qnaId } content={list.content} isMine={list.isMine} userId={list.userId} height={height} ySize={ySize} url={url} edit={edit} handleAnswerDeleteSubmit={handleAnswerDeleteSubmit}/>
        )
    )
    return answerItem
}

export default AnswerList;