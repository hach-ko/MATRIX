import { Cpu } from "lucide-react";
import { CategoryCard } from "../CategoryCard";

export default function CategoryCardExample() {
  return (
    <div className="p-4 max-w-xs">
      <CategoryCard
        name="Motor Drivers"
        icon={Cpu}
        count={3245}
        onClick={() => console.log("Category clicked")}
      />
    </div>
  );
}
