const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const deactivateRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  const { id } = req.body;

  if (_auth) {
    const jsonData = JSON.parse(_auth_state);
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.root) {
        res.status(401).json("unauthorized");
      }
      try {
        const userDoc = await User.findById(id);
        userDoc.set({
          active: false,
        });
        userDoc.save();
        res.json("ok");
      } catch (e) {
        res.status(422).json("no user found");
      }
    });
  } else {
    req.status(401).json("token missing");
  }
};

module.exports = deactivateRouter;
