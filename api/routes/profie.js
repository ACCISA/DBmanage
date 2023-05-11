const profileRouter = (req, res) => {
  const { _auth } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const { username, _id, active, root } = await User.findById(user.id);
      res.json({ username, _id, active, root });
    });
  } else {
    res.json(null);
  }
};

module.exports = profileRouter;
