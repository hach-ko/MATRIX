import { ShoppingCart, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex cursor-pointer items-center gap-2" data-testid="link-home">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="text-xl font-bold">Matrix</span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/marketplace">
            <Button variant="ghost" data-testid="link-marketplace">Marketplace</Button>
          </Link>
          <Link href="/companies">
            <Button variant="ghost" data-testid="link-companies">Companies</Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="ghost" data-testid="link-how-it-works">How It Works</Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <Bell className="h-5 w-5" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="ghost" size="icon" data-testid="button-profile">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            data-testid="button-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/inventory/manage">
            <Button className="hidden lg:inline-flex" data-testid="button-list-inventory">
              List Inventory
            </Button>
          </Link>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />
    </header>
  );
}
