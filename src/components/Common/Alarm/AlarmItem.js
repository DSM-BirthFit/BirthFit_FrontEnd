import React from 'react';
import * as AlarmItemStyle from '../../../assets/styles/Common/Alarm/AlarmItem';

const AlarmItem = ({ id, user, image, content, date }) => {
    return (
        <AlarmItemStyle.Container id={id}>
            <AlarmItemStyle.UserImage src={image}/>
            <AlarmItemStyle.UserContent>
                <AlarmItemStyle.UserName>{user}님이 당신의 게시물에</AlarmItemStyle.UserName>
                <AlarmItemStyle.Content>{content}</AlarmItemStyle.Content>
                <AlarmItemStyle.Date>{date}</AlarmItemStyle.Date>
            </AlarmItemStyle.UserContent>
        </AlarmItemStyle.Container>
    )
}

export default AlarmItem;