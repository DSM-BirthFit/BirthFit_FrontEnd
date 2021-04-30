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
    right: 2%;
    top: 10px;
    font-size: 25px;
    font-weight: bold;
`;

export const UserInfo = styled.div`
    background: url(${props => props.src}) no-repeat center center;
    background-size: cover;
    height: 42px;
    width: 42px;
    border-radius: 100px;
    float: right;
    cursor: pointer;
`;

export const AlarmIcon = styled.div`
    float: right;
    margin-right: 30px;
    margin-top: 5px;
    cursor: pointer;
`;

export const AlarmTure = styled.div`
    width: 13px;
    height: 13px;
    border-radius: 13px;
    background-color: #99F8FF;
    position: relative;
    top: -35px;
    left: 17px;
`;

export const UserInfoContents = styled.div`
    background: #394B5A;
    position: relative;
    top: 60px;
    width: 350px;
    font-size: 20px;
    font-weight: normal;
    color: white;
    box-shadow: 0px 0px 10px #196166;
`;

export const Welcome = styled.div`
    position: relative;
    left: 50%;
    transform: translate(-35%);
    padding: 20px 0px;
`;

export const Strong = styled.span`
    font-weight: bold;
`;

export const Point = styled.span`
    color: #99F8FF;
`;

export const Line = styled.div`
    width: 100%;
    height: 10px;
    border-top: 1px solid #87929B;
`;


export const AccountContents = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid #87929B;
`;

export const Account = styled.div`
    font-size: 15px;
    margin-bottom: 15px;
`;

export const UserName = styled.div`
    padding-left: 10px;
    margin-bottom: 15px;
    word-wrap: break-word;
`;

export const UserEmail = styled.div`
    padding-left: 10px;
    margin-bottom: 15px;
    word-wrap: break-word;
`;

export const OptionContents = styled.div`
    padding: 10px 20px;
`;

export const Option = styled.div`
    font-size: 15px;
    margin-bottom: 15px;
`;

export const Profile = styled.div`
    font-weight: bold;
    color: white;
    cursor: pointer;
    padding: 10px;

    &:hover {
        background: #87929B;
        border-radius: 7px;
    }
`;

export const SignOut = styled.div`
    font-weight: bold;
    color: #99F8FF;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 10px;

    &:hover {
        background: #87929B;
        border-radius: 7px;
    }
`;

export const AlarmContents = styled.div`
    position: relative;
    top: 60px;
    background-color: #394B5A;
    width: 350px;
    height: 500px;
    box-shadow: 0px 0px 10px #196166;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AlarmHeader = styled.div`
    color: white;
    width: 350px;
    justify-content: center;
    display: flex;
    box-shadow: 0px 7px 20px #2F3E4B;
    padding: 15px 0px;
    z-index:1;
`;

export const AlarmList = styled.div`
    width: 350px;
    height: 420px;
    overflow-y: scroll;
    overflow-x: hidden;
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