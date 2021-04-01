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
    background: rgba(255,255,255,0.5);
`;

export const TextContents = styled.div`
    position: relative;
    padding-bottom: 30px;
    border-bottom: 5px solid #99F8FF;
`;

export const Header = styled.div`
    color: #394B5A;
    width: 1200px;
`;

export const QType = styled.div`
    position: absolute;
    font-size: 50px;
    font-weight: bold;
`;

export const HeaderTitle = styled.div`
    font-size: 50px;
    font-weight: bold;
    position: relative;
    top: 0px;
    word-break:break-all;
    height: auto;
    width: ${props => props.url==="qna" ? '900px' : '1000px'};
    margin-left: ${props => props.url==="qna" ? '70px' : '0px'};
`;

export const TitleContents = styled.div`
    font-size: 20px;
    margin-top: 20px;
    margin-left: 70px;
    width: 880px;
    word-break:break-all;
`;

export const Information = styled.div`
    position: absolute;
    top: 20px;
    right: 0px;
    text-align: right;
    line-height: 30px;
`;

export const UserId = styled.div`
`;

export const CreateAt = styled.div`
`;

export const Views = styled.div`
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
    width: 1125px;
    height: ${props=>props.height}
`;


export const CommentBottom = styled.div`
    width: 1125px;
    position: relative;
    height: 70px;
    display: ${props => props.display ? 'display' : 'none'}
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