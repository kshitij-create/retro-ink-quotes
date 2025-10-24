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

interface Anime {
  id: string;
  name: string;
  slug: string;
  japanese_name: string;
  description: string;
  total_quotes: number;
  release_year?: number;
}

interface Character {
  name: string;
  slug: string;
  japanese_name?: string;
  image_url?: string;
}

const AnimePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setLoading(true);
        
        // Fetch anime details
        const animeRes = await fetch(`${backendUrl}/api/anime/${slug}`);
        const animeData = await animeRes.json();
        setAnime(animeData);

        // Fetch quotes for this anime
        const quotesRes = await fetch(`${backendUrl}/api/quotes?anime_slug=${slug}`);
        const quotesData = await quotesRes.json();
        setQuotes(quotesData);

        // Fetch characters for this anime
        const charsRes = await fetch(`${backendUrl}/api/characters?anime_slug=${slug}`);
        const charsData = await charsRes.json();
        setCharacters(charsData);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime data:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchAnimeData();
    }
  }, [slug, backendUrl]);

  const filteredQuotes = selectedCharacter
    ? quotes.filter(q => q.character === selectedCharacter)
    : quotes;

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

  if (!anime) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 mt-16 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Anime Not Found</h1>
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
        {/* Manga speed lines background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)',
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Japanese title */}
            <div className="mb-8 flex items-center gap-6">
              <div className="w-12 h-12 border-4 border-foreground rotate-45 flex-shrink-0" />
              <h2 className="font-serif text-6xl md:text-8xl font-black tracking-tighter leading-none">
                {anime.japanese_name}
              </h2>
            </div>
            
            {/* English title */}
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {anime.name}
            </h1>
            
            {/* Description */}
            <div className="border-l-4 border-foreground pl-6 mb-8">
              <p className="font-sans text-lg leading-relaxed text-foreground/80">
                {anime.description}
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 font-sans text-sm">
              <div className="border-2 border-foreground px-6 py-3 bg-secondary">
                <span className="font-bold tracking-wider">QUOTES: </span>
                <span className="text-2xl font-black">{anime.total_quotes}</span>
              </div>
              {anime.release_year && (
                <div className="border-2 border-foreground px-6 py-3">
                  <span className="font-bold tracking-wider">YEAR: </span>
                  <span className="text-2xl font-black">{anime.release_year}</span>
                </div>
              )}
              <div className="border-2 border-foreground px-6 py-3">
                <span className="font-bold tracking-wider">CHARACTERS: </span>
                <span className="text-2xl font-black">{characters.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Character Filter */}
      {characters.length > 0 && (
        <section className="py-12 border-b-2 border-foreground bg-secondary/20">
          <div className="container mx-auto px-6">
            <h3 className="font-serif text-3xl font-bold mb-6 flex items-center gap-4">
              <span>SELECT CHARACTER</span>
              <div className="flex-1 h-px bg-foreground/20" />
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCharacter(null)}
                className={`border-2 transition-all duration-300 px-6 py-3 font-sans text-sm font-bold tracking-wider ${
                  selectedCharacter === null
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-foreground hover:bg-secondary'
                }`}
              >
                ALL CHARACTERS
              </button>
              {characters.map((char) => (
                <button
                  key={char.slug}
                  onClick={() => setSelectedCharacter(char.name)}
                  className={`border-2 transition-all duration-300 px-6 py-3 font-sans text-sm font-bold tracking-wider ${
                    selectedCharacter === char.name
                      ? 'border-red-600 bg-red-600 text-white'
                      : 'border-foreground hover:bg-secondary'
                  }`}
                >
                  {char.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quotes Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center space-y-4">
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
            LEGENDARY QUOTES
          </h2>
          <p className="font-sans text-sm tracking-[0.2em] text-muted-foreground">
            {filteredQuotes.length} {filteredQuotes.length === 1 ? 'QUOTE' : 'QUOTES'} FOUND
          </p>
        </div>
        
        {filteredQuotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredQuotes.map((quote, index) => (
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
          <div className="text-center py-24 border-2 border-foreground">
            <p className="font-serif text-3xl font-bold mb-4">NO QUOTES FOUND</p>
            <p className="font-sans text-muted-foreground">Try selecting a different character</p>
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

export default AnimePage;
