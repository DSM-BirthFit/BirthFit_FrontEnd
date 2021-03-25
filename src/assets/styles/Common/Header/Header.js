import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 60px;
    background: #394B5A;
    position: fix;
    box-shadow: 0px 3px 6px #2F3E4B;
`;

export const MenuBarIcon = styled.div`
    position: relative;
    left: 1%;
    padding-top: 5px;
    width: 50px;
    height: 55px;
    float:left;
    cursor: pointer;
    z-index: 1;
`;

export const MainTitle = styled.div`
    position: relative;
    left: 3%;
    width: 200px;
    margin: 0px;
    font-size: 40px;
    font-weight: bold;
    color: white;
    cursor: pointer;
`;

export const HighLightTitle = styled.span`
    color: #99F8FF;
`;

export const RightMenu = styled.div`
    position: absolute;
    right: 1%;
    top: 10px;
    font-size: 25px;
    font-weight: bold;

    @media screen and (max-width: 750px) {
        display: none;
    }
`;

export const FirstBtn = styled.div`
    color: #99F8FF;
    float: right;
    margin-left: 30px;
    cursor: pointer;
`;

export const SecondBtn = styled.div`
    color: white;
    float: right;
    cursor: pointer;
`;