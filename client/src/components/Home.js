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
  margin: 20px 0;
`;

const MainBlock = styled.div`
  padding: 30px 15px;
  background-color: #eee;
  border-radius: 6px;
`;

const Title = styled.div`
  color: rgb(51, 51, 51);
  font-size: 36px;
  font-weight: 500;
  margin: 10px 0;
`;

const Description = styled.div`
margin-bottom: 15px;
font-size: 21px;
font-weight: 200;
line-height 30px
`;

const RulesButton = styled.div`
color: #fff;
background-color: #337ab7;
border-color: #2e6da4;
padding: 10px 16px;
font-size: 18px;
line-height: 1.3333333;
border-radius: 6px;
cursor: pointer;
width: fit-content;
&:hover {
  background-color: rgb(40, 96, 144);
}
`;

const PlayBlock = styled.div`
margin-top: 20px;
background-color: #fff;
border: 1px solid #ddd;
border-radius: 4px;
box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}
`;

const PlayTitle = styled.div`
color: #333;
background-color: #f5f5f5;
border-color: #ddd;
padding: 10px 15px;
font-family "Helvetica Neue", Helvetica, Arial, sans-serif;
font-size 16px;
font-weight 500;
`;
const PlayDescription = styled.div`
margin-top: 15px;
margin-left: 15px;
font-family "Helvetica Neue", Helvetica, Arial, sans-serif;
font-size 14px;

`;
const StartingButton = styled.div`
margin-top: 15px;
margin-bottom: 15px;
margin-left: 15px;
color: #333;
padding: 12px; 6px;
width: fit-content;
background-color: #fff;
border: 1px solid #ccc;
border-radius: 4px;
cursor: pointer;
font-family "Helvetica Neue", Helvetica, Arial, sans-serif;
font-size 14px;
&:hover {
  background-color: rgb(230, 230, 230);
}

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

        <MainBlock>
          <Title>Play now.</Title>
          <Description>Chaos is a fun and strategic game where the objective is to score higher than your opponent by taking control of the board. Play online with a friend or any random player available.</Description>
          <RulesButton>Learn the rules »</RulesButton>
        </MainBlock>

        <PlayBlock>
          <PlayTitle> Play with a friend</PlayTitle>
          <PlayDescription>
            Playing with another friend online by sharing the link
          </PlayDescription>
          <StartingButton>Start</StartingButton>
        </PlayBlock>

        <PlayBlock>
          <PlayTitle>Play Online</PlayTitle>
          <PlayDescription>
            Play with another available player online
          </PlayDescription>
          <StartingButton>Start</StartingButton>
        </PlayBlock>
    
        {/* {this.props.userId ? (
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
        )} */}
      </Container>
    );
  }
}

export default Home;
