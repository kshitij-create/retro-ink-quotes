import { Search } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="font-serif text-2xl font-black tracking-tight">
              MANGA<span className="text-accent">語録</span>
            </h1>
            <div className="hidden md:flex items-center gap-6 font-sans text-sm font-medium">
              <a href="#" className="hover:text-accent transition-colors tracking-wider">
                QUOTES
              </a>
              <a href="#" className="hover:text-accent transition-colors tracking-wider">
                SERIES
              </a>
              <a href="#" className="hover:text-accent transition-colors tracking-wider">
                ARCHIVE
              </a>
            </div>
          </div>
          
          <button className="p-2 hover:bg-secondary transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
