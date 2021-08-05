import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
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

// set NoramalType
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

// mutations and action enums

export const store = createStore<State>({
  state,
  mutations: {
    increasement(state: State) {
      state.count++
    },
    decreasementFn(state: State) {
      if (state.count > 0) state.count--
    },
    getTodoSuccess(state: State, payload: TodoDataIDType[]) {
      state.todos = {
        ...state.todos,
        isLoading: false,
        payload: setTodos(payload),
        error: null,
      }
    },
    getTodoError(state: State, error) {
      state.todos = {
        ...state.todos,
        isLoading: false,
        payload: null,
        error,
      }
    },
  },
  actions: {
    increasement(context) {
      context.commit('increasement')
    },
    decreasement(context) {
      context.commit('decreasementFn') //commit으로 mution 호출
    },
    async fetchTodos({ commit }) {
      try {
        const data = await fetch('/api/todos', header)
        const result = await data.json()
        commit('getTodoSuccess', result)
      } catch (error) {
        commit('getTodoError', error)
      }
    },
  },
})
