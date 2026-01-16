"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bookmark, Trash2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface BookmarkType {
  key: string;
  surahNo: number;
  ayahNo?: number;
  surahName?: string;
  timestamp: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("quran-bookmarks") || "[]");
    }
    return [];
  });

  const [surahNames, setSurahNames] = useState<Record<number, string>>({});
  useEffect(() => {
    const fetchSurahNames = async () => {
      try {
        const res = await fetch("https://quranapi.pages.dev/api/surah.json");
        const data = await res.json();
        const names: Record<number, string> = {};
        data.forEach((s: any, index: number) => {
          names[index + 1] = s.surahNameTranslation;
        });
        setSurahNames(names);
      } catch (err) {
        console.error("Failed to load surah names:", err);
      }
    };

    // Load bookmarks from localStorage
    const fetchBookmarks = () => {
      const stored = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]"
      );
      setBookmarks(stored);
    };

    fetchSurahNames();
    fetchBookmarks();

    const handleUpdate = () => {
      const updated = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]"
      );
      setBookmarks(updated);
    };

    window.addEventListener("bookmarkUpdate", handleUpdate);
    return () => window.removeEventListener("bookmarkUpdate", handleUpdate);
  }, []);

  // Remove single bookmark
  const removeBookmark = (key: string) => {
    const updated = bookmarks.filter((b) => b.key !== key);
    setBookmarks(updated);
    localStorage.setItem("quran-bookmarks", JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarkUpdate"));
  };

  // Clear all bookmarks
  const clearAllBookmarks = () => {
    if (confirm("আপনি কি সব বুকমার্ক মুছে ফেলতে চান?")) {
      setBookmarks([]);
      localStorage.setItem("quran-bookmarks", JSON.stringify([]));
      window.dispatchEvent(new Event("bookmarkUpdate"));
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              আমার বুকমার্ক
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {bookmarks.length} টি বুকমার্ক সংরক্ষিত
            </p>
          </div>
          {bookmarks.length > 0 && (
            <Button
              variant="destructive"
              onClick={clearAllBookmarks}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">সব মুছুন</span>
            </Button>
          )}
        </div>

        {/* Bookmarks List */}
        {bookmarks.length === 0 ? (
          <Card className="text-center py-16 dark:bg-gray-800">
            <CardContent>
              <Bookmark className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                কোন বুকমার্ক নেই
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                সূরা বা আয়াত বুকমার্ক করতে বুকমার্ক আইকনে ক্লিক করুন
              </p>
              <Link href="/">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  সূরা তালিকায় যান
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bookmark) => (
              <Card
                key={bookmark.key}
                className="group hover:shadow-lg p-0 transition-all duration-200 dark:bg-gray-800"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={
                          bookmark.ayahNo
                            ? `/surah/${bookmark.surahNo}#ayah-${bookmark.ayahNo}`
                            : `/surah/${bookmark.surahNo}`
                        }
                        className="block hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex text-2xl items-center justify-center w-14 h-14 rounded-sm bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold flex-shrink-0">
                            {bookmark.surahNo}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {bookmark.surahName ||
                                surahNames[bookmark.surahNo] ||
                                `সূরা ${bookmark.surahNo}`}
                            </h3>
                            {bookmark.ayahNo && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                আয়াত {bookmark.ayahNo}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {new Date(bookmark.timestamp).toLocaleDateString(
                                "bn-BD",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeBookmark(bookmark.key)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" /> মুছুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
