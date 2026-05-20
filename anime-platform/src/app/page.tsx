"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Info, Star, TrendingUp, Clock, Search, Menu, X, 
  Home, Compass, List, User, Settings, Globe, Moon, Sun, 
  Monitor, Palette, Heart, Check, ChevronRight, Filter
} from "lucide-react";

// ==========================================
// 1. CONFIGURATION & DONNÉES STATIQUES
// ==========================================

type Language = 'fr' | 'en';
type Theme = 'dark' | 'light' | 'cyberpunk' | 'sakura' | 'amoled';

interface AnimeData {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string; large_image_url: string } };
  score: number;
  synopsis: string;
  episodes: number;
  status: string;
  genres: { name: string }[];
  trailer?: { youtube_id: string };
}

const TRANSLATIONS = {
  fr: {
    home: "Accueil",
    discover: "Découvrir",
    my_list: "Ma Liste",
    profile: "Profil",
    trending: "Tendances",
    top_rated: "Meilleures Notes",
    view_all: "Voir tout",
    watch_trailer: "Bande-annonce",
    more_info: "Plus d'infos",
    episodes: "épisodes",
    status: "Statut",
    search_placeholder: "Rechercher un anime...",
    add_to_list: "Ajouter à la liste",
    added: "Ajouté",
    seasons: "Saisons",
    genres: "Genres",
    loading: "Chargement...",
    welcome: "Bienvenue sur MyAnimeList Premium",
    subtitle: "La plateforme ultime pour découvrir et organiser vos animes.",
    no_results: "Aucun résultat trouvé.",
    popular: "Populaire",
    upcoming: "À venir",
    settings: "Paramètres",
    language: "Langue",
    theme: "Thème",
    close: "Fermer"
  },
  en: {
    home: "Home",
    discover: "Discover",
    my_list: "My List",
    profile: "Profile",
    trending: "Trending",
    top_rated: "Top Rated",
    view_all: "View All",
    watch_trailer: "Watch Trailer",
    more_info: "More Info",
    episodes: "eps",
    status: "Status",
    search_placeholder: "Search anime...",
    add_to_list: "Add to List",
    added: "Added",
    seasons: "Seasons",
    genres: "Genres",
    loading: "Loading...",
    welcome: "Welcome to MyAnimeList Premium",
    subtitle: "The ultimate platform to discover and organize your anime.",
    no_results: "No results found.",
    popular: "Popular",
    upcoming: "Upcoming",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    close: "Close"
  }
};

const THEMES_CONFIG = {
  dark: {
    bg: "#0a0a0f",
    cardBg: "#16161e",
    text: "#ffffff",
    textSec: "#a1a1aa",
    primary: "#8b5cf6", // Violet
    secondary: "#3b82f6", // Blue
    accent: "#ec4899",
    font: "Inter, sans-serif",
    radius: "12px",
    glow: "0 0 20px rgba(139, 92, 246, 0.3)"
  },
  light: {
    bg: "#f8fafc",
    cardBg: "#ffffff",
    text: "#0f172a",
    textSec: "#64748b",
    primary: "#4f46e5",
    secondary: "#0ea5e9",
    accent: "#ec4899",
    font: "Inter, sans-serif",
    radius: "12px",
    glow: "none"
  },
  cyberpunk: {
    bg: "#050505",
    cardBg: "#111111",
    text: "#00ff9d",
    textSec: "#008f5d",
    primary: "#fcee0a", // Yellow
    secondary: "#ff0055", // Pink
    accent: "#00ff9d",
    font: "'Courier New', monospace",
    radius: "0px",
    glow: "0 0 10px rgba(0, 255, 157, 0.5)"
  },
  sakura: {
    bg: "#fff0f5",
    cardBg: "#ffffff",
    text: "#5d4037",
    textSec: "#8d6e63",
    primary: "#ff80ab",
    secondary: "#ff4081",
    accent: "#ffd740",
    font: "Verdana, sans-serif",
    radius: "20px",
    glow: "0 0 15px rgba(255, 128, 171, 0.4)"
  },
  amoled: {
    bg: "#000000",
    cardBg: "#050505",
    text: "#e0e0e0",
    textSec: "#757575",
    primary: "#bb86fc",
    secondary: "#03dac6",
    accent: "#cf6679",
    font: "Roboto, sans-serif",
    radius: "8px",
    glow: "none"
  }
};

