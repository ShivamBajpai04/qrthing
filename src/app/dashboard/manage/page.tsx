import { Edit, MoreHorizontal, QrCode, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ManagePage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Manage QR Codes</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your QR Codes</CardTitle>
              <CardDescription>
                View and manage all your QR codes
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  placeholder="Search QR codes..."
                  className="w-[250px] pl-8"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <Button>Create New</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">QR Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Scans</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: 1,
                  name: "Product Brochure",
                  type: "URL",
                  created: "May 15, 2023",
                  scans: 2345,
                },
                {
                  id: 2,
                  name: "Event Registration",
                  type: "URL",
                  created: "Jun 22, 2023",
                  scans: 1872,
                },
                {
                  id: 3,
                  name: "Contact Information",
                  type: "vCard",
                  created: "Jul 10, 2023",
                  scans: 1254,
                },
                {
                  id: 4,
                  name: "Discount Coupon",
                  type: "Text",
                  created: "Aug 05, 2023",
                  scans: 987,
                },
                {
                  id: 5,
                  name: "Support Email",
                  type: "Email",
                  created: "Sep 18, 2023",
                  scans: 654,
                },
              ].map((qr) => (
                <TableRow key={qr.id}>
                  <TableCell>
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{qr.name}</TableCell>
                  <TableCell>{qr.type}</TableCell>
                  <TableCell>{qr.created}</TableCell>
                  <TableCell>{qr.scans.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <QrCode className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
