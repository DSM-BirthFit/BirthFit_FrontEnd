export const SET_ALARM ='SET_ALARM';
export const SET_ALARMLIST='SET_ALARMLIST';

export const setAlarm = (alarm) => {
    return {
        type: SET_ALARM,
        alarm
    }
}

export const setAlarmList = (alarmLists) => {
    return {
        type: SET_ALARMLIST,
        alarmLists
    }
}