<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm v-model:title="title" @addTodo="addTodo" />
      <ul>
        <li v-for="(todo, index) in todos" :key="`todo_${index}`">
          {{ todo.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TodoForm from '../components/TodoForm.vue'
import { TodoDataType, header, TodoDataIDType } from '../type/type.interface'
export default defineComponent({
  components: { TodoForm },
  name: 'TodoHome',
  setup: () => {
    const title = ref('')
    const todos = ref<TodoDataType[]>([])
    let todo: TodoDataType
    const addTodo = (): void => {
      todo = {
        title: title.value.trim(),
        isComplete: false,
      }
      todos.value = [...todos.value, todo]
      // todo: todos.value POST api호출하여 추가하기
      title.value = ''
      if (title.value === 'slkfdjklsdjf') fetchTodos()
      postTodo()
    }
    const fetchTodos = async (): Promise<void> => {
      try {
        const data = await fetch('/api/todos', header)
        const result: TodoDataIDType[] = await data.json()
        console.log('data', data, 'rusult', result)
      } catch (error) {
        console.log('error', error)
      }
    }

    const postTodo = async (): Promise<void> => {
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          body: JSON.stringify(todo),
        })
        const result: TodoDataIDType = await response.json()
        console.log('postResult', result)
      } catch (error) {
        console.log(error)
      }
    }
    return { addTodo, todos, title }
  },
})
</script>
