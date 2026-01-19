import HeroContent from "@/components/HeroContent";
import SurahList from "@/components/SurahList";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 w-full h-80 bg-emerald-300/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <HeroContent />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 lg:py-12">
        <Suspense
          fallback={
            <div className="w-full flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
          }
        >
          <SurahList />
        </Suspense>
      </div>
    </div>
  );
}
