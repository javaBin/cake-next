"use client"

import {compareAsc, format, isValid} from 'date-fns'
import {ColumnDef, Row} from "@tanstack/react-table"
import {CakeDataRow, CakeSystem, Format, Language, State} from "@/types/talk";
import {Presentation, Users, Zap} from "lucide-react"
import {Badge} from "@/components/ui/badge";
import {SortableColumnHeader} from "@/app/cake/data/sortableheader";
import {Checkbox} from "@/components/ui/checkbox";
import {StarRating} from "@/components/ui/starRating";

export type CakeColumn = { id: string, header: string };

export type CakeColumns = {
  title: CakeColumn,
  speaker: CakeColumn,
  format: CakeColumn,
  length: CakeColumn,
  lang: CakeColumn,
  tags: CakeColumn,
  keywords: CakeColumn,
  state: CakeColumn,
  internalRating: CakeColumn,
  room: CakeColumn,
  slot: CakeColumn,
  postcode: CakeColumn,
  changes: CakeColumn,
  lastChangedBy: CakeColumn
}

export const cakeHeaders: CakeColumns = {
  title: { id: "title", header: "Title" },
  speaker: { id: "speaker", header: "Speaker" },
  format: { id: "format", header: "Format" },
  length: { id: "length", header: "Length" },
  lang: { id: "lang", header: "Language" },
  tags: { id: "tags", header: "Tags" },
  keywords: { id: "keywords", header: "Keywords" },
  state: { id: "state", header: "State" },
  internalRating: { id: "internalRating", header: "Rating" },
  room: { id: "room", header: "Room" },
  slot: { id: "slot", header: "Slot" },
  postcode: { id: "postcode", header: "Postcode" },
  changes: { id: "changes", header: "Changes" },
  lastChangedBy: { id: "lastChangedBy", header: "Last changed" }
};

export const cakeHeadersArray = [
  cakeHeaders.title.id,
  cakeHeaders.speaker.id,
  cakeHeaders.format.id,
  cakeHeaders.length.id,
  cakeHeaders.lang.id,
  cakeHeaders.tags.id,
  cakeHeaders.keywords.id,
  cakeHeaders.state.id,
  cakeHeaders.internalRating.id,
  cakeHeaders.room.id,
  cakeHeaders.slot.id,
  cakeHeaders.postcode.id,
  cakeHeaders.changes.id,
  cakeHeaders.lastChangedBy.id,
]

export const queryFieldsHeaders = [
  { name: "title", label: "Title" },
  { name: "speaker", label: "Speaker" },
  { name: "format", label: "Format" },
  { name: "length", label: "Length" },
  { name: "lang", label: "Language" },
  { name: "tags", label: "Tags" },
  { name: "keywords", label: "Keywords" },
  { name: "state", label: "State" },
  { name: "internalRating", label: "Rating" },
  { name: "room", label: "Room" },
  { name: "slot", label: "Slot" },
  { name: "postcode", label: "Postcode" },
  { name: "changes", label: "Changes" },
  { name: "lastChangedBy", label: "Last changed" }
]

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
    id: cakeHeaders.title.id,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title={cakeHeaders.title.header} />
    )
  },
  {
    accessorFn: row => `${row.talk.speakers.map(value => value.name).join(",")}`,
    id: cakeHeaders.speaker.id,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title={cakeHeaders.speaker.header} />
    )
  },
  {
    accessorFn: row => `${row.talk.format}`,
    id: cakeHeaders.format.id,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title={cakeHeaders.format.header} />
    ),
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
    id: cakeHeaders.length.id,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title={cakeHeaders.length.header} />
    )
  },
  {
    accessorFn: row => `${row.talk.language}`,
    id: cakeHeaders.lang.id,
    header: cakeHeaders.lang.header,
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
    id: cakeHeaders.tags.id,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title={cakeHeaders.tags.header} />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;
      return tags ? tags.join(",") : "";
    }
  },
  {
    accessorFn: row => `${row.keywords}`,
    id: cakeHeaders.keywords.id,
    header: cakeHeaders.keywords.header,
    cell: ({ row }) => {
      const keywords = row.original.keywords;
      return keywords ? keywords.join(",") : "";
    }
  },
  {
    accessorFn: row => `${row.state}`,
    id: cakeHeaders.state.id,
    header: cakeHeaders.state.header,
    cell: ({ row }) => {
      const value: State = row.getValue(cakeHeaders.state.id)

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
    accessorFn: row => `${row.internalRating}`,
    id: cakeHeaders.internalRating.id,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title={cakeHeaders.internalRating.header} />
    ),
    cell: ({ row }) => {
      const rating: number = row.getValue(cakeHeaders.internalRating.id)
      const count = rating && rating >= 0 && rating <= 5 ? rating : 1;
      return <StarRating count={count} rating={count} />
    }
  },
  {
    accessorFn: row => `${row.talk.room}`,
    id: cakeHeaders.room.id,
    header: cakeHeaders.room.header,
  },
  {
    accessorFn: row => `${row.talk.startTime}`,
    id: cakeHeaders.slot.id,
    header: ({ column }) => (
      <SortableColumnHeader column={column} title={cakeHeaders.slot.header} />
    ),
    cell: ({row}) => {
      const talk = row.original.talk;
      if (talk.startTime && isValid(talk.startTime) &&
        talk.endTime && isValid(talk.endTime)) {
        let startTime = format(talk.startTime, 'HH:mm');
        let endTime = format(talk.endTime, 'HH:mm');
        return <><Badge variant="secondary">{startTime}</Badge><Badge variant="secondary">{endTime}</Badge></>
      }
      return "";
    },
    sortingFn: (rowA: Row<CakeDataRow>, rowB: Row<CakeDataRow>, columnId: string): number => {
      const talkA: Date | undefined = rowA.original.talk.startTime;
      const talkB: Date | undefined = rowB.original.talk.startTime;
      if (talkA && isValid(talkA) && talkB && isValid(talkB)) {
        return compareAsc(talkA, talkB)
      }
      return 0;
    }
  },
  {
    accessorKey: cakeHeaders.postcode.id,
    id: cakeHeaders.postcode.id,
    header: cakeHeaders.postcode.header,
  },
  {
    accessorKey: cakeHeaders.changes.id,
    id: cakeHeaders.changes.id,
    header: cakeHeaders.changes.header,
  },
  {
    accessorKey: cakeHeaders.lastChangedBy.id,
    id: cakeHeaders.lastChangedBy.id,
    header: cakeHeaders.lastChangedBy.header,
    cell: ({ row }) => {
      const value: CakeSystem = row.getValue("lastChangedBy")

      switch (value) {
        case "CAKE":
          return <span><Badge variant="outline">Cake</Badge></span>
        case "SUBMITIT":
          return <span><Badge variant="outline">SubmitIt</Badge></span>
        case "UNKNOWN":
          return <span><Badge variant="destructive">Unknown</Badge></span>
      }
    }
  },
]
