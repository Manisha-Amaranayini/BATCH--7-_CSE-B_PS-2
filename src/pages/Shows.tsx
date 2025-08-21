import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SortControls, SortOption, applySorting } from '@/components/SortControls';
import { Play, Plus, Heart, Star, Calendar, Tv, Clock } from 'lucide-react';

// Sample TV Shows data
const tvShows = [
  {
    id: 1,
    title: "Scam 1992",
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 9.5,
    genre: ["Drama", "Biography", "Thriller"],
    language: "Hindi",
    seasons: 1,
    episodes: 10,
    year: 2020,
    description: "The story of India's biggest financial scam.",
    status: "Completed"
  },
  {
    id: 2,
    title: "The Family Man",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.7,
    genre: ["Action", "Drama", "Thriller"],
    language: "Hindi",
    seasons: 2,
    episodes: 19,
    year: 2021,
    description: "A middle-class man secretly works for the National Investigation Agency.",
    status: "Ongoing"
  },
  {
    id: 3,
    title: "Arya",
    poster: "https://images.unsplash.com/photo-1489599511037-746e80dd0c91?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.4,
    genre: ["Crime", "Drama", "Thriller"],
    language: "Tamil",
    seasons: 3,
    episodes: 24,
    year: 2023,
    description: "A gripping crime drama set in Chennai.",
    status: "Ongoing"
  },
  {
    id: 4,
    title: "Delhi Crime",
    poster: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.5,
    genre: ["Crime", "Drama", "Thriller"],
    language: "Hindi",
    seasons: 2,
    episodes: 14,
    year: 2022,
    description: "Based on true events from Delhi Police files.",
    status: "Completed"
  },
  {
    id: 5,
    title: "Rocket Boys",
    poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.9,
    genre: ["Biography", "Drama", "History"],
    language: "Hindi",
    seasons: 1,
    episodes: 8,
    year: 2022,
    description: "The story of India's nuclear scientists Dr. Homi J. Bhabha and Dr. A.P.J. Abdul Kalam.",
    status: "Completed"
  },
  {
    id: 6,
    title: "Mumbai Diaries 26/11",
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.2,
    genre: ["Drama", "Thriller", "Medical"],
    language: "Hindi",
    seasons: 1,
    episodes: 8,
    year: 2021,
    description: "Medical drama set during the 26/11 Mumbai attacks.",
    status: "Completed"
  }
];

export default function Shows() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('year-desc');
  
  const categories = ['All', 'Drama', 'Thriller', 'Action', 'Comedy', 'Crime', 'Biography'];
  const languages = ['All', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'];

  const filteredShows = tvShows.filter(show => {
    const categoryMatch = selectedCategory === 'all' || 
      show.genre.some(g => g.toLowerCase() === selectedCategory.toLowerCase());
    const languageMatch = selectedLanguage === 'all' || 
      show.language.toLowerCase() === selectedLanguage.toLowerCase();
    return categoryMatch && languageMatch;
  });

  // Apply sorting to filtered shows
  const sortedShows = applySorting(filteredShows, sortOption);

  return (
    <div className="min-h-screen bg-gradient-cyber">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neon mb-2">TV Shows & Series</h1>
            <p className="text-muted-foreground">Binge-watch the best Indian web series and shows</p>
          </div>
          
          <div className="mt-4 lg:mt-0">
            <SortControls
              currentSort={sortOption}
              onSortChange={setSortOption}
              showPersonalRating={false}
              className=""
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-cyber-grey border border-cyber-light rounded-md text-foreground focus:border-primary focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 bg-cyber-grey border border-cyber-light rounded-md text-foreground focus:border-primary focus:outline-none"
            >
              {languages.map(language => (
                <option key={language} value={language.toLowerCase()}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-electric mb-6">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedShows.slice(0, 3).map(show => (
              <Card key={show.id} className="card-cyber overflow-hidden group">
                <div className="relative">
                  <img 
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="lg" className="btn-neon">
                      <Play size={20} />
                    </Button>
                  </div>

                  <div className="absolute top-3 left-3 bg-primary px-2 py-1 rounded text-xs font-semibold">
                    TRENDING
                  </div>

                  <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
                    <Star size={12} className="mr-1 text-yellow-400" />
                    {show.rating}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{show.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{show.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Tv size={14} />
                      <span>{show.seasons} Season{show.seasons > 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>{show.episodes} Episodes</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {show.language}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {show.genre.map(genre => (
                      <Badge key={genre} variant="secondary" className="text-xs bg-cyber-grey">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button size="sm" className="btn-neon flex-1 mr-2">
                      <Play size={14} className="mr-1" />
                      Watch Now
                    </Button>
                    
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:text-primary">
                        <Plus size={16} />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:text-red-500">
                        <Heart size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Shows Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Shows</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {sortedShows.map(show => (
              <Card key={show.id} className="card-cyber overflow-hidden group">
                <div className="relative">
                  <img 
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-64 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className="btn-neon">
                      <Play size={16} />
                    </Button>
                  </div>

                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
                    <Star size={12} className="mr-1 text-yellow-400" />
                    {show.rating}
                  </div>

                  {show.status === 'Ongoing' && (
                    <div className="absolute top-2 left-2 bg-electric px-2 py-1 rounded text-xs font-semibold">
                      NEW
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 truncate">{show.title}</h3>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <span>{show.year}</span>
                    <span className="mx-1">•</span>
                    <span>{show.language}</span>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Tv size={12} className="mr-1" />
                    <span>{show.seasons}S</span>
                    <span className="mx-1">•</span>
                    <span>{show.episodes}E</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={show.status === 'Ongoing' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {show.status}
                    </Badge>
                    
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="w-6 h-6 p-0 hover:text-primary">
                        <Plus size={12} />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-6 h-6 p-0 hover:text-red-500">
                        <Heart size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {sortedShows.length === 0 && (
          <div className="text-center py-16">
            <Tv className="mx-auto mb-4 text-muted-foreground" size={64} />
            <p className="text-muted-foreground text-lg">No shows found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLanguage('all');
                setSortOption('year-desc');
              }}
              className="mt-4 btn-neon"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}