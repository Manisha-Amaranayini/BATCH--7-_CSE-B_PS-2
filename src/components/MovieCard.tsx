import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Plus, 
  Heart, 
  Star, 
  Clock,
  Check,
  Eye,
  Info,
  MoreHorizontal,
  Edit,
  MessageSquare
} from 'lucide-react';

export interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  genre: string[];
  language: string;
  year: number;
  duration: string;
  description: string;
  watchStatus: 'unwatched' | 'watching' | 'watched';
  isFavorite: boolean;
  personalRating?: number;
  personalNotes?: string;
}

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
  onFavoriteToggle: (movie: Movie) => void;
  onWatchStatusChange: (movie: Movie, status: Movie['watchStatus']) => void;
  onReviewClick?: (movie: Movie) => void;
  variant?: 'default' | 'compact' | 'detailed';
}

export const MovieCard = ({ 
  movie, 
  onPlay, 
  onWatchlistToggle, 
  onFavoriteToggle, 
  onWatchStatusChange,
  onReviewClick,
  variant = 'default' 
}: MovieCardProps) => {
  const [showActions, setShowActions] = useState(false);
  
  const getWatchStatusIcon = (status: Movie['watchStatus']) => {
    switch (status) {
      case 'watched': return <Check size={16} />;
      case 'watching': return <Eye size={16} />;
      default: return <Clock size={16} />;
    }
  };
  
  const getWatchStatusColor = (status: Movie['watchStatus']) => {
    switch (status) {
      case 'watched': return 'bg-green-600';
      case 'watching': return 'bg-electric';
      default: return 'bg-cyber-grey';
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="card-cyber w-48 flex-shrink-0">
        <div className="relative group">
          <img 
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
            <Button 
              size="sm" 
              className="btn-neon"
              onClick={() => onPlay(movie)}
            >
              <Play size={16} />
            </Button>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
            <Star size={12} className="mr-1 text-yellow-400" />
            {movie.rating}
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">{movie.year} • {movie.language}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="card-cyber overflow-hidden group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="relative">
        <img 
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onFavoriteToggle(movie)}
            className={`w-8 h-8 p-0 ${
              movie.isFavorite ? 'text-red-500' : 'text-white/70'
            } hover:text-red-500`}
          >
            <Heart size={16} fill={movie.isFavorite ? 'currentColor' : 'none'} />
          </Button>
          
          <div className={`px-2 py-1 rounded-full text-xs text-white flex items-center ${getWatchStatusColor(movie.watchStatus)}`}>
            {getWatchStatusIcon(movie.watchStatus)}
          </div>

          {/* Personal Rating Badge */}
          {movie.personalRating && movie.personalRating > 0 && (
            <div className="bg-electric/90 px-2 py-1 rounded text-xs text-white flex items-center">
              <Star size={12} className="mr-1 text-yellow-300 fill-current" />
              {movie.personalRating}
            </div>
          )}
        </div>
        
        {/* Rating */}
        <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded text-sm text-white flex items-center">
          <Star size={14} className="mr-1 text-yellow-400" />
          {movie.rating}
        </div>
        
        {/* Play Button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button 
            size="lg" 
            className="btn-neon animate-neon-pulse"
            onClick={() => onPlay(movie)}
          >
            <Play size={20} />
          </Button>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
          <div className="flex items-center text-sm text-gray-300 mb-2">
            <span>{movie.year}</span>
            <span className="mx-2">•</span>
            <span>{movie.duration}</span>
            <span className="mx-2">•</span>
            <span>{movie.language}</span>
          </div>
          
          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 3).map((genre) => (
              <Badge 
                key={genre}
                variant="secondary" 
                className="text-xs bg-cyber-grey text-gray-300"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Actions Bar */}
      <div className={`p-4 bg-card transition-all duration-300 ${
        showActions ? 'translate-y-0' : 'translate-y-full absolute bottom-0 left-0 right-0'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              className="btn-neon px-4"
              onClick={() => onPlay(movie)}
            >
              <Play size={14} className="mr-1" />
              Play
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onWatchlistToggle(movie)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Plus size={14} className="mr-1" />
              List
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const statuses: Movie['watchStatus'][] = ['unwatched', 'watching', 'watched'];
                const currentIndex = statuses.indexOf(movie.watchStatus);
                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                onWatchStatusChange(movie, nextStatus);
              }}
              className="w-8 h-8 p-0 hover:bg-primary/20"
            >
              {getWatchStatusIcon(movie.watchStatus)}
            </Button>
            
            {onReviewClick && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onReviewClick(movie)}
                className="w-8 h-8 p-0 hover:bg-electric/20"
                title="Add/Edit Review"
              >
                {movie.personalRating && movie.personalRating > 0 ? (
                  <Edit size={14} />
                ) : (
                  <MessageSquare size={14} />
                )}
              </Button>
            )}
            
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 hover:bg-primary/20"
            >
              <Info size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};