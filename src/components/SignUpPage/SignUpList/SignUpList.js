import React from 'react';
import SignUpItem from '../SignUpItem/SignUpItem';

const SignUpList = ({ lists, handleChangeInput, handleClickInput, handleSend }) => {
    const signupItem = lists.map(
        list => (
            <SignUpItem 
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

    return signupItem
}

export default SignUpList;