"use client";

const AyahViewer = ({
  ayah,
  surah,
  index,
}: {
  ayah: string;
  surah: any;
  index: number;
}) => {
  const verse = surah.verses[index];

  return (
    <div>
      <div className="text-right mb-2 font-arabic text-2xl sm:text-3xl leading-loose text-gray-900 dark:text-gray-100">
        <div dir="rtl" className="rtl">
          {ayah}
        </div>
        <p
          className="text-right text-base sm:text-lg text-gray-600 dark:text-gray-400 italic mb-4"
          dir="ltr"
        >
          {verse.text.transliteration.en}
        </p>
      </div>
      <p
        className="text-right text-base sm:text-lg text-gray-600 dark:text-gray-400 italic mb-4"
        dir="ltr"
      >
        {verse.translation.en}
      </p>
      <p
        className="text-right text-gray-800 dark:text-gray-200 leading-relaxed"
        dir="rtl"
        style={{ textAlign: "right" }}
      >
        {surah.bengali[index]}
      </p>
    </div>
  );
};
export default AyahViewer;
