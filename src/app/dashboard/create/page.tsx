import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateQRPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create QR Code</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>URL QR Code</CardTitle>
            <CardDescription>
              Create a QR code that links to a website or webpage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="url" className="text-sm font-medium">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  placeholder="https://example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button type="submit" className="w-full">
                Generate QR Code
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom QR Code</CardTitle>
            <CardDescription>
              Create a branded QR code with custom colors and logo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="customUrl" className="text-sm font-medium">
                  Website URL
                </label>
                <input
                  type="url"
                  id="customUrl"
                  placeholder="https://example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="color" className="text-sm font-medium">
                  QR Color
                </label>
                <input
                  type="color"
                  id="color"
                  defaultValue="#000000"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Custom QR
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
