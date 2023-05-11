const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const registerRouter = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, secret),
      active: false,
      root: false,
    });
    res.json(userDoc);
  } catch (e) {
    if (e.code == 11000) {
      res.status(422).json("username already exists");
    } else {
      res.status(500).json("unknown error");
    }
  }
};

module.exports = registerRouter;
