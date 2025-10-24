import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import { Heart } from "lucide-react";

interface Quote {
  id: string;
  anime: string;
  character: string;
  text: string;
  image_url?: string;
  category?: string;
  japanese_title?: string;
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      
      // Get favorite IDs from localStorage
      const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
      
      if (favIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      // Fetch all quotes and filter favorites
      const response = await fetch(`${backendUrl}/api/quotes?limit=1000`);
      const allQuotes = await response.json();
      
      const favoriteQuotes = allQuotes.filter((q: Quote) => favIds.includes(q.id));
      setFavorites(favoriteQuotes);
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setLoading(false);
    }
  };

  const removeFavorite = (id: string) => {
    const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = favIds.filter((fid: string) => fid !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    
    setFavorites(favorites.filter(f => f.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-sans text-lg tracking-wider">LOADING...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b-4 border-foreground overflow-hidden">
        {/* Heart pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-12 h-12 border-4 border-foreground rotate-45" />
              <Heart className="w-16 h-16 fill-red-600 text-red-600" />
              <div className="w-12 h-12 border-4 border-foreground rotate-45" />
            </div>
            
            <div>
              <h2 className="font-serif text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                お気に入り
              </h2>
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                YOUR FAVORITES
              </h1>
            </div>
            
            <p className="font-sans text-lg text-foreground/80 max-w-2xl mx-auto">
              Your personal collection of memorable quotes
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 pt-6">
              <div className="border-4 border-foreground bg-secondary px-8 py-4">
                <span className="font-sans font-bold tracking-wider text-sm block mb-1">
                  SAVED QUOTES
                </span>
                <span className="font-serif text-4xl font-black">{favorites.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="container mx-auto px-6 py-24">
        {favorites.length > 0 ? (
          <>
            <div className="mb-16 text-center space-y-4">
              <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
                SAVED COLLECTION
              </h2>
              <p className="font-sans text-sm tracking-[0.2em] text-muted-foreground">
                {favorites.length} FAVORITE {favorites.length === 1 ? 'QUOTE' : 'QUOTES'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {favorites.map((quote, index) => (
                <div 
                  key={quote.id}
                  className="opacity-0 animate-in fade-in-50 duration-700 relative group"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <QuoteCard
                    anime={quote.anime}
                    character={quote.character}
                    quote={quote.text}
                    image={quote.image_url || ''}
                    japaneseTitle={quote.japanese_title}
                  />
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFavorite(quote.id)}
                    className="absolute top-4 right-4 border-2 border-foreground bg-background p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white z-10"
                    title="Remove from favorites"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24 border-4 border-foreground bg-secondary/20 relative overflow-hidden">
            {/* Manga style broken heart */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <Heart className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 max-w-md mx-auto">
              <Heart className="w-24 h-24 mx-auto mb-8 text-muted-foreground" />
              <p className="font-serif text-4xl font-bold mb-4">NO FAVORITES YET</p>
              <p className="font-sans text-lg text-muted-foreground mb-8">
                Start adding quotes to your collection by clicking the heart icon on any quote
              </p>
              <Link 
                to="/"
                className="inline-block border-2 border-foreground px-8 py-4 hover:bg-secondary transition-all duration-300 group"
              >
                <span className="font-sans text-sm font-bold tracking-wider group-hover:tracking-widest transition-all">
                  EXPLORE QUOTES
                </span>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="font-serif text-2xl font-black hover:text-accent transition-colors">
              MANGA<span className="text-accent">語録</span>
            </Link>
            <p className="font-sans text-sm text-muted-foreground tracking-wider">
              © 2025 — PRESERVING MANGA LEGACY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FavoritesPage;
