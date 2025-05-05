import prisma from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { hash: string } }
) {
  const { hash } = await params;
  try {
    if (!hash) {
      return NextResponse.json(
        { success: false, message: "Hash not provided" },
        { status: 400 }
      );
    }
    const url = await prisma.url.findUnique({
      where: { hash: hash },
    });
    await prisma.url.update({
      where: { hash: hash },
      data: { accessCount: { increment: 1 } },
    });
    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL not found" },
        { status: 404 }
      );
    }
    const ip = req.headers.get("x-forwarded-for");

    console.log(ip);
    const location = await axios.get(`http://ip-api.com/json/${ip}`);
    console.log(location.data);
    return NextResponse.redirect(url.url);
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
