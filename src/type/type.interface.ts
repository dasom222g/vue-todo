import { ActionContext } from 'vuex'

/* eslint-disable no-unused-vars */

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
  selectedItem: TodoDataIDType | null
  error: Error | null
}

interface State {
  count: number
  todos: StateType
}

// mutations
export enum MutationName {
  GET_TODOS = 'GET_TODOS',
  GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS',
  GET_TODOS_ERROR = 'GET_TODOS_ERROR',
  GET_TODO_SUCCESS = 'GET_TODO_SUCCESS',
  GET_TODO_ERROR = 'GET_TODO_ERROR',
  ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS',
  ADD_TODO_ERROR = 'ADD_TODO_ERROR',
  UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR',
  DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS',
  DELETE_TODO_ERROR = 'DELETE_TODO_ERROR',
}

export type MutationType<S = State> = {
  [MutationName.GET_TODOS](state: S): void
  [MutationName.GET_TODOS_SUCCESS](state: S, payload: TodoDataIDType[]): void
  [MutationName.GET_TODOS_ERROR](state: S, error: Error): void
  [MutationName.GET_TODO_SUCCESS](state: S, payload: TodoDataIDType): void
  [MutationName.GET_TODO_ERROR](state: S, error: Error): void
  [MutationName.ADD_TODO_SUCCESS](state: S, payload: TodoDataIDType): void
  [MutationName.ADD_TODO_ERROR](state: S, error: Error): void
  [MutationName.UPDATE_TODO_SUCCESS](state: S, payload: TodoDataIDType): void
  [MutationName.UPDATE_TODO_ERROR](state: S, error: Error): void
  [MutationName.DELETE_TODO_SUCCESS](state: S, id: number): void
  [MutationName.DELETE_TODO_ERROR](state: S, error: Error): void
}

//actions
export enum ActionName {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODO = 'FETCH_TODO',
  POST_TODO = 'POST_TODO',
  PUT_TODO = 'PUT_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export type AugmentedActionContext = {
  commit<K extends keyof MutationType>(key: K, payload?: Parameters<MutationType[K]>[1]): ReturnType<MutationType[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface ActionType {
  [ActionName.FETCH_TODOS]({ commit }: AugmentedActionContext): Promise<void>
  [ActionName.FETCH_TODO]({ commit }: AugmentedActionContext, payload: string): Promise<void>
  [ActionName.POST_TODO]({ commit }: AugmentedActionContext, payload: string): Promise<void>
  [ActionName.PUT_TODO]({ commit }: AugmentedActionContext, payload: TodoDataIDType): Promise<void>
  [ActionName.DELETE_TODO]({ commit }: AugmentedActionContext, payload: number): Promise<void>
}

// getters
export type GettersType = {
  // eslint-disable-next-line no-unused-vars
  todos(state: State): StateType
}

export { ByIDType, NormalType, TodoDataType, TodoDataIDType, StateType, State }
