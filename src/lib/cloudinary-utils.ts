import cloudinary from "./cloudinary";
import { Readable } from "stream";

/**
 * CloudinaryUploadResult interface for type safety
 */
export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  folder?: string;
}

/**
 * Uploads a buffer to Cloudinary
 * @param buffer - The buffer to upload
 * @param folder - The folder in Cloudinary to store the image in
 * @param publicId - Optional public ID for the image
 * @returns Promise resolving to the Cloudinary upload result
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder = "qr-codes",
  publicId?: string
): Promise<CloudinaryUploadResult> {

  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error("No result returned from Cloudinary"));
        }
        resolve(result as CloudinaryUploadResult);
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  });
}

/**
 * Uploads a file to Cloudinary
 * @param file - The file to upload (from a browser form)
 * @param folder - The folder in Cloudinary to store the image in
 * @param publicId - Optional public ID for the image
 * @returns Promise resolving to the Cloudinary upload result
 */
export async function uploadFileToCloudinary(
  file: File,
  folder = "qr-codes",
  publicId?: string
): Promise<CloudinaryUploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return uploadBufferToCloudinary(buffer, folder, publicId);
}
