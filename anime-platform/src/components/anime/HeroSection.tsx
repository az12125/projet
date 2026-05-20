'use client';

import { motion } from 'framer-motion';
import { Play, Info, Star } from 'lucide-react';
import type { Anime } from '@/types';

interface HeroSectionProps {
  anime: Anime;
}

export function HeroSection({ anime }: HeroSectionProps) {
  if (!anime) return null;

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl space-y-6 pt-20"
        >
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              {anime.title_english || anime.title}
            </h1>
            {anime.title_japanese && (
              <p className="text-lg text-gray-400">{anime.title_japanese}</p>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {anime.score && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-light">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-white">{anime.score.toFixed(1)}</span>
              </div>
            )}
            <span className="px-3 py-1.5 rounded-full glass-light text-gray-300">
              {anime.type}
            </span>
            {anime.episodes && (
              <span className="px-3 py-1.5 rounded-full glass-light text-gray-300">
                {anime.episodes} épisodes
              </span>
            )}
            <span className="px-3 py-1.5 rounded-full glass-light text-gray-300">
              {anime.year || 'N/A'}
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {anime.genres.slice(0, 5).map((genre) => (
              <span
                key={genre.mal_id}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors cursor-pointer"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          <p className="text-gray-300 line-clamp-3 text-base leading-relaxed max-w-xl">
            {anime.synopsis}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Voir la bande-annonce</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2"
            >
              <Info className="w-5 h-5" />
              <span>Plus d&apos;infos</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
