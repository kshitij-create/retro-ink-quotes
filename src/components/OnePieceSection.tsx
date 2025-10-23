import { Users } from "lucide-react";
import quote1 from "@/assets/quote-1.jpg";
import luffyAlt from "@/assets/quote-4-luffy.jpg";
import zoro from "@/assets/op-zoro.jpg";
import nami from "@/assets/op-nami.jpg";
import sanji from "@/assets/op-sanji.jpg";
import chopper from "@/assets/op-chopper.jpg";
import robin from "@/assets/op-robin.jpg";

const characters = [
  {
    name: "MONKEY D. LUFFY",
    japanese: "モンキー・D・ルフィ",
    image: quote1,
  },
  {
    name: "RORONOA ZORO",
    japanese: "ロロノア・ゾロ",
    image: zoro,
  },
  {
    name: "NAMI",
    japanese: "ナミ",
    image: nami,
  },
  {
    name: "VINSMOKE SANJI",
    japanese: "サンジ",
    image: sanji,
  },
  {
    name: "TONY TONY CHOPPER",
    japanese: "トニートニー・チョッパー",
    image: chopper,
  },
  {
    name: "NICO ROBIN",
    japanese: "ニコ・ロビン",
    image: robin,
  },
];

const OnePieceSection = () => {
  return (
    <section className="py-24 border-t-2 border-b-2 border-foreground">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-8 border-2 border-foreground rotate-45" />
                <h2 className="font-serif text-6xl md:text-8xl font-black tracking-tighter">
                  ONE PIECE
                </h2>
              </div>
              <p className="font-sans text-sm tracking-[0.3em] text-muted-foreground ml-12">
                THE STRAW HAT PIRATES — ワンピース
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm font-sans">
              <Users className="w-5 h-5" />
              <span className="tracking-wider">3,861,000,000</span>
            </div>
          </div>
        </div>

        {/* Large Featured Quote */}
        <div className="mb-16 border-2 border-foreground p-8 md:p-12 bg-secondary/30">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!"
              </h3>
              <div className="space-y-2">
                <p className="font-sans text-lg font-medium tracking-widest">
                  — MONKEY D. LUFFY
                </p>
                <p className="text-sm text-muted-foreground">
                  Chapter 507 | モンキー・D・ルフィ
                </p>
              </div>
            </div>
            <div className="relative aspect-square border-2 border-foreground overflow-hidden">
              <img 
                src={luffyAlt} 
                alt="Monkey D. Luffy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Character Grid */}
        <div>
          <h3 className="font-serif text-3xl font-bold mb-8 flex items-center gap-4">
            <span>ALL CHARACTERS</span>
            <div className="flex-1 h-px bg-foreground/20" />
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {characters.map((character, index) => (
              <div 
                key={index}
                className="group border-2 border-foreground bg-background hover:bg-secondary transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-sans text-xs font-bold tracking-wider leading-tight">
                    {character.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground">
                    {character.japanese}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnePieceSection;
