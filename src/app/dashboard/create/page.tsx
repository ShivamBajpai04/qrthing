"use client";

import { useState } from "react";
import { Download, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePage() {
  const [qrType, setQrType] = useState("url");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Create QR Code</h2>
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-1 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Information</CardTitle>
                  <CardDescription>
                    Enter the information you want to encode in your QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qr-type">QR Code Type</Label>
                    <Select defaultValue={qrType} onValueChange={setQrType}>
                      <SelectTrigger id="qr-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="vcard">vCard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {qrType === "url" && (
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" placeholder="https://example.com" />
                    </div>
                  )}

                  {qrType === "text" && (
                    <div className="space-y-2">
                      <Label htmlFor="text">Text</Label>
                      <Textarea id="text" placeholder="Enter your text here" />
                    </div>
                  )}

                  {qrType === "email" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject (Optional)</Label>
                        <Input id="subject" placeholder="Email subject" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="body">Body (Optional)</Label>
                        <Textarea id="body" placeholder="Email body" />
                      </div>
                    </div>
                  )}

                  {qrType === "phone" && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">QR Code Name</Label>
                    <Input id="name" placeholder="My QR Code" />
                    <p className="text-xs text-muted-foreground">
                      This name is for your reference only and won't be encoded
                      in the QR code.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Generate QR Code</Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>QR code preview</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="flex h-48 w-48 items-center justify-center rounded-md border-2 border-dashed">
                    <QrCode className="h-24 w-24 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced settings for your QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Error Correction Level</Label>
                <RadioGroup defaultValue="M" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="L" id="L" />
                    <Label htmlFor="L">Low (7%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="M" />
                    <Label htmlFor="M">Medium (15%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Q" id="Q" />
                    <Label htmlFor="Q">Quartile (25%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="H" id="H" />
                    <Label htmlFor="H">High (30%)</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground">
                  Higher error correction allows the QR code to remain readable
                  even if partially damaged or obscured.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">QR Code Size</Label>
                <Select defaultValue="5">
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Version 3 (29×29)</SelectItem>
                    <SelectItem value="4">Version 4 (33×33)</SelectItem>
                    <SelectItem value="5">Version 5 (37×37)</SelectItem>
                    <SelectItem value="6">Version 6 (41×41)</SelectItem>
                    <SelectItem value="7">Version 7 (45×45)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Larger versions can store more data but require more space to
                  scan.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Design Options</CardTitle>
              <CardDescription>
                Customize the appearance of your QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Colors</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foreground">Foreground Color</Label>
                    <div className="flex">
                      <Input
                        id="foreground"
                        type="color"
                        value="#000000"
                        className="w-12 p-1 h-10"
                      />
                      <Input value="#000000" className="ml-2 flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="background">Background Color</Label>
                    <div className="flex">
                      <Input
                        id="background"
                        type="color"
                        value="#FFFFFF"
                        className="w-12 p-1 h-10"
                      />
                      <Input value="#FFFFFF" className="ml-2 flex-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="logo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Download className="w-8 h-8 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG or GIF (MAX. 800x800px)
                      </p>
                    </div>
                    <Input id="logo-upload" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Design</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
