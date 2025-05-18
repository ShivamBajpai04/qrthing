import { QrCode } from "lucide-react";

export default function ManageQRLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Manage QR Codes</h2>
        <div className="h-9 w-32 rounded-md bg-muted animate-pulse"></div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="h-10 w-64 bg-muted/50 rounded-md animate-pulse"></div>
        <div className="h-10 w-32 bg-muted/50 rounded-md animate-pulse"></div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <div className="bg-muted/20 p-4">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>

        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-t p-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              <div className="col-span-2 flex items-center gap-3">
                <div className="h-10 w-10 bg-muted/50 rounded-md animate-pulse"></div>
                <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
              </div>
              <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
              <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
              <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
              <div className="flex justify-end gap-2">
                <div className="h-8 w-8 bg-muted/50 rounded-md animate-pulse"></div>
                <div className="h-8 w-8 bg-muted/50 rounded-md animate-pulse"></div>
                <div className="h-8 w-8 bg-muted/50 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="relative">
          <QrCode className="h-12 w-12 text-primary/70 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-background animate-spin border-t-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
