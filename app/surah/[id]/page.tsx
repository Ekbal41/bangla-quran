import SurahView from "@/components/SurahView";
import { Suspense } from "react";
import Loading from "../loading";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export const dynamicParams = false;

async function getSurahData(id: string) {
  const [res1, res2] = await Promise.all([
    fetch(`https://quranapi.pages.dev/api/${id}.json`, {
      cache: "force-cache",
    }),
    fetch(`https://api.quran.gading.dev/surah/${id}`, { cache: "force-cache" }),
  ]);

  const [api1Data, api2Data] = await Promise.all([res1.json(), res2.json()]);

  return {
    ...api1Data,
    nameTransliteration: api2Data.data.name.transliteration.en,
    tafsirInEnglish: api2Data.data.tafsir.id,
    preBismillah: api2Data.data.preBismillah,
    verses: api2Data.data.verses,
  };
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  const surahData = await getSurahData(id);

  return (
    <Suspense fallback={<Loading />}>
      <SurahView surah={surahData} />
    </Suspense>
  );
}
