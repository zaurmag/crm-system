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
          text: 'Счет'
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
