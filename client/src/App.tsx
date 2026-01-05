import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Companies from "@/pages/Companies";
import HowItWorks from "@/pages/HowItWorks";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import CompanyProfile from "@/pages/CompanyProfile";
import InventoryDetail from "@/pages/InventoryDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import ManageInventory from "@/pages/ManageInventory";
import PlaceOrder from "@/pages/PlaceOrder";
import RegisterSupplier from "@/pages/RegisterSupplier";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/not-found";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-2 p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={0} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  
  const isAuthRoute = ["/dashboard", "/inventory/manage", "/orders/new"].some(
    (route) => location.startsWith(route)
  );

  if (isAuthRoute) {
    return (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/inventory/manage" component={ManageInventory} />
            <Route path="/orders/new" component={PlaceOrder} />
            <Route component={NotFound} />
          </Switch>
        </AuthenticatedLayout>
      </ProtectedRoute>
    );
  }

  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/browse" component={Marketplace} />
        <Route path="/companies" component={Companies} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/companies/:id" component={CompanyProfile} />
        <Route path="/inventory/:id" component={InventoryDetail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/register-supplier" component={RegisterSupplier} />
        <Route path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
