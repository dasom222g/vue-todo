<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm v-model:title="title" @addTodo="addTodo" />
      <TodoList v-if="todos" :todos="todos" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'
import { TodoDataType, header, TodoDataIDType } from '../type/type.interface'
export default defineComponent({
  components: {
    TodoForm,
    TodoList,
  },
  name: 'TodoHome',
  setup: () => {
    const title = ref('')
    let todos = ref<TodoDataIDType[]>([])
    let todo: TodoDataType
    const addTodo = async (): Promise<void> => {
      todo = {
        title: title.value.trim(),
        isComplete: false,
      }
      title.value = ''
      await postTodo()
      fetchTodos()
    }
    const fetchTodos = async (): Promise<void> => {
      try {
        const data = await fetch('/api/todos', header)
        const result = await data.json()
        todos.value = result
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
    onBeforeMount(() => {
      fetchTodos()
    })
    return { addTodo, title, todos }
  },
})
</script>
