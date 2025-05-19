import QRCode from "qrcode";
import sharp from "sharp";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";
import prisma from "@/lib/prisma";
import { uploadBufferToCloudinary } from "@/lib/cloudinary-utils";
import {
  corsHeaders,
  handleOptionsRequest,
  hasher,
  sanitizeFilename,
} from "@/lib/api-utils";

// Use the shared OPTIONS handler
export const OPTIONS = handleOptionsRequest;

export async function POST(req: NextRequest) {
  try {
    const {
      url,
      name,
      creatorId,
    }: { url: string; name: string; creatorId: string } = await req.json();
    const hash = hasher(url);
    const safeName = sanitizeFilename(hash);
    const customName = `${safeName}_custom`;

    const qrBuffer = await QRCode.toBuffer(
      `${
        process.env.API_LINK || `${req.headers.get("origin")}/api/scan`
      }/${hash}`,
      {
        errorCorrectionLevel: "H",
        width: 256,
      }
    );

    const host = new URL(url).hostname;
    console.log(host);

    const overlayBuffer = await axios(
      `https://www.google.com/s2/favicons?sz=64&domain=${host}`,
      { responseType: "arraybuffer" }
    );

    const finalQrBuffer = await sharp(qrBuffer)
      .composite([
        {
          input: await sharp(overlayBuffer.data)
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .resize(50, 50, { fit: "inside" })
            .png({ quality: 100 })
            .toBuffer(),
          blend: "over",
        },
      ])
      .toBuffer();

    // Upload to Cloudinary using our utility function
    const uploadResult = await uploadBufferToCloudinary(
      finalQrBuffer,
      "qr-codes",
      customName
    );
    await prisma.url.create({
      data: {
        url,
        hash,
        name: name || "Untitled QR Code",
        creatorId: creatorId || "anonymous",
      },
    });

    return NextResponse.json(
      {
        success: true,
        path: uploadResult.secure_url,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.error("error:", err);
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message,
      },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }
}
