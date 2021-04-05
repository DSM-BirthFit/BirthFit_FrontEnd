import React from 'react';
import * as AnswerItemStyle from '../../../../assets/styles/Common/Answer/Answer';

const AnswerItem = ({ commentId, content, isMine, userId, height, ySize, url, edit, handleAnswerDeleteSubmit }) => {
    console.log(commentId);
    return (
        <AnswerItemStyle.Container id={commentId}>
            <AnswerItemStyle.Header>
                <AnswerItemStyle.User>{userId}{url!=="help" && '님의 댓글'}</AnswerItemStyle.User>
                {isMine && !edit &&
                    <AnswerItemStyle.Btn>
                        <AnswerItemStyle.Edit>수정하기</AnswerItemStyle.Edit>
                        <AnswerItemStyle.Delete onClick={() => handleAnswerDeleteSubmit(commentId)}>삭제하기</AnswerItemStyle.Delete>
                    </AnswerItemStyle.Btn>
                }
                { isMine && edit &&
                    <AnswerItemStyle.Btn>
                        <AnswerItemStyle.Edit>수정완료</AnswerItemStyle.Edit>
                        <AnswerItemStyle.Delete>작성취소</AnswerItemStyle.Delete>
                    </AnswerItemStyle.Btn>
                }
            </AnswerItemStyle.Header>
            <AnswerItemStyle.UnderBar/>
            { edit ?
                <AnswerItemStyle.Content>{content}</AnswerItemStyle.Content>
                :
                <AnswerItemStyle.Write id="answer_content" height={height} onKeyDown={() => ySize()} onKeyUp={() => ySize()} value={content}/>
            }
        </AnswerItemStyle.Container>
    )
}

export default AnswerItem;