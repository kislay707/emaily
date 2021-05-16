import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  display: flex;
  background: rgb(248, 248, 248);
  align-items: center;
  padding: 0 10px;
  color: rgb(51, 51, 51);
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  font-size 15px;
`;

const NavElement = styled.a`
  color: rgb(119, 119, 119);
  height: 100%;
  display: flex;
  align-items: center;
  
  font-weight: 500;
  padding: 0 15px;
  margin: 0 2px;
  cursor: pointer;
  text-decoration: none;
  color: ${props => (props.selected ? `rgb(51, 51, 51)` : `rgb(119, 119, 119)`)};
  background-color: ${props => (props.selected ? `rgb(231, 231, 231)` : `rgb(248, 248, 248)`)};

  &:hover {
    color: rgb(51, 51, 51);
    background-color rgb(231, 231, 231);
  }
`;

const NavTitle = styled(NavElement)`
  font-size 18px;
`;

const Login = styled.a`
  color: rgb(119, 119, 119);
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 0 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: rgb(51, 51, 51);
    background-color rgb(231, 231, 231);
  }
`;

function Header(props) {
  const path = window.location.pathname;
  return (
    <Container>
      <NavTitle href="/">CHAOS</NavTitle>
      <NavElement href="/" selected={path==='/'}>Home</NavElement>
      <NavElement href="/rules" selected={path==='/rules'}>Rules</NavElement>
      <NavElement href="/play-friend" selected={path==='/play-friend'}>Play with a friend</NavElement>
      <NavElement href="/play-online" selected={path==='/play-online'} >Play online</NavElement>
      {/* {props.userId ? (
        <Login href="/api/logout"> Logout</Login>
      ) : (
        <Login href="/auth/google"> Login With Google</Login>
      )} */}
    </Container>
  );
}

export default Header;
