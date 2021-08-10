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

const dataInitial: NormalType = {
  allIds: [],
  byId: {},
}

const errorState = (error: Error): StateType => {
  const state: StateType = {
    isLoading: false,
    payload: null,
    error,
  }
  return state
}

// const initialnormalState: NormalType = {
//   allIds: [],
//   byId: {},
// }

// set NoramalType (state 변경)
const setTodos = (todos: TodoDataIDType[] | null): NormalType => {
  if (todos) {
    const allIds = todos.map((item: TodoDataIDType) => item.id.toString())
    const byId = todos.reduce(
      (acc: ByIDType, current: TodoDataIDType): ByIDType => ({ ...acc, [current.id]: current }),
      {}
    )
    return {
      allIds,
      byId,
    }
  } else return dataInitial
}
const setTodo = ({ allIds, byId }: NormalType, todo: TodoDataIDType): NormalType => {
  const id = todo.id.toString()
  const result = {
    allIds: [...allIds, id],
    byId: {
      ...byId,
      [id]: todo,
    },
  }
  return result
}

const updateTodo = ({ allIds, byId }: NormalType, todo: TodoDataIDType, todoId: number): NormalType => {
  const id = todoId.toString()
  byId[id] = todo
  return {
    allIds,
    byId,
  }
}

const removeTodo = ({ allIds, byId }: NormalType, todoId: number): NormalType => {
  const id = todoId.toString()
  allIds = allIds.filter((item) => item !== id)
  delete byId[id]
  return {
    allIds,
    byId,
  }
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
    state.todos = errorState(error)
  },
  [MutationName.ADD_TODO_SUCCESS](state: State, payload: TodoDataIDType) {
    state.todos = {
      ...state.todos,
      isLoading: false,
      payload: state.todos.payload && setTodo(state.todos.payload, payload),
      error: null,
    }
  },
  [MutationName.ADD_TODO_ERROR](state: State, error: Error) {
    state.todos = errorState(error)
  },
  [MutationName.UPDATE_TODO_SUCCESS](state: State, payload: TodoDataIDType) {
    state.todos = {
      ...state.todos,
      isLoading: false,
      payload: state.todos.payload && updateTodo(state.todos.payload, payload, payload.id),
      error: null,
    }
  },
  [MutationName.UPDATE_TODO_ERROR](state: State, error: Error) {
    state.todos = errorState(error)
  },
  [MutationName.DELETE_TODO_SUCCESS](state: State, id: number) {
    state.todos = {
      ...state.todos,
      isLoading: false,
      payload: state.todos.payload && removeTodo(state.todos.payload, id),
      error: null,
    }
  },
  [MutationName.DELETE_TODO_ERROR](state: State, error: Error) {
    state.todos = errorState(error)
  },
}

const actions: ActionTree<State, State> & ActionType = {
  async [ActionName.FETCH_TODOS]({ commit }: AugmentedActionContext): Promise<void> {
    try {
      const data = await fetch('/api/todos', header)
      const result = await data.json()
      commit(MutationName.GET_TODOS_SUCCESS, result)
    } catch (error) {
      commit(MutationName.GET_TODOS_ERROR, error)
    }
  },
  async [ActionName.POST_TODO]({ commit }: AugmentedActionContext, title: string): Promise<void> {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ title }),
      })
      const result: TodoDataIDType = await response.json()
      commit(MutationName.ADD_TODO_SUCCESS, result)
    } catch (error) {
      commit(MutationName.ADD_TODO_ERROR, error)
    }
  },
  async [ActionName.PUT_TODO]({ commit }: AugmentedActionContext, changeItem: TodoDataIDType): Promise<void> {
    const id = changeItem.id
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ changeItem }),
      })
      const result: TodoDataIDType = await response.json()
      commit(MutationName.UPDATE_TODO_SUCCESS, result)
    } catch (error) {
      commit(MutationName.UPDATE_TODO_ERROR, error)
    }
  },
  async [ActionName.DELETE_TODO]({ commit }: AugmentedActionContext, id: number): Promise<void> {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      commit(MutationName.DELETE_TODO_SUCCESS, id)
    } catch (error) {
      commit(MutationName.DELETE_TODO_ERROR, error)
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
