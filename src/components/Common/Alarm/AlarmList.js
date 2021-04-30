import React from 'react';
import AlarmItem from './AlarmItem';

const AlarmList = ({lists}) => {
    const alarmItem = lists.map(
        list => (
            <AlarmItem
                id={list.alarm_id}
                user={list.user_name}
                image={list.image}
                content={list.content}
                date={list.date}
            />
        )
    )

    return alarmItem;
}

export default AlarmList;