<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'
import TodoForm from '../components/TodoForm.vue'
export default defineComponent({
  components: { TodoForm },
  name: 'TodoHome',
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
