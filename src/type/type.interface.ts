export interface TodoDataType {
  title: string
  description?: string
  isComplete?: boolean
}

export interface TodoDataIDType {
  id: number
  title: string
  description?: string
  isComplete?: boolean
}

// state
export type ByIDType = {
  [key: string]: TodoDataIDType
}

export type NormalType = {
  allIds: string[]
  byId: ByIDType
}

export interface StateType {
  isLoading: boolean
  payload: NormalType | null
  error: Error | null
}

export const header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}
