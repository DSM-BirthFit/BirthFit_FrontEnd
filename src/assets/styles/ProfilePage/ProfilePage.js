import styled from 'styled-components';
import ChooseImg from '../../images/forgot.jpg';

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
        transform: translateX(-60%);
    }

    @media screen and (max-width: 1000px) {
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const MainContents = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: 100px;
`;

export const TextContents = styled.div`
    margin-bottom: 10px;
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

export const ImageChange = styled.div`
    position: relative;
    height: 220px;

    @media screen and (max-width: 1305px) {
        width: 35vw;
    }

    @media screen and (max-width: 750px) {
        width: 50vw;  
        height: 350px;
    }
`;

export const ImageChangeTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #394B5A;
    margin-bottom: 20px;

    @media screen and (max-width: 800px) {
        font-size: 3vw;
    }
`;

export const ImageCircle = styled.div`
    background-image: url(${props => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 130px;
    height: 130px;
    border-radius: 1000px;
    border: 3px solid #394B5A;
    position: relative;
    left: 0px;
    margin-bottom: 20px;
`;

export const ImageText = styled.div`
    position: relative;
    left: 15vw;
    top: -160px;

    @media screen and (min-width: 800px) and (max-width: 1050px) {
        left: 18vw;
    }

    @media screen and (min-width: 751px) and (max-width: 800px) {
        left: 20vw;
    }

    @media screen and (max-width: 750px) {
        top: 0px;
        left: 0px;
    }
`;

export const ImageDescription = styled.div`
    font-size: 13px;
    color: #394B5A;

    @media screen and (min-width: 750px) and (max-width: 1303px) {
        width: 200px;
    }
`;

export const ChooseImage = styled.div`
    margin-top: 25px;
`;

export const ChooseLabel = styled.label`
    color: white;
    font-size: 18px;
    font-weight: bold;
    background: #99F8FF;
    border: 3px solid #99F8FF;
    border-radius: 5px;
    padding: 12px 20px;
    cursor: pointer;    

    @media screen and (min-width: 751px) and (max-width: 1050px) {
        width: 100px;
        font-size: 13px;
    }
`;

export const ChooseInput = styled.input.attrs(props => ({
    type: "file"
}))`
    display: none;
`;

export const ResetImage = styled.input`
    color: #FF9999;
    font-size: 18px;
    font-weight: bold;
    background: white;
    border: 3px solid #FF9999;
    border-radius: 5px;
    width: 184px;
    height: 50px;
    cursor: pointer;
    margin-top: 25px;
    outline: none;

    @media screen and (min-width: 751px) and (max-width: 1050px) {
        width: 144px;
        font-size: 13px;
    }
`;

export const Input = styled.div`
    width: 500px;

    @media screen and (max-width: 1305px) {
        width: 35vw;
    }

    @media screen and (max-width: 800px) {
        width: 50vw;  
    }
`;

export const ProfileBtn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const UpdateBtn = styled.button`
    color: white;
    font-size: 18px;
    font-weight: bold;
    background: #99F8FF;
    border: 3px solid #99F8FF;
    border-radius: 5px;
    width: 200px;
    height: 50px;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DeleteBtn = styled.button`
    color: white;
    font-size: 18px;
    font-weight: bold;
    background: #FF9999;
    border: 3px solid #FF9999;
    border-radius: 5px;
    width: 200px;
    height: 50px;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const ProfileImg = styled.img`
    position: fixed;
    top: 300px;
    z-index: 0;
    
    @media screen and (max-width: 1550px) {
        left: 50vw;
        width: 500px;
        height: auto;
    }

    @media screen and (max-width: 1110px) {
        opacity: 0.5;
        left: 20vw;
    }

    @media screen and (max-width: 1000px) {
        left: 0vw;
    }

    @media screen and (max-width: 751px) {
        width: 60vw;
        height: auto;
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