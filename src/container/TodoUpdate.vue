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
        <button type="button" class="button-base button-base--cancel">Cancel</button>
        <button type="submit" class="button-base" @click="handleSubmit">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
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
    const todo = computed(() => store.getters.todos.selectedItem)
    const fetchTodo = (id: string) => store.dispatch(ActionName.FETCH_TODO, id)
    const description = ref('')

    const handleSubmit = () => {
      console.log('todo', todo.value)
    }
    // lifeCycle
    onMounted(() => {
      const id = Array.isArray(route.params.id) ? '' : route.params.id
      fetchTodo(id)
    })
    return { todo, description, handleSubmit }
  },
})
</script>
