const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 5,
    maxLength: 15,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    default: 1200,
  },

  gamesPlayed: {
    type: Number,
    default: 0,
  },

  wins: {
    type: Number,
    default: 0,
  },

  losses: {
    type: Number,
    default: 0,
  },

  draws: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", UserSchema)
