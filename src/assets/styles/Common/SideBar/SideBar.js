import styled, { css } from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 70px;
    padding-top: 20px;
    background: #394B5A;

    ${props =>
        props.menu ?
        css`
            width: 230px;
        `
        :
        css`
            @media screen and (max-width: 750px) {
                display: none;
            }
        `
    }
`;

export const MenuUser = styled.div`
    display: none;

    @media screen and (max-width: 750px) {
        display: block;
    }
`;

export const UserBtn = styled.button`
    width: 200px;
    height: 50px;
    outline: none;
    background: #394B5A;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-left: 15px;
    cursor: pointer;
    border-radius: 5px;

    &:nth-child(1) {
        color: white;
        border: 2px solid white;
        &:hover {
            background: white;
            color: #394B5A;
        }
    }

    &:nth-child(2) {
        color: #99F8FF;
        border: 2px solid #99F8FF;
        &:hover {
            background: #99F8FF;
            color: #394B5A;
        }
    }
`;

export const MenuDiv = styled.div`
    padding: 20px 0px;
    width: 100%;
    cursor: pointer;
    background: ${props => props.backColor === true ? "#3D596F" : "#394B5A"};
    height : ${props => props.menu === true ? "50px" : "70px" };
`;

export const IconDiv = styled.div`
    ${props =>
        props.menu ?
        css`
            float: left;
            margin: 0px 20px;
        `
        :
        css`
            display: felx;
            justify-content: center;
        `
    }
`;

export const MenuName = styled.div`
    color: white;
    font-size: 15px;
    font-weight: bold;

    ${props =>
        props.menu ?
        css`
            float: left;
            font-size: 25px;
            margin-left: 15px;
            margin-top: 5px;
        `
        :
        css`
            display: felx;
            justify-content: center;
            font-size: 15px;
            margin-top: 10px;
        `
    }
`;