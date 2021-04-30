import { SET_ALARM, SET_ALARMLIST } from '../actions/Alarm';

const alarmIntialState = {
    alarm: false,
    alarmLists: []
}

const alarm = (state=alarmIntialState, action) => {
    switch(action.type) {
        case SET_ALARM:
            return Object.assign({}, state, {
                alarm: action.alarm,
            })
        case SET_ALARMLIST:
            return Object.assign({}, state, {
                alarmLists: action.alarmLists
            }) 
        default:
            return state
    }
}

export default alarm;