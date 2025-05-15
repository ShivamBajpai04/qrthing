// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, ArrowRight, BarChart3, PlusCircle, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Dashboard() {
  const user = {
    firstName: "John",
    emailAddresses: [{ emailAddress: "john@example.com" }],
  };

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <DashboardCard
          title="Total QR Codes"
          value="12"
          description="Active QR codes in your account"
          icon={<Activity className="h-5 w-5 text-muted-foreground" />}
        />
        <DashboardCard
          title="Total Scans"
          value="1,234"
          description="Across all your QR codes"
          icon={<BarChart3 className="h-5 w-5 text-muted-foreground" />}
        />
        <DashboardCard
          title="Conversion Rate"
          value="3.2%"
          description="Average across all campaigns"
          icon={<BarChart3 className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Create QR Code
            </CardTitle>
            <CardDescription>
              Generate a new QR code for your website, product, or event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/create" className="flex items-center justify-center gap-2">
                Create New QR <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics
            </CardTitle>
            <CardDescription>
              View scan statistics and insights for your QR codes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/analytics" className="flex items-center justify-center gap-2">
                View Analytics <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Manage QR Codes
            </CardTitle>
            <CardDescription>
              Edit, delete or organize your existing QR codes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/manage" className="flex items-center justify-center gap-2">
                Manage QRs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, description, icon }:{ title: string; value: string; description: string; icon: React.ReactNode; }) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

      <footer className="border-t py-6">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} QRthing. All rights reserved.
        </div>
      </footer>
