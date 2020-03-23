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

      const idlePlayers = connectedPlayers.filter(player => {
        return player.status === -1;
      });
      console.log("idlePlayers");
      console.log(idlePlayers);

      const player = new Player(client, client.id);
      console.log("connectedPlayers");
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

        const currentGame = currentGames.filter(game => {
          return (
            game.player1.id === opponentId || game.player2.id === opponentId
          );
        });

        console.log("current Game");
        console.log(currentGame);

        const opponent =
          opponentId === currentGame[0].player1.id
            ? currentGame[0].player1
            : currentGame[0].player2;

        console.log("opponent");
        console.log(opponent);

        opponent.socket.emit("opponentPosition", data);
      });
    });
  });
};

const startMatch = (player1, player2) => {
  console.log("match startedd");
  currentGames.push(new Games(player1, player2));
  player1.socket.emit("startMatch", { position: 0, opponent: player2.id });
  player2.socket.emit("startMatch", { position: 1, opponent: player1.id });
};

// module.exports = io => {
// //   app.get(
// //     "/auth/google",
// //     passport.authenticate("google", {
// //       scope: ["profile", "email"]
// //     })
// //   );

// //   app.get(
// //     "/auth/google/callback",
// //     passport.authenticate("google"),
// //     (req, res) => {
// //       res.redirect("/");
// //     }
// //   );

// //   app.get("/api/logout", (req, res) => {
// //     req.logout();
// //     res.redirect("/");
// //   });

// //   app.get("/api/current_user", (req, res) => {
// //     res.send(req.user);
// //   });
// };
