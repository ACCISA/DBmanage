const mangoose = require("mongoose");
const { Schema } = mangoose;

const UserSchema = new Schema({
  username: {type: String, unique: true },
  password: String,
  active: Boolean,
  root: Boolean, //root admin, should never be true
  company: String, 
  companyID: String, 
  owner: Boolean, // does the user a root user for a company
});

const UserModel = mangoose.model("User", UserSchema);

module.exports = UserModel;