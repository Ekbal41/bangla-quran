"use client";

import { Play, Pause } from "lucide-react";
import { Button } from "./ui/button";
import { useAudioPlayer } from "./hooks/useAudioPlayer";

export default function PlayAudio({
  audioUrl,
  playLabel = "চালু করুন",
  pauseLabel = "বিরতি",
}: {
  audioUrl: string;
  playLabel?: string;
  pauseLabel?: string;
}) {
  const { isPlaying, toggle } = useAudioPlayer(audioUrl);

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 !max-w-8 md:!max-w-none"
        onClick={toggle}
        disabled={!audioUrl}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            <span className="hidden md:inline">{pauseLabel}</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span className="hidden md:inline">{playLabel}</span>
          </>
        )}
      </Button>
    </div>
  );
}
