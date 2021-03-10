<template>

    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas" height="300" width="550" />
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
import { Pie } from 'vue-chartjs'

export default {
  name: 'History',
  mixins: [paginationMixin],
  extends: Pie,
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
    this.setup(categories)
    this.renderChart({
      labels: categories.map(c => c.name),
      datasets: [{
        label: 'История расходов',
        data: categories.map(c => {
          return this.records.reduce((total, r) => {
            if (r.category === c.id && r.type === 'outcome') {
              total += +r.amount
            }

            return total
          }, 0)
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    { responsive: true, maintainAspectRatio: false })
    this.loading = false
  },
  methods: {
    setup (categories) {
      this.setupPaginations(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.category).name,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
    }
  },
  components: {
    HistoryTable
  }
}
</script>
