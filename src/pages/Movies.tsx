import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MovieCard, Movie } from '@/components/MovieCard';
import { SortControls, SortOption, applySorting } from '@/components/SortControls';
import { ReviewModal } from '@/components/ReviewModal';
import { Search, Filter, Grid, List } from 'lucide-react';
import pushpaPoster from '@/assets/pushpa-poster.jpg';
import war2Poster from '@/assets/war2-poster.jpg';
import cooliePoster from '@/assets/coolie-poster.jpg';
import tiger3Poster from '@/assets/tiger3-poster.jpg';
import movie2018Poster from '@/assets/2018-poster.jpg';
import kgf3Poster from '@/assets/kgf3-poster.jpg';

// Sample movies data
const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Pushpa: The Rule",
    poster: pushpaPoster,
    rating: 8.9,
    genre: ["Action", "Drama", "Thriller"],
    language: "Telugu",
    year: 2024,
    duration: "2h 45m",
    description: "Pushpa Raj returns with more power and intensity in this highly anticipated sequel.",
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
    description: "The ultimate spy thriller continues with high-octane action and stunning visuals.",
    watchStatus: 'watching',
    isFavorite: true
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
    description: "A stylish action entertainer that promises to deliver edge-of-seat thrills.",
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
    description: "Agent Tiger is back for his most dangerous mission yet in this action spectacle.",
    watchStatus: 'watched',
    isFavorite: true
  },
  {
    id: 5,
    title: "2018: Everyone is a Hero",
    poster: movie2018Poster,
    rating: 8.8,
    genre: ["Drama", "Thriller", "Biography"],
    language: "Malayalam",
    year: 2023,
    duration: "2h 25m",
    description: "The inspiring true story of Kerala's devastating floods and heroic rescue operations.",
    watchStatus: 'watched',
    isFavorite: true
  },
  {
    id: 6,
    title: "KGF Chapter 3",
    poster: kgf3Poster,
    rating: 9.1,
    genre: ["Action", "Drama", "Period"],
    language: "Kannada",
    year: 2024,
    duration: "2h 50m",
    description: "The gold mining saga reaches its epic conclusion with Rocky's final chapter.",
    watchStatus: 'unwatched',
    isFavorite: false
  }
];

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(sampleMovies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('year-desc');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedMovieForReview, setSelectedMovieForReview] = useState<Movie | null>(null);
  
  const languages = ['All', 'Telugu', 'Hindi', 'Malayalam', 'Kannada', 'Tamil', 'Punjabi'];
  const genres = ['All', 'Action', 'Drama', 'Thriller', 'Comedy', 'Romance', 'Horror', 'Sci-Fi'];
  const ratings = ['All', '9+', '8+', '7+', '6+'];

  // Filter and sort movies based on search and filters
  useEffect(() => {
    let filtered = movies;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(movie => 
        movie.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Rating filter
    if (selectedRating !== 'all') {
      const minRating = parseInt(selectedRating.replace('+', ''));
      filtered = filtered.filter(movie => movie.rating >= minRating);
    }

    // Apply sorting
    const sorted = applySorting(filtered, sortOption);
    setFilteredMovies(sorted);
  }, [movies, searchQuery, selectedLanguage, selectedGenre, selectedRating, sortOption]);

  const handlePlay = (movie: Movie) => {
    console.log('Playing:', movie.title);
    // Implement play functionality
  };

  const handleWatchlistToggle = (movie: Movie) => {
    setMovies(prev => prev.map(m => 
      m.id === movie.id 
        ? { ...m, watchStatus: m.watchStatus === 'unwatched' ? 'watching' : 'unwatched' }
        : m
    ));
  };

  const handleFavoriteToggle = (movie: Movie) => {
    setMovies(prev => prev.map(m => 
      m.id === movie.id 
        ? { ...m, isFavorite: !m.isFavorite }
        : m
    ));
  };

  const handleWatchStatusChange = (movie: Movie, status: Movie['watchStatus']) => {
    setMovies(prev => prev.map(m => 
      m.id === movie.id 
        ? { ...m, watchStatus: status }
        : m
    ));
  };

  const handleReviewClick = (movie: Movie) => {
    setSelectedMovieForReview(movie);
    setReviewModalOpen(true);
  };

  const handleReviewSave = (movieId: number, rating: number, notes: string) => {
    setMovies(prev => prev.map(m => 
      m.id === movieId 
        ? { ...m, personalRating: rating, personalNotes: notes }
        : m
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neon mb-2">Movies</h1>
            <p className="text-muted-foreground">Discover amazing movies from across India</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'btn-neon' : ''}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'btn-neon' : ''}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {/* Search, Filters and Sorting */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-8">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-cyber-grey border-cyber-light focus:border-primary"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 bg-cyber-grey border border-cyber-light rounded-md text-foreground focus:border-primary focus:outline-none"
          >
            {languages.map(lang => (
              <option key={lang} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-3 py-2 bg-cyber-grey border border-cyber-light rounded-md text-foreground focus:border-primary focus:outline-none"
          >
            {genres.map(genre => (
              <option key={genre} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-3 py-2 bg-cyber-grey border border-cyber-light rounded-md text-foreground focus:border-primary focus:outline-none"
          >
            {ratings.map(rating => (
              <option key={rating} value={rating.toLowerCase()}>
                {rating} Stars
              </option>
            ))}
          </select>

          <div className="flex items-center justify-end">
            <SortControls
              currentSort={sortOption}
              onSortChange={setSortOption}
              showPersonalRating={movies.some(m => m.personalRating && m.personalRating > 0)}
              className="w-full"
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlay={handlePlay}
              onWatchlistToggle={handleWatchlistToggle}
              onFavoriteToggle={handleFavoriteToggle}
              onWatchStatusChange={handleWatchStatusChange}
              onReviewClick={handleReviewClick}
              variant={viewMode === 'list' ? 'detailed' : 'default'}
            />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No movies found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
                setSelectedGenre('all');
                setSelectedRating('all');
                setSortOption('year-desc');
              }}
              className="mt-4 btn-neon"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => {
          setReviewModalOpen(false);
          setSelectedMovieForReview(null);
        }}
        movie={selectedMovieForReview}
        onSave={handleReviewSave}
      />
    </div>
  );
}