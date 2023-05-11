const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const assignCompanyRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  const { companyId, userId, user } = req.body; // the use found must exist see /find_user
  const jsonData = JSON.parse(_auth_state);
  if (_auth) {
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.owner) {
        // check if owner
        res.status(401).json("unauthorized, not owner");
        return;
      }
      const userDoc = await User.findById(userId);
      if (userDoc.companyID != companyId) {
        // check if right company
        res.stauts(401).json("unauthorized, owner but invalid companyId");
        return;
      }
      const companyDoc = await Company.findById(companyId);
      companyDoc.set({
        owner: userDoc._id,
      });
      companyDoc.save();
    });
  }
};

module.exports = assignCompanyRouter;
