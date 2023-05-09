const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
// const Family = require("./models/Family.js");
// const Member = require("./models/Member.js");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const secret = bcrypt.genSaltSync(10);
const jwtSecret = "fafafa";
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});




app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, secret),
    });
    res.json(userDoc);
  } catch (e) {
    if (e.code == 11000){
      res.status(422).json('username already exists');
    } else {
      res.status(500).json('unknown error')
    }
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { username: userDoc.username, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(401).json("invalid credentials");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { username, _id } = await User.findById(user.id);
      res.json({ username, _id });
    });
  } else {
    res.json(null);
  }
});

// app.post("/logout", (req, res) => {
//   res.cookie("token", "").json(true);
// });


app.listen(4000);