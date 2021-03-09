<template>
  <ThePreloader v-if="loading" />

  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
        {{ record.type === 'income' ? 'Доход' : 'Расход' }}
      </a>
    </div>

    <div class="row">
      <div class="col s12 m6">
        <div
          class="card"
          :class="{
            red: record.type === 'outcome',
            green: record.type === 'income',
          }"
        >
          <div class="card-content white-text">
            <p>Описание: {{ record.descr }}</p>
            <p>Сумма: {{ $currency(record.amount, 'RUB') }}</p>
            <p>Категория: {{ record.categoryName }}</p>

            <small>{{ $dateF(record.date) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>Страница с ID {{ $route.params.id }} не найдена</p>
</template>

<script>
export default {
  name: 'DetailRecord',
  data () {
    return {
      loading: true,
      record: null
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.category)
    this.loading = false

    this.record = {
      ...record,
      categoryName: category.name
    }
  }
}
</script>
