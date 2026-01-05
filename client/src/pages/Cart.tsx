import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock cart data for UI demonstration
const cartItems = [
  {
    id: 1,
    partNumber: "ACS712ELCTR-20A-T",
    manufacturer: "Allegro MicroSystems",
    quantity: 50,
    price: 2.45,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    partNumber: "A1120LLHLT-T",
    manufacturer: "Allegro MicroSystems",
    quantity: 100,
    price: 0.85,
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=200",
  }
];

export default function Cart() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 25.00;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <ShoppingBag className="h-20 w-20 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any components to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/marketplace">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="h-24 w-24 shrink-0 rounded-md bg-muted overflow-hidden">
                    <img src={item.image} alt={item.partNumber} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-lg truncate">{item.partNumber}</h3>
                        <p className="text-sm text-muted-foreground">{item.manufacturer}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-2 border rounded-md p-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping (Escrow Insured)</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg" asChild>
                <Link href="/orders/new">Proceed to Checkout</Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Payments secured via Blockchain Escrow
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
