import React from 'react';
import ProfileItem from '../ProfileItem/ProfileItem';

const ProfileList = ({ user, lists, handleChangeInput }) => {
    const profileItem = lists.map(
        list => (
            <ProfileItem 
                user={user}
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