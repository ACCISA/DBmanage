const mangoose = require("mongoose");
const { Schema } = mangoose;

const UserSchema = new Schema({
  username: {type: String, unique: true },
  password: String,
  active: Boolean,
  root: Boolean,
  company: String,
  companyID: Number
});

const UserModel = mangoose.model("User", UserSchema);

module.exports = UserModel;