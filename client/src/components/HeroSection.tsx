import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Allegro_IC_components_hero_image_38e077c6.png";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
            Professional B2B Electronic Components Marketplace
          </h1>
          <p className="mb-8 text-xl text-white/90">
            Source Allegro ICs and electronic components with secure escrow and blockchain transparency
          </p>
          
          <div className="mx-auto flex max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search part numbers, manufacturers, or categories..."
                className="h-12 border-white/20 bg-white/95 pl-10 text-base backdrop-blur-sm"
                data-testid="input-hero-search"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && onSearch) {
                    onSearch(e.currentTarget.value);
                  }
                }}
              />
            </div>
            <Button 
              size="lg" 
              className="h-12 bg-primary/90 backdrop-blur-sm hover:bg-primary"
              data-testid="button-search"
              onClick={() => console.log("Search clicked")}
            >
              Search
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/browse">
              <Button 
                variant="outline" 
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                data-testid="button-browse-inventory"
              >
                Browse Inventory
              </Button>
            </Link>
            <Link href="/register-supplier">
              <Button 
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                data-testid="button-register-supplier"
              >
                Register as Supplier
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
