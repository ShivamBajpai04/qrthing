import { BarChart3, QrCode } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-5">
      <div className="flex items-center gap-4">
        <div className="relative">
          <QrCode className="h-10 w-10 text-primary animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 rounded-full border-2 border-background animate-spin border-t-transparent" />
          </div>
        </div>
        <div className="relative">
          <BarChart3 className="h-10 w-10 text-primary animate-pulse delay-100" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 rounded-full border-2 border-background animate-spin border-t-transparent animate-delay-200" />
          </div>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          Loading dashboard data...
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Please wait while we fetch your latest statistics
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 w-3/4 max-w-3xl mt-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-lg border border-border/30 bg-background/50 p-6 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
