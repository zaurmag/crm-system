<template>
  <div class="app-main-layout">
    <TheNavbar />
    <TheSidebar />

    <main class="app-content">
      <div class="app-page">
        <div>
          <router-view />
        </div>
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
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
