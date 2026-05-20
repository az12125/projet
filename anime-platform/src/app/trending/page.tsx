'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { animeApi } from '@/lib/api';
import type { Anime } from '@/types';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { TrendingUp, Flame, Star } from 'lucide-react';

export default function TrendingPage() {
  const [trending, setTrending] = useState<Anime[]>([]);
  const [top, setTop] = useState<Anime[]>([]);
  const [popular, setPopular] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [trendingData, topData, popularData] = await Promise.all([
          animeApi.getTrendingAnime(50),
          animeApi.getTopAnime(50),
          animeApi.getPopularAnime(50),
        ]);
        setTrending(trendingData);
        setTop(topData);
        setPopular(popularData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            Tendances & Top Animes
          </h1>
          <p className="text-gray-400">Découvrez les animes les plus populaires du moment</p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-16">
          {/* Trending Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-white">🔥 En Tendance</h2>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-[2/3] rounded-xl skeleton" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {trending.slice(0, 12).map((anime, index) => (
                  <motion.div
                    key={anime.mal_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AnimeCard anime={anime} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Top Rated Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-white">🏆 Meilleures Notes</h2>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-[2/3] rounded-xl skeleton" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {top.slice(0, 12).map((anime, index) => (
                  <motion.div
                    key={anime.mal_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AnimeCard anime={anime} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Popular Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-white">⭐ Les Plus Populaires</h2>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-[2/3] rounded-xl skeleton" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popular.slice(0, 12).map((anime, index) => (
                  <motion.div
                    key={anime.mal_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AnimeCard anime={anime} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
