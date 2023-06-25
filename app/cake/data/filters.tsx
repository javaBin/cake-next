import {Column, Table} from "@tanstack/react-table";
import {InputHTMLAttributes, useEffect, useMemo, useState} from "react";

import {RankingInfo, rankItem} from '@tanstack/match-sorter-utils'
import {FilterFn} from "@tanstack/table-core";
import {Input} from "@/components/ui/input";

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export function Filter({
                  column,
                  table,
                }: {
  column: Column<any>
  table: Table<any>
}) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  let facetedUniqueValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number' ? [] : Array.from(facetedUniqueValues.keys()).sort(),
    [facetedUniqueValues, firstValue]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          id={column.id + "-number-input1"}
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 rounded border shadow"
        />
        <DebouncedInput
          id={column.id + "-number-input2"}
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 rounded border shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        id={column.id + "-filter-input"}
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search (${facetedUniqueValues.size})`}
        className="w-36 rounded border shadow"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

// A debounced input react component
export function DebouncedInput({
                          value: initialValue,
                          onChange,
                          debounce = 200,
                          ...props
                        }: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <Input
      {...props}
      className="h-7"
      value={value}
      onChange={e => setValue(e.target.value)}
      autoComplete="off"
      data-lpignore="true"
      data-form-type="other"
    />
  )
}
