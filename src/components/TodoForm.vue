<template>
  <section>
    <div class="form">
      <form action="/create" method="post" @submit.prevent="handleSubmit">
        <div class="form-wrap">
          <input ref="myinput" type="text" class="form__element" name="title" v-model="message" />
          <!-- <input
            ref="myinput"
            type="text"
            class="form__element"
            name="title"
            :value="message"
            @input="$emit('update:title', $event.target.value)"
          /> -->
          <button ref="btn" type="submit" class="form__button">Add</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, computed } from 'vue'
export default defineComponent({
  name: 'TodoForm',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['update:title', 'add-todo'],
  setup(props, { emit }) {
    const myinput = ref<HTMLInputElement | null>(null)
    const message = computed({
      get: () => props.title,
      set: (value) => emit('update:title', value),
    })
    const handleSubmit = () => {
      if (/^\s*$/.test(props.title)) {
        // 공백만 입력할 경우
        message.value = ''
        focusInput()
        return
      }
      emit('add-todo')
      focusInput()
    }

    const focusInput = () => {
      if (myinput.value) myinput.value.focus()
    }

    //life cycle
    onMounted(() => {
      nextTick(() => {
        if (myinput.value) myinput.value.focus()
      })
    })
    return { myinput, message, handleSubmit }
  },
})
</script>
