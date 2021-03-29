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
    float: right;
    position: absolute;
    top: 10px;
    right: 0px;
    cursor: pointer;

    @media screen and (max-width: 800px) {
        width: 20vw;
        font-size: 3vw;
    }
`;

export const Input = styled.table`
    margin-top: 20px;
    width: ${props => props.menu ? '75vw' : '85vw'};
    border-collapse: collapse;

    @media screen and (max-width: 800px) {
        width: 85vw;
    }
`;

export const Trtag = styled.tr`
    background: #394B5A;
    color: white;
    border-right: 1px solid #394B5A;
`;

export const Headertable = styled.th`
    padding: 10px;

    &:nth-child(1) {
        padding-left: 10px;
        text-align: start;
        width: 80%;

        @media screen and (max-width: 800px) {
            width: 70%;
        }
    }

    @media screen and (max-width: 800px) {
        font-size: 1vw;
    }
`;

export const PageUl = styled.ul`
    list-style: none;
    text-align:center;
    padding:1px;
    height: 20px;
`;  

export const btnLi = styled.li`
    display:inline-block;
    font-size:17px;
    font-weight:600;
    padding:5px;
    border-radius:5px;
    width:25px;
    color: #394B54;

    &:hover{
        cursor:pointer;
        color:white;
        background-color:#394B5A;
    }
    &:focus::after{
        color:white;
        background-color:#394B5A;
    }
`;

export const pageBtn = styled.button`
    background-color: transparent;
    color: #394B54;
    border: none;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    outline: none;

    &:hover{
        cursor:pointer;
        color:white;
        background-color:#394B5A;
    }

    &:hover::after,
    &:focus::after{
        border-radius:100%;
        color:white;
        background-color:#394B5A;
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