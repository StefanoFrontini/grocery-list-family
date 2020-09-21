const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/", (req, res) => {
  res.send("We are on messages");
});

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

module.exports = router;
