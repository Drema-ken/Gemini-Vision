const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();

app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
let filePath;
const upload = multer({ storage: storage }).single("file");
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
    console.log("here");
  });
});
app.listen(5000, () => {
  console.log("server is running on port", 5000);
});
