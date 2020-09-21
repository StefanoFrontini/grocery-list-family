const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

//GET ALL MESSAGES
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A MESSAGE
router.post("/", async (req, res) => {
  const message = new Message({
    username: req.body.username,
    text: req.body.text,
    room: req.body.room
  });

  try {
    const savedPost = await message.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
// SPECIFIC MESSAGE
//router.get("/:messageId", async (req, res) => {
//  try {
//    const message = await Message.findById(req.params.messageId);
//    res.json(message);
//  } catch (err) {
//    res.json({ message: err });
//  }
//});

// SPECIFIC ROOM
router.get("/:roomName", async (req, res) => {
  try {
    const room = await Message.find({ room: req.params.roomName });
    res.json(room);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE MESSAGE
router.delete("/:messageId", async (req, res) => {
  try {
    const message = await Message.remove({ _id: req.params.messageId });
    res.json(message);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A MESSAGE
router.patch("/:messageId", async (req, res) => {
  try {
    const message = await Message.updateOne(
      { _id: req.params.messageId },
      { $set: { text: req.body.text } }
    );
    res.json(message);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
