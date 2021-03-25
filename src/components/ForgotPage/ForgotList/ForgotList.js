import React from 'react';
import ForgotItem from '../ForgotItem/ForgotItem';

const ForgotList = ({ lists, handleChangeInput, handleClickInput, handleSend }) => {
    const forgotItem = lists.map(
        list => (
            <ForgotItem 
                id={list.id} 
                name={list.name} 
                btn={list.btn} 
                warning={list.warning} 
                handleChangeInput={handleChangeInput} 
                handleClickInput={handleClickInput}
                handleSend={handleSend}
            />
        )
    )

    return forgotItem
}

export default ForgotList;