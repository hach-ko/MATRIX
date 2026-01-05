import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingBag, Building2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Order } from "@shared/schema";

export default function Dashboard() {
  // Mock user data - in real app this would come from auth context
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const companyId = user.companyId || "temp-company-id";

  const { data: buyOrders } = useQuery<Order[]>({
    queryKey: ["/api/orders/buyer", companyId],
    enabled: !!companyId,
  });

  const { data: sellOrders } = useQuery<Order[]>({
    queryKey: ["/api/orders/seller", companyId],
    enabled: !!companyId,
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      confirmed: "secondary",
      shipped: "default",
      delivered: "default",
      completed: "default",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-dashboard-title">Dashboard</h1>
          <p className="text-muted-foreground">Manage your orders and track transactions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Purchase Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-buy-orders">
                {buyOrders?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Active purchases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-sell-orders">
                {sellOrders?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Active sales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(buyOrders?.length || 0) + (sellOrders?.length || 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Company</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <Link href={`/companies/${companyId}`}>
                <p className="text-xs text-primary hover:underline mt-1" data-testid="link-view-profile">View profile</p>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="purchases" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="purchases" data-testid="tab-purchases">My Purchases</TabsTrigger>
            <TabsTrigger value="sales" data-testid="tab-sales">My Sales</TabsTrigger>
          </TabsList>

          <TabsContent value="purchases" className="space-y-4">
            {buyOrders && buyOrders.length > 0 ? (
              buyOrders.map((order) => (
                <Card key={order.id} data-testid={`card-order-${order.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                        <CardDescription>
                          Placed on {new Date(order.createdAt || "").toLocaleDateString()}
                        </CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold">${order.totalPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="text-lg font-medium">{order.quantity} units</p>
                      </div>
                    </div>
                    {order.escrowStatus && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Escrow Status</p>
                        <Badge variant="outline" className="mt-1">{order.escrowStatus}</Badge>
                      </div>
                    )}
                    {order.trackingNumber && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Tracking Number</p>
                        <p className="font-mono text-sm">{order.trackingNumber}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No purchase orders yet</p>
                  <Link href="/marketplace">
                    <Button className="mt-4" data-testid="button-browse-marketplace">
                      Browse Marketplace
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            {sellOrders && sellOrders.length > 0 ? (
              sellOrders.map((order) => (
                <Card key={order.id} data-testid={`card-order-${order.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                        <CardDescription>
                          Placed on {new Date(order.createdAt || "").toLocaleDateString()}
                        </CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold">${order.totalPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="text-lg font-medium">{order.quantity} units</p>
                      </div>
                    </div>
                    {order.shippingStatus && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Shipping Status</p>
                        <Badge variant="outline" className="mt-1">{order.shippingStatus}</Badge>
                      </div>
                    )}
                    {order.blockchainTxHash && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Blockchain TX</p>
                        <p className="font-mono text-xs truncate">{order.blockchainTxHash}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No sales yet</p>
                  <Link href="/inventory/manage">
                    <Button className="mt-4" data-testid="button-list-inventory">
                      List Inventory
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
