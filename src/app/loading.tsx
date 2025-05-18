import { QrCode } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative">
        <QrCode className="h-12 w-12 text-primary animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full border-2 border-background animate-spin border-t-transparent" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Loading</h2>
      <p className="text-sm text-muted-foreground">Please wait while we prepare your content...</p>
    </div>
  );
}
