export interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: {
    from: string | null;
    to: string | null;
    string: string;
  };
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: Array<{
    mal_id: number;
    name: string;
  }>;
  studios: Array<{
    mal_id: number;
    name: string;
  }>;
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
  themes: Array<{
    mal_id: number;
    name: string;
  }>;
  demographics: Array<{
    mal_id: number;
    name: string;
  }>;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  characters?: Array<{
    mal_id: number;
    name: string;
    role: string;
    image_url: string;
  }>;
  recommendations?: Array<{
    mal_id: number;
    title: string;
    image_url: string;
  }>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserList {
  userId: string;
  animeId: number;
  status: 'watching' | 'completed' | 'planned' | 'dropped' | 'favorites';
  score?: number;
  episodesWatched?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Genre {
  mal_id: number;
  name: string;
  count: number;
}

export interface SeasonalAnime {
  season: string;
  year: number;
  anime: Anime[];
}

export type ListStatus = 'watching' | 'completed' | 'planned' | 'dropped' | 'favorites';
