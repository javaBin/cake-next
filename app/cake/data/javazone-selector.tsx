"use client"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import * as allConferences from "./db/all.json"
import {SleepingPillAllSessionsResponse} from "@/types/talk";

export type JavaZoneSelectorProps = {
  callbackFn: Function
}

export default function JavaZoneSelector({callbackFn}: JavaZoneSelectorProps) {
  const allConferencesList: SleepingPillAllSessionsResponse = allConferences;
  const first = allConferencesList.conferences.map(v => v).reverse().at(0)

  return (
    <Select
      defaultValue={(first && first.slug) ?? "javazone_2023"}
      onValueChange={(value) => callbackFn(value)}>
      <SelectTrigger className="w-[150px] grow md:mr-2 md:max-w-sm md:grow-0">
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent side="top">
        {
          allConferencesList.conferences.map(conference => (
            <SelectItem key={conference.slug} value={conference.slug}>
              {conference.name}
            </SelectItem>
          )).reverse()
        }
      </SelectContent>
    </Select>
  )
}
