<template>
  <div class="app-main-layout">
    <TheNavbar @toggle="isOpen = !isOpen" />
    <TheSidebar :toggle-class="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <div>
          <router-view />
        </div>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>
<script>
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'

export default {
  data () {
    return {
      isOpen: true
    }
  },
  components: {
    TheNavbar,
    TheSidebar
  }
}
</script>
