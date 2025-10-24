import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import OnePieceSection from "@/components/OnePieceSection";
import FeaturedSection from "@/components/FeaturedSection";
import AllAnimeSection from "@/components/AllAnimeSection";
import heroImage from "@/assets/hero-quote.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import OnePieceSection from "@/components/OnePieceSection";
import FeaturedSection from "@/components/FeaturedSection";
import AllAnimeSection from "@/components/AllAnimeSection";
import heroImage from "@/assets/hero-quote.jpg";

interface Quote {
  id: string;
  anime: string;
  character: string;
  text: string;
  image_url?: string;
  category?: string;
  japanese_title?: string;
}

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    setLoaded(true);
    
    // Fetch recent quotes
    const fetchQuotes = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/quotes?limit=12`);
        const data = await response.json();
        setRecentQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero" 
            className={`w-full h-full object-cover transition-transform duration-1000 ${loaded ? 'scale-100' : 'scale-110'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        {/* Manga speed lines overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_70%,currentColor_70%,currentColor_71%,transparent_71%)] bg-[length:100px_100px] animate-pulse" />
        </div>
        
        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 border-2 border-foreground rotate-45 animate-spin-slow" />
              <h2 className="font-serif text-7xl md:text-9xl font-black tracking-tighter leading-none animate-in zoom-in-50 duration-700">
                語録
              </h2>
              <div className="w-12 h-12 border-2 border-foreground rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight animate-in slide-in-from-bottom-10 duration-700 delay-300">
              TIMELESS WISDOM
            </h1>
            
            <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-foreground/80 animate-in fade-in duration-700 delay-500">
              Words that transcend panels and pages. <br />
              A curated collection of legendary quotes from the golden age of manga.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-8 animate-in fade-in duration-700 delay-700">
              <div className="h-px w-24 bg-foreground" />
              <span className="font-sans text-sm tracking-[0.3em]">SCROLL</span>
              <div className="h-px w-24 bg-foreground" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-foreground rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Quotes Section */}
      <FeaturedSection />

      {/* One Piece Section */}
      <OnePieceSection />

      {/* All Anime Series Section */}
      <AllAnimeSection />

      {/* Recent Quotes Grid */}
      <section className="container mx-auto px-6 py-24 border-t-4 border-foreground">
        <div className="mb-16 text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 border-4 border-foreground rotate-45" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
              ALL QUOTES
            </h2>
            <div className="w-8 h-8 border-4 border-foreground rotate-45" />
          </div>
          <p className="font-sans text-sm tracking-[0.2em] text-muted-foreground">
            LEGENDARY MOMENTS FROM YOUR FAVORITE ANIME
          </p>
        </div>
        
        {recentQuotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {recentQuotes.map((quote, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border-4 border-foreground animate-pulse">
                <div className="aspect-square bg-secondary" />
                <div className="p-6 space-y-4">
                  <div className="h-8 bg-secondary" />
                  <div className="h-px bg-foreground/20" />
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary" />
                    <div className="h-4 bg-secondary w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View more button */}
        <div className="text-center mt-16">
          <Link 
            to="/search"
            className="inline-block border-4 border-foreground px-12 py-6 bg-accent text-background hover:bg-foreground transition-all duration-300 group relative overflow-hidden"
          >
            {/* Hover effect */}
            <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative font-sans text-lg font-black tracking-widest">
              VIEW ALL QUOTES
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-foreground py-12 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="font-serif text-2xl font-black hover:text-accent transition-colors">
              MANGA<span className="text-accent">語録</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-sans">
              <Link to="/search" className="hover:text-accent transition-colors tracking-wider">
                SEARCH
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/favorites" className="hover:text-accent transition-colors tracking-wider">
                FAVORITES
              </Link>
            </div>
            <p className="font-sans text-sm text-muted-foreground tracking-wider">
              © 2025 — PRESERVING MANGA LEGACY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
