import React from 'react';
import * as SignUpItemStyled from '../../../assets/styles/SignUpPage/SignUpItem';

const SignUpItem = ({ id, name, btn, warning, handleChangeInput, handleClickInput, handleSend }) => {
    return (
        <SignUpItemStyled.Container>
            <SignUpItemStyled.Name warning={warning}>{name}</SignUpItemStyled.Name>
            { btn ?
                <SignUpItemStyled.BtnTrue>
                    <SignUpItemStyled.InputTextTrue onChange={(e) => handleChangeInput(e.target.value, id)} onClick={(e) => handleClickInput(e.target.value, id)}/>
                    <SignUpItemStyled.Btn type="button" value={id==2 ? "check" :"send"} onClick={() => handleSend(id)}/>
                </SignUpItemStyled.BtnTrue>
            :
                <SignUpItemStyled.InputTextFalse type={(id===3||id===4) && "password"} onChange={(e) => handleChangeInput(e.target.value, id)} onClick={(e) => handleClickInput(e.target.value, id)}/>
            }
            <SignUpItemStyled.Warning>{warning}</SignUpItemStyled.Warning>
        </SignUpItemStyled.Container>
    )
}

export default SignUpItem;