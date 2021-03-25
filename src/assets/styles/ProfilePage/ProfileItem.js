import styled, {css} from 'styled-components'

export const Container = styled.div`
    width: 500px;
    height: 80px;
    margin-bottom: ${props => props.id === 0 ? '60px' : '40px'};

    @media screen and (max-width: 1305px) {
        width: 35vw;
    }

    @media screen and (max-width: 800px) {
        width: 50vw;  
        margin-bottom: ${props => props.id === 2 && '10px'};
    }
`;

export const Name = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.warning ? '#FF9999' : '#394B5A' };
    
    margin-bottom: 8px;

    @media screen and (max-width: 800px) {
        font-size: 3vw;
    }
`;


export const NameInput = styled.input`
    width: 474px;
    height: 45px;
    padding: 2px 10px;
    outline: none;
    font-size: 15px;
    background: white;
    border: 3px solid #394B5A;
    border-radius: 5px;

    @media screen and (max-width: 1305px) {
        width: 32vw;
    }

    @media screen and (max-width: 800px) {
        width: 47vw;
        height: 5vh;
    }
`;


export const Warning = styled.div`
    font-size: 13px;
    margin-top: 5px;
    width: 250px;
    color: ${props => (props.id === 0 || props.id === 1) ? '#394B5A' : '#FF9999'};
    display: ${props => (props.id === 2) && 'none'};

`;