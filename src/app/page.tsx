import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, QrCode, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {" "}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 md:px-10 lg:px-12 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 font-bold">
            <QrCode className="h-6 w-6" />
            <span>QRThing</span>
          </div>
          <nav className="hidden gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">
                Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {" "}
        <section className="space-y-8 pb-12 pt-16 md:pb-16 md:pt-28 lg:py-36">
          <div className="container mx-auto px-6 md:px-10 lg:px-12 flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Generate, Track, and Analyze QR Codes
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Create custom QR codes for your business and track their
              performance with powerful analytics.
            </p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
              <Link href="/dashboard/create">
                <Button size="lg">
                  Create Your First QR Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>{" "}
        <section
          id="features"
          className="container mx-auto px-6 md:px-10 lg:px-12 space-y-16 py-16 md:py-28"
        >
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-5 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Everything you need to create, manage, and analyze QR codes for
              your business.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <QrCode className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Custom QR Codes</h3>
              <p className="text-muted-foreground">
                Create branded QR codes with your logo, colors, and custom
                designs.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Track scans in real-time and get insights on when and where your
                QR codes are being used.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Get detailed analytics on your QR code performance, including
                geographic data and device information.
              </p>
            </div>
          </div>
        </section>{" "}
        <section
          id="pricing"
          className="container mx-auto px-6 md:px-10 lg:px-12 space-y-16 py-16 md:py-28"
        >
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-5 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pricing
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Simple, transparent pricing for businesses of all sizes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col rounded-lg border p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="mt-1.5 text-muted-foreground">
                  For individuals and small projects
                </p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">$9</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
              <ul className="mb-8 flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 50 QR codes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button className="mt-auto">Get Started</Button>
            </div>
            <div className="flex flex-col rounded-lg border border-primary p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="mt-1.5 text-muted-foreground">
                  For growing businesses
                </p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
              <ul className="mb-8 flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 500 QR codes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom branding</span>
                </li>
              </ul>
              <Button className="mt-auto">Get Started</Button>
            </div>
            <div className="flex flex-col rounded-lg border p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="mt-1.5 text-muted-foreground">
                  For large organizations
                </p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
              <ul className="mb-8 flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Unlimited QR codes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Enterprise analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Button className="mt-auto">Contact Sales</Button>
            </div>
          </div>
        </section>{" "}
        <section className="bg-muted/50 py-16 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-12 flex flex-col items-center justify-center gap-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to get started?
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Create your first QR code in minutes and start tracking your
              results.
            </p>
            <Link href="/dashboard/create">
              <Button size="lg" className="mt-4">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>{" "}
      <footer className="border-t py-8 md:py-10">
        <div className="container mx-auto px-6 md:px-10 lg:px-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3 font-bold">
            <QrCode className="h-5 w-5" />
            <span>QRThing</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} QRTrack. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
