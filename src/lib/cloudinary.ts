import { v2 as cloudinary } from "cloudinary";

// Validate Cloudinary environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Log warning if Cloudinary credentials are missing
if (!cloudName || !apiKey || !apiSecret) {
  console.warn(
    "⚠️ Cloudinary credentials are missing in .env.local file. QR code uploads will fail.",
    "\nPlease set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
  );
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName || "",
  api_key: apiKey || "",
  api_secret: apiSecret || "",
});

export default cloudinary;
