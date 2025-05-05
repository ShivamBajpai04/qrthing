import QRCode from "qrcode";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const hash = hasher(url).toString();
  const safeName = sanitizeFilename(hash);
  const outputPath = `./output/${safeName}.png`;

  try {
    if (!fs.existsSync("./output")) fs.mkdirSync("./output");

    await QRCode.toFile(outputPath, `${process.env.API_LINK}/${hash}`, {
      errorCorrectionLevel: "H",
      width: 256,
    });

    await prisma.url.create({
      data: {
        url,
        hash,
      },
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

function hasher(str: String) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

function sanitizeFilename(str: String) {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}
