const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = require("config").get("jwtSecret");

const User = require("../models/User");

async function registerHandler(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect data while registration",
      });
    }

    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({
        message: "A user with such email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();
    res.status(201).json({
      message: "A user has been created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with register method",
    });
  }
}

async function loginHandler(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect data while registration",
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "A user cannot be found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with login method",
    });
  }
}

module.exports = {
  registerHandler,
  loginHandler,
};
