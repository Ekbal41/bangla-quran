"use client";

import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AudioPlayer({ url, ayahNumber }: { url: string; ayahNumber: number }) {
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const newAudio = new Audio(url);
        newAudio.onended = () => setPlaying(false);
        setAudio(newAudio);
        return () => {
            newAudio.pause();
            newAudio.onended = null;
        };
    }, [url]);

    const togglePlay = () => {
        if (!audio) return;
        if (playing) {
            audio.pause();
        } else {
            audio.play();
        }
        setPlaying(!playing);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={togglePlay}
        >
            {playing ? (
                <>
                    <Pause className="w-4 h-4" /> বিরতি
                </>
            ) : (
                <>
                    <Play className="w-4 h-4" /> চালু করুন
                </>
            )}
        </Button>
    );
}
