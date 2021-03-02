<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>

      <p
        class="currency-line"
        v-for="cur in currencies"
        :key="cur"
      >
        <span>{{ getCurrensy(cur) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data () {
    return {
      currencies: ['RUB', 'USD', 'EUR']
    }
  },
  computed: {
    base () {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrensy (currency) {
      console.log(this.base)
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
