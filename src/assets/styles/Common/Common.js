import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: fixed;
    z-index: 3;
`;

export const Header = styled.div`
    position: relative;    
    width: 100%;
    z-index: 2;
`;

export const SideBar = styled.div`
    float: left;
    height: 100%;
    position: relative;
    z-index: 0;
`;