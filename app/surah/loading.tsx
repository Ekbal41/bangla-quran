import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Skeleton */}
        <div className="fixed w-full left-0 right-0 top-16 z-10">
          <Card className="rounded-none dark:bg-gray-800 p-4 rounded-br-2xl rounded-bl-2xl flex flex-wrap justify-between items-center max-w-4xl mx-auto border-t-0">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </Card>
        </div>

        {/* Surah Header Skeleton */}
        <Card className="mb-6 mt-20 rounded-2xl border-emerald-500/20 dark:bg-gray-800">
          <CardHeader className="text-center space-y-4 pb-6">
            <Skeleton className="w-16 h-16 mx-auto rounded-full" />
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-8 w-48 mx-auto" />
          </CardHeader>
          <CardContent className="text-center pb-6">
            <div className="flex items-center justify-center gap-6">
              <Skeleton className="h-6 w-24" />
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <Skeleton className="h-6 w-24" />
            </div>
          </CardContent>
        </Card>

        {/* Bismillah Skeleton */}
        <div className="text-center mb-8 space-y-3">
          <Skeleton className="h-12 w-80 mx-auto" />
          <Skeleton className="h-6 w-60 mx-auto" />
          <Skeleton className="h-4 w-40 mx-auto" />
        </div>

        {/* Ayahs Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800 rounded-none border-l-4 border-l-emerald-200/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-10" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-6 w-3/4 ml-auto" />
                  <Skeleton className="h-6 w-1/2 ml-auto" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
