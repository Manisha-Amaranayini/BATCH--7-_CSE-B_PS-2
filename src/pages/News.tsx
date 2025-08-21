import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Calendar, Newspaper, TrendingUp, Globe } from 'lucide-react';

// Sample News content data
const newsContent = [
  {
    id: 1,
    title: "Breaking: Major Film Festival Announces Winners",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=entropy&auto=format",
    category: "Entertainment",
    language: "English",
    duration: "5 mins",
    publishTime: "2 hours ago",
    views: "125K",
    description: "Complete coverage of the prestigious film festival awards ceremony with exclusive interviews.",
    isLive: false,
    isTrending: true
  },
  {
    id: 2,
    title: "LIVE: Cricket World Cup Final Match Updates",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop&crop=entropy&auto=format",
    category: "Sports",
    language: "Hindi",
    duration: "Live",
    publishTime: "Live Now",
    views: "2.5M",
    description: "Live coverage and commentary of the most anticipated cricket match of the year.",
    isLive: true,
    isTrending: true
  },
  {
    id: 3,
    title: "Technology Breakthrough in Indian Space Mission",
    thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop&crop=entropy&auto=format",
    category: "Technology",
    language: "English",
    duration: "8 mins",
    publishTime: "4 hours ago",
    views: "89K",
    description: "Exclusive report on ISRO's latest achievements and future space exploration plans.",
    isLive: false,
    isTrending: false
  },
  {
    id: 4,
    title: "Regional Elections: Exit Poll Results and Analysis",
    thumbnail: "https://images.unsplash.com/photo-1587393855524-087f83d95ac9?w=600&h=400&fit=crop&crop=entropy&auto=format",
    category: "Politics",
    language: "Hindi",
    duration: "12 mins",
    publishTime: "1 hour ago",
    views: "456K",
    description: "Comprehensive analysis of exit polls from recent regional elections across multiple states.",
    isLive: false,
    isTrending: true
  },
  {
    id: 5,
    title: "Bollywood Star Announces New Production House",
    thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop&crop=entropy&auto=format",
    category: "Entertainment",
    language: "Hindi",
    duration: "6 mins",
    publishTime: "3 hours ago",
    views: "203K",
    description: "Exclusive interview and announcement details of the new production company launch.",
    isLive: false,
    isTrending: false
  },
  {
    id: 6,
    title: "Economic Reform: New Policy Announcements",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=entropy&auto=format",
    category: "Business",
    language: "English",
    duration: "10 mins",
    publishTime: "6 hours ago",
    views: "67K",
    description: "Detailed breakdown of the latest economic policies and their potential impact on various sectors.",
    isLive: false,
    isTrending: false
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  
  const categories = ['All', 'Entertainment', 'Sports', 'Politics', 'Technology', 'Business', 'Health'];
  const languages = ['All', 'Hindi', 'English', 'Tamil', 'Telugu', 'Marathi'];

  const filteredNews = newsContent.filter(news => {
    const categoryMatch = selectedCategory === 'all' || 
      news.category.toLowerCase() === selectedCategory.toLowerCase();
    const languageMatch = selectedLanguage === 'all' || 
      news.language.toLowerCase() === selectedLanguage.toLowerCase();
    return categoryMatch && languageMatch;
  });

  const liveNews = filteredNews.filter(news => news.isLive);
  const trendingNews = filteredNews.filter(news => news.isTrending && !news.isLive);

  return (
    <div className="min-h-screen bg-gradient-cyber">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Newspaper className="text-primary mr-3" size={40} />
            <h1 className="text-4xl font-bold text-neon">News & Updates</h1>
            <Globe className="text-electric ml-3" size={40} />
          </div>
          <p className="text-muted-foreground">Stay updated with the latest news from India and around the world</p>
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

        {/* Live News Section */}
        {liveNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              Live Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveNews.map(news => (
                <Card key={news.id} className="card-cyber overflow-hidden group border-red-500/30 bg-red-500/5">
                  <div className="relative">
                    <img 
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                        <Play size={20} />
                      </Button>
                    </div>

                    <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      LIVE
                    </div>

                    <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {news.views} watching
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="text-xs mr-2 border-red-500/50">
                        {news.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {news.language}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{news.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-1" />
                        <span>{news.publishTime}</span>
                      </div>

                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        <Play size={14} className="mr-1" />
                        Watch Live
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Trending News Section */}
        {trendingNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-electric mb-6 flex items-center">
              <TrendingUp className="mr-2" size={24} />
              Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingNews.map(news => (
                <Card key={news.id} className="card-cyber overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="lg" className="btn-neon">
                        <Play size={20} />
                      </Button>
                    </div>

                    <div className="absolute top-3 left-3 bg-electric px-2 py-1 rounded text-xs font-semibold text-white">
                      TRENDING
                    </div>

                    <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {news.views} views
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
                      <Clock size={12} className="mr-1" />
                      {news.duration}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="text-xs mr-2">
                        {news.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {news.language}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{news.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-1" />
                        <span>{news.publishTime}</span>
                      </div>

                      <Button size="sm" className="btn-neon">
                        <Play size={14} className="mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All News Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNews.map(news => (
              <Card key={news.id} className="card-cyber overflow-hidden group">
                <div className="relative">
                  <img 
                    src={news.thumbnail}
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className={news.isLive ? 'bg-red-600 hover:bg-red-700 text-white' : 'btn-neon'}>
                      <Play size={16} />
                    </Button>
                  </div>

                  {news.isLive && (
                    <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white animate-pulse">
                      LIVE
                    </div>
                  )}

                  {news.isTrending && !news.isLive && (
                    <div className="absolute top-2 left-2 bg-electric px-2 py-1 rounded text-xs font-semibold">
                      TRENDING
                    </div>
                  )}

                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {news.views} views
                  </div>

                  <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
                    <Clock size={12} className="mr-1" />
                    {news.duration}
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="text-xs mr-1">
                      {news.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {news.language}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{news.title}</h3>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Calendar size={12} className="mr-1" />
                    <span>{news.publishTime}</span>
                  </div>

                  <Button size="sm" className={`w-full ${news.isLive ? 'bg-red-600 hover:bg-red-700 text-white' : 'btn-neon'}`}>
                    <Play size={12} className="mr-1" />
                    {news.isLive ? 'Watch Live' : 'Watch'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="mx-auto mb-4 text-muted-foreground" size={64} />
            <p className="text-muted-foreground text-lg">No news found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLanguage('all');
              }}
              className="mt-4 btn-neon"
            >
              Show All News
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}