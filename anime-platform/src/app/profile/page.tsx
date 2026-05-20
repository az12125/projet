'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { User, Star, Clock, Calendar, Heart, Bookmark, TrendingUp, Award } from 'lucide-react';

const stats = [
  { icon: Clock, label: 'Temps total', value: '245h 30m', color: 'text-blue-400' },
  { icon: Award, label: 'Animes vus', value: '156', color: 'text-purple-400' },
  { icon: Star, label: 'Note moyenne', value: '7.8', color: 'text-yellow-400' },
  { icon: TrendingUp, label: 'Genre favori', value: 'Action', color: 'text-green-400' },
];

const recentActivity = [
  { anime: 'Attack on Titan', episode: 25, action: 'regardé', time: 'Il y a 2h' },
  { anime: 'Demon Slayer', episode: 12, action: 'regardé', time: 'Il y a 1j' },
  { anime: 'One Piece', episode: 1072, action: 'ajouté aux favoris', time: 'Il y a 3j' },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          {/* Banner */}
          <div className="h-48 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
            <div className="absolute inset-0 bg-grid" />
          </div>
          
          {/* Avatar & Info */}
          <div className="absolute -bottom-16 left-8 flex items-end gap-4">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary p-1 shadow-neon-lg">
              <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-white">Utilisateur</h1>
              <p className="text-gray-400">Membre depuis 2024</p>
            </div>
          </div>
          
          {/* Stats Quick View */}
          <div className="absolute -bottom-12 right-0 flex gap-4">
            <button className="btn-primary flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Favoris</span>
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              <span className="hidden sm:inline">Liste</span>
            </button>
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="h-16" />

        {/* Stats Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Statistiques
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activity & Lists */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Activité récente
            </h2>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-4 hover:bg-surfaceLight transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.anime}</p>
                    <p className="text-sm text-gray-400">
                      Épisode {activity.episode} • {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Favorites Preview */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Favoris
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item * 0.05 }}
                  className="aspect-[2/3] rounded-lg bg-surface overflow-hidden cursor-pointer card-hover"
                >
                  <img
                    src={`https://cdn.myanimelist.net/images/anime/${item}/73245.jpg`}
                    alt="Anime"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            
            <a href="/lists" className="mt-4 block text-center text-primary hover:text-secondary transition-colors font-medium">
              Voir tous les favoris →
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
