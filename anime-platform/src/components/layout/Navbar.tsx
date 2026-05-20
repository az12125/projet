'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Menu, X, User, Bell, Home, Compass, List, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: 'Accueil', href: '/' },
    { icon: Compass, label: 'Découvrir', href: '/genres' },
    { icon: List, label: 'Ma Liste', href: '/lists' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon group-hover:shadow-neon-lg transition-shadow">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                AnimePlatform
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher un anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="w-full bg-surfaceLight/80 border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Search */}
              <button className="md:hidden p-2 rounded-lg glass-light hover:bg-primary/20 transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>

              {/* Notifications */}
              <button className="hidden sm:flex p-2 rounded-lg glass-light hover:bg-primary/20 transition-colors relative">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
              </button>

              {/* Profile */}
              <Link
                href="/profile"
                className="flex items-center gap-2 p-2 rounded-lg glass-light hover:bg-primary/20 transition-colors"
              >
                <User className="w-5 h-5 text-white" />
                <span className="hidden sm:block text-sm font-medium">Profil</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg glass-light hover:bg-primary/20 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 right-0 z-40 glass p-4 md:hidden"
        >
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  pathname === item.href
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-300 hover:bg-surfaceLight'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
