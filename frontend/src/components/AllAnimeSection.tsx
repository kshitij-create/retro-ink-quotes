import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface Anime {
  id: string;
  name: string;
  slug: string;
  japanese_name: string;
  description: string;
  total_quotes: number;
  release_year?: number;
}

const AllAnimeSection = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/anime`);
        const data = await response.json();
        setAnimeList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime:", error);
        setLoading(false);
      }
    };

    fetchAnime();
  }, [backendUrl]);

  if (loading) return null;

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-10 border-4 border-foreground rotate-45" />
            <h2 className="font-serif text-5xl md:text-7xl font-black tracking-tighter">
              ALL SERIES
            </h2>
            <div className="w-10 h-10 border-4 border-foreground rotate-45" />
          </div>
          <p className="font-sans text-sm tracking-[0.3em] text-muted-foreground">
            EXPLORE YOUR FAVORITE ANIME
          </p>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {animeList.map((anime, index) => (
            <Link
              key={anime.id}
              to={`/anime/${anime.slug}`}
              className="group border-4 border-foreground bg-background hover:bg-secondary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden opacity-0 animate-in fade-in-50"
              style={{ 
                animationDelay: `${index * 80}ms`, 
                animationFillMode: 'forwards' 
              }}
            >
              {/* Manga speed lines on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,currentColor_40%,currentColor_41%,transparent_41%)] bg-[length:20px_20px]" />
              </div>

              <div className="p-8 space-y-4 relative">
                {/* Japanese title */}
                <div className="font-serif text-3xl font-black tracking-tight text-foreground/80">
                  {anime.japanese_name}
                </div>

                {/* English title */}
                <h3 className="font-serif text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {anime.name}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm pt-4 border-t-2 border-foreground/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 border border-foreground" />
                    <span className="font-sans font-bold">{anime.total_quotes} quotes</span>
                  </div>
                  {anime.release_year && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-foreground" />
                      <span className="font-sans text-muted-foreground">{anime.release_year}</span>
                    </div>
                  )}
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center justify-end pt-4">
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Additional call to action */}
        <div className="mt-16 text-center border-4 border-foreground p-12 bg-background relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              background: 'repeating-linear-gradient(45deg, transparent, transparent 15px, currentColor 15px, currentColor 17px)'
            }} />
          </div>

          <div className="relative z-10 space-y-6">
            <h3 className="font-serif text-3xl md:text-4xl font-bold">
              Can't find your favorite series?
            </h3>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              We're constantly adding new anime and quotes to our collection. Check back soon!
            </p>
            <Link 
              to="/search"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-accent text-background px-8 py-4 hover:bg-foreground transition-all duration-300"
            >
              <span className="font-sans text-sm font-bold tracking-wider">
                SEARCH ALL QUOTES
              </span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllAnimeSection;
