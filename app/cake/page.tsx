import {columns} from "./data/columns"
import {DataTable} from "./data/data-table"
import {CakeDataRow, SleepingPillResponse} from "@/types/talk";
import {Skeleton} from "@/components/ui/skeleton";
import {JSX, Suspense} from "react";
import {getConference, getPublicJavaZoneData} from "@/app/cake/data/db/sleepingPill";

function tranformData(data: SleepingPillResponse): CakeDataRow[] {
   return data.sessions.map(value => {
     const strToDate = (v: Date | undefined) => v ? new Date(v) : undefined;
     const talk = value;
     talk.startTime = strToDate(talk.startTime)
     talk.endTime = strToDate(talk.endTime)
     talk.startTimeZulu = strToDate(talk.startTimeZulu)
     talk.endTimeZulu = strToDate(talk.endTimeZulu)
    return {
      talk,
      state: "SUBMITTED",
      tags: [],
      postcode: "",
      changes: false,
      lastChangedBy: "CAKE",
      room: "",
      comment: "",
      internalRating: Math.floor(Math.random() * 5),
      internalComment: "",
      changeHistory: [
        {
          changeDate: new Date,
          changedBy: "CAKE"
        }
      ]
    };
  })
}

function fallback(): JSX.Element {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

const ComponentAsync = async () => {
  const sleepingPillResponse = await getPublicJavaZoneData(getConference(2023).slug)
  const data = tranformData(sleepingPillResponse)

  return (
    <DataTable columns={columns} data={data} />
  )
}

export default async function CakeIndexPage() {
  return (
    <div className="container py-5">
      <Suspense fallback={fallback()}>
        <ComponentAsync />
      </Suspense>
    </div>
  )
}
