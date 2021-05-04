import React from 'react';
import ProfileItem from '../ProfileItem/ProfileItem';

const ProfileList = ({ userid, userEmail, lists, handleChangeInput }) => {
    const profileItem = lists.map(
        list => (
            <ProfileItem 
                userid={userid}
                userEmail={userEmail}
                id={list.id} 
                name={list.name} 
                warning={list.warning} 
                handleChangeInput={handleChangeInput}
            />
        )
    )

    return profileItem
}

export default ProfileList;