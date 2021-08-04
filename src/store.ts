import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
// import { StateType } from './type/type.interface'

export const key: InjectionKey<Store<State>> = Symbol()

// declare state (상태 선언)
export interface State {
  count: number
}

// const initialState: StateType = {
//   isLoading: false,
//   payload: null,
//   error: null,
// }

// set state
const state = {
  count: 0,
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
  },
  actions: {
    increasement(context) {
      context.commit('increasement')
    },
    decreasement(context) {
      context.commit('decreasementFn') //commit으로 mution 호출
    },
  },
})
