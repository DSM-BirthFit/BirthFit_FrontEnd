import React from 'react';
import AnswerItem from '../AnswerItem/AnswerItem';

const AnswerList = ({url, lists}) => {
    const answerItem = lists.map(
        list => (
            <AnswerItem commentId={list.commentId} content={list.content} isMine={list.isMine} userId={list.userId} url={url}/>
        )
    )
    return answerItem
}

export default AnswerList;