type TodoDataType = {
  title: string
  description?: string
  isComplete?: boolean
}

type TodoDataIDType = {
  id: number
  title: string
  description?: string
  isComplete?: boolean
}

// state
type ByIDType = {
  [key: string]: TodoDataIDType
}

type NormalType = {
  allIds: string[]
  byId: ByIDType
}

type StateType = {
  isLoading: boolean
  payload: NormalType | null
  error: Error | null
}

const header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

export { ByIDType, NormalType, TodoDataType, TodoDataIDType, StateType, header }
