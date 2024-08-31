// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
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

const prompt = "rate my face ";
// Note: The only accepted mime types are some image types, image/*.
const imagePart = fileToGenerativePart(`./public/headshot.jpg`, "image/jpeg");

const getResponse = async () => {
  const result = await model.generateContent([prompt, imagePart]);
  console.log(result.response.text());
};
getResponse();
