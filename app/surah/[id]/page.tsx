import SurahClientView from "@/components/SurahClientView";

interface PageProps {
  params: { id: string };
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`https://quranapi.pages.dev/api/${id}.json`, {
    cache: "force-cache",
  });
  const surah: any = await res.json();

  return <SurahClientView surah={surah} />;
}
