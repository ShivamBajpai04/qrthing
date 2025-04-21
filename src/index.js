import QRCode from "qrcode";
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import sharp from "sharp";
import { Readable } from "stream";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/output", express.static("output"));

// Helper to sanitize filename
function sanitizeFilename(str) {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

// Helper to turn a buffer into a stream
function bufferToStream(buffer) {
  return Readable.from(buffer);
}

app.post("/generate", async (req, res) => {
  const url = req.body.url;
  const safeName = sanitizeFilename(url);
  const outputPath = `./output/final_${safeName}.png`;

  try {
    if (!fs.existsSync("./output")) fs.mkdirSync("./output");

    const qrBuffer = await QRCode.toBuffer(url, {
      errorCorrectionLevel: "H",
      width: 256,
    });

    const resizedOverlayBuffer = await sharp("overlay.png")
      .resize(100)
      .png()
      .toBuffer();

    await sharp(qrBuffer)
      .composite([{ input: resizedOverlayBuffer, blend: "over" }])
      .toFile(outputPath);

    res.json({
      success: true,
      finalQR: `/output/final_${safeName}.png`,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ success: false });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
