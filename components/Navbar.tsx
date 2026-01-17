import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggleAndBookmark from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-emerald-600 dark:bg-emerald-800 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition"
            prefetch
          >
            <img src="/quran.png" alt="আল-কুরআন" className="size-9" />
            <span className="text-xl font-bold hidden sm:block">আল-কুরআন</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">হোম</span>
              </Button>
            </Link>
            <ModeToggleAndBookmark />
          </div>
        </div>
      </div>
    </nav>
  );
}
