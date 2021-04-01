import React, {useState, useEffect} from 'react';
import * as AnswerItemStyle from '../../../../assets/styles/Common/Answer/Answer';

const AnswerItem = ({ commentId, content, isMine, userId, url }) => {
    return (
        <AnswerItemStyle.Container id={commentId}>
            <AnswerItemStyle.Header>
                <AnswerItemStyle.User>{userId}{url!=="help" && '님의 댓글'}</AnswerItemStyle.User>
                {isMine &&
                    <AnswerItemStyle.Btn>
                        <AnswerItemStyle.Edit>수정하기</AnswerItemStyle.Edit>
                        <AnswerItemStyle.Delete>삭제하기</AnswerItemStyle.Delete>
                    </AnswerItemStyle.Btn>
                }
            </AnswerItemStyle.Header>
            <AnswerItemStyle.UnderBar/>
            <AnswerItemStyle.Content>{content}</AnswerItemStyle.Content>
        </AnswerItemStyle.Container>
    )
}

export default AnswerItem;