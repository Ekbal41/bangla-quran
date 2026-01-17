"use client";

import { useState, useEffect, useRef } from "react";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { Volume2, Loader2 } from "lucide-react";

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
  const [playingWordIndex, setPlayingWordIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const playWordAudio = (wordIndex: number) => {
    if (!audioRef.current) return;

    const wordChapter = surahNumber;
    const wordVerse = ayahNumber + 1;
    const wordNumber = wordIndex + 1;

    const currentWordFileName = `${wordChapter}/${String(wordChapter).padStart(3, "0")}_${String(wordVerse).padStart(3, "0")}_${String(wordNumber).padStart(3, "0")}.mp3`;

    audioRef.current.src = `https://audios.quranwbw.com/words/${currentWordFileName}?version=2`;

    setPlayingWordIndex(wordIndex);

    audioRef.current.play().catch((err) => {
      console.error("Failed to play audio:", err);
      setPlayingWordIndex(null);
    });
  };

  const handleAudioEnded = () => {
    setPlayingWordIndex(null);
  };

  return (
    <div className="space-y-4">
      <div>
        {showWordByWord && ayahWords.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-start" dir="rtl">
            {ayahWords.map((word, idx) => (
              <div
                key={idx}
                className="inline-flex active:bg-emerald-50 focus:bg-emerald-50 flex-col items-center gap-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 relative group cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => playWordAudio(idx)}
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
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {playingWordIndex === idx ? (
                    <Loader2 className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-spin" />
                  ) : (
                    <Volume2 className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
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

      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />
    </div>
  );
};

export default AyahViewer;
