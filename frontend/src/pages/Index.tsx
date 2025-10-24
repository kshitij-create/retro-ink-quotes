import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import OnePieceSection from "@/components/OnePieceSection";
import FeaturedSection from "@/components/FeaturedSection";
import AllAnimeSection from "@/components/AllAnimeSection";
import heroImage from "@/assets/hero-quote.jpg";
import quote1 from "@/assets/quote-1.jpg";
import quote2 from "@/assets/quote-2.jpg";
import quote3 from "@/assets/quote-3.jpg";
import quote4 from "@/assets/quote-4-luffy.jpg";
import quote5 from "@/assets/quote-5.jpg";
import quote6 from "@/assets/quote-6.jpg";

const quotes = [
  {
    anime: "ONE PIECE",
    character: "Monkey D. Luffy",
    quote: "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!",
    image: quote1,
    japaneseTitle: "ワンピース"
  },
  {
    anime: "NARUTO",
    character: "Naruto Uzumaki",
    quote: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
    image: quote2,
    japaneseTitle: "ナルト"
  },
  {
    anime: "BLEACH",
    character: "Ichigo Kurosaki",
    quote: "We are all like fireworks. We climb, shine and always go our separate ways and become further apart.",
    image: quote3,
    japaneseTitle: "ブリーチ"
  },
  {
    anime: "ONE PIECE",
    character: "Monkey D. Luffy",
    quote: "If you don't take risks, you can't create a future!",
    image: quote4,
    japaneseTitle: "ワンピース"
  },
  {
    anime: "HUNTER × HUNTER",
    character: "Gon Freecss",
    quote: "I can't stand it when someone's value is judged by their birth or their talent.",
    image: quote5,
    japaneseTitle: "ハンター×ハンター"
  },
  {
    anime: "YU YU HAKUSHO",
    character: "Yusuke Urameshi",
    quote: "The only way to truly escape the mundane is for you to constantly be evolving.",
    image: quote6,
    japaneseTitle: "幽☆遊☆白書"
  }
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 border-2 border-foreground rotate-45" />
              <h2 className="font-serif text-7xl md:text-9xl font-black tracking-tighter leading-none">
                語録
              </h2>
              <div className="w-12 h-12 border-2 border-foreground rotate-45" />
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
              TIMELESS WISDOM
            </h1>
            
            <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-foreground/80">
              Words that transcend panels and pages. <br />
              A curated collection of legendary quotes from the golden age of manga.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-8">
              <div className="h-px w-24 bg-foreground" />
              <span className="font-sans text-sm tracking-[0.3em]">SCROLL</span>
              <div className="h-px w-24 bg-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* One Piece Section */}
      <OnePieceSection />

      {/* Quotes Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center space-y-4">
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
            LEGENDARY MOMENTS
          </h2>
          <p className="font-sans text-sm tracking-[0.2em] text-muted-foreground">
            EST. 1990s — TIMELESS CLASSICS
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {quotes.map((quote, index) => (
            <div 
              key={index}
              className="opacity-0 animate-in fade-in-50 duration-700"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <QuoteCard {...quote} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-serif text-2xl font-black">
              MANGA<span className="text-accent">語録</span>
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
