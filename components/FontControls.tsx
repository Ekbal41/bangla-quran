"use client";

import { Button } from "@/components/ui/button";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { Minus, Plus, RotateCcw } from "lucide-react";

export function FontControls() {
  const {
    arabicFontSize,
    increaseArabicFont,
    decreaseArabicFont,
    resetArabicFont,
  } = useQuranStore();

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="outline" onClick={decreaseArabicFont}>
        <Minus className="w-4 h-4" />
      </Button>
      <span className="text-sm w-12 text-center">{arabicFontSize}px</span>
      <Button size="icon" variant="outline" onClick={increaseArabicFont}>
        <Plus className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={resetArabicFont}>
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
}
