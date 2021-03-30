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
    top: 12%;
    left: ${props => props.menu ? 20 : 10}%;

    @media screen and (mix-width: 701px), screen and (max-width: 875px) {
        left: 60%;
        transform: translateX(-55%);
    }

    @media screen and (max-width: 750px) {
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const MainContents = styled.div`
    position: relative;
    z-index: 1;
`;

export const TextContents = styled.div`
    margin-bottom: 10px;
    position: relative;
`;

export const Header = styled.div`
    font-size: 50px;
    font-weight: bold;
    color: #394B5A;

    @media screen and (max-width: 800px) {
        font-size: 7vw;
    }
`;

export const UnderBar = styled.div`
    margin-top: 10px;
    width: 300px;
    height: 5px;
    background: #99F8FF;
`;

export const CancelBtn = styled.button`
    outline: none;
    background: white;
    border: 3px solid #FF9999;
    border-radius: 5px;
    color: #FF9999;
    font-size: 25px;
    font-weight: bold;
    width: 200px;
    height: auto;
    padding: 10px 10px;
    position: absolute;
    top: 10px;
    right: 220px;
    cursor: pointer;

    @media screen and (max-width: 800px) {
        width: 20vw;
        font-size: 3vw;
    }
`;

export const WritenBtn = styled.button`
    outline: none;
    background: #99F8FF;
    border: 3px solid #99F8FF;
    border-radius: 5px;
    color: white;
    font-size: 25px;
    font-weight: bold;
    width: 200px;
    height: auto;
    padding: 10px 10px;
    position: absolute;
    top: 10px;
    right: 0px;
    cursor: pointer;

    @media screen and (max-width: 800px) {
        width: 20vw;
        font-size: 3vw;
    }
`;

export const Input = styled.div`
    padding-top: 10px;
`;

export const InputTitle = styled.div`
    height: 75px;
`;

export const InputTitleText = styled.div`
    float: left;
    font-size: 30px;
    font-weight: bold;
    margin-right: 20px;
    color: #394B5A;
`;

export const TitleInput = styled.input`
    margin-top: 2px;
    width: 1200px;
    font-size: 25px;
    padding: 5px 10px;
    outline: none;
    border: 1px solid #394B5A;
    border-radius: 3px;
    color: #394B5A;
`;

export const LimitText = styled.div`
    position: absolute;
    right: 0;
`;

export const ContentText = styled.textarea`
    resize: none;
    padding: 10px;
    outline: none;
    border: 1px solid #394B5A;
    border-radius: 3px;
    color: #394B5A;
    width: 1280px;
    height: 400px;
    font-size: 20px;
    font-family: 'Noto Sans KR', sans-serif;
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