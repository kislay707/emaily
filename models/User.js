const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  givenName: String,
  picture: String,
  socketId: String
});

mongoose.model("users", userSchema);
