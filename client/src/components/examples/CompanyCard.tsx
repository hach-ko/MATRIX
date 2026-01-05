import { CompanyCard } from "../CompanyCard";

export default function CompanyCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <CompanyCard
        name="TechSupply Co."
        description="Leading supplier of Allegro microcontrollers and power management ICs for industrial applications"
        location="San Jose, CA"
        verified={true}
        rating={4.8}
        totalTransactions={1243}
        memberSince="2020"
        inventoryCount={450}
        onViewProfile={() => console.log("View profile")}
      />
    </div>
  );
}
