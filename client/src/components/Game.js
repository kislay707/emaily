import React, { Component } from "react";
import axios from "axios";
import Board from "./Board";
import openSocket from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      gameData: {},
      opponentSwitch: false,
      opponent: {}
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
        // const socket = openSocket("http://localhost:5000");
        // this.socket = socket;

        const socket = openSocket.connect();
        this.socket = socket;
        socket.on("connect", function() {
          console.log("testing");
          const sessionID = socket.id; //
          console.log(sessionID);

          const formData = new FormData();
          formData.append("socketId", sessionID);
          axios
            .post("/api/setUserSocket", { socketId: sessionID })
            .then(user => console.log(user));
        });

        socket.emit("clientConnected");
        socket.on("startMatch", data => {
          console.log("lllll");
          console.log(data);
          //this.startMatch(data);

          axios
            .get(`/api/getUserSocket?socketId=${data.opponent}`)
            .then(user => {
              this.setState({ gameData: data, opponent: user.data });
              console.log(user);
            });
        });

        socket.on("opponentPosition", data => {
          console.log("opponentPosition");
          console.log(data);
          //handleTileClick(data.index);
          this.setState({ opponentSwitch: data.index });
        });
        this.setState({ user: user.data });

        socket.on("opponentMessage", data => {
          addResponseMessage(data.message);
        });
      }
    });
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incomig! ${newMessage}`);
    this.socket.emit("userMessage", { message: newMessage });
    // Now send the message throught the backend API
  };

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
        <Widget
          profileAvatar={this.state.opponent.picture}
          title="Send message"
          subtitle=""
          handleNewUserMessage={this.handleNewUserMessage}
        />
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
