"use client";

import { useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import AyahCard from "../AyahCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, BookOpen } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";

export default function AyahList({ surah }: any) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const hasBismillah = surah.surahNo !== 1;
  const totalItems = 1 + (hasBismillah ? 1 : 0) + surah.verses.length;

  const rowVirtualizer = useVirtualizer({
    count: totalItems,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      if (index === 0) return 400;
      if (hasBismillah && index === 1) return 200;
      return 200;
    },
    overscan: 15,
  });

  const scrollToAyah = useCallback(
    (ayahNumber: number) => {
      if (ayahNumber < 1 || ayahNumber > surah.verses.length) return;

      const virtualIndex = (hasBismillah ? 2 : 1) + (ayahNumber - 1);

      rowVirtualizer.scrollToIndex(virtualIndex, {
        align: "start",
        behavior: "auto",
      });

      setTimeout(() => {
        const element = document.getElementById(`ayah-${ayahNumber}`);
        if (element && parentRef.current) {
          const container = parentRef.current;
          const elementRect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const scrollTop = container.scrollTop;
          const elementTop = elementRect.top - containerRect.top + scrollTop;

          container.scrollTo({
            top: elementTop - 200,
            behavior: "smooth",
          });

          element.classList.add(
            "bg-yellow-50",
            "dark:bg-yellow-900/20",
            "ring-2",
            "ring-yellow-400",
            "rounded-xl",
            "mx-0.5",
          );

          setTimeout(() => {
            element.classList.remove(
              "bg-yellow-50",
              "dark:bg-yellow-900/20",
              "ring-2",
              "ring-yellow-400",
              "mx-0.5",
            );
          }, 2000);

          window.history.replaceState(null, "", `#ayah-${ayahNumber}`);
        }
      }, 100);
    },
    [rowVirtualizer, surah.verses.length, hasBismillah],
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const match = hash.match(/#ayah-(\d+)/);
        if (match) {
          const ayahNumber = parseInt(match[1]);
          setTimeout(() => scrollToAyah(ayahNumber), 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToAyah]);

  const getItemContent = (index: number) => {
    if (index === 0) {
      return (
        <div>
          <Card className="dark:bg-gray-800 shadow-none">
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center bg-emerald-600 justify-center text-white text-2xl font-bold">
                {toBengaliNumber(surah.surahNo)}
              </div>
              <CardTitle className="text-3xl sm:text-4xl leading-loose">
                <p
                  style={{ viewTransitionName: `surah-title-${surah.surahNo}` }}
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
        </div>
      );
    }

    if (hasBismillah && index === 1) {
      return (
        <div className="text-center pb-4 md:pb-6">
          <p className="text-3xl sm:text-4xl leading-loose">
            {surah?.preBismillah?.text?.arab ||
              "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}
          </p>
          <p className="text-xl mt-2">
            {surah?.preBismillah?.text?.transliteration?.en ||
              "Bismillāhir Raḥmānir Raḥīm"}
          </p>
          <p className="text-sm mt-2">পরম করুণাময় অসীম দয়ালু আল্লাহর নামে</p>
        </div>
      );
    }

    const ayahIndex = hasBismillah ? index - 2 : index - 1;
    const ayah = surah.verses[ayahIndex];
    const ayahNumber = ayahIndex + 1;

    return (
      <div id={`ayah-${ayahNumber}`} className="scroll-mt-28">
        <AyahCard
          ayah={ayah}
          ayahNumber={ayahNumber}
          surah={surah}
          index={ayahIndex}
        />
      </div>
    );
  };

  return (
    <div
      ref={parentRef}
      className="h-[calc(100dvh-64px)] overflow-y-auto scrollbar-hide pt-[5.3rem] md:pt-[5.8rem] pb-[4.4rem] md:pb-[4.5rem]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className="pb-4 md:pb-6"
          >
            {getItemContent(virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
