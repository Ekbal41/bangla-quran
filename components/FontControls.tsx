"use client";

import { Button } from "@/components/ui/button";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { AArrowDown, AArrowUp, RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FontControls() {
  const {
    arabicFontSize,
    increaseArabicFont,
    decreaseArabicFont,
    resetArabicFont,
  } = useQuranStore();

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" onClick={decreaseArabicFont}>
            <AArrowDown className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>ফন্ট কমান (বর্তমান: {arabicFontSize}px)</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" onClick={increaseArabicFont}>
            <AArrowUp className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>ফন্ট বাড়ান (বর্তমান: {arabicFontSize}px)</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" onClick={resetArabicFont}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>ডিফল্টে রিসেট (বর্তমান: {arabicFontSize}px)</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
