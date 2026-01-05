import { Building2, MapPin, Star, CheckCircle2, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface CompanyCardProps {
  name: string;
  description: string;
  logo?: string;
  location: string;
  verified: boolean;
  rating: number;
  totalTransactions: number;
  memberSince: string;
  inventoryCount?: number;
  onViewProfile?: () => void;
}

export function CompanyCard({
  name,
  description,
  logo,
  location,
  verified,
  rating,
  totalTransactions,
  memberSince,
  inventoryCount,
  onViewProfile,
}: CompanyCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-company-${name}`}>
      <CardHeader className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={logo} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{name}</h3>
              {verified && (
                <CheckCircle2 className="h-4 w-4 text-chart-2 shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {totalTransactions} transactions
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="h-3 w-3" />
            <span>{inventoryCount || 0} listings</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Since {memberSince}
          </Badge>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          size="sm"
          onClick={onViewProfile}
          data-testid={`button-view-profile-${name}`}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}
