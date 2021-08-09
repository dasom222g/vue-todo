<template>
  <section>
    <ul class="todo__list">
      <TodoItem v-for="todo in todos.byId" :key="todo.id" :todo="todo" @removeTodo="removeTodo" />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NormalType } from '../type/type.interface'
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
  setup(props, { emit }) {
    // const { allIds, byId } = toRefs(props.todos)
    const removeTodo = (id: number) => {
      emit('remove-todo', id)
    }
    return { removeTodo }
  },
})
</script>
