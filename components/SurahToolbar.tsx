"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Play, Pause, Volume2, MicVocal } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FontControls } from "./FontControls";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function SurahToolbar({ surah }: { surah: any }) {
  const audioMap = useMemo(() => surah?.audio ?? {}, [surah]);
  const reciterKeys = useMemo(() => Object.keys(audioMap), [audioMap]);
  const [reciterKey, setReciterKey] = useState<string>(reciterKeys[0] ?? "");
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const selectedAudio = audioMap[reciterKey];
  const { isPlaying, progress, duration, toggle, seek, isReady } =
    useAudioPlayer(selectedAudio?.originalUrl);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="relative p-4 !rounded-t-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-none overflow-hidden">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" prefetch>
                <Button
                  variant="outline"
                  className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                  <span className="hidden sm:inline">সূরা তালিকায় ফিরুন</span>
                  <span className="sm:hidden">পিছনে</span>
                </Button>
              </Link>
              <FontControls />
              {isPlaying && (
                <div className="hidden md:inline">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(progress)} / {formatTime(duration)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <MicVocal className="w-4 h-4 text-gray-500 dark:text-gray-400 hidden sm:block" />
                <div className="hidden md:block">
                  <Select value={reciterKey} onValueChange={setReciterKey}>
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="রেকিটার নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {reciterKeys.map((key) => (
                        <SelectItem key={key} value={key}>
                          {audioMap[key]?.reciter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:hidden">
                  <Dialog
                    open={mobileModalOpen}
                    onOpenChange={setMobileModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant={"outline"} size="icon">
                        <MicVocal className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xs">
                      <DialogHeader>
                        <DialogTitle>রেকিটার নির্বাচন করুন</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-2 mt-2">
                        {reciterKeys.map((key) => (
                          <Button
                            key={key}
                            variant={reciterKey === key ? "default" : "outline"}
                            onClick={() => {
                              setReciterKey(key);
                              setMobileModalOpen(false);
                            }}
                            className="justify-start"
                          >
                            <MicVocal className="w-4 h-4" />
                            {audioMap[key]?.reciter}
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <Button
                onClick={toggle}
                disabled={!isReady}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                size="icon"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative group">
                <div className="h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-150 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={!isReady}
                  aria-label="Audio progress"
                />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
