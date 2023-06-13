import {Column} from "@tanstack/react-table"
import {ChevronsUpDown, SortAsc, SortDesc} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function SortableColumnHeader<TData, TValue>({
                                                       column,
                                                       title,
                                                       className,
                                                     }: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <SortDesc className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <SortAsc className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}
