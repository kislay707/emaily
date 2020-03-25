const utils = require("./utilsServerGame");

const connectedPlayers = [];
const currentGames = [];

const Player = function(socket, id) {
  this.id = id;
  this.status = -1;
  this.socket = socket;
};

const Games = function(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.winner = -1;
};

module.exports.initialize = io => {
  io.on("connection", client => {
    console.log("client connected now");
    client.on("clientConnected", function() {
      console.log("small client connected now");

      // when player disconnects
      client.on("disconnect", reason => {
        console.log("Client disconnected");
        console.log(reason);
        console.log(client.id);

        var index = utils.findPlayerIndexBySocketId(
          client.id,
          connectedPlayers
        );
        var playerId = connectedPlayers[index].id;

        var gameIndex = utils.findGameIndexByPlayerId(playerId, currentGames);
        var currentGame = currentGames[gameIndex];

        if (index !== -1) connectedPlayers.splice(index, 1);

        if (currentGame) {
          currentGames.splice(gameIndex, 1);
          var opponent = utils.findOpponent(playerId, currentGame);
          opponent.socket.emit("opponentDisconnected", {});
        }

        console.log("connectedPlayers");
        console.log(connectedPlayers);

        console.log("currentGames");
        console.log(currentGames);
      });

      const idlePlayers = connectedPlayers.filter(player => {
        return player.status === -1;
      });
      // console.log("idlePlayers");
      // console.log(idlePlayers);

      const player = new Player(client, client.id);
      console.log("connectedPlayers joined");
      connectedPlayers.push(player);
      console.log(connectedPlayers);

      let selectedPlayer;
      if (idlePlayers.length > 0) {
        selectedPlayer = idlePlayers[0];
        startMatch(player, selectedPlayer);
      }

      client.on("updatePosition", function(data) {
        console.log("player clicked socket");
        console.log(data);
        const opponentId = data.opponent;

        const currentGameIndex = utils.findGameIndexByPlayerId(
          opponentId,
          currentGames
        );
        const currentGame = currentGames[currentGameIndex];

        console.log("current Game");
        console.log(currentGame);

        if (currentGame) {
          const opponent =
            opponentId === currentGame.player1.id
              ? currentGame.player1
              : currentGame.player2;

          console.log("opponent");
          console.log(opponent);

          opponent.socket.emit("opponentPosition", data);
        }
      });
    });
  });
};

const startMatch = (player1, player2) => {
  console.log("match startedd");
  currentGames.push(new Games(player1, player2));
  player1.status = 0;
  player2.status = 0;
  player1.socket.emit("startMatch", { position: 0, opponent: player2.id });
  player2.socket.emit("startMatch", { position: 1, opponent: player1.id });
};
