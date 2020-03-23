import React from "react";
//import openSocket from "socket.io-client";
import logo from "./logo.svg";
import Game from "./components/Game";
import "./App.css";

function App() {
  // const socket = openSocket();
  // socket.on("news", function(data) {
  //   console.log("lllll");
  //   socket.emit("mevent", { my: "data" });
  // });
  return <Game></Game>;
}

export default App;
