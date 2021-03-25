import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    overflow: hidden;
`;

export const Contents = styled.div`
    width: 100wv;
    height: 500px;
    position: absolute;
    z-index: 1;
    top: 15%;
    left: ${props => props.menu ? 35 : 30}%;

    @media screen and (mix-width: 701px), screen and (max-width: 875px) {
        left: 60%;
        transform: translateX(-60%);
    }

    @media screen and (max-width: 1000px) {
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const MainContents = styled.div`
    width: 640px;
    height: 720px;
    padding: 50px 0px;
    background: rgba(153, 248, 255, 0.4);
    position: relative;
    margin-bottom: 40px;
    z-index: 1;

    @media screen and (max-width: 1428px) {
        width: 40vw;
    }

    @media screen and (max-width: 1000px) {
        width: 65vw;
    }

    @media screen and (max-width: 800px) {
        width: 80vw;
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
    font-size: 35px;
    font-weight: bold;

    @media screen and (max-width: 1320px) {
        font-size: 2.5vw;
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

    @media screen and (max-width: 900px) {
        width: 22vw;
    }
`;

export const Text = styled.div`
    display: flex;
    justify-content: center;
    font-size: 13px;
    margin-top: 30px;
    width: 500px;
    text-align: center;
    
    @media screen and (max-width: 1320px) {
        width: 40vw;
        font-size: 1vw;
    }
`;

export const Input = styled.div`
    position:absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
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
    bottom: 20px;
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

    @media screen and (max-width: 1305px) {
        width: 35vw;
    }

    @media screen and (max-width: 800px) {
        width: 50vw;
        height: 6vh;
    }
`;

export const ForgotImg = styled.img`
    position: fixed;
    top: 300px;
    z-index: 0;

    @media screen and (max-width: 1550px) {
        left: 60vw;
        width: 500px;
        height: auto;
    }

    @media screen and (max-width: 1428px) {
        left: 50vw;
    }

    @media screen and (max-width: 1010px) {
        left: 20vw;
    }

    @media screen and (max-width: 920px) {
        left: 20vw;
    }

    @media screen and (max-width: 876px) {
        left: 15vw;
        width: 50vw;
    }
`;

export const MainHeader = styled.div`
    position:fixed;
    width: 100%;
    z-index: 3;
`;

export const MainSide = styled.div`
    margin-top: 60px;
    position: fixed;
    height: 100%;
    z-index: ${props => props.menu ? 2 : 0};
`;