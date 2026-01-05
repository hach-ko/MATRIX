import { Home, Package, ShoppingBag, Building2, LayoutDashboard, PlusSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    testId: "nav-home",
  },
  {
    title: "Marketplace",
    url: "/marketplace",
    icon: ShoppingBag,
    testId: "nav-marketplace",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    testId: "nav-dashboard",
    requiresAuth: true,
  },
  {
    title: "Manage Inventory",
    url: "/inventory/manage",
    icon: Package,
    testId: "nav-manage-inventory",
    requiresAuth: true,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={item.testId}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
