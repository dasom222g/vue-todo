<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm v-model:title="title" @addTodo="addTodo" />
      <TodoList v-if="todos.payload" :todos="todos.payload" @completeTodo="completeTodo" @removeTodo="removeTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'
import { useStore } from '../store'
import { ActionName, TodoDataIDType } from '../type/type.interface'
export default defineComponent({
  components: {
    TodoForm,
    TodoList,
  },
  name: 'TodoHome',
  setup() {
    const store = useStore()
    const todos = computed(() => store.getters.todos)
    const fetchTodos = () => store.dispatch(ActionName.FETCH_TODOS)

    const title = ref('')
    const addTodo = (text: string): void => {
      const sameArr =
        todos.value.payload &&
        todos.value.payload.allIds.filter((id: string) => todos.value.payload?.byId[id].title === text)
      if (sameArr && sameArr.length) return
      store.dispatch(ActionName.POST_TODO, text)
    }

    const completeTodo = ({ id, changeItem }: { id: number; changeItem: TodoDataIDType }): void => {
      console.log('id', id)
      store.dispatch(ActionName.PUT_TODO, changeItem)
    }

    const removeTodo = (id: number) => {
      store.dispatch(ActionName.DELETE_TODO, id)
    }
    // lifeCycle
    onBeforeMount(async () => {
      await fetchTodos()
      console.log('todos', todos.value)
    })
    return { addTodo, completeTodo, removeTodo, title, todos }
  },
})
</script>
