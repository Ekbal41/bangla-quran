

import SurahClientView from "@/components/SurahClientView";

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function SurahPage({ params }: PageProps) {
  'use cache'; 
  const { id } = await params;

  const [res1, res2] = await Promise.all([
    fetch(`https://quranapi.pages.dev/api/${id}.json`, {
      cache: "force-cache",
    }),
    fetch(`https://api.quran.gading.dev/surah/${id}`, { cache: "force-cache" }),
  ]);

  const [api1Data, api2Data] = await Promise.all([res1.json(), res2.json()]);

  const surahData = {
    ...api1Data,
    nameTransliteration: api2Data.data.name.transliteration.en,
    tafsirInEnglish: api2Data.data.tafsir.id,
    preBismillah: api2Data.data.preBismillah,
    verses: api2Data.data.verses,
  };

  return <SurahClientView surah={surahData} />;
}
