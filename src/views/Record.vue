<template>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>

  <ThePreloader v-if="loading" />

  <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить категорию</router-link></p>

  <form class="form" @submit="onSubmit" v-else>
    <div class="input-field">
      <select v-model="category" ref="catSelect">
        <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
        >{{ c.name }}</option>
      </select>
      <label>Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
          class="with-gap"
          name="type"
          type="radio"
          value="income"
          v-model="type"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
          class="with-gap"
          name="type"
          type="radio"
          value="outcome"
          v-model="type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
        id="amount"
        type="number"
        v-model.number="amount"
        :class="{invalid: aError}"
      >
      <label for="amount">Сумма</label>
      <span class="helper-text invalid" v-if="aError">{{ aError }}</span>
    </div>

    <div class="input-field">
      <input
        id="description"
        type="text"
        :class="{invalid: dError}"
        v-model="descr"
      >
      <label for="description">Описание</label>
      <span class="helper-text invalid" v-if="dError">{{ dError }}</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import { useRecordCreate } from '@/use/record-create'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Record',
  setup (attrs, context) {
    const store = useStore()
    const select = ref(null)
    const catSelect = ref(null)
    const categories = ref([])
    const loading = ref(true)
    const current = ref(null)

    onMounted(async () => {
      try {
        categories.value = await store.dispatch('fetchCategory')
        loading.value = false
        current.value = categories.value[0].id
      } catch (error) {}

      M.updateTextFields()
      setTimeout(() => {
        select.value = M.FormSelect.init(catSelect.value)
      }, 0)
    })

    onBeforeUnmount (() => {
      if (select.value && select.destroy) {
        select.destroy()
      }
    })

    return {
      ...useRecordCreate(current),
      catSelect,
      loading,
      categories,
      current
    }
  }
}
</script>
