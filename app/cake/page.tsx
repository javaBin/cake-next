import {columns} from "./data/columns"
import {DataTable} from "./data/data-table"
import {CakeDataRow, Sessions, SleepingPillResponse} from "@/types/talk";

const url = "https://sleepingpill.javazone.no/public/allSessions/javazone_2022";

async function getData(): Promise<SleepingPillResponse> {
  const res = await fetch(url, { next: { revalidate: 10 } })

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

function tranformData(data: SleepingPillResponse): CakeDataRow[] {
  console.log("data", data);

  return data.sessions.map(value => {
    return {
      talk: value,
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
    }
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

/**
export default function CakeIndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">



      </div>
    </section>
  )
}
**/
