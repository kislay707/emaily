import React, { Component } from "react";
import axios from "axios";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get("/api/current_user").then(user => {
      if (user.data.googleId) {
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

        <Board />
      </div>
    );
  }
}

export default Game;
