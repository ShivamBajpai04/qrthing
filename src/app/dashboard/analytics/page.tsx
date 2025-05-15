import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Globe, TrendingUp, Users } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <AnalyticsCard
          title="Total Scans"
          value="1,234"
          description="All time"
          icon={<BarChart3 className="h-5 w-5 text-muted-foreground" />}
          changeText="+12% from last month"
          changeIsPositive={true}
        />
        <AnalyticsCard
          title="Active QRs"
          value="12"
          description="Currently tracking"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
          changeText="+2 new this month"
          changeIsPositive={true}
        />
        <AnalyticsCard
          title="Unique Visitors"
          value="891"
          description="Across all QR codes"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          changeText="+5.3% from last month"
          changeIsPositive={true}
        />
       
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scan Activity</CardTitle>
            <CardDescription>
              Daily scan activity across all QR codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-md">
              Chart placeholder - Scan activity over time
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Performing QR Codes</CardTitle>
            <CardDescription>
              Your most actively scanned QR codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="font-medium">Website Homepage</div>
                <div className="text-muted-foreground">482 scans</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Product Catalog</div>
                <div className="text-muted-foreground">329 scans</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Event Registration</div>
                <div className="text-muted-foreground">185 scans</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Contact Form</div>
                <div className="text-muted-foreground">127 scans</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, value, description, icon, changeText, changeIsPositive }: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  changeText?: string;
  changeIsPositive?: boolean;
}) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {changeText && (
          <p className={`text-xs mt-2 ${changeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
            {changeText}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
