import { DataTableColumnHeader } from "@/components/Dashboard/RealTimeTable/DataTableColumnHeadet";
import { CryptoTableData } from "@/lib/types/exported-types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<CryptoTableData>();

export const cryptoColumns = [
  columnHelper.accessor("name", {
    header: ({ column }) =>
      <DataTableColumnHeader column={column} title="Coin" />
  }),
  columnHelper.accessor("current_price", {
    header: ({ column }) =>
      <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) =>
      <div>${(row.original.current_price || 0).toFixed(2)}</div>
  }),
  columnHelper.accessor("price_change_percentage_1h_in_currency", {
    header: ({ column }) =>
      <DataTableColumnHeader column={column} title="1h" />,
    cell: ({ row }) => {
      const percentage = row.original.price_change_percentage_1h_in_currency || 0;
      const className = percentage >= 0 ? 'text-green-600' : 'text-red-600';
      return (
        <div className={className}>{percentage.toFixed(2)}%</div>
      );
    },
  }),
  columnHelper.accessor("price_change_percentage_24h", {
    header: ({ column }) =>
      <DataTableColumnHeader column={column} title="24h" />,
    cell: ({ row }) => {
      const percentage = row.original.price_change_percentage_24h || 0;
      const className = percentage >= 0 ? 'text-green-600' : 'text-red-600';
      return (
        <div className={className}>{percentage.toFixed(2)}%</div>
      );
    },
  }),
  columnHelper.accessor("price_change_percentage_7d_in_currency", {
    header: ({ column }) =>
      <DataTableColumnHeader column={column} title="7d" />,
    cell: ({ row }) => {
      const percentage = row.original.price_change_percentage_7d_in_currency || 0;
      const className = percentage >= 0 ? 'text-green-600' : 'text-red-600';
      return (
        <div className={className}>{percentage.toFixed(2)}%</div>
      );
    },
  }),
  columnHelper.accessor("price_change_24h", {
    header: ({ column }) =>
      <DataTableColumnHeader column={column} title="24h Change" />,
    cell: ({ row }) => {
      const change = row.original.price_change_24h || 0;
      const className = change >= 0 ? 'text-green-600' : 'text-red-600';
      return (
        <div className={className}>{change.toFixed(2)}</div>
      );
    },
  }),
  columnHelper.accessor("market_cap", {
    header: ({ column }) =>
      <DataTableColumnHeader column={column} title="Market Cap" />,
    cell: ({ row }) =>
      <div>${row.original.market_cap}</div>
  })
]
