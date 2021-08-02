<template>
  <section>
    <ul class="todo__list">
      <TodoItem v-for="(todo, index) in todos" :key="`todo_${index}`" :todo="todo" @removeTodo="removeTodo" />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TodoDataIDType } from '../type/type.interface'
import TodoItem from './TodoItem.vue'
export default defineComponent({
  components: { TodoItem },
  name: 'TodoList',
  props: {
    todos: {
      type: Array as PropType<TodoDataIDType[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const removeTodo = (id: number) => {
      emit('remove-todo', id)
    }
    return { removeTodo }
  },
})
</script>
