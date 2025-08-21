import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, Star, Clock, Baby, Sparkles } from 'lucide-react';

// Sample Kids content data
const kidsContent = [
  {
    id: 1,
    title: "Chhota Bheem",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.2,
    genre: ["Adventure", "Comedy", "Family"],
    language: "Hindi",
    ageGroup: "3-8",
    type: "Series",
    episodes: 500,
    year: 2008,
    description: "Adventures of the brave and strong boy Bheem and his friends in the magical kingdom of Dholakpur.",
    duration: "22 mins"
  },
  {
    id: 2,
    title: "Motu Patlu",
    poster: "https://images.unsplash.com/photo-1587393855524-087f83d95ac9?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 7.9,
    genre: ["Comedy", "Adventure", "Family"],
    language: "Hindi",
    ageGroup: "4-10",
    type: "Series",
    episodes: 400,
    year: 2012,
    description: "Comedy adventures of two best friends in the colorful town of Furfuri Nagar.",
    duration: "11 mins"
  },
  {
    id: 3,
    title: "Super Bheem",
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.5,
    genre: ["Superhero", "Adventure", "Action"],
    language: "Hindi",
    ageGroup: "5-12",
    type: "Movie",
    episodes: 1,
    year: 2024,
    description: "Bheem gets superpowers and saves the world from evil forces in this action-packed adventure.",
    duration: "90 mins"
  },
  {
    id: 4,
    title: "Bal Hanuman",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.7,
    genre: ["Mythology", "Adventure", "Educational"],
    language: "Hindi",
    ageGroup: "4-10",
    type: "Series",
    episodes: 156,
    year: 2007,
    description: "Stories of young Hanuman's adventures and his journey of learning values and courage.",
    duration: "22 mins"
  },
  {
    id: 5,
    title: "Arjun: The Warrior Prince",
    poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.3,
    genre: ["Mythology", "Adventure", "Educational"],
    language: "Hindi",
    ageGroup: "6-14",
    type: "Movie",
    episodes: 1,
    year: 2012,
    description: "The epic tale of Arjuna's journey from a young prince to the greatest archer in the world.",
    duration: "96 mins"
  },
  {
    id: 6,
    title: "Shiva",
    poster: "https://images.unsplash.com/photo-1587393855524-087f83d95ac9?w=600&h=900&fit=crop&crop=entropy&auto=format",
    rating: 8.1,
    genre: ["Action", "Adventure", "Superhero"],
    language: "Hindi",
    ageGroup: "6-12",
    type: "Series",
    episodes: 200,
    year: 2015,
    description: "A young boy with superpowers fights against evil and protects his city Vedas.",
    duration: "11 mins"
  }
];

export default function Kids() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  
  const ageGroups = ['All', '3-8', '4-10', '5-12', '6-14'];
  const types = ['All', 'Series', 'Movie'];
  const languages = ['All', 'Hindi', 'Tamil', 'Telugu', 'English'];

  const filteredContent = kidsContent.filter(content => {
    const ageMatch = selectedAgeGroup === 'all' || content.ageGroup === selectedAgeGroup;
    const typeMatch = selectedType === 'all' || content.type.toLowerCase() === selectedType.toLowerCase();
    const languageMatch = selectedLanguage === 'all' || 
      content.language.toLowerCase() === selectedLanguage.toLowerCase();
    return ageMatch && typeMatch && languageMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Baby className="text-primary mr-3" size={40} />
            <h1 className="text-4xl font-bold text-neon">Kids Zone</h1>
            <Sparkles className="text-electric ml-3" size={40} />
          </div>
          <p className="text-muted-foreground">Fun, safe, and educational content for children</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="space-y-2">
            <label className="text-sm font-medium">Age Group</label>
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="px-3 py-2 bg-cyber-grey border border-cyber-light rounded-md text-foreground focus:border-primary focus:outline-none"
            >
              {ageGroups.map(age => (
                <option key={age} value={age.toLowerCase()}>
                  {age} Years
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-cyber-grey border border-cyber-light rounded-md text-foreground focus:border-primary focus:outline-none"
            >
              {types.map(type => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
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

        {/* Featured Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-electric mb-6 flex items-center">
            <Sparkles className="mr-2" size={24} />
            Popular with Kids
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.slice(0, 3).map(content => (
              <Card key={content.id} className="card-cyber overflow-hidden group bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/30">
                <div className="relative">
                  <img 
                    src={content.poster}
                    alt={content.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="lg" className="btn-electric">
                      <Play size={20} />
                    </Button>
                  </div>

                  <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-1 rounded-full text-xs font-semibold text-white">
                    POPULAR
                  </div>

                  <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
                    <Star size={12} className="mr-1 text-yellow-400" />
                    {content.rating}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock size={14} />
                      <span>{content.duration}</span>
                      <span>•</span>
                      <span>Ages {content.ageGroup}</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50">
                      {content.language}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {content.genre.map(genre => (
                      <Badge key={genre} className="text-xs bg-gradient-to-r from-blue-500/20 to-green-500/20 border-blue-500/50">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button size="sm" className="btn-electric flex-1 mr-2">
                      <Play size={14} className="mr-1" />
                      Watch Now
                    </Button>
                    
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:text-pink-500">
                      <Heart size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Kids Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Kids Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredContent.map(content => (
              <Card key={content.id} className="card-cyber overflow-hidden group">
                <div className="relative">
                  <img 
                    src={content.poster}
                    alt={content.title}
                    className="w-full h-64 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className="btn-electric">
                      <Play size={16} />
                    </Button>
                  </div>

                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
                    <Star size={12} className="mr-1 text-yellow-400" />
                    {content.rating}
                  </div>

                  <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-1 rounded-full text-xs font-semibold text-white">
                    {content.ageGroup}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 truncate">{content.title}</h3>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <span>{content.year}</span>
                    <span className="mx-1">•</span>
                    <span>{content.language}</span>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Clock size={12} className="mr-1" />
                    <span>{content.duration}</span>
                    {content.type === 'Series' && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{content.episodes} eps</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={content.type === 'Movie' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {content.type}
                    </Badge>
                    
                    <Button size="sm" variant="ghost" className="w-6 h-6 p-0 hover:text-pink-500">
                      <Heart size={12} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Banner */}
        <Card className="card-cyber p-8 text-center bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/30">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-blue-400 mr-2" size={32} />
            <h3 className="text-2xl font-bold text-electric">Safe & Educational</h3>
            <Sparkles className="text-green-400 ml-2" size={32} />
          </div>
          <p className="text-muted-foreground mb-4">
            All content is carefully curated for age-appropriate entertainment and learning
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">Parental Controls</Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/50">Educational Value</Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">Safe Content</Badge>
            <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/50">Age Appropriate</Badge>
          </div>
        </Card>

        {filteredContent.length === 0 && (
          <div className="text-center py-16">
            <Baby className="mx-auto mb-4 text-muted-foreground" size={64} />
            <p className="text-muted-foreground text-lg">No content found for the selected filters.</p>
            <Button 
              onClick={() => {
                setSelectedAgeGroup('all');
                setSelectedType('all');
                setSelectedLanguage('all');
              }}
              className="mt-4 btn-electric"
            >
              Show All Content
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}