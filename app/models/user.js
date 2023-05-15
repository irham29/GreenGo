const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

module.exports = User;
