import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import Game from "./components/Game";
import Home from "./components/Home";
import Header from "./components/Header";

import openSocket from "socket.io-client";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      gameData: {},
      opponentSwitch: -1,
      opponent: {}
    };
    this.socket = null;
  }

  componentDidMount() {
    axios.get("/api/current_user").then(user => {
      if (user.data.googleId) {
        this.setState({ user: user.data });
      }
    });
  }

  setSocket = () => {
    const socket = openSocket.connect("http://localhost:5000");
    this.socket = socket;

    // initial connection
    socket.on("connect", function() {
      console.log("testing");
      const sessionID = socket.id; //
      console.log(sessionID);

      axios
        .post("/api/setUserSocket", { socketId: sessionID })
        .then(user => {
          socket.emit("clientConnected");
          console.log(user);
        })
        .catch(e => {
          socket.emit("clientConnected");
        });
    });

    // start match , connected with opponent
    socket.on("startMatch", data => {
      console.log("match started");
      console.log(data);

      axios.get(`/api/getUserSocket?socketId=${data.opponent}`).then(user => {
        this.setState({ gameData: data, opponent: user.data });
        console.log(user);
      });
    });

    // opponent moved
    socket.on("opponentPosition", data => {
      console.log("opponentPosition");
      console.log(data);
      //handleTileClick(data.index);
      this.setState({ opponentSwitch: data.index });
    });
  };

  render() {
    return (
      <div>
        <Header userId={this.state.user.googleId}></Header>
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  userId={this.state.user.googleId}
                  givenName={this.state.user.givenName}
                  opponent={this.state.opponent.givenName}
                  setSocket={() => {
                    this.setSocket();
                  }}
                />
              )}
            />
            <Route
              exact
              path="/game"
              render={props => (
                <Game
                  {...props}
                  gameData={this.state.gameData}
                  opponentPicture={this.state.opponent.picture}
                  socket={this.socket}
                  opponentSwitch={this.state.opponentSwitch}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
