import React, { Component } from "react";

import Board from "./Board";

import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBadgeCount: 0
    };
  }

  componentDidMount() {
    if (this.props.socket) {
      // opponent messaged
      this.props.socket.on("opponentMessage", data => {
        addResponseMessage(data.message);
        this.setState({ chatBadgeCount: this.state.chatBadgeCount + 1 });
      });
    }
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incomig! ${newMessage}`);
    if (this.props.socket) {
      this.props.socket.emit("userMessage", { message: newMessage });
      if (this.state.chatBadgeCount !== 0) {
        this.setState({ chatBadgeCount: 0 });
      }
    }
  };

  render() {
    return (
      <div>
        <Widget
          badge={this.state.chatBadgeCount}
          profileAvatar={this.props.opponentPicture}
          title="Send message"
          subtitle=""
          handleNewUserMessage={this.handleNewUserMessage}
        />
        <Board
          gameData={this.props.gameData}
          socket={this.props.socket}
          opponentSwitch={this.props.opponentSwitch}
        />
      </div>
    );
  }
}

export default Game;
