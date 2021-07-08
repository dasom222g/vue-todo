<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoForm from '../components/TodoForm.vue'
export default defineComponent({
  components: { TodoForm },
  name: 'TodoHome',
})
</script>
