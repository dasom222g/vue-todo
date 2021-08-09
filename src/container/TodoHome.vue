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
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'
import { useStore } from '../store'
import { ActionName } from '../type/type.interface'
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
    const addTodo = async (text: string): Promise<void> => {
      // todo: store에 있는 데이터에서 중복된 값 있는지 확인 후 실행할 것
      store.dispatch(ActionName.POST_TODO, text)
      const sameArr = todos.value.payload
      console.log('sameArr', sameArr)
    }

    const removeTodo = (id: number) => {
      store.dispatch(ActionName.DELETE_TODO, id)
    }
    // lifeCycle
    onBeforeMount(async () => {
      await fetchTodos()
      console.log('todos', todos.value)
    })
    return { addTodo, removeTodo, title, todos }
  },
})
</script>
