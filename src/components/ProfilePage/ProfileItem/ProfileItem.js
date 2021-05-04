import React from 'react';
import * as ProfileItemStyled from '../../../assets/styles/ProfilePage/ProfileItem';

const ProfileItem = ({ userid, userEmail, id, name, warning, handleChangeInput }) => {
    return (
        <ProfileItemStyled.Container id={id}>
            { id!==3 &&
                <ProfileItemStyled.Name warning={warning[0]==='h' ? true : false}>{name}</ProfileItemStyled.Name>
            }
            { id === 2 || id === 3 ?
                <ProfileItemStyled.NameInput type="password" placeholder={name} onChange={(e) => handleChangeInput(e.target.value, id)}></ProfileItemStyled.NameInput>
                :
                id !== 1 ?
                    <ProfileItemStyled.NameInput onChange={(e) => handleChangeInput(e.target.value, id)} placeholder={userid}></ProfileItemStyled.NameInput>
                    :
                    <ProfileItemStyled.NameInput readOnly value={userEmail}></ProfileItemStyled.NameInput>
            }
            <ProfileItemStyled.Warning id={id}>{warning}</ProfileItemStyled.Warning>
        </ProfileItemStyled.Container>
    )
}

export default ProfileItem;