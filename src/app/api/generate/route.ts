import QRCode from "qrcode";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

function sanitizeFilename(str: String) {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const safeName = sanitizeFilename(url);
  const outputPath = `./output/${safeName}.png`;

  try {
    if (!fs.existsSync("./output")) fs.mkdirSync("./output");

    await QRCode.toFile(outputPath, url, {
      errorCorrectionLevel: "H",
      width: 256,
    });

    return NextResponse.json(
      {
        success: true,
        finalQR: `/output/${safeName}.png`,
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
