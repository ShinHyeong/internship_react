import React from "react";
import { useUserState, useUserDispatch } from "../context/Users";
import SiteInfo from "../SiteInfo";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import oc from 'open-color';
const Aligner = styled.div`
margin-top: 1rem;
text-align: right;
`;
const StyledText = styled.div`
color: ${oc.gray[6]};
&:hover {
    color: ${oc.gray[7]};
}
cursor: pointer;
`
const RightAlignedButton = (children) => (
<Aligner>
    <StyledText onClick={children.onLogOut}>{children.title}</StyledText>
</Aligner>
);
const Home = () => {
  const { user } = useUserState();
  const dispatch = useUserDispatch();
  const onLogOutHandler = () => {
    dispatch({
      type: "LOGOUT",
    });
    alert("로그아웃 되었습니다.");
  };
  return (
    <div>
      <h3>{user.userId}님 환영합니다.</h3>
      <form>
      <RightAlignedButton onLogOut={onLogOutHandler} title = "로그아웃"></RightAlignedButton>
      <SiteInfo />
      </form>
    </div>
  );
};
export default Home;