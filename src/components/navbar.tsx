import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            Q
          </div>
          <span>QRthing</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignedOut>
            <Button variant="ghost" size="sm" className="font-medium">
              <SignInButton mode="modal" />
            </Button>
            <Button size="sm" className="h-9">
              <SignUpButton mode="modal" />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
