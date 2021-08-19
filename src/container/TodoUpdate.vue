<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <template v-if="todo">
        <TodoForm :isAdd="false" v-model:title="todo.title" />
        <TodoDetailForm
          :description="todo.description ? todo.description : ''"
          v-model:description="todo.description"
        />
      </template>
      <div class="button-area">
        <button type="button" class="button-base button-base--cancel" @click="goHome">Cancel</button>
        <button type="submit" class="button-base" @click="handleSubmit">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TodoDetailForm from '../components/TodoDetailForm.vue'
import TodoForm from '../components/TodoForm.vue'
import { useStore } from '../store'
import { ActionName } from '../type/type.interface'
export default defineComponent({
  components: {
    TodoForm,
    TodoDetailForm,
  },
  name: 'TodoUpdate',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const todo = computed(() => store.getters.todos.selectedItem)
    const fetchTodo = (id: string) => store.dispatch(ActionName.FETCH_TODO, id)

    const goHome = () => router.push({ name: 'TodoHome' })

    const handleSubmit = () => {
      if (todo.value) {
        const changeItem = { ...todo.value, title: todo.value.title.trim() }
        if (todo.value.description) changeItem.description = todo.value.description.trim()
        store.dispatch(ActionName.PUT_TODO, changeItem)
      }
      goHome()
    }
    // lifeCycle
    onMounted(() => {
      const id = Array.isArray(route.params.id) ? '' : route.params.id
      fetchTodo(id)
    })
    return { todo, handleSubmit, goHome }
  },
})
</script>
