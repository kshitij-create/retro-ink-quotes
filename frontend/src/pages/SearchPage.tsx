import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import { Search } from "lucide-react";

interface Quote {
  id: string;
  anime: string;
  character: string;
  text: string;
  image_url?: string;
  category?: string;
  japanese_title?: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setSearched(true);
      
      const response = await fetch(`${backendUrl}/api/quotes/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setQuotes(data);
      
      setLoading(false);
    } catch (error) {
      console.error("Error searching quotes:", error);
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Search Hero */}
      <section className="relative pt-32 pb-24 border-b-4 border-foreground overflow-hidden">
        {/* Speed lines background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 12px)',
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 border-4 border-foreground rotate-45" />
              <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter leading-none">
                検索
              </h1>
              <div className="w-12 h-12 border-4 border-foreground rotate-45" />
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              SEARCH QUOTES
            </h2>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mt-12">
              <div className="relative border-4 border-foreground bg-background overflow-hidden group focus-within:shadow-2xl transition-shadow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anime, character, or quote..."
                  className="w-full px-6 py-6 font-sans text-lg bg-transparent outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-foreground bg-accent text-background p-4 hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </form>
            
            <p className="font-sans text-sm text-muted-foreground tracking-wider">
              SEARCH BY ANIME, CHARACTER, QUOTE TEXT, OR CATEGORY
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-6 py-24">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-sans text-lg tracking-wider">SEARCHING...</p>
            </div>
          </div>
        ) : searched ? (
          <>
            <div className="mb-16 text-center space-y-4">
              <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
                SEARCH RESULTS
              </h2>
              <p className="font-sans text-sm tracking-[0.2em] text-muted-foreground">
                {quotes.length} {quotes.length === 1 ? 'RESULT' : 'RESULTS'} FOR "{searchQuery}"
              </p>
            </div>
            
            {quotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {quotes.map((quote, index) => (
                  <div 
                    key={quote.id}
                    className="opacity-0 animate-in fade-in-50 duration-700"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <QuoteCard
                      anime={quote.anime}
                      character={quote.character}
                      quote={quote.text}
                      image={quote.image_url || ''}
                      japaneseTitle={quote.japanese_title}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border-4 border-foreground bg-secondary/20 relative overflow-hidden">
                {/* Manga style exclamation marks */}
                <div className="absolute top-8 left-8 font-serif text-6xl font-black text-foreground/10">
                  ！
                </div>
                <div className="absolute bottom-8 right-8 font-serif text-6xl font-black text-foreground/10">
                  ？
                </div>
                
                <div className="relative z-10">
                  <div className="w-24 h-24 border-4 border-foreground rotate-45 mx-auto mb-8" />
                  <p className="font-serif text-4xl font-bold mb-4">NO RESULTS FOUND</p>
                  <p className="font-sans text-lg text-muted-foreground mb-8">
                    Try searching with different keywords
                  </p>
                  <Link 
                    to="/"
                    className="inline-block border-2 border-foreground px-8 py-4 hover:bg-secondary transition-all duration-300"
                  >
                    <span className="font-sans text-sm font-bold tracking-wider">
                      RETURN HOME
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 border-4 border-foreground rotate-45 mx-auto" />
              <p className="font-serif text-3xl font-bold">START SEARCHING</p>
              <p className="font-sans text-muted-foreground">
                Enter keywords to find your favorite anime quotes
              </p>
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

export default SearchPage;
