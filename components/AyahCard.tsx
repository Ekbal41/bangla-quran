"use client";

import { memo, Suspense, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { toBengaliNumber } from "@/lib/utils";
import AyahBookmark from "./AyahBookmark";
import AyahViewer from "./AyahViewer";
import PlayAyah from "./PlayAyah";
import {
  Copy,
  Check,
  EyeOff,
  Eye,
  Maximize2,
  Minimize2,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
    const [isFullscreen, setIsFullscreen] = useState(false);

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
      <>
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
              <p className="text-xl md:text-2xl font-bold">
                {toBengaliNumber(ayahNumber)}
              </p>
              <div className="flex items-center flex-wrap justify-end gap-3">
                <Button
                  onClick={() => setShowWordByWord(!showWordByWord)}
                  variant="outline"
                  size="sm"
                  className="gap-2 !max-w-8 md:!max-w-none"
                >
                  {showWordByWord ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span className="hidden md:inline"> আয়াত অনুবাদ </span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span className="hidden md:inline"> শব্দ অনুযায়ী</span>
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
                <Button
                  onClick={() => setIsFullscreen(true)}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Fullscreen view"
                >
                  <Maximize2 className="h-4 w-4" />
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
        <Sheet open={isFullscreen} onOpenChange={setIsFullscreen}>
          <SheetContent
            side="bottom"
            className="h-[100dvh] w-full p-0 max-w-none"
          >
            <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div className="px-4 py-3 md:px-8 md:py-4">
                <div className="flex items-center flex-wrap justify-between gap-4 max-w-5xl mx-auto">
                  <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold truncate">
                      {surah.surahName}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                      আয়াত {toBengaliNumber(ayahNumber)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={() => setShowWordByWord(!showWordByWord)}
                      variant="outline"
                      size="sm"
                      className="gap-2 !max-w-8 md:!max-w-none"
                    >
                      {showWordByWord ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span className="hidden md:inline">আয়াত অনুবাদ</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span className="hidden md:inline">
                            শব্দ অনুযায়ী
                          </span>
                        </>
                      )}
                    </Button>
                    <PlayAyah audio={ayah.audio} />
                    <div className="hidden md:block">
                      <Suspense fallback={null}>
                        <AyahBookmark
                          surahNo={surah.surahNo}
                          ayahNo={ayahNumber}
                          surahName={surah.surahName}
                        />
                      </Suspense>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      className="h-8 w-8 hidden md:flex"
                      aria-label="Copy ayah"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFullscreen(false)}
                      className="h-8 w-8"
                      aria-label="Exit fullscreen"
                    >
                      <Minimize2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full overflow-y-auto pt-24 md:pt-28">
              <div className="px-6 md:px-12 pb-12">
                <div className="max-w-5xl mx-auto">
                  <Suspense
                    fallback={
                      <div className="w-full flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                      </div>
                    }
                  >
                    <AyahViewer
                      ayah={ayah?.text.arab}
                      surah={surah}
                      ayahNumber={index}
                      surahNumber={surah.surahNo}
                      showWordByWord={showWordByWord}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  },
);

AyahCard.displayName = "AyahCard";

export default AyahCard;
