import { Search, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-serif text-2xl font-black tracking-tight hover:text-accent transition-colors">
              MANGA<span className="text-accent">語録</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 font-sans text-sm font-medium">
              <Link to="/" className="hover:text-accent transition-colors tracking-wider">
                QUOTES
              </Link>
              <Link to="/search" className="hover:text-accent transition-colors tracking-wider">
                SEARCH
              </Link>
              <Link to="/favorites" className="hover:text-accent transition-colors tracking-wider">
                FAVORITES
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/favorites" 
              className="p-2 hover:bg-secondary transition-colors border border-transparent hover:border-foreground"
              title="Favorites"
            >
              <Heart className="w-5 h-5" />
            </Link>
            
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-secondary transition-colors border border-transparent hover:border-foreground"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="mt-4 border-2 border-foreground bg-background animate-in slide-in-from-top-4 duration-300">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime, character, or quote..."
                className="flex-1 px-4 py-3 font-sans text-sm bg-transparent outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 border-l-2 border-foreground bg-accent text-background hover:bg-foreground hover:text-background transition-all duration-300 font-sans text-sm font-bold tracking-wider"
              >
                SEARCH
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
