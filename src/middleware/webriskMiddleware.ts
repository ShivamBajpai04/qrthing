import { createRouteMatcher } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/api/generate(.*)"]);

export default async function webriskMiddleware(req: NextRequest) {
  // Only process API routes that match our pattern
  if (isPublicRoute(req)) {
    // Only check actual POST requests, not OPTIONS
    if (req.method === "POST") {
      try {
        // Clone the request to avoid consuming the original body
        const clonedReq = req.clone();
        let body;
        try {
          body = await clonedReq.json();
        } catch (e) {
          console.error("Failed to parse JSON body:", e);
          return NextResponse.next();
        }

        if (!body.url) {
          return NextResponse.next();
        }

        const host = btoa(new URL(body.url).hostname);
        const options = {
          method: "GET",
          url: `https://www.virustotal.com/api/v3/urls/${host}`,
          headers: {
            accept: "application/json",
            "x-apikey": process.env.RISK_CHECK_API_KEY,
          },
        };

        // If API key isn't set, just continue
        if (!process.env.RISK_CHECK_API_KEY) {
          console.warn("RISK_CHECK_API_KEY not set, skipping risk check");
          return NextResponse.next();
        }

        try {
          const result = await axios.request(options);
          if (result.data?.data) {
            return NextResponse.next();
          }
        } catch (error) {
          console.log("VirusTotal API error:", error);
          // If VirusTotal API fails, still allow request to proceed
          return NextResponse.next();
        }

        return NextResponse.json(
          { success: false, message: "Potentially malicious URL" },
          { status: 401 }
        );
      } catch (error) {
        console.error("Middleware error:", error);
        // Don't block requests due to middleware errors
        return NextResponse.next();
      }
    }
  }

  // For non-matching routes or methods, just continue
  return NextResponse.next();
}
