import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Building2, Package, FileText, ExternalLink, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Inventory, Company } from "@shared/schema";

export default function InventoryDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const { data: item, isLoading: itemLoading } = useQuery<Inventory>({
    queryKey: ["/api/inventory", id],
    enabled: !!id,
  });

  const { data: company } = useQuery<Company>({
    queryKey: ["/api/companies", item?.companyId],
    enabled: !!item?.companyId,
  });

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} units of ${item?.partNumber} added to your cart`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to order placement...",
    });
    setLocation("/orders/new");
  };

  if (itemLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Item not found</p>
      </div>
    );
  }

  const totalPrice = (parseFloat(item.price) * quantity).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2" data-testid="text-part-number">{item.partNumber}</CardTitle>
                    <CardDescription className="text-lg">{item.manufacturer}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-base px-3 py-1" data-testid="badge-status">
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {item.description || "No description available for this component."}
                  </p>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-3">Specifications</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Category:</dt>
                        <dd className="font-medium">{item.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Manufacturer:</dt>
                        <dd className="font-medium">{item.manufacturer}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Condition:</dt>
                        <dd className="font-medium">{item.condition}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Available:</dt>
                        <dd className="font-medium" data-testid="text-quantity">{item.quantity.toLocaleString()} units</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Additional Info</h3>
                    <div className="space-y-2">
                      {item.datasheetUrl && (
                        <a
                          href={item.datasheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                          data-testid="link-datasheet"
                        >
                          <FileText className="h-4 w-4" />
                          View Datasheet
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Listed on {item.listedDate ? new Date(item.listedDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {company && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Supplier Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/companies/${company.id}`}>
                        <h3 className="text-lg font-semibold hover:text-primary cursor-pointer" data-testid="link-company">
                          {company.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{company.location}</p>
                      {company.rating && (
                        <p className="text-sm">Rating: {company.rating}/5.0</p>
                      )}
                    </div>
                    <Link href={`/companies/${company.id}`}>
                      <Button variant="outline" size="sm" data-testid="button-view-profile">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Purchase Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold" data-testid="text-price">${item.price}</span>
                    <span className="text-muted-foreground">per unit</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(item.quantity, parseInt(e.target.value) || 1)))}
                    data-testid="input-quantity"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum: {item.quantity.toLocaleString()} units
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium" data-testid="text-total">${totalPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={handleBuyNow} data-testid="button-buy-now">
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full" onClick={handleAddToCart} data-testid="button-add-cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
