import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, MapPin, BookOpen, Loader2 } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";
import AyahList from "./ui/AyahList";
import { Suspense } from "react";
import { FontControls } from "./FontControls";

export default function SurahClientView({ surah }: { surah: any }) {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
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
        {/* Surah Header */}
        <Card className="mb-4 md:mb-6 mt-18 md:mt-16 dark:bg-gray-800 shadow-none">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center bg-emerald-600 justify-center text-white text-2xl font-bold">
              {toBengaliNumber(surah.surahNo)}
            </div>
            <CardTitle className="text-3xl sm:text-4xl leading-loose">
              <p
                style={{
                  viewTransitionName: `surah-title-${surah.surahNo}`,
                }}
              >
                {surah.surahNameArabic}
              </p>
            </CardTitle>
            <p className="text-2xl font-semibold">
              {surah.nameTransliteration}
              <span className="text-xl ms-2 !font-normal text-gray-600 dark:text-gray-400">
                ({surah.surahNameTranslation})
              </span>
            </p>
          </CardHeader>

          <CardContent className="text-center pb-6">
            <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">
                  {surah.revelationPlace.toLowerCase() === "makkah"
                    ? "মক্কা"
                    : "মদিনা"}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">{surah.totalAyah} আয়াত</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bismillah */}
        {surah.surahNo !== 1 && surah.surahNo !== 9 && (
          <div className="text-center mb-8">
            <p className="text-3xl sm:text-4xl leading-loose">
              {surah.preBismillah.text.arab}
            </p>
            <p className="text-xl mt-2">
              {surah.preBismillah.text.transliteration.en}
            </p>
            <p className="text-sm mt-2">
              পরম করুণাময় অসীম দয়ালু আল্লাহর নামে
            </p>
          </div>
        )}

        {/* Ayahs */}
        {/* <Suspense
          fallback={
            <div className="w-full flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
          }
        >
          <AyahList surah={surah} />
        </Suspense> */}

        {/* Navigation */}
        <div className="flex justify-between mt-8 mb-4 gap-4">
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
  );
}
