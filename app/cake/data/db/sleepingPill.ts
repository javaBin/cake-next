import {Conference, SleepingPillAllSessionsResponse, SleepingPillResponse} from "@/types/talk";
import 'server-only'
import * as allConferences from "./all.json"

const url = "https://sleepingpill.javazone.no/public/allSessions/";
const allSessionsUrl = "https://sleepingpill.javazone.no/public/allSessions"

export function getConference(year: number): Conference {
  const conference = allConferences.conferences
    .find(c => c.year == year)

  if (!conference) throw new Error("Cannot find conference " + year)

  return conference
}

export const getPublicJavaZoneData = async (year: string): Promise<SleepingPillResponse> => {
  const res = await fetch(`${url + year}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const getAllConferencesSync = async (progressCallback?: (n: number) => void): Promise<SleepingPillResponse[]> => {
  const allConferencesList: SleepingPillAllSessionsResponse = allConferences;

  const total = allConferencesList.conferences.length
  const conferences: SleepingPillResponse[] = []

  for (let i = 0; i < total; i++) {
    conferences.push(
      await getPublicJavaZoneData(allConferencesList.conferences[i].slug)
    )

    if (progressCallback) progressCallback(((i + 1) / total) * 100);
  }

  return Promise.resolve(conferences);
}

export const getSelectedConferences = async (slugs: string[]):  Promise<SleepingPillResponse[]> => {
  return await Promise.all(slugs.map(slug => getPublicJavaZoneData(slug)))
}

export const getAllConferencesList = async (): Promise<SleepingPillAllSessionsResponse> => {
  const allSessions = await fetch(allSessionsUrl);

  if (!allSessions.ok) {
    throw new Error('Failed to preload all conference list')
  }

  return allSessions.json();
}

export const preloadAllConferencesList = () => {
  void fetch(allSessionsUrl);
}

export const preloadAllConferencesAsync = () => {
  const allConferencesList: SleepingPillAllSessionsResponse = allConferences;
  void allConferencesList.conferences.map(value => getPublicJavaZoneData(value.slug))
}

export const preloadJavaZoneData = (year: string) => {
  void getPublicJavaZoneData(year)
}
