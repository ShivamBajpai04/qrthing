import { PlusCircle, QrCode } from "lucide-react";

export default function CreateQRLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Create New QR Code
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-lg border p-6 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded-md"></div>
          <div className="grid gap-4">
            <div className="h-10 w-full bg-muted/50 rounded-md"></div>
            <div className="h-10 w-full bg-muted/50 rounded-md"></div>
            <div className="h-[120px] w-full bg-muted/50 rounded-md"></div>
          </div>
          <div className="h-10 w-1/3 bg-muted/70 rounded-md mt-2 self-end"></div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-8 h-[380px]">
          <div className="relative">
            <QrCode className="h-32 w-32 text-primary/60 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-2 border-background animate-spin border-t-transparent" />
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="h-6 w-40 bg-muted rounded-md mx-auto mb-2"></div>
            <div className="h-4 w-56 bg-muted/50 rounded-md mx-auto"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="relative">
          <PlusCircle className="h-12 w-12 text-primary/70 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-background animate-spin border-t-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
