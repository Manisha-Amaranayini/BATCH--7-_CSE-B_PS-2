import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Plus, Info } from 'lucide-react';
import pushpaPoster from '@/assets/pushpa-poster.jpg';
import war2Poster from '@/assets/war2-poster.jpg';
import cooliePoster from '@/assets/coolie-poster.jpg';
import tiger3Poster from '@/assets/tiger3-poster.jpg';
import movie2018Poster from '@/assets/2018-poster.jpg';
import kgf3Poster from '@/assets/kgf3-poster.jpg';

const featuredMovies = [
  {
    id: 1,
    title: "Pushpa: The Rule",
    description: "Pushpa Raj returns with more power and intensity in this highly anticipated sequel.",
    language: "Telugu",
    rating: 8.9,
    poster: pushpaPoster,
    genre: ["Action", "Drama", "Thriller"]
  },
  {
    id: 2,
    title: "War 2",
    description: "The ultimate spy thriller continues with high-octane action and stunning visuals.",
    language: "Hindi",
    rating: 8.5,
    poster: war2Poster,
    genre: ["Action", "Thriller", "Spy"]
  },
  {
    id: 3,
    title: "Coolie",
    description: "A stylish action entertainer that promises to deliver edge-of-seat thrills.",
    language: "Telugu",
    rating: 8.2,
    poster: cooliePoster,
    genre: ["Action", "Comedy", "Drama"]
  },
  {
    id: 4,
    title: "Tiger 3",
    description: "Agent Tiger is back for his most dangerous mission yet in this action spectacle.",
    language: "Hindi",
    rating: 8.1,
    poster: tiger3Poster,
    genre: ["Action", "Thriller", "Spy"]
  },
  {
    id: 5,
    title: "2018: Everyone is a Hero",
    description: "The inspiring true story of Kerala's devastating floods and heroic rescue operations.",
    language: "Malayalam",
    rating: 8.8,
    poster: movie2018Poster,
    genre: ["Drama", "Thriller", "Biography"]
  },
  {
    id: 6,
    title: "KGF Chapter 3",
    description: "The gold mining saga reaches its epic conclusion with Rocky's final chapter.",
    language: "Kannada",
    rating: 9.1,
    poster: kgf3Poster,
    genre: ["Action", "Drama", "Period"]
  }
];

export const HeroSection = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setScrollPosition(prev => prev - 1);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const movie = featuredMovies[currentMovie];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${movie.poster})`,
          filter: 'brightness(0.3) blur(1px)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black via-cyber-black/80 to-transparent" />
      
      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Movie Info */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  {movie.language}
                </span>
                <span className="px-3 py-1 bg-electric text-white text-sm font-semibold rounded-full">
                  ★ {movie.rating}
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <span 
                    key={genre}
                    className="px-2 py-1 bg-cyber-grey text-gray-300 text-xs rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                {movie.description}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-neon px-8 py-3 text-lg">
                <Play className="mr-2" size={20} />
                Play Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="mr-2" size={20} />
                Add to Watchlist
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="px-8 py-3 text-lg text-white hover:bg-white/10"
              >
                <Info className="mr-2" size={20} />
                More Info
              </Button>
            </div>
          </div>
          
          {/* Right Side - Featured Poster */}
          <div className="relative lg:flex justify-end">
            <div className="relative group">
              <img 
                src={movie.poster}
                alt={movie.title}
                className="w-80 h-[500px] object-cover rounded-2xl shadow-2xl poster-hover glow-primary"
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="lg" className="btn-neon animate-neon-pulse">
                  <Play size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scrolling Movie Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-black/90 to-transparent overflow-hidden">
        <div 
          className="flex items-center space-x-4 h-full"
          style={{ transform: `translateX(${scrollPosition}px)` }}
        >
          {[...featuredMovies, ...featuredMovies].map((movie, index) => (
            <div 
              key={`${movie.id}-${index}`}
              className="flex-shrink-0 w-20 h-28 cursor-pointer poster-hover"
              onClick={() => setCurrentMovie(movie.id - 1)}
            >
              <img 
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Movie Indicators */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovie(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentMovie ? 'bg-primary w-8' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};