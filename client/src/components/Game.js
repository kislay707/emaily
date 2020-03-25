import React, { Component } from "react";
import axios from "axios";
import Board from "./Board";
import openSocket from "socket.io-client";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      gameData: {},
      opponentSwitch: false
    };
    this.socket = null;
  }

  startMatch = data => {
    this.setState({ gameData: data });
  };

  componentDidMount() {
    axios.get("/api/current_user").then(user => {
      if (user.data.googleId) {
        // http://localhost:5000
        const socket = openSocket("http://localhost:5000");
        this.socket = socket;
        socket.emit("clientConnected");
        socket.on("startMatch", data => {
          console.log("lllll");
          console.log(data);
          //this.startMatch(data);
          this.setState({ gameData: data });
        });
        socket.on("opponentPosition", data => {
          console.log("opponentPosition");
          console.log(data);
          //handleTileClick(data.index);
          this.setState({ opponentSwitch: data.index });
        });
        this.setState({ user: user.data });
      }
    });
  }

  render() {
    return (
      <div>
        {!this.state.user.googleId ? (
          <a href="/auth/google">Login</a>
        ) : (
          <div>
            <div> Welcome {this.state.user.givenName} </div>
            <a href="/api/logout">Logout</a>
          </div>
        )}

        <Board
          gameData={this.state.gameData}
          socket={this.socket}
          opponentSwitch={this.state.opponentSwitch}
        />
      </div>
    );
  }
}

export default Game;
