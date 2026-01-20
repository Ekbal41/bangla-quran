"use client";

import { BookOpen, Heart, Star } from "lucide-react";
import { motion, Variants, useReducedMotion } from "framer-motion";

export default function HeroContent() {
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.2 }
        : {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        className="text-center mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-6 shadow-lg"
        >
          <BookOpen className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100"
        >
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            আল-কুরআন করীম
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-3 max-w-2xl mx-auto font-medium"
        >
          শব্দে শব্দে কুরআন শিখুন - বাংলা অনুবাদ সহ
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto"
        >
          প্রতিটি আরবি শব্দের অর্থ এবং উচ্চারণ সহ কুরআন বুঝুন। ১১৪টি সূরা এবং
          ৬,২৩৬টি আয়াত শব্দে শব্দে শিখুন।
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: "১১৪", label: "সূরা" },
            { value: "৬,২৩৬", label: "আয়াত" },
            { value: "৩০", label: "পারা" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow
                         md:backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {[
          { icon: Heart, text: "প্রিয় সূরা", color: "text-rose-500" },
          { icon: Star, text: "বুকমার্ক", color: "text-amber-500" },
          { icon: BookOpen, text: "পঠন ইতিহাস", color: "text-emerald-500" },
        ].map(({ icon: Icon, text, color }) => (
          <div
            key={text}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow
                       border border-gray-200 dark:border-gray-700"
          >
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </>
  );
}
