import styled from 'styled-components';
import NullImage from '../../../images/user.jpg'

export const Container = styled.div`
    margin-left: 12.5px;
    margin-bottom: 30px;
    width: 1060px;
    padding: 20px;
    background: rgba(57, 75, 90, 0.5);
`;

export const Header = styled.div`
    position: relative;
    margin-bottom: 10px;
    display: flex;
`;

export const userImage = styled.div`
    background: url(${props => props.src == null ? NullImage : props.src}) center center no-repeat;
    background-size: contain;
    border-radius: 150px;
    width: 30px;
    height: 30px;
    margin-right: 20px;
`;

export const User = styled.div`
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

export const Btn = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
`;

export const Edit = styled.button`
    margin-right: 20px;
    border: 2px solid #99F8FF;
    border-radius: 2px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 2px 15px;
    background: transparent;
    outline: none;
    cursor: pointer;

    &:hover {
        background: #99F8FF;
    }
`;

export const Delete = styled.button`
    border: 2px solid #FF9999;
    border-radius: 2px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 2px 15px;
    background: transparent;
    outline: none;
    cursor: pointer;

    &:hover {
        background: #FF9999;
    }
`;

export const UnderBar = styled.div`
    width: 200px;
    height: 2px;
    background: #99F8FF;
    margin-bottom: 10px;
`;

export const Content = styled.div`
    margin-left: 30px;
    width: 980px;
    font-size: 17px;
    color: white;
    background: transparent;
    border: none;
    word-break:break-all;
    margin-bottom: 5px;
`;

export const Write = styled.textarea`
    margin-left: 30px;
    width: 980px;
    font-size: 17px;
    color: white;
    background: transparent;
    border: none;
    word-break:break-all;
    margin-bottom: 5px;
    outline: none;
    font-family: 'Noto Sans KR', sans-serif;
    height: ${props=>props.height}
`;