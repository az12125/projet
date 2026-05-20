'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Bookmark, Heart, Clock, CheckCircle, Plus } from 'lucide-react';
import type { ListStatus } from '@/types';

const tabs = [
  { id: 'watching', label: 'En cours', icon: Clock, color: 'text-blue-400' },
  { id: 'completed', label: 'Terminé', icon: CheckCircle, color: 'text-green-400' },
  { id: 'planned', label: 'À regarder', icon: Bookmark, color: 'text-purple-400' },
  { id: 'favorites', label: 'Favoris', icon: Heart, color: 'text-red-400' },
];

// Demo data for illustration
const demoAnime = [
  { mal_id: 1, title: 'Attack on Titan', image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', score: 9.0 },
  { mal_id: 2, title: 'Demon Slayer', image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', score: 8.7 },
  { mal_id: 3, title: 'One Piece', image: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg', score: 8.9 },
  { mal_id: 4, title: 'Jujutsu Kaisen', image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg', score: 8.6 },
];

export default function ListsPage() {
  const [activeTab, setActiveTab] = useState<ListStatus>('watching');

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
          <h1 className="text-4xl font-bold text-white mb-2">Ma Liste</h1>
          <p className="text-gray-400">Gérez vos animes et suivez votre progression</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ListStatus)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'glass-light text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {demoAnime.map((anime, index) => (
                <motion.a
                  key={`${activeTab}-${anime.mal_id}`}
                  href={`/anime/${anime.mal_id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative block rounded-xl overflow-hidden bg-surface card-hover"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    
                    {/* Score Badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg glass-light backdrop-blur-sm">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-white">{anime.score.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {anime.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
              
              {/* Add Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: demoAnime.length * 0.05 }}
                className="aspect-[2/3] rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <Plus className="w-8 h-8" />
                <span className="text-sm font-medium">Ajouter</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {demoAnime.length === 0 && (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Votre liste est vide</h3>
            <p className="text-gray-400 mb-4">Commencez à ajouter des animes pour les suivre</p>
            <a href="/genres" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Découvrir des animes
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
