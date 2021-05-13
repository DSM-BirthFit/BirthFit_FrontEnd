import styled from 'styled-components';
import sampleImg from '../../../images/user.jpg';

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


    @media screen and (max-width: 750px) {
        left: 10%;
    }
`;

export const MainContents = styled.div`
    position: relative;
    z-index: 1;
    background: rgba(255,255,255,0.5);
    width: 83vw;
`;

export const TextContents = styled.div`
    position: relative;
    padding-bottom: 30px;
`;

export const Header = styled.div`
    color: #394B5A;
    width: 1200px;
    width: 83vw;
    display:flex;

    @media screen and (max-width: 800px) {
        font-size: 7vw;
    }
`;

export const QType = styled.div`
    font-size: 50px;
    font-weight: bold;
`;

export const HeaderTitle = styled.div`
    font-size: 50px;
    font-weight: bold;
    word-break:break-all;
    height: auto;
    width: ${props => props.url==="qna" ? '80vw' : '83vw'};
`;

export const TitleContents = styled.div`
    font-size: 20px;
    margin-top: 40px;
    margin-left: 70px;
    width: 60vw;
    word-break: break-all;
    color: #394B5A;
`;

export const Information = styled.div`
    position: relative;
    top: 20px;
    line-height: 30px;
    width: 350px;
    border-bottom: 5px solid #99F8FF;
    padding-bottom: 20px;
`;

export const UserImage = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: url(${props => props.src === null ? sampleImg : `http://13.124.184.19:8000/image/${props.src}`}) center center no-repeat;
    background-size: contain;
    float: left;
    margin-right: 20px;
    margin-top: 10px;
`;

export const UserId = styled.div`
    font-size: 22px;
    font-weight: bold;
    color: #394B5A;
`;

export const CreateAtViews = styled.div`
    color: #394B5A;
`;


export const Input = styled.div`
    margin-left: 30px;
    margin-top: 30px;
`;

export const QnAPage = styled.div`
`;

export const QnAHeader = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #394B5A;
    height: 60px;
`;

export const HelpPage = styled.div`
`;

export const HelpHeader = styled.div`
    position: relative;
    font-size: 25px;
    font-weight: bold;
    color: #394B5A;
`;

export const HelpHeaderTitle = styled.span`
    position:absolute;
    top: 5px;
    left: 60px;
`;

export const CommntPage = styled.div`
    margin-top: 20px;
`;

export const CommentInput = styled.textarea`
    resize: none;
    font-size: 20px;
    font-family: 'Noto Sans KR', sans-serif;
    outline: none;
    border: none;
    border-bottom: 3px solid #394B5A;
    color: #394B5A;
    width: 73vw;
    background: transparent;
    height: ${props=>props.height};

    
`;


export const CommentBottom = styled.div`
    width: 73vw;
    position: relative;
    height: 60px;
    display: ${props => props.display ? 'display' : 'none'};
`;

export const CommnetLength = styled.div`
    font-size: 20px;
    color: #394B5A;
    position: absolute;
    top: 15px;
`;

export const CommentBtn = styled.div`
    position: absolute;
    right: 0px;
    top: 10px;
`;

export const CancelComment = styled.button`
    width: 90px;
    height: auto;
    padding: 5px 10px;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    margin-right: 20px;
    background: white;
    border: 3px solid #FF9999;
    border-radius: 5px;
    color: #FF9999;
`;

export const Submitcomment = styled.button`
    width: 90px;
    height: auto;
    padding: 5px 10px;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    background: #99F8FF;
    border: 3px solid #99F8FF;
    border-radius: 5px;
    color: white;
`;

export const List = styled.div`
    margin-top: ${props => props.display ? '20px' : '50px'};
`;

export const Bottom = styled.div`
    height: 70px;
    margin-bottom: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 4vw;

    @media screen and (max-width: 750px) {
        flex-direction: column;
        margin-top: 90px;
    }
`;

export const Heart = styled.div`
    width: 80px;
    cursor: pointer;
    margin-right: 20px;
`;

export const HeartCount = styled.div`
    float: right;
    color: #FF9999;
    font-size: 30px;
`;

export const isMine = styled.div`
    @media screen and (max-width: 750px) {
        display: flex;
        flex-direction: column;
    }
`;

export const ViewEdit = styled.button`
    width: 140px;
    font-size: 20px;
    font-weight: bold;
    background: transparent;
    border: 3px solid #99F8FF;
    border-radius: 5px;
    padding: 5px 20px;
    outline: none;
    color: #99F8FF;
    cursor: pointer;
    margin-right: 20px;

    &:hover {
        color: white;
        background: #99F8FF;
    }
`;

export const ViewDelete = styled.button`
    width: 140px;
    font-size: 20px;
    font-weight: bold;
    background: transparent;
    border: 3px solid #FF9999;
    border-radius: 5px;
    padding: 5px 20px;
    outline: none;
    color: #FF9999;
    cursor: pointer;

    &:hover {
        color: white;
        background: #FF9999;
    }
`;

export const AnswerButton = styled.button`
    width: 140px;
    font-size: 20px;
    font-weight: bold;
    background: transparent;
    border: 3px solid #99F8FF;
    border-radius: 5px;
    padding: 5px 20px;
    outline: none;
    color: #99F8FF;
    cursor: pointer;

    &:hover {
        color: white;
        background: #99F8FF;
    }
`;

export const QnAImage = styled.img`
    position: fixed;
    top: 300px;
    z-index: 0;

    @media screen and (max-width: 1550px) {
        left: 65vw;
        width: 400px;
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

export const HelpImage = styled.img`
    position: fixed;
    top: 300px;
    z-index: 0;

    @media screen and (max-width: 1550px) {
        left: 65vw;
        width: 500px;
        height: auto;
    }

    @media screen and (max-width: 1400px) {
        left: 55vw;
        width: 500px;
        height: auto;
    }

    @media screen and (max-width: 1110px) {
        opacity: 0.5;
        left: 20vw;
    }

    @media screen and (max-width: 1000px) {
        left: 15vw;
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