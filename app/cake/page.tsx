import {columns} from "./data/columns"
import {DataTable} from "./data/data-table"
import {CakeDataRow, Sessions, SleepingPillResponse} from "@/types/talk";

const url = "https://sleepingpill.javazone.no/public/allSessions/javazone_2022";
const allSessionsUrl = "https://sleepingpill.javazone.no/public/allSessions"

async function getData(): Promise<SleepingPillResponse> {
  const res = await fetch(url, { next: { revalidate: 10 } })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

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
      internalRating: -1,
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

export default async function CakeIndexPage() {
  const res = await getData()
  const data = tranformData(res);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
