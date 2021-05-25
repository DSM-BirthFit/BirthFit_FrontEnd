import React, {useState} from 'react';
import * as AnswerItemStyle from '../../../../assets/styles/Common/Answer/Answer';

const AnswerItem = ({ commentId, userImg, content, isMine, userId, height, ySize, url, handleAnswer, handleAnswerEditSubmit, handleAnswerDeleteSubmit }) => {
    const [edit, setEdit] = useState(false),
          [text, setText] = useState(content);

    return (
        <AnswerItemStyle.Container id={commentId}>
            <AnswerItemStyle.Header>
                <AnswerItemStyle.UserInfo>
                    <AnswerItemStyle.userImage src={userImg}></AnswerItemStyle.userImage>
                    <AnswerItemStyle.User>{userId}{url!=="help" && '님의 댓글'}</AnswerItemStyle.User>
                </AnswerItemStyle.UserInfo>
                {isMine && !edit &&
                    <AnswerItemStyle.Btn>
                        <AnswerItemStyle.Edit onClick={() => url !== "help" ? handleAnswer(commentId, content) : setEdit(!edit)}>수정</AnswerItemStyle.Edit>
                        <AnswerItemStyle.Delete onClick={() => handleAnswerDeleteSubmit(commentId)}>삭제</AnswerItemStyle.Delete>
                    </AnswerItemStyle.Btn>
                }
                { isMine && edit &&
                    <AnswerItemStyle.Btn>
                        <AnswerItemStyle.Edit onClick={() => handleAnswerEditSubmit(commentId, text, setText, setEdit)}>완료</AnswerItemStyle.Edit>
                        <AnswerItemStyle.Delete onClick={() => {setEdit(!edit);setText(content)}}>취소</AnswerItemStyle.Delete>
                    </AnswerItemStyle.Btn>
                }
            </AnswerItemStyle.Header>
            <AnswerItemStyle.UnderBar/>
            { !edit ?
                <AnswerItemStyle.Content>{content}</AnswerItemStyle.Content>
                :
                <AnswerItemStyle.Write id="answer_content" height={height} onKeyDown={() => ySize()} onKeyUp={() => ySize()} onChange={(e) => setText(e.target.value)} value={text}/>
            }
        </AnswerItemStyle.Container>
    )
}

export default AnswerItem;