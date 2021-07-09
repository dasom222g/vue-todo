<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm @addTodo="addTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoForm from '../components/TodoForm.vue'
export default defineComponent({
  components: { TodoForm },
  name: 'TodoHome',
  setup: () => {
    const addTodo = (data: string): void => {
      console.log('data', data)
    }
    return { addTodo }
  },
})
</script>
