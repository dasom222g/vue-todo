<template>
  <div className="todo__detail-desc">
    <textarea placeholder="Write a note.." name="description" v-model="message" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'TodoDetailForm',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  emits: {
    'update:text': (value: string) => {
      if (value !== null) return true
    },
  },
  // emits: ['update:title', 'add-todo'],
  setup(props, { emit }) {
    const message = computed({
      get: (): string => props.text,
      set: (value: string) => emit('update:text', value),
    })
    return { message }
  },
})
</script>
