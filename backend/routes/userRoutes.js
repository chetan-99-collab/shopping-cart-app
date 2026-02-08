const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * REGISTER
 * POST /users
 */
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

/**
 * LOGIN
 * POST /users/login
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid username/password" });
  }

  // 🚫 single-device check
  if (user.token) {
    return res
      .status(403)
      .json({ message: "You cannot login on another device." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid username/password" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  user.token = token;
  await user.save();

  res.json({ token });
});

/**
 * LOGOUT
 * POST /users/logout
 */
router.post("/logout", auth, async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
