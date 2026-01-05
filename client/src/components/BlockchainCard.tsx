import { Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import blockchainImage from "@assets/generated_images/Blockchain_technology_visualization_7ff999ba.png";

interface BlockchainCardProps {
  txHash: string;
  blockNumber: string;
  confirmations: number;
  timestamp: string;
  status: "pending" | "confirmed" | "finalized";
}

export function BlockchainCard({
  txHash,
  blockNumber,
  confirmations,
  timestamp,
  status,
}: BlockchainCardProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(txHash);
    console.log("Copied transaction hash");
  };

  const getStatusBadge = () => {
    switch (status) {
      case "finalized":
        return <Badge className="bg-chart-2 text-white">Finalized</Badge>;
      case "confirmed":
        return <Badge className="bg-chart-3 text-white">Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card data-testid="card-blockchain">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Blockchain Transaction</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-4">
        <div 
          className="relative h-32 w-full overflow-hidden rounded-md bg-gradient-to-r from-chart-3/20 to-chart-1/20"
          style={{ backgroundImage: `url(${blockchainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm" />
          <div className="relative flex h-full items-center justify-center">
            <div className="text-center">
              {status === "finalized" && (
                <CheckCircle2 className="mx-auto h-8 w-8 text-chart-2 mb-2" />
              )}
              <p className="text-xs text-muted-foreground">
                {confirmations} confirmations
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate text-xs font-mono bg-muted px-2 py-1 rounded">
                {txHash}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={copyToClipboard}
                data-testid="button-copy-hash"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Block Number</p>
              <p className="text-sm font-semibold font-mono">{blockNumber}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
              <p className="text-sm font-semibold">{timestamp}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            data-testid="button-view-explorer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
