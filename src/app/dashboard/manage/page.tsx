import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, ExternalLink, MoreHorizontal, Trash2 } from "lucide-react";

export default function ManageQRPage() {
  const qrCodes = [
    {
      id: "qr1",
      name: "Website Homepage",
      url: "https://example.com",
      createdAt: "2025-03-15",
      scans: 482,
    },
    {
      id: "qr2",
      name: "Product Catalog",
      url: "https://example.com/products",
      createdAt: "2025-04-01",
      scans: 329,
    },
    {
      id: "qr3",
      name: "Event Registration",
      url: "https://example.com/event",
      createdAt: "2025-04-10",
      scans: 185,
    },
    {
      id: "qr4",
      name: "Contact Form",
      url: "https://example.com/contact",
      createdAt: "2025-04-22",
      scans: 127,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage QR Codes</h1>
        <Button>Create New QR</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your QR Codes</CardTitle>
          <CardDescription>
            Manage and track all your QR codes in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">URL</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
                  <th className="text-left py-3 px-4 font-medium">Scans</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {qrCodes.map((qr) => (
                  <tr
                    key={qr.id}
                    className="border-b last:border-b-0 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">{qr.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {qr.url.length > 25
                          ? qr.url.substring(0, 25) + "..."
                          : qr.url}
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {qr.createdAt}
                    </td>
                    <td className="py-3 px-4">{qr.scans}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
