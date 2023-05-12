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
const assignOwnerRouter = require("../routes/assignOwner.js");
const loginRouter = require("../routes/login");
const profileRouter = require("../routes/profie");
const deactivateRouter = require("../routes/deactivate");
const activateRouter = require("../routes/activate");
const usersRouter = require("../routes/users");
const assignCompanyRouter = require("../routes/assignCompany");
const findUserRouter = require("../routes/findUser");
const companiesRouter = require("../routes/companies");
const addCompaniesRouter = require("../routes/addCompanies");
const deleteUserRouter = require("../routes/deleteUser.js")

module.exports = function (app) {
  require("dotenv").config();
  mongoose.connect(process.env.MONGO_URL);

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
  app.post("/register", registerRouter);
  app.post("/add_company", addCompaniesRouter);
  app.post("/assign_owner", assignOwnerRouter);
  app.post("/login", loginRouter);
  app.get("/profile", profileRouter);
  app.post("/deactivate", deactivateRouter);
  app.post("/activate", activateRouter);
  app.get("/users", usersRouter);
  app.post("/assign_company", assignCompanyRouter);
  app.post("/delete_user", deleteUserRouter)
  //   app.use("/", indexRouter);
  //   app.use("/router1", router1Router);
  //   app.use("/router2", router2Router);
};
