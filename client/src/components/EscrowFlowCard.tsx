import { CheckCircle2, Lock, Package, Truck, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "completed" | "active" | "pending";
}

function Step({ icon, title, description, status }: StepProps) {
  const getStatusColor = () => {
    switch (status) {
      case "completed": return "text-chart-2";
      case "active": return "text-primary";
      case "pending": return "text-muted-foreground";
    }
  };

  return (
    <div className="flex gap-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
        status === "completed" ? "border-chart-2 bg-chart-2/10" :
        status === "active" ? "border-primary bg-primary/10" :
        "border-border bg-background"
      }`}>
        <div className={getStatusColor()}>
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          {status === "completed" && (
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          )}
          {status === "active" && (
            <Badge variant="default" className="text-xs">Active</Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

interface EscrowFlowCardProps {
  currentStep: number;
}

export function EscrowFlowCard({ currentStep }: EscrowFlowCardProps) {
  const steps = [
    {
      icon: <Package className="h-5 w-5" />,
      title: "Order Placed",
      description: "Buyer confirms order details",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Payment Secured",
      description: "Funds held in escrow",
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Shipment",
      description: "Seller ships components",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Delivery Confirmed",
      description: "Buyer confirms receipt",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Funds Released",
      description: "Payment sent to seller",
    },
  ];

  const getStepStatus = (index: number): "completed" | "active" | "pending" => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "pending";
  };

  return (
    <Card data-testid="card-escrow-flow">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Secure Escrow Process</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {steps.map((step, index) => (
          <div key={index}>
            <Step
              {...step}
              status={getStepStatus(index)}
            />
            {index < steps.length - 1 && (
              <div className={`ml-5 my-2 h-8 w-0.5 ${
                index < currentStep ? "bg-chart-2" : "bg-border"
              }`} />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
