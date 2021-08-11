<template>
  <li class="todo__item">
    <div :class="{ complete: !!todo.isComplete }" class="todo__content">
      <div class="todo__item-check">
        <label>
          <input type="checkbox" :checked="!!todo.isComplete" @change="completeTodo(todo)" />
          <font-awesome-icon icon="square" class="todo__item-check-icon" />
          <font-awesome-icon icon="check-square" class="todo__item-check-icon complete" />
          <!-- <font-awesome-icon :icon="['fas', 'heart']" /> -->
          <span class="todo__content-text">{{ todo.title }}</span>
        </label>
      </div>
      <div class="todo__item-buttonarea">
        <router-link :to="`/update/${todo.id}`" class="todo__item-button">
          <font-awesome-icon icon="edit" />
        </router-link>
        <button type="button" class="todo__item-button" @click="removeTodo(todo.id)">
          <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TodoDataIDType } from '../type/type.interface'
export default defineComponent({
  name: 'TodoItem',
  props: {
    todo: {
      type: Object as PropType<TodoDataIDType>,
      required: true,
    },
  },
  emits: {
    'complete-todo': <T>(item: T) => {
      if (item !== null) return true
    },
    'remove-todo': (id: number) => {
      if (id !== null) return true
    },
  },
  setup(props, { emit }) {
    const completeTodo = (todo: TodoDataIDType) => {
      const { id } = todo
      const changeItem = {
        ...todo,
        isComplete: !todo.isComplete,
      }
      emit('complete-todo', { id, changeItem })
    }
    const removeTodo = (id: number) => {
      emit('remove-todo', id)
    }
    return { completeTodo, removeTodo }
  },
})
</script>
