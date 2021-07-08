<template>
  <section>
    <div class="form">
      <form action="/create" method="post" @submit.prevent="handleSubmit">
        <div class="form-wrap">
          <input type="text" class="form__element" name="title" v-model="title" />
          <button type="submit" class="form__button">Add</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'TodoForm',
  setup: () => {
    const title = ref('')
    const handleSubmit = (e: UIEvent): void => {
      console.log(e, 'title', title.value)
    }
    return { title, handleSubmit }
  },
})
</script>
