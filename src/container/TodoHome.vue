<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm :isAdd="true" v-model:text="title" @addTodo="addTodo" />
      <div v-if="todos.isLoading">Loading...</div>
      <TodoList
        v-else-if="todos.payload"
        :todos="todos.payload"
        @completeTodo="completeTodo"
        @removeTodo="removeTodo"
      />
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
        todos.value.payload.allIds.filter((id: string) => todos.value.payload?.byId[id].title === text.trim())
      if (sameArr && sameArr.length) return
      store.dispatch(ActionName.POST_TODO, text.trim())
    }

    const completeTodo = (changeItem: TodoDataIDType): void => {
      store.dispatch(ActionName.PUT_TODO, changeItem)
    }

    const removeTodo = (id: number) => {
      store.dispatch(ActionName.DELETE_TODO, id)
    }
    // lifeCycle
    onBeforeMount(() => {
      if (todos.value.payload && todos.value.payload.allIds.length) return
      fetchTodos()
    })
    return { addTodo, completeTodo, removeTodo, title, todos }
  },
})
</script>
