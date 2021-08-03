import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { StateType } from './type/type.interface'

export const key: InjectionKey<Store<State>> = Symbol()

export interface State {
  count: number
  todos: StateType
}

const initialState: StateType = {
  isLoading: false,
  payload: null,
  error: null,
}

export const store = createStore<State>({
  state: {
    count: 0,
    todos: initialState,
  },
  mutations: {
    increasement(state: State) {
      state.count++
    },
    decreasementFn(state: State) {
      if (state.count > 0) state.count--
    },
  },
  actions: {
    increasement(context) {
      context.commit('increasement')
    },
    decreasement(context) {
      context.commit('decreasementFn') //decreasementFn 함수 호출
    },
  },
})
