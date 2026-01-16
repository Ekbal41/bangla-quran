// "use client";

import Link from "next/link";
import { Book, Bookmark, Home } from "lucide-react";
// import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  // const [darkMode, setDarkMode] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     return localStorage.getItem("darkMode") === "true";
  //   }
  //   return false;
  // });
  // const [bookmarkCount, setBookmarkCount] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const bookmarks = JSON.parse(
  //       localStorage.getItem("quran-bookmarks") || "[]"
  //     );
  //     return bookmarks.length;
  //   }
  // });

  // useEffect(() => {
  //   const isDark = localStorage.getItem("darkMode") === "true";
  //   if (isDark) {
  //     document.documentElement.classList.add("dark");
  //   }

  //   const handleStorage = () => {
  //     const bookmarks = JSON.parse(
  //       localStorage.getItem("quran-bookmarks") || "[]"
  //     );
  //     setBookmarkCount(bookmarks.length);
  //   };

  //   window.addEventListener("storage", handleStorage);
  //   window.addEventListener("bookmarkUpdate", handleStorage);

  //   return () => {
  //     window.removeEventListener("storage", handleStorage);
  //     window.removeEventListener("bookmarkUpdate", handleStorage);
  //   };
  // }, []);

  // const toggleDarkMode = () => {
  //   const newMode = !darkMode;
  //   setDarkMode(newMode);
  //   localStorage.setItem("darkMode", String(newMode));

  //   if (newMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // };

  return (
    <nav className="sticky top-0 z-50 bg-emerald-600 dark:bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition"
            prefetch
          >
            <Book className="w-8 h-8" />
            <span className="text-xl font-bold hidden sm:block">
              আল-কুরআন করিম V28
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10"
              >
                <Home className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">হোম</span>
              </Button>
            </Link>

            <Link href="/bookmarks">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10 relative"
              >
                <Bookmark className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">বুকমার্ক</span>
                {/* {bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {bookmarkCount}
                  </span>
                )} */}
              </Button>
            </Link>

            {/* <Button
              variant="ghost"
              onClick={toggleDarkMode}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
