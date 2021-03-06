<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option
            v-for="c in cats"
            :key="c.id"
            :value="c.id"
          >{{ c.name }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input
          type="text"
          id="nameEditCat"
          v-model="name"
          @blur="nBlur"
          :class="{invalid: nError}"
        />
        <label for="nameEditCat">Название</label>
        <span class="helper-text invalid" v-if="nError">{{ nError }}</span>
      </div>

      <div class="input-field">
        <input
          id="limitEditCat"
          type="number"
          v-model="limit"
          @blur="lBlur"
          :class="{invalid: lError}"
        />
        <label for="limitEditCat">Лимит</label>
        <span class="helper-text invalid" v-if="lError">{{ lError }}</span>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
      >
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useCategoryEdit } from '@/use/category-edit'

export default {
  props: {
    cats: {
      type: Array,
      required: true
    }
  },
  emits: ['updated'],
  name: 'CategoryEdit',
  data () {
    return {
      select: null,
      current: null,
      ...useCategoryEdit(this.$emit)
    }
  },
  mounted () {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  created () {
    const { id, name, limit } = this.cats[0]
    this.current = id
    this.name = name
    this.limit = limit
  },
  watch: {
    current (id) {
      const cat = this.cats.filter(f => f.id === id)
      this.current = id
      this.name = cat[0].name
      this.limit = cat[0].limit
    }
  },
  beforeUnmount () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
