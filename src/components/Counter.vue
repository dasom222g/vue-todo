<template>
  <div class="wrap">
    <h1>{{ msg }}</h1>
    <button type="button" class="wrap__button" @click="increasement">plus</button>
    <button type="button" class="wrap__button" @click="decreasement">minus</button>
    <div>{{ counter }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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
  setup() {
    const store = useStore(key)
    const increasement = () => store.dispatch('increasement') //액션값을 디스패치함
    const decreasement = () => store.dispatch('decreasement')
    const counter = computed(() => store.state.count)
    return { counter, increasement, decreasement }
  },
})
</script>
