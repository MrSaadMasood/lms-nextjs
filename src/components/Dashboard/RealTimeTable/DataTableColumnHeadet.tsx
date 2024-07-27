import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { FaEyeSlash } from "react-icons/fa";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div >{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className=" h-8 "
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <FaArrowDownLong className="ml-2" />
            ) : column.getIsSorted() === "asc" ? (
              <FaArrowUpLong className="ml-2" />
            ) : (
              <LuChevronsUpDown className="ml-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <FaArrowUpLong className="mr-2 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <FaArrowDownLong className="mr-2 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <FaEyeSlash className="mr-2 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
