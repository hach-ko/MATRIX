import { Shield, Lock, CheckCircle2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TrustBadges() {
  const features = [
    {
      icon: Shield,
      title: "Secure Escrow",
      description: "Your payments are protected until delivery is confirmed",
    },
    {
      icon: Lock,
      title: "Blockchain Verified",
      description: "All transactions recorded on immutable blockchain",
    },
    {
      icon: CheckCircle2,
      title: "Verified Suppliers",
      description: "All companies undergo rigorous verification process",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick order fulfillment and shipping tracking",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Card key={index} data-testid={`card-feature-${index}`}>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/10">
              <feature.icon className="h-6 w-6 text-chart-2" />
            </div>
            <h3 className="mb-2 font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
