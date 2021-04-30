import styled from 'styled-components';

export const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: row;
    font-weight: normal;
    align-items: center;
    padding: 20px;
    cursor: pointer;

    &:hover {
        background: #3D596F;
    }
`;


export const UserImage = styled.img`
    border-radius: 150px;
    width: 45px;
    height: 45px;
    margin-right: 20px;
`;

export const UserContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
    width: 240px;
`;

export const UserName = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const Content = styled.div`
    font-size: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const Date = styled.div`
    font-size: 13px;    
`;