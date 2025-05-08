import { NextResponse } from "next/server";

/**
 * Standard CORS headers for API responses
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * Handler for OPTIONS requests (CORS preflight)
 */
export function handleOptionsRequest() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * Hash function to create QR code identifiers
 */
export function hasher(str: String) {
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

/**
 * Sanitize a string for use as a filename
 */
export function sanitizeFilename(str: String) {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}