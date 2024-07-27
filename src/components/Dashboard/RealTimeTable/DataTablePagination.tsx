import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Table } from "@tanstack/react-table";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { Button } from '@/components/ui/button'

interface PaginationProps<TData> {
  table: Table<TData>
}

export default function DataTablePagination<TData>({
  table
}: PaginationProps<TData>) {
  return (
    <div className=" w-[95%] mt-2 flex justify-end items-center space-x-10 ">
      {/* rows per page */}
      <div className=" flex items-center space-x-2 ">
        <p className="text-sm font-medium">Rows Per Page</p>
        <Select
          value={`${table.getState().pagination.pageIndex}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-16  text-black">
            {table.getState().pagination.pageSize}
          </SelectTrigger>
          <SelectContent side="top"  >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* page out of */}
      <div className=" text-sm font-medium ">
        {table.getState().pagination.pageIndex + 1}{" "} out of {table.getPageCount()} pages
      </div>
      <div className="flex justify-center items-center space-x-2 ">
        <div className=" flex justify-center items-center space-x-1 ">
          <Button
            className="  p-2 h-8 "
            onClick={table.firstPage}
            disabled={!table.getCanPreviousPage()}>
            <HiChevronDoubleLeft />
          </Button>
          <Button
            className="  p-2 h-8 "
            onClick={table.previousPage}
            disabled={!table.getCanPreviousPage()}>Prev
          </Button>
        </div>
        <div className=" flex justify-center items-center space-x-1 ">
          <Button
            className="   p-2 h-8 "
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}>Next
          </Button>
          <Button
            className="   p-2 h-8 "
            onClick={table.lastPage}
            disabled={!table.getCanNextPage()}>
            <HiChevronDoubleRight />
          </Button>
        </div>

      </div>
    </div>
  )
}
