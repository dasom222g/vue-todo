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

export const header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}
