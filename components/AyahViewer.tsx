"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { AArrowDown, AArrowUp } from "lucide-react";

const AyahViewer = ({
  ayah,
  surah,
  index,
}: {
  ayah: string;
  surah: any;
  index: number;
}) => {
  const verse = surah.verses[index];
  const [arabicFontSize, setArabicFontSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arabicFontSize");
      if (saved) return Number(saved);
    }
    return 30;
  });
  useEffect(() => {
    localStorage.setItem("arabicFontSize", arabicFontSize.toString());
  }, [arabicFontSize]);

  return (
    <div>
      <div className="mb-2 flex justify-end gap-2">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setArabicFontSize((size) => Math.max(12, size - 2))}
        >
          <AArrowDown className="size-5" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setArabicFontSize((size) => size + 2)}
        >
          <AArrowUp className="size-5" />
        </Button>
      </div>
      <div
        className="text-right font-arabic leading-loose text-gray-900 dark:text-gray-100"
        style={{ fontSize: arabicFontSize }}
        dir="rtl"
      >
        {ayah}
      </div>
      <p
        className="text-right text-base sm:text-lg text-gray-600 dark:text-gray-400 italic mb-2"
        dir="ltr"
      >
        {verse.text.transliteration.en}
      </p>
      <p
        className="text-right text-base sm:text-lg text-gray-600 dark:text-gray-400 italic mb-2"
        dir="ltr"
      >
        {verse.translation.en}
      </p>
      <p
        className="text-right text-gray-800 dark:text-gray-200 leading-relaxed"
        dir="rtl"
      >
        {surah.bengali[index]}
      </p>
    </div>
  );
};

export default AyahViewer;
