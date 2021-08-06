import { InjectionKey } from 'vue'
import {
  ActionTree,
  CommitOptions,
  createStore,
  DispatchOptions,
  GetterTree,
  MutationTree,
  Store as VuexStore,
} from 'vuex'
import {
  ActionName,
  ActionType,
  AugmentedActionContext,
  ByIDType,
  GettersType,
  header,
  MutationName,
  MutationType,
  NormalType,
  State,
  TodoDataIDType,
} from './type/type.interface'
import { StateType } from './type/type.interface'

export const key: InjectionKey<VuexStore<State>> = Symbol()

// declare state (상태 선언)

const initialState: StateType = {
  isLoading: false,
  payload: null,
  error: null,
}

// const initialnormalState: NormalType = {
//   allIds: [],
//   byId: {},
// }

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

const state = {
  count: 0,
  todos: initialState,
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

const actions: ActionTree<State, State> & ActionType = {
  async [ActionName.FETCH_TODOS]({ commit }: AugmentedActionContext) {
    try {
      const data = await fetch('/api/todos', header)
      const result = await data.json()
      commit(MutationName.GET_TODOS_SUCCESS, result)
    } catch (error) {
      commit(MutationName.GET_TODOS_ERROR, error)
    }
  },
}

const getters: GetterTree<State, State> = {
  todos: (state) => state.todos,
}

// store
export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof MutationType, P extends Parameters<MutationType[K]>[1]>(
    // eslint-disable-next-line no-unused-vars
    key: K,
    // eslint-disable-next-line no-unused-vars
    payload: P,
    // eslint-disable-next-line no-unused-vars
    options?: CommitOptions
  ): ReturnType<MutationType[K]>
} & {
  dispatch<K extends keyof ActionType>(
    // eslint-disable-next-line no-unused-vars
    key: K,
    // eslint-disable-next-line no-unused-vars
    payload?: Parameters<ActionType[K]>[1],
    // eslint-disable-next-line no-unused-vars
    options?: DispatchOptions
  ): ReturnType<ActionType[K]>
} & {
  getters: {
    [K in keyof GettersType]: ReturnType<GettersType[K]>
  }
}

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions,
  // mutations: {
  //   increasement(state: State) {
  //     state.count++
  //   },
  //   decreasementFn(state: State) {
  //     if (state.count > 0) state.count--
  //   },
  // },
  // actions: {
  //   increasement(context) {
  //     context.commit('increasement')
  //   },
  //   decreasement(context) {
  //     context.commit('decreasementFn') //commit으로 mution 호출
  //   },
  // },
})

export function useStore() {
  return store as Store
}
