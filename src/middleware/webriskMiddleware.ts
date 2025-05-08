import { createRouteMatcher } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/api/generate(.*)"]);
console.log("here");
export default async function webriskMiddleware(req: NextRequest) {
  if (isPublicRoute(req)) {
    try {
      const { url } = await req.json();
      const host = btoa(new URL(url).hostname);
      const options = {
        method: "GET",
        url: `https://www.virustotal.com/api/v3/urls/${host}`,
        headers: {
          accept: "application/json",
          "x-apikey": process.env.RISK_CHECK_API_KEY,
        },
      };

      const result = await axios.request(options);
      const test = result.data.data;
      console.log(test);
      if (result) {
        return NextResponse.next();
      }
      return NextResponse.error();
    } catch (error) {
      console.log(error);
      NextResponse.json(
        { success: false, message: "Potentially malicious URL" },
        { status: 401 }
      );
    }
  }
}
