import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterSidebar, FilterState } from "./FilterSidebar";

describe("Features FilterSidebar Component", () => {
  const emptyFilters: FilterState = {
    recommendations: [],
    outputs: [],
    roles: [],
    useCases: [],
  };

  it("renders sidebar without clear button when no filters are active", () => {
    render(<FilterSidebar filters={emptyFilters} onFilterChange={() => {}} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /clear all/i })).not.toBeInTheDocument();
  });

  it("displays active filters badge and clear all button when filters are active", () => {
    const activeFilters: FilterState = {
      recommendations: ["free"],
      outputs: ["web"],
      roles: ["designer"],
      useCases: [],
    };
    render(<FilterSidebar filters={activeFilters} onFilterChange={() => {}} />);
    expect(screen.getByTestId("active-filter-count")).toHaveTextContent("3");
    expect(screen.getByRole("button", { name: /clear all/i })).toBeInTheDocument();
  });

  it("calls onFilterChange when toggling items across recommendations, outputs, roles, and useCases", () => {
    const handleFilterChange = vi.fn();
    render(<FilterSidebar filters={emptyFilters} onFilterChange={handleFilterChange} />);
    
    // Recommendations
    fireEvent.click(screen.getByRole("checkbox", { name: /^all skills$/i }));
    expect(handleFilterChange).toHaveBeenCalledWith({
      ...emptyFilters,
      recommendations: ["all"],
    });

    // Outputs
    fireEvent.click(screen.getByRole("checkbox", { name: /^web$/i }));
    expect(handleFilterChange).toHaveBeenCalledWith({
      ...emptyFilters,
      outputs: ["web"],
    });

    // Roles
    fireEvent.click(screen.getByRole("checkbox", { name: /^founder$/i }));
    expect(handleFilterChange).toHaveBeenCalledWith({
      ...emptyFilters,
      roles: ["founder"],
    });

    // Use cases
    fireEvent.click(screen.getByRole("checkbox", { name: /^content publishing$/i }));
    expect(handleFilterChange).toHaveBeenCalledWith({
      ...emptyFilters,
      useCases: ["publishing"],
    });
  });

  it("calls onFilterChange to remove an item when checked item is clicked", () => {
    const handleFilterChange = vi.fn();
    const activeFilters: FilterState = {
      ...emptyFilters,
      recommendations: ["free"],
    };
    render(<FilterSidebar filters={activeFilters} onFilterChange={handleFilterChange} />);
    
    const freeItem = screen.getByRole("checkbox", { name: /^free$/i });
    fireEvent.click(freeItem);

    expect(handleFilterChange).toHaveBeenCalledWith({
      ...activeFilters,
      recommendations: [],
    });
  });

  it("resets all filters when Clear all button is clicked", () => {
    const handleFilterChange = vi.fn();
    const activeFilters: FilterState = {
      recommendations: ["free"],
      outputs: ["web", "video"],
      roles: ["swe"],
      useCases: ["publishing"],
    };
    render(<FilterSidebar filters={activeFilters} onFilterChange={handleFilterChange} />);
    
    const clearBtn = screen.getByRole("button", { name: /clear all/i });
    fireEvent.click(clearBtn);

    expect(handleFilterChange).toHaveBeenCalledWith({
      recommendations: [],
      outputs: [],
      roles: [],
      useCases: [],
    });
  });

  it("renders retract button when onToggleCollapse is provided and handles click", () => {
    const handleCollapse = vi.fn();
    render(
      <FilterSidebar
        filters={emptyFilters}
        onFilterChange={() => {}}
        onToggleCollapse={handleCollapse}
      />
    );

    const retractBtn = screen.getByTestId("sidebar-retract-btn");
    expect(retractBtn).toBeInTheDocument();
    fireEvent.click(retractBtn);
    expect(handleCollapse).toHaveBeenCalledTimes(1);
  });

});