// ==========================================
// 2. COMPOSANTS UI RÉUTILISABLES (INTERNES)
// ==========================================

const Button = ({ children, variant = 'primary', className = '', onClick, icon: Icon }: any) => {
  const { themeVars } = useThemeContext();
  
  const baseStyle = "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all transform active:scale-95 disabled:opacity-50";
  const variants = {
    primary: `bg-[${themeVars.primary}] text-white shadow-lg hover:opacity-90`,
    outline: `border border-[${themeVars.primary}] text-[${themeVars.primary}] hover:bg-[${themeVars.primary}] hover:text-white`,
    ghost: `text-[${themeVars.textSec}] hover:text-[${themeVars.text}] hover:bg-white/5`
  };

  // Note: Inline styles are used for dynamic colors in this single-file setup
  const style = variant === 'primary' ? { backgroundColor: themeVars.primary, color: '#fff' } :
                variant === 'outline' ? { borderColor: themeVars.primary, color: themeVars.primary } :
                { color: themeVars.textSec };

  return (
    <button onClick={onClick} className={`${baseStyle} ${className}`} style={style}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

const AnimeCard = ({ anime, onClick }: { anime: AnimeData; onClick: () => void }) => {
  const { themeVars, t } = useThemeContext();
  
  return (
    <motion.div
      layoutId={`anime-${anime.mal_id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col gap-3"
      style={{ 
        backgroundColor: themeVars.cardBg, 
        borderRadius: themeVars.radius,
        boxShadow: themeVars.glow ? `0 4px 20px rgba(0,0,0,0.3)` : 'none'
      }}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg" style={{ borderRadius: themeVars.radius }}>
        <img 
          src={anime.images.jpg.image_url} 
          alt={anime.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <button className="w-full bg-white/20 backdrop-blur-md text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
            <Play size={16} fill="white" /> {t.watch_trailer}
          </button>
        </div>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-yellow-400 text-xs font-bold">
          <Star size={12} fill="currentColor" /> {anime.score || 'N/A'}
        </div>
      </div>
      
      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-bold text-sm line-clamp-2 leading-tight" style={{ color: themeVars.text }}>
          {anime.title}
        </h3>
        <div className="flex items-center justify-between text-xs" style={{ color: themeVars.textSec }}>
          <span>{anime.episodes || '?'} {t.episodes}</span>
          <span className="capitalize">{anime.status}</span>
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => {
  const { themeVars } = useThemeContext();
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeVars.primary}20`, color: themeVars.primary }}>
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold" style={{ color: themeVars.text }}>{title}</h2>
    </div>
  );
};

// ==========================================
// 3. CONTEXTE GLOBAL (HOOKS SIMULÉS)
// ==========================================

// We use a simple context pattern within the single file logic
let globalState: any = null;
const listeners = new Set<Function>();

const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [theme, setTheme] = useState<Theme>('dark');
  const [myList, setMyList] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS[language];
  const themeVars = THEMES_CONFIG[theme];

  const toggleList = (id: number) => {
    setMyList(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const value = {
    language, setLanguage,
    theme, setTheme,
    myList, toggleList,
    searchQuery, setSearchQuery,
    selectedAnime, setSelectedAnime,
    isMenuOpen, setIsMenuOpen,
    scrolled,
    t,
    themeVars
  };

  return (
    <AppStateContext.Provider value={value}>
      <style jsx global>{`
        body {
          background-color: ${themeVars.bg};
          color: ${themeVars.text};
          font-family: ${themeVars.font};
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        ::selection {
          background: ${themeVars.primary};
          color: #fff;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${themeVars.bg}; }
        ::-webkit-scrollbar-thumb { background: ${themeVars.primary}; border-radius: 4px; }
      `}</style>
      {children}
    </AppStateContext.Provider>
  );
};

const AppStateContext = React.createContext<any>(null);
const useApp = () => React.useContext(AppStateContext);
const useThemeContext = () => {
  const ctx = React.useContext(AppStateContext);
  if (!ctx) throw new Error("useThemeContext must be used within AppStateProvider");
  return ctx;
};

// ==========================================
// 4. COMPOSANTS PRINCIPAUX
// ==========================================

const Navbar = () => {
  const { t, theme, setTheme, language, setLanguage, scrolled, isMenuOpen, setIsMenuOpen, setSearchQuery, searchQuery } = useApp();
  
  const navItems = [
    { label: t.home, icon: Home },
    { label: t.discover, icon: Compass },
    { label: t.my_list, icon: List },
    { label: t.profile, icon: User },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'backdrop-blur-xl bg-black/20 border-white/10' : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <span className="text-xl font-bold hidden md:block tracking-tight">MyAnimeList<span className="text-violet-500">.Premium</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.label} className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-violet-400 transition-all">
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 w-48 focus:w-64 transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>

            <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
              <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="px-3 py-1 rounded-full text-xs font-bold hover:bg-white/10 transition-colors">
                {language.toUpperCase()}
              </button>
              <div className="w-px h-4 bg-white/20"></div>
              <button onClick={() => setTheme(theme === 'dark' ? 'cyberpunk' : theme === 'cyberpunk' ? 'sakura' : 'dark')} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                {theme === 'dark' ? <Moon size={16}/> : theme === 'cyberpunk' ? <Monitor size={16}/> : <Palette size={16}/>}
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6 text-lg">
              {navItems.map((item) => (
                <button key={item.label} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 font-medium">
                  <item.icon className="text-violet-500" /> {item.label}
                </button>
              ))}
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex items-center justify-between">
                <span>{t.language}</span>
                <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="font-bold text-violet-400">
                  {language === 'fr' ? 'English' : 'Français'}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.theme}</span>
                <div className="flex gap-2">
                  {(['dark', 'cyberpunk', 'sakura'] as Theme[]).map(th => (
                    <button key={th} onClick={() => setTheme(th)} className={`w-8 h-8 rounded-full border-2 ${theme === th ? 'border-white' : 'border-transparent'}`}>
                      <div className={`w-full h-full rounded-full ${th === 'dark' ? 'bg-black' : th === 'cyberpunk' ? 'bg-yellow-400' : 'bg-pink-300'}`}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = ({ anime }: { anime: AnimeData }) => {
  const { t, themeVars } = useApp();
  if (!anime) return null;

  return (
    <section className="relative w-full h-[85vh] rounded-3xl overflow-hidden mb-16 shadow-2xl group">
      {/* Background Image with Parallax-like feel */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-105"
        style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
      />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent" style={{ '--bg': themeVars.bg } as any} />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/90 via-[var(--bg)]/40 to-transparent" style={{ '--bg': themeVars.bg } as any} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl space-y-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4 border backdrop-blur-md bg-white/10 border-white/20 text-white shadow-lg">
            #1 {t.trending.toUpperCase()}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight mb-4">
            {anime.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm md:text-base font-medium">
            <span className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg backdrop-blur-sm">
              <Star fill="currentColor" size={18} /> {anime.score}
            </span>
            <span>{anime.episodes} {t.episodes}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span className="capitalize border border-white/20 px-3 py-1 rounded-lg bg-white/5">{anime.status}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{anime.genres.slice(0, 3).map(g => g.name).join(', ')}</span>
          </div>

          <p className="text-gray-300 line-clamp-3 mt-6 text-lg max-w-2xl leading-relaxed drop-shadow-md">
            {anime.synopsis}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" icon={Play}>{t.watch_trailer}</Button>
            <Button variant="outline" icon={Info}>{t.more_info}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AnimeModal = () => {
  const { selectedAnime, setSelectedAnime, t, themeVars, myList, toggleList } = useApp();
  
  if (!selectedAnime) return null;

  const isInList = myList.includes(selectedAnime.mal_id);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={() => setSelectedAnime(null)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        layoutId={`anime-${selectedAnime.mal_id}`}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl z-10"
        style={{ backgroundColor: themeVars.cardBg }}
      >
        <button 
          onClick={() => setSelectedAnime(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-md"
        >
          <X size={24} />
        </button>

        <div className="relative h-64 md:h-96 w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedAnime.images.jpg.large_image_url})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--cardBg)] to-transparent" style={{ '--cardBg': themeVars.cardBg } as any} />
        </div>

        <div className="relative px-6 md:px-10 pb-10 -mt-20 md:-mt-32">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl border-4 border-[var(--cardBg)]" style={{ '--cardBg': themeVars.cardBg } as any}>
              <img src={selectedAnime.images.jpg.image_url} alt={selectedAnime.title} className="w-full h-auto" />
            </div>
            
            <div className="flex-1 text-center md:text-left pt-4 md:pt-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: themeVars.text }}>{selectedAnime.title}</h2>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                {selectedAnime.genres.map((g, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-bold border" style={{ borderColor: themeVars.primary, color: themeVars.primary }}>
                    {g.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <span className="block opacity-60 mb-1">{t.status}</span>
                  <span className="font-bold capitalize">{selectedAnime.status}</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <span className="block opacity-60 mb-1">{t.episodes}</span>
                  <span className="font-bold">{selectedAnime.episodes || '?'}</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <span className="block opacity-60 mb-1">Score</span>
                  <span className="font-bold text-yellow-400 flex items-center justify-center md:justify-start gap-1">
                    <Star size={14} fill="currentColor" /> {selectedAnime.score}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <span className="block opacity-60 mb-1">Rank</span>
                  <span className="font-bold">#{selectedAnime.mal_id}</span>
                </div>
              </div>

              <div className="prose max-w-none mb-8 opacity-90" style={{ color: themeVars.textSec }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: themeVars.text }}>Synopsis</h3>
                <p className="leading-relaxed">{selectedAnime.synopsis}</p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button 
                  variant={isInList ? 'outline' : 'primary'} 
                  icon={isInList ? Check : Heart}
                  onClick={() => toggleList(selectedAnime.mal_id)}
                >
                  {isInList ? t.added : t.add_to_list}
                </Button>
                <Button variant="ghost" icon={Play}>{t.watch_trailer}</Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 5. PAGE PRINCIPALE (LOGIC & RENDER)
// ==========================================

export default function Home() {
  const [trending, setTrending] = useState<AnimeData[]>([]);
  const [topRated, setTopRated] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, t, themeVars } = useApp(); // This will fail if not wrapped, so we wrap below

  // Since we can't use hooks before the provider in the same component easily without restructuring,
  // we will create the InnerHome component that consumes the context.
  return (
    <AppStateProvider>
      <InnerHome />
    </AppStateProvider>
  );
}

function InnerHome() {
  const [trending, setTrending] = useState<AnimeData[]>([]);
  const [topRated, setTopRated] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSelectedAnime, t, themeVars } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Trending
        const trendRes = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=12");
        const trendData = await trendRes.json();
        setTrending(trendData.data || []);

        // Fetch Top Rated
        const rateRes = await fetch("https://api.jikan.moe/v4/top/anime?filter=byscore&limit=12");
        const rateData = await rateRes.json();
        setTopRated(rateData.data || []);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredTrending = useMemo(() => {
    if (!searchQuery) return trending;
    return trending.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [trending, searchQuery]);

  const filteredTop = useMemo(() => {
    if (!searchQuery) return topRated;
    return topRated.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [topRated, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeVars.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: themeVars.primary, borderTopColor: 'transparent' }}></div>
          <p className="font-bold animate-pulse" style={{ color: themeVars.textSec }}>{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: themeVars.bg }}>
      <Navbar />
      
      <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        {!searchQuery && trending.length > 0 && (
          <HeroSection anime={trending[0]} />
        )}

        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{ color: themeVars.text }}>
              Résultats pour "{searchQuery}"
            </h2>
          </div>
        )}

        {/* Trending Section */}
        {(filteredTrending.length > 0 || !searchQuery) && (
          <section className="mb-16">
            <SectionHeader title={searchQuery ? "" : t.trending} icon={TrendingUp} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredTrending.map(anime => (
                <AnimeCard key={anime.mal_id} anime={anime} onClick={() => setSelectedAnime(anime)} />
              ))}
            </div>
            {filteredTrending.length === 0 && searchQuery && (
              <p className="text-center py-12 opacity-60">{t.no_results}</p>
            )}
          </section>
        )}

        {/* Top Rated Section */}
        {(filteredTop.length > 0 || !searchQuery) && (
          <section className="mb-16">
            <SectionHeader title={searchQuery ? "" : t.top_rated} icon={Star} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredTop.map(anime => (
                <AnimeCard key={anime.mal_id} anime={anime} onClick={() => setSelectedAnime(anime)} />
              ))}
            </div>
             {filteredTop.length === 0 && searchQuery && (
              <p className="text-center py-12 opacity-60">{t.no_results}</p>
            )}
          </section>
        )}
      </main>

      <AnimeModal />
      
      {/* Footer Simple */}
      <footer className="border-t border-white/5 py-8 text-center text-sm opacity-50" style={{ borderColor: themeVars.textSec }}>
        <p>Data provided by Jikan API • Designed for Premium Experience</p>
      </footer>
    </div>
  );
}
