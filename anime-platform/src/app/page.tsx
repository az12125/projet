'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/anime/HeroSection';
import { AnimeCarousel } from '@/components/anime/AnimeCarousel';
import { animeApi } from '@/lib/api';
import type { Anime } from '@/types';

export default function HomePage() {
  const [featuredAnime, setFeaturedAnime] = useState<Anime | null>(null);
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [trending, popular, top] = await Promise.all([
          animeApi.getTrendingAnime(15),
          animeApi.getPopularAnime(15),
          animeApi.getTopAnime(15),
        ]);

        setTrendingAnime(trending);
        setPopularAnime(popular);
        setTopAnime(top);
        
        // Set first trending as featured
        if (trending.length > 0) {
          const featured = trending[0];
          // Fetch full details for featured anime
          const fullDetails = await animeApi.getAnimeDetails(featured.mal_id);
          setFeaturedAnime(fullDetails);
        }
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
      
      {/* Hero Section */}
      {featuredAnime && !isLoading && (
        <HeroSection anime={featuredAnime} />
      )}
      
      {/* Loading State for Hero */}
      {isLoading && (
        <div className="h-[80vh] min-h-[600px] w-full bg-surface animate-pulse" />
      )}

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-20 relative z-10">
        <div className="space-y-8">
          {/* Trending Section */}
          <AnimeCarousel
            title="🔥 Tendances"
            animes={trendingAnime}
            isLoading={isLoading}
          />

          {/* Popular Section */}
          <AnimeCarousel
            title="⭐ Populaires"
            animes={popularAnime}
            isLoading={isLoading}
          />

          {/* Top Rated Section */}
          <AnimeCarousel
            title="🏆 Meilleures Notes"
            animes={topAnime}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
    </main>
  );
}
