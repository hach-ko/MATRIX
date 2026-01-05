import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="text-xl font-bold">Matrix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional B2B marketplace for electronic components with secure escrow and blockchain transparency.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Marketplace</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/browse" className="hover:text-foreground transition-colors">Browse Inventory</Link></li>
              <li><Link href="/companies" className="hover:text-foreground transition-colors">Companies</Link></li>
              <li><Link href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">For Suppliers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/register-supplier" className="hover:text-foreground transition-colors">Register Company</Link></li>
              <li><Link href="/inventory/manage" className="hover:text-foreground transition-colors">List Inventory</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Seller Dashboard</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@icmarket.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Jose, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Matrix. All rights reserved. Powered by blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
}
