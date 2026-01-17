"use client";

import AyahCard from "../AyahCard";

export default function AyahList({ surah }: any) {
  return (
    <div className="space-y-4 md:space-y-6">
      {surah.verses.map((ayah: any, index: number) => {
        const ayahNumber = index + 1;
        return (
          <AyahCard
            key={`${surah.surahNo}-${ayahNumber}`}
            ayah={ayah}
            ayahNumber={ayahNumber}
            surah={surah}
            index={index}
          />
        );
      })}
    </div>
  );
}
