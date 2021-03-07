<template>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{ $currency(bill, 'RUB') }}</h4>
  </div>

  <ThePreloader v-if="loading" />

  <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить категорию</router-link></p>

  <section v-else>
    <div>
      <p>
        <strong>Девушка:</strong>
        12 122 из 14 0000
      </p>
      <div class="progress">
        <div
          class="determinate green"
          style="width:40%"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'


export default {
  name: 'Planning',

  setup () {
    const store = useStore()
    const loading = ref(true)
    const categories = ref([])

    const bill = computed (() => store.getters.info.bill)

    onMounted (async () => {
      const records = await store.dispatch('fetchRecords')
      const categories = await store.dispatch('fetchCategory')
      loading.value = false
    })

    return {
      loading,
      categories,
      bill
    }
  }
}
</script>
