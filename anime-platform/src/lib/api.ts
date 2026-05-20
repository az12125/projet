import axios from 'axios';
import { Anime, Genre, SeasonalAnime } from '@/types';

const BASE_URL = 'https://api.jikan.moe/v4';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Rate limiting helper
let lastRequestTime = 0;
const REQUEST_DELAY = 500; // 500ms between requests

async function makeRequest<T>(url: string): Promise<T> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < REQUEST_DELAY) {
    await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  
  try {
    const response = await api.get<T>(url);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const animeApi = {
  // Get top anime
  getTopAnime: async (limit: number = 25, page: number = 1): Promise<Anime[]> => {
    const data = await makeRequest<{ data: Anime[] }>(`/top/anime?limit=${limit}&page=${page}`);
    return data.data;
  },

  // Get trending anime
  getTrendingAnime: async (limit: number = 25): Promise<Anime[]> => {
    const data = await makeRequest<{ data: Anime[] }>('/trending/anime?limit=' + limit);
    return data.data;
  },

  // Get popular anime
  getPopularAnime: async (limit: number = 25, page: number = 1): Promise<Anime[]> => {
    const data = await makeRequest<{ data: Anime[] }>(`/anime?page=${page}&limit=${limit}&order_by=popularity&sort=asc`);
    return data.data;
  },

  // Get anime by season
  getSeasonalAnime: async (year: number, season: string): Promise<SeasonalAnime> => {
    const data = await makeRequest<SeasonalAnime>(`/seasons/${year}/${season.toLowerCase()}`);
    return data;
  },

  // Get current season anime
  getCurrentSeasonAnime: async (): Promise<SeasonalAnime> => {
    const data = await makeRequest<SeasonalAnime>('/seasons/now');
    return data;
  },

  // Get anime details
  getAnimeDetails: async (id: number): Promise<Anime> => {
    const data = await makeRequest<{ data: Anime }>(`/anime/${id}`);
    return data.data;
  },

  // Get anime characters
  getAnimeCharacters: async (id: number): Promise<any[]> => {
    const data = await makeRequest<{ data: any[] }>(`/anime/${id}/characters`);
    return data.data;
  },

  // Get anime recommendations
  getAnimeRecommendations: async (id: number): Promise<any[]> => {
    const data = await makeRequest<{ data: any[] }>(`/anime/${id}/recommendations`);
    return data.data;
  },

  // Search anime
  searchAnime: async (
    query: string,
    options?: {
      genre?: number;
      year?: number;
      season?: string;
      type?: string;
      status?: string;
      sort?: string;
      order?: string;
    }
  ): Promise<Anime[]> => {
    let url = `/anime?q=${encodeURIComponent(query)}&sfw`;
    
    if (options?.genre) url += `&genres=${options.genre}`;
    if (options?.year) url += `&year=${options.year}`;
    if (options?.season) url += `&season=${options.season}`;
    if (options?.type) url += `&type=${options.type}`;
    if (options?.status) url += `&status=${options.status}`;
    if (options?.sort) url += `&order_by=${options.sort}`;
    if (options?.order) url += `&sort=${options.order}`;
    
    const data = await makeRequest<{ data: Anime[] }>(url);
    return data.data;
  },

  // Get genres
  getGenres: async (): Promise<Genre[]> => {
    const data = await makeRequest<{ data: Genre[] }>('/genres/anime');
    return data.data;
  },

  // Get anime by genre
  getAnimeByGenre: async (genreId: number, limit: number = 25): Promise<Anime[]> => {
    const data = await makeRequest<{ data: Anime[] }>(`/anime?genres=${genreId}&limit=${limit}`);
    return data.data;
  },

  // Get random anime
  getRandomAnime: async (): Promise<Anime> => {
    const data = await makeRequest<{ data: Anime }>('/random/anime');
    return data.data;
  },

  // Get upcoming anime
  getUpcomingAnime: async (limit: number = 25): Promise<Anime[]> => {
    const data = await makeRequest<{ data: Anime[] }>(`/seasons/upcoming?limit=${limit}`);
    return data.data;
  },
};

export default api;
