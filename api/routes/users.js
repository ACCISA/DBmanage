const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const usersRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;

  if (_auth) {
    const jsonData = JSON.parse(_auth_state);

    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.root) {
        res.status(401).json("unauthorized");
        return;
      }
      const users = await User.find({ root: false });
      res.json(users);
    });
  } else {
    res.status(401).json("token missing");
  }
};

module.exports = usersRouter;
