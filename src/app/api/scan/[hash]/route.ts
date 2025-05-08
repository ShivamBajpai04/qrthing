import prisma from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/lib/api-utils";

// This is the standard App Router pattern for route handlers with dynamic segments
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ hash: string }> }
) {
  const { hash } = await context.params;
  try {
    if (!hash) {
      return NextResponse.json(
        { success: false, message: "Hash not provided" },
        { status: 400, headers: corsHeaders }
      );
    }

    const url = await prisma.url.findUnique({
      where: { hash },
    });

    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Update access count
    await prisma.url.update({
      where: { hash },
      data: { accessCount: { increment: 1 }, lastAccessedAt: new Date() },
    });

    const ip = request.headers.get("x-forwarded-for");
    console.log(ip);

    const location = await axios.get(`http://ip-api.com/json/${ip}`);
    console.log(location.data);

    await prisma.scan.create({
      data: {
        latitude: location.data.lat,
        longitude: location.data.lon,
        Url: {
          connect: {
            id: url.id,
          },
        },
      },
    });

    return NextResponse.redirect(url.url);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400, headers: corsHeaders }
    );
  }
}
