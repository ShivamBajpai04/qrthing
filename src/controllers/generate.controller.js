import QRCode from "qrcode";
import fs from "fs";
import sharp from "sharp";
import axios from "axios";

function sanitizeFilename(str) {
    return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  }

export const normal = async (req, res) => {
  const url = req.body.url;
  const safeName = sanitizeFilename(url);
  const outputPath = `./output/${safeName}.png`;

  try {
    if (!fs.existsSync("./output")) fs.mkdirSync("./output");

    await QRCode.toFile(outputPath, url, {
      errorCorrectionLevel: "H",
      width: 256,
    });

    res.json({
      success: true,
      finalQR: `/output/${safeName}.png`,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ success: false });
  }
};

export const custom = async (req, res) => {
  const url = req.body.url;
  const safeName = sanitizeFilename(url);
  const outputPath = `./output/${safeName}_custom.png`;

  try {
    if (!fs.existsSync("./output")) fs.mkdirSync("./output");

    const qrBuffer = await QRCode.toBuffer(url, {
      errorCorrectionLevel: "H",
      width: 256,
    });
    const host = new URL(url).hostname;
    console.log(host);
    const overlayBuffer = await axios(
      `https://s2.googleusercontent.com/s2/favicons?domain=${host}`,
      {
        responseType: "arraybuffer",
      }
    );

    const resizedOverlayBuffer = await sharp(overlayBuffer.data)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(50, 50, { fit: "inside" })
      .png({ quality: 100 })
      .toBuffer();

    await sharp(qrBuffer)
      .composite([{ input: resizedOverlayBuffer, blend: "over" }])
      .toFile(outputPath);

    res.json({
      success: true,
      finalQR: `/output/${safeName}_custom.png`,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ success: false });
  }
};
