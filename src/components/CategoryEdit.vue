<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form>
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
        <input type="text" id="name" />
        <label for="name">Название</label>
        <span class="helper-text invalid">TITLE</span>
      </div>

      <div class="input-field">
        <input id="limit" type="number" />
        <label for="limit">Лимит</label>
        <span class="helper-text invalid">LIMIT</span>
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
export default {
  props: {
    cats: {
      type: Array,
      required: true
    }
  },
  name: 'CategoryEdit',
  data () {
    return {
      select: null,
      current: null
    }
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
  },
  beforeCreate () {
    const { id, name, limit } = this.cats[0]
  },
  watch: {
    current (id) {
      console.log(id)
    }
  },
  beforeUnmount () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
