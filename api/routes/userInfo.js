const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const userInfoRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  if (_auth) {
    const jsonData = JSON.parse(_auth_state);
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const userDoc = await User.findById(userId);
      console.log(userDoc);
    //   const companyDoc = await Company.findById(companyId);
    //   companyDoc.set({
    //     owner: userDoc._id,
    //   });
    //   companyDoc.save();
        res.json("ok")
    });
  } else {
    req.status(401).json("token missing");
  }
};

module.exports = userInfoRouter;
