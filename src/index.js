import qr from "qr-image";
import express from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
app.use(express.json());

function startsWith(token, str) {
  console.assert(token.length <= str.length);
  for (let i = 0; i < token.length; i++) {
    if (token[i] != str[i]) {
      return false;
    }
  }
  return true;
}

app.post("/generate", (req, res) => {
  try {
    if (!fs.existsSync("./output")) {
      fs.mkdirSync("./output");
    }
    const url = req.body.url;
    const sanitizedUrl = url
      .trim()
      .replace("https://", "")
      .replace("http://", "");
    console.log(sanitizedUrl);
    const outPath = `./output/${sanitizedUrl}.png`;
    const code = qr.imageSync(sanitizedUrl, {
      type: "png",

      parse_url: true,
    });
    fs.writeFileSync(outPath, code);
    res.status(200).json({ message: "success", success: true });
  } catch (e) {
    res.status(400).json({ message: "Error", success: false });
    console.error(e);
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
