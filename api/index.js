const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");
const axios = require("axios");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fsafsgassdgewtwegwg";

app.use(express.json());
app.use(cookieParser()); //for cookie parsing
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

//vwQdb1Z5NYSB9unr

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password not okay");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {},async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout' , (req,res) => {
    res.cookie('token','').json(true);
})

app.get("/flights", async (req, res) => {
  try {
    const response = await axios.get("https://api.schiphol.nl/public-flights/flights", {
      headers: {
        "ResourceVersion": "v4",
        "Accept": "application/json",
        "app_id": process.env.APP_ID, 
        "app_key": process.env.SCHIPHOL_API, 
      },
    });
    res.json(response.data); // Send the API data back to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/destinations/:iata", async (req, res) => {
  const { iata } = req.params; // Get the IATA code from the URL
  try {
    const response = await axios.get(`https://api.schiphol.nl/public-flights/destinations/${iata}`, {
      headers: {
        ResourceVersion: "v4",
        Accept: "application/json",
        app_id: process.env.APP_ID,
        app_key: process.env.SCHIPHOL_API,
      },
    });
    res.json(response.data); // Send the destination data back to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/destinations", async (req, res) => {
  try {
    const response = await axios.get("https://api.schiphol.nl/public-flights/destinations", {
      headers: {
        "ResourceVersion": "v4",
        "Accept": "application/json",
        "app_id": process.env.APP_ID, 
        "app_key": process.env.SCHIPHOL_API, 
      },
    });
    res.json(response.data); // Send the API data back to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.listen(4000);
