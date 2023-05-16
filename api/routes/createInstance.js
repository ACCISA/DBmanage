const MongoClient = require("mongodb").MongoClient;
const Company = require("../models/Company");
const createInstanceRouter = (req, res) => {
  const { _auth, _auth_state } = req.cookies;
  const { collName } = req.body;
  if (_auth) {
    const jsonData = JSON.parse(_auth_state);
    jwt.verify(_auth, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      if (!jsonData.data.owner) {
        // check if owner
        res.status(401).json("unauthorized, not owner");
        return;
      }
      const userDoc = await User.findById(userId);
      const companyId = userDoc.companyId;
      const companyDoc = await Company.findById(companyId);
      const curInstances = companyDoc.instances;
      const MAX_INSTANCE = 4; // To be moved to config
      if (curInstances + 1 > MAX_INSTANCE) {
        res.status(422).json("max instances reached");
        return;
      }
      companyDoc.set({
        instances: curInstances + 1,
      });
      companyDoc.save();
    });
  } else {
    req.status(401).json("token missing");
  }
  console.log("tasd");
  MongoClient.connect(process.env.MONGO_URL)
    .then(async (client) => {
      const connect = client.db("instances");

      // New Collection
      const collection = await connect.createCollection(collName);
      console.log(collection._id);

      console.log("collection created");
    })
    .catch((err) => {
      // Handling the error
      console.log(err.Message);
    });
};

module.exports = createInstanceRouter;
