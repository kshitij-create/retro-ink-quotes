interface QuoteCardProps {
  anime: string;
  character: string;
  quote: string;
  image: string;
  japaneseTitle?: string;
}

const QuoteCard = ({ anime, character, quote, image, japaneseTitle }: QuoteCardProps) => {
  return (
    <div className="group relative border-2 border-foreground bg-background overflow-hidden hover:shadow-2xl transition-all duration-500">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={image} 
          alt={`${character} from ${anime}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif text-3xl font-bold tracking-tight leading-none">
            {anime}
          </h3>
          {japaneseTitle && (
            <p className="text-xs text-muted-foreground tracking-wider">
              {japaneseTitle}
            </p>
          )}
        </div>
        
        <div className="h-px bg-foreground/20" />
        
        <p className="font-sans text-sm leading-relaxed text-foreground/90 italic">
          "{quote}"
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <p className="font-sans text-xs font-medium tracking-widest uppercase">
            — {character}
          </p>
          <div className="w-6 h-6 border-2 border-foreground rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
