'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Bell, Moon, Globe, Shield, User, Palette, Database, LogOut } from 'lucide-react';

const settingsSections = [
  {
    title: 'Compte',
    icon: User,
    items: [
      { label: 'Modifier le profil', description: 'Changez votre nom, email et avatar' },
      { label: 'Sécurité', description: 'Mot de passe et authentification' },
      { label: 'Confidentialité', description: 'Gérez vos données personnelles' },
    ],
  },
  {
    title: 'Préférences',
    icon: Palette,
    items: [
      { label: 'Apparence', description: 'Thème clair/sombre et couleurs' },
      { label: 'Langue', description: 'Français (actuel)' },
      { label: 'Notifications', description: 'Gérez vos alertes' },
    ],
  },
  {
    title: 'Données',
    icon: Database,
    items: [
      { label: 'Exporter mes données', description: 'Téléchargez vos listes et historiques' },
      { label: 'Importer des données', description: 'Importez depuis MAL ou AniList' },
      { label: 'Supprimer le compte', description: 'Action irréversible' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Paramètres
          </h1>
          <p className="text-gray-400">Gérez votre compte et vos préférences</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingsSections.map((section, sectionIndex) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <section.icon className="w-5 h-5 text-primary" />
                {section.title}
              </h2>
              
              <div className="glass rounded-xl overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={item.label}
                    className="w-full p-4 flex items-center justify-between hover:bg-surfaceLight transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <div className="text-left">
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Quick Toggles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Raccourcis</h2>
          
          <div className="glass rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">Mode sombre</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-surfaceLight peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-surfaceLight peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">Contenu adulte</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-surfaceLight peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </motion.section>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-full btn-secondary flex items-center justify-center gap-2 text-red-400 border-red-400/30 hover:bg-red-400/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </motion.button>
      </div>
    </main>
  );
}
