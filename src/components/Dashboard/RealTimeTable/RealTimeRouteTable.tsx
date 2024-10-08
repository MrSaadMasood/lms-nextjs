import { Input } from "@/components/ui/input";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DataTableColumnHeader } from "./DataTableColumnHeadet";
import DataTablePagination from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { z } from "zod";



export default function RealTimeRouteTable<T>({
  showCoinChart,
  showDeleteButton,
  tableData,
  columnsDef,
  columnRecord
}: {
  tableData: T[]
  showCoinChart: (id: string, value: string) => void,
  showDeleteButton: boolean,
  columnsDef: ColumnDef<T, any>[],
  columnRecord: Record<keyof T, string>
}) {

  const columns = useMemo(() => columnsDef, [showDeleteButton])
  // const columns = useMemo(() => [
  //   columnHelper.display({
  //     id: "select",
  //     header: ({ table }) => {
  //       if (showDeleteButton) return (
  //         <Checkbox
  //           checked={
  //             table.getIsAllPageRowsSelected() ||
  //             (table.getIsSomePageRowsSelected() && "indeterminate")
  //           }
  //           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //           aria-label="Select all"
  //         />
  //       )
  //     },
  //     cell: ({ row }) => {
  //       if (showDeleteButton) return (
  //         <Checkbox
  //           checked={row.getIsSelected()}
  //           onCheckedChange={value => row.toggleSelected(!!value)}
  //           aria-label="Select Row"
  //         />
  //       )
  //     }
  //
  //   }),
  //   columnHelper.accessor("first_name", {
  //     header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
  //   }),
  //   columnHelper.accessor("date_of_birth", {
  //     header: ({ column }) => <DataTableColumnHeader column={column} title="DOB" />,
  //   }),
  //   columnHelper.accessor("country", {
  //     header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
  //   }),
  //   columnHelper.display({
  //     id: "action",
  //     cell: ({ row, table, cell }) => {
  //       if (showDeleteButton && !table.getIsSomeRowsSelected()) return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <HiDotsHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>
  //               <Link href={`/dashboard/admin/edit/${row.original.id}`}>Edit</Link>
  //             </DropdownMenuItem>
  //             <DropdownMenuItem>Delete</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       )
  //     }
  //   })
  // ]
  //   , [showDeleteButton])
  //
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection
  });

  return (
    <div className=" w-full p-2 rounded-2xl flex flex-col justify-center items-center bg-white overflow-hidden ">
      <div className="w-full flex flex-col md:flex-row justify-between items-center py-4 space-y-3">
        <Input
          placeholder="Filter Fist Names"
          value={table.getColumn("name")?.getFilterValue() as string}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <div className=" w-full md:w-auto flex justify-between items-center   ">
          {table.getIsSomeRowsSelected() && showDeleteButton && <Button>Delete</Button>}
          <DataTableViewOptions columnRecord={columnRecord} table={table} />
        </div>
      </div>
      {/* dropdown for visibility */}

      {/* table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const parsedRow = z.object({ id: z.string() }).parse(row.original)
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    onClick={() => showCoinChart(cell.id, parsedRow.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {/* pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
