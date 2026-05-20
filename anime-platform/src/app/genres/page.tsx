'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { animeApi } from '@/lib/api';
import type { Genre, Anime } from '@/types';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { Filter } from 'lucide-react';

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genreAnime, setGenreAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await animeApi.getGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchGenreAnime() {
      if (selectedGenre) {
        setIsLoading(true);
        try {
          const data = await animeApi.getAnimeByGenre(selectedGenre, 24);
          setGenreAnime(data);
        } catch (error) {
          console.error('Error fetching genre anime:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setGenreAnime([]);
      }
    }

    fetchGenreAnime();
  }, [selectedGenre]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Filter className="w-8 h-8 text-primary" />
            Découvrir par Genres
          </h1>
          <p className="text-gray-400">Explorez notre vaste catalogue d&apos;animes par genre</p>
        </motion.div>

        {/* Genres Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-12">
          {genres.map((genre, index) => (
            <motion.button
              key={genre.mal_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => setSelectedGenre(selectedGenre === genre.mal_id ? null : genre.mal_id)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                selectedGenre === genre.mal_id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-neon'
                  : 'glass-light text-gray-300 hover:bg-primary/20 hover:text-primary'
              }`}
            >
              <span className="font-medium">{genre.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Selected Genre Results */}
        {selectedGenre && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {genres.find(g => g.mal_id === selectedGenre)?.name}
              </h2>
              <button
                onClick={() => setSelectedGenre(null)}
                className="text-sm text-primary hover:text-secondary transition-colors"
              >
                Effacer le filtre →
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-[2/3] rounded-xl skeleton" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {genreAnime.map((anime, index) => (
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
        )}

        {!selectedGenre && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Sélectionnez un genre pour découvrir les animes associés</p>
          </div>
        )}
      </div>
    </main>
  );
}
