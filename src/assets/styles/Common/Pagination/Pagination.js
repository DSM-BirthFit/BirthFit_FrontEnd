import styled from 'styled-components';

export const PageLi = styled.li`
    display:inline-block;
    font-size:17px;
    font-weight:600;
    padding:5px;
    border-radius:5px;
    width:25px;
    color: ${props => props.currentPage == props.number ? '#FF9999' : '#394B54'};

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

export const PageSpan = styled.span`
    &:hover::after,
    &:focus::after{
        border-radius:100%;
        color:white;
        background-color:#394B5A;
    }
`;