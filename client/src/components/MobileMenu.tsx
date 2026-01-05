import { Home, ShoppingCart, Bell, User, LayoutDashboard, ClipboardList, Info, Store, Building2, UserPlus, LogIn } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  const [location] = useLocation();

  const menuItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Marketplace", href: "/marketplace", icon: Store },
    { title: "Browse Inventory", href: "/browse", icon: ClipboardList },
    { title: "Companies", href: "/companies", icon: Building2 },
    { title: "How It Works", href: "/how-it-works", icon: Info },
  ];

  const accountItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Cart", href: "/cart", icon: ShoppingCart },
    { title: "Notifications", href: "/notifications", icon: Bell },
    { title: "Profile", href: "/profile", icon: User },
  ];

  const authItems = [
    { title: "Register as Supplier", href: "/register-supplier", icon: UserPlus },
    { title: "Login", href: "/login", icon: LogIn },
  ];

  const NavItem = ({ item }: { item: typeof menuItems[0] }) => {
    const isActive = location === item.href;
    return (
      <Link href={item.href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className="w-full justify-start gap-3 h-11"
          onClick={() => onOpenChange(false)}
        >
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.title}</span>
        </Button>
      </Link>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-lg font-bold">M</span>
            </div>
            <span>Matrix</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-85px)]">
          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Main Menu
              </p>
              {menuItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Account
              </p>
              {accountItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Get Started
              </p>
              {authItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
