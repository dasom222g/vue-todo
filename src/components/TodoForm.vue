<template>
  <section>
    <div class="form">
      <form
        :action="`${item ? '/updae' : '/creatte'}`"
        :method="`${item ? 'put' : 'post'}`"
        @submit.prevent="handleSubmit"
      >
        <div class="form-wrap">
          <input ref="myinput" type="text" class="form__element" name="title" v-model="message" />
          <button v-if="!item" ref="btn" type="submit" class="form__button">Add</button>
        </div>
        <TodoDetailForm v-if="item" :description="item.description ? item.description : ''" />
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, PropType, watch } from 'vue'
import { TodoDataIDType } from '../type/type.interface'
import TodoDetailForm from './TodoDetailForm.vue'
export default defineComponent({
  components: { TodoDetailForm },
  name: 'TodoForm',
  props: {
    title: {
      type: String,
      required: true,
    },
    item: {
      type: Object as PropType<TodoDataIDType> | null,
      required: false,
      default: null,
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
    // const message = computed({
    //   get: (): string => props.title,
    //   set: (value: string) => emit('update:title', value),
    // })
    const message = ref(props.title)
    watch(message, (current: string) => {
      emit('update:title', current)
    })
    const handleSubmit = () => {
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
