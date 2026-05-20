'use client';

import { motion } from 'framer-motion';
import { AnimeCard } from '../anime/AnimeCard';
import type { Anime } from '@/types';

interface AnimeCarouselProps {
  title: string;
  animes: Anime[];
  isLoading?: boolean;
}

export function AnimeCarousel({ title, animes, isLoading = false }: AnimeCarouselProps) {
  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-xl skeleton" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
          {title}
        </h2>
        <a href="#" className="text-sm text-primary hover:text-secondary transition-colors font-medium">
          Voir tout →
        </a>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {animes.slice(0, 12).map((anime, index) => (
          <motion.div
            key={anime.mal_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <AnimeCard anime={anime} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
