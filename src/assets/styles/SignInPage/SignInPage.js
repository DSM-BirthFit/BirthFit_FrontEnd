import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    overflow: hidden;
`;

export const Contents = styled.div`
    width: 100wv;
    position: absolute;
    z-index: ${props => props.menu ? 0 : 5};
    top: 15%;
    left: ${props => props.menu ? 35 : 30}%;

    @media screen and (mix-width: 701px), screen and (max-width: 875px) {
        left: 60%;
        transform: translateX(-60%);
    }

    @media screen and (max-width: 700px) {
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const MainContents = styled.div`
    width: 500px;
    height: 480px;
    padding: 50px 70px;
    background: rgba(153, 248, 255, 0.4);
    position: relative;
    z-index: 1;

    @media screen and (max-width: 1428px) {
        width: 40vw;
    }
`;

export const Header = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #394B5A;
`;

export const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    font-size: 45px;
    font-weight: bold;

    @media screen and (max-width: 800px) {
        font-size: 6vw;
    }
`;

export const UnderBar = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    width: 170px;
    height: 7px;
    background: #99F8FF;

    @media screen and (max-width: 800px) {
        width: 22vw;
    }
`;

export const Text = styled.div`
    width: 500px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    margin-top: 30px;

    @media screen and (max-width: 900px) {
        font-size: 3vw;
    }
`;

export const SignUp = styled.span`
    margin-left: 10px;
    text-decoration: underline;
    cursor: pointer;
`;

export const Input = styled.div`
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
`;

export const ID = styled.div`
    width: 500px;
    height: 80px;
    margin-bottom: 40px;

    @media screen and (max-width: 900px) {
        width: 40vw;  
        margin-left: -10vw;      
    }
`;

export const IDText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.idClick ? '#FF9999' :'#394B5A'};
    margin-bottom: 8px;

    @media screen and (max-width: 900px) {
        font-size: 3vw;
    }
`;

export const IDInput = styled.input`
    width: 474px;
    height: 45px;
    padding: 2px 10px;
    outline: none;
    font-size: 15px;
    background: white;
    border: 3px solid #99F8FF;
    
    @media screen and (max-width: 900px) {
        width: 47vw;
        height: 5vh;
    }
`;

export const PW = styled.div`
    width: 500px;
    height: 80px;
    margin-bottom: 40px;

    @media screen and (max-width: 900px) {
        width: 40vw;   
        margin-left: -10vw;     
    }
`;

export const PWText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.pwClick ? '#FF9999' :'#394B5A'};
    margin-bottom: 8px;
    
    @media screen and (max-width: 900px) {
        font-size: 3vw;
    }
`;

export const PWInput = styled.input`
    width: 474px;
    height: 45px;
    padding: 2px 10px;
    outline: none;
    font-size: 15px;
    background: white;
    border: 3px solid #99F8FF;
    
    @media screen and (max-width: 900px) {
        width: 47vw;
        height: 5vh;
    }
`;

export const Warning = styled.div`
    font-size: 13px;
    margin-top: 5px;
    color: #FF9999;
`;

export const Bottom = styled.div`
    position: absolute;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
`;

export const SendBtn = styled.button`
    color: white;
    outline: none;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 50px;
    padding: 2px 10px;
    font-size: 20px;
    font-weight: bold;
    border: 3px solid #99F8FF;
    background: #99F8FF;
    cursor: pointer;

    @media screen and (max-width: 900px) {
        width: 50vw;
        height: 6vh;
    }
`;

export const Forgot = styled.div`
    margin-top: 10px;
    font-size: 20px;
    color: #394B5A;
    text-decoration: underline;
    cursor: pointer;

    @media screen and (max-width: 900px) {
        font-size: 3vw;
    }
`;

export const SignInImg = styled.img`
    position: absolute;
    z-index: 0;

    @media screen and (max-width: 1550px) {
        top: 250px;
        left: 30vw;
        width: 500px;
        height: auto;
    }

    @media screen and (max-width: 1428px) {
        top: 250px;
        left: 20vw;
        width: 500px;
        height: auto;
    }

    @media screen and (max-width: 1110px) {
        left: 10vw;
    }

    @media screen and (max-width: 920px) {
        left: 7vw;
    }

    @media screen and (max-width: 751px) {
        width: 60vw;
        height: auto;
    }
`;

export const WarningContents = styled.div`
    color: white;
    position: absolute;
    z-index: 6;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    padding: 2px 10px;
    font-weight: bold;
    border: 3px solid #394B5A;
    background: #394B5A;
    border-radius: 3px;

    @media screen and (max-width: 900px) {
        width: 50vw;
    }
`;

export const WarningText = styled.div`
    display: flex;
    justify-content: center;
    font-size: 15px;

    @media screen and (max-width: 903px) {
        padding-top: 5px; 
        font-size: 0.5vw;
    }

    @media screen and (max-width: 630px) {
        padding: 5px 0px;

    }
`;

export const CloseWarning = styled.span`
    margin-left: 20px;
    font-size: 15px;
    cursor: pointer;

    @media screen and (max-width: 903px) {
        margin-top: -3px;
    }

    @media screen and (max-width: 630px) {
        margin-top: 5px;
    }
`;