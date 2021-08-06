import { InjectionKey } from 'vue'
import { ActionContext, ActionTree, createStore, GetterTree, MutationTree, Store } from 'vuex'
import { ByIDType, header, NormalType, TodoDataIDType } from './type/type.interface'
import { StateType } from './type/type.interface'

export const key: InjectionKey<Store<State>> = Symbol()

// declare state (상태 선언)
export interface State {
  count: number
  todos: StateType
}

const initialState: StateType = {
  isLoading: false,
  payload: null,
  error: null,
}

// const initialnormalState: NormalType = {
//   allIds: [],
//   byId: {},
// }

// set state
const state = {
  count: 0,
  todos: initialState,
}

// set NoramalType (state 변경)
const setTodos = (todos: TodoDataIDType[]): NormalType | null => {
  if (todos) {
    const allIds = todos.map((item) => item.id.toString())
    const byId = todos.reduce((acc: ByIDType, current: TodoDataIDType) => {
      if (current.id) acc[current.id] = current
      return acc
    }, {})
    return {
      allIds,
      byId,
    }
  } else return null
}

// mutations and action enums (type이름 정의)

export enum MutationName {
  // GET_TODOS = 'GET_TODOS',
  // eslint-disable-next-line no-unused-vars
  GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  GET_TODOS_ERROR = 'GET_TODOS_ERROR',
}

export enum ActionName {
  // GET_TODOS = 'GET_TODOS',
  // eslint-disable-next-line no-unused-vars
  FETCH_TODOS = 'FETCH_TODOS',
}

// mutations
export type MutationType<S = State> = {
  // eslint-disable-next-line no-unused-vars
  [MutationName.GET_TODOS_SUCCESS](state: S, payload: TodoDataIDType[]): void
  // eslint-disable-next-line no-unused-vars
  [MutationName.GET_TODOS_ERROR](state: S, error: Error): void
}

const mutations: MutationTree<State> & MutationType = {
  [MutationName.GET_TODOS_SUCCESS](state: State, payload: TodoDataIDType[]) {
    state.todos = {
      ...state.todos,
      isLoading: false,
      payload: setTodos(payload),
      error: null,
    }
  },
  [MutationName.GET_TODOS_ERROR](state: State, error: Error) {
    state.todos = {
      ...state.todos,
      isLoading: false,
      payload: null,
      error,
    }
  },
}

// actions
type AugmentedActionContext = {
  // eslint-disable-next-line no-unused-vars
  commit<K extends keyof MutationType>(key: K, payload: Parameters<MutationType[K]>[1]): ReturnType<MutationType[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface ActionType {
  // eslint-disable-next-line no-unused-vars
  [ActionName.FETCH_TODOS]({ commit }: AugmentedActionContext, payload: TodoDataIDType[], error: Error): Promise<void>
}

const actions: ActionTree<State, State> & ActionType = {
  async [ActionName.FETCH_TODOS]({ commit }) {
    try {
      const data = await fetch('/api/todos', header)
      const result = await data.json()
      commit(MutationName.GET_TODOS_SUCCESS, result)
    } catch (error) {
      commit(MutationName.GET_TODOS_ERROR, error)
    }
  },
}

// getters
export type GettersType = {
  // eslint-disable-next-line no-unused-vars
  todos(state: State): StateType
}

const getters: GetterTree<State, State> = {
  todos: (state) => state.todos,
}

export const store = createStore<State>({
  state,
  getters,
  mutations,
  // mutations: {
  //   increasement(state: State) {
  //     state.count++
  //   },
  //   decreasementFn(state: State) {
  //     if (state.count > 0) state.count--
  //   },
  // },
  actions,
  // actions: {
  //   increasement(context) {
  //     context.commit('increasement')
  //   },
  //   decreasement(context) {
  //     context.commit('decreasementFn') //commit으로 mution 호출
  //   },
  // },
})
