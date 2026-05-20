import { cn } from './utils';

interface CardProps {
  anime: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        large_image_url: string;
      };
    };
    score?: number | null;
    episodes?: number | null;
    type?: string;
  };
  className?: string;
}

export function AnimeCard({ anime, className }: CardProps) {
  return (
    <a 
      href={`/anime/${anime.mal_id}`}
      className={cn(
        'group relative block rounded-xl overflow-hidden bg-surface cursor-pointer',
        'card-hover',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        
        {/* Score Badge */}
        {anime.score && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg glass-light backdrop-blur-sm">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-white">{anime.score.toFixed(1)}</span>
          </div>
        )}
        
        {/* Type Badge */}
        {anime.type && (
          <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-primary/80 backdrop-blur-sm text-xs font-medium text-white">
            {anime.type}
          </div>
        )}
        
        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-neon">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {anime.title}
        </h3>
        
        {anime.episodes && (
          <p className="text-xs text-gray-400">
            {anime.episodes} {anime.episodes === 1 ? 'Episode' : 'Episodes'}
          </p>
        )}
      </div>
    </a>
  );
}
