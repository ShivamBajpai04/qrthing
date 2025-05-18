"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useTheme } from "next-themes";

interface ScanLocation {
  latitude: number;
  longitude: number;
  count: number;
}

export function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Sample data - in a real app, this would come from your API
  const scanLocations: ScanLocation[] = [
    { latitude: 40.7128, longitude: -74.006, count: 1245 }, // New York
    { latitude: 51.5074, longitude: -0.1278, count: 987 }, // London
    { latitude: 52.52, longitude: 13.405, count: 765 }, // Berlin
    { latitude: 48.8566, longitude: 2.3522, count: 654 }, // Paris
    { latitude: 35.6762, longitude: 139.6503, count: 543 }, // Tokyo
    { latitude: -33.8688, longitude: 151.2093, count: 432 }, // Sydney
    { latitude: 19.4326, longitude: -99.1332, count: 321 }, // Mexico City
    { latitude: -22.9068, longitude: -43.1729, count: 210 }, // Rio de Janeiro
    { latitude: 37.7749, longitude: -122.4194, count: 198 }, // San Francisco
    { latitude: 55.7558, longitude: 37.6173, count: 187 }, // Moscow
    { latitude: 1.3521, longitude: 103.8198, count: 176 }, // Singapore
    { latitude: 25.2048, longitude: 55.2708, count: 165 }, // Dubai
    { latitude: 41.9028, longitude: 12.4964, count: 154 }, // Rome
    { latitude: 31.2304, longitude: 121.4737, count: 143 }, // Shanghai
    { latitude: -26.2041, longitude: 28.0473, count: 132 }, // Johannesburg
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      drawMap();
    };

    // Load world map image
    const mapImage = new Image();
    mapImage.crossOrigin = "anonymous";
    mapImage.src = "/placeholder.svg?height=600&width=1200";
    mapImage.onload = () => {
      setLoading(false);
      resizeCanvas();
    };

    // Draw the map and plot points
    const drawMap = () => {
      if (!ctx || !canvas || loading) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw map background
      ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

      // Set point color based on theme
      const pointColor =
        theme === "dark" ? "rgba(220, 38, 38, 0.7)" : "rgba(220, 38, 38, 0.7)";
      const pointBorder =
        theme === "dark" ? "rgba(220, 38, 38, 1)" : "rgba(220, 38, 38, 1)";

      // Draw scan locations
      scanLocations.forEach((location) => {
        // Convert lat/long to x,y coordinates
        const x = (location.longitude + 180) * (canvas.width / 360);
        const y = (90 - location.latitude) * (canvas.height / 180);

        // Size based on count (normalized)
        const maxCount = Math.max(...scanLocations.map((l) => l.count));
        const minSize = 5;
        const maxSize = 20;
        const size =
          minSize + (location.count / maxCount) * (maxSize - minSize);

        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fillStyle = pointColor;
        ctx.fill();

        // Draw border
        ctx.strokeStyle = pointBorder;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    // Handle resize
    window.addEventListener("resize", resizeCanvas);

    // Initial draw
    resizeCanvas();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loading, scanLocations, theme]);

  return (
    <div className="relative w-full h-full min-h-[400px] p-1 sm:p-2">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="flex flex-col items-center gap-3">
            <Globe className="h-10 w-10 animate-pulse text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-background/80 p-3 rounded-md text-sm shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-3.5 w-3.5 rounded-full bg-red-600"></div>
          <span className="font-medium">QR Code Scans</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Size indicates number of scans
        </div>
      </div>
    </div>
  );
}
