import { Package } from "lucide-react";
import { StatsCard } from "../StatsCard";

export default function StatsCardExample() {
  return (
    <div className="p-4 max-w-xs">
      <StatsCard
        title="Total Listings"
        value="12,458"
        icon={Package}
        trend="12% from last month"
        trendUp={true}
      />
    </div>
  );
}
