<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <ThePreloader v-if="loading" />

    <div class="row" v-else>
      <div class="col s12 m6 l4">
        <HomeBill />
      </div>

      <div class="col s12 m6 l8">
        <HomeCurrency />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'Home',
  data() {
    return {
      loading: true,
      currency: null
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>
