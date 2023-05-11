const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const findUserRouter = (req, res) => {
  // find a user and return true if the user exists
  const { _auth, _auth_state } = req.cookies;
  const { usernameLook } = req.body; // the use found must exist see /find_user
  const jsonData = JSON.parse(_auth_state);
  if (_auth) {
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.owner) {
        // check if owner
        res.status(401).json("unauthorized, not owner");
        return;
      }
      const { username } = await User.findOne({ username: usernameLook });
      if (username) {
        res.json({ found: true });
      } else {
        res.json({ found: false });
      }
    });
  }
};

module.exports = findUserRouter;
