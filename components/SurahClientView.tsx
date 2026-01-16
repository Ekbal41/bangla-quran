// "use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, MapPin, BookOpen, Play, Pause } from "lucide-react";
// import { useState, useRef } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import AyahBookmark from "@/components/AyahBookmark";
import { Badge } from "./ui/badge";
import AyahViewer from "./AyahViewer";

export default function SurahClientView({ surah }: { surah: any }) {
  // const [reciter, setReciter] = useState<string>(
  //   Object.keys(surah.audio)[0] || ""
  // );
  // const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  // const togglePlay = (ayahNumber: number) => {
  //   const url = surah.audio[ayahNumber]?.url;
  //   if (!url) return;

  //   if (playingAyah === ayahNumber) {
  //     audioRef.current?.pause();
  //     setPlayingAyah(null);
  //   } else {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //     }
  //     const audio = new Audio(url);
  //     audioRef.current = audio;
  //     audio.play();
  //     setPlayingAyah(ayahNumber);

  //     audio.onended = () => setPlayingAyah(null);
  //   }
  // };
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="fixed w-full left-0 right-0 top-16">
          <Card className="rounded-none dark:bg-gray-800 p-4 rounded-br-2xl rounded-bl-2xl flex-row flex flex-wrap justify-between items-center max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/" prefetch>
              <Button variant="outline" className="group">
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden md:inline">সূরা তালিকায় ফিরুন</span>
                <span className="md:hidden">Back</span>
              </Button>
            </Link>
            {/* Reciter Selector using Shadcn Select */}
            {/* {Object.keys(surah.audio).length > 1 && (
              <Select value={reciter} onValueChange={setReciter}>
                <SelectTrigger className="w-fit bg-white">
                  <SelectValue placeholder="পাঠক নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(surah.audio).map(
                    ([key, value]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        {value?.reciter}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )} */}
          </Card>
        </div>
        {/* Surah Header */}
        <Card className="mb-6 mt-16 rounded-2xl border-emerald-500/20 dark:bg-gray-800">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center bg-emerald-600 justify-center text-white text-2xl font-bold shadow-lg">
              {surah.surahNo}
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
          {surah.arabic1.map((ayah: any, index: number) => {
            const ayahNumber = index + 1;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 dark:bg-gray-800 rounded-none border-l-4 border-l-emerald-500"
              >
                <CardContent className="px-6 space-y-4">
                  {/* Ayah Number & Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      variant={"outline"}
                    >
                      {ayahNumber}
                    </Badge>

                    <div className="flex items-center gap-3">
                      {/* Play/Pause Icon */}
                      {surah.audio[ayahNumber] && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          // onClick={() => togglePlay(ayahNumber)}
                        >
                          {/* {playingAyah === ayahNumber ? (
                            <>
                              <Pause className="w-4 h-4" /> বিরতি
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" /> চালু করুন
                            </>
                          )} */}
                        </Button>
                      )}
                      <AyahBookmark
                        surahNo={surah.surahNo}
                        ayahNo={ayahNumber}
                        surahName={surah.surahNameTranslation}
                      />
                    </div>
                  </div>
                  <AyahViewer ayah={ayah} surah={surah} index={index} />
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
