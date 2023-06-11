"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CakeDataRow} from "@/types/talk";

export const columns: ColumnDef<CakeDataRow>[] = [
  {
    accessorFn: row => `${row.talk.title}`,
    header: "Title",
  },
  {
    accessorFn: row => `${row.talk.speakers.map(value => value.name).join(",")}`,
    header: "Speaker",
  },
  {
    accessorFn: row => `${row.talk.format}`,
    header: "Format",
  },
  {
    accessorFn: row => `${row.talk.length}`,
    header: "Length",
  },
  {
    accessorFn: row => `${row.talk.language}`,
    header: "Language",
  },
  {
    accessorFn: row => `${row.tags?.join(",")}`,
    header: "Tags",
  },
  {
    accessorFn: row => `${row.talk.keywords?.join(",")}`,
    header: "Keywords",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "internalRating",
    header: "Rating",
  },
  {
    accessorFn: row => `${row.talk.room}`,
    header: "Room",
  },
  {
    accessorFn: row => `${row.talk.startTime} - ${row.talk.endTime}`,
    header: "Slot",
  },
  {
    accessorKey: "postcode",
    header: "Postcode",
  },
  {
    accessorKey: "changes",
    header: "Changes",
  },
  {
    accessorKey: "lastChangedBy",
    header: "Last changed",
  }
]
