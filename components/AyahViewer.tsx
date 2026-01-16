"use client";

import { useState } from "react";

export default function AyahViewer({
    ayah,
    verse,
    bengaliText,
    index,
}: {
    ayah: string;
    verse: any;
    bengaliText: string;
    index: number;
}) {
    const [wordByWord, setWordByWord] = useState(false);
    const toggleView = () => setWordByWord((prev) => !prev);

    const arabicWords = ayah.match(/[\u0600-\u06FF]+[^\u0600-\u06FF\s]*/g) || [
        ayah,
    ];
    const translitWords = verse.text.transliteration.en.split(/\s+/);

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleView}
                    className="px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-500 dark:border-emerald-400 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900 transition"
                >
                    {wordByWord ? "Normal View" : "Word-by-Word"}
                </button>
            </div>
            <div className="text-right mb-2 font-arabic text-2xl sm:text-3xl leading-loose text-gray-900 dark:text-gray-100">
                {wordByWord ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" dir="rtl">
                        {arabicWords.map((word, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                            >
                                <div className="font-arabic text-2xl mb-2">{word}</div>
                                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    {translitWords[i] || ""}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div dir="rtl" className="rtl">
                        {ayah}
                    </div>
                )}
            </div>

            {!wordByWord && (
                <p
                    className="text-right text-base sm:text-lg text-gray-600 dark:text-gray-400 italic mb-4"
                    dir="ltr"
                >
                    {verse.translation.en}
                </p>
            )}

            {!wordByWord && (
                <p
                    className="text-right text-gray-800 dark:text-gray-200 leading-relaxed"
                    dir="rtl"
                    style={{ textAlign: "right" }}
                >
                    {bengaliText}
                </p>
            )}
        </div>
    );
}
