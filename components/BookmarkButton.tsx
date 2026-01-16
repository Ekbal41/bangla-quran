"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BookmarkButtonProps {
  surahNo: number;
}

export default function BookmarkButton({ surahNo }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]"
      );
      return bookmarks.some((b: any) => b.surahNo === surahNo && !b.ayahNo);
    }
    return false;
  });

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const bookmarks = JSON.parse(
      localStorage.getItem("quran-bookmarks") || "[]"
    );
    const bookmarkKey = `surah-${surahNo}`;
    const existingIndex = bookmarks.findIndex(
      (b: any) => b.surahNo === surahNo && !b.ayahNo
    );

    if (existingIndex !== -1) {
      bookmarks.splice(existingIndex, 1);
      setIsBookmarked(false);
    } else {
      bookmarks.push({
        key: bookmarkKey,
        surahNo,
        timestamp: new Date().toISOString(),
      });
      setIsBookmarked(true);
    }

    localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
    window.dispatchEvent(new Event("bookmarkUpdate"));
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleBookmark}
      className={`${
        isBookmarked
          ? "text-yellow-600 hover:text-yellow-700 dark:text-yellow-500"
          : "text-gray-700 hover:text-gray-600 dark:text-gray-200"
      }`}
    >
      <Bookmark className={`size-4 ${isBookmarked ? "fill-current" : ""}`} />
      {isBookmarked ? "বুকমার্ক করা হয়েছে" : "বুকমার্ক করুন"}
    </Button>
  );
}
