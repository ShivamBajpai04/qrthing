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
 *
 * This function creates a short, URL-friendly hash that's more collision-resistant
 * than the previous implementation. It uses a combination of input data, timestamp,
 * and cryptographic randomness to generate unique, URL-friendly identifiers.
 *
 * @param str - The string to hash (typically a URL with additional metadata)
 * @param length - The desired length of the output hash (defaults to 8 characters)
 * @returns A URL-friendly hash string
 */
export function hasher(str: String, length: number = 32): string {
  // Create a text encoder to handle UTF-8 encoding properly
  const encoder = new TextEncoder();
  const data = encoder.encode(str.toString());

  // Helper function to convert to Base62 (alphanumeric, URL-friendly)
  const toBase62 = (uint8Array: Uint8Array): string => {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    // Convert the Uint8Array to a Base62 string
    for (let i = 0; i < uint8Array.length; i++) {
      result += chars[uint8Array[i] % 62];
    }

    return result;
  };

  // Create a simple hash if in an environment without crypto
  if (typeof crypto === "undefined") {
    // Fallback to a simpler hash function
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Convert to Base62 as best we can
    let result = "";
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const absHash = Math.abs(hash);
    for (let i = 0; i < length; i++) {
      result += chars[absHash % chars.length];
    }

    return result;
  }

  // For modern environments with crypto support
  const hashBuffer = new Uint8Array(length);

  // Mix in the input data
  for (let i = 0; i < data.length; i++) {
    hashBuffer[i % length] ^= data[i];
  }

  // Add a timestamp component to reduce collision probability
  const timestamp = Date.now().toString();
  for (let i = 0; i < timestamp.length; i++) {
    hashBuffer[i % length] ^= timestamp.charCodeAt(i);
  }

  // Add some randomness to further reduce collisions
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);
  for (let i = 0; i < length; i++) {
    hashBuffer[i] = (hashBuffer[i] + randomBytes[i]) % 256;
  }

  // Convert to Base62
  const hashString = toBase62(hashBuffer);

  // Return the first 'length' characters
  return hashString.slice(0, length);
}

/**
 * Sanitize a string for use as a filename
 */
export function sanitizeFilename(str: String) {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}
