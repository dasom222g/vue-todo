<template>
  <li class="todo__item">
    <div class="todo__content">
      <div class="todo__item-check">
        <label>
          <input type="checkbox" :checked="todo.isComplete" />
          <font-awesome-icon icon="square" class="todo__item-check-icon" />
          <font-awesome-icon icon="check-square" class="todo__item-check-icon complete" />
          <!-- <font-awesome-icon :icon="['fas', 'heart']" /> -->
          <span className="todo__content-text">{{ todo.title }}</span>
        </label>
      </div>
    </div>
    <div className="todo__item-buttonarea">
      <router-link to="/update">
        <!-- <TiEdit /> -->
      </router-link>
      <button type="button" className="todo__item-button">
        <!-- <RiCloseCircleLine
          className="todo__item-button-icon delete"
        /> -->
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TodoDataType } from '../type/type.interface'
export default defineComponent({
  name: 'TodoItem',
  props: {
    todo: {
      type: Object as PropType<TodoDataType>,
      required: true,
    },
  },
  setup: () => {
    // return {}
  },
})
</script>
