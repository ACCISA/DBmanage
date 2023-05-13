const User = require("../models/User");
const Company = require("../models/Company");
const jwt = require("jsonwebtoken");

const removeOwnerRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  const { companyIDBody, userID } = req.body;
  const jsonData = JSON.parse(_auth_state);
  if (_auth) {
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.root) {
        res.status(401).json("unauthorized");
        return;
      }
      const userDoc = await User.findById(userID);
      const companyDoc = await Company.findById(companyIDBody);

      if (userDoc == null || companyDoc == null) {
        res.status(422).json("unknown user");
        return;
      }

      // make sure user is not already owner of another company

      if (companyDoc.owner) {
        oldOwnerDoc = await User.findById(companyDoc.owner);
        if (oldOwnerDoc) {
          oldOwnerDoc.set({
            owner: false,
            companyID: null,
            company: null,
          });
          oldOwnerDoc.save();
        }
        companyDoc.set({
          owner: null,
        });
        companyDoc.save();
        res.json("owner removed")
      } else {
        res.status(422).json("company has no owner");
      }
    });
  } else {
    req.status(401).json("token missing");
  }
};

module.exports = removeOwnerRouter;
