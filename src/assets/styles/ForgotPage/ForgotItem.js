import styled from 'styled-components'

export const Container = styled.div`
    width: 500px;
    height: 80px;
    margin-bottom: 40px;

    @media screen and (max-width: 1305px) {
        width: 35vw;
    }

    @media screen and (max-width: 800px) {
        width: 50vw;  
    }
`;

export const Name = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.warning !== '' ? '#FF9999' : '#394B5A'};
    margin-bottom: 8px;

    @media screen and (max-width: 800px) {
        font-size: 2vw;
    }
`;

export const BtnTrue = styled.div`
    width: 500px;
    display:flex;
    justify-content: center;

    @media screen and (max-width: 1305px) {
        width: 35vw;
    }

    @media screen and (max-width: 800px) {
        width: 50vw;  
    }
`;

export const InputTextTrue = styled.input`
    width: 354px;
    height: 45px;
    padding: 2px 10px;
    outline: none;
    font-size: 15px;
    background: white;
    border: 3px solid #99F8FF;
    float: left;

    @media screen and (max-width: 800px) {
        width: 65vw;
        height: 5vh;
    }
`;

export const InputTextFalse = styled.input`
    width: 474px;
    height: 45px;
    padding: 2px 10px;
    outline: none;
    font-size: 15px;
    background: white;
    border: 3px solid #99F8FF;

    @media screen and (max-width: 1305px) {
        width: 32vw;
    }


    @media screen and (max-width: 800px) {
        width: 47vw;
        height: 5vh;
    }
`;

export const Btn = styled.input`
    width: 100px;
    height: 55px;
    padding: 2px 10px;
    outline: none;
    font-size: 20px;
    font-weight: bold;
    color: white;
    background: #99F8FF;
    border: 3px solid #99F8FF;
    float: right;
    cursor: pointer;

    @media screen and (max-width: 800px) {
        width: 27vw;
        height: 6.4vh;
    }
`;

export const Warning = styled.div`
    font-size: 13px;
    margin-top: 5px;
    color: #FF9999;
`;