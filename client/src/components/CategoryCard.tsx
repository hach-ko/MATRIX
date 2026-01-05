import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  count: number;
  onClick?: () => void;
}

export function CategoryCard({ name, icon: Icon, count, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="cursor-pointer hover-elevate active-elevate-2 transition-transform" 
      onClick={onClick}
      data-testid={`card-category-${name.toLowerCase().replace(/\s/g, '-')}`}
    >
      <CardContent className="p-6 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-semibold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{count.toLocaleString()} items</p>
      </CardContent>
    </Card>
  );
}
