<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm v-model:title="title" @addTodo="addTodo" />
      <ul>
        <li v-for="(todo, index) in todos" :key="`todo_${index}`">
          {{ todo.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TodoForm from '../components/TodoForm.vue'
import { TodosType } from '../type/type.interface'
export default defineComponent({
  components: { TodoForm },
  name: 'TodoHome',
  setup: () => {
    const title = ref('')
    const todos = ref<TodosType[]>([])
    const addTodo = (): void => {
      const todo: TodosType = {
        isComplete: false,
        content: title.value.trim(),
      }
      todos.value = [...todos.value, todo]
      // todo: todos.value POST api호출하여 추가하기
      title.value = ''
    }
    return { addTodo, todos, title }
  },
})
</script>
