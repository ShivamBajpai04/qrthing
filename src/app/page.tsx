"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQRCode = async (type: "basic" | "custom") => {
    setLoading(true);
    setError("");
    try {
      if (!url) {
        throw new Error("Please enter a URL");
      }

      const endpoint =
        type === "basic" ? "/api/generate" : "/api/generate/custom";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate QR code: ${response.statusText}`);
      }

      const data = await response.json();
      // Store the full Cloudinary URL
      setQrCodeUrl(data.path);
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>

        <div className="mb-4">
          <label htmlFor="url" className="block mb-2 font-medium">
            Enter URL
          </label>
          <input
            id="url"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <Button onClick={() => generateQRCode("basic")} disabled={loading}>
            Generate Basic QR Code
          </Button>
          <Button
            onClick={() => generateQRCode("custom")}
            disabled={loading}
            variant="outline"
          >
            Generate Custom QR Code with Favicon
          </Button>
        </div>

        {loading && <p>Generating QR code...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {qrCodeUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated QR Code:</h2>
            <div className="border p-4 inline-block">
              <img
                src={qrCodeUrl}
                alt="Generated QR Code"
                className="max-w-xs"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">Image URL: {qrCodeUrl}</p>
          </div>
        )}
      </main>
    </>
  );
}
