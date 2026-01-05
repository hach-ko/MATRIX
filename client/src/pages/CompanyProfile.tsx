import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Building2, MapPin, Calendar, Star, Package, ShieldCheck, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import type { Company, Inventory } from "@shared/schema";

export default function CompanyProfile() {
  const { id } = useParams();

  const { data: company, isLoading: companyLoading } = useQuery<Company>({
    queryKey: ["/api/companies", id],
    enabled: !!id,
  });

  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory[]>({
    queryKey: ["/api/inventory/company", id],
    enabled: !!id,
  });

  if (companyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading company profile...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Company not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={company.logo || undefined} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {company.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold" data-testid="text-company-name">{company.name}</h1>
                {company.verified === 1 && (
                  <Badge variant="default" className="gap-1" data-testid="badge-verified">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground mb-4">{company.description || "No description available"}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                {company.location && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span data-testid="text-location">{company.location}</span>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary" data-testid="link-website">
                      Website
                    </a>
                  </div>
                )}
                {company.memberSince && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {new Date(company.memberSince).getFullYear()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-rating">
                {company.rating ? `${company.rating}/5.0` : "N/A"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-transactions">
                {company.totalTransactions?.toLocaleString() || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-listings">
                {inventory?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {company.verified === 1 ? "Verified" : "Pending"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-2xl font-bold mb-6">Inventory Listings</h2>
          {inventoryLoading ? (
            <p className="text-center py-12 text-muted-foreground">Loading inventory...</p>
          ) : inventory && inventory.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inventory.map((item) => (
                <Link key={item.id} href={`/inventory/${item.id}`}>
                  <Card className="hover-elevate cursor-pointer" data-testid={`card-inventory-${item.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{item.partNumber}</CardTitle>
                        <Badge variant="secondary">{item.status}</Badge>
                      </div>
                      <CardDescription>{item.manufacturer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {item.description || "No description"}
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="font-medium">{item.quantity.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <p className="text-2xl font-bold">${item.price}</p>
                          <p className="text-xs text-muted-foreground">per unit</p>
                        </div>
                        <Button size="sm" data-testid={`button-view-${item.id}`}>View</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">No inventory listed yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
