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
      <HistoryTable :items="items" />
    </section>

    <Paginate
      v-model="page"
      :records="records.length"
      :per-page="perPage"
      @paginate="pageChangeHandler"
      :options="paginateOptions"
    />
</template>

<script>
import paginationMixin from '../mixins/paginate.mixin'
import HistoryTable from '../components/HistoryTable'
import PaginationCustom from '../components/App/PaginationCustom'

export default {
  name: 'History',
  mixins: [paginationMixin],
  data () {
    return {
      loading: true,
      records: [],
      paginateOptions: {
        template: PaginationCustom,
        texts: {
          count: '',
          first: 'Первая',
          last: 'Последняя'
        }
      }
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategory')
    this.setupPaginations(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.category).name,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    }))
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>
