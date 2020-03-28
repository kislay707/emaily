import React, { Component } from "react";
import styled from "styled-components";
import { render } from "react-dom";

const StartButton = styled.div`
  color: white;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding: 20px 20px;
  background: slategrey;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

const LoginButton = styled.a`
  color: white;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding: 20px 20px;
  background: slategrey;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: grey;
  }
`;

const Welcome = styled.div`
  display: flex;
  align-items: center;
  margin: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionStarted: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.opponent !== this.props.opponent) {
      this.startTimeout();
    }
  }

  startTimeout = () => {
    setTimeout(() => {
      this.props.history.push("/game");
    }, 2000);
  };

  handleStartClick = () => {
    if (this.props.setSocket) {
      this.props.setSocket();
    }
    this.setState({
      connectionStarted: true
    });
  };

  render() {
    return (
      <Container>
        {this.props.userId ? (
          <div>
            <Welcome>Hello {this.props.givenName}</Welcome>
            {this.state.connectionStarted ? (
              this.props.opponent ? (
                <div>
                  <div> Connected to {this.props.opponent} </div>
                  <div>Starting Game </div>
                </div>
              ) : (
                <div>Looking for players </div>
              )
            ) : (
              <StartButton
                onClick={() => {
                  this.handleStartClick();
                }}
              >
                Start Playing
              </StartButton>
            )}
          </div>
        ) : (
          <div>
            <LoginButton href="/auth/google">Login to Play</LoginButton>
          </div>
        )}
      </Container>
    );
  }
}

export default Home;
