import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Package, 
  Building2, 
  ShoppingBag, 
  TrendingUp, 
  Cpu, 
  Zap, 
  Gauge, 
  Radio,
  Search,
  ChevronRight
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { SearchFilters } from "@/components/SearchFilters";
import { InventoryCard } from "@/components/InventoryCard";
import { CompanyCard } from "@/components/CompanyCard";
import { CategoryCard } from "@/components/CategoryCard";
import { StatsCard } from "@/components/StatsCard";
import { TrustBadges } from "@/components/TrustBadges";
import { EscrowFlowCard } from "@/components/EscrowFlowCard";
import { BlockchainCard } from "@/components/BlockchainCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Inventory, Company } from "@shared/schema";

import { motion } from "framer-motion";

export default function Home() {
  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory[]>({
    queryKey: ["/api/inventory"],
  });

  const { data: companies, isLoading: companiesLoading } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  const categories = [
    { name: "Motor Drivers", icon: Zap, count: 3245 },
    { name: "Current Sensors", icon: Gauge, count: 2156 },
    { name: "Hall Sensors", icon: Radio, count: 1876 },
    { name: "Power ICs", icon: Cpu, count: 4521 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <HeroSection onSearch={(q) => console.log("Search:", q)} />

      <div className="container mx-auto px-4 py-12 space-y-16">
        <TrustBadges />

        {/* Categories Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">Explore our wide range of electronic components</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/marketplace" className="flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                {...category}
                onClick={() => console.log(`Category: ${category.name}`)}
              />
            ))}
          </div>
        </motion.section>

        {/* Inventory Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Inventory</h2>
              <p className="text-muted-foreground">Fresh listings from verified suppliers</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/marketplace" className="flex items-center gap-1">
                Explore Marketplace <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <SearchFilters onSearch={(q) => console.log("Search:", q)} />
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inventoryLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-96 rounded-lg bg-muted animate-pulse" />
              ))
            ) : inventory?.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No inventory listed yet.
              </div>
            ) : (
              inventory?.slice(0, 6).map((item) => (
                <InventoryCard
                  key={item.id}
                  partNumber={item.partNumber}
                  manufacturer={item.manufacturer}
                  category={item.category}
                  description={item.description || ""}
                  quantity={item.quantity}
                  price={item.price}
                  condition={item.condition}
                  status={item.status}
                  companyName="Verified Supplier"
                  onAddToCart={() => console.log(`Add to cart: ${item.partNumber}`)}
                  onViewDetails={() => console.log(`View details: ${item.id}`)}
                />
              ))
            )}
          </div>
        </motion.section>

        {/* Companies Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Companies</h2>
              <p className="text-muted-foreground">Trusted suppliers with verified credentials</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companiesLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
              ))
            ) : companies?.slice(0, 3).map((company) => (
              <CompanyCard
                key={company.id}
                name={company.name}
                description={company.description || ""}
                location={company.location || ""}
                verified={company.verified === 1}
                rating={parseFloat(company.rating || "0")}
                totalTransactions={company.totalTransactions || 0}
                memberSince={company.memberSince ? new Date(company.memberSince).getFullYear().toString() : ""}
                onViewProfile={() => console.log(`View profile: ${company.id}`)}
              />
            ))}
          </div>
        </motion.section>

        {/* Trust/Security Section */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-muted/30 -mx-4 px-4 py-16 rounded-xl"
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Secure Transactions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every transaction is protected by our proprietary escrow system and immutable blockchain records.
            </p>
          </div>
          
          <Tabs defaultValue="escrow" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="escrow">Escrow Process</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain Verification</TabsTrigger>
            </TabsList>
            <TabsContent value="escrow" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <EscrowFlowCard currentStep={2} />
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">How Escrow Works</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Secure Hold", desc: "Buyer places order and payment is held securely in escrow" },
                      { title: "Verified Shipping", desc: "Seller ships components with trackable logistics" },
                      { title: "Quality Check", desc: "Buyer confirms delivery and technical specifications" },
                      { title: "Automated Release", desc: "Funds automatically released to seller upon verification" }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="blockchain" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <BlockchainCard
                  txHash="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"
                  blockNumber="18,432,891"
                  confirmations={12}
                  timestamp="2 mins ago"
                  status="confirmed"
                />
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Blockchain Transparency</h3>
                  <ul className="space-y-4">
                    {[
                      "Immutable and transparent records for every trade",
                      "Real-time confirmation tracking across global nodes",
                      "Cryptographic security ensuring data integrity",
                      "Full audit trail for regulatory compliance"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Learn about our Blockchain Node
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Platform Statistics</h2>
            <p className="text-muted-foreground">Real-time marketplace performance metrics</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Listings"
              value="12,458"
              icon={Package}
              trend="12% vs last month"
              trendUp={true}
            />
            <StatsCard
              title="Verified Companies"
              value="847"
              icon={Building2}
              trend="8% vs last month"
              trendUp={true}
            />
            <StatsCard
              title="Trades Completed"
              value="3,291"
              icon={ShoppingBag}
              trend="15% vs last month"
              trendUp={true}
            />
            <StatsCard
              title="Market Value"
              value="$2.4M"
              icon={TrendingUp}
              trend="23% vs last month"
              trendUp={true}
            />
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
