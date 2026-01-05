import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, Globe, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Register & Verify",
      description: "Join as a buyer or seller. Our verification process ensures a network of trusted professional partners.",
      icon: ShieldCheck,
    },
    {
      title: "List or Browse",
      description: "Sellers list excess inventory with full technical specs. Buyers search for exactly what they need.",
      icon: Zap,
    },
    {
      title: "Secure Escrow",
      description: "Payments are held in secure escrow. Funds are only released once the buyer confirms delivery and quality.",
      icon: CheckCircle2,
    },
    {
      title: "Blockchain Record",
      description: "Every transaction is recorded on the blockchain for permanent, immutable transparency and proof of trade.",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">How AllegroTrade Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A secure, transparent, and efficient B2B marketplace for electronic components.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Card key={i} className="hover-elevate">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 rounded-xl bg-primary/5 p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Secure Ecosystem</h2>
              <div className="space-y-4 text-lg">
                <p>
                  AllegroTrade was built to solve the trust issues in global B2B trading. By combining traditional escrow services with modern blockchain technology, we provide a "trustless" environment where companies can trade with confidence.
                </p>
                <p className="text-muted-foreground text-base">
                  Every participant is vetted, every transaction is tracked, and every shipment is verified. We handle the complexity so you can focus on your supply chain.
                </p>
              </div>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Marketplace Benefits</h3>
              <ul className="space-y-3">
                {[
                  "Verified Supplier Network",
                  "Secure Escrow Payments",
                  "Blockchain Audit Trail",
                  "Quality Control Verification",
                  "Global Shipping Assistance",
                  "Inventory Management Tools"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
