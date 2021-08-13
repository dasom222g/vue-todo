<template>
  <div className="todo__detail-desc">
    <textarea placeholder="Write a note.." name="description" v-model="message" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
export default defineComponent({
  name: 'TodoDetailForm',
  props: {
    description: {
      type: String,
      required: true,
    },
  },
  emits: {
    'update:description': (value: string) => {
      if (value !== null) return true
    },
  },
  // emits: ['update:title', 'add-todo'],
  setup(props, { emit }) {
    const message = computed({
      get: (): string => props.description,
      set: (value: string) => emit('update:description', value),
    })
    //life cycle
    onMounted(() => {
      console.log('TodoDetail Render')
    })
    return { message }
  },
})
</script>
