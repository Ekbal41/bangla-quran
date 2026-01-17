"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bookmark, Trash2, BookOpen, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { toBengaliNumber } from "@/lib/utils";

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
      const stored = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]"
      );
      return stored.sort(
        (a: BookmarkType, b: BookmarkType) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
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
          names[index + 1] = s.surahName;
        });
        setSurahNames(names);
      } catch (err) {
        console.error("Failed to load surah names:", err);
      }
    };

    const fetchBookmarks = () => {
      const stored = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]"
      );
      const sorted = stored.sort(
        (a: BookmarkType, b: BookmarkType) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setBookmarks(sorted);
    };

    fetchSurahNames();
    fetchBookmarks();

    const handleUpdate = () => {
      const stored = JSON.parse(
        localStorage.getItem("quran-bookmarks") || "[]"
      );
      const sorted = stored.sort(
        (a: BookmarkType, b: BookmarkType) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setBookmarks(sorted);
    };

    window.addEventListener("bookmarkUpdate", handleUpdate);
    return () => window.removeEventListener("bookmarkUpdate", handleUpdate);
  }, []);

  const removeBookmark = (key: string) => {
    const updated = bookmarks.filter((b) => b.key !== key);
    const sorted = updated.sort(
      (a: BookmarkType, b: BookmarkType) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setBookmarks(sorted);
    localStorage.setItem("quran-bookmarks", JSON.stringify(sorted));
    window.dispatchEvent(new Event("bookmarkUpdate"));
  };

  const clearAllBookmarks = () => {
    if (confirm("আপনি কি সব বুকমার্ক মুছে ফেলতে চান?")) {
      setBookmarks([]);
      localStorage.setItem("quran-bookmarks", JSON.stringify([]));
      window.dispatchEvent(new Event("bookmarkUpdate"));
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              আমার বুকমার্ক
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              সর্বশেষ সংরক্ষিত বুকমার্ক দেখানো হচ্ছে
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
            {bookmarks.map((bookmark, index) => (
              <Link
                key={index}
                href={
                  bookmark.ayahNo
                    ? `/surah/${bookmark.surahNo}#ayah-${bookmark.ayahNo}`
                    : `/surah/${bookmark.surahNo}`
                }
                className="block"
              >
                <Card
                  key={bookmark.key}
                  className={`group shadow-none hover:shadow-lg p-0 transition-all duration-200 dark:bg-gray-800`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-start gap-3">
                          <div
                            className={`hidden md:flex text-xl items-center justify-center w-14 h-14 rounded-sm text-emerald-700 dark:text-emerald-100 font-bold flex-shrink-0 bg-emerald-50 dark:bg-emerald-500/50`}
                          >
                            <BookOpen className="w-7 h-7" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {bookmark.surahName ||
                                surahNames[bookmark.surahNo] ||
                                `সূরা ${bookmark.surahNo}`}
                              {bookmark.ayahNo && (
                                <span className="ml-2 inline-flex items-center gap-1 text-sm font-medium border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                                  সূরা {toBengaliNumber(bookmark.surahNo)} /
                                  আয়াত {toBengaliNumber(bookmark.ayahNo)}
                                </span>
                              )}
                            </h3>

                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <time dateTime={bookmark.timestamp}>
                                {new Date(
                                  bookmark.timestamp
                                ).toLocaleDateString("bn-BD", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-end">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeBookmark(bookmark.key)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
