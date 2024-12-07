// Type Imports
export type Court = {
  id: string
  title: string
  mac: string
  is_available?: number
  plan: CourtsPlan
}

export type CourtsPlan = {
  id: number
  type: string
}

export type CourtsTypes = {
  courts: Court[]
}

export type CourtsTypeList = {
  id: string
  title: string
  mac: string
  is_available?: number
  plan_name: string
}
