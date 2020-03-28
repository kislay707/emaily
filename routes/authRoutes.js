const passport = require("passport");

const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    console.log("logout request");
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/getUserSocket", (req, res) => {
    const socketId = req.query.socketId;
    console.log("opponent socket id is");
    console.log(socketId);
    User.findOne({ socketId: socketId }).then(user => {
      console.log(user);
      res.send(user);
    });
  });

  app.post("/api/setUserSocket", (req, res) => {
    console.log("post request");
    console.log(req.body);
    console.log(req.user.id);
    const socketId = req.body.socketId;

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { socketId: socketId } }
    ).then(user => {
      console.log(user);
      res.send(user);
    });
  });
};
