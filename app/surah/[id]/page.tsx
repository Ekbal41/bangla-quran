import SurahClientView from "@/components/SurahClientView";

interface PageProps {
  params: { id: string };
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;

  const res1 = await fetch(`https://quranapi.pages.dev/api/${id}.json`, {
    cache: "force-cache",
  });
  const api1Data: any = await res1.json();

  const res2 = await fetch(`https://api.quran.gading.dev/surah/${id}`, {
    cache: "force-cache",
  });
  const api2Data: any = await res2.json();

  const surahData = {
    ...api1Data,
    nameTransliteration: api2Data.data.name.transliteration.en,
    tafsirInEnglish: api2Data.data.tafsir.id,
    preBismillah: api2Data.data.preBismillah,
    verses: api2Data.data.verses,
  };

  return <SurahClientView surah={surahData} />;
}
