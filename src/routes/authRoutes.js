const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  //deconstruct off the email and password from the body of the given post handler
  const { email, password } = req.body;

  try {
    //creates a new user using the mongoose "User" model
    //then tries to save it to mongoDB
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userID: user._id }, "101774");

    console.log(token);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ err: "Must provide email and password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ err: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userID: user._id }, "101774");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ err: "Invalid password or email" });
  }
});

module.exports = router;
