import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ArrowRight, QrCode } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 md:px-10 lg:px-12 flex h-16 items-center justify-between">
        <div className="flex items-center gap-3 font-bold">
          <QrCode className="h-6 w-6" />
          <span>QRThing</span>
        </div>
        <nav className="hidden gap-8 md:flex"></nav>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <SignedOut>
            <SignInButton />
            {/* <SignUpButton /> */}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link href="/dashboard">
            <Button size="sm">
              Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
