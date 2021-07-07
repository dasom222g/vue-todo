<template>
  <section>
    <div class="form">
      <form action="/create" method="post" @submit.prevent="handleSubmit">
        <div class="form-wrap">
          <input type="text" class="form__element" name="title" />
          <button type="submit" class="form__button">Add</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TodoForm',
  setup: () => {
    const handleSubmit = (e: UIEvent): void => {
      console.log('event', e.target)
    }
    return { handleSubmit }
  },
})
</script>
