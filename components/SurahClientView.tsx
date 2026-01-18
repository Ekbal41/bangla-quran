"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import AyahList from "./ui/AyahList";
import { Suspense, useEffect } from "react";
import { FontControls } from "./FontControls";
import { usePathname } from "next/navigation";

export default function SurahClientView({ surah }: { surah: any }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="fixed w-full left-0 right-0 top-16 z-50">
        <Card className="rounded-none shadow-none dark:bg-gray-800 p-4 rounded-br-xl rounded-bl-xl flex-row flex flex-wrap justify-between items-center max-w-5xl mx-auto">
          {/* Back Button */}
          <Link href="/" prefetch>
            <Button variant="outline" className="group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden md:inline">সূরা তালিকায় ফিরুন</span>
              <span className="md:hidden">পিছনে</span>
            </Button>
          </Link>
          <FontControls />
        </Card>
      </div>
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full overflow-y-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 xl:px-0">
            <Suspense
              fallback={
                <div className="w-full flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                </div>
              }
            >
              <div>
                <AyahList surah={surah} />
              </div>
            </Suspense>
            {/* Navigation */}
            <div className="flex justify-between gap-4 my-4 md:my-6">
              {surah.surahNo > 1 && (
                <Link href={`/surah/${surah.surahNo - 1}`} prefetch>
                  <Button variant="outline" className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    পূর্ববর্তী সূরা
                  </Button>
                </Link>
              )}
              {surah.surahNo < 114 && (
                <Link
                  href={`/surah/${surah.surahNo + 1}`}
                  className="ml-auto"
                  prefetch
                >
                  <Button variant="outline" className="flex-1">
                    পরবর্তী সূরা
                    <ChevronLeft className="w-4 h-4 ml-1 rotate-180" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
