"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "./data-table-view-options";

import { DNS_RECORDS } from "./data/labels";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import CreateDialog from "../Dialog/create-dialog";

import CreateBulkDialog from "../Dialog/create-bulk-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Domains..."
          value={(table.getColumn("domain")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("domain")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={DNS_RECORDS}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <DataTableViewOptions table={table} />
        <CreateDialog />
        <CreateBulkDialog/>
      </div>
    </div>
  );
}
