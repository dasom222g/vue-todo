<template>
  <section>
    <div class="form">
      <form action="/create" method="post" @submit.prevent="$emit('add-todo'), handleSubmit">
        <div class="form-wrap">
          <input
            ref="myinput"
            type="text"
            class="form__element"
            name="title"
            :value="title"
            @fous="handleFocus"
            @input="$emit('update:title', $event.target.value)"
          />
          <button ref="btn" type="submit" class="form__button">Add</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'TodoForm',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['update:title', 'add-todo'],
  setup: () => {
    const myinput = ref<HTMLInputElement | null>(null)

    const handleSubmit = (e: UIEvent): void => {
      console.log('handleSubmit~~', e, myinput.value)
    }
    const handleFocus = () => {
      console.log('handleFocus~~')
    }

    //life cycle
    onMounted(() => {
      if (myinput.value) myinput.value.focus
    })
    return { myinput, handleSubmit, handleFocus }
  },
})
</script>
