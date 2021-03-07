<template>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{ $currency(bill, 'RUB') }}</h4>
  </div>

  <ThePreloader v-if="loading" />

  <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить категорию</router-link></p>

  <section v-else>
    <div v-for="cat in categories" :key="cat.id">
      <p>
        <strong>{{ cat.name }}</strong>
        {{ $currency(cat.spend, 'RUB') }} из {{ $currency(cat.limit, 'RUB') }}
      </p>

      <div class="progress" v-tooltip="cat.tooltip">
        <div
          class="determinate"
          :class="[cat.percentColor]"
          :style="{ width: cat.percentProgress + '%' }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed, inject } from 'vue'
import { useStore } from 'vuex'


export default {
  name: 'Planning',

  setup () {
    const store = useStore()
    const loading = ref(true)
    const categories = ref([])
    const currency = inject('currency')

    const bill = computed (() => store.getters.info.bill)

    onMounted (async () => {
      const records = await store.dispatch('fetchRecords')
      const cats = await store.dispatch('fetchCategory')
      loading.value = false

      categories.value = cats.map(cat => {
        const spend = records
          .filter(r => r.category === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, r) => {
            return total += +r.amount
          }, 0)

          const percent = 100 * spend / cat.limit
          const percentProgress = percent > 100 ? 100 : percent
          const percentColor = percent < 60
            ? 'green'
            : percent < 100
              ? 'yellow'
              : 'red'

          const tooltipValue = cat.limit - spend
          const tooltip = cat.limit < spend ? 'Превышение на ' : 'Осталось ' + currency(Math.abs(tooltipValue), 'RUB')

          return {
            ...cat,
            percentProgress,
            percentColor,
            spend,
            tooltip
          }
      })
    })

    return {
      loading,
      categories,
      bill
    }
  }
}
</script>
