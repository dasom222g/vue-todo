import { Store } from 'vuex'
import { State } from './type/type.interface'

declare module '@vue/runtime-core' {
  // eslint-disable-next-line no-unused-vars
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
// declare module "vuex" {
//   export function useStore(key?: string): Store<State>;
// }