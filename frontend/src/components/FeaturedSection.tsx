import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface FeaturedQuote {
  id: string;
  anime: string;
  character: string;
  text: string;
  japanese_title?: string;
}

const FeaturedSection = () => {
  const [featuredQuotes, setFeaturedQuotes] = useState<FeaturedQuote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/quotes/featured`);
        const data = await response.json();
        setFeaturedQuotes(data.slice(0, 5)); // Top 5 featured
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching featured quotes:", error);
      }
    };

    fetchFeatured();
  }, [backendUrl]);

  useEffect(() => {
    if (featuredQuotes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredQuotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredQuotes.length]);

  if (!loaded || featuredQuotes.length === 0) return null;

  const currentQuote = featuredQuotes[currentIndex];

  return (
    <section className="relative py-32 border-t-4 border-b-4 border-foreground overflow-hidden bg-secondary/30">
      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Speed lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,currentColor_50%,currentColor_51%,transparent_51%)] bg-[length:40px_40px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-8 border-4 border-red-600 rotate-45" />
              <h2 className="font-serif text-5xl md:text-7xl font-black tracking-tighter">
                FEATURED
              </h2>
              <div className="w-8 h-8 border-4 border-red-600 rotate-45" />
            </div>
            <p className="font-sans text-sm tracking-[0.3em] text-muted-foreground">
              LEGENDARY WORDS OF WISDOM
            </p>
          </div>

          {/* Quote Display */}
          <div 
            key={currentQuote.id}
            className="border-4 border-foreground p-8 md:p-16 bg-background relative animate-in fade-in-50 duration-500"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-red-600" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-red-600" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-red-600" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-red-600" />

            <div className="text-center space-y-8">
              {/* Quote text */}
              <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-red-600 font-black text-6xl mr-2">"</span>
                {currentQuote.text}
                <span className="text-red-600 font-black text-6xl ml-2">"</span>
              </blockquote>

              {/* Character info */}
              <div className="space-y-3 pt-8 border-t-4 border-foreground">
                <p className="font-sans text-xl font-bold tracking-widest">
                  — {currentQuote.character.toUpperCase()}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <p className="font-sans text-sm tracking-wider text-muted-foreground">
                    {currentQuote.anime}
                  </p>
                  {currentQuote.japanese_title && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">
                        {currentQuote.japanese_title}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {featuredQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 border-2 border-foreground transition-all duration-300 ${
                  index === currentIndex ? 'bg-red-600 border-red-600 w-12' : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          {/* View all link */}
          <div className="text-center mt-12">
            <Link 
              to="/search"
              className="inline-flex items-center gap-2 border-2 border-foreground px-8 py-4 hover:bg-secondary transition-all duration-300 group"
            >
              <span className="font-sans text-sm font-bold tracking-wider">
                EXPLORE ALL QUOTES
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
