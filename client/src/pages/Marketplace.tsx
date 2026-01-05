import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import type { Inventory } from "@shared/schema";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const { data: inventory, isLoading } = useQuery<Inventory[]>({
    queryKey: ["/api/inventory"],
  });

  const filteredInventory = inventory?.filter((item) => {
    const matchesSearch = searchQuery === "" || 
      item.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === "all" || item.category === category;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(inventory?.map((item) => item.category) || []));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Marketplace</h1>
          <p className="text-muted-foreground">Browse and search electronic components from verified suppliers</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-2 block">Condition</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" data-testid="checkbox-new" />
                      <span className="text-sm">New</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" data-testid="checkbox-used" />
                      <span className="text-sm">Used</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" data-testid="checkbox-refurbished" />
                      <span className="text-sm">Refurbished</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by part number, manufacturer, or description..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading inventory...</p>
              </div>
            ) : filteredInventory && filteredInventory.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                    {filteredInventory.length} items found
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredInventory.map((item) => (
                    <Link key={item.id} href={`/inventory/${item.id}`}>
                      <Card className="hover-elevate cursor-pointer" data-testid={`card-inventory-${item.id}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg">{item.partNumber}</CardTitle>
                            <Badge variant="secondary" data-testid={`badge-status-${item.id}`}>
                              {item.status}
                            </Badge>
                          </div>
                          <CardDescription className="line-clamp-2">{item.manufacturer}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {item.description || "No description available"}
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Category:</span>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Quantity:</span>
                              <span className="font-medium">{item.quantity.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Condition:</span>
                              <span className="font-medium">{item.condition}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div>
                            <p className="text-2xl font-bold">${item.price}</p>
                            <p className="text-xs text-muted-foreground">per unit</p>
                          </div>
                          <Button data-testid={`button-view-${item.id}`}>View Details</Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground" data-testid="text-no-results">No items found matching your criteria</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
