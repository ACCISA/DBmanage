const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const profileRouter = (req, res) => {
  const { _auth } = req.cookies;
  if (_auth) {
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const { username, _id, active, root, company, companyID } = await User.findById(user.id);
      res.json({ username, _id, active, root, company, companyID });
    });
  } else {
    res.json(null);
  }
};

module.exports = profileRouter;
