<template>
  <section>
    <div class="form">
      <form
        :action="`${!isAdd ? '/updae' : '/creatte'}`"
        :method="`${!isAdd ? 'put' : 'post'}`"
        @submit.prevent="handleSubmit"
      >
        <div class="form-wrap">
          <input ref="myinput" type="text" class="form__element" name="title" v-model="message" />
          <button v-if="isAdd" ref="btn" type="submit" class="form__button">Add</button>
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
    isAdd: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: {
    'add-todo': (message: string) => {
      if (message.length > 0) return true
      else return false
    },
    'update:title': (value: string) => {
      if (value !== null) return true
    },
  },
  // emits: ['update:title', 'add-todo'],
  setup(props, { emit }) {
    const myinput = ref<HTMLInputElement | null>(null)
    const message = computed({
      get: (): string => props.title,
      set: (value: string) => emit('update:title', value),
    })
    const handleSubmit = () => {
      if (!props.isAdd) return
      if (/^\s*$/.test(props.title)) {
        // 공백만 입력할 경우
        message.value = ''
        focusInput()
        return
      }
      emit('add-todo', message.value)
      message.value = ''
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
