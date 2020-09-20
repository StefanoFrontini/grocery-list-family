const mongoose = require('mongoose');

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
    }
});

module.exports = mongoose.model('Messages', MessageSchema);