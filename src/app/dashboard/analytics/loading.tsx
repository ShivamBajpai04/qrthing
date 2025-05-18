import { BarChart3, QrCode } from "lucide-react";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Analytics Dashboard
        </h2>
        <div className="h-9 w-32 rounded-md bg-muted animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-lg border p-6 animate-pulse"
          >
            <div className="h-5 w-1/2 bg-muted rounded-md"></div>
            <div className="h-8 w-3/4 bg-muted rounded-md"></div>
            <div className="h-3 w-1/3 bg-muted/50 rounded-md mt-1"></div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border animate-pulse">
          <div className="p-6">
            <div className="h-6 w-1/3 bg-muted rounded-md"></div>
          </div>
          <div className="h-[240px] bg-muted/30 rounded-md mx-6 mb-6"></div>
        </div>
        <div className="rounded-lg border animate-pulse">
          <div className="p-6">
            <div className="h-6 w-1/3 bg-muted rounded-md"></div>
          </div>
          <div className="h-[240px] bg-muted/30 rounded-md mx-6 mb-6"></div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="relative">
          <BarChart3 className="h-12 w-12 text-primary/70 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-background animate-spin border-t-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
