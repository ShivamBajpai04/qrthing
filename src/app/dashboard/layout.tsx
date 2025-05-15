import Navbar from "@/components/navbar";
import { Sidebar, dashboardNavItems } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex">
        <div className="hidden md:flex w-64 flex-col border-r h-[calc(100vh-4rem)] sticky top-16">
          <div className="p-4 font-semibold text-lg border-b">Dashboard</div>
          <div className="flex-1 py-6">
            <Sidebar items={dashboardNavItems} />
          </div>
        </div>

        <div className="flex-1">
          <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
