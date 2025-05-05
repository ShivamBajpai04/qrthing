import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 z-50">
      <SignedOut>
        <Button>
          <>
            <SignInButton />
          </>
        </Button>
        <Button>
          <>
            <SignUpButton />
          </>
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
