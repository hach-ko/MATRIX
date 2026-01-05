import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFiltersProps {
  onSearch?: (query: string) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  return (
    <Card data-testid="card-search-filters">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search part numbers or descriptions..."
              className="pl-9"
              data-testid="input-search"
              onKeyDown={(e) => {
                if (e.key === "Enter" && onSearch) {
                  onSearch(e.currentTarget.value);
                }
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]" data-testid="select-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="motor-drivers">Motor Drivers</SelectItem>
                <SelectItem value="sensors">Sensors</SelectItem>
                <SelectItem value="power-ics">Power ICs</SelectItem>
                <SelectItem value="current-sensors">Current Sensors</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]" data-testid="select-manufacturer">
                <SelectValue placeholder="Manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Manufacturers</SelectItem>
                <SelectItem value="allegro">Allegro MicroSystems</SelectItem>
                <SelectItem value="ti">Texas Instruments</SelectItem>
                <SelectItem value="analog">Analog Devices</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]" data-testid="select-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="pre-order">Pre-Order</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" data-testid="button-more-filters">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
