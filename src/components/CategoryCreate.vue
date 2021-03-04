<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="name"
          :class="{invalid: nError}"
          type="text"
          v-model="name"
          @blur="nBlur"
        />
        <label for="name">Название</label>
        <span class="helper-text invalid" v-if="nError">{{ nError }}</span>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="limit"
          @blur="lBlur"
          :class="{invalid: lError}"
        />
        <label for="limit">Лимит</label>
        <span class="helper-text invalid" v-if="lError">{{ lError }}</span>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
      >
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useCategoryCreate } from '@/use/category-create'
import { onMounted } from 'vue'

export default {
  name: 'CategoryCreate',
  setup (context) {
    onMounted(() => {
      M.updateTextFields()
    })

    return {
      ...useCategoryCreate(context)
    }
  }
}
</script>
