"use client"

import {ColumnDef} from "@tanstack/react-table"
import {CakeDataRow, Format, Language, State} from "@/types/talk";
import {MoreHorizontal, Presentation, Users, Zap} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Badge} from "@/components/ui/badge";
import {SortableColumnHeader} from "@/app/cake/data/sortableheader";
import {Checkbox} from "@/components/ui/checkbox";

/**
 * Ref: https://tanstack.com/table/v8/docs/guide/column-defs
 */
export const columns: ColumnDef<CakeDataRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: row => `${row.talk.title}`,
    id: "title",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Title" />
    )
  },
  {
    accessorFn: row => `${row.talk.speakers.map(value => value.name).join(",")}`,
    id: "speaker",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Speaker" />
    )
  },
  {
    accessorFn: row => `${row.talk.format}`,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Format" />
    ),
    id: "format",
    cell: ({ row }) => {
      const value: Format = row.getValue("format")
      switch (value) {
        case "presentation":
          return <span><Presentation className="mr-2 h-4 w-4" /></span>
        case "lightning-talk":
          return <span><Zap className="mr-2 h-4 w-4" /></span>
        case "workshop":
          return <span><Users className="mr-2 h-4 w-4" /></span>
      }
    }
  },
  {
    accessorFn: row => `${row.talk.length}`,
    id: "length",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Length" />
    )
  },
  {
    accessorFn: row => `${row.talk.language}`,
    header: "Language",
    id: "lang",
    cell: ({ row }) => {
      const value: Language = row.getValue("lang")
      switch (value) {
        case "en":
          return <span>🇬🇧</span>
        case "no":
          return <span>🇳🇴</span>
      }
    }
  },
  {
    accessorFn: row => `${row.tags}`,
    id: "tags",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;
      return tags ? tags.join(",") : "";
    }
  },
  {
    accessorFn: row => `${row.keywords}`,
    id: "keywords",
    header: "Keywords",
    cell: ({ row }) => {
      const keywords = row.original.keywords;
      return keywords ? keywords.join(",") : "";
    }
  },
  {
    accessorFn: row => `${row.state}`,
    id: "state",
    header: "State",
    cell: ({ row }) => {
      const value: State = row.getValue("state")

      switch (value) {
        case "DRAFT":
          return <span><Badge variant="outline">Draft</Badge></span>
        case "APPROVED":
          return <span><Badge variant="outline">Approved</Badge></span>
        case "SUBMITTED":
          return <span><Badge variant="outline">Submitted</Badge></span>
        case "HISTORIC":
          return <span><Badge variant="secondary">Historic</Badge></span>
        case "REJECTED":
          return <span><Badge variant="destructive">Rejected</Badge></span>
      }
    }
  },
  {
    accessorKey: "internalRating",
    id: "internalRating",
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Rating" />
    )
  },
  {
    accessorFn: row => `${row.talk.room}`,
    id: "rooms",
    header: "Room",
  },
  {
    accessorFn: row => `${row.talk.startTime} - ${row.talk.endTime}`,
    id: "slot",
    header: "Slot",
  },
  {
    accessorKey: "postcode",
    id: "postcode",
    header: "Postcode",
  },
  {
    accessorKey: "changes",
    id: "changes",
    header: "Changes",
  },
  {
    accessorKey: "lastChangedBy",
    id: "lastChangedBy",
    header: "Last changed",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dataRow: CakeDataRow = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(dataRow.talk.id)}
            >
              Copy talk ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View speaker</DropdownMenuItem>
            <DropdownMenuItem>View talk</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
