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
  @import url('~materialize-css/dist/css/materialize.min.css');
</style>
