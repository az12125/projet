'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, TV, Bookmark, Heart, Share2, Play } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { animeApi } from '@/lib/api';
import type { Anime } from '@/types';
import { AnimeCard } from '@/components/anime/AnimeCard';

export default function AnimeDetailPage() {
  const params = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInList, setIsInList] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchAnimeDetails() {
      try {
        setIsLoading(true);
        const id = parseInt(params.id as string);
        
        const [animeData, recommendationsData] = await Promise.all([
          animeApi.getAnimeDetails(id),
          animeApi.getAnimeRecommendations(id),
        ]);

        setAnime(animeData);
        setRecommendations(recommendationsData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching anime details:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchAnimeDetails();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-[500px] bg-surface rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-surface rounded w-3/4" />
                <div className="h-4 bg-surface rounded w-1/2" />
                <div className="h-32 bg-surface rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!anime) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Anime non trouvé</h1>
          <a href="/" className="text-primary hover:text-secondary transition-colors">
            Retour à l&apos;accueil →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover scale-110 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-end"
          >
            {/* Poster */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full rounded-xl shadow-2xl shadow-black/50 border border-white/10"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {anime.title_english || anime.title}
              </h1>
              
              {anime.title_japanese && (
                <p className="text-lg text-gray-400">{anime.title_japanese}</p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {anime.score && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-light">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-white">{anime.score.toFixed(1)}</span>
                    <span className="text-gray-400">({anime.scored_by?.toLocaleString()} votes)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{anime.year || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <TV className="w-4 h-4" />
                  <span>{anime.type}</span>
                </div>
                {anime.episodes && (
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{anime.episodes} épisodes</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsInList(!isInList)}
                  className={`btn-primary flex items-center gap-2 ${isInList ? 'bg-green-600' : ''}`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span>{isInList ? 'Dans ma liste' : 'Ajouter à ma liste'}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`btn-secondary flex items-center gap-2 ${isFavorite ? 'text-red-400 border-red-400' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-400' : ''}`} />
                  <span>Favori</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Partager</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Synopsis */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed">{anime.synopsis}</p>
            </section>

            {/* Details */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Informations
              </h2>
              <div className="glass rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Statut</p>
                    <p className="text-white font-medium">{anime.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Diffusion</p>
                    <p className="text-white font-medium">{anime.aired.string}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Durée</p>
                    <p className="text-white font-medium">{anime.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Classification</p>
                    <p className="text-white font-medium">{anime.rating}</p>
                  </div>
                  {anime.studios.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm">Studio</p>
                      <p className="text-white font-medium">
                        {anime.studios.map(s => s.name).join(', ')}
                      </p>
                    </div>
                  )}
                  {anime.producers.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm">Producteurs</p>
                      <p className="text-white font-medium">
                        {anime.producers.slice(0, 3).map(p => p.name).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Trailer */}
            {anime.trailer.youtube_id && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  Bande-annonce
                </h2>
                <div className="aspect-video rounded-xl overflow-hidden glass">
                  <iframe
                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                    title="Trailer"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="glass rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Popularité</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Rang</span>
                  <span className="text-white font-medium">#{anime.rank || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Popularité</span>
                  <span className="text-white font-medium">#{anime.popularity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Membres</span>
                  <span className="text-white font-medium">{anime.members?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favoris</span>
                  <span className="text-white font-medium">{anime.favorites?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Recommandations similaires
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map((rec) => (
                <AnimeCard
                  key={rec.mal_id}
                  anime={{
                    mal_id: rec.mal_id,
                    title: rec.title,
                    images: { jpg: { large_image_url: rec.image_url } },
                    score: null,
                    episodes: null,
                    type: '',
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
