import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for");
    console.log(ip);
    const location = await axios.get(`http://ip-api.com/json/${ip}`);
    return NextResponse.json(
      { success: true, data: location.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
