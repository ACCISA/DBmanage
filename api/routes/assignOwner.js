const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const assignOwnerRouter = (req, res) => { // todo
  const { _auth, _auth_state } = req.cookies;
  const { company, username } = req.body;
  const jsonData = JSON.parse(_auth_state);
  if (_auth) {
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.root) {
        res.status(401).json("unauthorized");
        return;
      }
      const userDoc = await User.findOne({ username });
      const companyDoc = await Company.findOne({ name: company });

      if (userDoc == null || companyDoc == null) {
        res.status(422).json("unknown user");
        return;
      }

      // make sure user is not already owner of another company
      if (userDoc.owner) {
        console.log("user alreayd an owner")
        res.status(422).json("user owner");
        return;
      }
      console.log(companyDoc.owner)
      if (companyDoc.owner) {
        oldOwnerDoc = await User.findById(companyDoc.owner);
        oldOwnerDoc.set({
          owner: false,
          companyID: null,
        });
        oldOwnerDoc.save();

      }
      companyDoc.set({
        owner: userDoc._id,
      });
      companyDoc.save();

      userDoc.set({
        owner: true,
        company: companyDoc._id,
      });
      userDoc.save();
      res.json("new owner assigned");
    });
  } else {
    req.status(401).json("token missing");
  }
};

module.exports = assignOwnerRouter;
