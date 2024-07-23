"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PerformanceChartDropdown() {
  const [position, setPosition] = React.useState("bottom");
  const radioValues = ["Anually", "Monthly", "Weekly"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-12 h-8" variant="outline">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Average Span</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {radioValues.map((radio, index) => (
            <DropdownMenuRadioItem key={index} value={radio.toLowerCase()}>
              {radio}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
