"use client";

import { memo, Suspense, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { toBengaliNumber } from "@/lib/utils";
import AyahBookmark from "./AyahBookmark";
import AyahViewer from "./AyahViewer";
import PlayAyah from "./PlayAyah";
import { Copy, Check, EyeOff, Eye } from "lucide-react";
import { Button } from "./ui/button";

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
    const [copied, setCopied] = useState(false);
    const [showWordByWord, setShowWordByWord] = useState(false);

    const handleCopy = async () => {
      const textToCopy = `${ayah?.text?.arab} (${ayah?.text?.transliteration.en})`;
      try {
        await navigator.clipboard.writeText(textToCopy || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    return (
      <Card
        className="group hover:shadow-xl transition-all duration-300 dark:bg-gray-800"
        id={`ayah-${ayahNumber}`}
        title={`ayah-${ayahNumber}`}
        style={{
          scrollMarginTop: "9.5rem",
        }}
      >
        <CardContent className="px-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <p className="text-2xl font-bold">{toBengaliNumber(ayahNumber)}</p>
            <div className="flex items-center justify-end w-full md:w-fit gap-3">
              <Button
                onClick={() => setShowWordByWord(!showWordByWord)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {showWordByWord ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    আয়াত অনুবাদ
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    শব্দ অনুযায়ী
                  </>
                )}
              </Button>
              <PlayAyah audio={ayah.audio} />
              <Suspense fallback={null}>
                <AyahBookmark
                  surahNo={surah.surahNo}
                  ayahNo={ayahNumber}
                  surahName={surah.surahName}
                />
              </Suspense>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
                aria-label="Copy ayah"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Suspense fallback={null}>
            <AyahViewer
              ayah={ayah?.text.arab}
              surah={surah}
              ayahNumber={index}
              surahNumber={surah.surahNo}
              showWordByWord={showWordByWord}
            />
          </Suspense>
        </CardContent>
      </Card>
    );
  },
);

export default AyahCard;
