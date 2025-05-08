import QRCode from "qrcode";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadBufferToCloudinary } from "@/lib/cloudinary-utils";
import {
  corsHeaders,
  handleOptionsRequest,
  hasher,
  sanitizeFilename,
} from "@/lib/api-utils";

// Add OPTIONS method to handle CORS preflight requests
export const OPTIONS = handleOptionsRequest;

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const hash = hasher(url).toString();
    const safeName = sanitizeFilename(hash);

    // Generate QR code as buffer
    const qrCodeBuffer = await QRCode.toBuffer(
      `${
        process.env.API_LINK || `${req.headers.get("origin")}/api/scan`
      }/${hash}`,
      {
        errorCorrectionLevel: "H",
        width: 256,
      }
    );

    // Upload to Cloudinary using our utility function
    const uploadResult = await uploadBufferToCloudinary(
      qrCodeBuffer,
      "qr-codes",
      safeName
    );

    // Save URL in database
    await prisma.url.create({
      data: {
        url,
        hash,
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
