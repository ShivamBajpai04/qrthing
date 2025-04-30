import QRCode from "qrcode";
import fs from "fs";
import sharp from "sharp";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

function sanitizeFilename(str: String) {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();
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

    return NextResponse.json(
      {
        success: true,
        finalQR: `/output/${safeName}_custom.png`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("error:", err);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 400 }
    );
  }
}
