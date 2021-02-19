<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from '@/layout/EmptyLayout'
import MainLayout from '@/layout/MainLayout'

export default {
  computed: {
    layout() {
      return this.$route.meta.layout + '-layout'
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>

<style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css');
</style>
