"use client";

import { Button } from "@/components/ui/button";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { AArrowDown, AArrowUp, RotateCcw } from "lucide-react";
export function FontControls() {
  const {
    arabicFontSize,
    increaseArabicFont,
    decreaseArabicFont,
    resetArabicFont,
  } = useQuranStore();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={decreaseArabicFont}
        disabled={arabicFontSize === 20}
      >
        <AArrowDown className="w-4 h-4" /> কমান
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={increaseArabicFont}
        disabled={arabicFontSize === 50}
      >
        <AArrowUp className="w-4 h-4" />
        বারান
      </Button>
      <Button size="sm" variant="outline" onClick={resetArabicFont}>
        <RotateCcw className="w-4 h-4" /> রিসেট
      </Button>
    </div>
  );
}
