<template>
  <div>
    <ThePreloader v-if="loading" />
    <div class="app-main-layout" v-else>
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
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Добавить новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'
import messages from '@/utils/messages'

export default {
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  components: {
    TheNavbar,
    TheSidebar
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code || 'Неизвестная ошибка'])
    }
  }
}
</script>
