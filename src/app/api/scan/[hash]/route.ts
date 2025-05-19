import { Resend } from "resend";
import prisma from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/lib/api-utils";
import { sendScanNotification } from "@/lib/email";

// This is the standard App Router pattern for route handlers with dynamic segments
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ hash: string }> }
) {
  const { hash } = await context.params;
  const url = await prisma.url.findUnique({
    where: { hash },
  });
  try {
    if (!hash) {
      return NextResponse.json(
        { success: false, message: "Hash not provided" },
        { status: 400, headers: corsHeaders }
      );
    }

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

    // const resend = new Resend("re_3RvgNDJ9_MtvSDo3kTijssX6HiYuFSFUH");

    // resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "shivambajpai04@gmail.com",
    //   subject: "Hello World",
    //   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    // });
    // sendScanNotification(
    //   url.url,
    //   url.creatorId,
    //   location.data.city
    // );

    return NextResponse.redirect(url.url);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(url ? url.url : "google.com");
  }
}
