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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

export function PerformanceChartDropdown() {
  const [position, setPosition] = React.useState("bottom");
  const radioValues = ["Anually", "Monthly", "Weekly"];
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updatePerfParam(value: string) {
    const params = new URLSearchParams(searchParams)
    params.set("performance", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-12 h-7" variant="outline">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Average Span</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={(value) => updatePerfParam(value)}>
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
