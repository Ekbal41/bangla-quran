"use client";

import { memo } from "react";
import { Card, CardContent } from "./ui/card";
import { toBengaliNumber } from "@/lib/utils";
import AyahBookmark from "./AyahBookmark";
import AyahViewer from "./AyahViewer";
import PlayAyah from "./PlayAyah";

const AyahCard = memo(
  ({
    ayah,
    ayahNumber,
    surah,
    index,
  }: {
    ayah: any;
    ayahNumber: number;
    surah: any;
    index: number;
  }) => {
    return (
      <Card
        className="group hover:shadow-xl transition-all duration-300 dark:bg-gray-800"
        id={`ayah-${ayahNumber}`}
        title={`ayah-${ayahNumber}`}
      >
        <CardContent className="px-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-bold">{toBengaliNumber(ayahNumber)}</p>
            <div className="flex items-center gap-3">
              <PlayAyah audio={ayah.audio} />
              <AyahBookmark
                surahNo={surah.surahNo}
                ayahNo={ayahNumber}
                surahName={surah.surahNameTranslation}
              />
            </div>
          </div>
          <AyahViewer ayah={ayah?.text.arab} surah={surah} index={index} />
        </CardContent>
      </Card>
    );
  },
);

export default AyahCard;
