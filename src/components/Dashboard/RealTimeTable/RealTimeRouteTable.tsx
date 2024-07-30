import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import mock_data from "../../../../MOCK_DATA.json";
import { DataTableColumnHeader } from "./DataTableColumnHeadet";
import DataTablePagination from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Mock = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  country: string;
  phone: string;
};

const columnHelper = createColumnHelper<Mock>();
const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select Row"
      />
    )

  }),
  columnHelper.accessor("first_name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
  }),
  columnHelper.accessor("date_of_birth", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="DOB" />,
  }),
  columnHelper.accessor("country", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
  }),
];

export default function RealTimeRouteTable({
  showCoinChart,
  showDeleteButton
}: {
  showCoinChart: (id: string, value: string) => void,
  showDeleteButton: boolean
}) {
  const [data, setData] = useState<Mock[]>(mock_data);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
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
          value={table.getColumn("first_name")?.getFilterValue() as string}
          onChange={(e) => table.getColumn("first_name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <div className=" w-full md:w-auto flex justify-between items-center   ">
          {table.getIsSomeRowsSelected() && showDeleteButton && <Button>Delete</Button>}
          <DataTableViewOptions table={table} />
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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  onClick={() => showCoinChart(cell.id, cell.getValue() as string)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
