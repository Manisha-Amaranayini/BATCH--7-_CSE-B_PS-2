import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MovieCard, Movie } from '@/components/MovieCard';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Star, 
  Play, 
  ArrowRight, 
  Film, 
  Tv, 
  Baby, 
  Newspaper 
} from 'lucide-react';
import { ReviewModal } from '@/components/ReviewModal';
import pushpaPoster from '@/assets/pushpa-poster.jpg';
import war2Poster from '@/assets/war2-poster.jpg';
import cooliePoster from '@/assets/coolie-poster.jpg';
import tiger3Poster from '@/assets/tiger3-poster.jpg';

// Sample featured content
const featuredMovies: Movie[] = [
  {
    id: 1,
    title: "Pushpa: The Rule",
    poster: pushpaPoster,
    rating: 8.9,
    genre: ["Action", "Drama", "Thriller"],
    language: "Telugu",
    year: 2024,
    duration: "2h 45m",
    description: "Pushpa Raj returns with more power and intensity.",
    watchStatus: 'unwatched',
    isFavorite: false
  },
  {
    id: 2,
    title: "War 2",
    poster: war2Poster,
    rating: 8.5,
    genre: ["Action", "Thriller", "Spy"],
    language: "Hindi",
    year: 2024,
    duration: "2h 30m",
    description: "The ultimate spy thriller continues.",
    watchStatus: 'unwatched',
    isFavorite: false
  },
  {
    id: 3,
    title: "Coolie",
    poster: cooliePoster,
    rating: 8.2,
    genre: ["Action", "Comedy", "Drama"],
    language: "Telugu",
    year: 2024,
    duration: "2h 20m",
    description: "A stylish action entertainer.",
    watchStatus: 'unwatched',
    isFavorite: false
  },
  {
    id: 4,
    title: "Tiger 3",
    poster: tiger3Poster,
    rating: 8.1,
    genre: ["Action", "Thriller", "Spy"],
    language: "Hindi",
    year: 2024,
    duration: "2h 35m",
    description: "Agent Tiger's most dangerous mission.",
    watchStatus: 'unwatched',
    isFavorite: false
  }
];

const Index = () => {
  const handlePlay = (movie: Movie) => {
    console.log('Playing:', movie.title);
  };

  const handleWatchlistToggle = (movie: Movie) => {
    console.log('Toggle watchlist:', movie.title);
  };

  const handleFavoriteToggle = (movie: Movie) => {
    console.log('Toggle favorite:', movie.title);
  };

  const handleWatchStatusChange = (movie: Movie, status: Movie['watchStatus']) => {
    console.log('Status change:', movie.title, status);
  };

  const handleReviewClick = (movie: Movie) => {
    console.log('Review click:', movie.title);
  };

  return (
    <div className="min-h-screen bg-animated">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-neon mb-8 text-center">Explore Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link to="/movies">
            <Card className="card-cyber p-6 text-center group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <Film className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Movies</h3>
              <p className="text-muted-foreground text-sm">Latest blockbusters and classics</p>
            </Card>
          </Link>
          
          <Link to="/shows">
            <Card className="card-cyber p-6 text-center group">
              <div className="w-16 h-16 bg-electric/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-electric/30 transition-colors">
                <Tv className="text-electric" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shows</h3>
              <p className="text-muted-foreground text-sm">Web series and TV shows</p>
            </Card>
          </Link>
          
          <Link to="/kids">
            <Card className="card-cyber p-6 text-center group">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/30 transition-colors">
                <Baby className="text-pink-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kids</h3>
              <p className="text-muted-foreground text-sm">Safe content for children</p>
            </Card>
          </Link>
          
          <Link to="/news">
            <Card className="card-cyber p-6 text-center group">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors">
                <Newspaper className="text-orange-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">News</h3>
              <p className="text-muted-foreground text-sm">Latest news and updates</p>
            </Card>
          </Link>
        </div>
        
        {/* Trending Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-electric flex items-center">
              <TrendingUp className="mr-3" size={32} />
              Trending This Week
            </h2>
            <Link to="/movies">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlay={handlePlay}
                onWatchlistToggle={handleWatchlistToggle}
                onFavoriteToggle={handleFavoriteToggle}
                onWatchStatusChange={handleWatchStatusChange}
                onReviewClick={handleReviewClick}
              />
            ))}
          </div>
        </div>
        
        {/* Languages Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neon mb-8 text-center">Content by Language</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Telugu', 'Hindi', 'Tamil', 'Malayalam', 'Kannada', 'Punjabi'].map(language => (
              <Card key={language} className="card-cyber p-4 text-center group cursor-pointer">
                <h3 className="font-semibold text-lg">{language}</h3>
                <p className="text-muted-foreground text-sm mt-1">Regional Content</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="card-cyber p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Movies Available</p>
          </Card>
          
          <Card className="card-cyber p-6 text-center">
            <div className="text-4xl font-bold text-electric mb-2">100+</div>
            <p className="text-muted-foreground">Web Series</p>
          </Card>
          
          <Card className="card-cyber p-6 text-center">
            <div className="text-4xl font-bold text-neon mb-2">8+</div>
            <p className="text-muted-foreground">Languages</p>
          </Card>
        </div>
        
        {/* Call to Action */}
        <Card className="card-cyber p-8 text-center bg-gradient-primary">
          <h3 className="text-2xl font-bold text-white mb-4">
            Start Your Entertainment Journey
          </h3>
          <p className="text-white/80 mb-6">
            Create your personalized watchlist and never miss your favorite content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/watchlist">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Create Watchlist
              </Button>
            </Link>
            <Link to="/movies">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Browse Movies
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
