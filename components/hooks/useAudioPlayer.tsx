"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useAudioPlayer(audioUrl?: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsReady(true);
      setError(null);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleError = () => {
      setError("Failed to load audio");
      setIsPlaying(false);
      setIsReady(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.src = "";
      audioRef.current = null;
      setIsPlaying(false);
      setProgress(0);
      setDuration(0);
      setIsReady(false);
      setError(null);
    };
  }, [audioUrl]);

  const play = useCallback(async () => {
    if (!audioRef.current || !isReady || error) return;
    try {
      await audioRef.current.play();
    } catch (err) {
      console.error("Error playing audio:", err);
      setIsPlaying(false);
    }
  }, [isReady, error]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback(
    (time: number) => {
      if (!audioRef.current || !isReady) return;
      const safeTime = Math.max(0, Math.min(time, duration));
      audioRef.current.currentTime = safeTime;
      setProgress(safeTime);
    },
    [isReady, duration],
  );

  return {
    isPlaying,
    progress,
    duration,
    isReady,
    error,
    play,
    pause,
    toggle,
    seek,
  };
}
