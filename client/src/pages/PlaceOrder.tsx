import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { insertOrderSchema } from "@shared/schema";
import type { InsertOrder } from "@shared/schema";

const orderFormSchema = insertOrderSchema.extend({
  shippingAddress: z.string().min(10, "Please provide a complete shipping address"),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

export default function PlaceOrder() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const buyerCompanyId = user.companyId || "temp-buyer-company-id";

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      buyerCompanyId,
      sellerCompanyId: "",
      inventoryId: "",
      quantity: 1,
      totalPrice: "",
      status: "pending",
      shippingAddress: "",
    },
  });

  const placeMutation = useMutation({
    mutationFn: async (data: InsertOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Order placed successfully",
        description: "Your order has been submitted and is pending confirmation",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Order failed",
        description: error.message || "Failed to place order",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: OrderFormData) => {
    placeMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Place Order</h1>
          <p className="text-muted-foreground">Complete your purchase with secure escrow protection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Fill in the information below to place your order</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="inventoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inventory Item ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter inventory ID" {...field} data-testid="input-inventory-id" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sellerCompanyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seller Company ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter seller company ID" {...field} data-testid="input-seller-id" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              data-testid="input-quantity"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Price (USD)</FormLabel>
                          <FormControl>
                            <Input placeholder="0.00" {...field} data-testid="input-total-price" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shippingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter complete shipping address..."
                            {...field}
                            data-testid="input-shipping-address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/50 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Secure Payment Protection</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Payment held in secure escrow until delivery confirmed</li>
                      <li>• Transaction recorded on blockchain for transparency</li>
                      <li>• Full buyer protection guarantee</li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/marketplace")}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={placeMutation.isPending} data-testid="button-place-order">
                      {placeMutation.isPending ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
