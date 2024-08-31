const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

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
    res.status(200).json({ message: "image uploaded successfully!" });
  });
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

app.post("/gemini", (req, res) => {
  try {
    const { message } = req.body;

    // Note: The only accepted mime types are some image types, image/*.
    const imagePart = fileToGenerativePart(`./${filePath}`, "image/jpeg");

    const getResponse = async () => {
      const result = await model.generateContent([message, imagePart]);
      res.status(200).send(result.response.text());
    };

    getResponse();
    // res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});

//getResponse();

app.listen(5000, () => {
  console.log("server is active on port 5000");
});
