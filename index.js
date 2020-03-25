const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookiesession = require("cookie-session");
const passport = require("passport");

const Game = require("./serverGame/Game");

const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  pingTimeout: 30000
});

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

app.use(
  cookiesession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

Game.initialize(io);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;
server.listen(PORT || 5000);
