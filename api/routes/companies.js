const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const companiesRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  if (_auth) {
    const jsonData = JSON.parse(_auth_state);
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.root) {
        // check if owner
        res.status(401).json("unauthorized");
        return;
      }
      const companyDocs = await Company.find();
      res.json(companyDocs);
    });
  } else {
    res.status(401).json("token missing");
  }
};

module.exports = companiesRouter;
