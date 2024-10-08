import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { displayNumber, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
import { DataTableColumnHeader } from "./my_table_column_header";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { Button } from "@/lib/shadcn/button";

function defaultColumn<T>(
  accessorKey: string,
  columnHeader: object
): ColumnDef<T> {
  const col: ColumnDef<T> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={columnHeader[accessorKey as keyof typeof columnHeader]}
      />
    ),
    cell: ({ row }) => {
      const value: ReactNode = row.getValue(accessorKey);
      let formatedValue: ReactNode = "";
      const columnDisplayDate = ["createdAt", "modifiedAt"];
      const columnDisplayPrice = [
        "price",
        "total",
        "revenue",
        "costPrice",
        "profit",
      ];

      if (value instanceof Date) formatedValue = formatDate(value, "datetime");
      else if (
        value &&
        columnDisplayDate.includes(accessorKey) &&
        new Date(String(value)) instanceof Date
      ) {
        formatedValue = formatDate(new Date(String(value)), "date");
      } else if (
        typeof value === "number" &&
        columnDisplayPrice.includes(accessorKey)
      ) {
        formatedValue = displayNumber(value, "$");
      } else formatedValue = value;

      return <p className="w-fit px-2">{formatedValue}</p>;
    },
  };
  return col;
}

function defaultSelectColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        className="mr-5"
        color="primary"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

function defaultIndexColumn<T>(): ColumnDef<T> {
  return {
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row, table }) => {
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      const rowCount =
        row.index + 1 > pageSize ? (row.index + 1) % pageSize : row.index + 1;
      return <p className="px-2">{pageSize * pageIndex + rowCount}</p>;
    },
  };
}

function defaultConfigColumn<T>(): ColumnDef<T> {
  return {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const rowData = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  };
}

function getColumns<T>(
  columnHeader: object,
  hasConfigColumn?: boolean
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = [
    defaultSelectColumn<T>(),
    defaultIndexColumn<T>(),
  ];
  for (let key in columnHeader) {
    const col: ColumnDef<T> = defaultColumn<T>(key, columnHeader);
    columns.push(col);
  }
  if (hasConfigColumn) {
    const lastCol: ColumnDef<T> = defaultConfigColumn();
    columns.push(lastCol);
  }
  return columns;
}

export {
  defaultColumn,
  defaultConfigColumn,
  defaultIndexColumn,
  defaultSelectColumn,
  getColumns,
};
