import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, MapPin, BookOpen, Book } from "lucide-react";
import AyahBookmark from "@/components/AyahBookmark";
import AyahViewer from "./AyahViewer";
// import PlayAyah from "./PlayAyah";
import { toBengaliNumber } from "@/lib/utils";

export default function SurahClientView({ surah }: { surah: any }) {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="fixed w-full left-0 right-0 top-16">
          <Card className="rounded-none dark:bg-gray-800 p-4 rounded-br-xl rounded-bl-xl flex-row flex flex-wrap justify-between items-center max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/" prefetch>
              <Button variant="outline" className="group">
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden md:inline">সূরা তালিকায় ফিরুন</span>
                <span className="md:hidden">Back</span>
              </Button>
            </Link>
            <p className="text-lg font-semibold flex items-center">
              <Book className="w-5 h-5 inline-block mr-2 text-emerald-600 dark:text-emerald-400" />
              {surah.surahNameTranslation}
            </p>
          </Card>
        </div>
        {/* Surah Header */}
        <Card className="mb-6 mt-18 md:mt-16">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center bg-emerald-600 justify-center text-white text-2xl font-bold">
              {toBengaliNumber(surah.surahNo)}
            </div>

            <CardTitle className="text-3xl sm:text-4xl leading-loose">
              {surah.surahNameArabicLong || surah.surahNameArabic}
            </CardTitle>
            <p className="text-2xl font-semibold">
              {surah.nameTransliteration}
              <span className="text-xl ms-2  font-semibold">
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
            <p className="text-3xl sm:text-4xl text-gray-800 dark:text-gray-200 leading-loose">
              {surah.preBismillah.text.arab}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
              {surah.preBismillah.text.transliteration.en}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              পরম করুণাময় অসীম দয়ালু আল্লাহর নামে
            </p>
          </div>
        )}

        {/* Ayahs */}
        <div className="space-y-6">
          {surah.verses.map((ayah: any, index: number) => {
            const ayahNumber = index + 1;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 dark:bg-gray-800"
                id={"ayah-" + ayahNumber}
                title={"ayah-" + ayahNumber}
              >
                <CardContent className="px-6 space-y-4">
                  {/* Ayah Number & Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold">
                      {toBengaliNumber(ayahNumber)}
                    </p>
                    <div className="flex items-center gap-3">
                      {/* <PlayAyah audio={ayah?.audio} /> */}
                      <AyahBookmark
                        surahNo={surah.surahNo}
                        ayahNo={ayahNumber}
                        surahName={surah.surahNameTranslation}
                      />
                    </div>
                  </div>
                  <AyahViewer
                    ayah={ayah?.text.arab}
                    surah={surah}
                    index={index}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 gap-4">
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
