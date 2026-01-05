import { useQuery } from "@tanstack/react-query";
import { CompanyCard } from "@/components/CompanyCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import type { Company } from "@shared/schema";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: companies, isLoading } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  const filteredCompanies = companies?.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Verified Companies</h1>
          <p className="text-xl text-muted-foreground">
            Connect with trusted suppliers and buyers in our verified network.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search companies by name or location..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredCompanies && filteredCompanies.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                name={company.name}
                description={company.description || ""}
                location={company.location || ""}
                verified={company.verified === 1}
                rating={parseFloat(company.rating || "0")}
                totalTransactions={company.totalTransactions || 0}
                memberSince={company.memberSince ? new Date(company.memberSince).getFullYear().toString() : ""}
                onViewProfile={() => window.location.href = `/companies/${company.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No companies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
