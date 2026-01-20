"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function ModeToggleAndBookmark() {
  const { theme, setTheme } = useTheme();
  const [bookmarkCount, setBookmarkCount] = useState(() => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]",
      );
      return bookmarks.length;
    }
    return 0;
  });

  useEffect(() => {
    const handleStorage = () => {
      const bookmarks = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]",
      );
      setBookmarkCount(bookmarks.length);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("bookmarkUpdate", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("bookmarkUpdate", handleStorage);
    };
  }, []);

  return (
    <>
      <Link href="/bookmarks">
        <Button
          variant="ghost"
          className="text-white hover:text-white hover:bg-white/10 relative"
        >
          <Bookmark className="size-6 md:size-5" />
          <span className="hidden sm:inline font-semibold">বুকমার্ক</span>
          {bookmarkCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {bookmarkCount}
            </span>
          )}
        </Button>
      </Link>
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-white hover:bg-white/10 hover:text-white"
      >
        {theme === "dark" ? (
          <span className="flex items-center gap-2">
            <Sun className="size-6 md:size-5" />
            <span className="hidden sm:inline font-semibold">লাইট মোড</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Moon className="size-6 md:size-5" />
            <span className="hidden sm:inline font-semibold">ডার্ক মোড </span>
          </span>
        )}
      </Button>
    </>
  );
}
