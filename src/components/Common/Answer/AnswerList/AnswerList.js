import React from 'react';
import AnswerItem from '../AnswerItem/AnswerItem';

const AnswerList = ({url, height, ySize, lists, handleAnswer, handleAnswerEditSubmit, handleAnswerDeleteSubmit }) => {
    const answerItem = lists.map(
        list => (
            <AnswerItem commentId={url === "help" ? list.commentId : list.qnaId } userImg={list.userImage} content={url === "help" ? list.comment : list.answer} isMine={list.isMine} userId={list.userId} height={height} ySize={ySize} url={url} handleAnswer={handleAnswer} handleAnswerEditSubmit={handleAnswerEditSubmit} handleAnswerDeleteSubmit={handleAnswerDeleteSubmit}/>
        )
    )
    return answerItem
}

export default AnswerList;