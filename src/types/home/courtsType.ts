// Type Imports
export type Court = {
  id: number
  title: string
  mac: string
  plan: CourtsPlan
}

export type CourtsPlan = {
  id: number
  type: string
}

export type CourtsTypes = {
  courts: Court[]
}
