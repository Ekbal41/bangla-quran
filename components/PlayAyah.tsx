"use client";

import { Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";

export default function PlayAyah({ audio }: { audio: any }) {
  const [playingAyah, setPlayingAyah] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const togglePlay = () => {
    const url = audio?.primary;
    if (!url) return;

    if (playingAyah) {
      audioRef.current?.pause();
      setPlayingAyah(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      setPlayingAyah(true);
      audio.onended = () => setPlayingAyah(null);
    }
  };
  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => togglePlay()}
      >
        {playingAyah ? (
          <>
            <Pause className="w-4 h-4" /> বিরতি
          </>
        ) : (
          <>
            <Play className="w-4 h-4" /> চালু করুন
          </>
        )}
      </Button>
    </div>
  );
}
