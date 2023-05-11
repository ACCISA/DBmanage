const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const addCompaniesRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  const { companyName } = req.body;
  const jsonData = JSON.parse(_auth_state);
  if (_auth) {
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.root) {
        // check if owner
        res.status(401).json("unauthorized");
        return;
      }
      try {
        const company = await Company.create({
          name: companyName,
        });
        res.json(company);
      } catch (e) {
        if (e.code == 11000) {
          res.status(422).json("company name duplicate");
        } else {
          res.status(500).json("unknown error");
        }
      }
    });
  }
};

module.exports = addCompaniesRouter;
