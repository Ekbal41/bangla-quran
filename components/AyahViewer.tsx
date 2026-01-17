"use client";
import { useQuranStore } from "@/lib/store/useQuranStore";

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
  const { arabicFontSize } = useQuranStore();

  return (
    <div>
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
