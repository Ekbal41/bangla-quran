'use cache';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, MapPin } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";
import { Badge } from "@/components/ui/badge";
import { toBengaliNumber } from "@/lib/utils";

export default async function Home() {
  const res = await fetch("https://quranapi.pages.dev/api/surah.json", {
    cache: "force-cache",
  });
  const surahs = await res.json();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold py-2 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            আল-কুরআন করীম
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            পবিত্র কুরআন শরীফ - বাংলা অনুবাদ সহ
          </p>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {surahs.map((s: any, index: number) => (
            <Card
              key={index}
              id={`surah-${index + 1}`}
              className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 border-transparent hover:border-emerald-500/20 dark:bg-gray-800 dark:border-gray-700"
              style={{
                scrollMarginTop: "9.5rem",
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge
                        className="bg-emerald-100 text-xl min-w-9 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        variant={"outline"}
                      >
                        {toBengaliNumber(index + 1)}
                      </Badge>
                      <BookmarkButton surahNo={index + 1} />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-right leading-loose">
                      <p
                        style={{
                          viewTransitionName: `surah-title-${index + 1}`,
                        }}
                      >
                        {s.surahNameArabic}
                      </p>
                    </CardTitle>
                    <p className="text-lg font-semibold text-right mt-1">
                      {s.surahName}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {s.revelationPlace === "makkah" ? "মক্কা" : "মদিনা"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{s.totalAyah} আয়াত</span>
                  </div>
                </div>
                <Link href={`/surah/${index + 1}`} className="block" prefetch>
                  <Button className="w-full focus:scale-110 active:scale-95 dark:text-gray-200 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-200 ease-out">
                    সূরা পড়ুন
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
