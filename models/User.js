const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  givenName: String
});

mongoose.model("users", userSchema);
