import { BlockchainCard } from "../BlockchainCard";

export default function BlockchainCardExample() {
  return (
    <div className="p-4 max-w-md">
      <BlockchainCard
        txHash="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"
        blockNumber="18,432,891"
        confirmations={12}
        timestamp="2 mins ago"
        status="confirmed"
      />
    </div>
  );
}
