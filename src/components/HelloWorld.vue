<template>
  <div class="wrap">
    <h1>{{ msg }}</h1>
    <button type="button" class="wrap__button" @click="increasement">plus</button>
    <button type="button" class="wrap__button" @click="decreasement">minus</button>
    <div>{{ counter }}</div>
    <div>{{ `count: ${count}` }}</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0)
    const store = useStore(key)
    const increasement = () => store.dispatch('increasement') //액션값을 디스패치함
    const decreasement = () => store.dispatch('decreasement')
    const counter = computed(() => store.state.count)
    return { count, counter, increasement, decreasement }
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/style/_variables.scss';

// $green: #07d1ad;
.wrap {
  &__button {
    color: $green;
    padding: 5px;
  }
}
</style>

function useState(initialState: any): [any, any] { throw new Error("Function not implemented."); } function
useState(initialState: any): [any, any] { throw new Error("Function not implemented."); } function useState(arg0:
number): [any, any] { throw new Error("Function not implemented."); } function useState(arg0: number): [any, any] {
throw new Error("Function not implemented."); }
