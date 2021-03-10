<template>
  <ul class="sidenav app-sidenav" :class="{open: toggleClass}">
    <li
      v-for="link in links"
      :key="link.url"
      :class="{active: $route.path === link.url}"
    >
      <router-link
        :to="link.url"
        class="waves-effect waves-orange pointer"
      >
        {{ link.text }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['toggleClass'],
  name: 'TheSidebar',
  data () {
    return {
      links: [
        {
          url: '/',
          text: this.$localize('menu_bill')
        },
        {
          url: '/history',
          text: this.$localize('menu_history')
        },
        {
          url: '/planning',
          text: this.$localize('menu_planning')
        },
        {
          url: '/record',
          text: this.$localize('menu_record')
        },
        {
          url: '/categories',
          text: this.$localize('menu_categories')
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
