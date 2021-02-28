<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggle')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFormat }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="drop"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  emits: ['toggle'],
  name: 'TheNavbar',
  data () {
    return {
      date: Date(),
      interval: null,
      dropdown: null
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    dateFormat () {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: 'numeric',
        second: 'numeric'
      }
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(this.date))
    }
  },
  mounted () {
    this.dropdown = M.Dropdown.init(this.$refs.drop, {
      constrainWidth: true
    })

    this.interval = setInterval(() => {
      this.date = Date()
    }, 1000)
  },
  beforeUnmount () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy
    }
  }
}
</script>
