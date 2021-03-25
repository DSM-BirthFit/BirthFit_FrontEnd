import React from 'react';
import * as ForgotItemStyled from '../../../assets/styles/ForgotPage/ForgotItem';

const ForgotItem = ({ id, name, btn, warning, handleChangeInput, handleClickInput, handleSend }) => {
    return (
        <ForgotItemStyled.Container>
            <ForgotItemStyled.Name warning={warning}>{name}</ForgotItemStyled.Name>
            { btn ?
                <ForgotItemStyled.BtnTrue>
                    <ForgotItemStyled.InputTextTrue onChange={(e) => handleChangeInput(e.target.value, id)} onClick={(e) => handleClickInput(e.target.value, id)}/>
                    <ForgotItemStyled.Btn type="button" value="send" onClick={() => handleSend(id)}/>
                </ForgotItemStyled.BtnTrue>     
            :
                <ForgotItemStyled.InputTextFalse type={(id===2||id===3) && "password"} onChange={(e) => handleChangeInput(e.target.value, id)} onClick={(e) => handleClickInput(e.target.value, id)}/>
            }
            <ForgotItemStyled.Warning>{warning}</ForgotItemStyled.Warning>
        </ForgotItemStyled.Container>
    )
}

export default ForgotItem;