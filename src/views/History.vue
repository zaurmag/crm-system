<template>

    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <ThePreader v-if="loading" />

    <p class="center-align" v-else-if="!records.length">Записей пока нет. <router-link to="/record">Добавить первую</router-link></p>

    <section v-else>
      <HistoryTable :items="records" />
    </section>

</template>

<script>
import HistoryTable from '../components/HistoryTable'

export default {
  name: 'History',
  data () {
    return {
      loading: true,
      records: [],
      categories: []
    }
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategory')
    this.loading = false
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.category).name,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
  },
  components: {
    HistoryTable
  }
}
</script>
