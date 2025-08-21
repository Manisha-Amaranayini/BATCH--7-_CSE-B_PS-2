import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Film, 
  Tv, 
  Baby, 
  Newspaper, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  User,
  Settings
} from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/movies', icon: Film, label: 'Movies' },
    { path: '/shows', icon: Tv, label: 'Shows' },
    { path: '/kids', icon: Baby, label: 'Kids' },
    { path: '/news', icon: Newspaper, label: 'News' },
    { path: '/watchlist', icon: Heart, label: 'Watchlist' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-cyber-black/95 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">7</span>
            </div>
            <span className="text-2xl font-bold text-neon">7 Play</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={`
                    flex items-center space-x-2 transition-all duration-300
                    ${isActive(item.path) 
                      ? 'bg-primary text-primary-foreground glow-primary' 
                      : 'hover:bg-primary/20 hover:text-primary'
                    }
                  `}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button variant="ghost" size="sm" className="hover:bg-primary/20">
              <Search size={18} />
            </Button>
            
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="hover:bg-electric/20"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            {/* Profile */}
            <Button variant="ghost" size="sm" className="hover:bg-primary/20">
              <User size={18} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-3 flex items-center justify-between">
          {navItems.slice(0, 4).map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                className={`
                  flex flex-col items-center space-y-1 px-2 py-2 min-w-[60px]
                  ${isActive(item.path) 
                    ? 'bg-primary text-primary-foreground glow-soft' 
                    : 'hover:bg-primary/20 hover:text-primary'
                  }
                `}
              >
                <item.icon size={16} />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};