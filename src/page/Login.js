import React, {useCallback } from "react";
import {Link} from "react-router-dom";
import useInput from "../components/useInput";
import { useUserState, useUserDispatch } from "../context/Users";

import styled from "styled-components";
import oc from 'open-color';
import './SocialBox.css';

import KakaoLogin from "../components/KakaoLogin";
import FacebookLogin from "../components/FacebookLogin";
import InstagramLogin  from "../components/InstagramLogin";
import NaverLogin from "../components/NaverLogin";

//* STYLED_COMPONENTS
const Aligner = styled.div`
margin-top: 1rem;
text-align: right;
`;

const StyledLink = styled(Link)`
color: ${oc.gray[6]};
&:hover {
    color: ${oc.gray[7]};
}
`
const RightAlignedLink = ({to, children}) => (
<Aligner>
    <StyledLink to={to}>{children}</StyledLink>
</Aligner>
);

const InputContainer = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const InputButton = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: white;
  border: none;
  border-radius: 0;
  background-color: #009879;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const InputWithLabel = ({label, ...rest}) => (
  <Wrapper>
      <Label>{label}</Label>
      <Input {...rest}/>
  </Wrapper>
);

function Login() {
  const [id, onChangeId, setId] = useInput("");
  const [pwd, onChangePwd, setPwd] = useInput("");
  const { userList } = useUserState();
  const dispatch = useUserDispatch();

//*FUNCTIONS
  const onReset = useCallback(() => {
    setId("");
    setPwd("");
  }, [setId, setPwd]);

   const onLogin = () => {
    var userNum = -1;
    for(var i=0; i<userList.length; i++) {
      if(userList[i].id == id)
      userNum = i;
    }

    if (userNum == -1) {
      alert("???????????? ?????? ???????????????. ??????????????? ????????????.");
      return;
    }
    
    if (userList[userNum].pwd != pwd) {
      alert("??????????????? ???????????? ????????????.");
      return;
    }
    
    dispatch({
      type: "LOGIN",
      userId: id,
    });

    alert("?????????");
    onReset();
  }
//*RENDER
return (
      <>
      <form>
      <InputContainer>
        <h1>???????????? ??????, Dr.True</h1>
        <form>
          <InputWithLabel label="?????????" id="user_id" value={id} onChange={onChangeId} placeholder="???????????? ???????????????" required/>
          <InputWithLabel label="????????????" id="user_pwd" value={pwd} onChange={onChangePwd} placeholder="??????????????? ???????????????" required/>
          <InputButton type="submit" onClick={onLogin}>LOGIN</InputButton>
          <RightAlignedLink to="/signup" style={{textDecoration: 'none'}}>????????????</RightAlignedLink>
          <div className="socialBox">
          <Wrapper /><Label>?????? ?????????</Label><Wrapper /><Wrapper />            
            <div className="kakao">
              <KakaoLogin></KakaoLogin>
            </div>
            <div className="facebook">
              <FacebookLogin></FacebookLogin>
              </div>
            <div className="naver">
              <NaverLogin></NaverLogin>
            </div>
            <div className="instagram">
              <InstagramLogin></InstagramLogin>
            </div>
          </div>
          </form>
      </InputContainer>
      </form>
      </>
  );
}
export default Login;