import { Users } from "lucide-react";
import { useState } from "react";
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
    quotes: [
      "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!",
      "If you don't take risks, you can't create a future!",
      "I'm not gonna die, partner! If I die, the promise between us will be broken!",
      "Power isn't determined by your size, but the size of your heart and dreams!"
    ]
  },
  {
    name: "RORONOA ZORO",
    japanese: "ロロノア・ゾロ",
    image: zoro,
    quotes: [
      "When the world shoves you around, you just gotta stand up and shove back. It's not like somebody's gonna save you if you start babbling excuses.",
      "I don't care what the society says. I've never regretted doing anything for my friend.",
      "If I can't even protect my captain's dream, then whatever ambition I have is nothing but talk!",
      "Bring on the hardship. It's preferred in a path of carnage."
    ]
  },
  {
    name: "NAMI",
    japanese: "ナミ",
    image: nami,
    quotes: [
      "Life is like a pencil that will surely run out, but will leave the beautiful writing of life.",
      "Don't start a fight if you can't end it.",
      "I want to draw a map of the entire world!",
      "Surviving is what I'm good at!"
    ]
  },
  {
    name: "VINSMOKE SANJI",
    japanese: "サンジ",
    image: sanji,
    quotes: [
      "When do you think people die? When they are shot through the heart by the bullet of a pistol? No. When they are ravaged by an incurable disease? No... It's when they're forgotten!",
      "A real man forgives a woman for her lies.",
      "I'll never doubt a lady's tears.",
      "I can't just abandon a lady who's crying!"
    ]
  },
  {
    name: "TONY TONY CHOPPER",
    japanese: "トニートニー・チョッパー",
    image: chopper,
    quotes: [
      "Compared to the greatness of the world, how important is one man's flag?",
      "Even if I'm weak, there are people I want to protect.",
      "I'm not food! I'm a reindeer!",
      "Everyone has things they can and cannot do. I'll do what you can't do, and you do what I can't do!"
    ]
  },
  {
    name: "NICO ROBIN",
    japanese: "ニコ・ロビン",
    image: robin,
    quotes: [
      "I want to live! Take me out to sea with you!",
      "Fools who don't respect the past are doomed to repeat it.",
      "You can't see the whole picture until you look at it from the outside.",
      "The world isn't perfect. But it's there for us, doing the best it can."
    ]
  },
];

const OnePieceSection = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);

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
        <div className="mb-16 border-2 border-foreground p-8 md:p-12 bg-secondary/30 transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 animate-fade-in" key={selectedCharacter.name}>
              <div>
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-red-600 font-black text-5xl md:text-6xl mr-2">"</span>
                  {selectedCharacter.quotes[0]}
                  <span className="text-red-600 font-black text-5xl md:text-6xl ml-2">"</span>
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t-2 border-foreground">
                <p className="font-sans text-lg font-medium tracking-widest">
                  — {selectedCharacter.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedCharacter.japanese}
                </p>
              </div>
            </div>
            <div className="relative aspect-square border-2 border-foreground overflow-hidden animate-fade-in" key={selectedCharacter.image}>
              <img 
                src={selectedCharacter.image} 
                alt={selectedCharacter.name}
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
                onClick={() => setSelectedCharacter(character)}
                className={`group border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                  selectedCharacter.name === character.name 
                    ? 'border-red-600 bg-secondary shadow-lg' 
                    : 'border-foreground bg-background hover:bg-secondary'
                }`}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
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
