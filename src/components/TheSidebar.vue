<template>
  <ul class="sidenav app-sidenav" :class="{open: toggleClass}">
    <li
      v-for="link in links"
      :key="link.url"
      :class="{active: $route.path === link.url}"
    >
      <router-link
        active-class="active"
        :to="link.url"
        :exact="link.exact"
        class="waves-effect waves-orange pointer"
      >
        {{ link.text }}
        {{ value }}
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
          text: 'Счет',
          exact: 'exact'
        },
        {
          url: '/history',
          text: 'История'
        },
        {
          url: '/planning',
          text: 'Планирование'
        },
        {
          url: '/record',
          text: 'Новая запись'
        },
        {
          url: '/categories',
          text: 'Категории'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
