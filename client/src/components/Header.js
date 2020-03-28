import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  background: slategrey;
  align-items: center;
  padding: 10px;
`;

const Logo = styled.a`
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 20px;
  font-size: 20px;
  font-weight: 500;
  padding: 0 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: grey;
  }
`;

const Login = styled.a`
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 40px;
  font-size: 20px;
  font-weight: 500;
  padding: 0 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: grey;
  }
`;

function Header(props) {
  return (
    <Container>
      <Logo href="/">Home</Logo>
      {props.userId ? (
        <Login href="/api/logout"> Logout</Login>
      ) : (
        <Login href="/auth/google"> Login With Google</Login>
      )}
    </Container>
  );
}

export default Header;
