<template>
  <li class="todo__item">
    <div class="todo__content">
      <div class="todo__item-check">
        <label>
          <input type="checkbox" :checked="true" />
          <i className="todo__item-check-icon"></i>
          <!-- <GoCheck className="todo__item-check-icon complete" />
          <span className="todo__content-text">{todo.title}</span> -->
        </label>
        {{ todo.title }}
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
