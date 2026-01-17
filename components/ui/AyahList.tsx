"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import AyahCard from "../AyahCard";

export default function AyahList({ surah }: any) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: surah.verses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const index = virtualRow.index;
          const ayah = surah.verses[index];
          const ayahNumber = index + 1;
          return (
            <div
              key={`${surah.surahNo}-${ayahNumber}`}
              data-index={index}
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
              <AyahCard
                ayah={ayah}
                ayahNumber={ayahNumber}
                surah={surah}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
