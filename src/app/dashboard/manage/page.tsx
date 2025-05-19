"use client";
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
import { useState } from "react";
import { useUserContext } from "@/context/user-context";
import Image from "next/image";
import { format } from "date-fns";

export default function ManagePage() {
  const { qrCodes, qrCodesLoading, qrCodesError, refreshQrCodes } =
    useUserContext();
  const [search, setSearch] = useState("");

  // Filter QR codes based on search term
  const filteredQrCodes = qrCodes.filter(
    (qr) =>
      qr.name.toLowerCase().includes(search.toLowerCase()) ||
      qr.url.toLowerCase().includes(search.toLowerCase())
  );

  if (qrCodesLoading) {
    return <div>Loading your QR codes...</div>;
  }

  if (qrCodesError) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Manage QR Codes</h2>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              Failed to load your QR codes: {qrCodesError}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refreshQrCodes()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Manage QR Codes</h2>
        <Card>
          <CardHeader>
            <CardTitle>Your QR Codes</CardTitle>
            <CardDescription>
              You have no QR codes yet. Create one to get started!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
              <Button onClick={() => refreshQrCodes()}>Refresh</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">QR Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Scans</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQrCodes.map((qr) => (
                <TableRow key={qr.id}>
                  <TableCell>
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border overflow-hidden">
                      {qr.imageUrl ? (
                        <Image
                          src={qr.imageUrl}
                          alt={qr.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <QrCode className="h-6 w-6" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{qr.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {qr.url}
                  </TableCell>
                  <TableCell>
                    {format(new Date(qr.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>{qr.accessCount.toLocaleString()}</TableCell>
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
