import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    overflow: hidden;
`;

export const Contents = styled.div`
`;

export const MainContents = styled.div`
`;

export const TextContents = styled.div`
`;

export const Header = styled.div`
`;

export const UnderBar = styled.div`
`;

export const WritenBtn = styled.button`
`;

export const Input = styled.div`
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