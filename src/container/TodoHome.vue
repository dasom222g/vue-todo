<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm v-model:title="title" @addTodo="addTodo" />
      <TodoList v-if="todos.payload" :todos="todos.payload" @removeTodo="removeTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'
import { key } from '../store'
import { TodoDataType, TodoDataIDType, StateType } from '../type/type.interface'
export default defineComponent({
  components: {
    TodoForm,
    TodoList,
  },
  name: 'TodoHome',
  setup() {
    const store = useStore(key)
    const fetchTodos = () => store.dispatch('fetchTodos')
    // let todos = ref<TodoDataIDType[]>([])
    const todos: ComputedRef<StateType> = computed(() => store.state.todos)

    const title = ref('')
    let todo: TodoDataType
    const addTodo = async (): Promise<void> => {
      // todo: store에 있는 데이터에서 중복된 값 있는지 확인 후 실행할 것
      todo = {
        title: title.value.trim(),
        isComplete: false,
      }
      title.value = ''
      await postTodo()
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

    const removeTodo = (id: number) => {
      console.log('removeTodo', id)
    }
    // lifeCycle
    onBeforeMount(() => {
      fetchTodos()
    })
    return { addTodo, removeTodo, title, todos }
  },
})
</script>
