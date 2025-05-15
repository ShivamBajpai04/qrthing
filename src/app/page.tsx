import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, MapPin, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="space-y-5 max-w-[800px] mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Make smart QR codes that track everything
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[650px] mx-auto">
                Create, manage, and analyze QR codes with powerful analytics.
                Track scans, locations, and more in real-time.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              <Button size="lg" asChild className="h-12 px-8 shadow-sm">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2"
                >
                  Get started free <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 shadow-sm"
              >
                <Link href="/dashboard">See dashboard</Link>
              </Button>
            </div>
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl border shadow-xl mt-4">
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 z-10 pointer-events-none" />
              <Image
                src="/placeholder.svg?height=720&width=1280"
                width={1280}
                height={720}
                alt="QRthing Dashboard Preview"
                className="w-full transition-transform hover:scale-105 duration-700"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="max-w-[800px] mx-auto text-center mb-12 lg:mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                Powerful QR code analytics
              </h2>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                Our feature-rich platform gives you everything you need to
                create and track your QR codes
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center transition-all hover:border-primary/50 hover:shadow-md h-full">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <BarChart3 className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Real-time scan analytics
                </h3>
                <p className="text-muted-foreground">
                  Track scans as they happen with detailed analytics and
                  insights to optimize your campaigns.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center transition-all hover:border-primary/50 hover:shadow-md h-full">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <MapPin className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Location tracking via map
                </h3>
                <p className="text-muted-foreground">
                  See where your QR codes are being scanned with detailed
                  geographic data and heatmaps.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center sm:col-span-2 lg:col-span-1 transition-all hover:border-primary/50 hover:shadow-md h-full">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Palette className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Custom branded QR codes
                </h3>
                <p className="text-muted-foreground">
                  Create beautiful, branded QR codes that match your company's
                  identity and increase engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 lg:items-center max-w-6xl mx-auto">
              <div className="flex flex-col justify-center space-y-6 lg:w-1/2 px-1">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Powerful dashboard for all your QR needs
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our intuitive dashboard gives you all the tools you need to
                  create, manage, and analyze your QR codes in one place.
                </p>
                <ul className="space-y-5 py-2">
                  <li className="flex items-center gap-3.5">
                    <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="size-2.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-base">
                      Real-time analytics and reporting
                    </span>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="size-2.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-base">
                      Global scan location tracking
                    </span>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="size-2.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-base">Custom QR code generation</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button className="w-fit px-6" size="lg" asChild>
                    <Link href="/sign-up">Get started</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl transition-all hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10 pointer-events-none" />
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="QRthing Dashboard Preview"
                    className="w-full transition-transform hover:scale-105 duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </main>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <div className="size-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs">
              Q
            </div>
            <span className="text-base">QRthing</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} QRthing. All rights reserved.
          </p>
          <div className="flex gap-7 flex-wrap justify-center md:justify-end">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline hover:text-foreground/80 transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline hover:text-foreground/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline hover:text-foreground/80 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
