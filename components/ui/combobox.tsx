"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"

export type ComboboxProps = {
  data: DataItem[]
  onChange: Function
}

export type DataItem = {
  value: string
  label: string
}

export function Combobox({data, onChange}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((dataItem) => dataItem.value === value)?.label
            : data.length}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No data found.</CommandEmpty>
          <CommandGroup>
            {data.map((dataItem) => (
              <CommandItem
                key={dataItem.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : dataItem.value)
                  onChange(currentValue);
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === dataItem.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {dataItem.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
