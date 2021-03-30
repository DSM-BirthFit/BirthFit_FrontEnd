import styled from 'styled-components';

export const Container = styled.tr`
    border: 1px solid #394B5A;
`;

export const Tdtag  = styled.td`
    padding: 10px;

    &:nth-child(1) {
        padding-left: 10px;
    }

    &:nth-child(2), &:nth-child(3) {
        text-align: center;
    }

    @media screen and (max-width: 800px) {
        font-size: 1vw;
    }
`;

