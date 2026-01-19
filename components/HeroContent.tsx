"use client";

import { BookOpen, Heart, Star } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function HeroContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // easeOut cubic-bezier
      },
    },
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
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
          <motion.div
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow"
          >
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              ১১৪
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              সূরা
            </div>
          </motion.div>

          <motion.div
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow"
          >
            <div className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">
              ৬,২৩৬
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              আয়াত
            </div>
          </motion.div>

          <motion.div
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow"
          >
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              ৩০
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              পারা
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700"
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            প্রিয় সূরা
          </span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700"
        >
          <Star className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            বুকমার্ক
          </span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700"
        >
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            পঠন ইতিহাস
          </span>
        </motion.div>
      </motion.div>
    </>
  );
}
