import { Search, RefreshCw, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { useState } from "react";

export type ViewMode = "grid" | "list";

export type FilterOption = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    options: {
        id: string;
        label: string;
        description?: string;
    }[];
};

export interface ServerFilterCardProps {
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    onFilter?: (filterId: string, selectedOptions: string[]) => void;
    onRefresh?: () => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    className?: string;
    selectedFilters?: Record<string, string[]>;
    filterOptions: FilterOption[];
}

export function ServerFilterCard({
    searchPlaceholder = "Search servers...",
    onSearch,
    onFilter,
    onRefresh,
    viewMode,
    onViewModeChange,
    className,
    selectedFilters = {},
    filterOptions,
}: ServerFilterCardProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleFilterToggle = (filterId: string, optionId: string) => {
        const currentSelected = selectedFilters[filterId] || [];
        const newSelected = currentSelected.includes(optionId)
            ? currentSelected.filter(id => id !== optionId)
            : [...currentSelected, optionId];
        onFilter?.(filterId, newSelected);
    };

    const getSelectedCount = (filterId: string) => {
        return (selectedFilters[filterId] || []).length;
    };

    return (
        <div className={cn(
            "flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0",
            className
        )}>
            <div className="flex flex-wrap gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="pl-10 w-full md:w-64"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch?.(e.target.value)}
                    />
                </div>
                {filterOptions.map((filter) => (
                    <DropdownMenu
                        key={filter.id}
                        open={openDropdown === filter.id}
                        onOpenChange={(open) => setOpenDropdown(open ? filter.id : null)}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "inline-flex items-center gap-2",
                                    getSelectedCount(filter.id) > 0 && "bg-primary/10"
                                )}
                            >
                                {filter.icon}
                                {filter.label}
                                {getSelectedCount(filter.id) > 0 && (
                                    <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                                        {getSelectedCount(filter.id)}
                                    </span>
                                )}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuLabel>{filter.label}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {filter.options.map((option) => (
                                    <DropdownMenuItem
                                        key={option.id}
                                        onSelect={() => handleFilterToggle(filter.id, option.id)}
                                        className="flex items-center justify-between cursor-pointer"
                                    >
                                        <div className="flex flex-col">
                                            <span>{option.label}</span>
                                            {option.description && (
                                                <span className="text-xs text-muted-foreground">
                                                    {option.description}
                                                </span>
                                            )}
                                        </div>
                                        {(selectedFilters[filter.id] || []).includes(option.id) && (
                                            <Check className="h-4 w-4" />
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </div>
            <div className="flex space-x-4">
                <Button
                    variant="outline"
                    onClick={onRefresh}
                    className="inline-flex items-center"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
                <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value: string | undefined) => value && onViewModeChange(value as ViewMode)}
                    className="border rounded-md"
                >
                    <ToggleGroupItem
                        value="grid"
                        aria-label="Grid view"
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                        Grid
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="list"
                        aria-label="List view"
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                        List
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
}