const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  username: {
    type: String
  },
  text: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  room: {
    type: String
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Message", MessageSchema);
