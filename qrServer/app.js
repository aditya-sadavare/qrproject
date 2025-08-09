const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const regModel = require("./models/reg");
const qrModel = require("./models/qr");
let secretKey = "MyQRDynamic";

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(
    mongoUri
  )
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log("Connection failed: " + err));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/reg", async (req, res) => {
  const { username, pass, name } = req.body;
  try {
    const user = await regModel.findOne({ username });
    if (user) {
      res.json({msg:"Account already exists with this username"});
    } else {
      await regModel.create({ username, pass, name });
      res.json({msg:"Account successfully created"});
    }
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

app.post("/login", async (req, res) => {
  let { username, pass } = req.body;
  try {
    const user = await regModel.findOne({ username, pass });
    if (user) {
      jwt.sign({ username, pass }, secretKey, (err, token) => {
        if (err) {
          return res.status(500).json({ msg: "Error generating token" });
        }
        res.json({ msg: "Login successful", token: token });
      });
    } else {
      res.json({ msg: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

app.post("/addqr", async (req, res) => {
  let { token, orgUrl } = req.body;
  try {
    const authData = jwt.verify(token, secretKey);
    const { username } = authData;
    const qr = await qrModel.findOne({ username, orgUrl });
    if (qr) {
      res.json({ msg: "URL already exists", uid: qr._id });
    } else {
      const newQr = await qrModel.create({ username, orgUrl });
      res.json({ msg: "URL added successfully", uid: newQr._id });
    }
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

app.get("/readqr/:uid", async (req, res) => {
  try {
    const data = await qrModel.findOne({ _id: req.params.uid });
    if (!data) {
      return res.status(404).json({ error: "QR Code not found" });
    }
    res.redirect("https://" + data.orgUrl);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/home", async (req, res) => {
  let { token } = req.body;
  try {
    const authData = jwt.verify(token, secretKey);
    const { username } = authData;
    const data = await qrModel.find({ username: username });
    if (data) {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateurl", async (req, res) => {
  const { id, newUrl, token } = req.body;
  try {
    const authData = jwt.verify(token, secretKey);
    const { username } = authData;
    const updatedQr = await qrModel.findOneAndUpdate(
      { _id: id, username },
      { orgUrl: newUrl },
      { new: true }
    );
    if (updatedQr) {
      res.json({ msg: "QR code URL updated successfully", updatedQr });
    } else {
      res.status(404).json({ error: "QR code not found or unauthorized" });
    }
  } catch (err) {
    console.error("Error updating QR code URL:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
