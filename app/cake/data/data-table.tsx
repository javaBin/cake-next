"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

import {Input} from "@/components/ui/input"
import {DataTablePagination} from "@/app/cake/data/pagination";
import {DataTableViewOptions} from "@/app/cake/data/viewoptions";
import {useState} from "react";
import {Filter, fuzzyFilter} from "@/app/cake/data/filters";
import JavaZoneSelector from "@/app/cake/data/javazone-selector";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                         }: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    "changes": false,
    "lastChangedBy": false
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
      columnVisibility
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    }
  })

  return (
    <div>
      <div className="flex flex-wrap space-y-2 md:space-y-0 my-2">
        <JavaZoneSelector  callbackFn={(slug: string) => {}}/>
        <Input
          type="text"
          id="ftsb"
          name="ftsb"
          placeholder="Search"
          onChange={(event) =>
            setGlobalFilter(String(event.target.value))
          }
          className="grow md:max-w-sm md:grow-0"
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableHeader key={headerGroup.id + "-" + index}>
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
                <TableRow key={headerGroup.id + "-"}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id + "-"}>
                        {header.column.getCanFilter() ? (
                          flexRender(<Filter column={header.column} table={table} />, {})
                        ) : null}
                      </TableHead>
                    )
                  })}
                </TableRow>
                </TableHeader>
            ))}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
