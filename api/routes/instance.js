const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const instanceRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  if (_auth) {
    const jsonData = JSON.parse(_auth_state);
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.owner) {
        // check if owner
        res.status(401).json("unauthorized, not owner");
        return;
      }

      // TODO
    });
  } else {
    req.status(401).json("token missing");
  }
};

module.exports = instanceRouter;
