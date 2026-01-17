"use client";

import { useState, useEffect } from "react";
import { useQuranStore } from "@/lib/store/useQuranStore";

interface Word {
  c: string;
  d: string;
  e: string;
}

interface AyahWordsData {
  w: Word[];
  a: { g: string };
}

interface SurahWordsData {
  [ayahNumber: string]: AyahWordsData;
}

interface AyahViewerProps {
  ayah: string;
  surah: any;
  ayahNumber: number;
  surahNumber: number;
  showWordByWord: boolean;
}

const AyahViewer: React.FC<AyahViewerProps> = ({
  ayah,
  surah,
  ayahNumber,
  surahNumber,
  showWordByWord,
}) => {
  const { arabicFontSize } = useQuranStore();
  const [ayahWords, setAyahWords] = useState<Word[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch(`/data/${surahNumber}.json`);
        const data: SurahWordsData = await res.json();
        setAyahWords(data[ayahNumber + 1]?.w || []);
      } catch (err) {
        console.error("Failed to fetch word-by-word data:", err);
      }
    };

    fetchWords();
  }, [surahNumber, ayahNumber]);

  return (
    <div className="space-y-4">
      <div>
        {showWordByWord && ayahWords.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-start" dir="rtl">
            {ayahWords.map((word, idx) => (
              <div
                key={idx}
                className="inline-flex flex-col items-center gap-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              >
                <span
                  className="font-arabic text-gray-900 dark:text-gray-100"
                  style={{ fontSize: arabicFontSize }}
                  dir="rtl"
                >
                  {word.c}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 italic">
                  {word.d}
                </span>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {word.e}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-right font-arabic leading-loose text-gray-900 dark:text-gray-100"
            style={{ fontSize: arabicFontSize }}
            dir="rtl"
          >
            {ayah}
          </div>
        )}
      </div>
      <p
        className="text-right text-base sm:text-lg text-gray-600 dark:text-gray-400 italic mb-2"
        dir="ltr"
      >
        {surah.verses[ayahNumber]?.translation.en}
      </p>
      <p
        className="text-right text-gray-800 dark:text-gray-200 leading-relaxed"
        dir="rtl"
      >
        {surah.bengali[ayahNumber]}
      </p>
    </div>
  );
};

export default AyahViewer;
