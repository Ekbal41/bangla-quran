import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AyahBookmark from "@/components/AyahBookmark";
import AudioPlayer from "@/components/AudioPlayer";
import AyahViewer from "@/components/AyahViewer";

export default function AyahList({ surah }: { surah: any }) {
    return (
        <div className="space-y-6">
            {surah.arabic1.map((ayah: string, index: number) => {
                const ayahNumber = index + 1;
                const verse = surah.verses[index];
                const bengaliText = surah.bengali[index];
                const audioUrl = surah.audio[ayahNumber]?.url;

                return (
                    <Card
                        key={index}
                        className="group hover:shadow-xl transition-all duration-300 dark:bg-gray-800 rounded-none border-l-4 border-l-emerald-500"
                    >
                        <CardContent className="px-6 space-y-4">
                            <div className="flex items-center justify-between mb-4 pt-4">
                                <Badge
                                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                    variant={"outline"}
                                >
                                    {ayahNumber}
                                </Badge>

                                <div className="flex items-center gap-3">
                                    {audioUrl && (
                                        <AudioPlayer url={audioUrl} ayahNumber={ayahNumber} />
                                    )}
                                    <AyahBookmark
                                        surahNo={surah.surahNo}
                                        ayahNo={ayahNumber}
                                        surahName={surah.surahNameTranslation}
                                    />
                                </div>
                            </div>
                            <AyahViewer
                                ayah={ayah}
                                verse={verse}
                                bengaliText={bengaliText}
                                index={index}
                            />
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
