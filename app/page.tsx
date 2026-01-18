import SurahList from "@/components/SurahList";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold py-2 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            আল-কুরআন করীম
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            পবিত্র কুরআন শরীফ - বাংলা অনুবাদ সহ
          </p>
        </div>

        {/* Surah Grid */}
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
