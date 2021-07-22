<template>
  <section>
    <div class="form">
      <form action="/create" method="post" @submit.prevent="handleSubmit($event), $emit('add-todo')">
        <div class="form-wrap">
          <input
            ref="myinput"
            type="text"
            class="form__element"
            name="title"
            :value="title"
            @focus="handleFocus"
            @input="$emit('update:title', $event.target.value)"
          />
          <button ref="btn" type="submit" class="form__button">Add</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue'
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

    const handleFocus = (e: UIEvent) => {
      console.log('focus', e)
    }

    const handleSubmit = (e: UIEvent) => {
      if (myinput.value) myinput.value.focus()
      else console.log('event', e)
    }

    //life cycle
    onMounted(() => {
      nextTick(() => {
        if (myinput.value) myinput.value.focus()
      })
    })
    return { myinput, handleFocus, handleSubmit }
  },
})
</script>
