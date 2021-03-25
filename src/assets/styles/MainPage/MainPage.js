import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    overflow: hidden;
`;

export const Contents = styled.div`
    width: 100wv;
    position: absolute;
    z-index: ${props => props.menu ? 0 : 5};
    top: 30%;
    left: ${props => props.menu ? 30 : 20}%;

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
    position: relative;
    z-index: 1;
`;

export const TextContents = styled.div`
`;

export const Welcome = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #99F8FF;

    @media screen and (max-width: 875px) {
        width: 75vw;
        font-size: 4vw;
    }
`;

export const PointText = styled.div`
    font-size: 50px;
    font-weight: bold;
    width: 700px;
    margin-bottom: 10px;
    color: #394B5A;

    @media screen and (max-width: 875px) {
        width: 80vw;
        font-size: 6vw;
    }
`;

export const DetailText = styled.div`
    font-size: 25px;
    width: 450px;
    color: #394B5A;

    @media screen and (max-width: 875px) {
        width: 70vw;
        font-size: 4vw;
    }
`;

export const MainBtn = styled.div`
    margin-top: 20px;
`;

export const QnABtn = styled.button`
    width: 150px;
    height: 50px;
    font-size: 25px;
    border-radius: 5px;
    border: 3px solid white;
    background: #99F8FF;
    color: white;
    margin-right: 50px;
    cursor: pointer;
    outline: none;

    @media screen and (max-width: 875px) {
        margin-right: 6vw;
        width: 20vw;
        height: 8vw;
        font-size: 3vw;
    }
`;

export const HelpBtn = styled.button`
    width: 150px;
    height: 50px;
    font-size: 25px;
    border-radius: 5px;
    border: 3px solid #99F8FF;
    background: white;
    color: #99F8FF;
    cursor: pointer;
    outline: none;

    @media screen and (max-width: 875px) {
        width: 20vw;
        height: 8vw;
        font-size: 3vw;
    }
`;

export const IntroImg = styled.img`
    position: absolute;
    z-index: 0;
    left: 50vw;

    @media screen and (max-width: 1550px) {
        top: 0px;
        left: 35vw;
        width: 500px;
        height: auto;
    }

    @media screen and (max-width: 1110px) {
        opacity: 0.5;
        left: 20vw;
    }

    @media screen and (max-width: 800px) {
        left: 20vw;
    }

    @media screen and (max-width: 751px) {
        width: 60vw;
        height: auto;
    }

    @media screen and (max-width: 500px) {
        top: 10vh;
    }
`;