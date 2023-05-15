const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: {type: String, unique: true },
  accounts: [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
  owner: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
  instances: {type: Number, default: 0},
  databaseIDs: [String]
});

const UserModel = mongoose.model("Company", CompanySchema);

module.exports = UserModel;