// var index = arr.findIndex(function(o) {
//   return o.id === "myid";
// });
// if (index !== -1) myArr.splice(index, 1);

const findPlayerIndexBySocketId = function(socketId, connectedPlayers) {
  var index = connectedPlayers.findIndex(function(player) {
    return player.id === socketId;
  });
  if (index !== -1) {
    return index;
  }
};

const findGameIndexByPlayerId = function(playerId, currentGames) {
  var index = currentGames.findIndex(function(games) {
    return games.player1.id === playerId || games.player2.id === playerId;
  });
  if (index !== -1) {
    return index;
  }
};

const findOpponent = function(playerId, currentGame) {
  if (currentGame.player1 && currentGame.player2) {
    const opponent =
      playerId === currentGame.player1.id
        ? currentGame.player2
        : currentGame.player1;
    return opponent;
  }
};

module.exports = {
  findPlayerIndexBySocketId: findPlayerIndexBySocketId,
  findGameIndexByPlayerId: findGameIndexByPlayerId,
  findOpponent: findOpponent
};
