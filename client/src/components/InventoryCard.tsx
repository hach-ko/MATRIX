import { ShoppingCart, FileText, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InventoryCardProps {
  partNumber: string;
  manufacturer: string;
  category: string;
  description: string;
  quantity: number;
  price: string;
  condition: string;
  status: string;
  companyName: string;
  imageUrl?: string;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
}

export function InventoryCard({
  partNumber,
  manufacturer,
  category,
  description,
  quantity,
  price,
  condition,
  status,
  companyName,
  imageUrl,
  onAddToCart,
  onViewDetails,
}: InventoryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in stock": return "default";
      case "low stock": return "secondary";
      case "pre-order": return "outline";
      default: return "outline";
    }
  };

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-inventory-${partNumber}`}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <code className="text-sm font-semibold font-mono text-foreground truncate">
                {partNumber}
              </code>
            </div>
            <p className="text-xs text-muted-foreground">{manufacturer}</p>
          </div>
          <Badge variant={getStatusColor(status)} className="shrink-0">
            {status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {imageUrl && (
          <div className="mb-3 aspect-video w-full overflow-hidden rounded-md bg-muted">
            <img src={imageUrl} alt={partNumber} className="h-full w-full object-cover" />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="h-3 w-3" />
            <span>{category}</span>
          </div>
          
          <p className="text-sm text-foreground line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs text-muted-foreground">Quantity</p>
              <p className="text-sm font-semibold">{quantity.toLocaleString()} units</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-lg font-bold text-primary">${price}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {condition}
            </Badge>
            <span className="text-xs text-muted-foreground">• {companyName}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={onViewDetails}
          data-testid={`button-view-${partNumber}`}
        >
          <FileText className="mr-2 h-4 w-4" />
          Details
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={onAddToCart}
          data-testid={`button-cart-${partNumber}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
