'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { animeApi } from '@/lib/api';
import type { Anime } from '@/types';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    season: '',
    type: '',
    status: '',
    sort: 'popularity',
    order: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function search() {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const data = await animeApi.searchAnime(query, {
          genre: filters.genre ? parseInt(filters.genre) : undefined,
          year: filters.year ? parseInt(filters.year) : undefined,
          season: filters.season || undefined,
          type: filters.type || undefined,
          status: filters.status || undefined,
          sort: filters.sort || undefined,
          order: filters.order || undefined,
        });
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    search();
  }, [query, filters]);

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Search className="w-8 h-8 text-primary" />
                Résultats de recherche
              </h1>
              <p className="text-gray-400">
                {query ? `${results.length} résultats pour "${query}"` : 'Rechercher un anime'}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filtres</span>
            </button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-6 mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="input-modern"
                >
                  <option value="">Tous</option>
                  <option value="tv">TV</option>
                  <option value="movie">Film</option>
                  <option value="ova">OVA</option>
                  <option value="special">Special</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Statut</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="input-modern"
                >
                  <option value="">Tous</option>
                  <option value="airing">En diffusion</option>
                  <option value="finished">Terminé</option>
                  <option value="upcoming">À venir</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Année</label>
                <input
                  type="number"
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                  placeholder="2024"
                  className="input-modern"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Saison</label>
                <select
                  value={filters.season}
                  onChange={(e) => setFilters({ ...filters, season: e.target.value })}
                  className="input-modern"
                >
                  <option value="">Toutes</option>
                  <option value="winter">Hiver</option>
                  <option value="spring">Printemps</option>
                  <option value="summer">Été</option>
                  <option value="fall">Automne</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Trier par</label>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="input-modern"
                >
                  <option value="popularity">Popularité</option>
                  <option value="score">Note</option>
                  <option value="title">Titre</option>
                  <option value="episodes">Épisodes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ordre</label>
                <select
                  value={filters.order}
                  onChange={(e) => setFilters({ ...filters, order: e.target.value })}
                  className="input-modern"
                >
                  <option value="desc">Décroissant</option>
                  <option value="asc">Croissant</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({
                  genre: '',
                  year: '',
                  season: '',
                  type: '',
                  status: '',
                  sort: 'popularity',
                  order: 'desc',
                })}
                className="text-sm text-primary hover:text-secondary transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-xl skeleton" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map((anime, index) => (
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
        ) : query ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-400">Essayez avec d&apos;autres termes de recherche</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Commencez votre recherche</h3>
            <p className="text-gray-400">Utilisez la barre de recherche pour trouver des animes</p>
          </div>
        )}
      </div>
    </main>
  );
}
