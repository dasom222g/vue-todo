<template>
  <div class="content-wrapper">
    <div class="todo">
      <header><h2 class="todo__title">What’s the Plan for Today?</h2></header>
      <TodoForm v-if="title" v-model:title="title" :item="todo" />
      <div class="button-area">
        <button type="button" class="button-base button-base--cancel">Cancel</button>
        <button type="submit" class="button-base" @click="handleSubmit">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TodoForm from '../components/TodoForm.vue'
import { useStore } from '../store'
import { ActionName } from '../type/type.interface'
export default defineComponent({
  components: {
    TodoForm,
  },
  name: 'TodoUpdate',
  setup() {
    const store = useStore()
    const route = useRoute()
    const todo = computed(() => store.getters.todos.selectedItem)
    const fetchTodo = (id: string) => store.dispatch(ActionName.FETCH_TODO, id)

    const title = computed(() => (todo.value ? todo.value.title : ''))
    const handleSubmit = () => {
      console.log('title', title)
    }
    // lifeCycle
    onMounted(async () => {
      const id = Array.isArray(route.params.id) ? '' : route.params.id
      await fetchTodo(id)
    })
    return { title, todo, handleSubmit }
  },
})
</script>
