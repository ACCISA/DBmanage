const assignOwnerRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  const { companyId, userId } = req.body;
  const jsonData = JSON.parse(_auth_state);
  if (_auth) {
    jwt.verify(_auth, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.root) {
        res.status(401).json("unauthorized");
        return;
      }
      const userDoc = await User.findById(userId);
      const companyDoc = await Company.findById(companyId);
      companyDoc.set({
        owner: userDoc._id,
      });
      companyDoc.save();
    });
  }
};

module.exports = assignOwnerRouter;
