import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";

interface Quote {
  id: string;
  anime: string;
  character: string;
  text: string;
  image_url?: string;
  category?: string;
  japanese_title?: string;
}

interface Character {
  id: string;
  name: string;
  slug: string;
  japanese_name?: string;
  anime: string;
  anime_slug: string;
  bio?: string;
  role?: string;
  total_quotes: number;
}

const CharacterPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        setLoading(true);
        
        // Fetch character details
        const charRes = await fetch(`${backendUrl}/api/characters/${slug}`);
        const charData = await charRes.json();
        setCharacter(charData);

        // Fetch quotes for this character
        const quotesRes = await fetch(`${backendUrl}/api/quotes?character_slug=${slug}`);
        const quotesData = await quotesRes.json();
        setQuotes(quotesData);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character data:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchCharacterData();
    }
  }, [slug, backendUrl]);

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

  if (!character) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 mt-16 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Character Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b-4 border-foreground overflow-hidden">
        {/* Manga halftone pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Character info */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                {/* Japanese name */}
                {character.japanese_name && (
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-8 h-8 border-4 border-foreground rotate-45" />
                      <p className="font-serif text-4xl font-black tracking-tight">
                        {character.japanese_name}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* English name */}
                <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                  {character.name}
                </h1>
                
                {/* Anime link */}
                <Link 
                  to={`/anime/${character.anime_slug}`}
                  className="inline-block border-2 border-foreground px-6 py-3 mb-6 hover:bg-secondary transition-all duration-300 group"
                >
                  <span className="font-sans text-sm font-bold tracking-wider group-hover:tracking-widest transition-all">
                    FROM: {character.anime}
                  </span>
                </Link>
                
                {/* Role badge */}
                {character.role && (
                  <div className="mb-6">
                    <span className="border-2 border-foreground bg-accent text-background px-4 py-2 font-sans text-xs font-bold tracking-widest uppercase">
                      {character.role}
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                {/* Bio in speech bubble style */}
                {character.bio && (
                  <div className="relative border-4 border-foreground bg-white text-foreground p-8 shadow-lg">
                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-6 left-12 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-foreground" />
                    <div className="absolute -bottom-4 left-[54px] w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[18px] border-t-white" />
                    
                    <p className="font-sans text-base leading-relaxed">
                      {character.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-6">
              <div className="border-4 border-foreground px-8 py-4 bg-secondary">
                <span className="font-sans font-bold tracking-wider text-sm block mb-1">TOTAL QUOTES</span>
                <span className="font-serif text-4xl font-black">{character.total_quotes}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center space-y-4">
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
            MEMORABLE QUOTES
          </h2>
          <p className="font-sans text-sm tracking-[0.2em] text-muted-foreground">
            WORDS OF {character.name.toUpperCase()}
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
          <div className="text-center py-24 border-4 border-foreground bg-secondary/20">
            <div className="w-16 h-16 border-4 border-foreground rotate-45 mx-auto mb-6" />
            <p className="font-serif text-3xl font-bold mb-4">NO QUOTES AVAILABLE</p>
            <p className="font-sans text-muted-foreground">Check back later for updates</p>
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

export default CharacterPage;
