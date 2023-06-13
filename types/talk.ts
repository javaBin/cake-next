export type Sessions = Talk[]
export type SleepingPillResponse = {
  sessions: Sessions
}

export interface Talk {
  id: string
  sessionId: string
  conferenceId: string
  room: string
  title: string
  abstract: string
  length: number
  intendedAudience?: string
  language: Language
  format: Format
  level: Level
  speakers: Speaker[]
  video: string,
  startTimeZulu?: Date
  startTime?: Date
  endTimeZulu?: Date
  endTime?: Date
}

export interface CakeDataRow {
  talk: Talk
  state: State
  tags?: string[]
  keywords?: string[]
  postcode?: string
  changes?: boolean
  lastChangedBy?: CakeSystem
  room?: string
  comment?: string
  internalRating?: number
  internalComment?: string
  changeHistory: ChangeHstoryItem[]
}

export interface Speaker {
  name: string
  bio: string
  email?: string
  alias_email?: string
  residence?: string
  otherTalks?: Talk[]
  twitter?: string
  pictureUrl?: string
  contactPhone?: string
}

export type Format = "presentation" | "lightning-talk" | "workshop"
export type Level = "beginner" | "intermediate" | "advanced"
export type Language = "no" | "en"
export type State = "DRAFT" | "APPROVED" | "SUBMITTED" | "HISTORIC" | "REJECTED"

export type CakeSystem = "SUBMITIT" | "CAKE" | "UNKNOWN"

export interface ChangeHstoryItem {
  changeDate: Date
  changedBy: CakeSystem
}
