<template>
  <section>
    <ul class="todo__list">
      <TodoItem
        v-for="id in todos.allIds"
        :key="id"
        :todo="todos.byId[id]"
        @completeTodo="$emit('complete-todo', $event, $event)"
        @removeTodo="removeTodo"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NormalType, TodoDataIDType } from '../type/type.interface'
import TodoItem from './TodoItem.vue'
export default defineComponent({
  components: {
    TodoItem,
  },
  name: 'TodoList',
  props: {
    todos: {
      type: Object as PropType<NormalType>,
      required: true,
    },
  },
  emits: {
    'complete-todo': (id: number, changeItem: TodoDataIDType) => {
      if (id !== null || changeItem !== null) return true
    },
    'remove-todo': (id: number) => {
      if (id !== null) return true
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
