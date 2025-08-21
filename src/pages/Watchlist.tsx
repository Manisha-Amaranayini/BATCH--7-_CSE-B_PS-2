import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MovieCard, Movie } from '@/components/MovieCard';
import { SortControls, SortOption, applySorting } from '@/components/SortControls';
import { ReviewModal } from '@/components/ReviewModal';
import { 
  Heart, 
  Clock, 
  Eye, 
  Check, 
  Star, 
  Calendar,
  Trash2,
  Edit,
  MessageSquare
} from 'lucide-react';
import pushpaPoster from '@/assets/pushpa-poster.jpg';
import war2Poster from '@/assets/war2-poster.jpg';
import tiger3Poster from '@/assets/tiger3-poster.jpg';
import movie2018Poster from '@/assets/2018-poster.jpg';

// Sample watchlist data
const watchlistMovies: Movie[] = [
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
    isFavorite: true,
    personalRating: 0,
    personalNotes: "Can't wait to watch this sequel!"
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
    watchStatus: 'watching',
    isFavorite: true,
    personalRating: 8,
    personalNotes: "Great action sequences so far. Halfway through."
  },
  {
    id: 3,
    title: "Tiger 3",
    poster: tiger3Poster,
    rating: 8.1,
    genre: ["Action", "Thriller", "Spy"],
    language: "Hindi",
    year: 2024,
    duration: "2h 35m",
    description: "Agent Tiger's most dangerous mission.",
    watchStatus: 'watched',
    isFavorite: true,
    personalRating: 9,
    personalNotes: "Excellent spy thriller! The action was incredible and the story kept me hooked till the end."
  },
  {
    id: 4,
    title: "2018: Everyone is a Hero",
    poster: movie2018Poster,
    rating: 8.8,
    genre: ["Drama", "Thriller", "Biography"],
    language: "Malayalam",
    year: 2023,
    duration: "2h 25m",
    description: "Inspiring story of Kerala floods.",
    watchStatus: 'watched',
    isFavorite: true,
    personalRating: 10,
    personalNotes: "Emotional and powerful. A must-watch film about human resilience."
  }
];

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>(watchlistMovies);
  const [selectedTab, setSelectedTab] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('recently-added');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedMovieForReview, setSelectedMovieForReview] = useState<Movie | null>(null);

  const getFilteredMovies = (status?: Movie['watchStatus']) => {
    let filtered = status ? movies.filter(movie => movie.watchStatus === status) : movies;
    return applySorting(filtered, sortOption);
  };

  const getStatusCount = (status: Movie['watchStatus']) => {
    return movies.filter(movie => movie.watchStatus === status).length;
  };

  const handlePlay = (movie: Movie) => {
    console.log('Playing:', movie.title);
  };

  const handleWatchlistToggle = (movie: Movie) => {
    setMovies(prev => prev.filter(m => m.id !== movie.id));
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

  const handleRatingChange = (movieId: number, rating: number) => {
    setMovies(prev => prev.map(m => 
      m.id === movieId 
        ? { ...m, personalRating: rating }
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

  const handleRemoveFromWatchlist = (movieId: number) => {
    setMovies(prev => prev.filter(m => m.id !== movieId));
  };

  return (
    <div className="min-h-screen bg-gradient-cyber">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neon mb-2">My Watchlist</h1>
            <p className="text-muted-foreground">Track your movie journey</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <SortControls
              currentSort={sortOption}
              onSortChange={setSortOption}
              showPersonalRating={true}
              className=""
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="card-cyber p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Heart className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{movies.length}</p>
                <p className="text-sm text-muted-foreground">Total Movies</p>
              </div>
            </div>
          </Card>

          <Card className="card-cyber p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Clock className="text-yellow-500" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{getStatusCount('unwatched')}</p>
                <p className="text-sm text-muted-foreground">Want to Watch</p>
              </div>
            </div>
          </Card>

          <Card className="card-cyber p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-electric/20 rounded-full flex items-center justify-center">
                <Eye className="text-electric" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{getStatusCount('watching')}</p>
                <p className="text-sm text-muted-foreground">Currently Watching</p>
              </div>
            </div>
          </Card>

          <Card className="card-cyber p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="text-green-500" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{getStatusCount('watched')}</p>
                <p className="text-sm text-muted-foreground">Watched</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex bg-cyber-grey">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All ({movies.length})
            </TabsTrigger>
            <TabsTrigger value="unwatched" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Want to Watch ({getStatusCount('unwatched')})
            </TabsTrigger>
            <TabsTrigger value="watching" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Watching ({getStatusCount('watching')})
            </TabsTrigger>
            <TabsTrigger value="watched" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Watched ({getStatusCount('watched')})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map(movie => (
                <div key={movie.id} className="space-y-3">
                  <MovieCard
                    movie={movie}
                    onPlay={handlePlay}
                    onWatchlistToggle={handleWatchlistToggle}
                    onFavoriteToggle={handleFavoriteToggle}
                    onWatchStatusChange={handleWatchStatusChange}
                    onReviewClick={handleReviewClick}
                  />
                  
                  {/* Enhanced Personal Rating & Notes */}
                  {movie.watchStatus === 'watched' && (
                    <Card className="card-cyber p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">My Rating:</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <Star
                                key={rating}
                                size={16}
                                className={`cursor-pointer transition-colors ${
                                  rating <= (movie.personalRating || 0)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-400 hover:text-yellow-300'
                                }`}
                                onClick={() => handleRatingChange(movie.id, rating)}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">
                              {movie.personalRating ? `${movie.personalRating}/5` : 'No rating'}
                            </span>
                          </div>
                        </div>
                        
                        {movie.personalNotes && (
                          <div>
                            <p className="text-sm font-medium mb-2">My Review:</p>
                            <p className="text-sm text-muted-foreground bg-cyber-dark p-3 rounded leading-relaxed">
                              {movie.personalNotes}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-2 border-t border-cyber-light">
                          <Badge variant="outline" className="text-xs">
                            <Calendar size={12} className="mr-1" />
                            Watched {new Date().toLocaleDateString()}
                          </Badge>
                          
                          <div className="flex items-center space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="w-8 h-8 p-0 hover:bg-electric/20"
                              onClick={() => handleReviewClick(movie)}
                              title="Edit Review"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="w-8 h-8 p-0 hover:text-red-500"
                              onClick={() => handleRemoveFromWatchlist(movie.id)}
                              title="Remove from Watchlist"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  {/* Add Review Button for Unrated Movies */}
                  {movie.watchStatus === 'watched' && (!movie.personalRating || movie.personalRating === 0) && !movie.personalNotes && (
                    <Card className="card-cyber p-3 border-dashed border-cyber-light">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReviewClick(movie)}
                        className="w-full h-auto py-3 text-muted-foreground hover:text-primary border-none"
                      >
                        <MessageSquare size={16} className="mr-2" />
                        Add your review and rating
                      </Button>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unwatched" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {getFilteredMovies('unwatched').map(movie => (
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
          </TabsContent>

          <TabsContent value="watching" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {getFilteredMovies('watching').map(movie => (
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
          </TabsContent>

          <TabsContent value="watched" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {getFilteredMovies('watched').map(movie => (
                <div key={movie.id} className="space-y-3">
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handlePlay}
                    onWatchlistToggle={handleWatchlistToggle}
                    onFavoriteToggle={handleFavoriteToggle}
                    onWatchStatusChange={handleWatchStatusChange}
                    onReviewClick={handleReviewClick}
                  />
                  
                  {/* Enhanced Rating & Review */}
                  <Card className="card-cyber p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">My Rating:</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <Star
                              key={rating}
                              size={20}
                              className={`cursor-pointer transition-colors ${
                                rating <= (movie.personalRating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-400 hover:text-yellow-300'
                              }`}
                              onClick={() => handleRatingChange(movie.id, rating)}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">
                            {movie.personalRating ? `${movie.personalRating}/5 stars` : 'Not rated'}
                          </span>
                        </div>
                      </div>
                      
                      {movie.personalNotes && (
                        <div>
                          <p className="font-medium mb-2">My Review:</p>
                          <p className="text-sm text-muted-foreground bg-cyber-dark p-3 rounded leading-relaxed">
                            {movie.personalNotes}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t border-cyber-light">
                        <Badge variant="outline" className="text-xs">
                          <Calendar size={12} className="mr-1" />
                          Watched {new Date().toLocaleDateString()}
                        </Badge>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleReviewClick(movie)}
                            className="hover:bg-electric/20 text-xs"
                          >
                            <Edit size={14} className="mr-1" />
                            Edit Review
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleRemoveFromWatchlist(movie.id)}
                            className="hover:text-red-500 text-xs"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {movies.length === 0 && (
          <div className="text-center py-16">
            <Heart className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground mb-4">
              Start adding movies to track your entertainment journey
            </p>
            <Button className="btn-neon">
              Browse Movies
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