import { InventoryCard } from "../InventoryCard";

export default function InventoryCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <InventoryCard
        partNumber="A4988SLDTR-T"
        manufacturer="Allegro MicroSystems"
        category="Motor Driver ICs"
        description="Bipolar stepper motor driver with translator and overcurrent protection"
        quantity={5000}
        price="2.45"
        condition="New"
        status="In Stock"
        companyName="TechSupply Co."
        onAddToCart={() => console.log("Added to cart")}
        onViewDetails={() => console.log("View details")}
      />
    </div>
  );
}
