<template>
  <!-- <Counter :msg="'Hello Vue 3 + TypeScript + Vite'" /> -->
  <TodoHome />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TodoHome from './container/TodoHome.vue'
// import Counter from './components/Counter.vue'

export default defineComponent({
  name: 'App',
  components: {
    TodoHome,
    // Counter,
  },
})
</script>
