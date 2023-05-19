const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../models/User.js");
const Company = require("../models/Company.js");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const testRouter = require("../routes/test");
const registerRouter = require("../routes/register");
const assignOwnerRouter = require("../routes/assignOwner");
const loginRouter = require("../routes/login");
const profileRouter = require("../routes/profie");
const deactivateRouter = require("../routes/deactivate");
const activateRouter = require("../routes/activate");
const usersRouter = require("../routes/users");
const assignCompanyRouter = require("../routes/assignCompany");
const findUserRouter = require("../routes/findUser");
const companiesRouter = require("../routes/companies");
const addCompaniesRouter = require("../routes/addCompanies");
const deleteUserRouter = require("../routes/deleteUser");
const ownersRouter = require("../routes/owners");
const removeOwnerRouter = require("../routes/removeOwner");
const deleteCompanyRouter = require("../routes/deleteCompany");
const instanceRouter = require("../routes/instance");
const createInstanceRouter = require("../routes/createInstance");

module.exports = function (app) {
  require("dotenv").config();
  mongoose.connect(process.env.MONGO_URL);

  // createInstanceRouter()
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );
  app.get("/test", testRouter);
  app.get("/find_user", findUserRouter);
  app.get("/companies", companiesRouter);
  app.get("/users", usersRouter);
  app.get("/owners", ownersRouter);
  app.get("/profile", profileRouter);
  app.get("/instance", instanceRouter);

  app.post("/register", registerRouter);
  app.post("/add_company", addCompaniesRouter);
  app.post("/assign_owner", assignOwnerRouter);
  app.post("/login", loginRouter);
  app.post("/deactivate", deactivateRouter);
  app.post("/activate", activateRouter);

  app.post("/assign_company", assignCompanyRouter);
  app.post("/remove_owner", removeOwnerRouter);
  app.post("/delete_user", deleteUserRouter);

  app.post("/delete_company", deleteCompanyRouter);
  //   app.use("/", indexRouter);
  //   app.use("/router1", router1Router);
  //   app.use("/router2", router2Router);
};
