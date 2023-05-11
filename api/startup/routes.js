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
const assignOwnerRouter = require("../routes/assign_owner");

module.exports = function (app) {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );
  app.get("/test", testRouter);
  app.post("/register", registerRouter);
  app.post("/assign_owner", assignOwnerRouter);
  //   app.use("/", indexRouter);
  //   app.use("/router1", router1Router);
  //   app.use("/router2", router2Router);
};
